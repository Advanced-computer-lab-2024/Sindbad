const express = require("express");
const router = express.Router();
const {
	createAdmin,
	getAllAdmins,
	getAdminById,
	updateAdmin,
	deleteAdmin,
	addTourismGovernor,
	getTourismGovernorById,
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
router.get("/tourism-governor/:id", getTourismGovernorById);

module.exports = router;
