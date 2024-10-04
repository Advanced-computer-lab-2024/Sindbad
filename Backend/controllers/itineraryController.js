const Itinerary = require("../models/itineraryModel");
const Category = require("../models/categoryModel");
const Activity = require("../models/activityModel");
const Tag = require("../models/tagModel");

const getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
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

const getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching itineraries" });
  }
};
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
 * Searches for itineraries based on activities' tags, categories, or the itinerary name using query parameters
 *
 * @param {Object} req - Request with search criteria in the query
 * @param {Object} res - Response with matching itineraries or error
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
 * Fetches sorted itineraries with pagination
 *
 * @param {Object} req - Request object
 * @param {string} req.query.sortBy - Field to sort by ("price" or "rating")
 * @param {string} [req.query.sortOrder="asc"] - Sort order ("asc" or "desc"). Default is "asc"
 * @param {number} [req.query.page=1] - Page number for pagination. Default is 1
 * @param {number} [req.query.limit=10] - Number of itineraries per page. Default is 10
 *
 * @param {Object} res - Response
 *
 * @returns {void} - Sends the sorted itineraries or an error message
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

module.exports = {
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getAllItineraries,
  getItinerariesByCreator,
  searchItineraries,
  getSortedItineraries,
};
