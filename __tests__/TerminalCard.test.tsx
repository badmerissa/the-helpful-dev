import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TerminalCard from "../app/components/TerminalCard";
import type { TerminalLine } from "../app/components/TerminalCard";

const sampleLines: TerminalLine[] = [
  { type: "cmd", text: "open test-app" },
  { type: "output", text: "Loading..." },
  { type: "success", text: "All good" },
  { type: "error", text: "Something broke" },
  { type: "comment", text: "just a note" },
];

describe("TerminalCard", () => {
  it("renders without crashing with minimal props", () => {
    render(<TerminalCard lines={[]} />);
  });

  it("renders the default title ~/thehelpfuldev", () => {
    render(<TerminalCard lines={[]} />);
    expect(screen.getByText("~/thehelpfuldev")).toBeInTheDocument();
  });

  it("renders custom title when provided", () => {
    render(<TerminalCard title="~/my-app" lines={[]} />);
    expect(screen.getByText("~/my-app")).toBeInTheDocument();
  });

  it("renders each line with correct text content", () => {
    render(<TerminalCard lines={sampleLines} />);
    expect(screen.getByText(/open test-app/)).toBeInTheDocument();
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    expect(screen.getByText(/All good/)).toBeInTheDocument();
    expect(screen.getByText(/Something broke/)).toBeInTheDocument();
    expect(screen.getByText(/just a note/)).toBeInTheDocument();
  });

  it("cmd lines are prefixed with $", () => {
    render(<TerminalCard lines={[{ type: "cmd", text: "run it" }]} />);
    const line = screen.getByText(/run it/);
    expect(line.textContent).toContain("$ run it");
  });

  it("success lines are prefixed with checkmark", () => {
    render(<TerminalCard lines={[{ type: "success", text: "done" }]} />);
    const line = screen.getByText(/done/);
    expect(line.textContent).toContain("\u2713 done");
  });

  it("comment lines are prefixed with #", () => {
    render(<TerminalCard lines={[{ type: "comment", text: "a comment" }]} />);
    const line = screen.getByText(/a comment/);
    expect(line.textContent).toContain("# a comment");
  });

  it("cursor element is present in the DOM", () => {
    const { container } = render(<TerminalCard lines={sampleLines} />);
    const cursor = container.querySelector(".terminal-cursor");
    expect(cursor).toBeInTheDocument();
  });
});
