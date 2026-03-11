import { http, HttpResponse } from "msw";

let isLoggedIn = false;

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

        if (body.username === "r" && body.password === "r") {
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
];
