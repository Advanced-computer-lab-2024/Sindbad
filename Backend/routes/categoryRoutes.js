const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const { getAllActivities } = require("../controllers/activityController");

router
  .route("/")
  .post(createCategory)
  .get(getCategory)
  .delete(deleteCategory)
  .put(updateCategory);

router.route("/all-categories").get(getAllCategories);

module.exports = router;
