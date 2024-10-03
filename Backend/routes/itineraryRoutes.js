const express = require("express");
const router = express.Router();
const {
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
} = require("../controllers/itineraryController");

router
  .route("/:id")
  .get(getItinerary)
  .put(updateItinerary)
  .delete(deleteItinerary);

router.route("/").post(createItinerary);

module.exports = router;
