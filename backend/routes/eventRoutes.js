// import express from "express";
// import {
//   createEvent,
//   getAllEvents,
//   deleteEvent,
// } from "../controllers/eventController.js";
// import { protect } from "../middleware/authMiddleware.js";
// import { adminOnly } from "../middleware/adminMiddleware.js";

// const router = express.Router();

// // User: View events
// router.get("/", protect, getAllEvents);

// // Admin: Create event
// router.post("/", protect, adminOnly, createEvent);

// // Admin: Delete event
// router.delete("/:id", protect, adminOnly, deleteEvent);

// export default router;


import express from "express";
import {
  createEvent,
  getAllEvents,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// User
router.get("/", protect, getAllEvents);

// Admin
router.post("/", protect, adminOnly, createEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);

export default router;
