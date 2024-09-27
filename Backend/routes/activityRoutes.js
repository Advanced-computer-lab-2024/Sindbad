const express = require("express");
const router = express.Router();
const {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

router
  .route("/")
  .post(setActivity)
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = router;
