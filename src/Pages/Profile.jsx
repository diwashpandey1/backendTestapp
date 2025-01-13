import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './FireBase'; // Assuming you're exporting 'auth' from your firebase config file

function Profile() {
  const { user } = useContext(AuthContext); // Destructure 'user' from AuthContext

  const handleLogout = async () => {
    try {
      await signOut(auth); // This signs the user out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {user ? (
          <>
            {/* Profile Picture */}
            <img
              src={user.photoURL}
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            {/* User Details */}
            <h1 className="text-2xl font-semibold mb-2">{user.displayName || 'No Name Provided'}</h1>
            <p className="text-gray-600 mb-2">{user.email || 'No Email Provided'}</p>
            <p className="text-gray-600 mb-2">{user.phoneNumber || 'No Phone Number Provided'}</p>
            <p className="text-gray-600 mb-2">{user.dob || 'No Date of Birth Provided'}</p> {/* You might need to fetch the dob from your database if it's custom */}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-600">You are not logged in.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
