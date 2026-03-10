import { Link } from "react-router-dom";
import type { Article } from "../../types/article";
import "./ArticleCard.css";

interface Props {
    article: Article;
}

export function ArticleCard({ article }: Props) {
    return (
        <Link className="article-card-link" to={`/articles/${article.id}`}>
            <article className="article-card">
                <img src={article.image} alt={article.title} />
                <div>
                    <h3>{article.title}</h3>
                    <span>Geplaats op: {article.date}</span>
                    <p>{article.description}</p>
                </div>
            </article>
        </Link>
    );
}
