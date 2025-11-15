'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'anil-rongala-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeState(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    const nextTheme: Theme = theme ?? 'dark';
    const oppositeTheme: Theme = nextTheme === 'dark' ? 'light' : 'dark';

    root.classList.remove(oppositeTheme);
    root.classList.add(nextTheme);
    root.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }, [theme, mounted]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (value) => setThemeState(value),
      toggleTheme: () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light')),
      mounted
    }),
    [theme, mounted]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
