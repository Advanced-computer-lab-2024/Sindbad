const Site = require("../models/siteModel");

/**
 * Creates a new site.
 *
 * @param {Object} req - The request object containing the site details.
 * @param {Object} res - The response object for sending the result.
 * @returns {Object} - JSON object indicating the success message and the created site.
 *
 * @throws {400} - If there is an error saving the site.
 */

const createSite = async (req, res) => {
	try {
		const site = new Site(req.body);
		await site.save();
		res.status(201).json({ message: "Site created successfully!", site });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

/**
 * Retrieves all sites.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the list of sites.
 * @returns {Array} - JSON array of all sites.
 *
 * @throws {500} - If there is an error retrieving the sites.
 */

const getAllSites = async (req, res) => {
	try {
		const sites = await Site.find().populate("tags"); // "Join" with the tags collection
		res.status(200).json(sites);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

/**
 * Retrieves sites created by a specific user
 * @param {Object} req - The request object containing user data
 * @param {Object} res - The response object for sending the result
 * @returns {Object} JSON containing an array of sites or error message
 */

const getMySites = async (req, res) => {
  try {
    const sites = await Site.find(req.params);
    res.status(200).json(sites);
  } catch (error) {
    return res.status(500).json({
			message: "Error getting sites",
			error: error.message,
		});
  }
};

/**
 * Retrieves a single site by its ID.
 *
 * @param {Object} req - The request object containing the site ID in the URL parameters.
 * @param {Object} res - The response object for sending the retrieved site or an error message.
 * @returns {Object} - JSON object of the retrieved site or an error message.
 *
 * @throws {404} - If the site is not found.
 * @throws {500} - If there is an error retrieving the site.
 */

const getSiteById = async (req, res) => {
	try {
		const site = await Site.findById(req.params.id).populate("tags"); // "Join" with the tags collection
		if (!site) {
			return res.status(404).json({ message: "Site not found" });
		}
		res.status(200).json(site);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

/**
 * Updates a site by its ID.
 *
 * @param {Object} req - The request object containing the site ID and new details in the body.
 * @param {Object} res - The response object for sending the updated site or an error message.
 * @returns {Object} - JSON object indicating the success message and the updated site.
 *
 * @throws {404} - If the site is not found.
 * @throws {400} - If there is an error updating the site.
 */

const updateSite = async (req, res) => {
	try {
		const site = await Site.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!site) {
			return res.status(404).json({ message: "Site not found" });
		}
		res.status(200).json({ message: "Site updated successfully!", site });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

/**
 * Deletes a site by its ID.
 *
 * @param {Object} req - The request object containing the site ID in the URL parameters.
 * @param {Object} res - The response object for sending status and message.
 * @returns {Object} - JSON object indicating the success message.
 *
 * @throws {404} - If the site is not found.
 * @throws {500} - If there is an error deleting the site.
 */

const deleteSite = async (req, res) => {
	try {
		const site = await Site.findByIdAndDelete(req.params.id);
		if (!site) {
			return res.status(404).json({ message: "Site not found" });
		}
		res.status(200).json({ message: "Site deleted successfully!" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	createSite,
	getAllSites,
	getMySites,
	getSiteById,
	updateSite,
	deleteSite,
};
