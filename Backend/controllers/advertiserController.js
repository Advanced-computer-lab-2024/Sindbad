const Advertiser = require("../models/Advertiser");

// Controller to get advertiser profile
const getProfile = async (req, res) => {
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
const getAllProfiles = async (req, res) => {
	try {
		const advertisers = await Advertiser.find();

		return res.status(200).json(advertisers);
	} catch (error) {
		console.error("Error fetching all advertiser profiles:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// Controller to update advertiser profile
const updateProfile = async (req, res) => {
	try {
		const { id } = req.params; // Get username from the params
		const { websiteLink, hotline, companyProfile, email } = req.body; // Get username and other fields from the body

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

		console.log("Received ID:", id);
		console.log("Update Data:", updateData);

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

module.exports = {
	getProfile,
	getAllProfiles,
	updateProfile,
};
