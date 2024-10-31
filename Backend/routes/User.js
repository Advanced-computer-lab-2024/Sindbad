const express = require("express");
const router = express.Router();
const {
	signUp,
	getUserRole,
	deleteUser,
	getAllUsers,
} = require("../controllers/User");

// Sign up route
router.post("/signup", signUp);
router.get("/get-user-role/:id", getUserRole);

router.get("/", getAllUsers);

router.delete("/:id", deleteUser);

module.exports = router;
