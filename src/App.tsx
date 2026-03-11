import { AppRouter } from "./router/AppRouter";
import { Toast } from "./components/Toast/Toast";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <AppRouter />
            <Toast />
        </AuthProvider>
    );
}

export default App;
