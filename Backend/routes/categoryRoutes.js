const express = require("express");
const router = express.Router();
const { createCategory } = require("../controllers/categoryController");

router.route("/").post(createCategory);

module.exports = router;
