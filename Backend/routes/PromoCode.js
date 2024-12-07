const express = require("express");
const router = express.Router();

const {
	createPromoCode,
    usePromoCode,
    syncPromoCodesWithStripe,
} = require("../controllers/PromoCode");

router.route("/").post(createPromoCode);
router.route("/:id").put(usePromoCode);
router.route("/sync").get(syncPromoCodesWithStripe);
module.exports = router;