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

const getSalesById = async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters

  try {
    // Fetch the sale by ID
    const sale = await Sale.findById(id).exec();

    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    // Return the sale details as a response
    res.status(200).json(sale);
  } catch (error) {
    console.error("Error fetching sale:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = Sale;
