"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function ExplorePage() {
  const categories = [
    {
      title: "Jewelry & Accessories",
      items: 1247,
      description:
        "Handcrafted necklaces, earrings, bracelets and unique accessories",
      image: "/craft1.png",
      link: "#",
    },
    {
      title: "Home Decor",
      items: 892,
      description:
        "Beautiful pottery, wooden bowls, and artisanal home accessories",
      image: "/craft2.png",
      link: "#",
    },
    {
      title: "Textiles & Fabrics",
      items: 634,
      description: "Handwoven scarves, quilts, and embroidered textile art",
      image: "/craft3.png",
      link: "#",
    },
    {
      title: "Jewelry & Accessories",
      items: 1247,
      description:
        "Handcrafted necklaces, earrings, bracelets and unique accessories",
      image: "/craft1.png",
      link: "#",
    },
    {
      title: "Home Decor",
      items: 892,
      description:
        "Beautiful pottery, wooden bowls, and artisanal home accessories",
      image: "/craft2.png",
      link: "#",
    },
    {
      title: "Textiles & Fabrics",
      items: 634,
      description: "Handwoven scarves, quilts, and embroidered textile art",
      image: "/craft3.png",
      link: "#",
    },
    {
      title: "Jewelry & Accessories",
      items: 1247,
      description:
        "Handcrafted necklaces, earrings, bracelets and unique accessories",
      image: "/craft1.png",
      link: "#",
    },
    {
      title: "Home Decor",
      items: 892,
      description:
        "Beautiful pottery, wooden bowls, and artisanal home accessories",
      image: "/craft2.png",
      link: "#",
    },
    {
      title: "Textiles & Fabrics",
      items: 634,
      description: "Handwoven scarves, quilts, and embroidered textile art",
      image: "/craft3.png",
      link: "#",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container px-4 py-6 mx-auto">
        <h1 className="text-3xl font-serif font-bold text-center mb-4">
          Explore by Category
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Browse through our carefully curated categories of handmade crafts,
          each showcasing the finest work from skilled artisans
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{category.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {category.items} items
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>
                <a
                  href={category.link}
                  className="block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                  Explore {category.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}