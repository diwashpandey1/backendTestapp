import React, { useContext, useEffect, useState } from 'react';
import { rtdb } from './FireBase'; 
import { ref, get } from 'firebase/database'; 
import { getAuth } from 'firebase/auth';
import { AuthContext } from './AuthContext'; 

function UserData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading, setUser, setAuthLoading } = useContext(AuthContext); 

  useEffect(() => {
    // Load authentication state from local storage or a persistent store
    const storedUser = localStorage.getItem('user'); 
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
      setAuthLoading(false); 
    } else {
      // If no stored user, handle the initial authentication process
      // ... (your existing authentication logic)
    }
  }, []);

  useEffect(() => {
    if (user && !authLoading) { 
      const userId = user.uid; 
      const fetchUserData = async () => { 
        try {
          const userRef = ref(rtdb, 'userData/' + userId); 
          const snapshot = await get(userRef); 
          if (snapshot.exists()) {
            setUserData(snapshot.val()); 
          } else {
            setError('No user data available');
          }
        } catch (error) {
          setError('Error fetching data');
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [user, authLoading]); 
  
  if (authLoading) {
    return <div>Loading authentication...</div>; // Show a loading message while auth state is being fetched
  }

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800">User Data</h1>
        <div className="mt-6 space-y-4">
          <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-4 rounded-lg shadow-md">
            <p className="font-medium text-gray-700">Name: <span className="font-bold">{userData?.name}</span></p>
            <p className="font-medium text-gray-700">Age: <span className="font-bold">{userData?.age}</span></p>
            <p className="font-medium text-gray-700">Gender: <span className="font-bold">{userData?.gender}</span></p>
            <p className="font-medium text-gray-700">Profession: <span className="font-bold">{userData?.profession}</span></p>
            <p className="font-medium text-gray-700">Earning per Month: <span className="font-bold">{userData?.earningPerMonth}</span></p>
            <p className="font-medium text-gray-700">Marital Status: <span className="font-bold">{userData?.maritalStatus}</span></p>
            <p className="font-medium text-gray-700">Message: <span className="font-bold">{userData?.message}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
