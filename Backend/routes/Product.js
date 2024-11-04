const express = require("express");
const {
	createProduct,
	updateProduct,
	getAllProducts,
	getProductById,
	addReview,
	deleteProduct,
	getMinMaxPrices,
	addRating,
} = require("../controllers/Product");

const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts);
router.route("/price-min-max").get(getMinMaxPrices);

router
	.route("/:id")
	.get(getProductById)
	.put(updateProduct)
	.delete(deleteProduct)
	.post(addRating);

router.route("/review/:id").post(addReview);

module.exports = router;
