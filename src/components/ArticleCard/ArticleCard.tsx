import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { useAuth } from "../../context/auth-context";
import type { Article } from "../../types/article";
import "./ArticleCard.css";

interface Props {
    article: Article;
    onEditArticleClick: () => void;
}

export function ArticleCard({ article, onEditArticleClick }: Props) {
    const { isLoggedIn } = useAuth();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    function handleDeleteButtonClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();
        setIsDeleteModalOpen(true);
    }

    function handleEditButtonClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();
        onEditArticleClick();
    }

    function handleModalClose(
        event?: MouseEvent<HTMLButtonElement | HTMLDivElement>,
    ) {
        event?.preventDefault();
        event?.stopPropagation();
        setIsDeleteModalOpen(false);
    }

    return (
        <>
            <Link className="article-card-link" to={`/articles/${article.id}`}>
                <article className="article-card">
                    <div className="article-card-image-wrapper">
                        <img src={article.image} alt={article.title} />
                        {isLoggedIn ? (
                            <div className="article-card-image-actions">
                                <button
                                    type="button"
                                    aria-label="Edit artikel"
                                    onClick={handleEditButtonClick}
                                >
                                    <img src={editIcon} alt="" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Delete artikel"
                                    onClick={handleDeleteButtonClick}
                                >
                                    <img src={deleteIcon} alt="" aria-hidden="true" />
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <h3>{article.title}</h3>
                        <span>Geplaats op: {article.date}</span>
                        <p>{article.description}</p>
                    </div>
                </article>
            </Link>
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleModalClose}
            />
        </>
    );
}
