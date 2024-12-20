const Activity = require("../models/Activity");
const Tag = require("../models/Tag");
const Category = require("../models/Category");
const Advertiser = require("../models/Advertiser");
const Tourist = require("../models/Tourist");
const Sale = require("../models/Sale");
const nodemailer = require("nodemailer");
const cloudinary = require("../utils/cloudinary");
const DatauriParser = require("datauri/parser");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();

//Email prefrences
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL, // Your Gmail address
    pass: process.env.GMAILPASSWORD, // Your Gmail App Password
  },
});

/**
 * Gets an activity by ID
 * @route GET /activity/:id
 * @param {*} req - The request parameters should contain the ID of the activity. Example: /activity/66f68d4a90d0a4eaa665d343
 * @param {*} res - The Activity JSON object returned
 * @returns {Object} - A JSON object representing the activity, or an error message if the activity is not found or an error occurs
 */
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      "category tags"
    );
    res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting activity",
      error: error.message,
    });
  }
};

/**
 * Retrieves activities created by a specific user
 * @route GET /activity/my-activities/:creatorId
 * @param {Object} req - The request object containing user data
 * @param {Object} res - The response object for sending the result
 * @returns {Object} JSON containing an array of activities or error message
 */
const getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      creatorId: req.params.creatorId,
    });
    res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting activities",
      error: error.message,
    });
  }
};

/**
 * Creates a new activity
 *
 * @route POST /activity/
 * @param {Object} req - The request object containing activity details in the body.
 * @param {Object} res - The response object used to send the created activity or error message.
 * @returns {Object} - A JSON object of the created activity or an error message.
 */
const setActivity = async (req, res) => {
  try {
    if (req.files.cardImage) {
      const cardImage = req.files.cardImage[0];
      const parser = new DatauriParser();
      const extName = path.extname(cardImage.originalname);
      const file64 = parser.format(extName, cardImage.buffer);
      const cardImageUpload = await cloudinary.uploader.upload(file64.content, {
        folder: "activities",
        resource_type: "image",
      });
      req.body.cardImage = {
        public_id: cardImageUpload.public_id,
        url: cardImageUpload.secure_url,
      };
    }

    if (typeof req.body.price === "string") {
      req.body.price = parseFloat(req.body.price);
    }

    if (req.body.location) {
      req.body.location = JSON.parse(req.body.location);
    }
    if (req.body.tags) {
      req.body.tags = JSON.parse(req.body.tags);
    }

    // get category id
    const category = await Category.findOne({
      name: req.body.category,
    });
    if (!category) {
      return res.status(404).json({
        message: "Category does not exist",
      });
    }
    req.body.category = category._id;

    // get tag ids
    const tags = await Tag.find({
      name: { $in: req.body.tags },
    });
    if (tags.length !== req.body.tags.length) {
      return res.status(404).json({
        message: "One or more tags do not exist",
      });
    }
    req.body.tags = tags.map((tag) => tag._id);

    const stripeProduct = await stripe.products.create({
      name: req.body.name,
    });

    const price = await stripe.prices.create({
      unit_amount: Math.floor(req.body.price * 100), // Price in cents (2000 = $20.00)
      currency: "usd",
      product: stripeProduct.id, // Use the product ID from the previous step
    });

    req.body.priceId = price.id;

    const activity = await Activity.create(req.body);

    res.status(201).json(activity);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating activity",
      error: error.message,
    });
  }
};

/**
 * Adds a comment to an activity
 * @route POST /activity/:id/comment
 * @param {Object} req - The request object containing the comment in the body
 * @param {Object} res - The response object used to send a confirmation message or error
 * @returns {Object} - A JSON object with a confirmation message or an error message if not found
 */
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;

    // Validate input
    if (!userId || !comment) {
      return res
        .status(400)
        .json({ message: "User ID and comment are required." });
    }

    const tourist = await Tourist.findById(userId);
    if (!tourist) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasBookedActivity = tourist.bookedEvents.activities.some(
      (activity) => activity.activityId.toString() === id
    );

    if (!hasBookedActivity) {
      return res.status(403).json({
        message: "Only users who have booked this activity can rate it.",
      });
    }

    // Find the activity by ID
    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(405).json({ message: "Activity not found" });
    }

    // Add the comment to the activity's comments array
    activity.comments.push({ userId, comment });
    await activity.save();

    res.status(200).json({ message: "Comment added successfully", activity });
  } catch (error) {
    res.status(500).json({
      message: "Error adding comment",
      error: error.message,
    });
  }
};

/**
 * Adds a rating to an activity
 *
 * @route POST /activity/:id/rate
 * @param {Object} req - The request object containing the rating in the body
 * @param {Object} res - The response object used to send a confirmation message or error
 * @returns {Object} - A JSON object with a confirmation message or an error message if not found
 */
