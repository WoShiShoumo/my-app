import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Restaurant } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({ 
    queryKey: ["/api/restaurants"]
  });

  const [savedRestaurants, setSavedRestaurants] = useState<number[]>([]);

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedRestaurants(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-48" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-primary">Open Now</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants?.map((restaurant) => (
          <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow relative">
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="h-48 w-full object-cover"
                />
                <button 
                  onClick={(e) => toggleSave(restaurant.id, e)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/50"
                >
                  <Bookmark 
                    className={`h-5 w-5 ${
                      savedRestaurants.includes(restaurant.id) 
                        ? 'text-primary fill-current' 
                        : 'text-white'
                    }`}
                  />
                </button>
              </div>
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                <p className="text-muted-foreground">{restaurant.description}</p>
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {restaurant.category}
                </span>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}