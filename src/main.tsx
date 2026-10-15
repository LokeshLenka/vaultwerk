import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import { AuthProvider } from "./lib/auth/AuthContext.tsx";
import { ClerkAuthProvider } from "./lib/auth/clerk-auth.tsx";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as
  | string
  | undefined;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <ErrorBoundary>
        {clerkKey ? (
          <ClerkProvider publishableKey={clerkKey} afterSignOutUrl="/login">
            <BrowserRouter>
              <ClerkAuthProvider>
                <App />
              </ClerkAuthProvider>
            </BrowserRouter>
          </ClerkProvider>
        ) : (
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        )}
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
);
