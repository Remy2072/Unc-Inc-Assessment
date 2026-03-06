import { ArticleCard } from "../components/ArticleCard/ArticleCard";
import { articles } from "../lib/articles";

export function DashboardPage() {
    return (
        <div>
            <h1>Articles</h1>

            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}
