const Product = require("../models/Product");
const Seller = require("../models/Seller");
const cloudinary = require("../utils/cloudinary");
const DatauriParser = require("datauri/parser");
const path = require('path');

/**
 * Creates a new seller
 */
const createSeller = async (req, res) => {
	try {
		const seller = await Seller.create(req.body);
		res.status(201).json(seller);
	} catch (error) {
		return res.status(500).json({
			message: "Error creating seller",
			error: error.message,
		});
	}
};

/**
 * Gets a seller by ID
 */
const getSellerById = async (req, res) => {
	try {
		const seller = await Seller.findById(req.params.id).populate("products"); // Populates the products field
		if (!seller) {
			return res.status(404).json({ message: "Seller not found" });
		}
		res.status(200).json(seller);
	} catch (error) {
		return res.status(500).json({
			message: "Error getting seller",
			error: error.message,
		});
	}
};

/**
 * Updates an existing seller by ID
 */
const updateSeller = async (req, res) => {
	let seller;
	try {
		seller = await Seller.findById(req.params.id);
		if (seller == null) {
			return res.status(404).json({ message: "Seller not found" });
		}
	} catch (err) {
		return res.status(500).json({
			message: "Error retrieving advertiser",
			error: err.message,
		});
	}

	if (seller.profileImageUri && seller.profileImageUri.public_id && req.files.profileImageUri) {
		await cloudinary.uploader.destroy(seller.profileImageUri.public_id);
	}

	if (seller.bannerImageUri && seller.bannerImageUri.public_id && req.files.bannerImageUri) {
		await cloudinary.uploader.destroy(seller.bannerImageUri.public_id);
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
		seller.profileImageUri = {
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
		seller.bannerImageUri = {
			public_id: bannerUpload.public_id,
			url: bannerUpload.secure_url,
		};
	}

	if (req.body.email !== undefined)
		seller.email = req.body.email;

	if (req.body.preferredCurrency !== undefined)
		seller.preferredCurrency = req.body.preferredCurrency;

	if (req.body.firstName !== undefined)
		seller.firstName = req.body.firstName;

	if (req.body.lastName !== undefined)
		seller.lastName = req.body.lastName;

	if (req.body.description !== undefined)
		seller.description = req.body.description;

	try {
		const updatedSeller = await seller.save();
		res.json(updatedSeller);
	} catch (err) {
		return res.status(400).json({
			message: "Error saving seller's information",
			error: err.message,
		});
	}
};

const getProductsBySellerId = async (req, res) => {
	try {
		const sellerId = req.params.id;

		const products = await Product.find({ seller: sellerId });

		if (!products.length) {
			return res
				.status(404)
				.json({ message: "No products found for this seller" });
		}

		res.status(200).json(products);
	} catch (error) {
		return res.status(500).json({
			message: "Error fetching products for seller",
			error: error.message,
		});
	}
};

/**
 * Gets all sellers
 */
const getAllSellers = async (req, res) => {
	try {
		const sellers = await Seller.find();
		res.status(200).json(sellers);
	} catch (error) {
		return res.status(500).json({
			message: "Error getting sellers",
			error: error.message,
		});
	}
};

const deleteSeller = async (req, res) => {
	try {
		const { id } = req.params;

		const deletedSeller = await Seller.findByIdAndDelete(id);
		if (!deletedSeller) {
			return res.status(404).json({ message: "Seller not found" });
		}

		res.status(204).send(); // No content to return after deletion
	} catch (error) {
		return res.status(500).json({
			message: "Error deleting seller",
			error: error.message,
		});
	}
};


const addSellerDocuments = async (req, res) => {
	const { id } = req.params; // Get advertiser ID from params
	const files = req.files; // Multer file object

	const updateData = {};

	if (files.idCardImage) {
		updateData.idCardImage = files.idCardImage[0].buffer; // Get binary data from the first file
	}

	if (files.taxationRegistryCardImage) {
		updateData.taxationRegistryCardImage = files.taxationRegistryCardImage[0].buffer;
	}


	try {
		// Update the seller document with the new image data
		const seller = await Seller.findByIdAndUpdate(
			id,
			{ $set: updateData }, // Use $set to only update specified fields
			{ new: true } // Return the updated document
		);

		if (!seller) {
			return res.status(404).json({ message: "seller not found!" });
		}

		return res.status(200).json(seller);
	} catch (error) {
		return res.status(500).json({ message: "Error updating seller", error });
	}
};

module.exports = {
	createSeller,
	getSellerById,
	updateSeller,
	getAllSellers,
	deleteSeller,
	getProductsBySellerId,
	addSellerDocuments,
};
