const express = require("express");
const router = express.Router();
const { createComplaint } = require("../controllers/Complaint");

router
    .route("/")
    .post(createComplaint)

module.exports = router;
