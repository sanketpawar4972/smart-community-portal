import React, { useState } from "react";
import axios from "../api/axiosClient";

export default function Feedback() {
  const token = localStorage.getItem("token");

  // SAFELY LOAD USER
  const rawUser = localStorage.getItem("user");
  let user = {};
  try {
    user = rawUser ? JSON.parse(rawUser) : {};
  } catch {
    user = {};
  }

  // SAFELY LOAD FEEDBACK (optional local)
  const rawFeedback = localStorage.getItem("feedback");
  let feedback = [];
  try {
    feedback = rawFeedback ? JSON.parse(rawFeedback) : [];
  } catch {
    feedback = [];
  }

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert("Please enter feedback");

    try {
      setSending(true);
      const res = await axios.post(
        "/feedback",
        {
          message,
          rating,
          user: user.id || user._id || null,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data?.message || "Feedback sent");
      setMessage("");
      setRating(5);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to send feedback");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 md:px-10 bg-gray-50 flex justify-center">

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-5 sm:p-8">

        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">
          Submit Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Feedback Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none text-sm sm:text-base"
              placeholder="Tell us how we can improve..."
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Rating
            </label>

            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className={`px-3 py-1 rounded-md border text-sm sm:text-base ${
                    n <= rating
                      ? "bg-yellow-400 text-white border-yellow-500"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {n}★
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">

            <p className="text-gray-600 text-sm">
              Logged in as{" "}
              <span className="font-medium">{user.name || "Guest"}</span>
            </p>

            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 text-sm sm:text-base"
            >
              {sending ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
