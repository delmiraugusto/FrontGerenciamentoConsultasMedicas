
import React, { createContext, useState } from 'react'

export const ThemeContext = createContext([]);
export default function ThemeContextProvider({ children }) {

    const [isDarkMode, setIsDarkMode] = useState(false);

    function switchTheme() {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}