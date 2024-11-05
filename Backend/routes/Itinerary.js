const express = require("express");
const router = express.Router();
const {
  getItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getAllItineraries,
  getMyItineraries,
  bookItinerary,
  setIsInappropriate,
} = require("../controllers/Itinerary");
const { addRating } = require("../controllers/Itinerary");

router.route("/").post(createItinerary).get(getAllItineraries);

router.route("/book").post(bookItinerary);

router.route("/my-itineraries/:creatorId").get(getMyItineraries);

router
  .route("/:id")
  .get(getItineraryById)
  .put(updateItinerary)
  .delete(deleteItinerary)
  .post(addRating);

router.route("/set-inappropriate/:id").patch(setIsInappropriate);

module.exports = router;
