import React, { useState } from "react";
import axios from "../api/axiosClient";

export default function Complaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electricity");


  const submitComplaint = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Enter a title");
    if (!description.trim()) return alert("Enter a description");

    try {
      await axios.post("/complaints", 
  { title, description, category }
);


      alert("Complaint submitted successfully");
      setTitle(""); setDescription(""); setCategory("Electricity");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit");
    }
  };

  return (
    <div className="flex justify-center mt-20 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Submit Complaint
        </h2>

        <form onSubmit={submitComplaint} className="space-y-5">

          <div>
            <label className="font-medium text-gray-700">Title</label>
            <input required value={title} onChange={(e)=>setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Description</label>
            <textarea required rows="4" value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none bg-white"
            >
              <option>Electricity</option>
              <option>Water Supply</option>
              <option>Road / Street</option>
              <option>Garbage</option>
              <option>Drainage</option>
              <option>Other</option>
            </select>
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit Complaint
          </button>

        </form>
      </div>
    </div>
  );
}
