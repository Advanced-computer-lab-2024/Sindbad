const express = require("express");
const AdvertiserController = require("../controllers/advertiserController");
const isAcceptedMiddleware = require("../middlewares/isAccepted");

const router = express.Router();

// Route to fetch advertiser profile
router.get(
	"/profile", // No username in the URL
	isAcceptedMiddleware, // Ensure the advertiser is accepted
	AdvertiserController.getProfile // Controller method to handle fetching the profile
);

// Route to update advertiser profile
router.put(
	"/profile", // No username in the URL
	isAcceptedMiddleware, // Ensure the advertiser is accepted
	AdvertiserController.updateProfile // Controller method to handle updating the profile
);

module.exports = router;
