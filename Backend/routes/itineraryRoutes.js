const express = require("express");
const router = express.Router();
const {
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getAllItineraries,
  getItinerariesByCreator,
} = require("../controllers/itineraryController");

router
  .route("/:id")
  .get(getItinerary)
  .put(updateItinerary)
  .delete(deleteItinerary);

router.route("/").post(createItinerary).get(getAllItineraries);

router.route("/myItineraries/:id").get(getItinerariesByCreator);

module.exports = router;
