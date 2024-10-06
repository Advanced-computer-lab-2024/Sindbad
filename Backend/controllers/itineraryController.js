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
 * @description Searches, sorts, and filters itineraries based on various criteria using query parameters.
 * @route GET /itineraries
 * @param {Object} req - The request object containing search, sorting, and filtering parameters.
 * @param {Object} res - The response object containing matching itineraries or an error message.
 * @returns {Array} - An array of itineraries matching the criteria.
 * @throws {400} - If the search term is not provided (when search is used).
 * @throws {404} - If no itineraries are found matching the criteria.
 * @throws {500} - If there is an error during the retrieval process.
 */
const getItineraries = async (req, res) => {
  try {
    const {
      searchTerm,
      sortBy,
      sortOrder = "asc",
      page = 1,
      limit = 10,
      budget,
      startDate,
      endDate,
      preferences,
      languages,
    } = req.query;

    // Initialize filter object
    const filter = {
      availableDatesTimes: {
        $elemMatch: {
          $gt: new Date(),
        },
      },
    };

    // Handle search term
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i"); // Case-insensitive search
      const categories = await Category.find({ name: regex });
      const categoryIds = categories.map((category) => category._id);
      const activitiesByCategory = await Activity.find({
        category: { $in: categoryIds },
      });

      const tags = await Tag.find({ name: regex });
      const tagIds = tags.map((tag) => tag._id);
      const activitiesByTags = await Activity.find({ tags: { $in: tagIds } });

      const allActivities = [...activitiesByCategory, ...activitiesByTags];
      const uniqueActivityIds = [
        ...new Set(allActivities.map((activity) => activity._id)),
      ];

      const itinerariesByName = await Itinerary.find({ name: regex });
      const itineraryIdsFromActivities = await Itinerary.find({
        activities: { $in: uniqueActivityIds },
      });

      const allItineraries = [
        ...itinerariesByName,
        ...itineraryIdsFromActivities,
      ];
      const uniqueItineraryIds = [
        ...new Set(allItineraries.map((itinerary) => itinerary._id)),
      ];

      if (uniqueItineraryIds.length === 0) {
        return res
          .status(404)
          .json({ message: "No itineraries found matching the search term" });
      }

      // Finalize itineraries to return by filtering unique ones
      filter._id = { $in: uniqueItineraryIds };
    }

    if (budget) {
      const parsedBudget = Number(budget);
      filter.$or = [
        { price: { $lte: parsedBudget } }, // For fixed price activities
        { "price.min": { $lte: parsedBudget } }, // For activities with price ranges
      ];
    }

    if (startDate && endDate) {
      filter.availableDatesTimes = {
        $elemMatch: {
          $gte: new Date(Math.max(new Date(), new Date(startDate))),
          $lte: new Date(endDate),
        },
      };
    }

    // Handle activity preferences (tags)
    if (preferences) {
      const tagArray = preferences.split(",").map((tag) => tag.trim());
      const tags = await Tag.find({ name: { $in: tagArray } }).select("_id");
      const tagIds = tags.map((tag) => tag._id);

      const activitiesByTags = await Activity.find({
        tags: { $in: tagIds }, // Ensure tagIds is already an array of ObjectIds
      }).select("_id");

      const activityIds = activitiesByTags.map((activity) => activity._id);

      if (activityIds.length > 0) {
        filter.activities = { $in: activityIds };
      } else {
        return res.status(200).json([]); // Return an empty array if no activities are found
      }
    }

    // Handle language filtering
    if (languages) {
      const languageArray = languages.split(",").map((lang) => lang.trim());
      filter.languages = { $in: languageArray };
    }

    // Pagination settings
    const skip = (page - 1) * limit;
    // Fetch itineraries with applied filters, sorting, and pagination
    let itineraries = await Itinerary.find(filter).skip(skip).limit(limit);
    const order = sortOrder === "asc" ? 1 : -1;

    // Sorting
    if (sortBy === "price") {
      itineraries = itineraries.sort((a, b) =>
        order === 1
          ? getPriceValue(a) - getPriceValue(b)
          : getPriceValue(b) - getPriceValue(a)
      );
    } else if (sortBy === "rating") {
      itineraries = itineraries.sort((a, b) =>
        order === 1 ? a.rating - b.rating : b.rating - a.rating
      );
    }

    function getPriceValue(product) {
      return product.price.min || product.price;
    }

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
  getItineraries,
  // getAllItineraries,
  getItinerariesByCreator,
  // searchItineraries,
  // getSortedItineraries,
  // filterItineraries,
};
