const Category = require("../models/Category");
const mongoose = require("mongoose");

/**
 * Creates a new category
 *
 * @param {Object} req - Request object containing category details
 * @param {Object} res - Response object for sending the result
 * @returns {Object} - JSON object of the created category or error message
 *
 * @throws {400} - If category name already exists
 */

const createCategory = async (req, res) => {
	try {
		const category = await Category.create(req.body);
		res.status(201).json(category);
	} catch (error) {
		if (error.code === 11000) {
			// MongoDB duplicate key error
			return res.status(400).json({
				message: "Category name already exists",
			});
		}
		return res.status(500).json({
			message: "Error creating category",
			error: error.message,
		});
	}
};

/**
 * Retrieves a category by its ID
 *
 * @param {Object} req - The request object containing the category ID/name in params
 * @param {Object} res - The response object used to send the retrieved category or an error message
 * @returns {Object} - A JSON object of the retrieved category or an error message
 */

const getCategoryById = async (req, res) => {
	const { id } = req.params;

	try {
		let category;

		if (mongoose.Types.ObjectId.isValid(id)) {
			category = await Category.findById(id);
		} else {
			category = await Category.findOne({ name: id });
		}

		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}
		res.status(200).json(category);
	} catch (error) {
		return res.status(500).json({
			message: "Error getting category",
			error: error.message,
		});
	}
};

/**
 * Retrieves all categories
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object used to send the retrieved categories or an error message
 * @returns {Object} - A JSON array of all categories or an error message
 */
const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (error) {
		return res.status(500).json({
			message: "Error getting categories",
			error: error.message,
		});
	}
};

/**
 * Deletes a category by its ID
 *
 * @param {Object} req - Request object containing the category ID
 * @param {Object} res - Response object for sending status and message
 */

const deleteCategory = async (req, res) => {
	try {
		const deletedCategory = await Category.findByIdAndDelete(req.params.id);

		if (!deletedCategory) {
			return res.status(404).json({ message: "Category not found" });
		}

		res.status(200).json({ message: "Category deleted successfully" });
	} catch (error) {
		res.status(500).json({
			message: "Error deleting category",
			error: error.message,
		});
	}
};

/**
 * Updates a category
 *
 * @param {Object} req - Request with category ID in params and updated data in the body
 * @param {Object} res - Response object for sending results
 * @returns {Object} - Updated category or error message
 */

const updateCategory = async (req, res) => {
	try {
		const { name } = req.body;
		const { id } = req.params;

		const updatedCategory = await Category.findByIdAndUpdate(
			id,
			{ name },
			{ new: true, runValidators: true }
		);

		if (!updatedCategory) {
			return res.status(404).json({ message: "Category not found" });
		}

		res.status(200).json(updatedCategory);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating category", error: error.message });
	}
};

module.exports = {
	createCategory,
	getCategoryById,
	deleteCategory,
	updateCategory,
	getAllCategories,
};
