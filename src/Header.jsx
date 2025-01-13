import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Pages/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./Pages/FireBase"; // Adjust the path as needed

function Header() {
  const { user } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false); // State to toggle the menu visibility

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout logic
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle the menu visibility
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-white font-bold text-xl tracking-wide">
          <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
            🚀 Gen-Z Hub
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-white text-sm font-medium items-center">
          <Link
            to="/"
            className="hover:text-purple-200 transition duration-300 relative group"
          >
            Home
          </Link>
          <Link
            to="/Profile"
            className="hover:text-purple-200 transition duration-300 relative group"
          >
            Profile
          </Link>
          <Link
            to="/GenerateData"
            className="hover:text-purple-200 transition duration-300 relative group"
          >
            Generate Data
          </Link>
          <Link
            to="/UserData"
            className="hover:text-purple-200 transition duration-300 relative group"
          >
            User Data
          </Link>
          {!user ? (
            <>
              <Link
                to="/signUp"
                className="hover:text-purple-200 transition duration-300 relative group"
              >
                Sign Up
              </Link>
              <Link
                to="/logIn"
                className="hover:text-purple-200 transition duration-300 relative group"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Profile Picture */}
              <div
                className="text-white w-10 h-10 bg-green-400 font-medium rounded-full flex justify-center items-center overflow-hidden cursor-pointer"
                onClick={toggleMenu} // Toggle the menu visibility on click
              >
                <img src={user.photoURL} alt="Profile" />
              </div>
              {/* Dropdown Menu */}
              {menuVisible && (
                <div className="absolute flex flex-col gap-3 bg-white text-black right-0 top-12 rounded-md shadow-md w-32">
                  <Link
                    to="/Profile"
                    className="bg-white hover:bg-gray-200 px-2 py-3"
                    onClick={() => setMenuVisible(false)} // Close the menu when clicking "Profile"
                  >
                    Profile
                  </Link>
                  <button
                    className="bg-white hover:bg-gray-200 px-2 py-3"
                    onClick={handleLogout} // Logout functionality
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
