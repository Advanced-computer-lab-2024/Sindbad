const express = require("express");
const router = express.Router();

const {
	getTourGuide,
	getAllTourGuides,
	updateTourGuide,
  } = require("../controllers/tourGuideController");
  
  router.route("/")
		.get(getAllTourGuides);
  router
	.route("/getTourGuide/:id")
	.get(getTourGuide)
	.put(updateTourGuide);



module.exports = router;
