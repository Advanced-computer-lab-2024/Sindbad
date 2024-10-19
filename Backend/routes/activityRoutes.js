const express = require("express");
const router = express.Router();
const {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
  getActivities,
} = require("../controllers/activityController");

router.route("/my-activities/:creator-id").get(getMyActivities);

router.route("/").post(setActivity).get(getActivities);

router
  .route("/:id")
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = router;
