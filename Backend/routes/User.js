const express = require("express");
const router = express.Router();
const {
	signUp,
	getUserRole,
	deleteUser,
	getAllUsers,
	updateUserPassword,
} = require("../controllers/User");

// Sign up route
router.post("/changePassword/:id", updateUserPassword);
router.post("/signup", signUp);
router.get("/get-user-role/:id", getUserRole);

router.get("/", getAllUsers);

router.delete("/:id", deleteUser);



module.exports = router;
