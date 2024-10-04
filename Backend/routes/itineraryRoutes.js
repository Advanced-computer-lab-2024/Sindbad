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
  filterItineraries,
} = require("../controllers/itineraryController");

router.route("/sort").get(getSortedItineraries);

router.route("/search").get(searchItineraries);

router.route("/filter").get(filterItineraries);

router.route("/").post(createItinerary).get(getAllItineraries);

router
  .route("/:id")
  .get(getItinerary)
  .put(updateItinerary)
  .delete(deleteItinerary);

router.route("/myItineraries/:id").get(getItinerariesByCreator);

module.exports = router;
