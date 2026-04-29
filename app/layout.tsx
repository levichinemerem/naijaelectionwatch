import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Analytics from "@/app/components/Analytics";
import "./globals.css";

const inter = Inter({ subsets:["latin"], variable:"--font-inter", display:"swap" });
const spaceGrotesk = Space_Grotesk({ subsets:["latin"], variable:"--font-space-grotesk", display:"swap" });
const jetbrainsMono = JetBrains_Mono({ subsets:["latin"], variable:"--font-jetbrains-mono", display:"swap" });

export const metadata: Metadata = {
  title: "Naija Election Watch — Tracking Democracy",
  description: "Nigeria's most advanced election intelligence platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0a0f0a] text-[#f0f4f0] antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}