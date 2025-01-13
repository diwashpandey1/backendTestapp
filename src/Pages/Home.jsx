import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to the Practice Session of Firebase
      </h1>
      <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition duration-300">
        Get Started
      </button>
    </div>
  );
}

export default Home;
