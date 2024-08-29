import { useState } from 'react';

export interface Theme {
  title: string,
  data: {
    [key: string]: string
  }
}
const applyTheme = (theme: Theme) => {
  const {data} = theme
  Object.keys(data).forEach(key => {
    document.documentElement.style.setProperty(key, data[key]);
  });
}

const defaultTheme = {
  title: 'ryujinscalse',
  data: {
    '--bg-color': '#081426',
    '--main-color': '#f17754',
    '--caret-color': '#ef6d49',
    '--sub-color': '#ffbc90',
    '--sub-alt-color': '#040e1d',
    '--text-color': '#ffe4bc',
    '--error-color': '#ca4754',
    '--error-extra-color': '#7e2a33'
  }
};
export const THEME = 'theme';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    try {
      const theme = window.localStorage.getItem(THEME);
      if (theme) {
        applyTheme(JSON.parse(theme))
        return JSON.parse(theme);
      } else {
        window.localStorage.setItem(THEME, JSON.stringify(defaultTheme))
        applyTheme(defaultTheme)
        return defaultTheme;
      }
    } catch (error) {
      console.error('Error retrieving or parsing theme:', error);
      return defaultTheme;
    }
  });

  const updateTheme = (theme: Theme) => {
    const { data } = theme
    Object.keys(data).forEach((key) => {
      document.documentElement.style.setProperty(key, data[key]);
    });
    setTheme(theme);
    window.localStorage.setItem(THEME, JSON.stringify(theme));
  };
  return [theme, updateTheme];
};

export default useTheme;
