import Link from "next/link";
import { Home, LayoutGrid } from "lucide-react";

import { Auth } from "@/components/Navigation/Auth";
import { ModeToggle } from "@/components/Navigation/ModeToggle";
import { Button } from "@/components/ui/button";

export default async function Navbar() {
  return (
    <nav className="p-4 flex items-center">
      <div className="h-8 flex items-center space-x-2">
        <Link href="/">
          <Button size="sm">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>
      <div className="h-8 flex items-center space-x-2 ml-auto">
        <Link href="/dashboard">
          <Button size="sm">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <ModeToggle />
        <Auth />
      </div>
    </nav>
  );
}
