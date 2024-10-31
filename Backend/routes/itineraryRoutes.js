const express = require("express");
const router = express.Router();
const {
	getItineraryById,
	createItinerary,
	updateItinerary,
	deleteItinerary,
	getAllItineraries,
	getMyItineraries,
} = require("../controllers/itineraryController");
const { addRating } = require("../controllers/itineraryController");

router.route("/").post(createItinerary).get(getAllItineraries);

router
	.route("/:id")
	.get(getItineraryById)
	.put(updateItinerary)
	.delete(deleteItinerary);
  .post(addRating);

router.route("/my-itineraries/:creator-id").get(getMyItineraries);

module.exports = router;
