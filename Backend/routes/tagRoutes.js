const express = require("express");
const router = express.Router();
const {
  getTag,
  createTag,
  deleteTag,
  updateTag,
  getAllTags,
} = require("../controllers/tagController");

router.route("/").post(createTag).get(getAllTags);
router.route("/:id").get(getTag).put(updateTag).delete(deleteTag);

module.exports = router;
