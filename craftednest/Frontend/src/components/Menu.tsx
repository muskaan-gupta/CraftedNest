import React from 'react';
import Link from 'next/link';

const Menu = () => {
  return (
     <div className="flex flex-col space-y-4 p-4 bg-gray-800 text-white">
      <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
      <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded">About</Link>
      <Link href="/services" className="hover:bg-gray-700 px-3 py-2 rounded">Services</Link>
      <Link href="/contact" className="hover:bg-gray-700 px-3 py-2 rounded">Contact</Link>
    </div>
  );
};

export default Menu;
