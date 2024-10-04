const express = require("express");
const router = express.Router();
const {
	createAdmin,
	getAllAdmins,
	getAdminById,
	updateAdmin,
	deleteAdmin,
} = require("../controllers/adminController");

router
	.route("/")
	.get(getAllAdmins)
	.post(createAdmin);

router
	.route("/:id")
	.get(getAdminById)
	.put(updateAdmin)
	.delete(deleteAdmin);

module.exports = router;
