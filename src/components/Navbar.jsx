import React from 'react';
import logo from "../assets/logo.png";
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  return (
    <div className="border-b bg-white px-4 md:px-6 py-4 shadow flex justify-between items-center w-full">
      
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-8 md:h-10 w-auto" />
      </div>

      {/* Search + Sign In */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for course..."
            className="border px-3 py-1.5 rounded-2xl pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 text-sm font-medium">
          Sign In
        </button>
      </div>
    </div>
  );
}
