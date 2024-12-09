const Advertiser = require("../models/Advertiser");
const cloudinary = require("../utils/cloudinary");
const DatauriParser = require("datauri/parser");
const path = require('path');
// Controller to get advertiser profile
const getAdvertiserById = async (req, res) => {
	try {
		const { id } = req.params; // Get username from the params
		const advertiser = await Advertiser.findById(id);

		if (!advertiser) {
			return res.status(404).json({ message: "Advertiser not found" });
		}

		return res.status(200).json(advertiser);
	} catch (error) {
		console.error("Error fetching advertiser profile:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};


// Controller to get all advertiser profiles
const getAllAdvertisers = async (req, res) => {
	try {
		const advertisers = await Advertiser.find();

		return res.status(200).json(advertisers);
	} catch (error) {
		console.error("Error fetching all advertiser profiles:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// Controller to update advertiser profile
const updateAdveriser = async (req, res) => {
	let advertiser;
	try {
		advertiser = await Advertiser.findById(req.params.id);
		if (advertiser == null) {
			return res.status(404).json({ message: "Advertiser not found" });
		}
	} catch (err) {
		return res.status(500).json({
			message: "Error retrieving advertiser",
			error: err.message,
		});
	}

	if (advertiser.profileImageUri && advertiser.profileImageUri.public_id && req.files.profileImageUri) {
		await cloudinary.uploader.destroy(advertiser.profileImageUri.public_id);
	}

	if (advertiser.bannerImageUri && advertiser.bannerImageUri.public_id && req.files.bannerImageUri) {
		await cloudinary.uploader.destroy(advertiser.bannerImageUri.public_id);
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
		advertiser.profileImageUri = {
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
		advertiser.bannerImageUri = {
			public_id: bannerUpload.public_id,
			url: bannerUpload.secure_url,
		};
	}

	if (req.body.websiteLink !== undefined)
		advertiser.websiteLink = req.body.websiteLink;

	if (req.body.hotline !== undefined)
		advertiser.hotline = req.body.hotline;

	if (req.body.companyProfile !== undefined)
		advertiser.companyProfile = req.body.companyProfile;

	if (req.body.email !== undefined)
		advertiser.email = req.body.email;

	if (req.body.preferredCurrency != undefined)
		advertiser.preferredCurrency = req.body.preferredCurrency;

	try {
		const updatedAdvertiser = await advertiser.save();
		res.json(updatedAdvertiser);
	} catch (err) {
		return res.status(400).json({
			message: "Error saving advertiser's information",
			error: err.message,
		});
	}
};

const addAdvertiserDocuments = async (req, res) => {
	const { id } = req.params; // Get advertiser ID from params
	const files = req.files; // Multer file object

	const updateData = {};

	if (files.idCardImage) {
		updateData.idCardImage = files.idCardImage[0].buffer; // Get binary data from the first file
	}

	if (files.taxationRegistryCardImage) {
		updateData.taxationRegistryCardImage =
			files.taxationRegistryCardImage[0].buffer;
	}

	try {
		// Update the advertiser document with the new image data
		const advertiser = await Advertiser.findByIdAndUpdate(
			id,
			{ $set: updateData }, // Use $set to only update specified fields
			{ new: true } // Return the updated document
		);

		if (!advertiser) {
			return res.status(404).json({ message: "Advertiser not found!" });
		}

		return res.status(200).json(advertiser);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Error updating advertiser", error });
	}
};

module.exports = {
	getAdvertiserById,
	getAllAdvertisers,
	updateAdveriser,
	addAdvertiserDocuments,
};
