import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "@/lib/site";

const BASE_URL = "https://kolezbukclub.vercel.app";

/**
 * XML sitemap served at /sitemap.xml (already referenced by public/robots.txt).
 * The site uses hash-based routing (#/about, #/authors, ...), so the homepage
 * is the primary entry — hash URLs are listed as well so every page is
 * discoverable by crawlers that follow them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...ALL_ROUTES.filter((route) => route.path !== "/").map((route) => ({
      url: `${BASE_URL}/#${route.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
