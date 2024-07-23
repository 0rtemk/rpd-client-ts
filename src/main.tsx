import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CaslProvider } from "./providers/CaslProvider.js";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <AuthProvider>
      <CaslProvider>
        <App />
      </CaslProvider>
    </AuthProvider>
  );
}
