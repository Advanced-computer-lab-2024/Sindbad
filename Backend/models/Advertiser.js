const mongoose = require("mongoose");

// Define the schema for the Advertiser model
const AdvertiserSchema = new mongoose.Schema({
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
	websiteLink: {
		type: String,
		validate: {
			validator: (v) =>
				/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?/.test(
					v
				),
			message: (props) => `${props.value} is not a valid URL!`,
		},
	},
	hotline: {
		type: String,
		validate: {
			validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v), // Basic validation for international phone numbers
			message: (props) => `${props.value} is not a valid hotline number!`,
		},
	},
	// companyProfile structure still unknown
	companyProfile: {},

	isAccepted: {
		type: Boolean,
		default: false, // Indicates whether the advertiser has been accepted
	},
	createdActivities: {
		type: [String], // Array of activity IDs
		default: [], // Default to an empty array
	},
	createdIterinaries: {
		type: [String], // Array of itinerary IDs
		default: [], // Default to an empty array
	},
	createdHistoricalPlaces: {
		type: [String], // Array of historical place IDs
		default: [], // Default to an empty array
	},
});

// Create the Advertiser model
const Advertiser = mongoose.model("Advertiser", AdvertiserSchema);

module.exports = Advertiser;
