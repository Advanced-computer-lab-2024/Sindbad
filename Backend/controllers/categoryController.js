const Category = require("../models/categoryModel");
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
 * @param {Object} req - The request object containing the category ID in the body
 * @param {Object} res - The response object used to send the retrieved category or an error message
 * @returns {Object} - A JSON object of the retrieved category or an error message
 */
const getCategory = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
    return res.status(400).json({ message: "Invalid category ID format" });
  }
  try {
    const category = await Category.findById(req.body.id);
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

module.exports = { createCategory, getCategory };
