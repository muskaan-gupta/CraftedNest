"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SAMPLE_CRAFTS, FEATURED_CREATORS, CATEGORIES, MATERIALS } from "@/lib/constants";
import CraftCard from "../../components/Craft/craft-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialFeatured = searchParams.get("featured") === "true";

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(initialCategory || "");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [featuredOnly, setFeaturedOnly] = useState(initialFeatured);
  const [sortBy, setSortBy] = useState("newest");

  const filteredCrafts = SAMPLE_CRAFTS.filter((craft) => {
    // Filter by search term
    if (searchTerm && !craft.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !craft.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
     // Filter by category
    
    return true;
  });

  // Sort crafts
  const sortedCrafts = [...filteredCrafts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0; // newest (for demo purposes, we'll keep the original order)
    }
  });

  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold">Explore Crafts</h1>
          <p className="text-muted-foreground">Discover unique handcrafted treasures from our talented creators</p>
        </div>
        
        <div className="w-full md:w-auto relative flex">
          <Input
            placeholder="Search crafts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 w-full md:w-[300px]"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block space-y-6">
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="all-categories" 
                  checked={category === ""} 
                  onCheckedChange={() => setCategory("")}
                />
                <Label htmlFor="all-categories" className="font-normal">All Categories</Label>
              </div>
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${cat.id}`} 
                    checked={category === cat.id}
                    onCheckedChange={() => setCategory(cat.id)}
                  />
                  <Label htmlFor={`category-${cat.id}`} className="font-normal">{cat.name}</Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={500}
              step={10}
              onValueChange={setPriceRange}
              className="mt-6"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Materials</h3>
            <div className="space-y-2">
              {MATERIALS.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`material-${material}`} 
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={() => handleMaterialToggle(material)}
                  />
                  <Label htmlFor={`material-${material}`} className="font-normal">{material}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Other Filters</h3>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="featured-only" 
                checked={featuredOnly}
                onCheckedChange={(checked) => setFeaturedOnly(checked as boolean)}
              />
              <Label htmlFor="featured-only" className="font-normal">Featured Items Only</Label>
            </div>
          </div>
        </div>

              {/* Filters - Mobile */}
              <Sheet>
          <div className="flex justify-between items-center lg:hidden mb-4">
            <div className="flex items-center">
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="mr-2">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              
              {category && (
                <Button variant="outline" size="sm" onClick={() => setCategory("")}>
                  {CATEGORIES.find(cat => cat.id === category)?.name}
                  <span className="ml-1">×</span>
                </Button>
              )}
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <SheetContent side="left">
            <div className="py-4 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="all-categories-mobile" 
                      checked={category === ""} 
                      onCheckedChange={() => setCategory("")}
                    />
                    <Label htmlFor="all-categories-mobile" className="font-normal">All Categories</Label>
                  </div>
                  {CATEGORIES.map((cat) => (
                    <div key={`mobile-${cat.id}`} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-mobile-${cat.id}`} 
                        checked={category === cat.id}
                        onCheckedChange={() => setCategory(cat.id)}
                      />
                      <Label htmlFor={`category-mobile-${cat.id}`} className="font-normal">{cat.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={500}
                  step={10}
                  onValueChange={setPriceRange}
                  className="mt-6"
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Materials</h3>
                <div className="space-y-2">
                  {MATERIALS.map((material) => (
                    <div key={`mobile-${material}`} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`material-mobile-${material}`} 
                        checked={selectedMaterials.includes(material)}
                        onCheckedChange={() => handleMaterialToggle(material)}
                      />
                      <Label htmlFor={`material-mobile-${material}`} className="font-normal">{material}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Other Filters</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured-only-mobile" 
                    checked={featuredOnly}
                    onCheckedChange={(checked) => setFeaturedOnly(checked as boolean)}
                  />
                  <Label htmlFor="featured-only-mobile" className="font-normal">Featured Items Only</Label>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
               
        {/* Sort by - Desktop */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-muted-foreground">Showing {sortedCrafts.length} items</p>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Crafts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCrafts.map((craft) => {
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
          {sortedCrafts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setCategory("");
                  setPriceRange([0, 500]);
                  setSelectedMaterials([]);
                  setFeaturedOnly(false);
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Crafts Grid - Mobile */}
        <div className="lg:hidden">
          <p className="text-muted-foreground mb-4">Showing {sortedCrafts.length} items</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sortedCrafts.map((craft) => {
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

                  
          {sortedCrafts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setCategory("");
                  setPriceRange([0, 500]);
                  setSelectedMaterials([]);
                  setFeaturedOnly(false);
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}