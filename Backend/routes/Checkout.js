const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();

const YOUR_DOMAIN = process.env.FRONTEND_DOMAIN;
const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN;

router.post('/stripe', async (req, res) => {
  try {
    const { cart } = req.body;

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
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error.message);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
});

module.exports = router;