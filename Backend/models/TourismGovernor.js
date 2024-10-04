const mongoose = require("mongoose");

// Define the schema for the TourismGovernor model
const TourismGovernorSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	createdActivities: {
		type: [String], // Array of activity IDs
		default: [],
	},
	createdIterinaries: {
		type: [String], // Array of itinerary IDs
		default: [],
	},
	createdHistoricalPlaces: {
		type: [String], // Array of historical place IDs
		default: [],
	},
});

// Create the TourismGovernor model
const TourismGovernor = mongoose.model(
	"TourismGovernor",
	TourismGovernorSchema
);

module.exports = TourismGovernor;
