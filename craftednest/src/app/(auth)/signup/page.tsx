"use client";
import { useState } from "react";
import { auth } from "@/firebase"; // Ensure you have your firebase config set up correctly
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
const SignUpPage = () => {
  const googleProvider = new GoogleAuthProvider();
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

  const handleGoogleSignInUser = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Signed in as ${user.displayName} (User)`);
      router.push("/dashboard/user"); // Redirect to user dashboard
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleSignInCreator = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Signed in as ${user.displayName} (Creator)`);
      router.push("/dashboard/creator"); // Redirect to creator dashboard
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Your Account</h2>

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

        <select
          name="role"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="creator">Creator</option>
          <option value="user">User</option>
        </select>

        <button
          onClick={handleSignUp}
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Sign Up
        </button>

        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={handleGoogleSignInUser}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <FcGoogle className="mr-3" />
            Sign Up as User with Google
          </button>

          <button
            onClick={handleGoogleSignInCreator}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-purple-600 transition duration-300 flex items-center justify-center"
          >
            <FcGoogle className="mr-3" />
            Sign Up as Creator with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;