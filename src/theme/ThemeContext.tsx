import React, { createContext, useContext, useState, useMemo } from 'react';
import { colors } from './colors';

interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  gold: string;
  goldLight: string;
  warmOrange: string;
  success: string;
  warning: string;
  error: string;
  bbBreath: string;
  bbAnaerobic: string;
  bbLengthen: string;
  bbAqueous: string;
  bbNutrition: string;
  bbCleanse: string;
  bbEnergize: string;
}

interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  c: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleDark: () => {},
  c: {} as ThemeColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const c = useMemo<ThemeColors>(() => ({
    background: isDark ? colors.darkBg : colors.background,
    surface: isDark ? colors.darkSurface : colors.surface,
    surfaceAlt: isDark ? '#253347' : colors.surfaceAlt,
    border: isDark ? colors.darkBorder : colors.border,
    textPrimary: isDark ? colors.darkText : colors.textPrimary,
    textSecondary: isDark ? '#94A3B8' : colors.textSecondary,
    textTertiary: isDark ? '#64748B' : colors.textTertiary,
    primary: colors.primary,
    primaryLight: colors.primaryLight,
    primaryDark: colors.primaryDark,
    gold: colors.gold,
    goldLight: colors.goldLight,
    warmOrange: colors.warmOrange,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    bbBreath: colors.bbBreath,
    bbAnaerobic: colors.bbAnaerobic,
    bbLengthen: colors.bbLengthen,
    bbAqueous: colors.bbAqueous,
    bbNutrition: colors.bbNutrition,
    bbCleanse: colors.bbCleanse,
    bbEnergize: colors.bbEnergize,
  }), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark: () => setIsDark(d => !d), c }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
