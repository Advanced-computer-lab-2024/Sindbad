const express = require("express");
const router = express.Router();
const {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
  getActivities,
  addRating,
  bookActivity,
  setIsInappropriate,
} = require("../controllers/Activity");

router.route("/my-activities/:creatorId").get(getMyActivities);

router.route("/").post(setActivity).get(getActivities);

router.route("/book").post(bookActivity);

router
  .route("/:id")
  .get(getActivity)
  .put(updateActivity)
  .delete(deleteActivity)
  .post(addRating);

router.route("/set-inappropriate/:id").patch(setIsInappropriate);

module.exports = router;
