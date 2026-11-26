import { associationLinks, departments } from "@/data/association";
import { absoluteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/departments", ...associationLinks.map(({ path }) => path), ...departments.map(({ slug }) => `/departments/${slug}`)];
  return routes.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" || path === "/activities" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
