import { useExchangeRates } from '../hooks/useExchangeRates';
import LocalizedText from './LocalizedText';

const LastDataUpdateIndicator = () => {
    const { fetchedAt } = useExchangeRates();

    if (!fetchedAt) {
        return null;
    }

    return (
        <div className="card bg-base-100 shadow-sm max-sm:w-full md:col-end-3">
            <div className="card-body p-3">
                <p className="text-base text-base-content/70">
                    <span className="font-semibold text-xl">
                        <LocalizedText transKey="lastUpdate" />
                    </span>
                    <br />
                    {new Date(fetchedAt).toLocaleString('cs-CZ')}
                </p>
            </div>
        </div>
    );
};

export default LastDataUpdateIndicator;
