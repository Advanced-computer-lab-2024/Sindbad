const Tourist = require("../models/Tourist");
const Product = require("../models/Product");
const Activity = require("../models/Activity");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const moment = require("moment");
const cron = require("node-cron");
require("dotenv").config();
const cloudinary = require("../utils/cloudinary");
const DatauriParser = require("datauri/parser");
const path = require("path");

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

  if (
    tourist.profileImageUri &&
    tourist.profileImageUri.public_id &&
    req.files.profileImageUri
  ) {
    await cloudinary.uploader.destroy(tourist.profileImageUri.public_id);
  }

  if (
    tourist.bannerImageUri &&
    tourist.bannerImageUri.public_id &&
    req.files.bannerImageUri
  ) {
    await cloudinary.uploader.destroy(tourist.bannerImageUri.public_id);
  }

  if (req.files.profileImageUri) {
    const profileImage = req.files.profileImageUri[0];
    const parser = new DatauriParser();
    const extName = path.extname(profileImage.originalname);
    const file64 = parser.format(extName, profileImage.buffer);
    const profileUpload = await cloudinary.uploader.upload(file64.content, {
      folder: "profileImages",
      resource_type: "image",
    });
    // Update schema
    tourist.profileImageUri = {
      public_id: profileUpload.public_id,
      url: profileUpload.secure_url,
    };
  }

  if (req.files.bannerImageUri) {
    const bannerImage = req.files.bannerImageUri[0];
    const parser = new DatauriParser();
    const extName = path.extname(bannerImage.originalname);
    const file64 = parser.format(extName, bannerImage.buffer);
    const bannerUpload = await cloudinary.uploader.upload(file64.content, {
      folder: "bannerImages",
      resource_type: "image",
    });
    // Update schema
    tourist.bannerImageUri = {
      public_id: bannerUpload.public_id,
      url: bannerUpload.secure_url,
    };
  }

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
  if (req.body.preferredCurrency != undefined) {
    res.tourist.preferredCurrency = req.body.preferredCurrency;
  }
  /*res.tourist.bookedEvents = {
      activities: [
        {
          activityId: "67251731d5a2d7588e2ce62d", // Activity ID
          priceCharged: 30, // Activity Price
        },
      ],
      itineraries: [
        {
          itineraryId: "67251ee8d5a2d7588e2ce707", // Itinerary ID
          ticketsBooked: 1, // Number of tickets booked
          dateBooked: new Date("2024-11-30T00:00:00.000+00:00"), // Booking Date
        },
      ],
    };*/

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
    const wishlistProductIds = tourist.wishlist.map((item) => item.productID);

    // Fetch product details from the database
    const products = await Product.find({ _id: { $in: wishlistProductIds } });

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
    const productIndex = tourist.wishlist.findIndex(
      (item) => item.productID.toString() === productID.toString() // Compare productID field inside the object
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

const addActivityToBookmarks = async (req, res) => {
  const { id: touristId } = req.params; // Tourist ID from URL params
  const { activityID } = req.body; // Activity ID from request body

  // Ensure the activityID is provided
  if (!activityID) {
    return res.status(400).json({ message: "Activity ID is required" });
  }

  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    const activity = await Activity.findById(activityID);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Check if the activity is already in the bookmarks
    const alreadyInBookmarks = tourist.bookmarks.some(
      (item) => item.productID.toString() === activityID
    );

    if (alreadyInBookmarks) {
      return res.status(400).json({ message: "Activity already in bookmarks" });
    }

    // Add the activity to the bookmarks
    tourist.bookmarks.push({ productID: activityID });
    await tourist.save();

    res.status(200).json({
      message: "Activity added to bookmarks",
      bookmarks: tourist.bookmarks,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding activity to bookmarks",
      error: err.message,
    });
  }
};

const getBookmarkedActivities = async (req, res) => {
  try {
    const touristId = req.params.id; // Extract tourist ID from params

    // Find the tourist by ID and ensure bookmarks exist
    const tourist = await Tourist.findById(touristId).populate(
      "bookmarks.productID"
    ); // Populate the bookmarks to get activity details
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Return the list of bookmarked activities
    res
      .status(200)
      .json(tourist.bookmarks.map((bookmark) => bookmark.productID));
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookmarked activities",
      error: error.message,
    });
  }
};

