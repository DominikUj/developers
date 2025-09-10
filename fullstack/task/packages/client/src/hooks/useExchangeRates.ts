import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { GET_EXCHANGE_RATES, GET_PAGINATED_EXCHANGE_RATES } from '../queries/exchangeRates';
import LocalizationContext from '../context/LocalizationContext';

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

export const usePaginatedExchangeRates = (paginationInput?: PaginationInput) => {
    const localization = useContext(LocalizationContext.Context);

    const { data, loading, error, refetch } = useQuery<{
        paginatedExchangeRates: {
            items: ExchangeRate[];
            pagination: PaginationInfo;
        };
    }>(GET_PAGINATED_EXCHANGE_RATES, {
        variables: { pagination: paginationInput, locale: localization.locale.toUpperCase() },
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
