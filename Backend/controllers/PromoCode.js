const PromoCode = require("../models/PromoCode");
const Tourist = require("../models/Tourist");

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
		const PromoCodeData = req.body;
		const promoCode = await PromoCode.create(PromoCodeData);
		res.status(201).json({ message: "Promo Code created successfully!", promoCode });
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
    const promoCode = req.body.promocode;
    const touristID = req.params.id;
    try {

        // Fetch the tourist and promo code details
        const tourist = await Tourist.findById(touristID);
        const promoCodeDiscount = await PromoCode.findOne({ promocode: promoCode });
        if (!tourist) {
            return res.status(404).json({ message: "Tourist not found" });
        }
        if (promoCodeDiscount == null) 
        {
            return res.status(404).json({ message: "Promo Code does not exist" });
        }

        // Check if the tourist has already redeemed the promo code
        if (promoCodeDiscount.usersWhoRedeemedIt.includes(touristID)) {
            return res.status(400).json({ message: "You have already redeemed this promo code." });
        }
        
        // Special handling for "HAPPYBDAY" promo code: can redeem this code as long as it is their birthday
        if (promoCode === "HAPPYBDAY") {
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

        //add the tourist to the redeemed list
        promoCodeDiscount.usersWhoRedeemedIt.push(touristID);
        await promoCodeDiscount.save();


        return res.json({
            message: "Promo code applied.",
            discount: promoCodeDiscount.discount,
        });

    } catch (err) {
        return res.status(500).json({
        message: "Error finding Promo Code",
        error: err.message,
        });
    }
};



module.exports = {
	createPromoCode,
    usePromoCode,
};