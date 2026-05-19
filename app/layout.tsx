import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Analytics from "@/app/components/Analytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Naija Election Watch — Nigeria's 2027 Election Intelligence Platform",
    template: "%s | Naija Election Watch",
  },
  description:
    "Real-time Nigerian election news, verified data, and civic education for the 2027 elections. Track INEC updates, candidate profiles, and results across all 36 states.",
  metadataBase: new URL("https://www.naijaelectionwatch.com"),
  alternates: {
    canonical: "https://www.naijaelectionwatch.com",
  },
  openGraph: {
    siteName: "Naija Election Watch",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#FFFFFF] text-[#111827] antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}