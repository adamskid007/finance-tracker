import Button from "./Button";
import Card from "./Card";
function ConfirmDialog({open, title, message, onConfirm, onCancel,}) {

    if (!open) return null;

    return (
        <Card>
            <div className="modal-backdrop">
            <div className="modal">
                <h2>{title}</h2>
                <p>{message}</p>

                <Button variant="danger" onClick={onConfirm}>Yes</Button>
                <Button onClick={onCancel}>Cancel</Button>
            </div>
            </div>
        </Card>
        
    )
}

export default ConfirmDialog;