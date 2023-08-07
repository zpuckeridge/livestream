import "@/app/globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/rss.xml`,
    },
  },
  applicationName: "sdelta.xyz",
  authors: { name: siteConfig.username },
  creator: siteConfig.username,
  publisher: siteConfig.username,
  generator: "Next.js",
  keywords: ["sdelta", "sdelta.xyz", "sdelta Livestream", "sdelta Live Stream"],
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  appleWebApp: {
    title: "sdelta.xyz",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  title: {
    default: "sdelta",
    template: "%s | sdelta",
  },
  description: siteConfig.description,
  openGraph: {
    url: siteConfig.url,
    title: "sdelta",
    description: siteConfig.description,
    images: [
      {
        url: "https://og.sznm.dev/api/generate?heading=Livestream&text=https://sdelta.xyz", // to be replaced with own generator
        alt: "sdelta.xyz og-image",
      },
    ],
    siteName: "zpuckeridge",
  },
  twitter: {
    creator: "@zpuckeridge",
    card: "summary_large_image",
  },
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
        <body className={`${inter.className} dark:bg-[#171717]`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Navigation />
            <div className="flex flex-col min-h-screen justify-between space-y-4 container">
              {children}
              <Toaster />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
