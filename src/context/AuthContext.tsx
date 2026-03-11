import { useEffect, type ReactNode } from "react";
import { useAuth } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
    const initialize = useAuth((state) => state.initialize);

    useEffect(() => {
        void initialize();
    }, [initialize]);

    return children;
}
