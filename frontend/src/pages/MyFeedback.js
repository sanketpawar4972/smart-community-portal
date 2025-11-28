import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";

export default function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("/feedback/my", { headers: { Authorization: `Bearer ${token}` }});
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load feedback");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-20">

      <h2 className="text-3xl font-bold text-blue-600 mb-6">My Feedback</h2>

      {feedbacks.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-gray-600">You have not submitted any feedback yet.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {feedbacks.map((f) => (
            <div key={f._id} className="bg-white p-5 rounded-lg shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{f.message}</h3>
                  <p className="text-sm text-gray-500 mt-2">
  {new Date(f.createdAt).toLocaleString()}
</p>

                </div>
                <div className="text-right">
                  <div className="text-sm text-yellow-700 font-semibold">{f.rating}★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
