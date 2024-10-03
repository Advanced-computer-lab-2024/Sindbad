const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById, // Include the new function
} = require("../controllers/productController");

const router = express.Router();

// Route to add a product
router.post("/", createProduct);

// Route to update a product
router.put("/:id", updateProduct);

// Route to get all products with optional search and sort
router.get("/", getAllProducts); // This seems to be a separate filtering route

// Route to get a product by ID
router.get("/:id", getProductById); // Use getProductById here

module.exports = router;
