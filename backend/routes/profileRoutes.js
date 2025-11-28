// import express from "express";
// import {
//   getProfile,
//   updateProfile,
//   updatePassword,
// } from "../controllers/profileController.js";

// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/", protect, getProfile);
// router.put("/", protect, updateProfile);
// router.put("/change-password", protect, updatePassword);

// export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  updatePassword,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.put("/change-password", protect, updatePassword);

export default router;
