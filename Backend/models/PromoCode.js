const mongoose = require("mongoose");

const PromoCodeSchema = new mongoose.Schema(
    {
        promocode: {
            type: String,
			required: true,
            unique: true
        },
        discount: {
            type: Number,
			required: true,
        },
        stripeCouponId: {
            type: String, // Store Stripe coupon ID
            default: null,
        },
        usersWhoRedeemedIt: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Tourist",
			default: [],
        },
    },
    { timestamps: true }
);

  // Create the Promo Code model
  const PromoCode = mongoose.model("PromoCode", PromoCodeSchema);
  
  module.exports = PromoCode;