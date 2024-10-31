const Site = require("../models/Site");

/**
 * Creates a new site.
 *
 * @param {Object} req - The request object containing the site details in the body.
 * @param {Object} req.body - The site details (e.g., name, location, tags, etc.).
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
 * Retrieves all sites, optionally filtered by site name or tag name.
 *
 * @param {Object} req - The request object containing optional query parameters.
 * @param {String} [req.query.siteName] - Optional site name for filtering (supports partial matching).
 * @param {String} [req.query.tagName] - Optional tag name for filtering (supports partial matching).
 * @param {Object} res - The response object used to send the list of sites.
 * @returns {Array} - JSON array of all sites or filtered sites.
 *
 * @throws {500} - If there is an error retrieving the sites.
 */
const getAllSites = async (req, res) => {
	try {
		const siteName = req.query.siteName;
		const tagName = req.query.tagName;

		// Create a filter for siteName, allowing partial matching if provided
		const siteFilter = siteName
			? { name: { $regex: siteName, $options: "i" } }
			: {};

		// Find sites and populate tags with partial matching for tagName
		let sites = await Site.find(siteFilter).populate({
			path: "tags",
			match: tagName ? { name: { $regex: tagName, $options: "i" } } : {}, // Partial match for tagName if provided
		});

		// Filter out sites where there are no matching tags
		if (tagName) {
			sites = sites.filter((site) => site.tags.length > 0);
		}

		res.status(200).json(sites);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

/**
 * Retrieves sites created by a specific user.
 *
 * @param {Object} req - The request object containing user data in URL parameters.
 * @param {Object} req.params.userId - The ID of the user whose sites are being retrieved.
 * @param {Object} res - The response object for sending the result.
 * @returns {Array} - JSON containing an array of sites.
 *
 * @throws {500} - If there is an error retrieving the sites.
 */
const getMySites = async (req, res) => {
	try {
		const sites = await Site.find({ creatorId: req.params.creatorId });
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
 * @param {Object} req.params.id - The ID of the site to retrieve.
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
 * @param {Object} req - The request object containing the site ID in the URL parameters and new details in the body.
 * @param {Object} req.params.id - The ID of the site to update.
 * @param {Object} req.body - The new site details to update.
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
 * @param {Object} req.params.id - The ID of the site to delete.
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
