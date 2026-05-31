import { generateBreadcrumbs } from "@/app/lib/breadcrumbs";

type Props = {
  pathname?: string;          // optional — layout.tsx calls this without a pathname
  articleTitle?: string;
};

export default function BreadcrumbSchema({ pathname, articleTitle }: Props) {
  if (!pathname) return null;  // layout-level call with no pathname renders nothing

  const breadcrumbs = generateBreadcrumbs(pathname);

  if (articleTitle && breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1].name = articleTitle;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}