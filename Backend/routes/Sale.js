const express = require("express");
const {
    getAllSales,
    getMyActivitySales,
    getMyItinerarySales,
    getMyProductSales,
    getProductSalesDetails,
} = require("../controllers/Sale");

const router = express.Router();

router.route("/").get(getAllSales);
router.route("/my-activity-sales/:creatorId").get(getMyActivitySales);
router.route("/my-itinerary-sales/:creatorId").get(getMyItinerarySales);
router.route("/my-product-sales/:creatorId").get(getMyProductSales);
router.route("/sales-details/:id").get(getProductSalesDetails);

module.exports = router;