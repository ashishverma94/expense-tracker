import {
  useState,
  ReactNode,
  useContext,
  useCallback,
  createContext,
} from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  resolved: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme_preference";

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) || "light";
  });

  const setMode = useCallback((newMode: ThemeMode) => {
    localStorage.setItem(STORAGE_KEY, newMode);
    setModeState(newMode);
    applyTheme(newMode);
  }, []);

  useState(() => {
    applyTheme(mode);
  });

  return (
    <ThemeContext.Provider
      value={{
        mode,
        resolved: mode,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
