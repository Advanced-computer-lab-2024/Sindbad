const express = require("express");
const router = express.Router();
const {
    searchFlights,
    confirmFlightPrice,
    bookFlight,
} = require("../controllers/flight");

router.get("/findFlight", searchFlights);
router.put("/confirmFlight", confirmFlightPrice);
router.put("/bookFlight", bookFlight);




module.exports = router;