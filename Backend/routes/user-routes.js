const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

// Sign up route
router.post("/signup", UserController.signUp);
router.get("/get-user-role/:id", UserController.getUserRole);

router.get("/allUsers", UserController.getAllUsers);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
