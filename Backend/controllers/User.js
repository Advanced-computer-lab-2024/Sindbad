const Tourist = require("../models/Tourist");
const TourGuide = require("../models/TourGuide");
const Advertiser = require("../models/Advertiser");
const Activities = require("../models/Activity");
const Itinerary = require("../models/Itinerary");
const Products = require("../models/Product");
const Complaint = require("../models/Complaint");
const Seller = require("../models/Seller");
const Admin = require("../models/Admin");
const TourismGovernor = require("../models/TourismGovernor");

const models = {
	tourist: Tourist,
	tourguide: TourGuide,
	tourismgovernor: TourismGovernor,
	advertiser: Advertiser,
	seller: Seller,
	admin: Admin,
};

const isAcceptedmodels = {
	tourguide: TourGuide,
	advertiser: Advertiser,
	seller: Seller,
};

const defaultFields = {
	tourist: {
		wallet: 0,
		bookmarks: [],
		loyaltyPoints: 0,
		level: 1,
		xpPoints: 0,
		isReceiveNotifications: false,
		wishlist: [],
		cart: [],
		addresses: [],
	},
	advertiser: {
		isAccepted: null,
		createdActivities: [],
		createdIterinaries: [],
		createdHistoricalPlaces: [],
	},
	seller: {
		isAccepted: null,
		products: [],
	},
	tourguide: {
		isAccepted: null,
	},
	admin: {},
	tourismgovernor: {},
};

