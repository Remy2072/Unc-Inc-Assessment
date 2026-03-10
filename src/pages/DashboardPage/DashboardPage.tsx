import { Sidebar } from "../../components/Sidebar/Sidebar";
import { ArticleCard } from "../../components/ArticleCard/ArticleCard";
import { Controls } from "../../components/Controls/Controls";
import { articles } from "../../lib/articles";
import "./DashboardPage.css";

export function DashboardPage() {
    return (
        <main className="layout">
            <aside className="left">
                <Sidebar />
            </aside>

            <section className="right">
                <Controls />
                <ul className="articles">
                    {articles.map((article) => (
                        <li key={article.id}>
                            <ArticleCard article={article} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
