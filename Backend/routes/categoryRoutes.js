const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.route("/").post(createCategory).get(getCategory).delete(deleteCategory);

module.exports = router;
