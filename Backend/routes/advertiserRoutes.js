const express = require("express");
const AdvertiserController = require("../controllers/advertiserController");

const router = express.Router();

router.route("/").get(AdvertiserController.getAllAdvertisers);

router
	.route("/:id")
	.get(AdvertiserController.getAdvertiserById)
	.put(AdvertiserController.updateAdveriser);

module.exports = router;
