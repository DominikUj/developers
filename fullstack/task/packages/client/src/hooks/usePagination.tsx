import { useEffect, useState } from 'react';
import { PaginationInput } from './useExchangeRates';

const parsePaginationFromUrl = (): PaginationInput => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const limit = params.get('limit') ?? 20;
    const offset = params.get('offset') ?? 0;
    return {
        limit: Number(limit),
        offset: Number(offset),
    };
};

export const usePagination = () => {
    const [pagination, setPagination] = useState<PaginationInput>(parsePaginationFromUrl());

    const handleUpdatePagination = (newPagination: PaginationInput) => {
        const params = new URLSearchParams(window.location.search);
        if (newPagination.limit !== undefined) {
            params.set('limit', String(newPagination.limit));
        }
        if (newPagination.offset !== undefined) {
            params.set('offset', String(newPagination.offset));
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newUrl);
        setPagination(newPagination);
    };

    return {
        pagination,
        handleUpdatePagination,
    };
};
