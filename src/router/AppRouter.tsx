import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { DetailPage } from "../pages/DetailPage/DetailPage";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/articles/:id" element={<DetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}
