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
    {
      url: "https://thehelpfuldev.com/blog",
      lastModified: new Date("2026-03-30"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://thehelpfuldev.com/blog/claude-workflow",
      lastModified: new Date("2026-03-30"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://thehelpfuldev.com/blog/building-the-helpful-dev",
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://thehelpfuldev.com/blog/building-potty-panda",
      lastModified: new Date("2026-04-06"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
