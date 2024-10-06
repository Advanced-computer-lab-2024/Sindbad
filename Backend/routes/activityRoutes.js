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

router.route("/my-activities/:creatorId").get(getMyActivities);
// router.route("/search").get(searchActivities);
// router.route("/filter").get(filterActivities);
// router.route("/sort").get(getActivities);

router.route("/").post(setActivity).get(getActivities);

router
  .route("/:id")
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = router;
