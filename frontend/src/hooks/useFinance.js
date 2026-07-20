import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

export function useFinance() {
    const context = useContext(FinanceContext);

    if(!context) {
        throw new Error("useFinace must be used within a FinanceProvider");
    }
    return context;
}