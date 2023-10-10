"use client";

import {
  UserButton,
  SignedIn,
  SignedOut,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { LogIn } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function Authentication() {
  const theme = useTheme();

  return (
    <>
      <SignedIn>
        <div className="relative h-8 w-8">
          <ClerkLoading>
            <div className="absolute inset-0 rounded-full animate-pulse bg-secondary"></div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="absolute inset-0">
              <UserButton
                appearance={{
                  baseTheme: theme.theme === "dark" ? dark : undefined,
                  elements: {
                    card: "bg-muted",
                  },
                }}
              />
            </div>
          </ClerkLoaded>
        </div>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in" className={buttonVariants({ variant: "ghost" })}>
          <LogIn className="mr-2 h-4 w-4" />
          Sign in
        </Link>
      </SignedOut>
    </>
  );
}
