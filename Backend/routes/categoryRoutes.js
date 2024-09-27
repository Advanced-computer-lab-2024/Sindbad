const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

router
  .route("/")
  .post(createCategory)
  .get(getCategory)
  .delete(deleteCategory)
  .put(updateCategory);

module.exports = router;
