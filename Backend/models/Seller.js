const mongoose = require("mongoose");

// Define the schema for the Seller model
const SellerSchema = new mongoose.Schema(
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
			validate: {
				validator: function (v) {
					return !/\s/.test(v); // Check if there are no spaces
				},
				message: (props) =>
					`${props.value} contains spaces, which are not allowed!`,
			},
		},
		passwordHash: {
			type: String,
			required: true,
		},
		idCardImage: {
			type: Buffer,
			default: null,
		},
		taxationRegistryCardImage: {
			type: Buffer,
			default: null,
		},
		logoImageUri: {
			type: String,
		},
		bannerImageUri: {
			type: String,
		},
		preferredCurrency: {
			type: String,
			default: "USD",
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		description: {
			type: String,
		},
		isAccepted: {
			type: Boolean,
			default: null, // Default to null indicating the Seller is not accepted yet
		},
		products: [{}],
		isRequestedAccountDeletion: {
			type: Boolean,
			default: false,
		},
		Notifications:{
			type:[
			  {
				title: {
				  type: String,
				},
				Body:{
				  type:String,
				},
				isSeen:{
				  Type: Boolean,
				},
			  }
			],
			default:[],
		},
	  
	},
	{ timestamps: true }
);

// Create the Seller model
const Seller = mongoose.model("Seller", SellerSchema);

module.exports = Seller;
