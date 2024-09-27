const express = require("express");
const router = express.Router();
const {
	createSite,
	getAllSites,
	getSiteById,
	updateSite,
	deleteSite,
} = require("../controllers/siteController");

router
	.route("/")
	.post(createSite) // Create a new site
	.get(getAllSites); // Get all sites

router
	.route("/:id")
	.get(getSiteById) // Get a single site by ID
	.put(updateSite) // Update a site by ID
	.delete(deleteSite); // Delete a site by ID

module.exports = router;
