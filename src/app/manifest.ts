import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kolez Buk Club",
    short_name: "Kolez",
    description:
      "A curated literary club for independent authors — structured book discovery, honest conversation, and stories that outlive launch week.",
    start_url: "/",
    display: "standalone",
    background_color: "#071B35",
    theme_color: "#071B35",
    icons: [
      {
        src: "/kolez-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
