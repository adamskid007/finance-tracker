import prisma from "../../config/prisma.js";
import { createTransaction, deleteTransaction, getSummary, getTransactionById, getTransactions, updateTransaction } from "./transaction.service.js";
import asyncHandler from "../../utils/asyncHandler.js";


export const createTransactionController = asyncHandler(async(req, res) => {
        const transaction = await createTransaction(req.body);

        res.status(201).json({
            success: true,
            data: transaction,
        });
    });

export const getTransactionController = asyncHandler(async (req,res) => {
        const result = await getTransactions(req.query);

        res.status(200).json({
            success: true,
            data: result.transactions,
            pagination: result.pagination,
        });
    });

export const getTransactionByIdController = asyncHandler( async (req,res) => {
        const {id} = req.params;
        const transaction = await getTransactionById(id);

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
        const {id} = req.params;
        const transaction = await deleteTransaction(id);

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
        const {id} = req.params;

        const transaction = await updateTransaction(id, req.body);

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
        const summary = await getSummary();

        res.status(200).json({
            success:true,
            data:summary,
        });
    });