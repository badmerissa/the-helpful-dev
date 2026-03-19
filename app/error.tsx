"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, send errors to a logging service rather than leaking
    // stack traces to the browser console. Replace with Sentry or similar:
    //   import * as Sentry from "@sentry/nextjs";
    //   Sentry.captureException(error);
    if (process.env.NODE_ENV !== "production") {
      console.error("[Error boundary]", error);
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">Oops</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Something went wrong</h2>
        <p className="text-slate-500 mb-8">
          An unexpected error occurred. Please try again or go back to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:border-cyan-400 hover:text-cyan-600 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
