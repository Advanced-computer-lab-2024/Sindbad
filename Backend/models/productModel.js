const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add the product name"],
		},
		picture: {
			type: String,
			required: [true, "Please add a product picture URL"],
		},
		price: {
			type: Number,
			required: [true, "Please add the product price"],
			validate: {
				validator: function (value) {
					return value >= 0;
				},
				message: "Price must be a non-negative number",
			},
		},
		description: {
			type: String,
			required: [true, "Please add a product description"],
		},
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Seller",
			required: [true, "Please add the seller of the product"],
		},
		rating: {
			type: Map,
			of: Number,
			default: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
			},
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		reviews: [
			{
				username: {
					type: String,
					required: [true, "Username is required for a review"],
				},
				rating: {
					type: Number,
					min: 1,
					max: 5,
					required: [true, "Rating is required"],
				},
				comment: {
					type: String,
					required: [true, "Comment is required"],
				},
			},
		],
		quantity: {
			type: Number,
			required: [true, "Please add the available quantity"],
			validate: {
				validator: function (value) {
					return value >= 0;
				},
				message: "Quantity must be a non-negative number",
			},
		},
		numSales: {
			type: Number,
			default: 0,
		},
		isArchived: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);



module.exports = mongoose.model("Product", productSchema);
