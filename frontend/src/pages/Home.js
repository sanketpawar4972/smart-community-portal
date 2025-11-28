import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";

export default function Home() {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-blue-120 pt-24 px-6">


      {/* Logo Above Heading */}
      <img
        src={logo}
        alt="Smart Community Logo"
        className="w-38 h-37 mb-4 drop-shadow-md"
      />

      {/* Big Heading */}
      <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
        Welcome to Smart Community Portal
      </h1>

      {/* Subtitle */}
      <p className="text-gray-700 text-lg text-center max-w-2xl mb-10">
        Easily manage complaints, community events, and community services.  
        Stay connected with your neighborhood.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-6 justify-center">
        <Link
          to="/user-login"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          User Login
        </Link>

        <Link
          to="/admin-login"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Admin Login
        </Link>

        
      </div>

      {/* Footer Text */}
      <p className="mt-12 text-sm text-gray-500">
        Empowering your community with smarter tools
      </p>
    </div>
  );
}
