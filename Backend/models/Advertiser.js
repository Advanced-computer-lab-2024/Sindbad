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
				/^(www\.)[\da-z.-]+\.[a-z.]{2,6}(\/[\w .-]*)*\/?$/.test(v), // Basic validation for URLs starting with www.
			message: (props) =>
				`${props.value} is not a valid website URL! Website must start with 'www.'`,
		},
	},
	hotline: {
		type: String,
		validate: {
			validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v), // Basic validation for international phone numbers
			message: (props) => `${props.value} is not a valid hotline number!`,
		},
	},
	companyProfile: {
		name: {
			type: String,
			required: true,
			validate: {
				validator: (v) => v.length > 0,
				message: "Company name is required.",
			},
		},
		description: {
			type: String,
			validate: {
				validator: (v) => v.length <= 500, // Limiting description to 500 characters
				message: "Description cannot be longer than 500 characters.",
			},
		},
		location: {
			type: String,
		},
		// Add more fields here as needed for the company profile
	},
	isAccepted: {
		type: Boolean,
		default: false, // Indicates whether the advertiser has been accepted
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

// Create the Advertiser model
const Advertiser = mongoose.model("Advertiser", AdvertiserSchema);

module.exports = Advertiser;
