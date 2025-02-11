
import Cart from "@/components/cart";
import { useState } from "react";
import { MenuItem } from "@shared/schema";

export default function CartPage() {
  const [cart, setCart] = useState<(MenuItem & { quantity: number })[]>([]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Cart items={cart} setItems={setCart} />
    </div>
  );
}
