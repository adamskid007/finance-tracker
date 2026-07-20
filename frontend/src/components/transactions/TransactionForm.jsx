import { useState } from "react";
import { useFinance } from "../../hooks/useFinance";
import { useEffect } from "react";
import { updateTransaction } from "../../api/transactionApi";
import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";
import Select from "../common/Select";

const initialForm = {
    title: "",
    amount: "",
    type: "EXPENSE",
    category: "",
    date: "",
};

function TransactionForm({transaction, clearSelection,}) {
    const {addTransaction, updateTransaction} = useFinance();

    const [formData, setFormData] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if(transaction) {
            setFormData({
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category,
                date: transaction.date ? transaction.date.split("T")[0] : "",
            });
        } else {
            setFormData(initialForm);
        }
    }, [transaction])
    
    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev, [name]:value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            if (transaction){
                await updateTransaction(
                    transaction.id,
                    formData
                );
                clearSelection();
            }else{
                await addTransaction(formData);
            }
            setFormData(initialForm);
        } catch (error) {
            console.error(error);
        }finally{
            setSubmitting(false);
        }
    };

    return (
        <Card>
        <form onSubmit={handleSubmit}>
            <Input label="Title" name="title" placeholder="Enter Title" value={formData.title} onChange={handleChange} />

            <Input type="number" label="Amount" name="amount" value={formData.amount} onChange={handleChange} />

            <Select name="type" label="Type" value={formData.type} onChange={handleChange}>
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
            </Select>

            <Input name="category" label="Category" value={formData.category} onChange={handleChange} />

            <Input type="date" name="date" label="Date" value={formData.date} onChange={handleChange} />

            <Button variant="secondary" type="submit" disabled={submitting}>{submitting ? "Saving..." : transaction ? "Update Transaction" : "Add Transaction"}</Button>
            {transaction && (
                <Button variant="secondary" type="button" onClick={() => {
                    clearSelection();
                    setFormData(initialForm);
                }}>Cancel</Button>
            )}

        </form>
        </Card>

    )
}

export default TransactionForm;