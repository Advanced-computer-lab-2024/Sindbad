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
  updateCart,
  removeFromCart

} = require("../controllers/Tourist");

router.route("/").get(getAllTourists);

router.route("/user/:username").get(getTouristByUsername);

router
  .route("/:id")
  .get(getTouristById)
  .put(updateTourist)
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

router
  .route("/:id/cart")
  .get(getCart)
  .post(addToCart)
  .put(updateCart)
router.route("/:id/cart/:productID").delete(removeFromCart); 

router.route("/:id/wishlist/products").get(getWishlistProducts);

module.exports = router;
