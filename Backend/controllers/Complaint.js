const Complaint = require("../models/Complaint");

/**
 * @route POST /complaint
 * @description Create a new complaint
 * @param {Object} req.body - The complaint data to create
 * @returns {Object} 201 - The created complaint object
 * @returns {Object} 400 - Error message if a client error occurs
 * @returns {Object} 500 - Error message if a server error occurs
 */
const createComplaint = async (req, res) => {
	try {
		const complaint = await Complaint.create(req.body);
		res.status(201).json({ complaint });
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
};

/**
 * Retrieves a single complaint by its ID.
 *
 * @param {Object} req - The request object containing the complaint ID in the URL parameters.
 * @param {Object} req.params.id - The ID of the complaint to retrieve.
 * @param {Object} res - The response object for sending the retrieved complaint or an error message.
 * @returns {Object} - JSON object of the retrieved complaint or an error message.
 *
 * @throws {404} - If the complaint is not found.
 * @throws {500} - If there is an error retrieving the complaint.
 */
const getComplaintById = async (req, res) => {
    console.log(req.params.id);
	try {
		const complaint = await Complaint.findById(req.params.id);
		if (!complaint) {
			return res.status(404).json({ message: "Complaint not found" });
		}
		res.status(200).json(complaint);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

/**
 * Set the status of a complaint and/or reply to it.
 *
 * @param {Object} req - The request object containing the complaint ID in the URL parameters and the new status in the body.
 * @param {Object} req.params.id - The ID of the complaint to update.
 * @param {Object} req.body.status - The new status of the complaint.
 * @param {Object} req.body.comment - The reply to the complaint.
 * @param {Object} res - The response object for sending the updated complaint or an error message.
 * @returns {Object} - JSON object of the updated complaint or an error message.
 *
 * @throws {404} - If the complaint is not found.
 * @throws {500} - If there is an error updating the complaint.
 */
const updateComplaintStatus = async (req, res) => {
	try {
        const { isResolved, comment } = req.body;
		const complaint = await Complaint.findByIdAndUpdate(
			req.params.id,
			{ isResolved, comment },
		);
		if (!complaint) {
			return res.status(404).json({ message: "Complaint not found" });
		}
		res
			.status(200)
			.json({ message: "Complaint updated successfully!", complaint });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

/**
 * Retrieves complains created by a specific user.
 *
 * @param {Object} req - The request object containing the user ID in the URL parameters.
 * @param {Object} req.params.id - The ID of the user to retrieve complaints for.
 * @param {Object} res - The response object for sending the retrieved complaints or an error message.
 * @returns {Object} - JSON object of the retrieved complaints or an error message.
 *
 * @throws {404} - If the user is not found.
 * @throws {500} - If there is an error retrieving the complaints.
 */
const getMyComplaints = async (req, res) => {
	try {
		const complaints = await Complaint.find({
			creatorId: req.params.creatorId,
		});
		if (!complaints) {
			return res.status(404).json({ message: "Complaints not found" });
		}
		res.status(200).json(complaints);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	createComplaint,
	getComplaintById,
	updateComplaintStatus,
	getMyComplaints,
};
