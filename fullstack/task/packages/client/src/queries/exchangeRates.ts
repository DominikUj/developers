import { gql } from '@apollo/client';

export const GET_EXCHANGE_RATES = gql`
    query GetExchangeRates {
        exchangeRates {
            id
            currency
            rate
            currencyCode
            amount
            country
            fetchedAt
        }
    }
`;

export const GET_PAGINATED_EXCHANGE_RATES = gql`
    query GetPaginatedExchangeRates($pagination: PaginationInput) {
        paginatedExchangeRates(pagination: $pagination) {
            items {
                id
                currency
                rate
                currencyCode
                amount
                country
                fetchedAt
            }
            pagination {
                totalCount
                count
                offset
                limit
                hasMore
            }
        }
    }
`;
