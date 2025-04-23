import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORY_IMAGES = {
  'jewelry': 'https://images.pexels.com/photos/4937223/pexels-photo-4937223.jpeg?auto=compress&cs=tinysrgb&w=600',
  'clothing': 'https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg?auto=compress&cs=tinysrgb&w=600',
  'home': 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600',
  'art': 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
  'craft-supplies': 'https://images.pexels.com/photos/6046181/pexels-photo-6046181.jpeg?auto=compress&cs=tinysrgb&w=600',
  'gifts': 'https://images.pexels.com/photos/14766303/pexels-photo-14766303.jpeg?auto=compress&cs=tinysrgb&w=600',
  'weddings': 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=600',
  'toys': 'https://images.pexels.com/photos/208009/pexels-photo-208009.jpeg?auto=compress&cs=tinysrgb&w=600',
};

export default function CategoriesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">
            Browse our vast collection of handcrafted items by category.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category) => (
            <Link href={`/explore?category=${category.id}`} key={category.id}>
              <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div className="aspect-square relative">
                  <img
                    src={CATEGORY_IMAGES[category.id as keyof typeof CATEGORY_IMAGES]}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                    <h3 className="text-white font-medium text-center">{category.name}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}