const Itinerary = require("../models/itineraryModel");
const Category = require("../models/categoryModel");
const Activity = require("../models/activityModel");
const Tag = require("../models/tagModel");
const mongoose = require("mongoose");

/**
 * @route GET /itinerary/:id
 * @description Retrieve a specific itinerary by ID
 * @param {string} req.params.id - The ID of the itinerary to retrieve
 * @returns {Object} 200 - The itinerary object if found
 * @returns {Object} 404 - Itinerary not found
 * @returns {Object} 500 - Error message if an error occurs
 */
const getItineraryById = async (req, res) => {
	try {
		const itinerary = await Itinerary.findById(req.params.id).populate(
			"activities"
		);
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
 * @description Retrieves all itineraries created by a specific creator.
 * @route GET /my-itineraries/:id
 * @param {string} id - The ID of the creator whose itineraries are to be fetched.
 * @returns {Array} - An array of itineraries created by the specified creator.
 * @throws {404} - No itineraries found for this creator.
 * @throws {500} - Error fetching itineraries if there is a server issue.
 */
const getMyItineraries = async (req, res) => {
	try {
		const itineraries = await Itinerary.find({
			creatorId: req.params.creatorId,
		});

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
 * @param {number} [req.query.rating] 
 * @returns {Array} - An array of itineraries matching the criteria.
 * @throws {400} - If the search term is not provided (when search is used).
 * @throws {404} - If no itineraries are found matching the criteria.
 * @throws {500} - If there is an error during the retrieval process.
 */
const getAllItineraries = async (req, res) => {
	try {
		const {
			searchTerm,
			budget = {},
			date = {},
			tag,
			rating = {},
			language,
			sortBy = "availableDatesTimes", // Default sorting by available dates times
			sortOrder = "asc",
			page = 1,
			limit = 10,
		} = req.query;

		// Create filter object based on provided criteria
		const filter = {
			// Uncomment if needed to filter for upcoming available date times
			// availableDateTimes: { $elemMatch: { $gte: new Date() } },
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
			filter.availableDatesTimes = {
				$elemMatch: {
					...(date.start && { $gte: new Date(date.start) }),
					...(date.end && {
						$lte: new Date(new Date(date.end).setHours(23, 59, 59, 999)), // End of the day
					}),
				},
			};
		}

		// Tag filter
		if (tag) {
			// Ensure that the tag is in ObjectId format
			const tagObjectId = new mongoose.Types.ObjectId(tag._id); // Convert to ObjectId if tag is a string

			filter.activities = {
				$elemMatch: { tags: tagObjectId },
			}; // Use $elemMatch to find itineraries with activities containing the tag
		}

		// Rating filter
		if (rating.min || rating.max) {
			filter.averageRating = {
				...(rating.min && { $gte: +rating.min }),
				...(rating.max && { $lte: +rating.max }),
			};
		}

		// Language filter
		if (language) {
			filter.languages = {
				$regex: new RegExp(language, "i"), // 'i' for case insensitive
			}; // Check if the itinerary supports this language with a case-insensitive regex
		}

		// Search term filter
		if (searchTerm) {
			const regex = new RegExp(searchTerm, "i"); // Case-insensitive
			filter.$or = [{ name: regex }, { description: regex }];
		}

		// Sorting and pagination
		const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
		const skip = (page - 1) * limit;

		// console.log("filter:", filter);
		// console.log("sortOptions:", sortOptions);

		// Fetch itineraries with aggregation
		const itineraries = await Itinerary.aggregate([
			{
				$lookup: {
					from: "activities", // The name of the collection to join
					localField: "activities", // The field from the itineraries collection
					foreignField: "_id", // The field from the activities collection
					as: "activities", // The name of the new array field to add to the itineraries documents
				},
			},
			{
				$match: filter, // Apply your filtering here
			},
			{
				$sort: sortOptions, // Sort the results
			},
			// {
			// 	$skip: skip, // Pagination
			// },
			// {
			// 	$limit: +limit, // Limit the number of results
			// },
		]);

		if (itineraries.length === 0) {
			return res.status(204).send(); // 204 No Content for no results
		}

		// Respond with itineraries
		res.status(200).json(itineraries);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error occurred while fetching itineraries.",
			error: error.message,
		});
	}
};


/**
 * @route POST /itinerary/:id/rate
 * @description Add a rating to an itinerary
 * @param {string} req.params.id - The ID of the itinerary to rate
 * @param {Object} req.body - Contains the rating value (1-5)
 * @returns {Object} 200 - The updated itinerary object
 * @returns {Object} 404 - Itinerary not found
 * @returns {Object} 400 - Invalid rating value
 * @returns {Object} 500 - Error message if an error occurs
 */
const addRating = async (req, res) => {
	try {
	  const itineraryId = req.params.id;
	  const { rating } = req.body;
  
	  // Validate rating value
	  if (!rating || rating < 1 || rating > 5) {
		return res.status(400).json({ message: "Invalid rating value. Must be between 1 and 5." });
	  }
  
	  const itinerary = await Itinerary.findById(itineraryId);
	  if (!itinerary) {
		return res.status(404).json({ message: "Itinerary not found" });
	  }

	  if (!(itinerary.rating instanceof Map)) {
		itinerary.rating = new Map(Object.entries(itinerary.rating));
	  }
  
	  // Add the rating and update average rating
	  const currentCount = itinerary.rating.get(rating.toString()) || 0;
    	itinerary.rating.set(rating.toString(), currentCount + 1);

	  itinerary.averageRating = calculateAverageRating(itinerary.rating)
	  await itinerary.save();
  
	  res.status(200).json(itinerary);
	} catch (error) {
	  return res.status(500).json({
		message: "Error adding rating to itinerary",
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




module.exports = {
	getItineraryById,
	createItinerary,
	updateItinerary,
	deleteItinerary,
	getAllItineraries,
	// getAllItineraries,
	getMyItineraries,
	// searchItineraries,
	// getSortedItineraries,
	// filterItineraries,
	addRating,
};
