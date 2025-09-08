import { useQuery } from '@apollo/client';
import { GET_EXCHANGE_RATES } from '../queries/exchangeRates';

export interface ExchangeRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: string;
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
  };
};