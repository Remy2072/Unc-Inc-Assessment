import type { CSSProperties } from "react";
import profileImage from "../../assets/profile.png";
import accountIcon from "../../assets/icons/account.svg";
import articleIcon from "../../assets/icons/article.svg";
import homeIcon from "../../assets/icons/home.svg";
import starIcon from "../../assets/icons/star.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import settingsIcon from "../../assets/icons/settings.svg";
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
    return (
        <div className="sidebar">
            <div className="sidebar-profile">
                <img src={profileImage} alt="Profiel" />
                <h2>Remy Duivesteijn</h2>
            </div>
            <ul className="sidebar-nav-list">
                <li>
                    <a href="/">
                        <span
                            aria-hidden="true"
                            className="sidebar-nav-icon"
                            style={iconStyle(homeIcon)}
                        />
                        <span>Overzicht</span>
                    </a>
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
                    <a href="/login">
                        <span
                            aria-hidden="true"
                            className="sidebar-nav-icon log-out"
                            style={iconStyle(logoutIcon)}
                        />
                        <span className="log-out">Afmelden</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}
