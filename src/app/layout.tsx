import type { Metadata } from "next";
import { Cabin_Sketch, Geist, Geist_Mono, Lexend } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const cabinSketch = Cabin_Sketch({
  variable: "--font-cabin-sketch",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "PowerMicros | Fresh Microgreens Grown for Your Weekly Order",
  description:
    "PowerMicros is a Clark Dubignon Farms company offering grow-to-order microgreens, eggs, lavender, peppers, and local farm add-ons.",
  icons: {
    icon: "/brand/powermicros-icon-512.png",
    apple: "/brand/powermicros-icon-512.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} ${cabinSketch.variable} antialiased`}>
      <body>
        <div className="pm-shell">
          <Header />
          <main className="pm-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
