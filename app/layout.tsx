import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Analytics from "@/app/components/Analytics";
import "./globals.css";
import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";

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

const organisationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "NewsMediaOrganization"],
      "@id": "https://www.naijaelectionwatch.com/#organization",
      "name": "Naija Election Watch",
      "url": "https://www.naijaelectionwatch.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.naijaelectionwatch.com/logo.png"
      },
      "sameAs": [
        "https://x.com/electionwatchn",
        "https://facebook.com/naijaelectionwatch",
        "https://t.me/NaijaElectionWatch"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@naijaelectionwatch.com",
        "contactType": "editorial"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.naijaelectionwatch.com/#website",
      "url": "https://www.naijaelectionwatch.com",
      "name": "Naija Election Watch",
      "publisher": {
        "@id": "https://www.naijaelectionwatch.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.naijaelectionwatch.com/news?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </head>
      <body className="bg-[#FFFFFF] text-[#111827] antialiased">
        <BreadcrumbSchema />
        {children}
        <Analytics />
      </body>
    </html>
  );
}