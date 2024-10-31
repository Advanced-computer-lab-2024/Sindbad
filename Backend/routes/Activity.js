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
} = require("../controllers/Activity");

router.route("/my-activities/:creatorId").get(getMyActivities);

router.route("/").post(setActivity).get(getActivities);

router
	.route("/:id")
	.get(getActivity)
	.put(updateActivity)
	.delete(deleteActivity)
	.post(addRating);

module.exports = router;
