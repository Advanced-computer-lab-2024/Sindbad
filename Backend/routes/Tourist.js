const express = require("express");
const router = express.Router();

const {
	getTouristById,
	getAllTourists,
	updateTourist,
	deleteTourist,
} = require("../controllers/Tourist");

router.route("/").get(getAllTourists);

router
	.route("/:id")
	.get(getTouristById)
	.put(updateTourist)
	.delete(deleteTourist);

module.exports = router;
