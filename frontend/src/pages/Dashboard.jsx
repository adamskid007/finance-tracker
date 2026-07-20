import { useEffect, useState } from "react";
import { useFinance } from "../hooks/useFinance";

import SummaryGrid from "../components/dashboard/SummaryGrid";
import TransactionForm from "../components/transactions/TransactionForm";
import TransactionTable from "../components/transactions/TransactionTable";
import ConfirmDialog from "../components/common/ConfirmDialog";
import PageContainer from "../components/common/PageContainer";
import TransactionFilters from "../components/filters/TransactionFilters";
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/common/Pagination";

function Dashboard() {
    const {fetchTransactions, fetchSummary} = useFinance();

    const [page, setPage] = useState(1);
    const limit = 10;

    const {deleteTransaction,
        pagination
    } = useFinance();

    const [selectedTransaction, setSelectedTransaction] = useState(null);

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
    return(
        <PageContainer>
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-slate-900">
                    Personal Finance Tracker
                </h1>

                <p className="text-slate-500 mt-2">
                    Manage your income and expenses effortlessly.
                </p>
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