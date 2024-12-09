const PromoCode = require("../models/PromoCode");
const Tourist = require("../models/Tourist");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a new admin.
 *
 * @param {Object} req - The request object containing the promo code details in the body.
 * @param {Object} req.body - The promo code details (e.g., name, discount).
 * @param {Object} res - The response object for sending the result.
 * @returns {Object} - JSON object indicating the success message and the created promocode.
 *
 * @throws {400} - If there is an error saving the promocode.
 */
const createPromoCode = async (req, res) => {
	try {
		const { promocode, discount } = req.body;

		// Create a Stripe coupon
		const stripeCoupon = await stripe.coupons.create({
			percent_off: discount, // Discount percentage
			duration: 'once', // Options: once, repeating, or forever
			name: promocode, // Optional: Name for Stripe dashboard
		});

		// Save the promo code to your database
		const promoCode = await PromoCode.create({
			...req.body,
			stripeCouponId: stripeCoupon.id, // Store the Stripe coupon ID for reference
		});

		res.status(201).json({
			message: "Promo Code and Stripe coupon created successfully!",
			promoCode,
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};


/**
 * Creates a new admin.
 *
 * @param {Object} req - The request object containing the promo code in the body.
 * @param {Object} req.body - The promo code name.
 * @param {Object} req.params - The user id redeeming the promo code.
 * @param {Object} res - The discount.
 * @returns {Object} - JSON object indicating the success message and the promo code's discount.
 *
 * @throws {400} - If the promo code was already used by this user or they are trying to use the birthday 
 * promocode not on their birthday.
 * @throws {404} - If the promo code or the user are not found.
 * @throws {500} - If there is an error fetching the promocode.
 */
const usePromoCode = async (req, res) => {
    const { promocode } = req.body; // Promo code is passed in the body now
    const touristID = req.params.id;

    try {
        // Fetch the tourist and promo code details
        const tourist = await Tourist.findById(touristID);
        const promoCodeDiscount = await PromoCode.findOne({ promocode });
        if (!tourist) {
            console.log("tourist");
            return res.status(404).json({ message: "Tourist not found" }); 
        }
        if (promoCodeDiscount == null) {
            console.log("discount");
            return res.status(404).json({ message: "Promo Code does not exist" });
        }

        // Check if the tourist has already redeemed the promo code
        if (promoCodeDiscount.usersWhoRedeemedIt.includes(touristID)) {
            return res.status(400).json({ message: "You have already redeemed this promo code." });
        }
        
        // Special handling for "HAPPYBDAY" promo code: can redeem this code as long as it is their birthday
        if (promocode === "HAPPYBDAY") {
            const today = new Date();
            const dob = new Date(tourist.DOB);

            // Compare day and month
            if (today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth()) {
                // Add the tourist to the redeemed list and save the promo code
                promoCodeDiscount.usersWhoRedeemedIt.push(touristID);
                await promoCodeDiscount.save();

                return res.json({
                    message: "Happy Birthday! Promo code applied.",
                    discount: promoCodeDiscount.discount,
                });
            } else {
                return res.status(400).json({
                    message: "Promo code 'HAPPYBDAY' can only be used on your birthday.",
                });
            }
        }

        // Add the tourist to the redeemed list and save
        promoCodeDiscount.usersWhoRedeemedIt.push(touristID);
        await promoCodeDiscount.save();

        return res.json({
            message: "Promo code applied.",
            discount: promoCodeDiscount.discount,
            stripeID: promoCodeDiscount.stripeCouponId,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error finding Promo Code",
            error: err.message,
        });
    }
};

const syncPromoCodesWithStripe = async () => {
    try {
      // Connect to your database
  
      // Fetch all promo codes from the database
      const promoCodes = await PromoCode.find();
  
      for (const promoCode of promoCodes) {
        // Check if Stripe coupon already exists
        if (promoCode.stripeCouponId) {
          console.log(`PromoCode "${promoCode.promocode}" already has a Stripe coupon.`);
          continue;
        }
  
        console.log(`Creating Stripe coupon for PromoCode: "${promoCode.promocode}"`);
  
        try {
          // Create the Stripe coupon
          const stripeCoupon = await stripe.coupons.create({
            percent_off: promoCode.discount,
            duration: "once", // Or other duration types as needed
            name: promoCode.promocode, // Optional: Add a name for easy tracking in Stripe
          });
  
          // Update the database with the Stripe coupon ID
          promoCode.stripeCouponId = stripeCoupon.id;
          await promoCode.save();
  
          console.log(`Stripe coupon created for "${promoCode.promocode}" with ID: ${stripeCoupon.id}`);
        } catch (stripeError) {
          console.error(`Failed to create Stripe coupon for "${promoCode.promocode}": ${stripeError.message}`);
        }
      }
  
      return res.json({
        message: "Sync Completed",
    });
      
    } catch (error) {
        return res.json({
            message: "Error During Sync:" + error.message,
        });
    }
  };

module.exports = {
	createPromoCode,
    usePromoCode,
    syncPromoCodesWithStripe,
};