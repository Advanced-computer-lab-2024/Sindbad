const mongoose = require("mongoose");

// Define the schema for HistoricalPlace
const HistoricalPlaceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	pictures: {
		type: [String], // Array of image URLs
		default: [],
	},
	location: {
		address: {
			type: String,
			required: true,
		},
		coordinates: {
			lat: { type: Number, required: true },
			long: { type: Number, required: true },
		},
	},
	openingHours: {
		type: String, // E.g., "9 AM - 5 PM"
		required: true,
	},
	ticketPrices: {
		adult: {
			type: Number,
			required: true,
		},
		child: {
			type: Number,
			required: false, // Optional for children
		},
		senior: {
			type: Number,
			required: false, // Optional for seniors
		},
		currency: {
			type: String,
			default: "USD", // Default currency
		},
	},
	type: {
		type: String,
		enum: ["Monuments", "Museums", "Religious Sites", "Palaces/Castles"], // Allowed types
		required: true,
	},
	isAccessible: {
		type: Boolean,
		default: true, // Indicating whether the site is accessible to the public
	},
});

// Create the HistoricalPlace model
const HistoricalPlace = mongoose.model(
	"`HistoricalPlace`",
	HistoricalPlaceSchema
);

module.exports = HistoricalPlace;
