import { useQuery } from '@apollo/client';
import { GET_EXCHANGE_RATES, GET_PAGINATED_EXCHANGE_RATES } from '../queries/exchangeRates';

export type ExchangeRate = {
    id: string;
    rate: number;
    fetchedAt: Date;
    currencyCode: string;
    currency: string;
    country: string;
    amount: number;
};

export type PaginationInfo = {
    totalCount: number;
    count: number;
    offset: number;
    limit: number;
    hasMore: boolean;
};

export type PaginationInput = {
    limit?: number;
    offset?: number;
};

export const useExchangeRates = () => {
    const { data, loading, error, refetch } = useQuery<{ exchangeRates: ExchangeRate[] }>(
        GET_EXCHANGE_RATES
    );

    return {
        exchangeRates: data?.exchangeRates || [],
        loading,
        error,
        refetch,
        fetchedAt: data?.exchangeRates[0]?.fetchedAt || null,
    };
};

export const usePaginatedExchangeRates = (paginationInput?: PaginationInput) => {
    const { data, loading, error, refetch } = useQuery<{
        paginatedExchangeRates: {
            items: ExchangeRate[];
            pagination: PaginationInfo;
        };
    }>(GET_PAGINATED_EXCHANGE_RATES, {
        variables: { pagination: paginationInput },
    });

    return {
        exchangeRates: data?.paginatedExchangeRates.items || [],
        pagination: data?.paginatedExchangeRates.pagination,
        loading,
        error,
        refetch,
        hasMore: data?.paginatedExchangeRates.pagination.hasMore || false,
        fetchedAt: data?.paginatedExchangeRates.items[0]?.fetchedAt || null,
    };
};
