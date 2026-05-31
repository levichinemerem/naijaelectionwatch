import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import BreadcrumbSchema from "@/app/components/BreadcrumbSchema";

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Naija Election Watch affiliated with any political party?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely not. We have zero affiliation with any political party, candidate, campaign, or government body. We cover everyone — APC, PDP, Labour Party, and all others — with the same critical lens.",
      },
    },
    {
      "@type": "Question",
      name: "Who funds this platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Naija Election Watch is an independent platform. We are funded through advertising, newsletter sponsorships, and reader support — not by political actors or government agencies.",
      },
    },
    {
      "@type": "Question",
      name: "How do you ensure your AI summaries are accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI engine is trained to summarise, not editorialize. Every summary is grounded in the source article. We include a link to the original report so you can always verify what you're reading.",
      },
    },
    {
      "@type": "Question",
      name: "Can I report an error or inaccuracy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — and we encourage it. If you spot something wrong, email us at hello@naijaelectionwatch.com. Corrections are published transparently.",
      },
    },
    {
      "@type": "Question",
      name: "Do you cover state-level elections too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. While the 2027 presidential election is our primary focus, we cover governorship races, senatorial contests, and state house elections across all 36 states.",
      },
    },
    {
      "@type": "Question",
      name: "How often is the site updated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our news feed updates continuously. Major stories are processed and published within minutes of breaking. Daily briefing newsletters go out every morning at 7am WAT.",
      },
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema pathname="/about" />
      <AboutClient />
    </>
  );
}