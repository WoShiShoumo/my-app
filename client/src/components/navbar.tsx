import { Link, useLocation } from "wouter";
import { Home, User, Wallet } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: <Home />, label: "Order Here" },
    { href: "/profile", icon: <User />, label: "Profile" },
    { href: "/savings", icon: <Wallet />, label: "Saving Mode" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <a className={`flex flex-col items-center p-2 ${
              location === item.href ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}