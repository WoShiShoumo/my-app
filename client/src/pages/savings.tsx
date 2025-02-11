import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Restaurant } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark } from "lucide-react";
import { useState } from "react";

const EXCLUDED_RESTAURANTS = ["Le Petit Bistro", "Pasta Paradise", "Bangaliana", "Tyfood"];
const DISCOUNTS = {
  "Foodie": "30% OFF",
  "Hungrybaba": "40% OFF",
  "Tastieee": "25% OFF",
  "Zingrr": "50% OFF",
  "BigZac": "35% OFF",
  "Southern Express": "45% OFF",
  "Dillipoint": "30% OFF",
  "ChinaHit": "40% OFF",
  "Seoul Tower": "35% OFF"
};

export default function Savings() {
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
      <div className="grid grid-cols-1 gap-4">
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

  const filteredRestaurants = restaurants?.filter(
    restaurant => !EXCLUDED_RESTAURANTS.includes(restaurant.name)
  );

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-primary">Today's Best Deals</h1>

      <div className="grid grid-cols-1 gap-4">
        {filteredRestaurants?.map((restaurant) => (
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
                {/* Discount Banner */}
                <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-center py-1 font-bold">
                  {DISCOUNTS[restaurant.name as keyof typeof DISCOUNTS]}
                </div>
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