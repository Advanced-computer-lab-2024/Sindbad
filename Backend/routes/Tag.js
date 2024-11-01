const express = require("express");
const router = express.Router();
const {
	getTagById,
	createTag,
	deleteTag,
	updateTag,
	getAllTags,
} = require("../controllers/Tag");

router
  .route("/")
  .post(createTag)
  .get(getAllTags);

router
  .route("/:id")
  .get(getTagById)
  .put(updateTag)
  .delete(deleteTag);

module.exports = router;
