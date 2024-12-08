const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const Tourist = require("../models/Tourist");
const Product = require("../models/Product");
const Sale = require("../models/Sale");
const { bookItinerary } = require("../controllers/Itinerary");
const { bookActivity } = require("../controllers/Activity");
const crypto = require('crypto');
const app = express();
app.use(express.json());
const router = express.Router();

const YOUR_DOMAIN = process.env.FRONTEND_DOMAIN;
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN;

function hashCart(cart) {
    const cartString = JSON.stringify(cart);  
    return crypto.createHash('sha256').update(cartString).digest('hex'); 
  }

  const purchaseSuccessful = async (req, res) => {
    // const sig = req.headers['stripe-signature'];
    // const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    // let event;
    
    // try {
    //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    // } catch (err) {
    //   console.error('Webhook signature verification failed:', err.message);
    //   return res.status(400).send('Webhook Error');
    // }

    //For some reason, the above code is not working. I will use the below code instead

    const event = req.body;

    const session = event.data.object
    console.log("ENTERED PURCHASE SUCCESSFUL");

    // Handle the event
    if (event.type == 'checkout.session.completed') {
        console.log("ENTERED CHECKOUT SESSION COMPLETED");
        const cartHash = session.metadata.cartHash;
        const userId = session.metadata.userId;
        const type = session.metadata.type;
        const date = session.metadata.date;
        const adultTicketCount = session.metadata.adultTicketCount;
        const childTicketCount = session.metadata.childTicketCount;
        const itineraryId = session.metadata.itineraryId;
        const amount_total = session.amount_total;
        const activityId = session.metadata.activityId;
        const activityInfo = session.metadata.activityInfo;
        const finalPrice = session.amount_total;


        const user = await Tourist.findById(userId).populate('cart.productID');

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }


        if (type == 'product') {
            if (hashCart(user.cart) !== cartHash) {
                return res.status(400).json({ error: 'Cart has been altered.' });
            }

            //MAKE ORDER HERE!
            const userOrder = {};
            const saleIds = [];

            for (const item of user.cart) {

                const product = item.productID;

                const sale = new Sale({
                    type: 'Product',
                    itemId: product._id,
                    buyerId: userId,
                    quantity: item.quantity,
                    totalPrice: product.price * item.quantity
                });

                const savedSale = await sale.save();
                saleIds.push(savedSale._id);
            }

            userOrder.sales = saleIds;
            userOrder.cart = JSON.parse(JSON.stringify(user.cart));
            userOrder.isDelivered = Math.random() >= 0.5;
            user.orders.push(userOrder);

            user.cart = [];
        }

        if (type == 'itinerary') {
          console.log("DETECTED AS ITINERARY");
            const sale = new Sale({
                type: 'Itinerary',
                itemId: itineraryId,
                buyerId: userId,
                quantity: adultTicketCount + childTicketCount,
                totalPrice: amount_total
            });
            const mockRes = {
              status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
              },
              json: function(data) {
                this.data = data;
                return this;
              },
              send: function(data) {
                this.data = data;
                return this;
              }
            };
            const savedSale = await sale.save();
            const req = { body: { date: date, adultTicketCount: adultTicketCount, childTicketCount: childTicketCount, itineraryId: itineraryId, userId: userId } };
            await bookItinerary(req, mockRes);
          }
      
          if (type == 'activity') {
            console.log("DETECTED AS ACTIVITY");
            const sale = new Sale({
                type: 'Activity',
                itemId: activityId,
                buyerId: userId,
                totalPrice: amount_total
            });
            const mockRes = {
              status: function(statusCode) {
                this.statusCode = statusCode;
                return this;
              },
              json: function(data) {
                this.data = data;
                return this;
              },
              send: function(data) {
                this.data = data;
                return this;
              }
            };
            const savedSale = await sale.save();
            const req = { body : { activityId: activityId, userId: userId } };
            await bookActivity(req, mockRes);
          }

        await user.save();
    }
    
    res.status(200).send('Webhook received');
  };

router.post('/', express.raw({ type: 'application/json' }), purchaseSuccessful);

  
module.exports = router;