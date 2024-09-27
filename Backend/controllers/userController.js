const UserController = {
	signUp: async (req, res) => {
		try {
			const { username, passwordHash, role, ...touristData } = req.body; // Extract role and user data

			let user;
			if (!role) {
				throw new Error("Role is required");
			}
			switch (role) {
				case "tourist":
					const { email, mobileNumber, nationality, DOB, job } =
						touristData;

					if (
						!email ||
						!mobileNumber ||
						!nationality ||
						!DOB ||
						!job
					) {
						throw new Error("Tourist data is required");
					}

					user = await createTourist(
						username,
						passwordHash,
						email,
						mobileNumber,
						nationality,
						DOB,
						job
					);
					break;
				case "tourGuide":
					user = await createTourGuide(username, passwordHash);
					break;
				case "advertiser":
					user = await createAdvertiser(username, passwordHash);
					break;
				case "seller":
					user = await createSeller(username, passwordHash);
					break;
				default:
					throw new Error("Invalid role");
			}

			return res
				.status(201)
				.json({ message: "User created successfully", user });
		} catch (error) {
			return res
				.status(400)
				.json({ message: "Sign up failed", error: error.message });
		}
	},

	createTourist: async (
		username,
		passwordHash,
		email,
		mobileNumber,
		nationality,
		DOB,
		job
	) => {
		// Initialize variables with default values
		const wallet = 0;
		const bookmarks = [];
		const loyaltyPoints = 0;
		const level = 1;
		const xpPoints = 0;
		const isReceiveNotifications = true;
		const wishlist = [];
		const cart = [];
		const addresses = [];

		// Create a new tourist instance
		const tourist = new Tourist({
			username,
			passwordHash,
			email,
			mobileNumber,
			nationality,
			DOB,
			job,
			wallet,
			bookmarks,
			loyaltyPoints,
			level,
			xpPoints,
			isReceiveNotifications,
			wishlist,
			cart,
			addresses,
		});

		// Save tourist to the database
		await tourist.save();
		return tourist;
	},

	createTourGuide: async (username, passwordHash) => {
		const tourGuide = new TourGuide({
			username,
			passwordHash,
			// Add any specific fields for tour guides if needed
		});

		await tourGuide.save();
		return tourGuide;
	},

	createAdvertiser: async (username, passwordHash) => {
		const advertiser = new Advertiser({
			username,
			passwordHash,
			// Add any specific fields for advertisers if needed
		});

		await advertiser.save();
		return advertiser;
	},

	createSeller: async (username, passwordHash) => {
		const seller = new Seller({
			username,
			passwordHash,
			// Add any specific fields for sellers if needed
		});

		await seller.save();
		return seller;
	},
};

module.exports = UserController;
