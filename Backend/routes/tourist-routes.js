const express = require("express");
const router = express.Router();



const {
	getTourist,
	updateTourist,
	deleteTourist,
	getAllTourists,
  } = require("../controllers/touristController");

  router.get("/",getAllTourists);
  router.get("/:id",getTourist);
  router.put("/:id", updateTourist);
  router.delete("/:id", deleteTourist); 


module.exports = router;