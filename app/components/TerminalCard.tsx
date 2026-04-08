"use client";

import { useState, useRef } from "react";

export interface TerminalLine {
  type: "cmd" | "output" | "success" | "error" | "comment";
  text: string;
  delay?: number;
}

export interface TerminalCardProps {
  title?: string;
  lines: TerminalLine[];
  accentColor?: string;
  /** If provided, the terminal becomes interactive — typing the command opens the link */
  interactiveCommand?: { command: string; href: string };
}

const colorVars: Record<TerminalLine["type"], string> = {
  cmd:     "var(--terminal-cmd)",
  output:  "var(--terminal-output)",
  success: "var(--terminal-success)",
  error:   "var(--terminal-error)",
  comment: "var(--terminal-comment)",
};

function linePrefix(type: TerminalLine["type"]): string {
  switch (type) {
    case "cmd":     return "$ ";
    case "success": return "\u2713 ";
    case "comment": return "# ";
    default:        return "  ";
  }
}

export default function TerminalCard({
  title = "~/thehelpfuldev",
  lines,
  accentColor,
  interactiveCommand,
}: TerminalCardProps) {
  const [userInput, setUserInput] = useState("");
  const [extraLines, setExtraLines] = useState<TerminalLine[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !interactiveCommand) return;
    const trimmed = userInput.trim();
    if (!trimmed) return;

    if (trimmed === interactiveCommand.command) {
      setExtraLines((prev) => [
        ...prev,
        { type: "cmd", text: trimmed },
        { type: "success", text: "Launching..." },
      ]);
      setUserInput("");
      window.open(interactiveCommand.href, "_blank", "noopener,noreferrer");
    } else {
      setExtraLines((prev) => [
        ...prev,
        { type: "cmd", text: trimmed },
        { type: "error", text: `command not found: ${trimmed}` },
      ]);
      setUserInput("");
    }
  };

  const allLines = [...lines, ...extraLines];

  return (
    <div
      className="rounded-xl overflow-hidden font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1c2128] dark:bg-[#010409]">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-[#8b949e] ml-2">{title}</span>
      </div>

      {/* Body */}
      <div className="bg-[#0d1117] dark:bg-[#010409] px-4 py-4 space-y-1">
        {allLines.map((line, i) => {
          const successColor = line.type === "success" && accentColor ? accentColor : undefined;

          return (
            <div
              key={i}
              className="terminal-line"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span
                style={{
                  color: successColor ?? colorVars[line.type],
                  fontStyle: line.type === "comment" ? "italic" : "normal",
                }}
              >
                {linePrefix(line.type)}{line.text}
              </span>
            </div>
          );
        })}

        {/* Interactive hint comment */}
        {interactiveCommand && (
          <div
            className="terminal-line"
            style={{ animationDelay: `${allLines.length * 50}ms` }}
          >
            <span style={{ color: "var(--terminal-comment)", fontStyle: "italic" }}>
              {/* try: {interactiveCommand.command} */}
              # try: {interactiveCommand.command}
            </span>
          </div>
        )}

        {/* Input prompt or static cursor */}
        <div
          className="terminal-line flex items-center"
          style={{ animationDelay: `${(allLines.length + (interactiveCommand ? 1 : 0)) * 50}ms` }}
        >
          <span style={{ color: "var(--terminal-prompt)" }}>$ </span>
          {interactiveCommand ? (
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 caret-cyan-400 text-[#e6edf3] font-mono text-sm p-0 m-0"
              style={{ color: "var(--terminal-cmd)" }}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
          ) : (
            <span
              className="terminal-cursor"
              style={{ color: "var(--terminal-prompt)" }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  );
}
