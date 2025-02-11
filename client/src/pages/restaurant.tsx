import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Restaurant, MenuItem } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import Cart from "@/components/cart";
import { useState } from "react";

export default function RestaurantPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [cart, setCart] = useState<(MenuItem & { quantity: number })[]>([]);

  const { data: restaurant, isLoading: isLoadingRestaurant } = useQuery<Restaurant>({
    queryKey: [`/api/restaurants/${id}`],
  });

  const { data: menuItems, isLoading: isLoadingMenu } = useQuery<MenuItem[]>({
    queryKey: [`/api/restaurants/${id}/menu`],
  });

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const newCart = (() => {
        const existing = prev.find(i => i.id === item.id);
        if (existing) {
          return prev.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      })();
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  if (isLoadingRestaurant || isLoadingMenu) {
    return <Skeleton className="h-96" />;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-primary">{restaurant.name}</h1>
          <p className="text-muted-foreground">{restaurant.description}</p>
        </div>

        <div className="grid gap-6">
          {menuItems?.map((item) => (
            <Card key={item.id}>
              <div className="grid md:grid-cols-2 gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-4">
                  <CardTitle>{item.name}</CardTitle>
                  <p className="text-muted-foreground">{item.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold">₹{item.price}</span>
                    <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Cart items={cart} setItems={setCart} />
      </div>
    </div>
  );
}