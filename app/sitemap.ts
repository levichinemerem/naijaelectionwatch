import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://naijaelectionwatch.vercel.app";

  return [
    { url: `${base}/`,           lastModified: new Date(), changeFrequency: "daily",   priority: 1 },
    { url: `${base}/news`,       lastModified: new Date(), changeFrequency: "hourly",  priority: 0.9 },
    { url: `${base}/education`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/about`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/news/inec-releases-final-voter-register-2027`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/news/tinubu-camp-outreach-middle-belt-governors`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/news/naira-slides-election-season-spending`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/news/peter-obi-youth-summit-electoral-reform`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}