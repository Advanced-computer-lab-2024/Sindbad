const express = require("express");
const router = express.Router();
const {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
} = require("../controllers/activityController");

router
  .route("/activity")
  .post(setActivity)
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

router.route("/my-activities").get(getMyActivities);
module.exports = router;
