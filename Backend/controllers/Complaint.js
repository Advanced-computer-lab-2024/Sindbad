const Complaint = require('../models/Complaint');

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
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = { createComplaint };
