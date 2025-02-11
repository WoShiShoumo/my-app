import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuItem } from "@shared/schema";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useLocation } from "wouter";

interface CartProps {
  items: (MenuItem & { quantity: number })[];
  setItems: React.Dispatch<React.SetStateAction<(MenuItem & { quantity: number })[]>>;
}

export default function Cart({ items, setItems }: CartProps) {
  const [, navigate] = useLocation();

  const updateQuantity = (id: number, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const total = items.reduce((sum, item) => 
    sum + Number(item.price) * item.quantity, 0
  );

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Your Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Your cart is empty
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => updateQuantity(item.id, -item.quantity)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
      {items.length > 0 && (
        <CardFooter className="flex-col gap-4">
          <div className="flex justify-between w-full text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button 
            className="w-full" 
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
