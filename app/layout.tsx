import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Upside Down Tour Playlist - mike.",
  description: "Pick the Upside Down Tour setlist when mike comes to your city.",
  icons: { icon: "/favicon.ico" },
  authors: { url: "https://rollerhodl.me", name: "benny blader" },
  keywords: ["mike", "the lows", "upside down tour", "playlist", "vibes"],
  openGraph: {
    title: "Upside Down Tour Playlist - mike.",
    description: "Pick the Upside Down Tour setlist when mike comes to your city.",
    url: "https://thelows.top",
    siteName: "Upside Down Tour Playlist",
    images: [
      {
        url: "https://image.nostr.build/0a2851cba84c2de0a30dae92bf12a3d03fe7364b6ddb649d16fad861d9ae1238.jpg",
        width: 1080,
        height: 1080,
        alt: "Upside Down Tour Playlist"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    site: "https://thelows.top",
    creator: "benny blader",
    description: "Pick the Upside Down Tour setlist when mike comes to your city.",
    title: "Upside Down Tour Playlist - mike.",
    images: [
      {
        url: "https://image.nostr.build/0a2851cba84c2de0a30dae92bf12a3d03fe7364b6ddb649d16fad861d9ae1238.jpg",
        alt: "Upside Down Tour Playlist",
        width: 1080,
        height: 1080
      }
    ]
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-custom">
      <body className={`${inter.className} bg-custom h-screen`}>
        {/* <Header /> */}
        {children}
        <Toaster />
        <Analytics />
        {/* <Footer /> */}
      </body>
    </html>
  );
}
