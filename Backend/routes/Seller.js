const express = require("express");
const {
    createSeller,
    getSellerById,
    updateSeller,
    getAllSellers,
    deleteSeller,
    getProductsBySellerId, // Add the getAllSellers function
} = require("../controllers/Seller");

const router = express.Router();
router.post("/", createSeller);
router.get("/:id", getSellerById);
router.put("/:id", updateSeller);
router.get("/", getAllSellers); 
router.get("/:id/products", getProductsBySellerId);

router.delete("/:id", deleteSeller); 

module.exports = router;