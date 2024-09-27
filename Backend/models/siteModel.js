const mongoose = require("mongoose");
const Tag = require("./tagModel");

const openingHoursSchema = new Schema(
	{
		start: { type: Number, required: true }, // Start time in minutes (e.g., 420 minutes = 7:00 AM)
		end: { type: Number, required: true }, // End time in minutes (e.g., 1020 minutes = 5:00 PM)
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
		type: String,
		required: [true, "Please add a location for your site"],
	},
	openingHours: {
		type: Map,
		of: openingHoursSchema, // One openingHours object per day
		required: true,
	},
	ticketPrices: {
		type: [Number],
		required: true,
		validate: {
			validator: function (arr) {
				return arr.every((price) => price >= 0);
			},
			message: "Ticket prices must be non-negative",
		},
	},
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
			required: true,
		},
	],
	creatorId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

module.exports = mongoose.model("Site", siteSchema);
