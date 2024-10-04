const express = require("express");
const router = express.Router();

const {
	getTourGuide,
	updateTourGuide,
  } = require("../controllers/touristController");
  
  router
	.route("/")
	.get(getTourGuide)
	.put(updateTourGuide);



module.exports = router;
