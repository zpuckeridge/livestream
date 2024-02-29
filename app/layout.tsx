import "@/app/globals.css";
import Navigation from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from "@/lib/umami";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "../components/theme-provider";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans overflow-x-hidden my-10 lg:my-0 dark:bg-black`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
      <Script src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} />
    </html>
  );
}
