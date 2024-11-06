const express = require("express");
const router = express.Router();
const {
	createTourismGovernor,
	getTourismGovernorById,
    updateTourismGovernor
} = require("../controllers/TourismGovernor");

router.route("/")
    .post(createTourismGovernor);

router.route("/:id")
    .get(getTourismGovernorById)
    .put(updateTourismGovernor);

module.exports = router;