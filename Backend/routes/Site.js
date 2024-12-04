const express = require("express");
const router = express.Router();
const {
	createSite,
	getAllSites,
	getMySites,
	getSiteById,
	updateSite,
	deleteSite,
} = require("../controllers/Site");

router
	.route("/")
	// .post(createSite) // Create a new site
	.get(getAllSites); // Get all sites

router
	.route("/:id")
	.get(getSiteById) // Get a single site by ID
	// .put(updateSite) // Update a site by ID
	.delete(deleteSite); // Delete a site by ID

router.route("/my-sites/:creatorId")
	.get(getMySites); // Get all sites created by the user

module.exports = router;
