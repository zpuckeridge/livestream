import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Navigation() {
  return (
    <nav className="fixed top-0 w-full">
      <div className="p-4 max-w-7xl mx-auto flex justify-between">
        <Link
          href="/"
          className={`flex gap-2 ${buttonVariants({
            variant: "secondary",
          })}`}
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </Link>

        <div className="flex gap-2 my-auto">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