const UserController = {
	signUp: async (req, res) => {
		try {
			const { email, username, passwordHash, role, ...userData } = req.body;

			if (!role) {
				throw new Error("Role is required");
			}

			// Check for unique email and username
			const isUnique = await UserController.isUniqueUsername(username);
			if (!isUnique) {
				throw new Error("Username already exists");
			}

			// Get the model based on role
			const Model = models[role.toLowerCase()];
			if (!Model) {
				throw new Error("Invalid role");
			}

			// Combine user-provided data with default fields for the role
			const roleSpecificData = {
				...defaultFields[role.toLowerCase()],
				...userData,
			};

			// Create a new user instance and save it
			const user = new Model({
				email,
				username,
				passwordHash,
				...roleSpecificData,
			});

			console.log(user);

			await user.save();

			return res
				.status(201)
				.json({ message: "User created successfully", user });
		} catch (error) {
			return res
				.status(400)
				.json({ message: "Sign up failed", error: error.message });
		}
	},

	getUserRole: async (req, res) => {
		try {
			const { id } = req.params;

			if (!id) {
				throw new Error("ID is required");
			}

			// Loop through models to find the user by ID
			for (const [role, model] of Object.entries(models)) {
				const user = await model.findById(id);
				if (user) {
					if (role === "tourguide") {
						return res.status(200).json({ role: "tourGuide" });
					} else if (role === "tourismgovernor") {
						return res.status(200).json({ role: "tourismGovernor" });
					} else {
						return res.status(200).json({ role });
					}
				}
			}

			return res.status(404).json({ message: "User not found" });
		} catch (error) {
			return res.status(400).json({
				message: "Failed to get user type",
				error: error.message,
			});
		}
	},

	isUniqueUsername: async (username) => {
		// Check all models for unique username
		for (let model in models) {
			const existingUser = await models[model].findOne({ username }).exec();
			if (existingUser) {
				return false;
			}
		}
		return true;
	},

	getAllUsers: async (req, res) => {
		try {
			const results = await Promise.all(
				Object.entries(models).map(async ([role, model]) => {
					const users = await model.find({ isAccepted: { $ne: null } });
					return users.map((user) => ({ ...user._doc, role }));
				})
			);

			const combinedUsers = results.flat();
			return res.status(200).json(combinedUsers);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error.message });
		}
	},

	getAllPendingUsers: async (req, res) => {
		try {
			const results = await Promise.all(
				Object.entries(isAcceptedmodels).map(async ([role, model]) => {
					const users = await model.find({isAccepted : null});
					return users.map((user) => ({ ...user._doc, role }));
				})
			);

			const combinedUsers = results.flat();
			return res.status(200).json(combinedUsers);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error.message });
		}
	},
	checkDeletion: async (req, res) => {
		//cases are wrong
		try {
			const { id } = req.params;
			const { role } = req.body;
			

			if (role.toLowerCase() == 'advertiser') {
				const currentDate = new Date();

				//get number of future actvities which head count ! = 0
				const activityCount = await Activities.countDocuments({
					creatorId: id,
					headCount: { $ne: 0 }, // Only count activities where headCount is not equal to 0
					dateTime: { $gt: currentDate } // Only future activities
				});


				if (activityCount != 0) {
					return res.status(404).json({ canDelete: false, message: 'Activity has bookings.' });
				}

				// All activities are deletable
				return res.status(200).json({ canDelete: true });

			}
			else if (role.toLowerCase() == 'tourguide') {
				//check if itenirary is still running aka ana b3d el start date bas abl el end date, can i delete?
				const currentDate = new Date();
		
				const itineraries = await Itinerary.find({
					creatorId: id,
				});
				if(!itineraries){
					return res.status(404).json({ canDelete: false, message: 'No deletable itineraries found for this TourGuide.' });
				}
				for (const itinerary of itineraries) {
					const totalHeadCount = itinerary.availableDatesTimes.reduce((sum, date) => {
						return date.dateTime >= currentDate ? sum + date.headCount : sum;
					}, 0);
						
					if(totalHeadCount > 0){
						// Activity found, return success response or perform the deletion if needed
						return res.status(403).json({ canDelete: false, message: 'itinerary has bookings.' });
					}
				}
				return res.status(200).json({ canDelete: true });
			}
			else{
				return res.status(200).json({ canDelete: true });
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'An error occurred while checking if an account can be deleted.' });
		}
	},

	deleteUser: async (req, res) => {
		const { id } = req.params;
		const { role } = req.body;

		if (!role) {
			return res.status(400).json({ message: "Role is required" });
		}

		try {
			const Model = models[role.toLowerCase()];
			if (!Model) {
				throw new Error("Invalid role");
			}

			let deletionResult;

			if (role.toLowerCase() == 'advertiser'){
				deletionResult = await Activities.deleteMany({ creatorId: id });
			}
			else if (role.toLowerCase() == 'tourguide'){
				deletionResult = await Itinerary.deleteMany({ creatorId: id });
			}
			else if (role.toLowerCase() == 'seller'){
				deletionResult = await Products.deleteMany({ seller: id });
			}
			else if (role.toLowerCase() == 'tourist'){
				deletionResult = await Complaint.deleteMany({ creatorId: id });
			}
			const userDeletionResult = await Model.findByIdAndDelete(id);

			return res.status(200).json({
				message: "User deleted successfully",
				deletedCount: deletionResult ? deletionResult.deletedCount : 0, // Include the count of deleted documents
				userDeleted: userDeletionResult ? true : false, // Indicate if the user was deleted
			});
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},

	updateUserPassword: async (req, res) => {
		const { id } = req.params;
		const { role, passwordHash } = req.body;

		if (!role) {
			return res.status(400).json({ message: "Role is required" });
		}
		if (!passwordHash) {
			return res.status(400).json({ message: "Password is required" });
		}

		try {
			const Model = models[role.toLowerCase()];
			if (!Model) {
				throw new Error("Invalid role");
			}

			const user = await Model.findById(id);

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			user.passwordHash = passwordHash;
			await user.save();
			res.json(user);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	updateUserAcceptance: async (req, res) => {
		const { id } = req.params;
		const { role , isAccepted} = req.body;

		if (!role) {
			return res.status(400).json({ message: "Role is required" });
		}

		try {
			const Model = isAcceptedmodels[role.toLowerCase()];
			if (!Model) {
				throw new Error("Invalid role");
			}

			const user = await Model.findById(id);

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			user.isAccepted = isAccepted;
			await user.save();
			res.json(user);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	
};

module.exports = UserController;
