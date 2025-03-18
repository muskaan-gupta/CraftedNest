// const Navbar = ()=>{
//     return ();    // can be written like this
// }
// export default Navbar
'use client';  // Client-side rendering

import { useState } from 'react';
import Menu from './Menu'; 
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative flex justify-between items-center p-2 bg-gray-800 h-20 text-white">
      {/* Left side logo */}
      <div className="absolute top--4 md:ml-28">
        <Image src="/Logo2.png" alt="CraftedNest Logo" width={120} height={70} />
      </div>

      {/* Navbar links - only visible on larger screens */}
      <div className="hidden md:flex space-x-6 ml-auto">
        <a href="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</a>
        <a href="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded">About</a>
        <a href="/services" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Services</a>
        <a href="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Log-In</a>
      </div>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden text-white text-3xl ml-auto" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Menu component - visible when isMenuOpen is true */}
      {isMenuOpen && <Menu />}
    </nav>
  );
};

export default Navbar;
