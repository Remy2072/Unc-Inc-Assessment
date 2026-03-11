import { create } from "zustand";
import {
    createArticle,
    deleteArticle,
    fetchArticle,
    fetchArticles,
    updateArticle,
} from "../api/articles";
import type { Article, ArticleInput } from "../types/article";

type ArticleStore = {
    articles: Article[];
    selectedArticle: Article | null;
    isLoading: boolean;
    errorMessage: string;
    hasLoaded: boolean;
    setSelectedArticle: (article: Article | null) => void;
    loadArticles: () => Promise<void>;
    getArticleById: (id: string) => Promise<Article>;
    addArticle: (article: ArticleInput) => Promise<void>;
    editArticle: (id: string, article: ArticleInput) => Promise<void>;
    removeArticle: (id: string) => Promise<void>;
};

export const useArticleStore = create<ArticleStore>((set, get) => ({
    articles: [],
    selectedArticle: null,
    isLoading: false,
    errorMessage: "",
    hasLoaded: false,
    setSelectedArticle(article) {
        set({ selectedArticle: article });
    },
    async loadArticles() {
        if (get().isLoading) {
            return;
        }

        set({ isLoading: true });

        try {
            const articles = await fetchArticles();
            set({
                articles,
                errorMessage: "",
                isLoading: false,
                hasLoaded: true,
            });
        } catch {
            set({
                errorMessage: "Artikelen konden niet worden geladen.",
                isLoading: false,
                hasLoaded: true,
            });
        }
    },
    async getArticleById(id: string) {
        const localArticle = get().articles.find((item) => item.id === id);

        if (localArticle) {
            return localArticle;
        }

        return fetchArticle(id);
    },
    async addArticle(article) {
        const createdArticle = await createArticle(article);
        set((state) => ({
            articles: [createdArticle, ...state.articles],
            selectedArticle: null,
        }));
    },
    async editArticle(id, article) {
        const updatedArticle = await updateArticle(id, article);
        set((state) => ({
            articles: state.articles.map((item) =>
                item.id === updatedArticle.id ? updatedArticle : item,
            ),
            selectedArticle:
                state.selectedArticle?.id === updatedArticle.id
                    ? updatedArticle
                    : state.selectedArticle,
        }));
    },
    async removeArticle(id) {
        await deleteArticle(id);
        set((state) => ({
            articles: state.articles.filter((item) => item.id !== id),
            selectedArticle:
                state.selectedArticle?.id === id ? null : state.selectedArticle,
        }));
    },
}));
