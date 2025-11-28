import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";

export default function EventPage() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/events", { title, description, date }, { headers: { Authorization: `Bearer ${token}` }});
      setTitle(""); setDescription(""); setDate("");
      fetchEvents();
      alert("Event created");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`/events/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      fetchEvents();
      alert("Event deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 md:px-10">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-blue-600 mb-6">Community Events</h2>

        {/* Admin: create event */}
        {user.role === "admin" && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="font-semibold text-lg mb-3">Create Event</h3>
            <form onSubmit={createEvent} className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Event title" className="col-span-2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" required/>
              <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" required/>
              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="md:col-span-3 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400" rows={3} />
              <div className="md:col-span-3 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create</button>
              </div>
            </form>
          </div>
        )}

        {/* Events list */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {loading ? <div>Loading...</div> : events.map(ev => (
            <div key={ev._id} className="bg-white p-5 rounded-lg shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-semibold">{ev.title}</h4>
                  <p className="text-gray-600 mt-2">{ev.description}</p>
                  <p className="text-sm text-gray-500 mt-3">Date: {new Date(ev.date).toLocaleDateString()}</p>
                </div>

                <div className="flex flex-col gap-2">
                  {user.role === "admin" && (
                    <button onClick={()=>deleteEvent(ev._id)} className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">Delete</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
