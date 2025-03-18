"use client";
import { useState } from "react";
// import { auth } from "@/";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", 
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password, role } = formData;
    if (!email || !password || !role) return alert("Please fill all fields");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert(`Logged in as ${role}`);
      router.push(`/dashboard/${role}`); 
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (

    <div  className="flex flex-col items-center justify-center min-h-screen w-full h-screen bg-cover bg-center bg-no-repeat sm:bg-top md:bg-center lg:bg-cover" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="bg-white p-8 rounded-xl shadow-md w-96 border-4 border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-4 ">Login</h2>
        
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
          className="w-full font-bold p-2 border  rounded-md mb-4"
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="creator" className="hover:bg-blue-600 font-bold">Creator</option>
          <option value="user" className="hover:bg-blue-600 font-bold">User</option>
        </select>

        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? 
          <a href="/signup" className="text-blue-500 ml-1 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
