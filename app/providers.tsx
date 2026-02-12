"use client";

import { defaultPerf } from "@/lib/perf";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

type PerfContextValue = {
  effectsEnabled: boolean;
  setEffectsEnabled: (enabled: boolean) => void;
};

const PerfContext = createContext<PerfContextValue | null>(null);

export function usePerf() {
  const context = useContext(PerfContext);
  if (!context) {
    throw new Error("usePerf must be used within Providers");
  }
  return context;
}

export function Providers({ children }: { children: ReactNode }) {
  const [effectsEnabled, setEffectsEnabled] = useState(defaultPerf.effects);

  useEffect(() => {
    const stored = window.localStorage.getItem("effectsEnabled");
    if (stored === "true" || stored === "false") {
      setEffectsEnabled(stored === "true");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("effectsEnabled", String(effectsEnabled));
    document.body.classList.toggle("perf-mode", !effectsEnabled);
  }, [effectsEnabled]);

  const perfValue = useMemo(
    () => ({ effectsEnabled, setEffectsEnabled }),
    [effectsEnabled]
  );

  return (
    <PerfContext.Provider value={perfValue}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <MotionConfig reducedMotion={effectsEnabled ? "never" : "always"}>
          {children}
        </MotionConfig>
      </ThemeProvider>
    </PerfContext.Provider>
  );
}
