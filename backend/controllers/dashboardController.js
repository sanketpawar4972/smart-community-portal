// import User from "../models/userModel.js";
// import Complaint from "../models/complaintModel.js";
// import Feedback from "../models/feedbackModel.js";
// import Event from "../models/eventModel.js";

// export const getDashboardStats = async (req, res) => {
//   try {
//     const usersCount = await User.countDocuments({});
//     const complaints = await Complaint.find();

//     const pendingCount = complaints.filter(c => c.status === "Pending").length;
//     const inProgressCount = complaints.filter(c => c.status === "In Progress").length;
//     const resolvedCount = complaints.filter(c => c.status === "Resolved").length;

//     const feedbackCount = await Feedback.countDocuments({});
//     const eventsCount = await Event.countDocuments({});

//     res.status(200).json({
//       usersCount,
//       complaints: complaints.length,
//       pendingCount,
//       inProgressCount,
//       resolvedCount,
//       feedbackCount,
//       eventsCount
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to get stats" });
//   }
// };
import User from "../models/userModel.js";
import Complaint from "../models/complaintModel.js";
import Feedback from "../models/feedbackModel.js";
import Event from "../models/eventModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments({});
    const complaints = await Complaint.find();

    const pendingCount = complaints.filter(c => c.status === "Pending").length;
    const inProgressCount = complaints.filter(c => c.status === "In Progress").length;
    const resolvedCount = complaints.filter(c => c.status === "Resolved").length;

    const feedbackCount = await Feedback.countDocuments({});
    const eventsCount = await Event.countDocuments({});

    res.json({
      usersCount,
      complaints: complaints.length,
      pendingCount,
      inProgressCount,
      resolvedCount,
      feedbackCount,
      eventsCount
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
