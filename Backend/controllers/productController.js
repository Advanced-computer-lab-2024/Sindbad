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
    // console.log("Log", "hi");
    const { search, minprice, maxprice, sortprice } = req.query;
  
    // console.log("Log", "hi");
    let query = {};
    
    // Handle search by name (case-insensitive)
    if (search) {
      query.name = { $regex: search, $options: "i" };
      // console.log("Log", "hi");
    }
  
    // Ensure minprice and maxprice are parsed as numbers
    const minPriceNum = minprice ? Number(minprice) : null;
    const maxPriceNum = maxprice ? Number(maxprice) : null;
  
    // Apply price filter if provided
    if (minPriceNum || maxPriceNum) {
      query.price = {};
      if (minPriceNum) query.price.$gte = minPriceNum;
      if (maxPriceNum) query.price.$lte = maxPriceNum;
    }
  
    // Log the final query to debug
    // console.log("Query:", query);
  
    try {
      // Apply sorting by price if specified
      const sortOptions = sortprice ? { price: sortprice === "asc" ? 1 : -1 } : {};
  
      // Fetch filtered and sorted products
      const products = await Product.find(query).sort(sortOptions);
  
      res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        message: "Error getting products",
        error: error.message,
      });
    }
    // console.log("minprice:", minprice, "maxprice:", maxprice);
    // console.log("Query after processing:", query);

  };
  
  
  
/**
 * 
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
    const { id } = req.params; // Extract the id from req.params
    const { name, price, description, quantity } = req.body;

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
