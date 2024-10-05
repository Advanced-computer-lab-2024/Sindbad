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
  const { search, minprice, maxprice, sortrating } = req.query;

  let query = {};

  // Handle search by name (case-insensitive)
  if (search) {
    query.name = { $regex: search, $options: "i" };
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

  try {
    // Apply sorting by price or rating if specified
    const sortOptions = {};
    if (sortrating) sortOptions.averageRating = sortrating === "asc" ? 1 : -1;

    // Fetch filtered and sorted products
    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting products",
      error: error.message,
    });
  }
};

  
  

const createProduct = async (req, res) => {
  try {
      // Initialize the product with a default rating map if not provided
      const productData = {
          ...req.body,
          rating: req.body.rating || new Map([
              ["0", 0],
              ["1", 0],
              ["2", 0],
              ["3", 0],
              ["4", 0],
              ["5", 0],
          ]),
      };

      const product = await Product.create(productData);

      // Ensure the product.rating is converted into a Map before calculating the average rating
      if (!(product.rating instanceof Map)) {
          product.rating = new Map(Object.entries(product.rating));
      }

      // Calculate average rating after saving the product
      product.averageRating = calculateAverageRating(product.rating);

      // Save the updated average rating
      await product.save();

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

//add review by id
const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { username, rating, comment } = req.body;

    if (rating < 0 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 0 and 5" });
    }

    const newReview = { username, rating, comment };
    product.reviews.push(newReview);

    product.rating.set(rating.toString(), (product.rating.get(rating.toString()) || 0) + 1);

    product.averageRating = calculateAverageRating(product.rating);

    await product.save();

    res.status(201).json({ message: "Review added successfully", product });
  } catch (error) {
    return res.status(500).json({ message: "Error adding review", error: error.message });
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

const calculateAverageRating = (ratings) => {
  let totalRating = 0;
  let totalVotes = 0;

  // Use the entries of the Map and a for...of loop
  for (const [rating, count] of ratings.entries()) {
    totalRating += parseInt(rating) * count; // Multiply rating by the number of votes
    totalVotes += count; // Sum the number of votes
  }

  return totalVotes > 0 ? totalRating / totalVotes : 0; // Return average or 0 if no votes
};


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    addReview,
  };
