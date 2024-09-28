// adminMethods.js
const Admin = require("../models/adminModel");

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
