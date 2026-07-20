import { createContext, useReducer } from "react";
import { financeReducer, initialState } from "./finanaceReducer";

import { getTransactions,getSummary,createTransaction,updateTransaction,deleteTransaction } from "../api/transactionApi";

export const FinanceContext = createContext();

export function FinanceProvider({children}) {
    const [state, dispatch] = useReducer(
        financeReducer,
        initialState
    );

    const fetchTransactions = async (params = {}) => {
        dispatch({
            type: "FETCH_START",
        });
        try {
            const response = await getTransactions(params);

            console.log(response);

            dispatch({
                type: "FETCH_TRANSACTIONS",
                payload: response,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload: error.message,
            });
        }
    };

    const fetchSummary = async () => {
        try {
            const response = await getSummary();

            dispatch({
                type: "FETCH_SUMMARY",
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload: error.message,
            });
        }
    };

    const addTransaction = async (data) => {
        try {
            const response = await createTransaction(data);

            dispatch({
                type: "ADD_TRANSACTION",
                payload: response.data,
            });

            await fetchSummary();
            return response;
        } catch (error) {
            dispatch({
                type:"FETCH_ERROR",
                payload: error.message,
            });
        }
    };

    const updateTransactionById = async (id, data) => {
        try {
            const response = await updateTransaction(id, data);

            dispatch({
                type: "UPDATE_TRANSACTION",
                payload: response.data,
            });

            await fetchSummary();

            return response;
        } catch (error) {
            dispatch({
                type:"FETCH_ERROR",
                payload: error.message,
            });
        }
    };

    const removeTransaction = async (id) => {
        try {
            await deleteTransaction(id);

            dispatch({
                type: "DELETE_TRANSACTION",
                payload: id,
            });

            await fetchSummary();

        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload:error.message,
            });
        }
    };

    return (
        <FinanceContext.Provider
        value={{...state,fetchTransactions, fetchSummary,addTransaction, updateTransaction: updateTransactionById, deleteTransaction: removeTransaction,}} >
            {children}
        </FinanceContext.Provider>
    );
}