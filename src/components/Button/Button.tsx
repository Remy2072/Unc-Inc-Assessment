import type { MouseEventHandler, ReactNode } from "react";
import "./Button.css";

interface Props {
    children: ReactNode;
    icon?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    variant?: "primary" | "default";
}

export function Button({
    children,
    icon,
    onClick,
    variant = "default",
}: Props) {
    return (
        <button
            className={`button button--${variant}`}
            type="button"
            onClick={onClick}
        >
            {icon ? (
                <img className="button__icon" src={icon} alt="button icon" />
            ) : null}
            <span>{children}</span>
        </button>
    );
}
