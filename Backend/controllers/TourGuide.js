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
	if (req.body.username != null) tourGuide.username = req.body.username;
	if (req.body.mobileNumber != null)
		tourGuide.mobileNumber = req.body.mobileNumber;
	if (req.body.yearsOfExperience != null)
		tourGuide.yearsOfExperience = req.body.yearsOfExperience;

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

module.exports = {
	getAllTourGuides,
	getTourGuide,
	updateTourGuide,
	deleteTourGuide,
	deletePreviousWork,
};
