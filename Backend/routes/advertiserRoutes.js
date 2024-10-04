const express = require("express");
const AdvertiserController = require("../controllers/advertiserController");

const router = express.Router();

// Route to fetch advertiser profile
router.get("/profile", AdvertiserController.getProfile);

// Route to update advertiser profile
router.put("/profile", AdvertiserController.updateProfile);

module.exports = router;
