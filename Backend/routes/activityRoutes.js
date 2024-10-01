const express = require("express");
const router = express.Router();
const {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
  getAllActivities,
  searchActivities,
  filterActivities,
  getSortedActivities,
} = require("../controllers/activityController");

router
  .route("/")
  .post(setActivity)
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

router.route("/my-activities").get(getMyActivities);
router.route("/all-activities").get(getAllActivities);
router.route("/search").get(searchActivities);
router.route("/filter").get(filterActivities);
router.route("/sort").get(getSortedActivities);

module.exports = router;
