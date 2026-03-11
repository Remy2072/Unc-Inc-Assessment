import { useState, type MouseEvent } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ArticleCard } from "../../components/ArticleCard/ArticleCard";
import { ArticleEditorModal } from "../../components/ArticleEditorModal/ArticleEditorModal";
import { Controls } from "../../components/Controls/Controls";
import { articles } from "../../lib/articles";
import "./DashboardPage.css";

export function DashboardPage() {
    const [articleModalMode, setArticleModalMode] = useState<
        "create" | "edit" | null
    >(null);

    function handleCreateArticleClick() {
        setArticleModalMode("create");
    }

    function handleEditArticleClick() {
        setArticleModalMode("edit");
    }

    function handleArticleModalClose(
        event?: MouseEvent<HTMLButtonElement | HTMLDivElement>,
    ) {
        event?.preventDefault();
        event?.stopPropagation();
        setArticleModalMode(null);
    }

    return (
        <main className="layout">
            <aside className="left">
                <Sidebar />
            </aside>

            <section className="right">
                <Controls onCreateArticleClick={handleCreateArticleClick} />
                <ul className="articles">
                    {articles.map((article) => (
                        <li key={article.id}>
                            <ArticleCard
                                article={article}
                                onEditArticleClick={handleEditArticleClick}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <ArticleEditorModal
                isOpen={articleModalMode !== null}
                mode={articleModalMode ?? "create"}
                onClose={handleArticleModalClose}
            />
        </main>
    );
}
