import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import { CaslProvider } from "./ability/CaslProvider.js";

//@NOTE Типизация
//@ts-expect-error
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CaslProvider>
      <App />
    </CaslProvider>
  </AuthProvider>
);
