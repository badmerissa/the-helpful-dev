import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AppSpotlight from "../app/components/AppSpotlight";

const defaultProps = {
  icon: <span>icon</span>,
  status: "LIVE" as const,
  title: "Test App",
  tagline: "Test Category",
  description: "Test description",
  bullets: ["Feature A", "Feature B", "Feature C"],
  href: "https://example.com",
  ctaLabel: "Open App",
  previewContent: <div>Preview</div>,
};

describe("AppSpotlight", () => {
  it("renders title and tagline", () => {
    render(<AppSpotlight {...defaultProps} />);
    expect(screen.getByText("Test App")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
  });

  it("renders all bullet points", () => {
    render(<AppSpotlight {...defaultProps} />);
    expect(screen.getByText("Feature A")).toBeInTheDocument();
    expect(screen.getByText("Feature B")).toBeInTheDocument();
    expect(screen.getByText("Feature C")).toBeInTheDocument();
  });

  it("renders live CTA link with aria-label for LIVE status", () => {
    render(<AppSpotlight {...defaultProps} />);
    const link = screen.getByRole("link", { name: /open app \(opens in new tab\)/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders Coming Soon span (not a link) for COMING SOON status", () => {
    render(<AppSpotlight {...defaultProps} status="COMING SOON" />);
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /open app/i })).not.toBeInTheDocument();
  });

  it("renders preview content", () => {
    render(<AppSpotlight {...defaultProps} />);
    expect(screen.getByText("Preview")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<AppSpotlight {...defaultProps} />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });
});
