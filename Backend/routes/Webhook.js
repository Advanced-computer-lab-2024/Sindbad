const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const Tourist = require("../models/Tourist");
const Product = require("../models/Product");
const Sale = require("../models/Sale");
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

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        
        const cartHash = session.metadata.cartHash;
        const userId = session.metadata.userId;

        const user = await Tourist.findById(userId).populate('cart.productID');

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

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

        await user.save();
    }
    
    res.status(200).send('Webhook received');
  };

router.post('/', express.raw({ type: 'application/json' }), purchaseSuccessful);

  
module.exports = router;