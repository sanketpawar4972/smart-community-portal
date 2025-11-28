
import Complaint from "../models/complaintModel.js";

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const complaint = await Complaint.create({
      user: req.user._id,
      title,
      description,
      category,
    });

    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Failed to load complaints" });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id })
      .populate("user", "name email"); // add populate for better admin & user view
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Updated", complaint });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

