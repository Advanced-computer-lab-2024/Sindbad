const Tourist = require("../models/Tourist");
const TourGuide = require("../models/TourGuide");
const Advertiser = require("../models/Advertiser");
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
		isAccepted: false,
		createdActivities: [],
		createdIterinaries: [],
		createdHistoricalPlaces: [],
	},
	seller: {
		isAccepted: false,
		products: [],
	},
	tourguide: {
		isAccepted: false,
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
					const users = await model.find();
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

			await Model.findByIdAndDelete(id);
			return res.status(200).json({ message: "User deleted successfully" });
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
};

module.exports = UserController;
