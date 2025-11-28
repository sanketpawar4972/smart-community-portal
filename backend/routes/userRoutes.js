import express from "express";
import {
  registerUser,
  loginUser,
  adminLogin,
  registerAdmin,
  getUsers,
  updateUserRole,
  deleteUser
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/register", registerAdmin);
router.post("/admin/login", adminLogin);

// Admin Protected Routes
router.get("/", protect, adminOnly, getUsers);
router.put("/:id/role", protect, adminOnly, updateUserRole);
router.delete("/:id", protect, adminOnly, deleteUser);

// User Profile (Protected)
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

export default router;
