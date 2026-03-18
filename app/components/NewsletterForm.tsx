"use client";

import { useState } from "react";

interface Props {
  variant?: "light" | "dark";
}

const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID ?? "8957581";
const CONVERTKIT_URL = `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`;

// Cooldown in ms to prevent rapid-fire resubmission after an error
const SUBMISSION_COOLDOWN_MS = 5000;

export default function NewsletterForm({ variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);

  const isCoolingDown = Date.now() < cooldownUntil;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCoolingDown) return;

    setStatus("loading");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const data = new FormData();
      data.append("email_address", email);

      const response = await fetch(CONVERTKIT_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setCooldownUntil(Date.now() + SUBMISSION_COOLDOWN_MS);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setCooldownUntil(Date.now() + SUBMISSION_COOLDOWN_MS);
    } finally {
      clearTimeout(timeout);
    }
  };

  if (status === "success") {
    return (
      <div
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

  const isDisabled = status === "loading" || isCoolingDown;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          className={inputClass}
          required
          disabled={isDisabled}
        />
        <button type="submit" disabled={isDisabled} className={btnClass}>
          {status === "loading" ? "Joining..." : "Get Updates"}
        </button>
      </form>
      {status === "error" && (
        <p
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
