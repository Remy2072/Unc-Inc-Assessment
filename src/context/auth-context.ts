import { createContext, useContext } from "react";

export type User = {
    id: number;
    name: string;
    avatar: string;
};

export type AuthContextType = {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}
