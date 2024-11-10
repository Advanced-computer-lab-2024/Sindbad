const express = require("express");
const router = express.Router();
const {
  createTrip,
  getAllTrips,
  getTrip,
  bookTrip,
} = require("../controllers/Trip");

router.post("/create", createTrip);
router.post("/:id/book", bookTrip);
router.get("/:id", getTrip);
router.get("/", getAllTrips);

module.exports = router;
