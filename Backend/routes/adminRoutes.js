const express = require("express");
const router = express.Router();
const {
	createAdmin,
	getAllAdmins,
	getAdminById,
	updateAdmin,
	deleteAdmin,
	addTourismGovernor,
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

router.post("/add-tourism-governor", addTourismGovernor);

module.exports = router;
