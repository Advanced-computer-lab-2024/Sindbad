const TourismGovernor = require("../models/TourismGovernor");
const cloudinary = require("../utils/cloudinary");
const DatauriParser = require("datauri/parser");
const path = require('path');

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
	let tourismGovernor;
	try {
		tourismGovernor = await TourismGovernor.findById(req.params.id);
		if (tourismGovernor == null) {
			return res.status(404).json({ message: "Tourism governor not found" });
		}
	} catch (err) {
		return res.status(500).json({
			message: "Error retrieving Tourism governor",
			error: err.message,
		});
	}

	if (tourismGovernor.profileImageUri && tourismGovernor.profileImageUri.public_id && req.files.profileImageUri) {
		await cloudinary.uploader.destroy(tourismGovernor.profileImageUri.public_id);
	}

	if (tourismGovernor.bannerImageUri && tourismGovernor.bannerImageUri.public_id && req.files.bannerImageUri) {
		await cloudinary.uploader.destroy(tourismGovernor.bannerImageUri.public_id);
	}

	if (req.files.profileImageUri) {
		const profileImage = req.files.profileImageUri[0];
		const parser = new DatauriParser();
		const extName = path.extname(profileImage.originalname);
		const file64 = parser.format(extName, profileImage.buffer);
		const profileUpload = await cloudinary.uploader.upload(
			file64.content,
			{
				folder: "profileImages",
				resource_type: "image",
			}
		);
		// Update schema
		tourismGovernor.profileImageUri = {
			public_id: profileUpload.public_id,
			url: profileUpload.secure_url,
		};
	}

	if (req.files.bannerImageUri) {
		const bannerImage = req.files.bannerImageUri[0];
		const parser = new DatauriParser();
		const extName = path.extname(bannerImage.originalname);
		const file64 = parser.format(extName, bannerImage.buffer);
		const bannerUpload = await cloudinary.uploader.upload(
			file64.content,
			{
				folder: "bannerImages",
				resource_type: "image",
			}
		);
		// Update schema
		tourismGovernor.bannerImageUri = {
			public_id: bannerUpload.public_id,
			url: bannerUpload.secure_url,
		};
	}

	if (req.body.email != null)
		tourismGovernor.email = req.body.email;

	try {
		const updatedTourismGovernor = await tourismGovernor.save();
		res.json(updatedTourismGovernor);
	} catch (err) {
		return res.status(400).json({
			message: "Error saving tourism governor's information",
			error: err.message,
		});
	}
};

module.exports = {
	createTourismGovernor,
	getTourismGovernorById,
	updateTourismGovernor
};