import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", display: "swap" });

const siteUrl = "https://worldcup2026hub.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "World Cup 2026 Hub — The World's Greatest Football Show",
    template: "%s · World Cup 2026 Hub",
  },
  description:
    "Experience FIFA World Cup 2026 across the USA, Canada & Mexico. Live matches, teams, fixtures, stadiums, players, news and fan zone — one premium football platform.",
  keywords: ["World Cup 2026", "FIFA", "football", "soccer", "fixtures", "teams", "stadiums"],
  openGraph: {
    title: "World Cup 2026 Hub",
    description: "The world's greatest football show returns. Every match, every goal, every moment.",
    url: siteUrl,
    siteName: "World Cup 2026 Hub",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "World Cup 2026 Hub",
    description: "The world's greatest football show returns.",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${anton.variable} ${bebas.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SportsEvent",
                name: "FIFA World Cup 2026",
                startDate: "2026-06-11",
                endDate: "2026-07-19",
                location: { "@type": "Place", name: "USA · Canada · Mexico" },
              }),
            }}
          />
          <Navbar />
          <main className="relative pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
