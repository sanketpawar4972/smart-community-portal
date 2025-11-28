// import express from "express";
// import {
//   submitFeedback,
//   getMyFeedback,
//   getAllFeedback,
//   deleteFeedback,
// } from "../controllers/feedbackController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { adminOnly } from "../middleware/adminMiddleware.js";

// const router = express.Router();

// // User routes
// router.post("/", protect, submitFeedback);
// router.get("/my-feedback", protect, getMyFeedback);

// // Admin routes
// router.get("/all", protect, adminOnly, getAllFeedback);
// router.delete("/:id", protect, adminOnly, deleteFeedback);

// export default router;

import express from "express";
import {
  submitFeedback,
  getMyFeedback,
  getAllFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, submitFeedback);
router.get("/my", protect, getMyFeedback);

router.get("/all", protect, adminOnly, getAllFeedback);
router.delete("/:id", protect, adminOnly, deleteFeedback);

export default router;
