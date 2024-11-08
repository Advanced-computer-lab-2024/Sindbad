const TourGuide = require("../models/TourGuide");

/**
 * Retrieves all tourGuides
 *
 * @returns {Object} - A JSON object of the retrieved tourGuides or an error message
 */
const getAllTourGuides = async (req, res) => {
	try {
		const tourGuides = await TourGuide.find();
		res.json(tourGuides);
	} catch {
		return res.status(500).json({
			message: "Error retrieving Tour Guides",
			error: err.message,
		});
	}
};

/**
 * Retrieves a tourGuide by its ID
 *
 * @param {Object} req - The request object containing the tourGuide ID in the body
 * @param {Object} res - The response object used to send the retrieved tourGuide or an error message
 * @returns {Object} - A JSON object of the retrieved tourGuide or an error message
 */
const getTourGuide = async (req, res) => {
	let tourGuide;
	try {
		tourGuide = await TourGuide.findById(req.params.id);
		if (tourGuide == null) {
			return res.status(404).json({ message: "Tour Guide not found" });
		}
	} catch (err) {
		return res.status(500).json({
			message: "Error retrieving Tour Guide",
			error: err.message,
		});
	}

	res.status(200).json(tourGuide);
};

/**
 * Updates a tourGuide's profile
 *
 * @param {Object} req - Request with tourGuide ID
 * @param {Object} res - Response object for sending results
 * @returns {Object} - Updated tourGuide profile or error message
 */
const updateTourGuide = async (req, res) => {
	let tourGuide;
	try {
		tourGuide = await TourGuide.findById(req.params.id);
		if (tourGuide == null) {
			return res.status(404).json({ message: "Tour Guide not found" });
		}
	} catch (err) {
		return res.status(500).json({
			message: "Error retrieving Tour Guide",
			error: err.message,
		});
	}
	if (!tourGuide.isAccepted)
		return res.status(404).send("TourGuide not accepted yet");

	if (req.body.email != null) tourGuide.email = req.body.email;

	if (req.body.mobileNumber != null)
		tourGuide.mobileNumber = req.body.mobileNumber;

	if (req.body.yearsOfExperience != null)
		tourGuide.yearsOfExperience = req.body.yearsOfExperience;

	if (req.body.profileImageUri != null)
		tourGuide.profileImageUri = req.body.profileImageUri;

	if (req.body.bannerImageUri != null)
		tourGuide.bannerImageUri = req.body.bannerImageUri;

	if (req.body.preferredCurrency != undefined)
		tourGuide.preferredCurrency = req.body.preferredCurrency;

	if (req.body.portfolioUrl) tourGuide.portfolioUrl = req.body.portfolioUrl;

	// Update or concat previousWork based on wether or not the previous work exists
	if (req.body.previousWork != null) {
		if (tourGuide.previousWork.length === 0) {
			tourGuide.previousWork.push(req.body.previousWork);
		} else {
			const existingIndex = tourGuide.previousWork.findIndex(
				(work) => work._id.toString() === req.body.previousWork._id
			);

			if (existingIndex !== -1) {
				// If it exists, update the entry
				tourGuide.previousWork[existingIndex] = req.body.previousWork;
			} else {
				// Otherwise, add it to the list
				tourGuide.previousWork.push(req.body.previousWork);
			}
		}
	}

	try {
		const updatedTourGuide = await tourGuide.save();
		res.json(updatedTourGuide);
	} catch (err) {
		return res.status(400).json({
			message: "Error saving Tour Guide's information",
			error: err.message,
		});
	}
};

/**
 * deletes a tourGuides's profile
 *
 * @param {Object} req - Request with tourGuide's ID
 * @returns {Object} - Deleted tourGuide's profile or error message
 */
const deleteTourGuide = async (req, res) => {
	try {
		const deletedTourGuide = await TourGuide.findByIdAndDelete(
			req.params.id
		);
		if (deletedTourGuide == null) {
			return res.status(404).json({ message: "Tour Guide not found" });
		} else {
			res.json(deletedTourGuide);
		}
	} catch (err) {
		return res.status(500).json({
			message: "Error deleting Tour Guide",
			error: err.message,
		});
	}
};

