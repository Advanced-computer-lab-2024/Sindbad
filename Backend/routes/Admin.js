const express = require("express");
const router = express.Router();
const {
	createAdmin,
	getAllAdmins,
	getAdminById,
	updateAdmin,
	deleteAdmin,
	getAllRequestedAccountDeletionUsers,
} = require("../controllers/Admin");

router.route("/").get(getAllAdmins).post(createAdmin);

router.get(
	"/requested-account-deletion-users",
	getAllRequestedAccountDeletionUsers
);

router.route("/:id").get(getAdminById).put(updateAdmin).delete(deleteAdmin);

module.exports = router;
