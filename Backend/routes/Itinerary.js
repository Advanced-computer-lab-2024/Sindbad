const express = require("express");
const router = express.Router();
const {
  getItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getAllItineraries,
  getMyItineraries,
  addComment,
  addRating,
  bookItinerary,
  cancelBooking,
  setIsInappropriate,
} = require("../controllers/Itinerary");

router.route("/")
  // .post(createItinerary)
  .get(getAllItineraries);

router.route("/book").post(bookItinerary);

router.route("/cancel").post(cancelBooking);

router.route("/my-itineraries/:creatorId").get(getMyItineraries);

router.route("/:id/comment").post(addComment);

router
  .route("/:id")
  .get(getItineraryById)
  // .put(updateItinerary)
  .delete(deleteItinerary)
  .post(addRating);

router.route("/set-inappropriate/:id").patch(setIsInappropriate);

module.exports = router;
