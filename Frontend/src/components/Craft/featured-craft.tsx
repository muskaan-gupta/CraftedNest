import { SAMPLE_CRAFTS, FEATURED_CREATORS } from "@/lib/constants";
import CraftCard from "./craft-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturedCrafts() {
  // Filter to get only featured crafts
  const featuredCrafts = SAMPLE_CRAFTS.filter(craft => craft.featured);

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Featured Crafts</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Discover our handpicked selection of exceptional handcrafted treasures.
            </p>
          </div>
          <Link href="/explore" className="mt-4 md:mt-0">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredCrafts.map((craft) => {
            const creator = FEATURED_CREATORS.find(c => c.id === craft.creatorId) || {
              id: craft.creatorId,
              name: 'Unknown Creator',
            };
            
            return (
              <CraftCard 
                key={craft.id} 
                craft={craft} 
                creator={creator}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}