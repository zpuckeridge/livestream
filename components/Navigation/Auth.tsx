"use client";

import {
  UserButton,
  SignedIn,
  SignedOut,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs/app-beta/client";
import { SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export function Auth() {
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
                }}
              />
            </div>
          </ClerkLoaded>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </>
  );
}
