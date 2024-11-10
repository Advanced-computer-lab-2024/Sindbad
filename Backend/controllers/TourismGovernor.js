const TourismGovernor = require("../models/TourismGovernor");

const createTourismGovernor = async (req, res) => {
	try {
		const { username, passwordHash } = req.body;

		if (!username)
			return res.status(400).json({ message: "Username is required" });

		if (!passwordHash) {
			return res.status(400).json({ message: "Password is required" });
		}

		const isUnique = await isUniqueUsername(username);
		if (!isUnique)
			return res.status(400).json({ message: "Username already exists" });

		const createdActivities = [];
		const createdIterinaries = [];
		const createdHistoricalPlaces = [];

		const tourismGovernor = new TourismGovernor({
			username,
			passwordHash,
			createdActivities,
			createdIterinaries,
			createdHistoricalPlaces,
		});

		await tourismGovernor.save();

		res.status(201).json({
			message: "Tourism governor created successfully!",
			tourismGovernor,
		});
	} catch (err) {
		// Handle server error
		res.status(500).json({ message: err.message });
	}
};

const getTourismGovernorById = async (req, res) => {
	try {
		const tourismGovernor = await TourismGovernor.findById(req.params.id);
		if (!tourismGovernor) {
			return res.status(404).json({ message: "Tourism governor not found" });
		}
		res.status(200).json(tourismGovernor);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const updateTourismGovernor = async (req, res) => {
	try {
		const { id } = req.params;
		const { email, profileImageUri , bannerImageUri} =
			req.body;

		const updatedTourismGovernor = await TourismGovernor.findByIdAndUpdate(
			id,
			{ email, profileImageUri , bannerImageUri},
			{ new: true, runValidators: true }
		);

		if (!updatedTourismGovernor) {
			return res.status(404).json({ message: "Tourism governor not found" });
		}

		res.status(200).json(updatedTourismGovernor);
	} catch (error) {
		return res.status(500).json({
			message: "Error updating tourism governor",
			error: error.message,
		});
	}
};

module.exports = {
	createTourismGovernor,
	getTourismGovernorById,
	updateTourismGovernor
};