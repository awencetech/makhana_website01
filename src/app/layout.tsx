
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { FaWhatsapp } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Veltrix | Premium Makhana (Fox Nuts)",
  description: "Veltrix - Premium organic makhana (fox nuts) from India's finest farms. Luxury quality, healthy, and delicious.",
  openGraph: {
    title: "Veltrix | Premium Makhana (Fox Nuts)",
    description: "Veltrix - Premium organic makhana (fox nuts) from India's finest farms. Luxury quality, healthy, and delicious.",
    type: "website",
    locale: "en_US",
    siteName: "Veltrix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veltrix | Premium Makhana (Fox Nuts)",
    description: "Veltrix - Premium organic makhana (fox nuts) from India's finest farms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Replace with your actual WhatsApp number
  const WHATSAPP_NUMBER = "919751728466";
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I'm interested in your premium makhana.`;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-background text-text-primary font-sans">
        <LenisProvider>
          {children}
          {/* Floating WhatsApp Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 hover:shadow-glow-green"
          >
            <FaWhatsapp className="w-8 h-8" />
          </a>
        </LenisProvider>
      </body>
    </html>
  );
}
