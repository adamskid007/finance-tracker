import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transactionRoutes from "./modules/transactions/transaction.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Finance Tracker API is running"})
})
app.use("/api/transactions", transactionRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});