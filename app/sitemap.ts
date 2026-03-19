import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://thehelpfuldev.com",
      lastModified: new Date("2026-03-19"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://thehelpfuldev.com/app/fasting",
      lastModified: new Date("2026-03-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://thehelpfuldev.com/app/potty-panda",
      lastModified: new Date("2026-03-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://thehelpfuldev.com/app/unvail",
      lastModified: new Date("2026-03-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://thehelpfuldev.com/app/timeagotchi",
      lastModified: new Date("2026-03-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://thehelpfuldev.com/privacy",
      lastModified: new Date("2026-03-19"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
