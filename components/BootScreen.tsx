"use client";
import { useEffect, useState } from "react";

export default function BootScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-background">
      <h1 className="animate-pulse text-4xl font-semibold tracking-tight text-foreground">
        INITIALIZING ANIL.OS…
      </h1>
    </div>
  );
}
