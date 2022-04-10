import Navbar from "../components/Navbar";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "../styles/globals.css";
import { AuthProvider } from "../utils/useAuth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <div className="text-text">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
