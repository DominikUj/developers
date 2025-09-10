import { useState } from 'react';
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder';

const cs = {
    dashboardTitle: 'Kurzy měn',
    lastUpdate: 'Poslední aktualizace z ČNB:',
    dashboardSubtitle: 'Aktuální směnné kurzy české koruny',
    currency: 'Měna',
    code: 'Kód',
    amount: 'Množství',
    rate: 'Kurz',
    theme: 'Motiv: ',
    noData: 'Žádná data k zobrazení',
    refetch: 'Obnovit',
    errorLoadingData: 'Chyba při načítání dat',
    loadingData: 'Načítání dat...',
    itemsPerPage: 'Položek na stránku:',
    page: 'Stránka',
} as const;

type Translations = typeof cs;
export type TranslationKey = keyof Translations;

// Tbh using i18n library would be better, but since this is a small project, I will use this simple solution
export type Locale = 'cs' | 'en';

export const getLocaleFromLocalStorage = (): Locale => {
    const locale = localStorage.getItem('locale');
    if (locale === 'cs' || locale === 'en') {
        return locale;
    }
    return navigator.language.startsWith('en') ? 'en' : 'cs';
};

const translations: Record<Locale, Record<keyof Translations, string>> = {
    cs,
    en: {
        dashboardTitle: 'Exchange rates',
        lastUpdate: 'Last update from CNB:',
        dashboardSubtitle: 'Current exchange rates of Czech crown',
        currency: 'Currency',
        code: 'Code',
        amount: 'Amount',
        rate: 'Rate',
        theme: 'Theme: ',
        noData: 'No data to display',
        errorLoadingData: 'Error while loading data',
        loadingData: 'Loading data...',
        itemsPerPage: 'Items per page:',
        page: 'Page',
        refetch: 'Refetch',
    },
};

const LocalizationContext = genericHookContextBuilder(() => {
    const [locale, setLocale] = useState<Locale>(getLocaleFromLocalStorage());

    const handleLocaleChange = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const getLocalizedString = (key: TranslationKey): string => {
        return translations[locale][key] || key;
    };

    return {
        locale,
        setLocale: handleLocaleChange,
        getLocalizedString,
    };
});

export default LocalizationContext;
