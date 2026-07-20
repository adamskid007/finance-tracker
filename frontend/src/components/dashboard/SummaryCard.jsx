import { formatCurrency } from "../../utils/formatCurrency";
import Card from "../common/Card";
import { Wallet,ArrowUpCircle,ArrowDownCircle, Receipt } from "lucide-react";

function SummaryCard({title, amount, isCurrency=true, variant = "primary", icon:Icon,}) {
    const variants = {
        primary: {
            number: "text-emerald-600",
            iconBg: "bg-emerald-100",
        },

        success: {
            number: "text-green-600",
            iconBg: "bg-green-100",
        },
        
        danger: {
            number: "text-red-600",
            iconBg: "bg-red-100",
        },

        neutral: {
            number: "text-slate-800",
            iconBg: "bg-slate-100",
        },
    };
    return (
        <Card>
            <Icon size={24}  className={variants[variant].number} />
            <h3 className="text-sm text-slate-500 font-medium text-center">{title}</h3>

            <h2 className={`text-3xl font-bold mt-3 text-center ${variants[variant].number}`}>{isCurrency ? formatCurrency(amount) : amount}</h2>
        </Card>
    );
}

export default SummaryCard;