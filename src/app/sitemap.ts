import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://worldcup2026hub.example.com";
  const routes = ["", "/teams", "/fixtures", "/stadiums", "/players", "/news", "/fan-zone", "/dashboard", "/login"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: r === "" ? 1 : 0.8,
  }));
}
