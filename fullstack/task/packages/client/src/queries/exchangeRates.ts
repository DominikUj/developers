import { gql } from '@apollo/client';

export const GET_PAGINATED_EXCHANGE_RATES = gql`
    query GetPaginatedExchangeRates($pagination: PaginationInput, $locale: Locale) {
        paginatedExchangeRates(pagination: $pagination, locale: $locale) {
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
