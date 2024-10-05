const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  addReview,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.post("/review/:id",addReview);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
