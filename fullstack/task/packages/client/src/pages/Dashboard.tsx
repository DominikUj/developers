import { useContext } from 'react';
import ExchangeRatesTable from '../components/ExchangeRatesTable';
import LanguageSelect from '../components/LanguageSelect';
import LastDataUpdateIndicator from '../components/LastDataUpdateIndicator';
import LocalizedText from '../components/LocalizedText';
import PaginationControls from '../components/PaginationControls';
import RefetchButton from '../components/RefetchButton';
import ThemeSelect from '../components/ThemeSelect';
import ExchangeRatesContext from '../context/ExchangeRatesContext';

const Dashboard = () => {
    const context = useContext(ExchangeRatesContext.Context);

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto p-6 max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-base-content">
                            <LocalizedText transKey="dashboardTitle" />
                        </h1>
                        <p className="text-base-content/70 mt-1">
                            <LocalizedText transKey="dashboardSubtitle" />
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center max-md:w-full">
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center max-md:w-full">
                            <div className="flex items-center gap-2 max-md:w-full max-md:flex">
                                <LocalizedText transKey="theme" />
                                <ThemeSelect />
                            </div>
                            <div className="flex items-center gap-2 max-md:w-full max-md:flex">
                                <LocalizedText transKey="language" />
                                <LanguageSelect />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto items-center max-md:w-full">
                            <RefetchButton />
                            <LastDataUpdateIndicator />
                        </div>
                    </div>
                </div>

                <ExchangeRatesTable />

                <PaginationControls
                    pagination={context.paginationInfo}
                    currentPagination={context.pagination}
                    onPageChange={context.setPagination}
                    loading={context.loading}
                />
            </div>
        </div>
    );
};

export default Dashboard;
