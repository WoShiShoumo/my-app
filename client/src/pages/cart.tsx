
import Cart from "@/components/cart";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MenuItem } from "@shared/schema";

const TAX_RATE = 0.095; // 9.5% for both CGST and SGST

export default function CartPage() {
  const [, navigate] = useLocation();
  const [cart, setCart] = useState<(MenuItem & { quantity: number })[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  const cgst = subtotal * TAX_RATE;
  const sgst = subtotal * TAX_RATE;
  const total = subtotal + cgst + sgst;

  if (cart.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Cart is Empty</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/")} className="w-full">
            Browse Restaurants
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Cart items={cart} setItems={setCart} />
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>CGST (9.5%)</span>
              <span>₹{cgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>SGST (9.5%)</span>
              <span>₹{sgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <Button 
            className="w-full mt-4" 
            onClick={() => navigate("/checkout")}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
