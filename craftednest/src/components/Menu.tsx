import React from 'react';
import Link from 'next/link';

const Menu = () => {
  return (
    <div className="menu">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/services">Services</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
};

export default Menu;
