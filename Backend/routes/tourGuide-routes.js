const express = require("express");
const router = express.Router();

const {
	getAllTourGuides,
	getTourGuide,
	updateTourGuide,
	deleteTourGuide,
  } = require("../controllers/tourGuideController");
  
	router.get("/", getAllTourGuides)
	router.get("/:id",getTourGuide)
	router.put("/:id", updateTourGuide);
	router.delete("/:id", deleteTourGuide); 



module.exports = router;
