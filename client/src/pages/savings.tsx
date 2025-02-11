import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function Savings() {
  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-primary">Saving Mode</h1>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Wallet className="h-8 w-8 text-primary" />
            <CardTitle>Save on Your Orders</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Enable saving mode to find the best deals and discounts on your favorite restaurants.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
