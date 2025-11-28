
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    dateSubmitted: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// FIXED name: Complaint instead of Complainent
const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
