import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";



export default function Profile() {
  const token = localStorage.getItem("token");
const rawUser = localStorage.getItem("user");
let storedUser = {};

try {
  storedUser = rawUser ? JSON.parse(rawUser) : {};
} catch {
  storedUser = {};
}
  const [name, setName] = useState(storedUser.name || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/users/profile", { headers: { Authorization: `Bearer ${token}`}});
      const u = res.data;
      setName(u.name || "");
      setEmail(u.email || "");
      localStorage.setItem("user", JSON.stringify(u));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // optional fetch to sync
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  
  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    setUpdating(true);
    const res = await axios.put(
      "/profile",
      { name, email },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Profile updated");
    localStorage.setItem("user", JSON.stringify(res.data.user));
  } catch (err) {
    alert("Update failed");
  } finally {
    setUpdating(false);
  }
};


  return (
    <div className="pt-20 px-4 sm:px-6 md:px-10 flex justify-center">

      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-blue-600 mb-4">My Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div className="flex justify-end">
            <button disabled={updating} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {updating ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
