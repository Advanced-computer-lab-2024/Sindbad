const Tourist = require("../models/tourist");
const TourGuide = require("../models/TourGuide");
const Advertiser = require("../models/Advertiser");
const Seller = require("../models/Seller");

const isAccepted = async (req, res, next) => {
	try {
		// Destructure username and role from request body
		const { username, role } = req.body;

		let user;

		// Fetch user data based on role
		switch (role.toLowerCase()) {
			case "tourist":
				user = await Tourist.findOne({ username });
				break;
			case "tourguide":
				user = await TourGuide.findOne({ username });
				break;
			case "advertiser":
				user = await Advertiser.findOne({ username });
				break;
			case "seller":
				user = await Seller.findOne({ username });
				break;
			default:
				return res
					.status(400)
					.json({ message: "Invalid role specified" }); // 400 Bad Request for invalid role
		}

		// Check if the user exists
		if (!user) {
			return res.status(404).json({
				message: "User not found", // 404 Not Found if user doesn't exist
			});
		}

		// Check if the user is accepted
		if (!user.isAccepted) {
			return res.status(403).json({
				message: "Your account is not yet accepted. Please wait.", // 403 Forbidden if not accepted
			});
		}

		// If everything is fine, proceed to the next middleware or route handler
		next();
	} catch (error) {
		console.error("Error in isAccepted middleware:", error);
		return res.status(500).json({ message: "Internal server error" }); // 500 Internal Server Error
	}
};

module.exports = isAccepted;
