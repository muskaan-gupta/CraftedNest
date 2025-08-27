"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar />
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-serif font-bold">Explore Crafts</h1>
        <p className="text-muted-foreground">Filter: {filter}</p>
        <input
          type="text"
          placeholder="Search crafts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
    </>
  );
}