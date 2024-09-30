const express = require("express");
const router = express.Router();

const {
	getTourGuide,
	updateTourGuide,
  } = require("../controllers/tourGuideController");
  
  router
	.route("/")
	.get(getTourGuide)
	.patch(updateTourGuide);



module.exports = router;
