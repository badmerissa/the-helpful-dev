"use client";

import { useState } from "react";

interface Props {
  variant?: "light" | "dark";
}

export default function NewsletterForm({ variant = "light" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const FORM_ID = "8957581";
    const URL = `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`;

    try {
      const data = new FormData();
      data.append("email_address", email);

      const response = await fetch(URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
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
      ? "flex-1 px-4 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm min-w-0"
      : "flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 text-sm min-w-0";

  const btnClass =
    variant === "dark"
      ? "px-5 py-2.5 rounded-lg bg-white text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors whitespace-nowrap disabled:opacity-50 shrink-0"
      : "px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap disabled:opacity-50 shrink-0 text-sm";

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
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"} className={btnClass}>
          {status === "loading" ? "Joining..." : "Get Updates"}
        </button>
      </form>
      {status === "error" && (
        <p
          className={`text-xs mt-2 text-center ${
            variant === "dark" ? "text-indigo-200" : "text-red-500"
          }`}
        >
          Oops! Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
