const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a tag name"],
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
