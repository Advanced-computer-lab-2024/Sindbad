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
  addComment,
  bookActivity,
  cancelBooking,
  setIsInappropriate,
} = require("../controllers/Activity");

router.route("/my-activities/:creatorId").get(getMyActivities);

router.route("/")
  // .post(setActivity)
  .get(getActivities);

router.route("/:id/comment").post(addComment);

router.route("/book").post(bookActivity);

router.route("/cancel").post(cancelBooking);

router
  .route("/:id")
  .get(getActivity)
  // .put(updateActivity)
  .delete(deleteActivity)
  .post(addRating);

router.route("/set-inappropriate/:id").patch(setIsInappropriate);

module.exports = router;
