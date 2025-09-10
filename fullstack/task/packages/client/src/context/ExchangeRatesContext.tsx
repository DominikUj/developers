import { usePaginatedExchangeRates } from '../hooks/useExchangeRates';
import { usePagination } from '../hooks/usePagination';
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder';

const ExchangeRatesContext = genericHookContextBuilder(() => {
    const pagination = usePagination();
    const query = usePaginatedExchangeRates(pagination.pagination);

    return {
        ...query,
        pagination: pagination.pagination,
        setPagination: pagination.handleUpdatePagination,
        paginationInfo: query.pagination,
    };
});

export default ExchangeRatesContext;
