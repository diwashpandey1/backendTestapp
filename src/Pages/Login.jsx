import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Email or Username"
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

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center space-x-2">
            <i className="fab fa-google"></i>
            <span>Login with Google</span>
          </button>

          <button className="w-full bg-blue-800 text-white p-3 rounded-lg hover:bg-blue-900 transition duration-300 flex justify-center items-center space-x-2">
            <i className="fab fa-facebook"></i>
            <span>Login with Facebook</span>
          </button>

          <p className="text-gray-500">
            Don't have an account? <Link to="/signup" className="text-purple-600 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
