const express = require("express");
const AdvertiserController = require("../controllers/Advertiser");

const router = express.Router();

router.route("/").get(AdvertiserController.getAllAdvertisers);


router.route("/upload/:id").put(AdvertiserController.addAdvertiserDocuments);
router
	.route("/:id")
	.get(AdvertiserController.getAdvertiserById)
	.put(AdvertiserController.updateAdveriser);

module.exports = router;