const addRating = async (req, res) => {
  try {
    const { id } = req.params;
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

    const tourist = await Tourist.findById(userId);
    if (!tourist) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasBookedActivity = tourist.bookedEvents.activities.some(
      (activity) => activity.activityId.toString() === id
    );

    if (!hasBookedActivity) {
      return res.status(403).json({
        message: "Only users who have booked this activity can rate it.",
      });
    }

    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Check if the user has already rated this activity
    if (activity.userRatings.includes(userId)) {
      return res
        .status(403)
        .json({ message: "User has already rated this activity." });
    }

    // Ensure that activity.rating is a Map
    if (!(activity.rating instanceof Map)) {
      activity.rating = new Map(Object.entries(activity.rating));
    }

    // Increment the count of the given rating
    const currentCount = activity.rating.get(rating.toString()) || 0;
    activity.rating.set(rating.toString(), currentCount + 1);

    // Add the userId to the userRatings array
    activity.userRatings.push(userId);

    // Recalculate the average rating
    activity.averageRating = calculateAverageRating(activity.rating);
    await activity.save();

    res.status(200).json({
      message: "Rating added successfully",
      activity,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding rating",
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

/**
 * Updates an existing activity in the database
 *
 * @route PUT /activity/:id
 * @param {Object} req - The request object containing the activity ID as a parameter and updated fields in the body.
 * @param {Object} res - The response object used to send the updated activity or an error message.
 * @returns {Object} - A JSON object of the updated activity or an error message if not found.
 */
const updateActivity = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const activityId = req.params.id;

    const updatedData = req.body;

    if (req.files.cardImage) {
      const cardImage = req.files.cardImage[0];
      const parser = new DatauriParser();
      const extName = path.extname(cardImage.originalname);
      const file64 = parser.format(extName, cardImage.buffer);
      const cardImageUpload = await cloudinary.uploader.upload(file64.content, {
        folder: "activities",
        resource_type: "image",
      });
      updatedData.cardImage = {
        public_id: cardImageUpload.public_id,
        url: cardImageUpload.secure_url,
      };
    }

    if (typeof updatedData.price === "string") {
      updatedData.price = parseFloat(updatedData.price);
    }

    if (req.body.location) {
      req.body.location = JSON.parse(req.body.location);
    }
    if (req.body.tags) {
      req.body.tags = JSON.parse(req.body.tags);
    }

    // get category id
    const category = await Category.findOne({
      name: req.body.category,
    });
    if (!category) {
      return res.status(404).json({
        message: "Category does not exist",
      });
    }
    req.body.category = category._id;

    // get tag ids
    const tags = await Tag.find({
      name: { $in: req.body.tags },
    });
    if (tags.length !== req.body.tags.length) {
      return res.status(404).json({
        message: "One or more tags do not exist",
      });
    }
    req.body.tags = tags.map((tag) => tag._id);

    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      {
        name: updatedData.name,
        dateTime: updatedData.dateTime,
        location: updatedData.location,
        price: updatedData.price,
        category: updatedData.category,
        tags: updatedData.tags,
        discounts: updatedData.discounts,
        isBookingOpen: updatedData.isBookingOpen,
        creatorId: updatedData.creatorId,
        headCount: updatedData.headCount,
        description: updatedData.description,
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (updatedData.isBookingOpen) {
      // Find tourists who have bookmarked this activity
      const tourists = await Tourist.find({
        "bookmarks.productID": activityId,
      });

      if (tourists.length > 0) {
        // Add notifications to each tourist
        const notificationPromises = tourists.map((tourist) => {
          const notification = {
            title: "Booking Opened",
            Body: `The activity "${updatedActivity.name}" has opened its bookings!`,
            isSeen: false,
          };

          tourist.Notifications.push(notification);
          return tourist.save();
        });

        // Wait for all notifications to be saved
        await Promise.all(notificationPromises);
      }
    }
    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating activity",
      error: error.message,
    });
  }
};

/**
 * Deletes an activity by ID
 *
 * @route DELETE /activity/:id
 * @param {Object} req - The request object containing the ID of the activity to delete in the body
 * @param {Object} res - The response object used to send a confirmation message or error
 * @returns {Object} - A JSON object with a confirmation message or an error message if not found
 */
const deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    return res.status(204).json({ message: "Activity deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting activity",
      error: error.message,
    });
  }
};

