import { formatCurrency } from "../../utils/formatCurrency";

function TransactionAmount({amount, type}) {
    const isIncome = type === "INCOME";

    return(
        <span className={`font-semibold ${isIncome ? "text-green-600" : "text-red-600"}`}>
            {isIncome ? "+" : "-"}
            {formatCurrency(amount)}
        </span>
    )
}

export default TransactionAmount;