const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO: Update schema to link with User
const AdminSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
