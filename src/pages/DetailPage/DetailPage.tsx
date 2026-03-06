import { useParams } from "react-router-dom";
import { articles } from "../../lib/articles";
import "./DetailPage.css";

export function DetailPage() {
    const { id } = useParams();

    const article = articles.find((item) => item.id === id);

    if (!article) {
        return <div>Artikel niet gevonden</div>;
    }

    return (
        <div>
            <img src={article.image} alt={article.title} />

            <h1>{article.title}</h1>

            <span>{article.date}</span>

            <p>{article.content}</p>
        </div>
    );
}
