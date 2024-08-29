import { createContext } from "react";
import { Theme } from "@/hooks/UseTheme";

type UpdateThemeFunction = (theme: Theme) => void;

type ThemeContextType = [Theme, UpdateThemeFunction];

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);