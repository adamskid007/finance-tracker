import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import TransactionAmount from "./TransactionAmount";
import TransactionBadge from "./TransactionBadge";
import TransactionActions from "./TransactionActions";

function TransactionRow({transaction, onEdit,onDelete,}) {
    return (
        
        <tr className="border-b hover:bg-slate-50 transitions-colors">
            <td className="px-2 py-4">{transaction.title}</td>
            <td className="px-2 py-4"><TransactionAmount amount = {transaction.amount} type={transaction.type} /></td>
            <td className="px-2 py-4"><TransactionBadge category={transaction.category} /></td>
            <td className="px-2 py-4">{transaction.type}</td>
            <td className="px-2 py-4">{formatDate(transaction.date)}</td>
            <td className="px-2 py-4">
                <TransactionActions
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
                />
            </td>
        </tr>
    );
}

export default TransactionRow;