const express = require("express");
const {
  getHotelsByCity,
  getHotelsByGeocode,
  getHotelOffers,
  bookHotel,
} = require ("../controllers/Hotel.js");

const router = express.Router();

router.get("/by-city", getHotelsByCity);
router.get("/by-geocode", getHotelsByGeocode);
router.get("/:hotelId/offers", getHotelOffers);
router.post("/book", bookHotel);

module.exports = router;
