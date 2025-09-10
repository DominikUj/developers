import { useContext } from 'react';
import ExchangeRatesContext from '../context/ExchangeRatesContext';
import LocalizedText from './LocalizedText';

const ExchangeRatesTable = () => {
    const context = useContext(ExchangeRatesContext.Context);

    if (context.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    if (context.exchangeRates.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-base-content/40 text-lg">
                    <LocalizedText transKey="noData" />
                </div>
            </div>
        );
    }

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body p-0">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th className="font-bold text-base-content">
                                    <LocalizedText transKey="currency" />
                                </th>
                                <th className="font-bold text-base-content">
                                    <LocalizedText transKey="code" />
                                </th>
                                <th className="font-bold text-base-content text-right">
                                    <LocalizedText transKey="rate" />
                                </th>
                                <th className="font-bold text-base-content text-right">
                                    <LocalizedText transKey="amount" />
                                </th>
                                <th className="font-bold text-base-content">
                                    <LocalizedText transKey="country" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.exchangeRates.map((rate) => (
                                <tr key={rate.id} className="hover">
                                    <td className="font-medium">{rate.currency}</td>
                                    <td>
                                        <span className="badge badge-outline badge-sm">
                                            {rate.currencyCode}
                                        </span>
                                    </td>
                                    <td className="text-right font-mono">
                                        <span className="text-lg font-semibold">
                                            {rate.rate} CZK
                                        </span>
                                    </td>
                                    <td className="text-right font-mono">{rate.amount}</td>
                                    <td className="text-base-content/70">{rate.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExchangeRatesTable;
