import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Naija Election Watch — Nigeria's 2027 Election Intelligence Platform",
  description:
    "Real-time Nigerian election news, verified data, and civic education for the 2027 elections. Track INEC updates, candidate profiles, and results across all 36 states.",
  alternates: {
    canonical: "https://www.naijaelectionwatch.com",
  },
  openGraph: {
    title: "Naija Election Watch — Nigeria's 2027 Election Intelligence Platform",
    description:
      "Real-time Nigerian election news, verified data, and civic education for the 2027 elections. Track INEC updates, candidate profiles, and results across all 36 states.",
    url: "https://www.naijaelectionwatch.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Naija Election Watch — Nigeria's 2027 Election Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naija Election Watch — Nigeria's 2027 Election Intelligence Platform",
    description:
      "Real-time Nigerian election news, verified data, and civic education for the 2027 elections. Track INEC updates, candidate profiles, and results across all 36 states.",
    images: ["/og-image.png"],
  },
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.naijaelectionwatch.com/#webpage",
  url: "https://www.naijaelectionwatch.com",
  name: "Naija Election Watch — Nigeria's 2027 Election Intelligence Platform",
  isPartOf: {
    "@id": "https://www.naijaelectionwatch.com/#website",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "section p"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <BreadcrumbSchema pathname="/" />
      <HomeClient />
    </>
  );
}