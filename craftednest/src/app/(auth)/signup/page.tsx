"use client";
import { useState } from "react";
// import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // "creator" or "user"
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    const { email, password, role } = formData;
    if (!email || !password || !role) return alert("Please fill all fields");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert(`Signed up as ${role}`);
      router.push(`/dashboard/${role}`); // Redirect to respective dashboard
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          onChange={handleChange} 
        />

        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          onChange={handleChange} 
        />

        <select 
          name="role" 
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="creator">Creator</option>
          <option value="user">User</option>
        </select>

        <button 
          onClick={handleSignUp} 
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? 
          <a href="/login" className="text-green-500 ml-1 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
