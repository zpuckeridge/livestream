import "@/app/globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import { siteConfig } from "@/config/site";
import Script from "next/script";
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from "@/lib/umami";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} dark:bg-black`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navigation />
            <div className="flex flex-col min-h-screen justify-between space-y-4 container">
              {children}
              <Toaster />
            </div>
          </ThemeProvider>
        </body>
        <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} />
      </html>
    </ClerkProvider>
  );
}
