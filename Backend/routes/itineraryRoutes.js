const express = require("express");
const router = express.Router();
const {
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getAllItineraries,
  getItinerariesByCreator,
  searchItineraries,
  getSortedItineraries,
} = require("../controllers/itineraryController");

router.route("/sort").get(getSortedItineraries);

router.route("/search").get(searchItineraries);

router
  .route("/:id")
  .get(getItinerary)
  .put(updateItinerary)
  .delete(deleteItinerary);

router.route("/").post(createItinerary).get(getAllItineraries);

router.route("/myItineraries/:id").get(getItinerariesByCreator);

module.exports = router;
