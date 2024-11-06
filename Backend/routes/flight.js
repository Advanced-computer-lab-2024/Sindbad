const express = require("express");
const router = express.Router();
const {
    searchFlights,
    confirmFlightPrice,
} = require("../controllers/flight");

router.get("/findFlight", searchFlights);
router.put("/confirmFlight", confirmFlightPrice);




module.exports = router;