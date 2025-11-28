import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem("token");

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("/complaints/my-complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(res.data);
    } catch {
      alert("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="mt-20 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        My Complaints
      </h2>

      {complaints.length === 0 ? (
        <div className="bg-white p-5 rounded-lg shadow text-gray-600">
          You have no complaints filed yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {complaints.map((c) => (
            <div key={c._id} className="bg-white shadow rounded-lg p-5">
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-gray-600 mt-2">{c.description}</p>

              <span className={`inline-block mt-3 px-3 py-1 text-sm rounded-full 
                ${c.status === "Resolved" ? "bg-green-100 text-green-600" :
                  c.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-600"}`}>
                {c.status}
              </span>

              <p className="text-sm text-gray-500 mt-3">
                Submitted: {new Date(c.dateSubmitted).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
