const mongoose = require("mongoose");

const ItinerarySaleSchema = new mongoose.Schema(
  {
    itineraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Itinerary",
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

const ItinerarySale = mongoose.model("ItinerarySale", ItinerarySaleSchema);

module.exports = ItinerarySale;