/**
 * Searches, filters, and sorts activities based on search term, budget, date, category, average rating, and sorting options.
 *
 * @route GET /activity
 * @param {Object} req - Request object with search, filter, and sort criteria in query parameters.
 * @param {string} [req.query.searchTerm] - Optional term to search in activity names, tags, or categories.
 * @param {Object} [req.query.budget] - Optional for filtering activities by price.
 * @param {Date} [req.query.date.start] - Optional start date for filtering activities.
 * @param {Date} [req.query.date.end] - Optional end date for filtering activities.
 * @param {string} [req.query.category] - Optional category for filtering activities.
 * @param {number} [req.query.minRating] - Optional minimum average rating for filtering activities.
 * @param {string} [req.query.sortBy] - Optional field to sort by ("price", "averageRating", or "dateTime").
 * @param {string} [req.query.sortOrder="asc"] - Optional sort order ("asc" or "desc"). Default is "asc".
 * @param {number} [req.query.page=1] - Optional page number for pagination. Default is 1.
 * @param {number} [req.query.limit=10] - Optional number of activities per page. Default is 10.
 * @param {Object} res - Response with matching, sorted, and paginated activities or error.
 * @returns {Object} - A JSON object containing an array of activities or an error message.
 */
const getActivities = async (req, res) => {
  try {
    const {
      searchTerm,
      budget = {},
      date = {},
      category,
      rating = {},
      sortBy = "dateTime", // Default sorting by activity date
      sortOrder = "asc",
      page = 1,
      limit = 10,
    } = req.query;

    // Create filter object based on provided criteria
    const filter = {
      // Default filter to show only non-inappropriate activities
      isInappropriate: false,
      dateTime: { $gte: new Date() }, // Only include activities with dateTime in the future
    };

    // Budget filter
    if (budget.min || budget.max) {
      filter.$or = [
        {
          price: {
            ...(budget.min && { $gte: +budget.min }),
            ...(budget.max && { $lte: +budget.max }),
          },
        },
        {
          "price.min": {
            ...(budget.min && { $gte: +budget.min }),
            ...(budget.max && { $lte: +budget.max }),
          },
        },
      ];
    }

    // Date filter
    if (date.start || date.end) {
      filter.dateTime = {
        ...(date.start && { $gte: new Date(date.start) }),
        ...(date.end && {
          $lte: new Date(new Date(date.end).setHours(23, 59, 59, 999)),
        }), // End of the day
      };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Average rating filter
    if (rating.min || rating.max) {
      filter.averageRating = {
        ...(rating.min && { $gte: +rating.min }),
        ...(rating.max && { $lte: +rating.max }),
      };
    }

    // Search term filter (name, category, or tags)
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i"); // Case-insensitive
      const categories = await Category.find({ name: regex }).select("_id");
      const tags = await Tag.find({ name: regex }).select("_id");

      filter.$or = [
        { name: regex },
        { category: { $in: categories.map((c) => c._id) } },
        { tags: { $in: tags.map((t) => t._id) } },
      ];
    }

    // Sorting and pagination
    const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
    const skip = (page - 1) * limit;

    // // console.log("filter:", filter);
    // // console.log("sortOptions:", sortOptions);

    // Fetch activities with filters, sorting, and pagination
    const activities = await Activity.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(+limit);

    if (activities.length === 0) {
      return res.status(204).send(); // 204 No Content for no results
    }

    // Respond with activities
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while fetching activities.",
      error: error.message,
    });
  }
};

/**
 * Books an activity by incrementing its headCount & decreasing the wallet amount
 * @route POST /activity/book
 * @param {Object} req - The request object containing the activity id and the user id
 * @param {Object} res - The response object used to send results.
 * @returns {Object} - JSON response indicating success or failure.
 */
