const express = require("express");
const router = express.Router();

const {
	getTourist,
	getAllTourists,
	updateTourist,
	deleteTourist,
  } = require("../controllers/touristController");

  router.get("/",getAllTourists);
  router.get("/:id",getTourist);
  router.put("/:id", updateTourist);
  router.delete("/:id", deleteTourist); 

router.route("/getTourist/:id")
			.get(getTourist)
			.put(updateTourist);

module.exports = router;
