import { useState } from 'react';
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder';

const cs = {
    dashboardTitle: 'Kurzy měn',
    dashboardSubtitle: 'Aktuální směnné kurzy české koruny',
    lastUpdate: 'Poslední aktualizace z ČNB:',

    currency: 'Měna',
    code: 'Kód',
    amount: 'Množství',
    rate: 'Kurz',
    country: 'Země',

    theme: 'Motiv: ',
    refetch: 'Obnovit',
    noData: 'Žádná data k zobrazení',
    errorLoadingData: 'Chyba při načítání dat',
    loadingData: 'Načítání dat...',

    itemsPerPage: 'Položek na stránku:',
    recordsPerPage: 'Záznamů na stránku:',
    page: 'Stránka',
    previous: 'Předchozí',
    next: 'Další',
    showingRecords: 'Zobrazeno {count} z {total} záznamů',
    pageOf: 'Stránka {current} z {total}',

    themeDefault: 'Výchozí',
    themeRetro: 'Retro',
    themeCyberpunk: 'Cyberpunk',
    themeValentine: 'Valentýna',
    themeAqua: 'Aqua',

    loading: 'Načítání...',
    error: 'Chyba',
    success: 'Úspěch',
    cancel: 'Zrušit',
    confirm: 'Potvrdit',
    save: 'Uložit',
    close: 'Zavřít',

    czech: 'Čeština🇨🇿',
    english: 'Angličtina🇬🇧',
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
        dashboardTitle: 'Exchange Rates',
        dashboardSubtitle: 'Current exchange rates of Czech Crown',
        lastUpdate: 'Last update from CNB:',

        currency: 'Currency',
        code: 'Code',
        amount: 'Amount',
        rate: 'Rate',
        country: 'Country',

        theme: 'Theme: ',
        refetch: 'Refresh',
        noData: 'No data to display',
        errorLoadingData: 'Error loading data',
        loadingData: 'Loading data...',

        itemsPerPage: 'Items per page:',
        recordsPerPage: 'Records per page:',
        page: 'Page',
        previous: 'Previous',
        next: 'Next',
        showingRecords: 'Showing {count} of {total} records',
        pageOf: 'Page {current} of {total}',

        themeDefault: 'Default',
        themeRetro: 'Retro',
        themeCyberpunk: 'Cyberpunk',
        themeValentine: 'Valentine',
        themeAqua: 'Aqua',

        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        close: 'Close',
        czech: 'Czech🇨🇿',
        english: 'English🇬🇧',
    },
};

const LocalizationContext = genericHookContextBuilder(() => {
    const [locale, setLocale] = useState<Locale>(getLocaleFromLocalStorage());

    const handleLocaleChange = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const getLocalizedString = (
        key: TranslationKey,
        params?: Record<string, string | number>
    ): string => {
        let translation = translations[locale][key] || key;

        if (params) {
            Object.entries(params).forEach(([paramKey, value]) => {
                translation = translation.replace(`{${paramKey}}`, String(value));
            });
        }

        return translation;
    };

    return {
        locale,
        setLocale: handleLocaleChange,
        getLocalizedString,
    };
});

export default LocalizationContext;
