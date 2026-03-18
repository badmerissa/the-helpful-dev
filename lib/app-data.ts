// Canonical SoftwareApplication JSON-LD schemas for each app.
// Used on both the homepage and each app's landing page to prevent drift.
export const fastingAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Intermittent Fasting Tracker",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://fasting.thehelpfuldev.com/",
  description:
    "A free browser-based intermittent fasting tracker supporting 16:8, 20:4, OMAD, and 5:2 protocols. No account or data collection required.",
};

export const pottyAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Potty Panda",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://pottypanda.thehelpfuldev.com/",
  description:
    "A free browser-based potty training app. Log successes and accidents, run a sit-on-potty timer, and track streaks. No account required.",
};

export const unvailAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "unvAIl",
  applicationCategory: "GameApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://unvail.thehelpfuldev.com/",
  description:
    "A free daily game challenging players to identify which images are real and which are AI-generated. New challenge every day with shareable Wordle-style results.",
};

export const timeagotchiAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Timeagotchi",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: "https://timeagotchi.thehelpfuldev.com/",
  description:
    "A free browser-based time tracking app that gamifies timesheet logging through a Tamagotchi-style virtual pet. Includes weekly reports and CSV export.",
};

export const appsJsonLd = [
  fastingAppJsonLd,
  pottyAppJsonLd,
  unvailAppJsonLd,
  timeagotchiAppJsonLd,
];
