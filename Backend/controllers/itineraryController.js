const Itinerary = require("../models/itineraryModel");
const Category = require("../models/categoryModel");
const Activity = require("../models/activityModel");
const Tag = require("../models/tagModel");

/**
 * @route GET /itinerary/:id
 * @description Retrieve a specific itinerary by ID
 * @param {string} req.params.id - The ID of the itinerary to retrieve
 * @returns {Object} 200 - The itinerary object if found
 * @returns {Object} 404 - Itinerary not found
 * @returns {Object} 500 - Error message if an error occurs
 */
const getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id).populate("activities");
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting itinerary",
      error: error.message,
    });
  }
};

/**
 * @route POST /itinerary
 * @description Create a new itinerary
 * @param {Object} req.body - The itinerary data to create
 * @returns {Object} 201 - The created itinerary object
 * @returns {Object} 500 - Error message if an error occurs
 */
const createItinerary = async (req, res) => {
  try {
    const newItinerary = await Itinerary.create(req.body);
    res.status(201).json(newItinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating itinerary",
      error: error.message,
    });
  }
};

/**
 * @route PUT /itinerary/:id
 * @description Update an existing itinerary by ID
 * @param {string} req.params.id - The ID of the itinerary to update
 * @param {Object} req.body - The data to update the itinerary with
 * @returns {Object} 200 - The updated itinerary object
 * @returns {Object} 404 - Itinerary not found
 * @returns {Object} 500 - Error message if an error occurs
 */
const updateItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const updatedData = req.body;

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      itineraryId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json(updatedItinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating itinerary",
      error: error.message,
    });
  }
};

/**
 * @description Deletes an itinerary by its ID.
 * @route DELETE /itinerary/:id
 * @param {string} id - The ID of the itinerary to be deleted.
 * @returns {Object} - A success message if the itinerary is deleted, or an error message if the itinerary is not found or cannot be deleted.
 * @throws {404} - Itinerary not found if the ID does not exist.
 * @throws {400} - Cannot delete itinerary if it has been booked already.
 * @throws {500} - Error deleting itinerary if there is a server issue.
 */
const deleteItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id;

    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (itinerary.headCount > 0) {
      return res.status(400).json({
        message: "Cannot delete itinerary because it has been booked already",
      });
    }

    await Itinerary.findByIdAndDelete(itineraryId);

    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting itinerary",
      error: error.message,
    });
  }
};

/**
 * @description Retrieves all itineraries from the database.
 * @route GET /
 * @returns {Array} - An array of itineraries.
 * @throws {500} - Error fetching itineraries if there is a server issue.
 */
const getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching itineraries" });
  }
};

/**
 * @description Retrieves all itineraries created by a specific creator.
 * @route GET /myItineraries/:id
 * @param {string} id - The ID of the creator whose itineraries are to be fetched.
 * @returns {Array} - An array of itineraries created by the specified creator.
 * @throws {404} - No itineraries found for this creator.
 * @throws {500} - Error fetching itineraries if there is a server issue.
 */
const getItinerariesByCreator = async (req, res) => {
  const { id } = req.params;

  try {
    const itineraries = await Itinerary.find({ creatorId: id });

    if (itineraries.length === 0) {
      return res
        .status(404)
        .json({ message: "No itineraries found for this creator." });
    }

    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching itineraries" });
  }
};

/**
 * @description Searches for itineraries based on activities' tags, categories, or the itinerary name using query parameters.
 * @route GET /search
 * @param {Object} req - The request object containing the search term in the query.
 * @param {Object} res - The response object containing matching itineraries or an error message.
 * @returns {Array} - An array of itineraries matching the search criteria.
 * @throws {400} - If the search term is not provided.
 * @throws {404} - If no itineraries are found matching the search term.
 * @throws {500} - If there is an error during the search process.
 */
const searchItineraries = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const regex = new RegExp(searchTerm, "i"); // Case-insensitive search

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
    const allActivities = [...activitiesByCategory, ...activitiesByTags];

    // Remove duplicates
    const uniqueActivityIds = [
      ...new Set(allActivities.map((activity) => activity._id)),
    ];

    // Find itineraries by name
    const itinerariesByName = await Itinerary.find({ name: regex });

    // Combine itineraries found by name with those found by activities
    const itineraryIdsFromActivities = await Itinerary.find({
      activities: { $in: uniqueActivityIds },
    });

    // Combine the itinerary results and remove duplicates
    const allItineraries = [
      ...itinerariesByName,
      ...itineraryIdsFromActivities,
    ];

    // Remove duplicates based on _id
    const uniqueItineraryIds = [
      ...new Set(allItineraries.map((itinerary) => itinerary._id)),
    ];

    if (uniqueItineraryIds.length === 0) {
      return res.status(404).json({
        message: "No itineraries found matching the search term",
      });
    }

    // Finalize itineraries to return by filtering unique ones
    const finalItineraries = allItineraries.filter((itinerary) =>
      uniqueItineraryIds.includes(itinerary._id)
    );

    res.status(200).json(finalItineraries);
  } catch (error) {
    res.status(500).json({
      message: "Error searching for itineraries",
      error: error.message,
    });
  }
};

