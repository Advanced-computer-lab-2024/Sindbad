const mongoose = require("mongoose");

// Define the schema for the Seller model
const SellerSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (v) => /^\S+@\S+\.\S+$/.test(v),
			message: (props) => `${props.value} is not a valid email!`,
		},
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	description: {
		type: String,
	},
	isAccepted: {
		type: Boolean,
		default: false, // Default to false indicating the tour guide is not accepted yet
	},
	products: [{}],
});

// Create the Seller model
const Seller = mongoose.model("Seller", SellerSchema);

module.exports = Seller;
