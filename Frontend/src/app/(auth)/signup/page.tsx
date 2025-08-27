"use client";

import { auth, db} from "@/firebase"; 

import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
const SignUpPage = () => {
  const googleProvider = new GoogleAuthProvider();
  

  const router = useRouter();



  

  const handleGoogleSignInUser = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
        createdAt: new Date(),
      });
      alert(`Signed in as ${user.displayName} (User)`);
      router.push("/dashboard"); // Redirect to user dashboard
    } catch (error: unknown) {
      alert((error as Error).message);
    }
  };

  const handleGoogleSignInCreator = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "creator",
        createdAt: new Date(),
      });
      alert(`Signed in as ${user.displayName} (Creator)`);
      router.push("/dashboard"); // Redirect to creator dashboard
    } catch (error: unknown) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full h-screen bg-cover bg-center bg-no-repeat bg-white"
    
    >
    
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Your Account</h2>


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
    </div>
  );
};

export default SignUpPage;