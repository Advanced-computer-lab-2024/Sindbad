const express = require("express");
const router = express.Router();

const {
	getAllTourGuides,
	getTourGuide,
	updateTourGuide,
	deleteTourGuide,
	deletePreviousWork,
	addComment,
	addRating,
	addTourGuideDocuments,
} = require("../controllers/TourGuide");

router.route("/:id/comment").post(addComment);

router
	.route("/")
	.get(getAllTourGuides);

router
	.route("/:id")
	.get(getTourGuide)
	.put(updateTourGuide)
	.delete(deleteTourGuide)
	.post(addRating);

router
	.route("/:id/previous-work/:previousWorkId")
	.delete(deletePreviousWork);

// router.route("/upload/:id").put(
// 	upload.fields([
// 		{ name: 'idCardImage', maxCount: 1 },
// 		{ name: 'certificateImage', maxCount: 1 },
// 	]),
// 	addTourGuideDocuments
// );

module.exports = router;
