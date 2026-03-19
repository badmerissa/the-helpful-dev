"use client";

import { useState } from "react";

interface Props {
  variant?: "light" | "dark";
}

const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID ?? "8957581";
const CONVERTKIT_URL = `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`;

const SUBMISSION_COOLDOWN_MS = 5000;
const TIMEOUT_MS = 10000;
const MAX_RETRIES = 2;

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries: number = MAX_RETRIES
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || attempt === retries) return response;
    } catch (err) {
      if (attempt === retries) throw err;
      // Exponential back-off: 1s, 2s
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw new Error("Max retries exceeded");
}

export default function NewsletterForm({ variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  // Use a boolean flag instead of computing Date.now() on every render
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCoolingDown || status === "loading") return;

    setStatus("loading");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const data = new FormData();
      data.append("email_address", email);

      const response = await fetchWithRetry(CONVERTKIT_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      // Validate response shape — ConvertKit returns { subscription: { state: "active" } }
      const json = await response.json().catch(() => null);
      const confirmed = response.ok && json?.subscription != null;

      if (confirmed) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setIsCoolingDown(true);
        setTimeout(() => setIsCoolingDown(false), SUBMISSION_COOLDOWN_MS);
      }
    } catch {
      // Network error, timeout, or abort — do not log in production
      if (process.env.NODE_ENV !== "production") {
        console.warn("[NewsletterForm] Submission failed — network or timeout error");
      }
      setStatus("error");
      setIsCoolingDown(true);
      setTimeout(() => setIsCoolingDown(false), SUBMISSION_COOLDOWN_MS);
    } finally {
      clearTimeout(timeout);
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`p-4 rounded-lg text-center ${
          variant === "dark"
            ? "bg-white/20 text-white border border-white/30"
            : "bg-green-50 text-green-700 border border-green-200"
        }`}
      >
        <p className="font-bold">🎉 Check your email!</p>
        <p className="text-sm mt-1">I&apos;ve sent you a confirmation link.</p>
      </div>
    );
  }

  const inputClass =
    variant === "dark"
      ? "flex-1 px-4 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm min-w-0"
      : "flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 text-sm min-w-0";

  const btnClass =
    variant === "dark"
      ? "px-5 py-2.5 rounded-lg bg-white text-cyan-600 font-semibold text-sm hover:bg-cyan-50 transition-colors whitespace-nowrap disabled:opacity-50 shrink-0"
      : "px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors whitespace-nowrap disabled:opacity-50 shrink-0 text-sm";

  const labelClass =
    variant === "dark" ? "text-cyan-100" : "text-slate-700";

  const isDisabled = status === "loading" || isCoolingDown;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Visually hidden label keeps the input accessible to screen readers */}
        <label
          htmlFor="newsletter-email"
          className={`sr-only ${labelClass}`}
        >
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          className={inputClass}
          required
          disabled={isDisabled}
          autoComplete="email"
        />
        <button type="submit" disabled={isDisabled} className={btnClass}>
          {status === "loading" ? "Joining..." : "Get Updates"}
        </button>
      </form>
      {status === "error" && (
        <p
          role="alert"
          className={`text-xs mt-2 text-center ${
            variant === "dark" ? "text-cyan-200" : "text-red-500"
          }`}
        >
          Oops! Something went wrong. Please try again in a moment.
        </p>
      )}
      <p
        className={`text-xs mt-3 text-center ${
          variant === "dark" ? "text-cyan-300" : "text-slate-400"
        }`}
      >
        By subscribing you agree to our{" "}
        <a
          href="/privacy"
          className={`underline underline-offset-2 ${
            variant === "dark" ? "hover:text-white" : "hover:text-slate-600"
          }`}
        >
          Privacy Policy
        </a>
        . We use ConvertKit to manage subscriptions. Unsubscribe at any time.
      </p>
    </div>
  );
}
