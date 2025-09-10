import { useContext } from 'react';
import { PaginationInfo, PaginationInput } from '../hooks/useExchangeRates';
import LocalizationContext from '../context/LocalizationContext';
import LocalizedText from './LocalizedText';

interface PaginationControlsProps {
    pagination: PaginationInfo | undefined;
    currentPagination: PaginationInput;
    onPageChange: (newPagination: PaginationInput) => void;
    loading?: boolean;
}

const PaginationControls = ({
    pagination,
    currentPagination,
    onPageChange,
    loading = false,
}: PaginationControlsProps) => {
    const { getLocalizedString } = useContext(LocalizationContext.Context);

    if (!pagination) return null;

    const currentPage =
        Math.floor((currentPagination.offset || 0) / (currentPagination.limit || 10)) + 1;
    const totalPages = Math.ceil(pagination.totalCount / (currentPagination.limit || 10));
    const limit = currentPagination.limit || 10;

    const goToPage = (page: number) => {
        const newOffset = (page - 1) * limit;
        onPageChange({
            ...currentPagination,
            offset: newOffset,
        });
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    const changePageSize = (newLimit: number) => {
        onPageChange({
            ...currentPagination,
            limit: newLimit,
            offset: 0,
        });
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 bg-base-100 rounded-lg">
            <div className="text-sm text-base-content/70">
                {getLocalizedString('showingRecords', {
                    count: pagination.count.toString(),
                    total: pagination.totalCount.toString(),
                })}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-base-content/70">
                        <LocalizedText transKey="recordsPerPage" />
                    </span>
                    <select
                        className="select select-sm select-bordered"
                        value={limit}
                        onChange={(e) => changePageSize(Number(e.target.value))}
                        disabled={loading}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={goToPrevious}
                        disabled={currentPage <= 1 || loading}
                    >
                        <LocalizedText transKey="previous" />
                    </button>

                    <span className="text-sm px-3 py-2">
                        {getLocalizedString('pageOf', {
                            current: currentPage.toString(),
                            total: totalPages.toString(),
                        })}
                    </span>

                    <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        onClick={goToNext}
                        disabled={currentPage >= totalPages || loading}
                    >
                        <LocalizedText transKey="next" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaginationControls;
