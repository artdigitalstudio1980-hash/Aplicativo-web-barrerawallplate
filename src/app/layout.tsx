import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmailCapture } from "@/components/home/EmailCapture";
import { StickyCTA } from "@/components/home/StickyCTA";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barrera Wallplate | Upgrade the Smallest Detail",
  description: "Transform any room with Barrera's premium screwless wall plate system. The final 5% detail that makes your space feel truly premium.",
  keywords: ["screwless wall plate", "premium switch cover", "interior design", "home upgrade", "seamless wall plate", "modern switch plate"],
  openGraph: {
    title: "Barrera Wallplate | Premium Screwless Design",
    description: "Upgrade the smallest detail. Transform the entire room.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barrera Wallplate",
    description: "The interior design upgrade system. No visible screws. Pure, uninterrupted design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
          <EmailCapture delay={20000} />
          <StickyCTA />
        </CartProvider>
      </body>
    </html>
  );
}
