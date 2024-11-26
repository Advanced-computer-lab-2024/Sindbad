const mongoose = require("mongoose");

const ActivitySaleSchema = new mongoose.Schema(
  {
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tourist",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const ActivitySale = mongoose.model("ActivitySale", ActivitySaleSchema);

module.exports = ActivitySale;
