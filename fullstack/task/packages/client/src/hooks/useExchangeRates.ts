import { useQuery } from '@apollo/client';
import { GET_EXCHANGE_RATES } from '../queries/exchangeRates';

export interface ExchangeRate {
    id: string;
    rate: number;
    fetchedAt: Date;
    currencyCode: string;
    currency: string;
    country: string;
    amount: number;
}

export const useExchangeRates = () => {
    const { data, loading, error, refetch } = useQuery<{ exchangeRates: ExchangeRate[] }>(
        GET_EXCHANGE_RATES
    );

    return {
        exchangeRates: data?.exchangeRates || [],
        loading,
        error,
        refetch,
        fetchedAt: data?.exchangeRates[0].fetchedAt || null,
    };
};
