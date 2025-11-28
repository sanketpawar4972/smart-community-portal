import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUserShield,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdReportProblem, MdFeedback, MdEvent } from "react-icons/md";
import logo from "../src/Images/logo.png" // your logo

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {}

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const goHome = () => {
    if (user.role === "admin") navigate("/admin/dashboard");
    else navigate("/complaint");
  };

 const hideNavbarRoutes = [
  "/",
  "/user-login",
  "/admin-login",
  "/register",
  "/admin-register"
];
if (hideNavbarRoutes.includes(location.pathname)) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo + Branding */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={goHome}>
          <img src={logo} alt="Logo" className="w-15 h-20" />
          <h1 className="text-lg md:text-xl font-bold text-blue-600">
            Smart Community Portal
          </h1>
        </div>

        {/* Mobile Menu Toggle */}
        {token && (
          <button
            className="lg:hidden text-3xl text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>
        )}

        {/* Desktop Menu */}
        {token && (
          <ul className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">

            {/* Resident */}
            {user.role === "resident" && (
              <>
                <li><Link to="/complaint" className="hover:text-blue-600 flex items-center gap-1">
                  <MdReportProblem /> Complaint
                </Link></li>
                <li><Link to="/complaints" className="hover:text-blue-600 flex items-center gap-1">
                  <MdReportProblem /> My Complaints
                </Link></li>
                <li><Link to="/feedback" className="hover:text-blue-600 flex items-center gap-1">
                  <MdFeedback /> Feedback
                </Link></li>
                <li><Link to="/events" className="hover:text-blue-600 flex items-center gap-1">
                  <MdEvent /> Events
                </Link></li>
                <li><Link to="/profile" className="hover:text-blue-600 flex items-center gap-1">
                  <FaUser /> Profile
                </Link></li>
              </>
            )}

            {/* Admin */}
            {user.role === "admin" && (
              <>
                <li><Link to="/admin/dashboard" className="hover:text-red-600 flex items-center gap-1">
                  <FaHome /> Dashboard
                </Link></li>
                <li><Link to="/admin/complaints" className="hover:text-red-600 flex items-center gap-1">
                  <MdReportProblem /> Complaints
                </Link></li>
                <li><Link to="/admin/users" className="hover:text-red-600 flex items-center gap-1">
                  <FaUsers /> Users
                </Link></li>
                <li><Link to="/admin/feedback" className="hover:text-red-600 flex items-center gap-1">
                  <MdFeedback /> Feedback Review
                </Link></li>
                <li><Link to="/admin/events" className="hover:text-red-600 flex items-center gap-1">
                  <MdEvent /> Events
                </Link></li>
              </>
            )}
          </ul>
        )}

        {/* Logout Button */}
        {token && (
          <button
            onClick={handleLogout}
            className="hidden lg:block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-1"
          >
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {token && (
        <div
          className={`lg:hidden bg-white px-6 shadow-md py-4 transition-all duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            {/* Resident */}
            {user.role === "resident" && (
              <>
                <li><Link to="/complaint" onClick={() => setOpen(false)}>Submit Complaint</Link></li>
                <li><Link to="/complaints" onClick={() => setOpen(false)}>My Complaints</Link></li>
                <li><Link to="/feedback" onClick={() => setOpen(false)}>Feedback</Link></li>
                <li><Link to="/events" onClick={() => setOpen(false)}>Events</Link></li>
                <li><Link to="/profile" onClick={() => setOpen(false)}>Profile</Link></li>
              </>
            )}

            {/* Admin */}
            {user.role === "admin" && (
              <>
                <li><Link to="/admin/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
                <li><Link to="/admin/complaints" onClick={() => setOpen(false)}>Complaints</Link></li>
                <li><Link to="/admin/users" onClick={() => setOpen(false)}>Users</Link></li>
                <li><Link to="/admin/feedback" onClick={() => setOpen(false)}>Feedback Review</Link></li>
                <li><Link to="/admin/events" onClick={() => setOpen(false)}>Events</Link></li>
              </>
            )}
          </ul>

          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="mt-4 block w-full text-center px-4 py-2 bg-red-600 text-white rounded-md"
          >
            <FaSignOutAlt className="inline-block mr-1" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
