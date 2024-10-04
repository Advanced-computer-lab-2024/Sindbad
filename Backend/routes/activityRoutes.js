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

router.route("/my-activities").get(getMyActivities);
router.route("/search").get(searchActivities);
router.route("/filter").get(filterActivities);
router.route("/sort").get(getSortedActivities);

router
  .route("/") // For creating a new activity and getting all activities
  .post(setActivity)
  .get(getAllActivities); // Changed to getAllActivities for better clarity

// Updated route to get an activity by ID
router
  .route("/:id") // Use a URL parameter for the activity ID
  .get(getActivity) // Get a specific activity
  .put(updateActivity) // Update an activity by ID
  .delete(deleteActivity); // Delete an activity by ID

module.exports = router;
