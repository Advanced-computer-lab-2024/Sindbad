const Activity = require("../models/activityModel");
const Tag = require("../models/tagModel");
const Category = require("../models/categoryModel");

/**
 * Gets an activity by ID
 * @param {*} req -- The request body should contain the id of the activity. example : { "id": "66f68d4a90d0a4eaa665d343" }
 * @param {*} res -- The Activity JSON object returned
 * @returns {Object} - A JSON object representing the activity, or an error message if the activity is not found or an error occurs
 */

const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.body.id);
    res.status(201).json(activity);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting activity",
      error: error.message,
    });
  }
};

/**
 * Retrieves activities created by a specific user
 * @param {Object} req - The request object containing user data
 * @param {Object} res - The response object for sending the result
 * @returns {Object} JSON containing an array of activities or error message
 */

const getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ creatorId: req.query.creatorId });
    res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting activities",
      error: error.message,
    });
  }
};

/**
 * Gets all activities
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object}
 *
 * @example GET http://localhost:3000/activity/all-activities
 */
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(201).json(activities);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting activities",
      error: error.message,
    });
  }
};

/**
 * Searches for activities by a single search term across name, tags, or category
 *
 * @param {Object} req - Request with search criteria in the body
 * @param {Object} res - Response with matching activities or error
 */
const searchActivities = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const regex = new RegExp(searchTerm, "i"); // Case-insensitive search

    // Find activities by name
    const activitiesByName = await Activity.find({ name: regex });

    // Find activities by category
    const categories = await Category.find({ name: regex });
    const categoryIds = categories.map((category) => category._id);
    const activitiesByCategory = await Activity.find({
      category: { $in: categoryIds },
    });

    // Find activities by tags
    const tags = await Tag.find({ name: regex });
    const tagIds = tags.map((tag) => tag._id);
    const activitiesByTags = await Activity.find({ tags: { $in: tagIds } });

    // Combine all found activities
    const allActivities = [
      ...activitiesByName,
      ...activitiesByCategory,
      ...activitiesByTags,
    ];

    // Remove duplicates
    const uniqueActivities = [
      ...new Set(allActivities.map((activity) => activity._id)),
    ].map((id) => allActivities.find((activity) => activity._id === id));

    if (uniqueActivities.length === 0) {
      return res
        .status(404)
        .json({ message: "No activities found matching the search term" });
    }

    res.status(200).json(uniqueActivities);
  } catch (error) {
    res.status(500).json({
      message: "Error searching for activities",
      error: error.message,
    });
  }
};

/**
 * Filters upcoming activities based on budget, date, category, or rating
 *
 * @param {Object} req - Request with filter criteria in the body
 * @param {Object} res - Response with matching activities or error
 */
const filterActivities = async (req, res) => {
  try {
    const { budget, date, category, rating } = req.body;

    const filterCriteria = {
      dateTime: { $gte: new Date() }, // Ensure activities are upcoming
    };

    if (budget) {
      filterCriteria.$or = [
        // For activities where price is a single value
        { price: { $gte: budget.min, $lte: budget.max } },

        // For activities where price is a range (object with min and max)
        {
          "price.min": { $gte: budget.min },
          "price.max": { $lte: budget.max },
        },
      ];
    }

    // Date filter
    if (date) {
      if (date.start) {
        filterCriteria.dateTime.$gte = new Date(date.start); // Use dateTime for start date
      }
      if (date.end) {
        filterCriteria.dateTime.$lte = new Date(date.end); // Use dateTime for end date
      }
    }

    // Category filter
    if (category) {
      filterCriteria.category = category;
    }

    // Rating filter
    if (rating) {
      filterCriteria.rating = { $gte: rating };
    }

    const activities = await Activity.find(filterCriteria);

    if (activities.length === 0) {
      return res.status(404).json({
        message: "No upcoming activities found matching the criteria",
      });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Error filtering activities",
      error: error.message,
    });
  }
};

