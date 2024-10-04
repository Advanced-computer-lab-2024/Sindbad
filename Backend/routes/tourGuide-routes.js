const express = require("express");
const router = express.Router();

const {
	getTourGuide,
	updateTourGuide,
  } = require("../controllers/tourGuideController");
  
  router
	.route("/")
	.get(getTourGuide)
	.put(updateTourGuide);



module.exports = router;
