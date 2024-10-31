const express = require("express");
const router = express.Router();
const {
	createCategory,
	getCategoryById,
	deleteCategory,
	updateCategory,
	getAllCategories,
} = require("../controllers/Category");

router.route("/").post(createCategory).get(getAllCategories);

router
	.route("/:id")
	.get(getCategoryById)
	.put(updateCategory)
	.delete(deleteCategory);

module.exports = router;
