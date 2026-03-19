import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import NewsletterForm from "../app/components/NewsletterForm";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("NewsletterForm", () => {
  it("renders the email input and submit button", () => {
    render(<NewsletterForm />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get updates/i })).toBeInTheDocument();
  });

  it("shows loading state while submitting", async () => {
    mockFetch.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => ({ subscription: { state: "active" } }) }), 100))
    );
    render(<NewsletterForm />);

    await userEvent.type(screen.getByLabelText(/email address/i), "test@example.com");
    fireEvent.click(screen.getByRole("button", { name: /get updates/i }));

    expect(screen.getByRole("button", { name: /joining/i })).toBeDisabled();
  });

  it("shows success message on confirmed subscription", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ subscription: { state: "active" } }),
    });
    render(<NewsletterForm />);

    await userEvent.type(screen.getByLabelText(/email address/i), "test@example.com");
    await userEvent.click(screen.getByRole("button", { name: /get updates/i }));

    await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
    expect(screen.getByText(/check your email/i)).toBeInTheDocument();
  });

  it("shows error message when submission fails", async () => {
    // Use mockResolvedValue (persistent, not Once) so all retry attempts also
    // return the non-ok response — avoids real-time retry sleep delays in tests.
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });
    render(<NewsletterForm />);

    await userEvent.type(screen.getByLabelText(/email address/i), "test@example.com");
    await userEvent.click(screen.getByRole("button", { name: /get updates/i }));

    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows error message on network failure", async () => {
    // Use mockRejectedValue (persistent) so all retry attempts throw immediately.
    // Provide enough waitFor timeout for the 1s + 2s exponential back-off delays.
    mockFetch.mockRejectedValue(new Error("Network error"));
    render(<NewsletterForm />);

    await userEvent.type(screen.getByLabelText(/email address/i), "test@example.com");
    await userEvent.click(screen.getByRole("button", { name: /get updates/i }));

    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument(), {
      timeout: 8000,
    });
  });

  it("renders privacy policy link", () => {
    render(<NewsletterForm />);
    expect(screen.getByRole("link", { name: /privacy policy/i })).toBeInTheDocument();
  });

  it("renders dark variant without error", () => {
    render(<NewsletterForm variant="dark" />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });
});
