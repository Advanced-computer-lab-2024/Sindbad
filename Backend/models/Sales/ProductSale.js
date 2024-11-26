const mongoose = require("mongoose");

const ProductSaleSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		buyerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tourist",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 1,
		},
		totalPrice: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{ timestamps: true }
);

const ProductSale = mongoose.model("ProductSale", ProductSaleSchema);

module.exports = ProductSale;
