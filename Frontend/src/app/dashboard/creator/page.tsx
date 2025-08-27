"use client";
import Head from 'next/head';
import Link from 'next/link';
import {  useState } from "react";

import  Navbar  from '../../../components/Navbar';
import  FeaturedCrafts from '../../../components/Craft/featured-craft';


const DashboardPage = () => {
  const [crafts, setCrafts] = useState<{ id: string; imageUrl: string; title: string; description: string; price: number }[]>([]);

  // Fetch crafts created by the logged-in user
 
  
     

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Head>
        <title>CraftedNest | Home</title>
        <meta name="description" content="Discover and shop unique handcrafted goods from talented artisans." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto py-10 px-4">
        {/* Hero Section */}
        <section className="text-center py-20 bg-white rounded-lg shadow-md" style={{
    backgroundImage: "url('https://i.makeagif.com/media/8-29-2017/BoktV9.gif')",
  }}>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white font-bold"> Welcome to </span>
            <span className="text-blue-500">Crafted</span>
            <span className="text-white">Nest</span>
          </h2>
          <p className="text-lg text-white mb-8">
            Discover unique, handcrafted goods from talented artisans around the world.
          </p>
          <Link legacyBehavior href="/crafts">
            <a className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
              Explore Crafts
            </a>
          </Link>
        </section>

        {/* Featured Crafts */}
        <FeaturedCrafts />
        <section className="text-center py-20 bg-white rounded-lg shadow-md">
          
          <p className="text-lg text-gray-600 mb-8">
            Manage your crafts and connect with your audience.
          </p>
          <Link legacyBehavior href="/dashboard/creator/newcraft">
            <a className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600">
              Add New Craft
            </a>
          </Link>
        </section>
        <section className="py-10">
            {/* List of Crafts */}
            <h2 className="text-2xl font-semibold mb-4">Your Crafts</h2>
            {crafts.length === 0 ? (
            <p className="text-gray-600">You haven't added any crafts yet.</p>
             ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               {crafts.map((craft) => (
                 <div key={craft.id} className="border rounded p-4">
                 <img
                src={craft.imageUrl}
                alt={craft.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold">{craft.title}</h3>
              <p className="text-sm text-gray-600">{craft.description}</p>
              <p className="text-sm font-semibold mt-2">${craft.price}</p>
              <div className="flex justify-between mt-4">
                <Link href={`/dashboard/creator/editcraft?id=${craft.id}`}>
                  <button className="text-blue-500 hover:underline">Edit</button>
                </Link>
                <button
                  
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
              </div>
          ))}
          </div>
        )}
        </section>
      </main>
    </div>
  );
}
export default DashboardPage;