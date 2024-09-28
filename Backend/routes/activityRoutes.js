const express = require("express");
const router = express.Router();
const {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
  getAllActivities,
} = require("../controllers/activityController");

router
  .route("/")
  .post(setActivity)
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

router.route("/my-activities").get(getMyActivities);
router.route("/all-activities").get(getAllActivities);

module.exports = router;
