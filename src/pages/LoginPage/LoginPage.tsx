import logo from "../../assets/UncIncLogo.png";
import "./LoginPage.css";

export function LoginPage() {
    return (
        <main className="login-page">
            <section className="login-card">
                <img src={logo} alt="UNC Inc logo" />
                <form action="">
                    <input type="text" placeholder="Gebruikersnaam..." />
                    <input type="password" placeholder="Wachtwoord..." />
                    <a href="#">Wachtwoord vergeten?</a>
                    <button>Log in</button>
                </form>
            </section>
        </main>
    );
}
