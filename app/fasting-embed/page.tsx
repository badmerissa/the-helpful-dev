import type { Metadata } from "next";
import FastingTracker from "@/app/components/FastingTracker";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function FastingEmbed() {
  return <FastingTracker />;
}