/**
 * Creates a new activity
 *
 * @param {Object} req - The request object containing activity details in the body
 * @param {Object} res - The response object used to send the created activity or error message
 * @returns {Object} - A JSON object of the created activity or an error message
 */
const setActivity = async (req, res) => {
  try {
    const { category, tags, ...activityData } = req.body; // Extract category, tags, and other activity data

    // Check if the category exists (optional)
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res
        .status(404)
        .json({ message: "Category does not exist", x: existingCategory });
    }

    // Check if all provided tag IDs exist (optional)
    const existingTags = await Tag.find({ _id: { $in: tags } });
    if (existingTags.length !== tags.length) {
      return res.status(404).json({ message: "One or more tags do not exist" });
    }

    // Create the activity with valid category and tag IDs
    const activity = await Activity.create({
      ...activityData,
      category: existingCategory._id, // Use category ID
      tags: existingTags.map((tag) => tag._id), // Use valid tag IDs
    });

    res.status(201).json(activity);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating activity",
      error: error.message,
    });
  }
};

/**
 * Updates an existing activity in the database
 *
 * @param {Object} req - The request object containing the activity ID and updated fields in the body
 * @param {Object} res - The response object used to send the updated activity or an error message
 * @returns {Object} - A JSON object of the updated activity or an error message if not found
 */
const updateActivity = async (req, res) => {
  try {
    const {
      id,
      name,
      dateTime,
      location,
      price,
      category,
      tags,
      discounts,
      isBookingOpen,
      creatorId,
      headCount,
    } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      {
        name,
        dateTime,
        location,
        price,
        category,
        tags,
        discounts,
        isBookingOpen,
        creatorId,
        headCount,
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

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
 * Deletes an activity from the database by ID
 *
 * @param {Object} req - The request object containing the ID of the activity to delete in the body
 * @param {Object} res - The response object used to send a confirmation message or error
 * @returns {Object} - A JSON object with a confirmation message or an error message if not found
 */
const deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.body.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    return res.status(201).json({ message: "Activity deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting activity",
      error: error.message,
    });
  }
};

const getSortedActivitiesHelper = async (
  sortBy,
  sortOrder = "asc",
  page = 1,
  limit = 10
) => {
  try {
    let sortCriteria = {};
    let order = sortOrder === "asc" ? 1 : -1;

    if (sortBy === "price") {
      sortCriteria = {
        $addFields: {
          priceValue: {
            $cond: {
              if: { $isNumber: "$price" },
              then: "$price",
              else: "$price.min",
            },
          },
        },
      };
    } else if (sortBy === "rating") {
      sortCriteria = { rating: order };
    } else {
      throw new Error("Invalid sortBy parameter. Use 'price' or 'rating'.");
    }

    const skip = (page - 1) * limit;

    const activities =
      sortBy === "price"
        ? await Activity.aggregate([
            sortCriteria,
            { $sort: { priceValue: order } },
            { $skip: skip }, // Skip for pagination
            { $limit: limit }, // Limit the number of results
          ])
        : await Activity.find().sort(sortCriteria).skip(skip).limit(limit);

    return activities;
  } catch (error) {
    console.error("Error fetching sorted activities:", error);
    throw error;
  }
};

/**
 * Fetches sorted activities with pagination
 *
 * @param {Object} req - Request object
 * @param {string} req.body.sortBy - Field to sort by ("price" or "rating")
 * @param {string} [req.body.sortOrder="asc"] - Sort order ("asc" or "desc"). Default is "asc"
 * @param {number} [req.body.page=1] - Page number for pagination. Default is 1
 * @param {number} [req.body.limit=10] - Number of activities per page. Default is 10
 *
 * @param {Object} res - Response
 *
 * @returns {void} - Sends the sorted activities or an error message
 */

const getSortedActivities = async (req, res) => {
  const { sortBy, sortOrder = "asc", page = 1, limit = 10 } = req.body;
  try {
    const activities = await getSortedActivitiesHelper(
      sortBy,
      sortOrder,
      page,
      limit
    );
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
  getAllActivities,
  searchActivities,
  filterActivities,
  getSortedActivities,
};
