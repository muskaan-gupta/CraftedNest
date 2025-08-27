"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Import your Firebase configuration
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SAMPLE_CRAFTS } from "@/lib/constants";

interface Creator {
  id: string;
  avatar: string;
  name: string;
}

export default function CraftPage() {
  const params = useParams();
  const craftId = params.id as string;

  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);

  const craft = SAMPLE_CRAFTS.find((c) => c.id === craftId);

  useEffect(() => {
    const fetchCreator = async () => {
      if (!craft) return;

      try {
        const creatorRef = doc(db, "users", craft.creatorId); // Assuming "users" is your Firestore collection
        const creatorSnap = await getDoc(creatorRef);

        if (creatorSnap.exists()) {
          setCreator(creatorSnap.data() as Creator);
        } else {
          console.error("Creator not found");
          setCreator({ id: craft.creatorId, name: "Unknown Creator", avatar: "" });
        }
      } catch (error) {
        console.error("Error fetching creator:", error);
        setCreator({ id: craft.creatorId, name: "Unknown Creator", avatar: "" });
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [craft]);

  if (!craft) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Craft not found</h1>
        <p className="mb-6">The craft you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/explore">
          <Button>Browse All Crafts</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center py-12">Loading...</p>;
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">{craft.title}</h1>
          <div className="flex items-center mb-4">
            <Link href={`/creator/${creator?.id}`} className="flex items-center group">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={creator?.avatar || "/default-avatar.png"} alt={creator?.name || "Unknown"} />
                <AvatarFallback>{creator?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground group-hover:text-foreground">{creator?.name || "Unknown"}</span>
            </Link>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => setFavorited(!favorited)}>
            <span className={`h-4 w-4 ${favorited ? "fill-primary text-primary" : ""}`}>❤️</span>
            <span className="sr-only">Favorite</span>
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground mb-6">{craft.description}</p>
    </div>
  );
}