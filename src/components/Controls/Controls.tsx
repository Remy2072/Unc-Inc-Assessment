import addIcon from "../../assets/icons/add.svg";
import filterIcon from "../../assets/icons/filter.svg";
import searchIcon from "../../assets/icons/search.svg";
import { useAuth } from "../../context/auth-context";
import { Button } from "../Button/Button";
import "./Controls.css";

export function Controls() {
    const { isLoggedIn } = useAuth();

    return (
        <section className="controls">
            <div className="controls-search">
                <img
                    className="controls-search-icon"
                    src={searchIcon}
                    alt="Search icon"
                />
                <input type="search" placeholder="Zoek een artikel..." />
            </div>

            <div
                className={`controls-actions ${
                    isLoggedIn
                        ? "controls-actions--three"
                        : "controls-actions--two"
                }`}
            >
                {isLoggedIn && (
                    <Button icon={addIcon} variant="primary">
                        Nieuw artikel
                    </Button>
                )}

                <Button icon={filterIcon}>Sorteer</Button>
                <Button icon={filterIcon}>Filter</Button>
            </div>
        </section>
    );
}
