const mongoose = require("mongoose");
const Tag = require("./tagModel");

const openingHoursSchema = new mongoose.Schema(
	{
		start: {
			type: Number,
			required: true,
		}, // Start time in minutes (e.g., 420 minutes = 7:00 AM)
		end: {
			type: Number,
			required: true,
			validate: {
				validator: function (v) {
					return v > this.start; // Ensure that end is greater than start
				},
				message: (props) =>
					`Closing time (${props.value}) must be greater than opening time (${this.start})!`,
			},
		}, // End time in minutes (e.g., 1020 minutes = 5:00 PM)
	},
	{ _id: false } // Disable automatic _id generation for sub-documents
);

const siteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please add a name for your site"],
		unique: true,
	},
	description: {
		type: String,
		required: [true, "Please add a description for your site"],
	},
	imageUris: {
		type: [String],
		required: [true, "Please add an image for your site"],
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
		type: Map,
		of: openingHoursSchema, // One openingHours object per day
		required: [true, "Please add opening hours for your site"],
	},
	ticketPrices: {
		type: Map,
		of: Number,
		validate: {
			validator: function (map) {
				return Array.from(map.values()).every((price) => price >= 0);
			},
			message: "All ticket prices must be non-negative",
		},
	},
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
	creatorId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model("Site", siteSchema);
