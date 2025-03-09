"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

function User() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewProfile = () => {
    // Add your profile navigation logic here
    console.log("View profile");
    setIsOpen(false);
  };

  const handleChangePassword = () => {
    // Add your change password logic here
    console.log("Change password");
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {user && (
        <>
          <div
            className="flex items-center justify-center w-8 h-8 bg-gray-500 text-white font-bold rounded-full cursor-pointer hover:bg-gray-600 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}>
            {user?.name?.slice(0, 2).toUpperCase()}
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <ul className="divide-y divide-gray-100">
                <li>
                  <button
                    onClick={handleViewProfile}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    View Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleChangePassword}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Change Password
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default User;
