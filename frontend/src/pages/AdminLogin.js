import React, { useState } from "react";
import axios from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/admin/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Admin Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg p-8 rounded-lg">

        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 mt-2"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          New Admin?{" "}
          <span
            className="text-red-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/admin-register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}
