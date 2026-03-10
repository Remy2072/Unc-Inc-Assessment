import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/UncIncLogo.png";
import "./LoginPage.css";

export function LoginPage() {
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        navigate("/");
    }

    return (
        <main className="login-page">
            <section className="login-card">
                <img src={logo} alt="UNC Inc logo" />
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Gebruikersnaam..." />
                    <input type="password" placeholder="Wachtwoord..." />
                    <a href="#">Wachtwoord vergeten?</a>
                    <button>Log in</button>
                </form>
            </section>
        </main>
    );
}
