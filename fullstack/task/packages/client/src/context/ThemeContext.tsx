import { useEffect, useState } from 'react';
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder';

const ThemeContext = genericHookContextBuilder(() => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'Default');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, []);

    const handleThemeChange = (theme: string) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        setTheme(theme);
    };

    return {
        theme,
        setTheme: handleThemeChange,
    };
});

export default ThemeContext;
