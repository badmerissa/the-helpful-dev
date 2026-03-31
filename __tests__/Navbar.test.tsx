import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "../app/components/Navbar";

// next/image and next/link need mocks in vitest/jsdom
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

describe("Navbar", () => {
  it("renders the site logo and name", () => {
    render(<Navbar />);
    expect(screen.getByAltText("The Helpful Dev")).toBeInTheDocument();
    expect(screen.getByText("The Helpful Dev")).toBeInTheDocument();
  });

  it("renders navigation category links", () => {
    render(<Navbar />);
    // Categories from lib/nav.ts are rendered
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("opens and closes mobile menu on hamburger click", () => {
    render(<Navbar />);
    const toggleBtn = screen.getByRole("button", { name: /open menu/i });

    // Menu is closed initially — mobile menu panel not visible
    expect(screen.queryByRole("button", { name: /close menu/i })).not.toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("renders Follow the journey CTA", () => {
    render(<Navbar />);
    const ctaLinks = screen.getAllByText(/follow the journey/i);
    expect(ctaLinks.length).toBeGreaterThan(0);
  });
});
