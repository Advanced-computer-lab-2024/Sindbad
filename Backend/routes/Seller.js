const express = require("express");
const {
    createSeller,
    getSellerById,
    updateSeller,
    getAllSellers,
    deleteSeller,
    // Remove getProductsBySellerId function
    // getProductsBySellerId,
    addSellerDocuments,
} = require("../controllers/Seller");

const router = express.Router();
router.post("/", createSeller);
router.get("/:id", getSellerById);
// router.put("/upload/:id",addSellerDocuments);
router.get("/", getAllSellers); 

// Remove route for getting products by seller ID
// router.get("/:id/products", getProductsBySellerId);

router.delete("/:id", deleteSeller); 

module.exports = router;