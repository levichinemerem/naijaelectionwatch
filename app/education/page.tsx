import type { Metadata } from "next";
import EducationClient from "./EducationClient";

export const metadata: Metadata = {
  title: "Understand Nigerian Elections — Voter Guides & Civic Education",
  description:
    "Free plain-language guides to Nigerian elections, voter registration, INEC processes, and your rights as a citizen. Built for every Nigerian before 2027.",
  alternates: {
    canonical: "https://www.naijaelectionwatch.com/education",
  },
  openGraph: {
    title: "Understand Nigerian Elections — Voter Guides & Civic Education | Naija Election Watch",
    description:
      "Free plain-language guides to Nigerian elections, voter registration, INEC processes, and your rights as a citizen. Built for every Nigerian before 2027.",
    url: "https://www.naijaelectionwatch.com/education",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Naija Election Watch Civic Education Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Understand Nigerian Elections — Voter Guides & Civic Education | Naija Election Watch",
    description:
      "Free plain-language guides to Nigerian elections, voter registration, INEC processes, and your rights as a citizen. Built for every Nigerian before 2027.",
    images: ["/og-image.png"],
  },
};

export default function EducationPage() {
  return <EducationClient />;
}