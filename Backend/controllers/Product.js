const Product = require("../models/Product");
// const ProductSales = require("../models/Sales/ProductSale");
const Sale = require("../models/Sale");
const Tourist = require("../models/Tourist");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
/**
 * Gets a product by ID
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("creatorId"); // Use req.params.id
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

  let query = {
    // Filter out archived products
    isArchived: false,
  };

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const minPriceNum = minprice ? Number(minprice) : null;
  const maxPriceNum = maxprice ? Number(maxprice) : null;

  if (minPriceNum || maxPriceNum) {
    query.price = {};
    if (minPriceNum) query.price.$gte = minPriceNum;
    if (maxPriceNum) query.price.$lte = maxPriceNum;
  }

  try {
    const sortOptions = {};
    if (sortrating) sortOptions.averageRating = sortrating === "asc" ? 1 : -1;

    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting products",
      error: error.message,
    });
  }
};

const getMinMaxPrices = async (req, res) => {
  //get minimum price of all products
  const minProduct = await Product.findOne({}, {}, { sort: { price: 1 } });
  const minProductsPrice = minProduct ? minProduct.price : null;
  //get maximum price of all products
  const maxProduct = await Product.findOne({}, {}, { sort: { price: -1 } });
  const maxProductsPrice = maxProduct ? maxProduct.price : null;

  return res.status(200).json({
    minPrice: minProductsPrice,
    maxPrice: maxProductsPrice,
  });
};

const createProduct = async (req, res) => {
  try {
    // Initialize the product with a default rating map if not provided
    const productData = {
      ...req.body,
      rating:
        req.body.rating ||
        new Map([
          ["1", 0],
          ["2", 0],
          ["3", 0],
          ["4", 0],
          ["5", 0],
        ]),
    };

    const stripeProduct = await stripe.products.create({
      name: productData.name,
    });
    
    const price = await stripe.prices.create({
      unit_amount: productData.price * 100, // Price in cents (2000 = $20.00)
      currency: 'usd',
      product: stripeProduct.id, // Use the product ID from the previous step
    });

    productData.priceId = price.id;

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
    const { name, price, description, imageUris, quantity, isArchived } =
      req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, imageUris, quantity, isArchived },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(201).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

const addRating = async (req, res) => {
  try {
    const { id } = req.params; // Product ID
    const { userId, rating } = req.body;

    if (!userId || !rating) {
      return res
        .status(401)
        .json({ message: "userId and rating must be included" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    // Check if the user has purchased this product before
    const purchaseRecord = await Sale.findOne({
      itemId: id,
      buyerId: userId,
    });

    if (!purchaseRecord) {
      return res.status(403).json({
        message: "User has not purchased this product and cannot rate it.",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user has already rated this product
    if (product.userRatings.includes(userId)) {
      return res
        .status(403)
        .json({ message: "User has already rated this product." });
    }

    // Ensure that product.rating is a Map
    if (!(product.rating instanceof Map)) {
      product.rating = new Map(Object.entries(product.rating));
    }

    // Increment the count of the given rating
    const currentCount = product.rating.get(rating.toString()) || 0;
    product.rating.set(rating.toString(), currentCount + 1);

    // Add the userId to the userRatings array
    product.userRatings.push(userId);

    // Recalculate the average rating
    product.averageRating = calculateAverageRating(product.rating);
    await product.save();

    res.status(200).json({ message: "Rating added successfully", product });
  } catch (error) {
    res.status(500).json({
      message: "Error adding rating",
      error: error.message,
    });
  }
};

//add review by id
const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { userId, rating, comment } = req.body;

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const purchaseRecord = await Sale.findOne({
      itemId: product,
      buyerId: userId,
    });

    if (!purchaseRecord) {
      return res.status(403).json({
        message: "User has not purchased this product and cannot review it.",
      });
    }

    if (!rating && !comment) {
      return res
        .status(403)
        .json({ message: "User must add a rating or a comment or both" });
    }

    // Find the existing review
    const existingReviewIndex = product.reviews.findIndex(
      (review) => review.userId === userId
    );
    let reviewUpdated = false;

    if (existingReviewIndex !== -1) {
      // Review exists, check if it already has a rating
      const existingReview = product.reviews[existingReviewIndex];

      if (rating && existingReview.rating !== undefined) {
        return res.status(403).json({
          message:
            "Rating cannot be updated once set. Only comments can be updated.",
        });
      }

      // Update the comment if provided
      if (comment) {
        existingReview.comment = comment;
        reviewUpdated = true;
      }

      // Add a rating only if none exists
      if (rating && existingReview.rating === undefined) {
        if (rating < 1 || rating > 5) {
          return res
            .status(400)
            .json({ message: "Rating must be between 1 and 5." });
        }

        if (!(product.rating instanceof Map)) {
          product.rating = new Map(Object.entries(product.rating));
        }

        product.rating.set(
          rating.toString(),
          (product.rating.get(rating.toString()) || 0) + 1
        );

        existingReview.rating = rating;
        product.userRatings.push(userId);
        reviewUpdated = true;
      }

      product.reviews[existingReviewIndex] = existingReview;
    } else {
      // Add a new review if not found
      const newReview = { userId, rating, comment };

      product.reviews.push(newReview);

      if (rating) {
        if (rating < 1 || rating > 5) {
          return res
            .status(400)
            .json({ message: "Rating must be between 1 and 5." });
        }

        if (!(product.rating instanceof Map)) {
          product.rating = new Map(Object.entries(product.rating));
        }

        product.rating.set(
          rating.toString(),
          (product.rating.get(rating.toString()) || 0) + 1
        );

        product.userRatings.push(userId);
      }

      reviewUpdated = true;
    }

    // Recalculate average rating if a rating was added
    if (rating) {
      product.averageRating = calculateAverageRating(product.rating);
    }

    await product.save();

    const responseMessage = reviewUpdated
      ? "Review updated successfully"
      : "Review added successfully";
    res.status(201).json({ message: responseMessage, product });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding or updating review",
      error: error.message,
    });
  }
};

const buyProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { userId } = req.body;

    // if (!quantity || quantity < 1) {
    //     return res.status(400).json({ message: "Quantity must be at least 1" });
    // }

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product has sufficient quantity
    // if (product.quantity < quantity) {
    //     return res.status(400).json({ message: "Insufficient quantity available" });
    // }

    quantity = 1;

    // Calculate the total price
    const totalPrice = product.price;

    // Create a new entry in the ProductSales collection
    const productSale = new Sale({
      itemId: productId,
	    type: "Product",
      buyerId: userId,
      quantity,
      totalPrice,
    });

    await productSale.save();

    // Update the product's numSales and quantity
    product.numSales += quantity;
    product.quantity -= quantity;

    await product.save();

    res
      .status(201)
      .json({ message: "Product purchased successfully", productSale });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error processing purchase", error: error.message });
  }
};

// module.exports = { buyProduct };

/**
 * Deletes a product by ID
 */
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
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

// Add getProductsByCreatorId function
const getProductsByCreatorId = async (req, res) => {
  try {
    const creatorId = req.params.creatorId;

    const products = await Product.find({ creatorId });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found for this creator" });
    }

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching products for creator",
      error: error.message,
    });
  }
};

const registerAllProductsStripe = async (req, res) => {
  try {
    console.log("Registering all products with Stripe...");
    const products = await Product.find();

    for (const product of products) {
      if (!product.priceId) {
        const stripeProduct = await stripe.products.create({
          name: product.name,
        });

        const price = await stripe.prices.create({
          unit_amount: product.price * 100, // Price in cents (2000 = $20.00)
          currency: "usd",
          product: stripeProduct.id, // Use the product ID from the previous step
        });

        product.priceId = price.id;
        await product.save();
      }
    }

    res.status(200).json({ message: "All products registered successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering products",
      error: "error.message",
    });
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  addReview,
  getMinMaxPrices,
  addRating,
  registerAllProductsStripe,

  // Export getProductsByCreatorId function
  getProductsByCreatorId,
  buyProduct,
};
