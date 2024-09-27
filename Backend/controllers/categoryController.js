const Category = require("../models/categoryModel");

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

module.exports = { createCategory };
