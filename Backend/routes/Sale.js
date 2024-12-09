const express = require("express");
const {
  getAllSales,
  getMySales,
  getProductSalesDetails,
  getSalesById,
} = require("../controllers/Sale");

const router = express.Router();

router.route("/").get(getAllSales);
router.route("/my-sales/:type/:creatorId").get(getMySales);
router.route("/sales-details/:id").get(getProductSalesDetails);
router.route("/sales/:id").get(getSalesById);

module.exports = router;
