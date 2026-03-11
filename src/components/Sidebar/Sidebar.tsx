import type { CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImage from "../../assets/profile.png";
import accountIcon from "../../assets/icons/account.svg";
import articleIcon from "../../assets/icons/article.svg";
import homeIcon from "../../assets/icons/home.svg";
import starIcon from "../../assets/icons/star.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import { useAuth } from "../../context/auth-context";
import "./Sidebar.css";

type SidebarIconStyle = CSSProperties & {
    "--sidebar-icon": string;
};

function iconStyle(icon: string): SidebarIconStyle {
    return {
        "--sidebar-icon": `url("${icon}")`,
    };
}

export function Sidebar() {
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    async function handleAuthClick() {
        if (isLoggedIn) {
            await logout();
            navigate("/");
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="sidebar">
            {isLoggedIn ? (
                <div className="sidebar-profile">
                    <img src={profileImage} alt="Profiel" />
                    <h2>{user?.name}</h2>
                </div>
            ) : null}

            <ul className="sidebar-nav-list">
                <li>
                    <Link to="/">
                        <span
                            aria-hidden="true"
                            className="sidebar-nav-icon"
                            style={iconStyle(homeIcon)}
                        />
                        <span>Overzicht</span>
                    </Link>
                </li>
                <li>
                    <a href="#">
                        <span
                            aria-hidden="true"
                            className="sidebar-nav-icon"
                            style={iconStyle(starIcon)}
                        />
                        <span>Favorieten</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span
                            aria-hidden="true"
                            className="sidebar-nav-icon"
                            style={iconStyle(articleIcon)}
                        />
                        <span>Mijn artikelen</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span
                            aria-hidden="true"
                            className="sidebar-nav-icon"
                            style={iconStyle(accountIcon)}
                        />
                        <span>Account</span>
                    </a>
                </li>
            </ul>

            <ul className="sidebar-nav-list-2">
                <li>
                    <a href="#">
                        <span
                            aria-hidden="true"
                            className="sidebar-nav-icon"
                            style={iconStyle(settingsIcon)}
                        />
                        <span>Instellingen</span>
                    </a>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={handleAuthClick}
                        className="sidebar-auth-button"
                    >
                        <span
                            aria-hidden="true"
                            className={`sidebar-nav-icon ${isLoggedIn ? "log-out" : ""}`}
                            style={iconStyle(logoutIcon)}
                        />
                        <span className={isLoggedIn ? "log-out" : ""}>
                            {isLoggedIn ? "Afmelden" : "Inloggen"}
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    );
}
