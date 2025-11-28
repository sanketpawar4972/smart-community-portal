import express from "express";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getComplaintById } from "../controllers/complaintController.js";

const router = express.Router();

// User
router.post("/", protect, createComplaint);
router.get("/my-complaints", protect, getMyComplaints);

// Admin



router.get("/all", protect, adminOnly, getAllComplaints);
router.get("/:id", protect, adminOnly, getComplaintById);
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);

export default router;
