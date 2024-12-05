const express = require("express");
const router = express.Router();
const {
  createTrip,
  getAllTrips,
  getTrip,
  getMyTrips,
  bookTrip,
  deleteTrip,
  updateTrip,
} = require("../controllers/Trip");

// router.post("/create", createTrip);
router.post("/:id/book", bookTrip);
router.get("/:id", getTrip);
router.get("/", getAllTrips);
// router.put("/:tripId", updateTrip);
router.get("/my-trips/:creatorId", getMyTrips);
router.delete("/:tripId", deleteTrip);

module.exports = router;
