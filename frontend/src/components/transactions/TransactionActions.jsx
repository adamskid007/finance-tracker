import { Pencil, Trash2 } from "lucide-react";
import Button from "../common/Button";

function TransactionActions({ onEdit, onDelete, transaction }) {
  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        onClick={() => onEdit(transaction)}
      >
        <Pencil size={16} />
      </Button>

      <Button
        variant="danger"
        onClick={() => onDelete(transaction)}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
}

export default TransactionActions;