const bookActivity = async (req, res) => {
  try {
    const { activityId, userId } = req.body;

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (activity.isInappropriate) {
      return res.status(400).json({
        message:
          "This activity cannot be booked as it has been flagged as inappropriate.",
      });
    }

    const tourist = await Tourist.findById(userId);
    if (!tourist) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyBooked = tourist.bookedEvents.activities.some(
      (activity) => activity.activityId.toString() === activityId
    );

    if (alreadyBooked) {
      return res.status(400).json({ message: "Activity already booked" });
    }

    if (!activity.isBookingOpen) {
      return res.status(400).json({ message: "Bookings are currently closed" });
    }

    let priceCharged;
    if (typeof activity.price === "number") {
      priceCharged = activity.price;
    } else {
      const { min, max } = activity.price;
      if (tourist.job === "Student") {
        priceCharged = min;
      } else {
        priceCharged = max;
      }
    }

    // Check if tourist has enough wallet balance
    // if (tourist.wallet < priceCharged) {
    //     return res.status(400).json({ message: "Insufficient funds" });
    // }

    activity.headCount += 1;
    await activity.save();

    // tourist.wallet -= priceCharged;

    tourist.bookedEvents.activities.push({
      activityId: activityId,
      priceCharged: priceCharged,
    });
    await tourist.save();

    // send payment confirmation email
    const mailOptions = {
      from: process.env.GMAIL,
      to: tourist.email,
      subject: "Activity Payment Confirmation",
      text: `You have successfully booked the activity ${
        activity.name
      } at a price of ${priceCharged.toFixed(2)} USD`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    let loyaltyPoints = tourist.loyaltyPoints;
    switch (tourist.level) {
      case 1:
        loyaltyPoints += priceCharged * 0.5;
        break;
      case 2:
        loyaltyPoints += priceCharged;
        break;
      case 3:
        loyaltyPoints += priceCharged * 1.5;
        break;
    }
    tourist.loyaltyPoints = loyaltyPoints;
    await tourist.save();

    let level = tourist.level;
    if (loyaltyPoints > 100000 && loyaltyPoints <= 500000) level = 2;
    if (loyaltyPoints > 500000) level = 3;
    tourist.level = level;
    await tourist.save();

    // Record the activity sale
    await Sale.create({
      type: "Activity",
      itemId: activity._id,
      buyerId: tourist._id,
      totalPrice: priceCharged,
    });

    res.status(200).json({
      message: "Activity booked successfully",
      activity,
      priceCharged,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error booking activity",
      error: err.message,
    });
  }
};

/**
 * Cancels a booking for an activity
 * @route POST /activity/cancel
 * @param {Object} req - The request object containing the activity id and the user id
 * @param {Object} res - The response object used to send results.
 * @returns {Object} - JSON response indicating success or failure.
 */
const cancelBooking = async (req, res) => {
  try {
    const { activityId, userId } = req.body;
    const activity = await Activity.findById(activityId);
    const tourist = await Tourist.findById(userId);
    const currentDate = new Date();
    const datePlus48Hours = new Date(
      currentDate.getTime() + 48 * 60 * 60 * 1000
    );

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    if (new Date(activity.dateTime) <= datePlus48Hours) {
      return res.status(400).json({
        message: "You cannot cancel the activity as it is within 48 hours.",
      });
    }

    const isActivityBooked = tourist.bookedEvents.activities.some(
      (item) => item.activityId.toString() === activityId
    );

    if (!isActivityBooked) {
      return res.status(400).json({
        message: "This activity is not booked.",
      });
    }

    activity.headCount -= 1;
    await activity.save();
    let priceCharged;
    if (typeof activity.price === "number") {
      priceCharged = activity.price;
    } else {
      const { min, max } = activity.price;
      if (tourist.job === "Student") {
        priceCharged = min;
      } else {
        priceCharged = max;
      }
    }

    tourist.wallet += priceCharged;

    let loyaltyPoints = tourist.loyaltyPoints;
    switch (tourist.level) {
      case 1:
        loyaltyPoints -= priceCharged * 0.5;
        break;
      case 2:
        loyaltyPoints -= priceCharged;
        break;
      case 3:
        loyaltyPoints -= priceCharged * 1.5;
        break;
    }
    tourist.loyaltyPoints = loyaltyPoints;

    let level = tourist.level;
    if (loyaltyPoints <= 100000) level = 1;
    if (loyaltyPoints > 100000 && loyaltyPoints <= 500000) level = 2;
    if (loyaltyPoints > 500000) level = 3;
    tourist.level = level;

    tourist.bookedEvents.activities = tourist.bookedEvents.activities.filter(
      (activity) => activity.activityId.toString() !== activityId.toString()
    );

    await tourist.save();

    // Record the negative activity sale
    await Sale.create({
      type: "Activity",
      itemId: activity._id,
      buyerId: tourist._id,
      totalPrice: -priceCharged,
    });

    res.status(200).json({ message: "Activity cancelled successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error canceling activity",
      error: error.message,
    });
  }
};

const setIsInappropriate = async (req, res) => {
  try {
    const activityId = req.params.id;
    const { isInappropriate } = req.body;

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Find the advertiser associated with the itinerary
    const advertiser = await Advertiser.findById(activity.creatorId);
    if (!advertiser) {
      return res.status(404).json({ message: "advertiser not found" });
    }

    activity.isInappropriate = isInappropriate;
    await activity.save();

    // Create a new notification
    if (isInappropriate) {
      const notification = {
        title: "Activity Flagged",
        Body: `Your activity "${activity.name}" has been flagged as inappropriate.`,
        isSeen: false,
      };
      advertiser.Notifications.push(notification);
      await advertiser.save();

      //send an email
      const mailOptions = {
        from: process.env.GMAIL,
        to: advertiser.email,
        subject: "Activity Flagged",
        text:
          "Your activity " +
          activity.name +
          " has been flagged as inappropriate.",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).send(`Email sent: ${info.response}`);
      });
    }

    //return activity
    res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({
      message: "Error flagging activity as inappropriate",
      error: error.message,
    });
  }
};

module.exports = {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
  getActivities,
  addRating,
  addComment,
  bookActivity,
  cancelBooking,
  setIsInappropriate,
};
