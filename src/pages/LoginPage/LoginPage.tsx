import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import logo from "../../assets/UncIncLogo.png";
import "./LoginPage.css";

export function LoginPage() {
    const navigate = useNavigate();
    const login = useAuth((state) => state.login);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const success = await login(username, password);

        if (success) {
            navigate("/");
            return;
        }

        setError("Gebruikersnaam of wachtwoord klopt niet.");
    }

    return (
        <main className="login-page">
            <section className="login-card">
                <img src={logo} alt="UNC Inc logo" />

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Gebruikersnaam..."
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Wachtwoord..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <a href="#">Wachtwoord vergeten?</a>

                    {error ? <p>{error}</p> : null}

                    <button type="submit">Log in</button>
                </form>
            </section>
        </main>
    );
}
