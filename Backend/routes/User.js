const express = require("express");
const router = express.Router();
const {
  signUp,
  getUserRole,
  deleteUser,
  getAllUsers,
  updateUserPassword,
  getAllPendingUsers,
  updateUserAcceptance,
  checkDeletion,
  requestAccountDeletion,
  forgotPassword,
  resetPassword,
} = require("../controllers/User");

// Public routes (No authentication required)
router.post("/signup", signUp);

router.post("/reset-password", resetPassword);

router.post("/forgot-password", forgotPassword);

// Protected routes (Require JWT authentication)
router.post("/changePassword/:id", updateUserPassword);

router.post("/changeAcceptance/:id", updateUserAcceptance);

router.get("/get-user-role/:id", getUserRole);

router.get("/getPendingUsers", getAllPendingUsers);

router.get("/canDelete/:id", checkDeletion);

router.get("/", getAllUsers);

router.delete("/:id", deleteUser);

router.patch("/request-account-deletion/:id", requestAccountDeletion);

module.exports = router;
