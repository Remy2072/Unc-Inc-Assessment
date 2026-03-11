import { useToastStore } from "../../store/toast-store";
import "./Toast.css";

export function Toast() {
    const message = useToastStore((state) => state.message);
    const variant = useToastStore((state) => state.variant);
    const isVisible = useToastStore((state) => state.isVisible);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`toast toast--${variant}`} role="status" aria-live="polite">
            {message}
        </div>
    );
}
