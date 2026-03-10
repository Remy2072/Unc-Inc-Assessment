import { Link, useParams } from "react-router-dom";
import { articles } from "../../lib/articles";
import "./DetailPage.css";

export function DetailPage() {
    const { id } = useParams();

    const article = articles.find((item) => item.id === id);

    if (!article) {
        return <p>Artikel niet gevonden</p>;
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
                <p>{article.content}</p>
            </section>
        </main>
    );
}
