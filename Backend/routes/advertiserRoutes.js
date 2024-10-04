const express = require("express");
const AdvertiserController = require("../controllers/advertiserController");

const router = express.Router();

// Route to fetch advertiser profile
router.get("/profile/:id", AdvertiserController.getProfile);

// Route to update advertiser profile
router.put("/profile", AdvertiserController.updateProfile);

// Route to fetch all advertiser profiles
router.get("/profiles", AdvertiserController.getAllProfiles);

module.exports = router;
