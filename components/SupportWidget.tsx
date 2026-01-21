"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

type StreamState = {
  isStreaming: boolean;
  isThinking: boolean;
};

const starterPrompts = [
  "Show your best verification project",
  "What is your AI-driven EDA direction?",
  "How do I navigate the site fast?",
  "How to contact you?",
];

const SUPPORT_EVENT = "open-support-widget";

export function SupportWidget() {
  const label =
    process.env.NEXT_PUBLIC_SUPPORT_LABEL || "Ask Anil — Live Support";
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [{ isStreaming, isThinking }, setStreamState] = useState<StreamState>({
    isStreaming: false,
    isThinking: false,
  });
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const initialInstructions = useMemo(
    () => [
      {
        role: "assistant" as const,
        content:
          "Hi! I can help with Anil’s projects, verification research, or quick site navigation. What can I help with?",
      },
    ],
    []
  );

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      return undefined;
    }
    const timeout = window.setTimeout(() => setIsVisible(false), 200);
    return () => window.clearTimeout(timeout);
  }, [open]);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreamState({ isStreaming: false, isThinking: false });
  }, []);

  const closePanel = useCallback(() => {
    stopStreaming();
    setOpen(false);
  }, [stopStreaming]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isToggleCombo =
        (event.ctrlKey || event.metaKey) && event.key === "/";
      if (isToggleCombo) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape" && open) {
        closePanel();
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(SUPPORT_EVENT, handleCustomOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(SUPPORT_EVENT, handleCustomOpen as EventListener);
    };
  }, [closePanel, open]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target as Node)) {
        closePanel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePanel, open]);

  const appendAssistantChunk = (index: number, chunk: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      const current = updated[index];
      if (!current || current.role !== "assistant") return prev;
      updated[index] = { ...current, content: current.content + chunk };
      return updated;
    });
  };

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isStreaming) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    const assistantIndex = nextMessages.length;
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setStreamState({ isStreaming: true, isThinking: true });

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to reach live support.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let receivedFirstChunk = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const lines = part.split("\n").filter(Boolean);
          const dataLines = lines
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.replace(/^data:\s?/, ""));
          if (!dataLines.length) continue;
          const data = dataLines.join("\n");
          if (data === "[DONE]") {
            stopStreaming();
            return;
          }
          if (!receivedFirstChunk) {
            receivedFirstChunk = true;
            setStreamState({ isStreaming: true, isThinking: false });
          }
          appendAssistantChunk(assistantIndex, data);
        }
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        appendAssistantChunk(
          assistantIndex,
          "\n\nSorry, I hit a snag. Please try again."
        );
      }
    } finally {
      setStreamState({ isStreaming: false, isThinking: false });
      abortRef.current = null;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
    void sendMessage(prompt);
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
  };

  const visibleMessages = messages.length ? messages : initialInstructions;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
        <div className="group relative">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open live support chat"
            aria-expanded={open}
            className="glass ring-accent flex h-12 w-12 items-center justify-center gap-2 rounded-full border border-border/60 bg-background/70 text-foreground shadow-lg transition-all duration-200 hover:border-[hsl(var(--border-accent))] hover:shadow-xl sm:w-auto sm:px-4"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--accent)/0.15)] text-[13px] font-semibold text-foreground">
              AI
            </span>
            <span className="hidden text-sm font-semibold sm:inline">
              Ask Anil
            </span>
          </button>
          <div className="pointer-events-none absolute bottom-full right-0 mb-3 flex translate-y-1 scale-95 items-center gap-2 rounded-xl border border-border/70 bg-background/75 px-3 py-2 text-xs text-foreground/80 opacity-0 shadow-sm backdrop-blur transition duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100">
            <span>Ask Anil — Live Support</span>
            <span className="rounded-md border border-border/60 bg-background/70 px-1.5 py-0.5 text-[10px] text-foreground/70">
              Ctrl+/
            </span>
          </div>
        </div>
      </div>

      {isVisible && (
        <div className="fixed bottom-5 left-4 right-4 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[420px]">
          <div
            ref={panelRef}
            className={`glass ring-accent relative w-full rounded-2xl border border-border/70 bg-background/75 p-5 text-foreground shadow-2xl backdrop-blur-xl transition duration-200 ease-out ${
              open
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-[0.98] opacity-0"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={label}
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.3),_transparent_65%)] opacity-60" />
            <header className="relative z-10 flex items-start justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <h2 className="text-lg font-semibold">{label}</h2>
                <p className="text-xs text-muted-foreground">
                  Projects • Research • Verification • Navigation
                </p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                aria-label="Close live support"
                className="ring-accent inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground/70 transition hover:border-[hsl(var(--border-accent))] hover:text-foreground"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </header>

            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="ring-accent rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground transition hover:border-[hsl(var(--border-accent))] hover:text-foreground"
                  onClick={() => handleSuggestion(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="relative z-10 mt-4 h-[50vh] space-y-4 overflow-y-auto rounded-2xl border border-border/60 bg-background/60 p-4 sm:h-[360px] sm:p-5">
              {visibleMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className="flex flex-col gap-3"
                >
                  <div
                    className={`w-fit max-w-[85%] rounded-2xl border px-4 py-2 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "ml-auto border-[hsl(var(--border-accent)/0.35)] bg-[hsl(var(--accent)/0.12)] text-foreground"
                        : "border-border/60 bg-background/70 text-foreground/90"
                    }`}
                  >
                    {message.content}
                    {isThinking &&
                      message.role === "assistant" &&
                      !message.content && (
                        <span className="italic text-muted-foreground">
                          Thinking…
                        </span>
                      )}
                  </div>
                  {index < visibleMessages.length - 1 && (
                    <div className="h-px w-full bg-border/50" aria-hidden />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 mt-4 space-y-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage(input);
                  }
                }}
                placeholder="Ask about projects, research, or how to reach Anil..."
                aria-label="Live support message"
                className="ring-accent min-h-[72px] w-full resize-none rounded-xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-[hsl(var(--border-accent))]"
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  aria-label="Send message"
                  className="ring-accent rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-[hsl(var(--accent))] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
                {isStreaming && (
                  <button
                    type="button"
                    onClick={stopStreaming}
                    aria-label="Stop streaming response"
                    className="ring-accent rounded-full border border-border/70 px-3 py-2 text-xs text-foreground/80 transition hover:border-[hsl(var(--border-accent))] hover:text-foreground"
                  >
                    Stop
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearChat}
                  aria-label="Clear conversation"
                  className="ring-accent rounded-full border border-border/60 px-3 py-2 text-xs text-muted-foreground transition hover:border-[hsl(var(--border-accent))] hover:text-foreground"
                >
                  Clear
                </button>
                <span className="ml-auto text-xs text-muted-foreground">
                  Responses are AI-generated; for official contact use the
                  Contact page.
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
