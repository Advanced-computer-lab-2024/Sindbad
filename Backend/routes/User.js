const express = require("express");
const router = express.Router();
const {
	signUp,
	getUserRole,
	deleteUser,
	getAllUsers,
	updateUserPassword,
	getAllPendingUsers,
	updateUserAcceptance,
	checkDeletion,
} = require("../controllers/User");

// Sign up route
router.post("/changePassword/:id", updateUserPassword);

router.post("/changeAcceptance/:id", updateUserAcceptance);

router.post("/signup", signUp);

router.get("/get-user-role/:id", getUserRole);

router.get("/getPendingUsers", getAllPendingUsers);

router.get("/canDelete/:id", checkDeletion);

router.get("/", getAllUsers);

router.delete("/:id", deleteUser);



module.exports = router;
