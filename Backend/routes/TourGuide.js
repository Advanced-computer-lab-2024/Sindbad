const express = require("express");
const router = express.Router();

const {
	getAllTourGuides,
	getTourGuide,
	updateTourGuide,
	deleteTourGuide,
	deletePreviousWork,
	addTourGuideDocuments,
} = require("../controllers/TourGuide");

router
	.route("/")
	.get(getAllTourGuides);

router
	.route("/:id")
	.get(getTourGuide)
	.put(updateTourGuide)
	.delete(deleteTourGuide);

router
	.route("/:id/previous-work/:previousWorkId")
	.delete(deletePreviousWork);

router.route("/upload/:id").put(addTourGuideDocuments);

module.exports = router;
