const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  addReview,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.post("/review/:id",addReview);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id",deleteProduct)

module.exports = router;
