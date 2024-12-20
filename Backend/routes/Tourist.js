const express = require("express");
const router = express.Router();

const {
  getTouristById,
  getTouristByUsername,
  getAllTourists,
  updateTourist,
  deleteTourist,
  redeemPoints,
  addProductToWishlist,
  getWishlistProducts,
  removeFromWishlist,
  addActivityToBookmarks,
  removeFromBookmarks,
  getBookmarkedActivities,
  getCart,
  addToCart,
  addToCartFromWishlist,
  updateCart,
  removeFromCart,
  addAddress,
  viewOrderDetails,
  viewOrders,
  cancelOrder,
} = require("../controllers/Tourist");

router.route("/").get(getAllTourists);

router.route("/user/:username").get(getTouristByUsername);

router
  .route("/:id")
  .get(getTouristById)
  .delete(deleteTourist)
  .post(redeemPoints);

router
  .route("/:id/wishlist")
  .post(addProductToWishlist)
  .delete(removeFromWishlist);

router
  .route("/:id/bookmark")
  .post(addActivityToBookmarks)
  .get(getBookmarkedActivities)
  .delete(removeFromBookmarks);

router.route("/:id/cart").get(getCart).post(addToCart).put(updateCart);
router.route("/:id/cart/:productID").delete(removeFromCart);

router.
route("/:id/orders/:orderID")
.get(viewOrderDetails)
.delete(cancelOrder);

router.route("/:id/orders").get(viewOrders);

router.route("/:id/address").post(addAddress);

router.route("/:id/cart/wishlist").post(addToCartFromWishlist);
router.route("/:id/wishlist/products").get(getWishlistProducts);

module.exports = router;
