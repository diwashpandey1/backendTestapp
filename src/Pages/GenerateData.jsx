import React, { useState, useContext } from "react";
import { rtdb } from "./FireBase"; // Make sure db is from 'firebase/database'
import { ref, set } from "firebase/database"; // Import set to write data to the database
import { AuthContext } from './AuthContext'; // Assuming this is your AuthContext

function GenerateData() {
   const { user } = useContext(AuthContext); // Get user data from context
   const [formData, setFormData] = useState({
      name: "",
      age: "",
      gender: "",
      profession: "",
      earningPerMonth: "",
      maritalStatus: "",
      message: "",
   });

   const [generatedData, setGeneratedData] = useState(null);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.message.length > 50) {
         alert("Message should be 50 characters or less.");
         return;
      }

      if (user) {
         try {
            // Reference to the specific user's data in the Realtime Database
            const userRef = ref(rtdb, 'userData/' + user.uid); // 'userData' is the path in your Realtime Database

            // Use set to write the data to the Realtime Database
            await set(userRef, formData);
            alert("Data saved successfully!");
            setGeneratedData(formData); // Display the saved data
         } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error saving data. Please try again.");
         }

         // Reset form fields
         setFormData({
            name: "",
            age: "",
            gender: "",
            profession: "",
            earningPerMonth: "",
            maritalStatus: "",
            message: "",
         });
      } else {
         alert("User is not logged in.");
      }
   };

   if (!user) {
      return (
         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
               <h1 className="text-2xl font-semibold mb-4">Please log in to generate data.</h1>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
            <h1 className="text-2xl font-semibold mb-4">Generate Demo Data</h1>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-2 border border-gray-300 rounded-md"
               />
               <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full p-2 border border-gray-300 rounded-md"
               />
               <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
               </select>
               <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Profession"
                  className="w-full p-2 border border-gray-300 rounded-md"
               />
               <input
                  type="number"
                  name="earningPerMonth"
                  value={formData.earningPerMonth}
                  onChange={handleChange}
                  placeholder="Earning per Month"
                  className="w-full p-2 border border-gray-300 rounded-md"
               />
               <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
               </select>
               <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Short Message (max 50 characters)"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  maxLength="50"
               />
               <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  Generate Data
               </button>
            </form>
         </div>
      </div>
   );
}

export default GenerateData;
