import { useEffect, useState, type MouseEvent } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ArticleCard } from "../../components/ArticleCard/ArticleCard";
import { ArticleEditorModal } from "../../components/ArticleEditorModal/ArticleEditorModal";
import { Controls } from "../../components/Controls/Controls";
import { useArticleStore } from "../../store/article-store";
import { useToastStore } from "../../store/toast-store";
import type { Article, ArticleInput } from "../../types/article";
import "./DashboardPage.css";

export function DashboardPage() {
    const [articleModalMode, setArticleModalMode] = useState<
        "create" | "edit" | null
    >(null);
    const articles = useArticleStore((state) => state.articles);
    const selectedArticle = useArticleStore((state) => state.selectedArticle);
    const searchTerm = useArticleStore((state) => state.searchTerm);
    const isLoading = useArticleStore((state) => state.isLoading);
    const errorMessage = useArticleStore((state) => state.errorMessage);
    const hasLoaded = useArticleStore((state) => state.hasLoaded);
    const setSelectedArticle = useArticleStore(
        (state) => state.setSelectedArticle,
    );
    const loadArticles = useArticleStore((state) => state.loadArticles);
    const addArticle = useArticleStore((state) => state.addArticle);
    const editArticle = useArticleStore((state) => state.editArticle);
    const removeArticle = useArticleStore((state) => state.removeArticle);
    const showToast = useToastStore((state) => state.showToast);

    useEffect(() => {
        if (!hasLoaded) {
            void loadArticles();
        }
    }, [hasLoaded, loadArticles]);

    function handleCreateArticleClick() {
        setSelectedArticle(null);
        setArticleModalMode("create");
    }

    function handleEditArticleClick(article: Article) {
        setSelectedArticle(article);
        setArticleModalMode("edit");
    }

    function handleArticleModalClose(
        event?: MouseEvent<HTMLButtonElement | HTMLDivElement>,
    ) {
        event?.preventDefault();
        event?.stopPropagation();
        setSelectedArticle(null);
        setArticleModalMode(null);
    }

    async function handleArticleSubmit(article: ArticleInput) {
        try {
            if (articleModalMode === "edit" && selectedArticle) {
                await editArticle(selectedArticle.id, article);
                showToast("Artikel is bijgewerkt.", "success");
            } else {
                await addArticle(article);
                showToast("Artikel is gepubliceerd.", "success");
            }

            setSelectedArticle(null);
            setArticleModalMode(null);
        } catch {
            showToast("Actie mislukt. Probeer het opnieuw.", "error");
        }
    }

    async function handleDeleteArticle(articleId: string) {
        try {
            await removeArticle(articleId);
            showToast("Artikel is verwijderd.", "success");
        } catch (error) {
            showToast("Verwijderen mislukt. Probeer het opnieuw.", "error");
            throw error;
        }
    }

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const visibleArticles = articles.filter((article) => {
        if (!normalizedSearchTerm) {
            return true;
        }

        return [article.title, article.description, article.content].some(
            (value) => value.toLowerCase().includes(normalizedSearchTerm),
        );
    });

    return (
        <main className="layout">
            <aside className="left">
                <Sidebar />
            </aside>

            <section className="right">
                <Controls onCreateArticleClick={handleCreateArticleClick} />

                {isLoading ? <p>Artikelen laden...</p> : null}
                {errorMessage ? <p>{errorMessage}</p> : null}

                {!isLoading && !errorMessage ? (
                    visibleArticles.length > 0 ? (
                        <ul className="articles">
                            {visibleArticles.map((article) => (
                                <li key={article.id}>
                                    <ArticleCard
                                        article={article}
                                        onEditArticleClick={
                                            handleEditArticleClick
                                        }
                                        onDeleteArticleClick={
                                            handleDeleteArticle
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Geen artikelen gevonden voor deze zoekopdracht.</p>
                    )
                ) : null}
            </section>

            <ArticleEditorModal
                isOpen={articleModalMode !== null}
                mode={articleModalMode ?? "create"}
                article={selectedArticle}
                onClose={handleArticleModalClose}
                onSubmit={handleArticleSubmit}
            />
        </main>
    );
}