const getSortedHelper = async (
  sortBy,
  sortOrder = "asc",
  page = 1,
  limit = 10
) => {
  try {
    let order = sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    // Aggregation for price sorting
    if (sortBy === "price") {
      const itineraries = await Itinerary.aggregate([
        {
          $addFields: {
            priceValue: {
              $cond: {
                if: { $isNumber: "$price" },
                then: "$price",
                else: "$price.min",
              },
            },
          },
        },
        { $sort: { priceValue: order } }, // Sort by priceValue in given order
        { $skip: skip }, // Skip for pagination
        { $limit: limit }, // Limit the number of results
      ]);
      return itineraries;
    }

    // For sorting by rating
    if (sortBy === "rating") {
      const itineraries = await Itinerary.find()
        .sort({ rating: order })
        .skip(skip)
        .limit(limit);
      return itineraries;
    }

    // If the sortBy parameter is invalid
    throw new Error("Invalid sortBy parameter. Use 'price' or 'rating'.");
  } catch (error) {
    console.error("Error fetching sorted itineraries:", error);
    throw error;
  }
};

/**
 * @description Fetches sorted itineraries with pagination
 * @route GET /sort
 * @param {Object} req - The request object containing sorting and pagination parameters
 * @param {string} req.query.sortBy - Field to sort by ("price" or "rating")
 * @param {string} [req.query.sortOrder="asc"] - Sort order ("asc" or "desc"). Default is "asc"
 * @param {number} [req.query.page=1] - Page number for pagination. Default is 1
 * @param {number} [req.query.limit=10] - Number of itineraries per page. Default is 10
 * @param {Object} res - The response object to send the sorted itineraries or error message
 * @returns {void} - Sends the sorted itineraries or an error message
 * @throws {500} - If there is an error fetching sorted itineraries
 */
const getSortedItineraries = async (req, res) => {
  const { sortBy, sortOrder = "asc", page = 1, limit = 10 } = req.query;

  try {
    const itineraries = await getSortedHelper(sortBy, sortOrder, page, limit);
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Filters itineraries based on budget, date range, preferences (tags), and languages
 * @route GET /filter
 * @param {Object} req - The request object containing filter criteria
 * @param {string} [req.query.budget] - Budget range in the format "min,max" or a single number for a maximum price
 * @param {string} [req.query.startDate] - Start date for filtering itineraries
 * @param {string} [req.query.endDate] - End date for filtering itineraries
 * @param {string} [req.query.preferences] - Comma-separated list of tags to filter activities
 * @param {string} [req.query.languages] - Comma-separated list of languages to filter itineraries
 * @param {Object} res - The response object to send filtered itineraries or an error message
 * @returns {void} - Sends the filtered itineraries or an error message
 * @throws {404} - If no itineraries match the specified criteria
 * @throws {500} - If there is an error retrieving itineraries
 */
const filterItineraries = async (req, res) => {
  try {
    const { budget, startDate, endDate, preferences, languages } = req.query;

    // Initialize the filter object
    const filter = {};

    if (budget) {
      const budgetRange = budget.split(",").map(Number); // Expecting format like "100,500"

      if (budgetRange.length === 1) {
        // If a single number is provided, filter itineraries with price less than that number
        filter.price = { $lt: budgetRange[0] };
      } else if (budgetRange.length === 2) {
        // If a range is provided, filter itineraries with price in that range
        filter.price = {
          $gte: budgetRange[0],
          $lte: budgetRange[1],
        };
      }
    }

    // Handle date range filtering
    if (startDate && endDate) {
      filter.availableDatesTimes = {
        $elemMatch: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    }

    // Initialize activityIds to empty array
    let activityIds = [];

    // Find activities based on preferences (tags) only if preferences are provided
    if (preferences) {
      const tagArray = preferences.split(",").map((tag) => tag.trim());

      // First, find the tag IDs based on the tag names
      const tags = await Tag.find({ name: { $in: tagArray } }).select("_id");
      const tagIds = tags.map((tag) => tag._id);

      // Then, find activities that have those tag IDs
      const activitiesByTags = await Activity.find({
        tags: { $in: tagIds },
      }).select("_id"); // Get activity IDs

      // Update activityIds based on the found activities
      activityIds = activitiesByTags.map((activity) => activity._id);

      // Check if activityIds is empty; if so, return an empty array
      if (activityIds.length === 0) {
        return res.status(200).json([]); // Return an empty array if no activities are found
      }

      // Update the filter to include activities
      filter.activities = { $in: activityIds }; // Find itineraries containing these activities
    }

    // Handle language filtering
    if (languages) {
      const languageArray = languages.split(",").map((lang) => lang.trim());
      filter.languages = { $in: languageArray }; // Filter itineraries that match languages
    }

    // Retrieve filtered itineraries
    const itineraries = await Itinerary.find(filter);

    if (itineraries.length === 0) {
      return res.status(404).json({
        message: "No itineraries found matching the specified criteria",
      });
    }

    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving itineraries",
      error: error.message,
    });
  }
};

module.exports = {
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getAllItineraries,
  getItinerariesByCreator,
  searchItineraries,
  getSortedItineraries,
  filterItineraries,
};
