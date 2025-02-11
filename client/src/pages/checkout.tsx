import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Checkout() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [address, setAddress] = useState("");

  const { mutate: submitOrder, isPending } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/orders", {
        items: ["1", "2"], // Mock items
        total: "49.98",
        status: "pending",
        address,
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Order placed!",
        description: "Your order has been successfully placed.",
      });
      navigate(`/confirmation/${data.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            />
          </div>
          
          <div className="pt-4">
            <Button 
              className="w-full" 
              onClick={() => submitOrder()}
              disabled={!address || isPending}
            >
              {isPending ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
