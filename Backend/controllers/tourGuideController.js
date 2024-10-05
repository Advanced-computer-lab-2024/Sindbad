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

	if (tourGuide.isAccepted) {
		res.json(tourGuide);
	} else {
		return res.status(404).send("TourGuide not accepted yet");
	}
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
	if (req.body.passwordHash != null)
		tourGuide.passwordHash = req.body.passwordHash;
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

module.exports = {
	getAllTourGuides,
	getTourGuide,
	updateTourGuide,
	deleteTourGuide,
};

/*
//create
//Create a tourguide profile
//Register (sign up) as a tour guide/ advertiser/ seller on the system with username, email and password
router.post("/", async (req, res) => {
	
	const tourGuide = new TourGuide({
		email: req.body.email,
		username : req.body.username,
		passwordHash : req.body.passwordHash

	})
	try{
		const newTourGuide = await tourGuide.save();
		res.status(201).json(newTourGuide)
	}catch(err){
		res.status(400).json({message:err.message});
	}
	
});



*/
