const Admin = require("../models/adminModel");

/**
 * Registers a new admin in the database
 *
 * @param {Object} req - The request object containing the new admin's username and password
 * @param {Object} res - The response object
 * @returns {Object} - The response object containing a success message and the new admin
 */
const registerAdmin = async (req, res) => {
	const { username, password } = req.body;

	// Register a new admin (passport-local-mongoose handles hashing)
	Admin.register(new Admin({ username: username }), password, (err, admin) => {
		if (err) {
			return res.status(500).json({ message: err.message });
		}
		res.status(201).json({ message: "Admin created successfully!", admin });
	});
};

module.exports = { registerAdmin };
