'use client'; 

import { useState, useEffect} from 'react';
import { FaPen } from 'react-icons/fa'; // Import the pen icon
import { useRouter } from 'next/navigation'; // Use Next.js router
import { auth } from '../firebase';
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore imports
import { db } from '../firebase'; // Firestore instance
 import type { User } from 'firebase/auth';
import { Link } from 'lucide-react';

// import { useAuthState } from 'react-firebase-hooks/auth'; // Import Firebase hooks

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const [user, setUser] = useState<User | null>(null); // Track current user state
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null); 

  // console.log('User:', user); 
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the authenticated user

        const userDoc = doc(db, 'users', currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setRole(userData.role); 
        } else {
          console.error('User document does not exist');
        }
      } else {
        setUser(null); // No user is signed in
        setRole(null); // Clear role
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null); 
      router.push('/'); // Navigate to the home page
      alert('Logged out successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred.');
      }
    } finally {
      setIsMenuOpen(false); // Close the menu after logout
    }
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r bg-white" style={{
      backgroundImage: "url('https://i.makeagif.com/media/8-29-2017/BoktV9.gif')",
    }}> 
      {/* Left side text-based logo with pen icon */}
      <div className="flex items-center mx-8">
        <FaPen className="text-sky-400 text-2xl mr-2" /> {/* Pen icon */}
        <h1 className="text-4xl font-extrabold tracking-wide">
          <span className="text-sky-400">Crafted</span>
          <span className="text-white">Nest</span>
        </h1>
      </div>

      {/* Navbar links - only visible on larger screens */}
      <div className="hidden md:flex items-center space-x-8">
        {user ? (
          <>
            <Link
          href="/about"
          className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105"
        >
          About
        </Link>
            <Link
              href="/explore"
              className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105"
            >
              Explore-Crafts
            </Link>
            <Link
              href="/profile"
              className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105"
            >
              Profile
            </Link>
            {role === 'creator' && (
              <Link
                href="/dashboard/creator/newcraft"
                className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105"
              >
                Publish-Craft
              </Link>
            )}
            <button
              onClick={logoutHandler}
              className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105"
            >
              Log-Out
            </button>
            
          </>
        ) : (
          <>
          <Link
          href="/"
          className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105"
        >
          About
        </Link>
          <Link
            href="/login"
            className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105"
          >
            Log-In
          </Link>
          <Link
            href="/signup"
            className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105"
          >
            Sign-Up
          </Link>
          </>
        )}
      </div>

      {/* Hamburger icon for small screens */}
      <div
        className="md:hidden text-black text-3xl cursor-pointer"
        onClick={toggleMenu}
      >
        &#9776;
      </div>

      {/* Menu component - visible when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 shadow-md md:hidden">
          
          {user ? (
            <>
          <Link
            href="/about"
            className="hover:text-sky-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About </Link>
              <Link
                href="/explore"
                className="hover:text-sky-400 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
                >
                Explore-Crafts
                </Link>
              
              <Link
                href="/profile"
                className="hover:text-sky-400 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              {role === 'creator' && (
                <Link
                  href="/dashboard/crator/newcarft"
                  className="hover:text-sky-400 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Publish-Craft
                </Link>
              )}
            
              <button
                onClick={logoutHandler}
                className="hover:text-sky-400 transition duration-300"
              >
                Log-Out
              </button>
            </>
          ) : (
            <>
            <Link
            href="/"
            className="hover:text-sky-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-sky-400 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About </Link>
            <Link
              href="/login"
              className="hover:text-sky-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Log-In
            </Link>
            <Link
              href="/signup"
              className="hover:text-sky-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign-Up </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;