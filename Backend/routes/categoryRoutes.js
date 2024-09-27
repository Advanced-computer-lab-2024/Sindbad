const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategory,
} = require("../controllers/categoryController");

router.route("/").post(createCategory).get(getCategory);

module.exports = router;
