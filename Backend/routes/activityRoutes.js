const express = require("express");
const router = express.Router();
const {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
  getAllActivities,
  searchActivityByName,
  searchActivitiesByTags,
  searchActivitiesByCategory,
} = require("../controllers/activityController");

router
  .route("/")
  .post(setActivity)
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

router.route("/my-activities").get(getMyActivities);
router.route("/all-activities").get(getAllActivities);
router.route("/search-by-name").get(searchActivityByName);
router.route("/search-by-tags").get(searchActivitiesByTags);
router.route("/search-by-category").get(searchActivitiesByCategory);

module.exports = router;
