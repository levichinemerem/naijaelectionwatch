export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function generateBreadcrumbs(pathname: string | undefined | null): BreadcrumbItem[] {
  const baseUrl = "https://www.naijaelectionwatch.com";

  if (!pathname) return [{ name: "Home", url: baseUrl }];

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: baseUrl },
  ];

  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;

    const name =
      segment === "news"       ? "News" :
      segment === "education"  ? "Education" :
      segment === "about"      ? "About" :
      segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    breadcrumbs.push({ name, url: `${baseUrl}${currentPath}` });
  });

  return breadcrumbs;
}