import { create } from "zustand";

type ToastVariant = "success" | "error";

type ToastState = {
    message: string;
    variant: ToastVariant;
    isVisible: boolean;
    timeoutId: ReturnType<typeof setTimeout> | null;
    showToast: (message: string, variant: ToastVariant) => void;
    clearToast: () => void;
};

export const useToastStore = create<ToastState>((set, get) => ({
    message: "",
    variant: "success",
    isVisible: false,
    timeoutId: null,
    showToast(message, variant) {
        const currentTimeoutId = get().timeoutId;

        if (currentTimeoutId) {
            clearTimeout(currentTimeoutId);
        }

        const timeoutId = setTimeout(() => {
            set({ isVisible: false, timeoutId: null });
        }, 3000);

        set({
            message,
            variant,
            isVisible: true,
            timeoutId,
        });
    },
    clearToast() {
        const currentTimeoutId = get().timeoutId;

        if (currentTimeoutId) {
            clearTimeout(currentTimeoutId);
        }

        set({
            message: "",
            isVisible: false,
            timeoutId: null,
        });
    },
}));
