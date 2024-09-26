const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

router.post("/admin", (req, res) => {
	const { username, password } = req.body;

	// Register a new admin (passport-local-mongoose handles hashing)
	Admin.register(new Admin({ username: username }), password, (err, admin) => {
		if (err) {
			return res.status(500).json({ message: err.message });
		}
		res.status(201).json({ message: "Admin created successfully!", admin });
	});
});


module.exports = router;
