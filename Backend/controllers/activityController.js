const Activity = require("../models/activityModel");

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
 * Creates a new activity in the database
 *
 * @param {Object} req - The request object containing activity details in the body
 * @param {Object} res - The response object used to send the created activity or error message
 * @returns {Object} - A JSON object of the created activity or an error message
 */
const setActivity = async (req, res) => {
  try {
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
};
