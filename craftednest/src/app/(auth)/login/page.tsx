"use client";
import { useState } from "react";
import { auth, db} from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Navbar from "@/components/Navbar";

const LoginPage = () => {
  const googleProvider = new GoogleAuthProvider();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); // no need to take role here as we are not creating a new user
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password} = formData;
    if (!email || !password ) return alert("Please fill all fields");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

      alert(`Logged in as ${role}`);
        router.push(`/dashboard/${role}`);// Redirect to respective dashboard
    }
    else {
        alert("User role not found. Please contact support.");
      }}catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        alert(`Logged in as ${user.displayName} (${role})`);
        router.push(`/dashboard/${role}`); // Redirect to user dashboard
    }
    else {
        alert("User role not found. Please contact support.");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };


  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
    <div className="flex flex-col items-center justify-center min-h-screen w-full h-screen bg-cover bg-center bg-no-repeat bg-white">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login to Your Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>

        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <FcGoogle className="mr-3" />
            Login with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;