const Advertiser = require("../models/Advertiser");
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
	try {
		const { id } = req.params; // Get username from the params
		const {
			websiteLink,
			hotline,
			companyProfile,
			email,
			logoImageUri,
			bannerImageUri,
		} = req.body; // Get username and other fields from the body

		// Create an object to hold the fields that need to be updated
		const updateData = {};

		// Add only the fields that are defined (not undefined) to the update object
		if (websiteLink !== undefined) {
			updateData.websiteLink = websiteLink;
		}
		if (hotline !== undefined) {
			updateData.hotline = hotline;
		}
		if (companyProfile !== undefined) {
			updateData.companyProfile = companyProfile;
		}
		if (email !== undefined) {
			updateData.email = email;
		}
		if (logoImageUri !== undefined) {
			updateData.logoImageUri = logoImageUri;
		}
		if (bannerImageUri !== undefined) {
			updateData.bannerImageUri = bannerImageUri;
		}
		if (req.body.preferredCurrency != undefined) {
			updateData.preferredCurrency = req.body.preferredCurrency;
		}

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
		console.error("Error updating advertiser profile:", error);
		return res.status(500).json({ message: "Internal server error" });
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
