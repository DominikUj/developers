const localeCodeMap = {
    en: 'EN',
    cs: 'CS',
} as const;

export type InternalLocale = keyof typeof localeCodeMap;
export type CNBLocale = typeof localeCodeMap[InternalLocale];

export const mapInternalToCNB = (internalLocale: InternalLocale): CNBLocale => {
    return localeCodeMap[internalLocale];
};

export const mapCNBToInternal = (cnbLocale: CNBLocale) => {
    const entry = Object.entries(localeCodeMap).find(([, value]) => value === cnbLocale);
    if (!entry) {
        throw new Error(`Unsupported CNB locale: ${cnbLocale}`);
    }
    return entry[0] as InternalLocale;
};
