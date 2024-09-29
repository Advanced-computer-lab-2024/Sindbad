const mongoose = require("mongoose");

// Define the schema for the TourGuide model
const TourGuideSchema = new mongoose.Schema({
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
		validate: {
			validator: function (v) {
				if (v === null || v === undefined) return true; // Allow null or undefined values
				return /^\+?[1-9]\d{1,14}$/.test(v); // Validate only if mobile number is provided
			},
			message: (props) => `${props.value} is not a valid mobile number!`,
		},
	},
	yearsOfExperience: {
		type: Number,
	},
	previousWork: [
		{
			type: [
				{
					jobTitle: {
						type: String,
						required: false, // Make jobTitle optional
					},
					companyName: {
						type: String,
						required: false, // Make companyName optional
					},
					duration: {
						type: String, // E.g., "Jan 2020 - Dec 2021"
						required: false, // Make duration optional
					},
					description: {
						type: String,
						default: "", // Optional field for description
					},
				},
			],
			default: [], // Default to an empty array
		},
	],
	isAccepted: {
		type: Boolean,
	},
});

// Create the TourGuide model
const TourGuide = mongoose.model("TourGuide", TourGuideSchema);

module.exports = TourGuide;