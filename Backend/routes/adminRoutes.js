const express = require("express");
const router = express.Router();
const { registerAdmin } = require("../controllers/adminController");

router
	.route("/")
	.post(registerAdmin);

module.exports = router;
