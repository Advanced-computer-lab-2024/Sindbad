const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

// Sign up route
router.post("/signup", UserController.signUp);
router.get("/get-user-type/:id", UserController.getUserType);

module.exports = router;
