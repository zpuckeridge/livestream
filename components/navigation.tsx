import Link from "next/link";
import { Home, LayoutGrid } from "lucide-react";
import { Authentication } from "@/components/authentication";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";

export default async function Navigation() {
  return (
    <nav className="p-4 fixed top-0 w-full flex justify-between">
      <Link
        href="/"
        className={`flex gap-2 ${buttonVariants({
          variant: "secondary",
        })}`}
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      <div className="flex gap-2 my-auto">
        <Link
          href="/dashboard"
          className={`flex gap-2 ${buttonVariants({
            variant: "secondary",
          })}`}
        >
          <LayoutGrid className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
        <ModeToggle />
        <Authentication />
      </div>
    </nav>
  );
}
