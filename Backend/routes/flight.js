const express = require("express");
const router = express.Router();
const {
    searchFlights,
    confirmFlightPrice,
    bookFlight,
    getFlightByTouristId,
} = require("../controllers/flight");

router.get("/findFlight", searchFlights);
router.get("/getFlight/:id", getFlightByTouristId);
router.put("/confirmFlight", confirmFlightPrice);
router.put("/bookFlight", bookFlight);



module.exports = router;