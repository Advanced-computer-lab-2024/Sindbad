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
} = require("../controllers/User");
const verifyJWT = require("../middlewares/verifyJWT");

// Public routes (No authentication required)
router.post("/signup", signUp);

// Protected routes (Require JWT authentication)
router.post("/changePassword/:id", verifyJWT, updateUserPassword);

router.post("/changeAcceptance/:id", verifyJWT, updateUserAcceptance);

router.get("/get-user-role/:id", verifyJWT, getUserRole);

router.get("/getPendingUsers", verifyJWT, getAllPendingUsers);

router.get("/canDelete/:id", verifyJWT, checkDeletion);

router.get("/", verifyJWT, getAllUsers);

router.delete("/:id", verifyJWT, deleteUser);

router.patch(
  "/request-account-deletion/:id",
  verifyJWT,
  requestAccountDeletion
);

module.exports = router;
