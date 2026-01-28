"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const CLOSE_EVENT = "close-overlays";

const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    target.isContentEditable
  );
};

export function KeyboardShortcuts() {
  const router = useRouter();
  const sequenceRef = useRef<string[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const resetSequence = () => {
      sequenceRef.current = [];
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;

      if (event.key === "/") {
        event.preventDefault();
        window.dispatchEvent(new CustomEvent("open-support-widget"));
        return;
      }

      if (event.key === "Escape") {
        window.dispatchEvent(new CustomEvent(CLOSE_EVENT));
        return;
      }

      sequenceRef.current.push(event.key.toLowerCase());
      if (sequenceRef.current.length === 1 && event.key.toLowerCase() === "g") {
        timerRef.current = window.setTimeout(resetSequence, 800);
        return;
      }

      if (sequenceRef.current.length === 2) {
        const [, nextKey] = sequenceRef.current;
        if (nextKey === "p") router.push("/projects");
        if (nextKey === "h") router.push("/");
        if (nextKey === "c") router.push("/contact");
        resetSequence();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      resetSequence();
    };
  }, [router]);

  return null;
}
