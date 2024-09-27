const mongoose = require("mongoose");

// Define the schema for the Tourist model
const TouristSchema = new mongoose.Schema({
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
	mobileNumber: {
		type: String,
		required: true,
		validate: {
			validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v), // Basic validation for international phone numbers
			message: (props) => `${props.value} is not a valid mobile number!`,
		},
	},
	nationality: {
		type: String,
		required: true,
	},
	DOB: {
		type: Date,
		required: true,
	},
	job: {
		type: String,
		required: true,
	},
	wallet: {
		type: Number,
		default: 0,
	},
	bookmarks: {
		type: [String], // Array of bookmark IDs or URLs
		default: [],
	},
	loyaltyPoints: {
		type: Number,
		default: 0,
	},
	level: {
		type: Number,
		default: 1, // Starting level
	},
	xpPoints: {
		type: Number,
		default: 0,
	},
	isReceiveNotifications: {
		type: Boolean,
		default: true,
	},
	wishlist: {
		type: [String], // Array of item IDs or details
		default: [],
	},
	cart: {
		type: [String], // Array of item IDs in the cart
		default: [],
	},
	addresses: {
		type: [
			{
				label: {
					type: String,
					required: true,
				},
				street: {
					type: String,
					required: true,
				},
				city: {
					type: String,
					required: true,
				},
				state: {
					type: String,
					required: true,
				},
				zip: {
					type: String,
					required: true,
				},
				country: {
					type: String,
					required: true,
				},
			},
		],
		default: [],
	},
});

// Create the Tourist model
const Tourist = mongoose.model("Tourist", TouristSchema);

module.exports = Tourist;
