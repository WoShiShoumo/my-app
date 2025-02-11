
import { useLocation } from "wouter";
import { Home, User, Wallet, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [location, navigate] = useLocation();

  const navItems = [
    { href: "/", icon: <Home className="h-6 w-6" />, label: "Order Here" },
    { href: "/cart", icon: <ShoppingCart className="h-6 w-6" />, label: "Cart" },
    { href: "/profile", icon: <User className="h-6 w-6" />, label: "Profile" },
    { href: "/savings", icon: <Wallet className="h-6 w-6" />, label: "Saving Mode" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary border-t border-primary/20">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => navigate(item.href)}
            className={`flex flex-col items-center p-2 ${
              location === item.href ? 'text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
