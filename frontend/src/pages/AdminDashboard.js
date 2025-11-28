import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import { Navigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  const isAdmin = role === "admin";

  const fetchStats = async () => {
    try {
      const res = await axios.get("/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard load failed:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div className="mt-20 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-10">
        Admin Dashboard
      </h2>

      {!stats ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card label="Total Users" value={stats.usersCount} />
            <Card label="Total Complaints" value={stats.complaints} />
            <Card label="Feedback Received" value={stats.feedbackCount} />
            <Card label="Pending Complaints" value={stats.pendingCount} />
            <Card label="In Progress Complaints" value={stats.inProgressCount} />
            <Card label="Resolved Complaints" value={stats.resolvedCount} />
            <Card label="Total Events" value={stats.eventsCount} />
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Complaints Status Overview
            </h3>

            <Bar
              data={{
                labels: ["Pending", "In Progress", "Resolved"],
                datasets: [
                  {
                    label: "Complaints Count",
                    data: [
                      stats.pendingCount,
                      stats.inProgressCount,
                      stats.resolvedCount,
                    ],
                    backgroundColor: ["#f87171", "#facc15", "#4ade80"],
                  },
                ],
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="bg-white p-6 shadow rounded-lg text-center">
      <p className="text-gray-600 text-lg">{label}</p>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
