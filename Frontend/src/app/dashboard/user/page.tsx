import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import  Navbar  from '../../../components/Navbar';

const DashboardPage = () => {
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
        <section className="py-10">
          <h3 className="text-3xl font-bold text-center text-black mb-6">Featured Crafts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Example Craft Items */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <Image src="/craft1.jpg" alt="Craft 1" width={300} height={200} className="rounded" />
              <h4 className="font-bold text-black mt-2">Handmade Pottery</h4>
              <p className="text-gray-600">Beautifully crafted ceramic pieces.</p>
              <Link legacyBehavior href="/crafts/1">
                <a className="text-blue-500 mt-2 block hover:underline">View Details</a>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <Image src="/craft2.jpg" alt="Craft 2" width={300} height={200} className="rounded" />
              <h4 className="font-bold text-black mt-2">Wooden Sculptures</h4>
              <p className="text-gray-600">Intricate designs carved by skilled artisans.</p>
              <Link legacyBehavior href="/crafts/2">
                <a className="text-blue-500 mt-2 block hover:underline">View Details</a>
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <Image src="/craft3.jpg" alt="Craft 3" width={300} height={200} className="rounded" />
              <h4 className="font-bold text-black mt-2">Handwoven Baskets</h4>
              <p className="text-gray-600">Eco-friendly and stylish storage solutions.</p>
              <Link legacyBehavior href="/crafts/3">
                <a className="text-blue-500 mt-2 block hover:underline">View Details</a>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
export default DashboardPage;