const mongoose = require("mongoose");

const ProductSalesSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "products",
			required: true,
		},
		buyerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "tourists",
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

const ProductSales = mongoose.model("ProductSales", ProductSalesSchema);

module.exports = ProductSales;
