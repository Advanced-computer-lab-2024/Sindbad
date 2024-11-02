const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please add a complaint title"],
		},
		body: {
			type: String,
			required: [true, "Please add a complaint body"],
		},
		isResolved: {
			type: Boolean,
			default: false,
		},
		comment: {
			type: String,
			default: "",
		},
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tourist",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
