import {
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { AuthContext, type User } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch("/api/me");
                const data = await response.json();
                setUser(data.user);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, []);

    async function login(username: string, password: string) {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                setUser(null);
                return false;
            }

            const data = await response.json();
            setUser(data.user);
            return true;
        } catch {
            setUser(null);
            return false;
        }
    }

    async function logout() {
        try {
            await fetch("/api/logout", {
                method: "POST",
            });
        } finally {
            setUser(null);
        }
    }

    const value = useMemo(
        () => ({
            user,
            isLoggedIn: !!user,
            isLoading,
            login,
            logout,
        }),
        [user, isLoading],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
