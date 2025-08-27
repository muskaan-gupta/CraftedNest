import React, { useEffect, useState } from 'react';

interface UserData {
  name: string;
  email: string;
  role: string;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('/api/user-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: UserData = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  if (!userData) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">User Profile</h1>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg p-8 text-white">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-gray-800">{userData.name.charAt(0)}</span>
          </div>
          <p className="text-xl font-semibold mb-2">{userData.name}</p>
          <p className="text-lg mb-2">{userData.email}</p>
          <p className="text-md bg-white text-gray-800 px-4 py-2 rounded-full">Role: {userData.role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
