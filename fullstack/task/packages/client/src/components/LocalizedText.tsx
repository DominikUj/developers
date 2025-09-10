import { useContext } from 'react';
import LocalizationContext, { TranslationKey } from '../context/LocalizationContext';

const LocalizedText = ({ transKey }: { transKey: TranslationKey }) => {
    const context = useContext(LocalizationContext.Context);
    return <>{context.getLocalizedString(transKey)}</>;
};

export default LocalizedText;