const removeFromBookmarks = async (req, res) => {
  try {
    const { id } = req.params; // Tourist ID
    const { activityID } = req.body; // Activity ID to be removed

    if (!activityID) {
      return res.status(400).json({ message: "Activity ID is required" });
    }

    // Find the tourist by ID
    const tourist = await Tourist.findById(id);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Find the index of the activity in the bookmarks
    const activityIndex = tourist.bookmarks.findIndex(
      (item) => item.productID.toString() === activityID.toString()
    );

    if (activityIndex === -1) {
      return res
        .status(404)
        .json({ message: "Activity not found in bookmarks" });
    }

    // Remove the activity from the bookmarks
    tourist.bookmarks.splice(activityIndex, 1);

    // Save the updated tourist
    await tourist.save();

    res.status(200).json({
      message: "Activity removed from bookmarks successfully",
      bookmarks: tourist.bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing activity from bookmarks",
      error: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const touristId = req.params.id; // Extract tourist ID from params

    // Find the tourist by ID and ensure cart exists
    const tourist = await Tourist.findById(touristId).populate(
      "cart.productID"
    ); // Populate the cart to get product details

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Return the list of cart items
    res.status(200).json(tourist.cart);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart items",
      error: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  const { id: touristId } = req.params; // Tourist ID from URL params
  const { productID, quantity } = req.body; // Product ID and quantity from request body

  // Ensure the productID and quantity are provided
  if (!productID || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required" });
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

    // Check if the product is already in the cart
    const alreadyInCart = tourist.cart.some(
      (item) => item.productID.toString() === productID
    );

    if (alreadyInCart) {
      tourist.cart.find(
        (item) => item.productID.toString() === productID
      ).quantity += quantity;
    } else {
      tourist.cart.push({ productID, quantity });
    }

    await tourist.save();

    res.status(200).json({
      message: "Product added to cart",
      cart: tourist.cart,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding product to cart",
      error: err.message,
    });
  }
};

const addToCartFromWishlist = async (req, res) => {
  const { id: touristId } = req.params; // Tourist ID from URL params
  const { productID, quantity } = req.body; // Product ID and quantity from request body

  if (!productID || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required" });
  }

  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Check if the product exists in the wishlist
    const wishlistIndex = tourist.wishlist.findIndex(
      (item) => item.productID.toString() === productID
    );

    if (wishlistIndex === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    const product = await Product.findById(productID);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add to cart
    const cartItem = tourist.cart.find(
      (item) => item.productID.toString() === productID
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      tourist.cart.push({ productID, quantity });
    }

    // Remove from wishlist
    tourist.wishlist.splice(wishlistIndex, 1);

    // Save updates
    await tourist.save();

    res.status(200).json({
      message: "Product moved from wishlist to cart",
      cart: tourist.cart,
      wishlist: tourist.wishlist,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error moving product to cart",
      error: err.message,
    });
  }
};

module.exports = { addToCartFromWishlist };

const updateCart = async (req, res) => {
  try {
    const { id } = req.params; // Tourist ID
    const { productID, quantity } = req.body; // Product ID to be removed

    if (!productID) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find the tourist by ID
    const tourist = await Tourist.findById(id);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Find the index of the product in the cart using the productID
    const productIndex = tourist.cart.findIndex(
      (item) => item.productID.toString() === productID.toString()
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    tourist.cart[productIndex].quantity = quantity;

    // Save the updated tourist
    await tourist.save();

    res.status(200).json({
      message: "Product updated from cart successfully",
      cart: tourist.cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product in cart",
      error: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id, productID } = req.params; // Tourist ID

    if (!productID) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find the tourist by ID
    const tourist = await Tourist.findById(id);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Find the index of the product in the cart using the productID
    const productIndex = tourist.cart.findIndex(
      (item) => item.productID.toString() === productID.toString()
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    tourist.cart.splice(productIndex, 1);

    // Save the updated tourist
    await tourist.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart: tourist.cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing product from cart",
      error: error.message,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const { id } = req.params; // Tourist ID
    const { label, street, city, state, zip, country } = req.body; // Address details

    console.log(req.body);
    console.log(req.params);
    if (!label || !street || !city || !state || !zip || !country) {
      return res
        .status(400)
        .json({ message: "Label and address are required" });
    }

    // Find the tourist by ID
    const tourist = await Tourist.findById(id);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Add the address to the list
    tourist.addresses.push({ label, street, city, state, zip, country });

    // Save the updated tourist
    await tourist.save();

    res.status(200).json({
      message: "Address added successfully",
      addresses: tourist.addresses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding address",
      error: error.message,
    });
  }
};

//Sending an email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL, // Your Gmail address
    pass: process.env.GMAILPASSWORD, // Your Gmail App Password
  },
});

const sendEmail = async (email, subject, body) => {
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject,
    text: body,
  };
  await transporter.sendMail(mailOptions);
};

const sendNotifications = async () => {
  try {
    // Fetch all tourists and populate necessary fields
    const tourists = await Tourist.find().populate([
      {
        path: "bookedEvents.activities.activityId",
        model: "Activity",
      },
      {
        path: "bookedEvents.itineraries.itineraryId",
        model: "Itinerary",
      },
    ]);

    const now = moment().utc();
    const oneDayLater = now.clone().add(1, "days");

    for (const tourist of tourists) {
      const notifications = [];

      // Check booked activities
      for (const activity of tourist.bookedEvents.activities) {
        const activityDate = moment(activity.activityId.dateTime).utc();;
        if (activityDate.isBetween(now, oneDayLater)) {
          const notification = {
            title: `Upcoming Activity: ${activity.activityId.name}`,
            Body: `Reminder: Your activity "${
              activity.activityId.name
            }" is scheduled for ${activityDate.format(
              "MMMM Do YYYY, h:mm a"
            )}.`,
            isSeen: false,
          };

           // Check if the notification already exists to avoid duplicates
           const existingNotification = tourist.Notifications.find(
            (n) => n.title === notification.title && n.Body === notification.Body
          );

          if (!existingNotification) {
            notifications.push(notification);

            // Send email notification for the activity
            await sendEmail(
              tourist.email,
              "Activity Reminder",
              `Your activity "${
                activity.activityId.name
              }" is scheduled for ${activityDate.format("MMMM Do YYYY, h:mm a")}.`
            );
          }
        }
      }
      // Check booked itineraries
      for (const itinerary of tourist.bookedEvents.itineraries) {
        const itineraryDate = moment(itinerary.dateBooked).utc();; // Use `dateBooked` for the itinerary
        if (itineraryDate.isBetween(now, oneDayLater)) {
          const notification = {
            title: `Upcoming Itinerary: ${itinerary.itineraryId.name}`,
            Body: `Reminder: Your itinerary "${
              itinerary.itineraryId.name
            }" is scheduled for ${itineraryDate.format(
              "MMMM Do YYYY, h:mm a"
            )}.`,
            isSeen: false,
          };
          // Check if the notification already exists to avoid duplicates
          const existingNotification = tourist.Notifications.find(
            (n) => n.title === notification.title && n.Body === notification.Body
          );

          if (!existingNotification) {
            notifications.push(notification);

          // Send email notification for the itinerary
            await sendEmail(
              tourist.email,
              "Itinerary Reminder",
              `Your itinerary "${
                itinerary.itineraryId.name
              }" is scheduled for ${itineraryDate.format(
                "MMMM Do YYYY, h:mm a"
              )}.`
            );
          }
        }
      }
      if (notifications.length > 0) {
        // Add notifications to the tourist's record
        tourist.Notifications.push(...notifications);
        await tourist.save();
      }
    }
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

// Schedule the notification task to run daily at midnight
cron.schedule("*/1 * * * *", sendNotifications);

const viewOrders = async (req, res) => {
  const { id: touristID } = req.params;
  const { isDelivered } = req.body;

  if (isDelivered === undefined) {
    return res
      .status(400)
      .json({ message: "isDelivered parameter is required" });
  }

  try {
    const tourist = await Tourist.findById(touristID);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    const orders = tourist.orders.filter(
      (order) => order.isDelivered === (isDelivered === "true")
    );
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving orders", error: err.message });
  }
};

const viewOrderDetails = async (req, res) => {
  const { id: touristID, orderID } = req.params;

  try {
    // Find the tourist by ID
    const tourist = await Tourist.findById(touristID);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    // Find the specific order by orderID
    const order = tourist.orders.find(
      (order) => order._id.toString() === orderID
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving order details", error: err.message });
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
  addActivityToBookmarks,
  removeFromBookmarks,
  getBookmarkedActivities,
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  addAddress,
  addToCartFromWishlist,
  viewOrderDetails,
  viewOrders,
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
