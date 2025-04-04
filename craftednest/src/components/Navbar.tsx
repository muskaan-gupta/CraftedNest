'use client';  // Client-side rendering

import { useState } from 'react';
import { FaPen } from 'react-icons/fa'; // Import the pen icon
import Menu from './Menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg">
      {/* Left side text-based logo with pen icon */}
      <div className="flex items-center mx-8">
        <FaPen className="text-sky-400 text-2xl mr2" /> {/* Pen icon */}
        <h1 className="text-4xl font-extrabold tracking-wide">
          <span className="text-white">Crafted</span>
          <span className="text-sky-400">Nest</span>
        </h1>
      </div>

      {/* Navbar links - only visible on larger screens */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Home</a>
        <a href="/about" className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">About</a>
        <a href="/services" className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Services</a>
        <a href="/login" className="text-white hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Log-In</a>
      </div>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden text-white text-3xl cursor-pointer" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Menu component - visible when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 shadow-md md:hidden">
          <a href="/" className="hover:text-sky-400 transition duration-300">Home</a>
          <a href="/about" className="hover:text-sky-400 transition duration-300">About</a>
          <a href="/services" className="hover:text-sky-400 transition duration-300">Services</a>
          <a href="/login" className="hover:text-sky-400 transition duration-300">Log-In</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;