const express = require("express");

const AuthController = require("../controllers/Auth");
const loginLimiter = require("../middlewares/loginLimiter");

const router = express.Router();

router.route("/").post(loginLimiter, AuthController.login);

router.route("/refresh").get(AuthController.refresh);

router.route("/logout").post(AuthController.logout);

router.route("/get-user").get(AuthController.getUserInfo);

module.exports = router;
