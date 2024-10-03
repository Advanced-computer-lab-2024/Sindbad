const Advertiser = require("../models/Advertiser");

// Controller to get advertiser profile
const getProfile = async (req, res) => {
	try {
		const { username } = req.body; // Get username from the body
		const advertiser = await Advertiser.findOne({ username });

		if (!advertiser) {
			return res
				.status(404)
				.json({ message: "Advertiser not found or not accepted." });
		}

		return res.status(200).json(advertiser);
	} catch (error) {
		console.error("Error fetching advertiser profile:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// Controller to update advertiser profile
const updateProfile = async (req, res) => {
	try {
		const { username, websiteLink, hotline, companyProfile } = req.body; // Get username and other fields from the body

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

		const advertiser = await Advertiser.findOneAndUpdate(
			{ username },
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
	updateProfile,
};
