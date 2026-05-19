import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Naija Election Watch — Independent Nigerian Election Intelligence",
  description:
    "Naija Election Watch is Nigeria's independent election intelligence platform. No political agenda. Verified sources. Built for informed citizens ahead of 2027.",
  alternates: {
    canonical: "https://www.naijaelectionwatch.com/about",
  },
  openGraph: {
    title: "About Naija Election Watch — Independent Nigerian Election Intelligence",
    description:
      "Naija Election Watch is Nigeria's independent election intelligence platform. No political agenda. Verified sources. Built for informed citizens ahead of 2027.",
    url: "https://www.naijaelectionwatch.com/about",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Naija Election Watch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Naija Election Watch — Independent Nigerian Election Intelligence",
    description:
      "Naija Election Watch is Nigeria's independent election intelligence platform. No political agenda. Verified sources. Built for informed citizens ahead of 2027.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}