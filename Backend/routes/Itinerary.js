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
} = require("../controllers/Itinerary");

router.route("/").post(createItinerary).get(getAllItineraries);

router.route("/my-itineraries/:creatorId").get(getMyItineraries);

router.route("/:id/comment").post(addComment);

router
	.route("/:id")
	.get(getItineraryById)
	.put(updateItinerary)
	.delete(deleteItinerary)
    .post(addRating);

module.exports = router;
