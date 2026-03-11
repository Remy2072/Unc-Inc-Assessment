import type { Article, ArticleInput } from "../types/article";

async function parseJsonResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error("Request mislukt");
    }

    return response.json() as Promise<T>;
}

export async function fetchArticles() {
    const response = await fetch("/api/articles");
    const data = await parseJsonResponse<{ articles: Article[] }>(response);
    return data.articles;
}

export async function fetchArticle(id: string) {
    const response = await fetch(`/api/articles/${id}`);
    const data = await parseJsonResponse<{ article: Article }>(response);
    return data.article;
}

export async function createArticle(article: ArticleInput) {
    const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
    });
    const data = await parseJsonResponse<{ article: Article }>(response);
    return data.article;
}

export async function updateArticle(id: string, article: ArticleInput) {
    const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
    });
    const data = await parseJsonResponse<{ article: Article }>(response);
    return data.article;
}

export async function deleteArticle(id: string) {
    const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
    });
    await parseJsonResponse<{ success: boolean }>(response);
}
