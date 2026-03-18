import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <Image
          src="/logo.svg"
          alt="The Helpful Dev"
          width={80}
          height={80}
          className="mx-auto mb-8"
        />
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Page not found</h2>
        <p className="text-slate-500 mb-8">
          This page doesn&apos;t exist. It may have been moved or the URL might be wrong.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
