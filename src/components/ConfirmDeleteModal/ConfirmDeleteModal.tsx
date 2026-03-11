import type { MouseEvent } from "react";
import "./ConfirmDeleteModal.css";

interface Props {
    isOpen: boolean;
    onClose: (event?: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
    onConfirm: () => Promise<void>;
    isDeleting: boolean;
}

export function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    isDeleting,
}: Props) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="confirm-delete-modal-backdrop" onClick={onClose}>
            <div
                className="confirm-delete-modal"
                role="dialog"
                aria-modal="true"
                aria-label="Confirm delete"
                onClick={(event) => event.stopPropagation()}
            >
                <p className="confirm-delete-modal-text">
                    Weet je zeker dat je dit artikel wilt verwijderen?
                </p>
                <div className="confirm-delete-modal-actions">
                    <button
                        type="button"
                        className="confirm-delete-modal-button confirm-delete-modal-button--danger"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Bezig..." : "Verwijderen"}
                    </button>
                    <button
                        type="button"
                        className="confirm-delete-modal-button"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Annuleer
                    </button>
                </div>
            </div>
        </div>
    );
}
