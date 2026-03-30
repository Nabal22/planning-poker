"use client";

import { createContext, useContext } from "react";
import { THEMES, type ThemeConfig, type ThemeId } from "@/lib/themes";

const ThemeContext = createContext<ThemeConfig>(THEMES.casino);

export function ThemeProvider({ themeId, children }: { themeId: ThemeId; children: React.ReactNode }) {
  const theme = THEMES[themeId] ?? THEMES.casino;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
