// const Navbar = ()=>{
//     return ();    // can be written like this
// }
// export default Navbar
'use client';  // Client-side rendering

import { useState } from 'react';
import Menu from './Menu'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      {/* Left side logo */}
      <div className="text-white  flex items-center  "  >
       <h1> CraftedNest</h1>
      </div>

      {/* Navbar links - only visible on larger screens */}
      <div className="hidden md:flex space-x-6">
        <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</a>
        <a href="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded">About</a>
        <a href="/services" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Services</a>
        <a href="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Log-In</a>
      </div>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden text-white text-3xl" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Menu component - visible when isMenuOpen is true */}
      {isMenuOpen && <Menu />}
    </nav>
  );
};

export default Navbar;
