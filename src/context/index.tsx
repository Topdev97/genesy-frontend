import { useState, createContext, useContext } from "react";

interface IThemeContext {
  theme: string;
  setTheme: Function;
}

const ThemeContext = createContext<IThemeContext>({
  theme: "",
  setTheme: Function,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
