import { useContext } from 'react';
import ExchangeRatesTable from '../components/ExchangeRatesTable';
import LastDataUpdateIndicator from '../components/LastDataUpdateIndicator';
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
                        <h1 className="text-4xl font-bold text-base-content">Kurzy měn</h1>
                        <p className="text-base-content/70 mt-1">
                            Aktuální směnné kurzy české koruny
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-3 items-start sm:items-center w-full">
                        <div className="flex justify-end items-center max-md:flex-col gap-4">
                            Motiv:
                            <ThemeSelect />
                        </div>
                        <RefetchButton />
                        <LastDataUpdateIndicator />
                    </div>
                </div>

                <ExchangeRatesTable pagination={context.pagination} />

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
