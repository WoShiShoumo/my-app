import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, HelpCircle, Package, Bookmark } from "lucide-react";

export default function Profile() {
  const sections = [
    { icon: <Settings />, label: "Settings", href: "#" },
    { icon: <CreditCard />, label: "Payment Methods", href: "#" },
    { icon: <HelpCircle />, label: "Help & Support", href: "#" },
    { icon: <Package />, label: "Orders", href: "#" },
    { icon: <Bookmark />, label: "Saved Restaurants", href: "#" },
  ];

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-primary">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-muted-foreground">John Doe</p>
            <p className="text-muted-foreground">john@example.com</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {sections.map((section) => (
          <Button
            key={section.label}
            variant="outline"
            className="w-full justify-start gap-4 h-14"
            asChild
          >
            <a href={section.href}>
              {section.icon}
              {section.label}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}