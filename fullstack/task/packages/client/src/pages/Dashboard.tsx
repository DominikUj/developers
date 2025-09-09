import React from 'react';
import { useExchangeRates } from '../hooks/useExchangeRates';

const Dashboard = () => {
    const { exchangeRates, loading, error } = useExchangeRates();

    if (loading) return <div className="loading loading-spinner loading-lg" />;
    if (error) return <div className="alert alert-error">Error: {error.message}</div>;

    const fetchedAt = exchangeRates.length > 0 ? new Date(exchangeRates[0].fetchedAt) : null;

    return (
        <div className="container mx-auto p-4">
            <div className="w-full flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Kurzy měn</h1>
                {fetchedAt && (
                    <div className="w-fit px-4 py-2 card bg-base-100 shadow-sm">
                        <p className="text-sm text-gray-600 flex items-center justify-center h-full">
                            Poslední aktualizace: {fetchedAt.toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
            <div className="overflow-x-auto card shadow-sm ">
                <table className="table table-zebra w-full ">
                    <thead>
                        <tr>
                            <th>Měna</th>
                            <th>Kód měny</th>
                            <th>Kurz</th>
                            <th>Částka</th>
                            <th>Země</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exchangeRates.map((rate) => (
                            <tr key={rate.id}>
                                <td>{rate.currency}</td>
                                <td>{rate.currencyCode}</td>
                                <td>{rate.rate}</td>
                                <td>{rate.amount}</td>
                                <td>{rate.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
