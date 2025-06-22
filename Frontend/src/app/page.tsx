import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import FeaturedCrafts from '@/components/Craft/featured-craft';

export default function Home() {
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
        <section className="text-center py-20 bg-white rounded-lg shadow-md"  style={{
    backgroundImage: "url('https://i.makeagif.com/media/8-29-2017/BoktV9.gif')",
  }}>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white font-bold"> Welcome to </span>
            <span className="text-blue-500">Crafted</span>
            <span className="text-white">Nest</span>
          </h2>
          <p className="text-lg text-white mb-8">
            Discover unique, handcrafted goods from talented artisans around the world.
            <br />
          “Every handmade piece tells a story. Find yours at CraftedNest.”
    
          </p>
          <Link legacyBehavior href="/signup">
            <a className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
              Join Now
            </a>
          </Link>
          
        </section>

        {/* Featured Crafts */}
        <FeaturedCrafts />
        {/* Call to Action Section */}
        <section className="text-center py-20 bg-white rounded-lg shadow-md"  style={{
    backgroundImage: "url('https://i.makeagif.com/media/8-29-2017/BoktV9.gif')",
  }}>
          <h3 className="text-3xl font-bold text-white mb-4">Are You an Artisan?</h3>
          <p className="text-lg text-white mb-8">
            Join CraftedNest today and showcase your handcrafted creations to the world.
          </p>
          <Link legacyBehavior href="/signup">
            <a className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
              Join Now
            </a>
          </Link>
        </section>
      </main>
    </div>
  );
}