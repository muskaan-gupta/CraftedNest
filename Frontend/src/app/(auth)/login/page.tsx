"use client";
import { auth, db} from "@/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const LoginPage = () => {
  const googleProvider = new GoogleAuthProvider();
 // no need to take role here as we are not creating a new user
  const router = useRouter();

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };


  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
    <div className="flex flex-col items-center justify-center min-h-screen w-full h-screen bg-cover bg-center bg-no-repeat bg-white">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login to Your Account</h2>


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
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;