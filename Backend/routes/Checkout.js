const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/Tourist');
const Sale = require('../models/Sale');
const express = require('express');
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

router.post('/stripe', async (req, res) => {
  try {
    const { cart, userId } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is invalid or empty.' });
    }

    const line_items = cart.map((item) => {
      if (!item.productID?.priceId || !item.quantity) {
        throw new Error('Invalid cart item: missing priceId or quantity.');
      }
      return {
        price: item.productID.priceId,
        quantity: item.quantity,
      };
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      metadata: {
        userId,
        cartHash: hashCart(cart),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error.message);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
});

router.post('/wallet' , async (req, res) => {
  try {
    const { cart, userId } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is invalid or empty.' });
    }

    // Calculate total amount
    const total = cart.reduce((acc, item) => {
      if (!item.productID?.price || !item.quantity) {
        throw new Error('Invalid cart item: missing price or quantity.');
      }
      return acc + item.productID.price * item.quantity;
    }, 0);

    // Check if user has enough balance
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.wallet < total) {
      return res.status(400).json({ error: 'Insufficient balance.' });
    }

    // Deduct total amount from user's balance
    user.wallet -= total;

    const userOrder = {};
    const saleIds = [];

    for (const item of cart) {
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
    user.orders.push(userOrder);
    user.cart = [];

    await user.save();

    res.status(200).json({ message: 'Payment successful.' });
  } catch (error) {
    console.error('Error processing wallet payment:', error.message);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
})

module.exports = router;