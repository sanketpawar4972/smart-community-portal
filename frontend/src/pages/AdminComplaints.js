import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import { Link, Navigate } from "react-router-dom";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("/complaints/all");
        console.log("Complaints fetched:", res.data);
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
      setLoading(false);
    };

    fetchComplaints();
  }, []);

  if (role !== "admin") return <Navigate to="/" />;

  if (loading)
    return (
      <p className="text-center mt-20 font-medium text-gray-600">
        Loading complaints...
      </p>
    );

  return (
    <div className="mt-20 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Manage Complaints
      </h2>

      {complaints.length === 0 ? (
       <p className="text-center text-red-500 font-medium">No Complaints Found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3">Title</th>
                <th className="p-3">User</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{c.title}</td>
                  <td className="p-3">{c.user?.name || "Unknown"}</td>
                  <td className="p-3">{c.category}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        c.status === "Pending"
                          ? "bg-red-100 text-red-600"
                          : c.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link
                      to={`/admin/complaints/${c._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View / Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
