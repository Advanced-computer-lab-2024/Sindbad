const express = require("express");
const {
    getAllSales,
    getMySales,
    getProductSalesDetails,
} = require("../controllers/Sale");

const router = express.Router();

router.route("/").get(getAllSales);
router.route("/my-sales/:type/:creatorId").get(getMySales);
router.route("/sales-details/:id").get(getProductSalesDetails);

module.exports = router;