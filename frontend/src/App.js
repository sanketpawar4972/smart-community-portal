import { Routes, Route } from "react-router-dom";

// Public
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";

// Resident Pages
import Complaint from "./pages/Complaint";
import MyComplaints from "./pages/MyComplaints";
import Feedback from "./pages/Feedback";
import MyFeedback from "./pages/MyFeedback";
import EventPage from "./pages/Event";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminComplaintDetails from "./pages/AdminComplaintDetails";
import AdminUsers from "./pages/AdminUsers";
import AdminFeedback from "./pages/AdminFeedback";
import AdminEvents from "./pages/AdminEvents";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/Adminroute";

// Navbar
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-6">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-register" element={<AdminRegister />} />

          {/* Resident Routes */}
          <Route
            path="/complaint"
            element={<ProtectedRoute><Complaint /></ProtectedRoute>}
          />
          <Route
            path="/complaints"
            element={<ProtectedRoute><MyComplaints /></ProtectedRoute>}
          />
          <Route
            path="/feedback"
            element={<ProtectedRoute><Feedback /></ProtectedRoute>}
          />
          <Route
            path="/my-feedback"
            element={<ProtectedRoute><MyFeedback /></ProtectedRoute>}
          />
          <Route
            path="/events"
            element={<ProtectedRoute><EventPage /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={<AdminRoute><AdminDashboard /></AdminRoute>}
          />
          <Route
            path="/admin/complaints"
            element={<AdminRoute><AdminComplaints /></AdminRoute>}
          />
          <Route
            path="/admin/complaints/:id"
            element={<AdminRoute><AdminComplaintDetails /></AdminRoute>}
          />
          <Route
            path="/admin/users"
            element={<AdminRoute><AdminUsers /></AdminRoute>}
          />
          <Route
            path="/admin/feedback"
            element={<AdminRoute><AdminFeedback /></AdminRoute>}
          />
          <Route
            path="/admin/events"
            element={<AdminRoute><AdminEvents /></AdminRoute>}
          />

        </Routes>
      </div>
    </>
  );
}

export default App;
