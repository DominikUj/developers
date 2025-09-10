import React, { useContext } from 'react';
import LocalizationContext from '../context/LocalizationContext';

const LanguageSelect = () => {
    const context = useContext(LocalizationContext.Context);

    return (
        <div className="dropdown max-md:w-full flex md:justify-end items-center">
            <div tabIndex={0} role="button" className="btn m-1 max-sm:w-full">
                {context.locale === 'en'
                    ? context.getLocalizedString('english')
                    : context.getLocalizedString('czech')}
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
                className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl md:mt-52 max-sm:w-full"
            >
                <li key="en">
                    <input
                        onChange={() => context.setLocale('en')}
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm  btn-ghost justify-start"
                        aria-label={context.getLocalizedString('english')}
                        value={context.locale}
                    />
                </li>
                <li key="cs">
                    <input
                        onChange={() => context.setLocale('cs')}
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller w-full btn btn-sm  btn-ghost justify-start"
                        aria-label={context.getLocalizedString('czech')}
                        value={context.locale}
                    />
                </li>
            </ul>
        </div>
    );
};

export default LanguageSelect;
