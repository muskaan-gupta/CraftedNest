import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface CraftCardProps {
  craft: {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    creatorId: string;
    materials: string[];
    featured?: boolean;
  };
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export default function CraftCard({ craft, creator }: CraftCardProps) {
  return (
    <Link href={`/craft/${craft.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={craft.images[0]}
            alt={craft.title}
            width={500}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {craft.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                Featured
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="pt-4">
          <h3 className="font-medium line-clamp-1">{craft.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{craft.description}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium">${craft.price.toFixed(2)}</p>
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{creator.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}