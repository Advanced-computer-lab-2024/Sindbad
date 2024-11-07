const Product = require("../models/Product");
const Seller = require("../models/Seller");

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
	try {
		const { id } = req.params;
		const { email, username, firstName, lastName, description, logoImageUri , bannerImageUri, preferredCurrency} =
			req.body;

		const updatedSeller = await Seller.findByIdAndUpdate(
			id,
			{ email, username, firstName, lastName, description, logoImageUri , bannerImageUri, preferredCurrency },
			{ new: true, runValidators: true }
		);

		if (!updatedSeller) {
			return res.status(404).json({ message: "Seller not found" });
		}

		res.status(200).json(updatedSeller);
	} catch (error) {
		return res.status(500).json({
			message: "Error updating seller",
			error: error.message,
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
