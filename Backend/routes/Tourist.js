const express = require("express");
const router = express.Router();

const {
  getTouristById,
  getTouristByUsername,
  getAllTourists,
  updateTourist,
  deleteTourist,
  redeemPoints,
} = require("../controllers/Tourist");

router.route("/").get(getAllTourists);

router.route("/:username").get(getTouristByUsername);

router
  .route("/:id")
  .get(getTouristById)
  .put(updateTourist)
  .delete(deleteTourist)
  .post(redeemPoints);

module.exports = router;
