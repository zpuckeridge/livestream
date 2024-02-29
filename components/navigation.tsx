import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

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
        <ModeToggle />
      </div>
    </nav>
  );
}
