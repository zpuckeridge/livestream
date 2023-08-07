import Link from "next/link";
import { Home, LayoutGrid } from "lucide-react";

import { Authentication } from "@/components/authentication";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default async function Navigation() {
  return (
    <nav className="p-4 flex items-center">
      <Link href="/">
        <Button variant="secondary">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>

      <div className="flex items-center gap-2 ml-auto">
        <Link href="/dashboard">
          <Button variant="secondary">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <ModeToggle />
        <Authentication />
      </div>
    </nav>
  );
}
