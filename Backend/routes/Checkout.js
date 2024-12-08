const { bookActivity } = require("../controllers/Activity");
const { bookItinerary } = require("../controllers/Itinerary");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/Tourist");
const Sale = require("../models/Sale");
const Product = require("../models/Product");
const express = require("express");
const crypto = require("crypto");
const app = express();
app.use(express.json());
const router = express.Router();

const YOUR_DOMAIN = process.env.FRONTEND_DOMAIN;
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN;

const Admin = require("../models/Admin");
const Seller = require("../models/Seller");
const nodemailer = require("nodemailer");

function hashCart(cart) {
  const cartString = JSON.stringify(cart);
  return crypto.createHash("sha256").update(cartString).digest("hex");
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL, // Your Gmail address
    pass: process.env.GMAILPASSWORD    // Your Gmail App Password
  }
});

router.post("/stripe", async (req, res) => {
  try {
    const { cart, userId, promoCode, type } = req.body;
    let line_items;
    if (type == "product") {
      if (!Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ error: "Cart is invalid or empty." });
      }

      line_items = cart.map((item) => {
        if (!item.productID?.priceId || !item.quantity) {
          throw new Error("Invalid cart item: missing priceId or quantity.");
        }
        return {
          price: item.productID.priceId,
          quantity: item.quantity,
        };
      });
      console.log("cart: ", cart);
    }
    if (type == "itinerary") {
      line_items = [
        {
          price: cart.priceId,
          quantity: cart.adultTicketCount + cart.childTicketCount,
        },
      ];
    }

    if (type == "activity") {
      line_items = [
        {
          price: cart.priceId,
          quantity: 1,
        },
      ];
    }
    let session;

    if (type == "product") {
      // Create a Stripe Checkout session
      session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        discounts: promoCode ? [{ coupon: promoCode }] : [],
        success_url: `${YOUR_DOMAIN}/checkout/success`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        metadata: {
          userId,
          cartHash: hashCart(cart),
          type: type,
        },
      });
    }

    if (type == "itinerary") {
      // console.log("CART: ", cart);
      session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        discounts: promoCode ? [{ coupon: promoCode }] : [],
        success_url: `${YOUR_DOMAIN}/checkout/success`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        metadata: {
          userId,
          type: type,
          date: cart.date.dateTime,
          adultTicketCount: cart.adultTicketCount,
          childTicketCount: cart.childTicketCount,
          itineraryId: cart._id,
          userId: userId,
          amount_total:
            cart.price * (cart.adultTicketCount + cart.childTicketCount),
        },
      });
    }

    if (type == "activity") {
      console.log("CART: ", cart);
      session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        discounts: promoCode ? [{ coupon: promoCode }] : [],
        success_url: `${YOUR_DOMAIN}/checkout/success`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        metadata: {
          userId,
          type: type,
          activityId: cart._id,
          userId: userId,
          amount_total: cart.price,
        },
      });
    }

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error. Please try again later." });
  }
});

