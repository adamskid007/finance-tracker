import express from "express";
import {createTransactionController, deleteTransactionController, getSummaryController, getTransactionByIdController, getTransactionController, updateTransactionController} from "./transaction.controller.js";
import validate from "../../middlewares/validate.js";
import { createTransactionSchema } from "../../validators/transaction.validators.js";
import { createTransaction } from "./transaction.service.js";

const router = express.Router();


router.post("/",validate(createTransactionSchema), createTransactionController);

router.get("/",getTransactionController);

router.get("/summary", getSummaryController)

router
.route("/:id")
.get(getTransactionByIdController)
.delete(deleteTransactionController)
.patch(updateTransactionController)

export default router;