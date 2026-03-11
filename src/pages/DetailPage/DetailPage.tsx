import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useArticleStore } from "../../store/article-store";
import type { Article } from "../../types/article";
import "./DetailPage.css";

export function DetailPage() {
    const { id } = useParams();
    const getArticleById = useArticleStore((state) => state.getArticleById);
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadArticle() {
            if (!id) {
                setArticle(null);
                setErrorMessage("Artikel niet gevonden");
                setIsLoading(false);
                return;
            }

            try {
                const nextArticle = await getArticleById(id);
                setArticle(nextArticle);
                setErrorMessage("");
            } catch {
                setArticle(null);
                setErrorMessage("Artikel niet gevonden");
            } finally {
                setIsLoading(false);
            }
        }

        void loadArticle();
    }, [getArticleById, id]);

    if (isLoading) {
        return <p>Artikel laden...</p>;
    }

    if (!article) {
        return <p>{errorMessage}</p>;
    }

    return (
        <main className="detail-page">
            <Link className="detail-back-link" to="/">
                Terug
            </Link>
            <section className="detail-card">
                <h1>{article.title}</h1>
                <img src={article.image} alt={article.title} />
                <span>Geplaats op: {article.date}</span>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </section>
        </main>
    );
}
