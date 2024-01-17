import React, { useState } from "react";
import ThemeContext from "./ThemeContext";
import lightTheme from "../styles/lightTheme";
import darkTheme from "../styles/darkTheme";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Add this line

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      setIsDarkTheme(true); // Add this line
    } else {
      setTheme(lightTheme);
      setIsDarkTheme(false); // Add this line
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
