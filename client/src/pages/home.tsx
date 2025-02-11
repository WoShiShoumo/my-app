import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Restaurant } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({ 
    queryKey: ["/api/restaurants"]
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Local Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants?.map((restaurant) => (
          <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="h-48 w-full object-cover"
              />
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
