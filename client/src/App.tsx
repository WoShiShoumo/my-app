import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Restaurant from "@/pages/restaurant";
import Checkout from "@/pages/checkout";
import Confirmation from "@/pages/confirmation";
import Profile from "@/pages/profile";
import Savings from "@/pages/savings";
import Navbar from "@/components/navbar";
import { ArrowLeft } from "lucide-react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/restaurant/:id" component={Restaurant} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/confirmation/:id" component={Confirmation} />
      <Route path="/profile" component={Profile} />
      <Route path="/savings" component={Savings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location, setLocation] = useLocation();
  const isHome = location === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background/95">
        <header className="fixed top-0 left-0 right-0 bg-primary border-b border-primary/20 z-50">
          <div className="flex items-center h-14 max-w-md mx-auto px-4">
            {!isHome && (
              <button 
                onClick={() => setLocation("/")}
                className="absolute left-4 text-white hover:text-white/80"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-white tracking-wide flex-1 text-center">
              foodrow
            </h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-4 max-w-md mt-14">
          <Router />
        </main>
        <Navbar />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;