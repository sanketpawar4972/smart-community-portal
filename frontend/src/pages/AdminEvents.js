import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import { Navigate } from "react-router-dom";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user"))?.role;
  const isAdmin = role === "admin";

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/events", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const resetForm = () => {
    setTitle("");
    setDate("");
    setDescription("");
    setEditingId(null);
  };

  // Save or Update Event
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `/events/${editingId}`,
          { title, date, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "/events",
          { title, date, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      await fetchEvents();
      resetForm();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  // Edit Event
  const editEvent = (event) => {
    setEditingId(event._id);
    setTitle(event.title);
    setDate(event.date.split("T")[0]);
    setDescription(event.description);
  };

  // Delete Event
  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await axios.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchEvents();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      {!isAdmin && <Navigate to="/" />}

      <div className="mt-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Events Management
        </h2>

        {/* Event Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 mb-10"
        >
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? "Update Event" : "Add Event"}
          </h3>

          <input
            type="text"
            placeholder="Event Title"
            className="w-full p-3 border rounded mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="date"
            className="w-full p-3 border rounded mb-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <textarea
            placeholder="Event Description"
            className="w-full p-3 border rounded mb-3"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingId ? "Update Event" : "Add Event"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              type="button"
              className="ml-3 px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>

        {/* Event List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.length === 0 ? (
            <p className="text-gray-600">No events found.</p>
          ) : (
            events.map((evt) => (
              <div key={evt._id} className="bg-white shadow p-5 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800">{evt.title}</h3>
                <p className="text-gray-500">
                  📅 {new Date(evt.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-600">{evt.description}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => editEvent(evt)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(evt._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