router.post("/wallet", async (req, res) => {
  try {
    const { cart, userId, discount, type } = req.body;

    let total;

    if (type === "product") {
      if (!Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ error: "Cart is invalid or empty." });
      }
      total = cart.reduce((acc, item) => {
        if (!item.productID?.price || !item.quantity) {
          throw new Error("Invalid cart item: missing price or quantity.");
        }
        return acc + item.productID.price * item.quantity;
      }, 0);
    }
    if (type === "itinerary") {
      total = cart.price;
    }

    if (type === "activity") {
      total = cart.price;
    }
    // Check if user has enough balance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.wallet < total) {
      return res.status(400).json({ error: "Insufficient balance." });
    }

    // Deduct total amount from user's balance
    user.wallet -= total - (total * discount) / 100;

    if (type === "product") {
      const userOrder = {};
      const saleIds = [];

      for (const item of cart) {
        const product = item.productID;

        const sale = new Sale({
          type: "Product",
          itemId: product._id,
          buyerId: userId,
          quantity: item.quantity,
          totalPrice:
            product.price * item.quantity -
            (product.price * item.quantity * discount) / 100,
        });

        const savedSale = await sale.save();
        saleIds.push(savedSale._id);

        // Increment product.numSales for each product in the cart
        const productDoc = await Product.findById(product._id);
        if (productDoc) {
          productDoc.numSales += item.quantity;
          productDoc.quantity -= item.quantity;
          await productDoc.save();
        }
      }
      userOrder.sales = saleIds;
      userOrder.cart = JSON.parse(JSON.stringify(user.cart));
      user.orders.push(userOrder);

      // Increment product.numSales for each product in the cart
      for (const item of cart) {
        const product = await Product.findById(item.productID._id);
        if (product) {
          product.numSales += item.quantity;
          product.quantity -= item.quantity;
          await product.save();

          let user = await Seller.findById(product.creatorId); // Check if user is an admin

          if (!user) {
            user = await Admin.findById(product.creatorId); // Check if user is a seller
          }

          if (!user) {
            return res.status(404).json({ message: "User not found or unauthorized" });
          }

          if (product.quantity == 0) {
            //send an email
            const mailOptions = {
              from: process.env.GMAIL,
              to: user.email,
              subject: 'Product out of stock',
              text: 'Your product ' + product.name + ' is out of stock.'
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return res.status(500).send(error.toString());
              }
              res.status(200).send(`Email sent: ${info.response}`);
            });

            const notification = {
              title: "Product out of stock",
              Body: "Your Product " + product.name + " is out of stock.'",
              isSeen: false,
            };
            user.Notifications.push(notification);
          }
        }
      }

      user.cart = [];
    }

    if (type === "itinerary") {
      const sale = new Sale({
        type: "Itinerary",
        itemId: cart._id,
        buyerId: userId,
        quantity: cart.adultTicketCount + cart.childTicketCount,
        totalPrice:
          (cart.price - (cart.price * discount) / 100) *
          (cart.adultTicketCount + cart.childTicketCount),
      });
      const mockRes = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
        send: function (data) {
          this.data = data;
          return this;
        },
      };
      const savedSale = await sale.save();
      const req = {
        body: {
          date: cart.date.dateTime,
          adultTicketCount: cart.adultTicketCount,
          childTicketCount: cart.childTicketCount,
          itineraryId: cart._id,
          userId: userId,
        },
      };
      await bookItinerary(req, mockRes);
    }

    if (type === "activity") {
      const sale = new Sale({
        type: "Activity",
        itemId: cart._id,
        buyerId: userId,
        totalPrice: cart.price - (cart.price * discount) / 100,
      });
      const mockRes = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.data = data;
          return this;
        },
        send: function (data) {
          this.data = data;
          return this;
        },
      };
      const savedSale = await sale.save();
      const req = { body: { activityId: cart._id, userId: userId } };
      activity = await bookActivity(req, mockRes);
    }
    await user.save();

    res.status(200).json({ message: "Payment successful." });
  } catch (error) {
    console.error("Error processing wallet payment:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error. Please try again later." });
  }
});

router.post("/cod", async (req, res) => {
  try {
    const { cart, userId } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is invalid or empty." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const userOrder = {};
    const saleIds = [];

    for (const item of cart) {
      const product = item.productID;

      const sale = new Sale({
        type: "Product",
        itemId: product._id,
        buyerId: userId,
        quantity: item.quantity,
        totalPrice: product.price * item.quantity,
      });

      const savedSale = await sale.save();
      saleIds.push(savedSale._id);

      // Increment product.numSales for each product in the cart
      const productDoc = await Product.findById(product._id);
      if (productDoc) {
        productDoc.numSales += item.quantity;
        productDoc.quantity -= item.quantity;
        await productDoc.save();
      }
    }

    userOrder.sales = saleIds;
    userOrder.cart = JSON.parse(JSON.stringify(user.cart));
    user.orders.push(userOrder);

    // Increment product.numSales for each product in the cart
    for (const item of cart) {
      const product = await Product.findById(item.productID._id);
      if (product) {
        product.numSales += item.quantity;
        product.quantity -= item.quantity;
        await product.save();

        let user = await Seller.findById(product.creatorId); // Check if user is an admin

        if (!user) {
          user = await Admin.findById(product.creatorId); // Check if user is a seller
        }

        if (!user) {
          return res.status(404).json({ message: "User not found or unauthorized" });
        }

        if (product.quantity == 0) {
          //send an email
          const mailOptions = {
            from: process.env.GMAIL,
            to: user.email,
            subject: 'Product out of stock',
            text: 'Your product ' + product.name + ' is out of stock.'
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).send(error.toString());
            }
            res.status(200).send(`Email sent: ${info.response}`);
          });

          const notification = {
            title: "Product out of stock",
            Body: "Your Product " + product.name + " is out of stock.'",
            isSeen: false,
          };
          user.Notifications.push(notification);
        }
      }
    }
    
    user.cart = [];

    await user.save();

    res.status(200).json({ message: "Order placed successfully." });
  } catch (error) {
    console.error("Error processing COD payment:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error. Please try again later." });
  }
});

module.exports = router;
