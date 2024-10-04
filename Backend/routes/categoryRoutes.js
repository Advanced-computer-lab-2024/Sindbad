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

router.route("/").post(createCategory).get(getAllCategories);

router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

router.route("/all-categories").get(getAllCategories);

module.exports = router;
