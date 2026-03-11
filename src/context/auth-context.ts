import { create } from "zustand";

export type User = {
    id: number;
    name: string;
    avatar: string;
};

type AuthState = {
    user: User | null;
    isLoading: boolean;
    initialize: () => Promise<void>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
};

export const useAuth = create<AuthState>((set, get) => ({
    user: null,
    isLoading: true,
    async initialize() {
        if (!get().isLoading) {
            return;
        }

        try {
            const response = await fetch("/api/me");
            const data = (await response.json()) as { user: User | null };
            set({ user: data.user, isLoading: false });
        } catch {
            set({ user: null, isLoading: false });
        }
    },
    async login(username: string, password: string) {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                set({ user: null });
                return false;
            }

            const data = (await response.json()) as { user: User };
            set({ user: data.user });
            return true;
        } catch {
            set({ user: null });
            return false;
        }
    },
    async logout() {
        try {
            await fetch("/api/logout", {
                method: "POST",
            });
        } finally {
            set({ user: null });
        }
    },
}));
