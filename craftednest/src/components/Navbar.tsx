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
    <nav className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r bg-white">
      {/* Left side text-based logo with pen icon */}
      <div className="flex items-center mx-8">
        <FaPen className="text-sky-400 text-2xl mr2" /> {/* Pen icon */}
        <h1 className="text-4xl font-extrabold tracking-wide">
          <span className="text-sky-400">Crafted</span>
          <span className="black">Nest</span>
        </h1>
      </div>

      {/* Navbar links - only visible on larger screens */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Home</a>
        <a href="/about" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">About</a>
        <a href="/services" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Services</a>
        <a href="/login" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Log-In</a>
      </div>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden text-black text-3xl cursor-pointer" onClick={toggleMenu}>
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

const NavbarforCreator = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r bg-white">
      {/* Left side text-based logo with pen icon */}
      <div className="flex items-center mx-8">
        <FaPen className="text-sky-400 text-2xl mr2" /> {/* Pen icon */}
        <h1 className="text-4xl font-extrabold tracking-wide">
          <span className="text-sky-400">Crafted</span>
          <span className="black">Nest</span>
        </h1>
      </div>

      {/* Navbar links - only visible on larger screens */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="/dashboard/creator" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Dashboard</a>
        <a href="/about" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Products</a>
        <a href="/services" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Post</a>
        <a href="/profile" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Profile</a>
        <a href="/logout" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Log-Out</a>
      </div>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden text-black text-3xl cursor-pointer" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Menu component - visible when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 shadow-md md:hidden">
          <a href="/" className="hover:text-sky-400 transition duration-300">Dashboard</a>
          <a href="/about" className="hover:text-sky-400 transition duration-300">Products</a>
          <a href="/services" className="hover:text-sky-400 transition duration-300">Post</a>
          <a href="/login" className="hover:text-sky-400 transition duration-300">Profile</a>
          <a href="/logout" className="hover:text-sky-400 transition duration-300">Log-Out</a>
        </div>
      )}
    </nav>
  );
};
const NavbarforUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-gradient-to-r bg-white">
      {/* Left side text-based logo with pen icon */}
      <div className="flex items-center mx-8">
        <FaPen className="text-sky-400 text-2xl mr2" /> {/* Pen icon */}
        <h1 className="text-4xl font-extrabold tracking-wide">
          <span className="text-sky-400">Crafted</span>
          <span className="black">Nest</span>
        </h1>
      </div>

      {/* Navbar links - only visible on larger screens */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="/dashboard/creator" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Dashboard</a>
        <a href="/about" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Products</a>

        <a href="/login" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Profile</a>
        <a href="/logout" className="text-black hover:text-sky-400 transition duration-300 ease-in-out hover:scale-105">Log-Out</a>
      </div>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden text-black text-3xl cursor-pointer" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Menu component - visible when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 shadow-md md:hidden">
          <a href="/" className="hover:text-sky-400 transition duration-300">Dashboard</a>
          <a href="/about" className="hover:text-sky-400 transition duration-300">Products</a>

          <a href="/login" className="hover:text-sky-400 transition duration-300">Profile</a>
          <a href="/logout" className="hover:text-sky-400 transition duration-300">Log-Out</a>
        </div>
      )}
    </nav>
  );
};

export  { NavbarforCreator, NavbarforUser };
export default Navbar;