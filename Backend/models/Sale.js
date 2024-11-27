const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Product", "Activity", "Itinerary", "Flight", "Hotel", "Trip"],
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "type", // Dynamic reference based on the type field
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tourist",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1, // Default to 1 for non-product sales
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = Sale;
