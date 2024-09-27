const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

// Sign up route
router.post("/signup", UserController.signUp);

module.exports = router;
