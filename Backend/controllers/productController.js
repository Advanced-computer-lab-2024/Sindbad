const Product = require("../models/productModel");

/**
 * Gets a product by ID
 */
const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate("seller"); // Use req.params.id
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product); // Change status to 200 for a successful fetch
    } catch (error) {
      return res.status(500).json({
        message: "Error getting product",
        error: error.message,
      });
    }
  };
  
  /**
   * Retrieves all products, with optional filtering and sorting by price
   */
  const getAllProducts = async (req, res) => {
    const { search, minPrice, maxPrice, sortPrice } = req.query;
  
    let query = {};
    
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search by name
    }
  
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }
  
    try {
      const products = await Product.find(query).sort(sortPrice ? { price: sortPrice === "asc" ? 1 : -1 } : {});
      res.status(200).json(products); // Change status to 200 for a successful fetch
    } catch (error) {
      return res.status(500).json({
        message: "Error getting products",
        error: error.message,
      });
    }
  };
  
/**
 * Creates a new product
 */
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

/**
 * Updates an existing product by ID
 */
const updateProduct = async (req, res) => {
  try {
    const { id, name, price, description, quantity } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, quantity },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

/**
 * Deletes a product by ID
 */
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.body.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(201).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
  };
