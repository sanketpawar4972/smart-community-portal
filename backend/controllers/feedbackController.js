import Feedback from "../models/feedbackModel.js";

// User: Submit feedback
export const submitFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;

    const feedback = await Feedback.create({
      user: req.user._id,
      message,
      rating,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// User: View own feedback
export const getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user._id });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Admin: View all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate("user", "name email");
    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Admin: Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
