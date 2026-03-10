import type { ReactNode } from "react";
import "./Button.css";

interface Props {
    children: ReactNode;
    icon?: string;
    variant?: "primary" | "default";
}

export function Button({ children, icon, variant = "default" }: Props) {
    return (
        <button className={`button button--${variant}`} type="button">
            {icon ? (
                <img className="button__icon" src={icon} alt="button icon" />
            ) : null}
            <span>{children}</span>
        </button>
    );
}
