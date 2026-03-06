import { Link } from "react-router-dom";
import type { Article } from "../../types/article";
import "./ArticleCard.css";

interface Props {
    article: Article;
}

export function ArticleCard({ article }: Props) {
    return (
        <Link to={`/articles/${article.id}`}>
            <div>
                <img src={article.image} alt={article.title} />
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <small>{article.date}</small>
            </div>
        </Link>
    );
}
