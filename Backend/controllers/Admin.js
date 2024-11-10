const Admin = require("../models/Admin");
const Tourist = require("../models/Tourist");
const TourGuide = require("../models/TourGuide");
const Advertiser = require("../models/Advertiser");
const Seller = require("../models/Seller");
const { isUniqueUsername } = require("./User");

/**
 * Creates a new admin.
 *
 * @param {Object} req - The request object containing the admin details in the body.
 * @param {Object} req.body - The admin details (e.g., email, username, passwordHash).
 * @param {Object} res - The response object for sending the result.
 * @returns {Object} - JSON object indicating the success message and the created admin.
 *
 * @throws {400} - If there is an error saving the admin.
 */
const createAdmin = async (req, res) => {
	try {
		const admin = new Admin(req.body);
		await admin.save();
		res.status(201).json({ message: "Admin created successfully!", admin });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

/**
 * Retrieves all admins, optionally filtered by email or username.
 *
 * @param {Object} req - The request object containing optional query parameters.
 * @param {String} [req.query.email] - Optional email for filtering (supports partial matching).
 * @param {String} [req.query.username] - Optional username for filtering (supports partial matching).
 * @param {Object} res - The response object used to send the list of admins.
 * @returns {Array} - JSON array of all admins or filtered admins.
 *
 * @throws {500} - If there is an error retrieving the admins.
 */
const getAllAdmins = async (req, res) => {
	try {
		const email = req.query.email;
		const username = req.query.username;

		// Create a filter for email and username, allowing partial matching if provided
		const filter = {};

		if (email) {
			filter.email = { $regex: email, $options: "i" }; // Case-insensitive partial match
		}

		if (username) {
			filter.username = { $regex: username, $options: "i" };
		}

		const admins = await Admin.find(filter);

		res.status(200).json(admins);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

/**
 * Retrieves a single admin by their ID.
 *
 * @param {Object} req - The request object containing the admin ID in the URL parameters.
 * @param {Object} req.params.id - The ID of the admin to retrieve.
 * @param {Object} res - The response object for sending the retrieved admin or an error message.
 * @returns {Object} - JSON object of the retrieved admin or an error message.
 *
 * @throws {404} - If the admin is not found.
 * @throws {500} - If there is an error retrieving the admin.
 */
const getAdminById = async (req, res) => {
	try {
		const admin = await Admin.findById(req.params.id);
		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}
		res.status(200).json(admin);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

/**
 * Updates an admin by their ID.
 *
 * @param {Object} req - The request object containing the admin ID in the URL parameters and new details in the body.
 * @param {Object} req.params.id - The ID of the admin to update.
 * @param {Object} req.body - The new admin details to update.
 * @param {Object} res - The response object for sending the updated admin or an error message.
 * @returns {Object} - JSON object indicating the success message and the updated admin.
 *
 * @throws {404} - If the admin is not found.
 * @throws {400} - If there is an error updating the admin.
 */
const updateAdmin = async (req, res) => {
	try {
		req.body.username = undefined; // Prevent updating the username

		const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true, // To ensure validations are run on update
		});
		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}
		res.status(200).json({ message: "Admin updated successfully!", admin });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

/**
 * Deletes an admin by their ID.
 *
 * @param {Object} req - The request object containing the admin ID in the URL parameters.
 * @param {Object} req.params.id - The ID of the admin to delete.
 * @param {Object} res - The response object for sending status and message.
 * @returns {Object} - JSON object indicating the success message.
 *
 * @throws {404} - If the admin is not found.
 * @throws {500} - If there is an error deleting the admin.
 */
const deleteAdmin = async (req, res) => {
	try {
		const admin = await Admin.findByIdAndDelete(req.params.id);
		if (!admin) {
			return res.status(404).json({ message: "Admin not found" });
		}
		res.status(200).json({ message: "Admin deleted successfully!" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getAllRequestedAccountDeletionUsers = async (req, res) => {
	try {
		const tourists = await Tourist.find({
			isRequestedAccountDeletion: true,
		});
		const tourGuides = await TourGuide.find({
			isRequestedAccountDeletion: true,
		});
		const advertisers = await Advertiser.find({
			isRequestedAccountDeletion: true,
		});
		const sellers = await Seller.find({ isRequestedAccountDeletion: true });

		const allRequestedAccountDeletionUsers = [
			...tourists,
			...tourGuides,
			...advertisers,
			...sellers,
		];

		res.status(200).json(allRequestedAccountDeletionUsers);
	} catch (error) {
		res.status(500).json({
			error: "Failed to fetch requested account deletion users.",
		});
	}
};

module.exports = {
	createAdmin,
	getAllAdmins,
	getAdminById,
	updateAdmin,
	deleteAdmin,
	getAllRequestedAccountDeletionUsers,
};
