const express = require("express");
const router = express.Router();

const {
	createPromoCode,
    usePromoCode,
} = require("../controllers/PromoCode");

router.route("/").post(createPromoCode);
router.route("/:id").put(usePromoCode);

module.exports = router;