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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur transition hover:border-white/30 hover:bg-white/20"
      >
        Ask Anil
        <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-white/70">
          Ctrl+/
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
          <div
            ref={panelRef}
            className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-950/90 p-5 text-white shadow-[0_0_30px_rgba(56,189,248,0.25)] backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={label}
          >
            <header className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-semibold">{label}</h2>
                <p className="text-sm text-white/70">
                  Questions about projects, research, verification, and
                  navigation.
                </p>
              </div>
              <button
                type="button"
                onClick={closePanel}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Close
              </button>
            </header>

            <div className="mt-4 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-white/30 hover:bg-white/10"
                  onClick={() => handleSuggestion(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-4 max-h-72 space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-4">
              {visibleMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "ml-auto w-fit max-w-[80%] bg-sky-500/20 text-white"
                      : "w-fit max-w-[85%] bg-white/10 text-white/90"
                  }`}
                >
                  {message.content}
                  {isThinking && message.role === "assistant" && !message.content && (
                    <span className="italic text-white/70">Thinking…</span>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
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
                className="min-h-[80px] w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-sky-400"
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
                {isStreaming && (
                  <button
                    type="button"
                    onClick={stopStreaming}
                    className="rounded-full border border-white/20 px-3 py-2 text-xs text-white/80 transition hover:border-white/40"
                  >
                    Stop
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearChat}
                  className="rounded-full border border-white/20 px-3 py-2 text-xs text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  Clear
                </button>
                <span className="ml-auto text-xs text-white/50">
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
