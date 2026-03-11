import { http, HttpResponse } from "msw";
import { initialArticles } from "../lib/articles";
import type { Article, ArticleInput } from "../types/article";

let isLoggedIn = false;
let articles: Article[] = [...initialArticles];

const user = {
    id: 1,
    name: "Remy Duivesteijn",
    avatar: "/src/assets/profile.png",
};

export const handlers = [
    http.get("/api/me", () => {
        return HttpResponse.json({
            user: isLoggedIn ? user : null,
        });
    }),

    http.post("/api/login", async ({ request }) => {
        const body = (await request.json()) as {
            username: string;
            password: string;
        };

        if (body.username === "Remy" && body.password === "test1234") {
            isLoggedIn = true;

            return HttpResponse.json({
                success: true,
                user,
            });
        }

        return HttpResponse.json(
            {
                success: false,
                message: "Ongeldige inloggegevens",
            },
            { status: 401 },
        );
    }),

    http.post("/api/logout", () => {
        isLoggedIn = false;

        return HttpResponse.json({
            success: true,
        });
    }),

    http.get("/api/articles", () => {
        return HttpResponse.json({
            articles,
        });
    }),

    http.get("/api/articles/:id", ({ params }) => {
        const article = articles.find((item) => item.id === params.id);

        if (!article) {
            return HttpResponse.json(
                { message: "Artikel niet gevonden" },
                { status: 404 },
            );
        }

        return HttpResponse.json({
            article,
        });
    }),

    http.post("/api/articles", async ({ request }) => {
        if (!isLoggedIn) {
            return HttpResponse.json(
                { message: "Niet ingelogd" },
                { status: 401 },
            );
        }

        const body = (await request.json()) as ArticleInput;

        const article: Article = {
            id: crypto.randomUUID(),
            title: body.title,
            description: body.description,
            content: body.content,
            image: body.image,
            date: new Date().toISOString().slice(0, 10),
        };

        articles = [article, ...articles];

        return HttpResponse.json({ article }, { status: 201 });
    }),

    http.put("/api/articles/:id", async ({ params, request }) => {
        if (!isLoggedIn) {
            return HttpResponse.json(
                { message: "Niet ingelogd" },
                { status: 401 },
            );
        }

        const body = (await request.json()) as ArticleInput;
        const index = articles.findIndex((item) => item.id === params.id);

        if (index === -1) {
            return HttpResponse.json(
                { message: "Artikel niet gevonden" },
                { status: 404 },
            );
        }

        const updatedArticle: Article = {
            ...articles[index],
            title: body.title,
            description: body.description,
            content: body.content,
            image: body.image,
        };

        articles[index] = updatedArticle;

        return HttpResponse.json({
            article: updatedArticle,
        });
    }),

    http.delete("/api/articles/:id", ({ params }) => {
        if (!isLoggedIn) {
            return HttpResponse.json(
                { message: "Niet ingelogd" },
                { status: 401 },
            );
        }

        const index = articles.findIndex((item) => item.id === params.id);

        if (index === -1) {
            return HttpResponse.json(
                { message: "Artikel niet gevonden" },
                { status: 404 },
            );
        }

        articles.splice(index, 1);

        return HttpResponse.json({
            success: true,
        });
    }),
];