const deletePreviousWork = async (req, res) => {
	const { id, previousWorkId } = req.params;

	// Check if tourGuide ID is provided
	if (!id) {
		return res.status(400).json({ message: "Tour Guide ID is required" });
	}

	// Check if previousWorkId is provided
	if (!previousWorkId) {
		return res.status(400).json({ message: "previousWorkId is required" });
	}

	let tourGuide;

	try {
		// Retrieve Tour Guide by ID
		tourGuide = await TourGuide.findById(id);
		if (!tourGuide) {
			return res.status(404).json({ message: "Tour Guide not found" });
		}
	} catch (err) {
		return res.status(500).json({
			message: "Error retrieving Tour Guide",
			error: err.message,
		});
	}

	// Check if the tour guide is accepted
	if (!tourGuide.isAccepted) {
		return res.status(400).json({ message: "Tour Guide not accepted yet" });
	}

	// Find and remove the previous work entry
	const existingIndex = tourGuide.previousWork.findIndex(
		(work) => work._id.toString() === previousWorkId
	);

	if (existingIndex === -1) {
		return res.status(404).json({ message: "Previous work not found" });
	}

	// Remove the entry at the found index
	tourGuide.previousWork.splice(existingIndex, 1);

	try {
		// Save the updated Tour Guide document
		const updatedTourGuide = await tourGuide.save();
		res.status(200).json({
			message: "Previous work removed successfully",
			updatedTourGuide,
		});
	} catch (err) {
		return res.status(400).json({
			message: "Error saving Tour Guide's information",
			error: err.message,
		});
	}
};

const addRating = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId, rating } = req.body;

		if (!userId || !rating) {
			return res
				.status(401)
				.json({ message: "userId and rating must be included " });
		}

		if (rating < 1 || rating > 5) {
			return res
				.status(400)
				.json({ message: "Rating must be between 1 and 5." });
		}

		//TODO check if userbooked this tour guide before

		const tourGuide = await TourGuide.findById(id);

		if (!tourGuide) {
			return res.status(404).json({ message: "TourGuide not found" });
		}

		// Ensure that tourGuide.rating is a Map
		if (!(tourGuide.rating instanceof Map)) {
			tourGuide.rating = new Map(Object.entries(tourGuide.rating));
		}

		// Increment the count of the given rating
		const currentCount = tourGuide.rating.get(rating.toString()) || 0;
		tourGuide.rating.set(rating.toString(), currentCount + 1);

		// Recalculate the average rating
		tourGuide.averageRating = calculateAverageRating(tourGuide.rating);
		await tourGuide.save();

		res.status(200).json({
			message: "Rating added successfully",
			tourGuide,
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

		//TODO implement checking if user has booked the tourGuide

		// Find the tourGuide by ID
		const tourGuide = await TourGuide.findById(id);

		if (!tourGuide) {
			return res.status(405).json({ message: "TourGuide not found" });
		}

		// Add the comment to the tourGuide's comments array
		tourGuide.comments.push({ userId, comment });
		await tourGuide.save();

		res.status(200).json({
			message: "Comment added successfully",
			tourGuide,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error adding comment",
			error: error.message,
		});
	}
};

const addTourGuideDocuments = async (req, res) => {
	const { id } = req.params; // Get tourguide ID from params
	const files = req.files; // Multer file object

	const updateData = {};
	console.log(req);

	if (files.idCardImage) {
		updateData.idCardImage = files.idCardImage[0].buffer; // Get binary data from the first file
	}

	if (files.certificateImage) {
		updateData.certificateImage = files.certificateImage[0].buffer;
	}

	try {
		// Update the tourguide document with the new image data
		const tourguide = await TourGuide.findByIdAndUpdate(
			id,
			{ $set: updateData }, // Use $set to only update specified fields
			{ new: true } // Return the updated document
		);

		if (!tourguide) {
			return res.status(404).json({ message: "tourguide not found!" });
		}

		return res.status(200).json(tourguide);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error updating tourguide", error });
	}
};

module.exports = {
	getAllTourGuides,
	getTourGuide,
	updateTourGuide,
	deleteTourGuide,
	deletePreviousWork,
	addComment,
	addRating,
	addTourGuideDocuments,
};
