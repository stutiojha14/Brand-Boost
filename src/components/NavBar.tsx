
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-2xl">
            <span className="text-gradient">BrandBoost</span>
            <span className="ml-1 text-xs font-normal text-muted-foreground">AI</span>
          </Link>
          <nav className="hidden md:flex ml-10 space-x-6 font-medium">
            <Link to="/create" className="text-muted-foreground hover:text-foreground transition-colors">Create Ads</Link>
            <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">Analytics</Link>
            <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">Templates</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex">Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
