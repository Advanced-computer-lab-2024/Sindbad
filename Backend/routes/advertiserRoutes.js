const express = require("express");
const AdvertiserController = require("../controllers/advertiserController");

const router = express.Router();

// Route to fetch advertiser profile
router.get("/profile/:id", AdvertiserController.getProfile);

// Route to update advertiser profile
router.put("/profile/:id", AdvertiserController.updateProfile);

module.exports = router;
