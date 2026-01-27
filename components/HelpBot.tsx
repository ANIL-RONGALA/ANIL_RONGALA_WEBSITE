"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

type StreamState = {
  isStreaming: boolean;
  isThinking: boolean;
};

const starterPrompts = [
  "Show me your best verification project",
  "What is AI-driven EDA work you’re targeting?",
  "How do I navigate the site quickly?",
  "How can I contact you?",
];

export function HelpBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [{ isStreaming, isThinking }, setStreamState] = useState<StreamState>({
    isStreaming: false,
    isThinking: false,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isToggleCombo =
        (event.ctrlKey || event.metaKey) && event.key === "/";
      if (isToggleCombo) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape" && open) {
        stopStreaming();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, stopStreaming]);

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to reach help bot.");
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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-accent"
      >
        Ask
        <span className="rounded border border-border/60 bg-background/60 px-2 py-0.5 text-xs text-muted-foreground">
          Ctrl+/
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 dark:bg-background/80"
          onClick={() => {
            stopStreaming();
            setOpen(false);
          }}
        >
          <div
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 w-full max-w-2xl rounded-2xl border border-border/60 bg-background/80 p-6 text-foreground shadow-2xl backdrop-blur-xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Live Help Bot"
          >
            <header className="space-y-1 border-b border-border/60 pb-4">
              <h2 className="text-2xl font-semibold text-foreground">Ask Anil</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Questions about projects, research, verification, site navigation.
              </p>
            </header>

            <div className="mt-4 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground hover:text-accent"
                  onClick={() => handleSuggestion(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-4 max-h-72 space-y-3 overflow-y-auto rounded-xl border border-border/60 bg-background/60 p-4">
              {messages.length === 0 && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Start a conversation to get tailored help about Anil’s work and
                  the site.
                </p>
              )}
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-xl border px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "ml-auto w-fit max-w-[80%] border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.12)] text-foreground"
                      : "w-fit max-w-[85%] border-border/60 bg-background/70 text-foreground"
                  }`}
                >
                  {message.content}
                  {isThinking && message.role === "assistant" && !message.content && (
                    <span className="italic text-muted-foreground">Thinking…</span>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-4 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, research, or how to reach me..."
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 flex-1 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition duration-200 focus:border-[hsl(var(--accent)/0.5)]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition duration-200 hover:brightness-105 hover:neon-glow disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>
              {isStreaming && (
                <button
                  type="button"
                  onClick={stopStreaming}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-full border border-border/70 px-3 py-2 text-xs text-foreground transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground hover:text-accent"
                >
                  Stop
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
