import type { Metadata } from "next";
import EducationClient from "./EducationClient";
import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";

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

const educationSchema = [
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Register and Vote in Nigeria",
    description:
      "Step-by-step guide on voter registration, obtaining your PVC, and voting using BVAS in Nigerian elections.",
    publisher: {
      "@type": "Organization",
      "@id": "https://www.naijaelectionwatch.com/#organization",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Visit an INEC registration centre",
        text: "Go to your nearest INEC voter registration centre with a valid means of identification.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Provide biometric data",
        text: "Submit your fingerprints and facial data for biometric capture and voter verification.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Collect your PVC",
        text: "Return to collect your Permanent Voter Card (PVC) once processing is complete.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Vote on election day",
        text: "Go to your assigned polling unit with your PVC, get accredited via BVAS, and cast your ballot.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Nigerian Elections Work",
    description:
      "Explains the full structure of elections in Nigeria including INEC's role, the voting process, and how results are collated.",
    publisher: {
      "@type": "Organization",
      "@id": "https://www.naijaelectionwatch.com/#organization",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Voter accreditation",
        text: "INEC officials verify eligible voters at polling units using BVAS technology before voting begins.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Ballot casting",
        text: "Accredited voters select their preferred candidates and submit their ballots at the polling unit.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Result collation",
        text: "Votes are counted at polling units, then transmitted and collated through ward, local government, state, and national collation centres.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.naijaelectionwatch.com/education#webpage",
    url: "https://www.naijaelectionwatch.com/education",
    name: "Understand Nigerian Elections — Voter Guides & Civic Education",
    isPartOf: {
      "@id": "https://www.naijaelectionwatch.com/#website",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "section p"],
    },
  },
];

export default function EducationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationSchema) }}
      />
      <BreadcrumbSchema pathname="/education" />
      <EducationClient />
    </>
  );
}