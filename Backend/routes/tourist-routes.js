const express = require("express");
const router = express.Router();



const {
	getTourist,
	updateTourist,
  } = require("../controllers/touristController");
  
  router
	.route("/getTourist/:id")
	.get(getTourist)
	.put(updateTourist);


module.exports = router;