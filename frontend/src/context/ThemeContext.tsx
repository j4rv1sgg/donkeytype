import { createContext } from 'react';
import useTheme, { Theme } from '@/hooks/UseTheme';

type UpdateThemeFunction = (theme: Theme) => void;

type ThemeContextType = [Theme, UpdateThemeFunction];

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, updateTheme] = useTheme();
  return (
    <ThemeContext.Provider value={[theme, updateTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
