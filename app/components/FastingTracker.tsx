"use client";

import { useState, useEffect, useCallback } from "react";

type Protocol = "16:8" | "20:4" | "OMAD" | "5:2";

const PROTOCOLS: Record<Protocol, { fastHours: number; description: string }> = {
  "16:8": { fastHours: 16, description: "16h fast · 8h eating window" },
  "20:4": { fastHours: 20, description: "20h fast · 4h eating window" },
  OMAD:   { fastHours: 23, description: "23h fast · one meal" },
  "5:2":  { fastHours: 24, description: "24h fast day" },
};

interface FastState {
  startTime: number | null;
  protocol: Protocol;
  streakCount: number;
  lastFastDate: string | null;
}

const STORAGE_KEY = "fasting-tracker-state";

function loadState(): FastState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as FastState;
  } catch {
    // ignore
  }
  return { startTime: null, protocol: "16:8", streakCount: 0, lastFastDate: null };
}

function saveState(state: FastState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function formatTime(totalSeconds: number): string {
  const abs = Math.abs(Math.round(totalSeconds));
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function FastingTracker() {
  const [state, setState] = useState<FastState>({
    startTime: null,
    protocol: "16:8",
    streakCount: 0,
    lastFastDate: null,
  });
  const [now, setNow] = useState(Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!state.startTime) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [state.startTime]);

  const startFast = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, startTime: Date.now() };
      saveState(next);
      return next;
    });
  }, []);

  const endFast = useCallback(() => {
    setState((prev) => {
      if (!prev.startTime) return prev;
      const fastHours = PROTOCOLS[prev.protocol].fastHours;
      const elapsedHours = (Date.now() - prev.startTime) / 3_600_000;
      const completed = elapsedHours >= fastHours;

      let newStreak = prev.streakCount;
      const today = new Date().toDateString();

      if (completed) {
        if (!prev.lastFastDate) {
          newStreak = 1;
        } else {
          const last = new Date(prev.lastFastDate);
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          newStreak =
            last.toDateString() === yesterday.toDateString() ||
            last.toDateString() === today
              ? prev.streakCount + 1
              : 1;
        }
      }

      const next: FastState = {
        ...prev,
        startTime: null,
        streakCount: completed ? newStreak : prev.streakCount,
        lastFastDate: completed ? today : prev.lastFastDate,
      };
      saveState(next);
      return next;
    });
  }, []);

  const changeProtocol = useCallback((protocol: Protocol) => {
    setState((prev) => {
      if (prev.startTime) return prev; // no change while fasting
      const next = { ...prev, protocol };
      saveState(next);
      return next;
    });
  }, []);

  if (!mounted) return null;

  const { fastHours } = PROTOCOLS[state.protocol];
  const totalMs = fastHours * 3_600_000;
  const elapsedMs = state.startTime ? now - state.startTime : 0;
  const remainingMs = state.startTime ? totalMs - elapsedMs : totalMs;
  const progress = state.startTime ? Math.min(elapsedMs / totalMs, 1) : 0;
  const isFasting = !!state.startTime;
  const isComplete = isFasting && elapsedMs >= totalMs;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 flex flex-col items-center justify-center p-6 gap-6">
      {/* Protocol selector */}
      <div className="flex gap-2 flex-wrap justify-center">
        {(Object.keys(PROTOCOLS) as Protocol[]).map((p) => (
          <button
            key={p}
            onClick={() => changeProtocol(p)}
            disabled={isFasting}
            aria-pressed={state.protocol === p}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              state.protocol === p
                ? "bg-cyan-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Timer ring */}
      <div className="relative w-44 h-44" aria-label="Fasting progress">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={isComplete ? "#16a34a" : "#0891b2"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          {isFasting ? (
            <>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                {isComplete ? "Complete" : "Remaining"}
              </span>
              <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums leading-none">
                {isComplete
                  ? formatTime(elapsedMs / 1000)
                  : formatTime(remainingMs / 1000)}
              </span>
            </>
          ) : (
            <>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Goal</span>
              <span className="text-2xl font-bold text-slate-900 leading-none">{fastHours}h</span>
            </>
          )}
        </div>
      </div>

      {/* Protocol description */}
      <p className="text-sm text-slate-500">{PROTOCOLS[state.protocol].description}</p>

      {/* Start / End button */}
      <button
        onClick={isFasting ? endFast : startFast}
        className={`px-8 py-3 rounded-xl font-semibold text-white transition-colors ${
          isFasting
            ? "bg-rose-500 hover:bg-rose-600"
            : "bg-cyan-600 hover:bg-cyan-700"
        }`}
      >
        {isFasting ? "End Fast" : "Start Fast"}
      </button>

      {/* Streak */}
      {state.streakCount > 0 && (
        <p className="text-sm text-slate-600 font-medium">
          {state.streakCount} day streak
        </p>
      )}
    </div>
  );
}
