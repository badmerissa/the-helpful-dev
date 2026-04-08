import { describe, it, expect } from "vitest";
import sitemap from "../app/sitemap";

describe("sitemap", () => {
  const entries = sitemap();

  it("contains 11 routes", () => {
    expect(entries).toHaveLength(11);
  });

  it("includes the homepage at priority 1.0", () => {
    const home = entries.find((e) => e.url === "https://thehelpfuldev.com");
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1.0);
  });

  it("includes all four app pages at priority 0.8", () => {
    const appUrls = [
      "https://thehelpfuldev.com/app/fasting",
      "https://thehelpfuldev.com/app/potty-panda",
      "https://thehelpfuldev.com/app/unvail",
      "https://thehelpfuldev.com/app/timeagotchi",
    ];
    for (const url of appUrls) {
      const entry = entries.find((e) => e.url === url);
      expect(entry, `Missing sitemap entry for ${url}`).toBeDefined();
      expect(entry?.priority).toBe(0.8);
    }
  });

  it("includes the privacy page", () => {
    const privacy = entries.find((e) => e.url === "https://thehelpfuldev.com/privacy");
    expect(privacy).toBeDefined();
    expect(privacy?.priority).toBe(0.3);
    expect(privacy?.changeFrequency).toBe("yearly");
  });

  it("includes the blog index and first post", () => {
    const blog = entries.find((e) => e.url === "https://thehelpfuldev.com/blog");
    expect(blog).toBeDefined();
    expect(blog?.priority).toBe(0.7);
    expect(blog?.changeFrequency).toBe("weekly");

    const post = entries.find((e) => e.url === "https://thehelpfuldev.com/blog/claude-workflow");
    expect(post).toBeDefined();
    expect(post?.priority).toBe(0.7);
    expect(post?.changeFrequency).toBe("monthly");
  });

  it("all entries have a lastModified date", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeDefined();
    }
  });
});
