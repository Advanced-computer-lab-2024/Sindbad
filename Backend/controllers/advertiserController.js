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

		const advertiser = await Advertiser.findOneAndUpdate(
			{ username },
			{ websiteLink, hotline, companyProfile },
			{ new: true }
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
