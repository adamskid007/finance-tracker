import { useEffect, useState } from "react";
import { useFinance } from "../hooks/useFinance";
import Spinner from "../components/common/Spinner";
import SummaryGrid from "../components/dashboard/SummaryGrid";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionTable from "../components/transactions/TransactionTable";
import ConfirmDialog from "../components/common/ConfirmDialog";
import PageContainer from "../components/common/PageContainer";
import TransactionFilters from "../components/filters/TransactionFilters";
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/common/Pagination";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";

function Dashboard() {
    const {fetchTransactions, fetchSummary} = useFinance();

    const [page, setPage] = useState(1);
    const limit = 10;

    const {deleteTransaction,
        pagination
    } = useFinance();

    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const {user,logout} = useAuth();

    const handleDelete = async () => {
        if(!transactionToDelete) return;
        await deleteTransaction(transactionToDelete.id);
        setConfirmOpen(false);
        setTransactionToDelete(null);
    }

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const [filters, setFilters] = useState({
        search: "",
        category: "",
        type: "",
        startDate: "",
        endDate: "",
        sort: "date",
        order: "desc",
    })

    const debouncedSearch = useDebounce(filters.search, 500);



    useEffect(() => {
        fetchTransactions({...filters, search:debouncedSearch,
            page,
            limit,
        });
    }, [debouncedSearch,
        filters.category,
        filters.type,
        filters.sort,
        filters.startDate,
        filters.endDate,
        filters.order,
        page,
    ]);

    useEffect(() => {
        fetchTransactions();
        fetchSummary();
    }, []);
    console.log(pagination);
    const { loading } = useFinance();

    if (loading) {
        return (
            <PageContainer>
                <div className="flex justify-center py-20">
                    <Spinner />
                </div>
            </PageContainer>
        );
    }
    return(
        <PageContainer>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Personal Finance Tracker
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Welcome back, <span className="font-semibold">{user?.name}</span>
                    </p>
                </div>

                <Button
                    variant="danger"
                    className="w-auto px-6"
                    onClick={logout}
                >
                    Logout
                </Button>
            </header>
            <SummaryGrid />
            <div className="mt-8">

                <TransactionFilters filters={filters} setFilters={setFilters} setPage={setPage}/>
            <TransactionForm  transaction={selectedTransaction}
            clearSelection={() => setSelectedTransaction(null)}/>
            </div>
            <div className="mt-8">
                <TransactionTable onEdit={setSelectedTransaction}
                onDelete={(transaction)=>{
                setTransactionToDelete(transaction);
                setConfirmOpen(true);
            }}/>
            </div>


            <ConfirmDialog open={confirmOpen}
            title="Delete Transaction"
            message="Are you sure you want to delete this transaction?"
            onConfirm={handleDelete}
            onCancel={() => {
                setConfirmOpen(false);
                setTransactionToDelete(null);
            }} />
            <Pagination page={page} totalPages={pagination?.totalPages || 1} onPageChange={setPage} />
        </PageContainer>
    );
}

export default Dashboard;