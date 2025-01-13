import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleProvider } from './FireBase.jsx';// Import the Firebase config
import { signInWithPopup } from 'firebase/auth';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic (e.g., validation, sending data to server) can be added here
    console.log('Form Submitted:', formData);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Sign-In Successfull", user);
    } catch (error) {
      console.error('Error with Google Sign-IN', error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Sign Up</h1>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <button className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center space-x-2"
          onClick={handleGoogleSignIn}
          >
            <i className="fab fa-google"></i>
            <span>Login with Google</span>
          </button>
          
          <button className="w-full bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900 transition duration-300 flex justify-center items-center space-x-2">
            <i className="fab fa-facebook"></i>
            <span>Login with Facebook</span>
          </button>

          <p className="text-gray-500">
            Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
