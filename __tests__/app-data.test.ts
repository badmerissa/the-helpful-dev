import { describe, it, expect } from "vitest";
import {
  fastingAppJsonLd,
  pottyAppJsonLd,
  unvailAppJsonLd,
  timeagotchiAppJsonLd,
  appsJsonLd,
} from "../lib/app-data";

const REQUIRED_FIELDS = ["@context", "@type", "name", "applicationCategory", "operatingSystem", "offers", "url", "description"] as const;

describe("app-data JSON-LD schemas", () => {
  const apps = [
    { name: "fasting", schema: fastingAppJsonLd },
    { name: "potty-panda", schema: pottyAppJsonLd },
    { name: "unvail", schema: unvailAppJsonLd },
    { name: "timeagotchi", schema: timeagotchiAppJsonLd },
  ];

  for (const { name, schema } of apps) {
    describe(`${name}`, () => {
      for (const field of REQUIRED_FIELDS) {
        it(`has required field: ${field}`, () => {
          expect(schema[field as keyof typeof schema]).toBeDefined();
          expect(schema[field as keyof typeof schema]).not.toBeNull();
        });
      }

      it("is SoftwareApplication type", () => {
        expect(schema["@type"]).toBe("SoftwareApplication");
      });

      it("uses schema.org context", () => {
        expect(schema["@context"]).toBe("https://schema.org");
      });

      it("has a free offer (price 0)", () => {
        expect(schema.offers).toMatchObject({ price: "0", priceCurrency: "USD" });
      });

      it("URL points to thehelpfuldev.com subdomain", () => {
        expect(schema.url).toMatch(/^https:\/\/.*\.thehelpfuldev\.com\//);
      });

      it("is serializable to JSON without error", () => {
        expect(() => JSON.stringify(schema)).not.toThrow();
        const serialized = JSON.stringify(schema);
        expect(serialized).not.toContain("undefined");
      });
    });
  }

  it("appsJsonLd array contains all 4 apps", () => {
    expect(appsJsonLd).toHaveLength(4);
  });
});
