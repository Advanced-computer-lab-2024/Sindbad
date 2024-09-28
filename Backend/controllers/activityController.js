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
    const activities = await Activity.find({ creatorId: req.body.creatorId });
    res.status(201).json(activities);
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
 * Searches for a specific activity by name
 *
 * @param {Object} req - Request with search query in the body
 * @param {Object} res - Response with the matching activity or error
 */
const searchActivityByName = async (req, res) => {
  try {
    const { name } = req.body;
    const activity = await Activity.find({
      name: { $regex: `^${name}$`, $options: "i" },
    }); // Exact case-insensitive match
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching for activity", error: error.message });
  }
};

/**
 * Searches for activities by specific tag names
 *
 * @param {Object} req - Request with tag names array in the body
 * @param {Object} res - Response with matching activities or error
 */
const searchActivitiesByTags = async (req, res) => {
  try {
    const { names } = req.body; // Expecting an array of tag names

    // Find all tags that match the provided names
    const tags = await Tag.find({ name: { $in: names } });

    if (tags.length === 0) {
      return res.status(404).json({ message: "No matching tags found" });
    }

    // Get the tag IDs to search activities
    const tagIds = tags.map((tag) => tag._id);

    // Find activities that contain any of the tag IDs
    const activities = await Activity.find({ tags: { $in: tagIds } });

    if (activities.length === 0) {
      return res
        .status(404)
        .json({ message: "No activities found with the specified tags" });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Error searching for activities",
      error: error.message,
    });
  }
};

/**
 * Searches for activities by a specific category
 *
 * @param {Object} req - Request with a category name
 * @param {Object} res - Response with matching activities or error
 */
const searchActivitiesByCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category is required" });
    }

    const category = await Category.findOne({ name: name });

    const activities = await Activity.find({ category });

    if (!activities) {
      return res
        .status(404)
        .json({ message: "No activities found for the specified category" });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Error searching for activities",
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

module.exports = {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
  getAllActivities,
  searchActivityByName,
  searchActivitiesByTags,
  searchActivitiesByCategory,
};
