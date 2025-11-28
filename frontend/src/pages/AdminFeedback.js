import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import { Navigate } from "react-router-dom";

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const feedbackPerPage = 5;
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  const isAdmin = role === "admin";

  // Fetch Feedback
  const fetchFeedback = async () => {
    try {
      const res = await axios.get("/feedback/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbackList(res.data);
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [token]);

  // Delete Feedback and Refresh List
  const deleteFeedback = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      await axios.delete(`/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchFeedback();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Search filter
  const filtered = feedbackList.filter(f =>
  (f.message || "").toLowerCase().includes(search.toLowerCase()) ||
  (f.user?.name || "").toLowerCase().includes(search.toLowerCase())
);


  // Pagination
  const indexOfLast = currentPage * feedbackPerPage;
  const indexOfFirst = indexOfLast - feedbackPerPage;
  const currentFeedback = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / feedbackPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <>
      {/* Protect Admin Page */}
      {!isAdmin && <Navigate to="/" />}

      <div className="mt-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Feedback Review
        </h2>

        <input
          type="text"
          placeholder="Search feedback..."
          className="w-full md:w-1/3 p-2 border rounded mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {currentFeedback.length === 0 ? (
          <p className="text-center text-gray-600">No feedback found</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentFeedback.map((fb) => (
              <div key={fb._id} className="bg-white shadow rounded-lg p-5">
                <h3 className="text-lg font-bold text-gray-800">{fb.subject}</h3>
                <p className="text-gray-600 mt-2">{fb.message}</p>

                <p className="text-sm text-gray-500 mt-3">
                  ⭐ Rating: {fb.rating}/5
                </p>

                <p className="text-sm text-gray-500">
                  By: {fb.user?.name || "Unknown"}
                </p>

                <p className="text-sm text-gray-400">
                  {new Date(fb.date).toLocaleDateString()}
                </p>

                <button
                  onClick={() => deleteFeedback(fb._id)}
                  className="mt-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
