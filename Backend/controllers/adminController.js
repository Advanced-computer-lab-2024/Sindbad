const Admin = require("../models/adminModel");

/**
 * Registers a new admin in the database.
 *
 * @param {Object} req - The request object containing the new admin's data.
 * @param {Object} req.body - The body of the request containing the admin's username and password.
 * @param {String} req.body.username - The username for the new admin.
 * @param {String} req.body.password - The password for the new admin.
 * @param {Object} res - The response object for sending the result.
 * @returns {Object} - JSON object containing a success message and the new admin.
 *
 * @throws {500} - If there is an error during registration (e.g., username already exists).
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
