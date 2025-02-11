import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Confirmation() {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <CardTitle>Order Confirmed!</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Thank you for your order. Your order number is #{id}.
            We'll notify you when your order is on its way.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
