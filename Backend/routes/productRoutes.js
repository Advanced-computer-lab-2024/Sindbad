const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  addReview,
  deleteProduct,
  getMinMaxPrices,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.post("/review/:id",addReview);
router.get("/", getAllProducts);
router.get("/getPriceMinMax",getMinMaxPrices); //get the minimum and maximum price of all products
router.get("/:id", getProductById);
router.delete("/:id",deleteProduct)

module.exports = router;
