import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "../api/axiosClient";

export default function AdminComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchComplaint = async () => {
  try {
    const res = await axios.get(`/complaints/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComplaint(res.data);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};


    fetchComplaint();
  }, [id, token]);

  // Update status function
  const updateStatus = async (status) => {
    try {
      await axios.put(
        `/complaints/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaint({ ...complaint, status });
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  if (role !== "admin") return <Navigate to="/" />;

  if (loading) {
    return <p className="mt-20 text-center text-gray-600">Loading...</p>;
  }

  if (!complaint) {
    return <p className="mt-20 text-center text-red-600">Complaint not found!</p>;
  }

  return (
    <div className="mt-20 px-6 md:px-20">
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Complaint Details</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Title:</strong> {complaint.title}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p><strong>User:</strong> {complaint.user?.name || "Unknown"}</p>
          <p><strong>Email:</strong> {complaint.user?.email}</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => updateStatus("Pending")}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            disabled={complaint.status === "Pending"}
          >
            Mark Pending
          </button>

          <button
            onClick={() => updateStatus("In Progress")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            disabled={complaint.status === "In Progress"}
          >
            Mark In Progress
          </button>

          <button
            onClick={() => updateStatus("Resolved")}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            disabled={complaint.status === "Resolved"}
          >
            Mark Resolved
          </button>
        </div>

        <button
          onClick={() => navigate("/admin/complaints")}
          className="mt-6 text-blue-600 font-medium hover:underline"
        >
          ← Back to Complaints
        </button>
      </div>
    </div>
  );
}
