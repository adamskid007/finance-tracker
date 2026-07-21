import { createTransaction, deleteTransaction, getSummary, getTransactionById, getTransactions, updateTransaction } from "./transaction.service.js";
import asyncHandler from "../../utils/asyncHandler.js";


export const createTransactionController = asyncHandler(async(req, res) => {
        const transaction = await createTransaction(req.user.id, req.body);

        res.status(201).json({
            success: true,
            data: transaction,
        });
    });

export const getTransactionController = asyncHandler(async (req,res) => {
        const result = await getTransactions(req.user.id, req.query);

        res.status(200).json({
            success: true,
            data: result.transactions,
            pagination: result.pagination,
        });
    });

export const getTransactionByIdController = asyncHandler( async (req,res) => {
        const transaction = await getTransactionById(req.params.id, req.user.id);

        if(!transaction) {
            return res.status(404).json({
                success:false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            data: transaction,
        });
    });

export const deleteTransactionController = asyncHandler( async (req,res) => {
        const transaction = await deleteTransaction(req.params.id,req.user.id);

        if(!transaction){
            return res.status(404).json({
                success:false,
                message:"transaction not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Transaction deleted successfully",
        });
    });

export const updateTransactionController = asyncHandler(async (req,res) => {
        const transaction = await updateTransaction(req.params.id,req.user.id, req.body);

        if(!transaction) {
            return res.status(404).json({success:false,
            message: "Transaction not found"
            });
        }
        res.status(200).json({
            success:true,
            data:transaction,
        });
    });

    export const getSummaryController = asyncHandler(async(req,res) => {
        const summary = await getSummary(req.user.id);

        res.status(200).json({
            success:true,
            data:summary,
        });
    });