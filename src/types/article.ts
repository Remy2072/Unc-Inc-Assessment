export interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    date: string;
}

export interface ArticleInput {
    title: string;
    description: string;
    content: string;
    image: string;
}
