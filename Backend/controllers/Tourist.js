const Tourist = require("../models/Tourist");
const Product = require("../models/Product");
const mongoose = require("mongoose");

/**
 * Retrieves a tourist by its ID
 *
 * @param {Object} req - The request object containing the tourist ID in the body
 * @param {Object} res - The response object used to send the retrieved tourist or an error message
 * @returns {Object} - A JSON object of the retrieved tourist or an error message
 */

const getTouristById = async (req, res) => {
  let tourist;
  try {
    tourist = await Tourist.findById(req.params.id);
    if (tourist == null) {
      return res.status(404).json({ message: "Tourist not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error finding tourist",
      error: err.message,
    });
  }
  return res.json(tourist);
};

const getTouristByUsername = async (req, res) => {
  let tourist;
  try {
    tourist = await Tourist.findOne({ username: req.params.username });
    if (tourist == null) {
      return res.status(404).json({ message: "Tourist not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error finding tourist",
      error: err.message,
    });
  }
  return res.json(tourist);
};

/**
 * Retrieves all tourists
 * @param {Object} req - The request object
 * @param {Object} res - The response object used to send the retrieved tourists or an error message
 * @returns {Object} - A JSON object of the retrieved tourists or an error message
 */
const getAllTourists = async (req, res) => {
  try {
    const tourists = await Tourist.find();
    res.json(tourists);
  } catch {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Updates a tourist's profile
 *
 * @param {Object} req - Request with tourist ID
 * @param {Object} res - Response object for sending results
 * @returns {Object} - Updated tourist profile or error message
 */

const updateTourist = async (req, res) => {
  let tourist;
  try {
    tourist = await Tourist.findById(req.params.id);
    if (tourist == null) {
      return res.status(404).json({ message: "Tourist not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error finding tourist",
      error: err.message,
    });
  }
  res.tourist = tourist;

  if (req.body.email != null) {
    res.tourist.email = req.body.email;
  }
  if (req.body.mobileNumber != null) {
    res.tourist.mobileNumber = req.body.mobileNumber;
  }
  if (req.body.nationality != null) {
    res.tourist.nationality = req.body.nationality;
  }
  if (req.body.DOB != null) {
    res.tourist.DOB = req.body.DOB;
  }
  if (req.body.job != null) {
    res.tourist.job = req.body.job;
  }
  if (req.body.wallet != null) {
    res.tourist.wallet = req.body.wallet;
  }
  if (req.body.preferences != null) {
    res.tourist.preferences = req.body.preferences;
  }
  if (req.body.profileImageUri != null) {
    res.tourist.profileImageUri = req.body.profileImageUri;
  }
  if (req.body.bannerImageUri != null) {
    res.tourist.bannerImageUri = req.body.bannerImageUri;
  }
  if (req.body.preferredCurrency != undefined) {
    res.tourist.preferredCurrency = req.body.preferredCurrency;
  }

  try {
    const updatedTourist = await res.tourist.save();
    res.json(updatedTourist);
  } catch (err) {
    return res.status(400).json({
      message: "Error updating tourist",
      error: err.message,
    });
  }
};

/**
 * deletes a tourist's profile
 *
 * @param {Object} req - Request with tourist ID
 * @returns {Object} - Deleted tourist profile or error message
 */
const deleteTourist = async (req, res) => {
  try {
    const deletedTourist = await Tourist.findByIdAndDelete(req.params.id);
    if (deletedTourist == null) {
      return res.status(404).json({ message: "Tourist not found" });
    } else {
      res.json(deletedTourist);
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting Tourist",
      error: err.message,
    });
  }
};

const redeemPoints = async (req, res) => {
  try {
    const touristId = req.params.id;
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }
    if (tourist.loyaltyPoints === 0)
      return res
        .status(400)
        .json({ message: "You don't have any points to redeem" });

    tourist.wallet += tourist.loyaltyPoints / 100;
    tourist.loyaltyPoints = 0;

    await tourist.save();

    res.status(200).json({
      message: "Points redeemed successfully",
      wallet: tourist.wallet,
      loyaltyPoints: tourist.loyaltyPoints,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error redeeming points",
      error: err.message,
    });
  }
};


const addProductToWishlist = async (req, res) => {
  const { id: touristId } = req.params; // Tourist ID from URL params
  const { productID } = req.body; // Product ID from request body

  // Ensure the productID is provided
  if (!productID) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    const product = await Product.findById(productID);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the wishlist
    const alreadyInWishlist = tourist.wishlist.some(
      (item) => item.productID.toString() === productID
    );

    if (alreadyInWishlist) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    // Add the product to the wishlist
    tourist.wishlist.push({ productID });
    await tourist.save();

    res.status(200).json({
      message: "Product added to wishlist",
      wishlist: tourist.wishlist,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding product to wishlist",
      error: err.message,
    });
  }
};


const getWishlistProducts = async (req, res) => {
  try {
    // Extract tourist ID from params
    const touristId = req.params.id;

    // Find the tourist by ID and ensure wishlist exists
    const tourist = await Tourist.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Get product IDs from the wishlist (only the productID field)
    const wishlistProductIds = tourist.wishlist.map(item => item.productID);

    // Fetch product details from the database
    const products = await Product.find({ _id: { $in: wishlistProductIds } });

    // Check if there are any products found
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in wishlist" });
    }

    // Return the list of product models
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching wishlist products",
      error: error.message,
    });
  }
};


const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params; // Tourist ID
    const { productID } = req.body; // Product ID to be removed

    if (!productID) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find the tourist by ID
    const tourist = await Tourist.findById(id);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Find the index of the product in the wishlist using the productID
    const productIndex = tourist.wishlist.findIndex((item) =>
      item.productID.toString() === productID.toString() // Compare productID field inside the object
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    // Remove the product from the wishlist
    tourist.wishlist.splice(productIndex, 1);

    // Save the updated tourist
    await tourist.save();

    res.status(200).json({
      message: "Product removed from wishlist successfully",
      wishlist: tourist.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing product from wishlist",
      error: error.message,
    });
  }
};



module.exports = {
  getAllTourists,
  getTouristById,
  getTouristByUsername,
  getAllTourists,
  updateTourist,
  deleteTourist,
  redeemPoints,
  addProductToWishlist,
  getWishlistProducts,
  removeFromWishlist,
};

/*
//create
router.post("/", async (req, res) => {
	
  const tourist = new Tourist({
    email: req.body.email,
    username : req.body.username,
    passwordHash : req.body.passwordHash,
    mobileNumber: req.body.mobileNumber,
    nationality: req.body.nationality,
    DOB: req.body.DOB,
    job: req.body.job

  })
  try{
    const newTourist = await tourist.save();
    res.status(201).json(newTourist)
  }catch(err){
    res.status(400).json({message:err.message});
  }
	
});
*/
