import { useFinance } from "../../hooks/useFinance";
import TransactionRow from "./TransactionRow";
import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

function TransactionTable({onEdit, onDelete,}) {
    const {transactions, loading} = useFinance();

    if(loading) {
        return <p>Loading Transactions...</p>
    }
    if (transactions.length === 0) {
        return (
            <EmptyState title="No Transactions yet" description="Add your first transaction to get started." />
        )
    }

    return(
        <Card>

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-semibold">
                    Transactions
                </h2>

                <span className="text-sm text-slate-500">
                    {transactions.length} Transactions
                </span>

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b bg-slate-50">
                            <th className="px-4 py-3 text-left">Title</th>
                            <th  className="px-4 py-3 text-left">Amount</th>
                            <th  className="px-4 py-3 text-left">Category</th>
                            <th  className="px-4 py-3 text-left">Type</th>
                            <th  className="px-4 py-3 text-left">Date</th>
                            <th  className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction) => (
                            <TransactionRow key={transaction.id} transaction={transaction} onEdit={onEdit} onDelete={onDelete}/>
                        ))}
                    </tbody>
                </table>
            </div>

        </Card>
        
    );
}

export default TransactionTable;