const express = require("express");
const router = express.Router();
const {
	createTourismGovernor,
	getTourismGovernorById,
} = require("../controllers/TourismGovernor");

router.route("/")
    .post(createTourismGovernor);

router.route("/:id")
    .get(getTourismGovernorById);

module.exports = router;