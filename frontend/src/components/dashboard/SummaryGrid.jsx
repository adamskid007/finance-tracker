import { ArrowDownCircle, ArrowUpCircle, Receipt, Wallet } from "lucide-react";
import {useFinance} from "../../hooks/useFinance";
import SummaryCard from "./SummaryCard";

function SummaryGrid() {
    const {summary} = useFinance();

    if (!summary) {
        return <p>Loading summary...</p>;
    }

    return (
        <div className="grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-4
        mb-8">
            <SummaryCard title="Balance" amount={summary.balance} variant="primary" icon={Wallet}/>
            <SummaryCard title="Income" amount={summary.totalIncome} variant="success" icon={ArrowUpCircle}/>
            <SummaryCard title="Expenses" amount={summary.totalExpense} variant="danger" icon={ArrowDownCircle}/>
            <SummaryCard title="Transactions" amount={summary.transactionCount} isCurrency={false} variant="neutral" icon={Receipt}/>
           
        </div>
    );
}

export default SummaryGrid;