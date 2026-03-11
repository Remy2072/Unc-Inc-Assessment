import addIcon from "../../assets/icons/add.svg";
import filterIcon from "../../assets/icons/filter.svg";
import searchIcon from "../../assets/icons/search.svg";
import { useAuth } from "../../context/auth-context";
import { Button } from "../Button/Button";
import "./Controls.css";

interface Props {
    onCreateArticleClick: () => void;
}

export function Controls({ onCreateArticleClick }: Props) {
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
                    <Button
                        icon={addIcon}
                        variant="primary"
                        onClick={onCreateArticleClick}
                    >
                        Nieuw artikel
                    </Button>
                )}

                <Button icon={filterIcon}>Sorteer</Button>
                <Button icon={filterIcon}>Filter</Button>
            </div>
        </section>
    );
}
