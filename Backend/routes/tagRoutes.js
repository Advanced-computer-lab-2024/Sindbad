const express = require("express");
const router = express.Router();
const {
  getTag,
  createTag,
  deleteTag,
  updateTag,
  getAllTags,
} = require("../controllers/tagController");

router.route("/").post(createTag).get(getTag).delete(deleteTag).put(updateTag);
router.route("/allTags").get(getAllTags);

module.exports = router;
