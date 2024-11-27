const express = require("express");
const router = express.Router();

const {
	createPromoCode,
    usePromoCode,
} = require("../controllers/PromoCode");

router.route("/").post(createPromoCode);
router.route("/:id").get(usePromoCode);

module.exports = router;