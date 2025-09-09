import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const THEMES = [
    {
        label: 'Default',
        value: 'default',
    },
    {
        label: 'Retro',
        value: 'retro',
    },
    {
        label: 'Cyberpunk',
        value: 'cyberpunk',
    },
    {
        label: 'Valentine',
        value: 'valentine',
    },
    {
        label: 'Aqua',
        value: 'aqua',
    },
];

const ThemeSelect = () => {
    const context = useContext(ThemeContext.Context);

    return (
        <div className="dropdown w-full flex md:justify-end">
            <div tabIndex={0} role="button" className="btn m-1 max-sm:w-full">
                {context.theme.charAt(0).toUpperCase() + context.theme.slice(1)}
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl md:mt-12 max-sm:w-full"
            >
                {THEMES.map((theme) => (
                    <li key={theme.value}>
                        <input
                            onChange={() => context.setTheme(theme.value)}
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                            aria-label={theme.label}
                            value={theme.value}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThemeSelect;
