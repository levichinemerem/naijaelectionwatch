import { generateBreadcrumbs } from "@/app/lib/breadcrumbs";

type Props = {
  pathname: string;
  articleTitle?: string;
};

export default function BreadcrumbSchema({ pathname, articleTitle }: Props) {
  if (!pathname) return null;

  const breadcrumbs = generateBreadcrumbs(pathname);

  if (articleTitle && breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1].name = articleTitle;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}