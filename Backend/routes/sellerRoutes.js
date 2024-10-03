const express = require("express");
const {
    createSeller,
    getSellerById,
    updateSeller,
    getAllSellers,
    deleteSeller, // Add the getAllSellers function
} = require("../controllers/sellerController");

const router = express.Router();

// Route to create a new seller
router.post("/", createSeller);

// Route to get a seller by ID
router.get("/:id", getSellerById);

// Route to update a seller by ID
router.put("/:id", updateSeller);

// Route to get all sellers
router.get("/", getAllSellers); 

router.delete("/:id", deleteSeller); 

module.exports = router;