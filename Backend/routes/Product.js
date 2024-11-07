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
	getProductSalesDetails,
	getProductsByCreatorId,
} = require("../controllers/Product");

const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts);
router.route("/price-min-max").get(getMinMaxPrices);

router.route("/my-products/:creatorId").get(getProductsByCreatorId);

router
	.route("/:id")
	.get(getProductById)
	.put(updateProduct)
	.delete(deleteProduct)
	.post(addRating);

router.route("/review/:id").post(addReview);

router.route("/sales-details/:id").get(getProductSalesDetails);

module.exports = router;
