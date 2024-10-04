const express = require("express");
const router = express.Router();

const {
	getTourist,
	getAllTourists,
	updateTourist,
} = require("../controllers/touristController");

router.route("/")
			.get(getAllTourists);

router.route("/getTourist/:id")
			.get(getTourist)
			.put(updateTourist);

module.exports = router;
