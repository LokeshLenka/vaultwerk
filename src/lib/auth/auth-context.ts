import { createContext } from "react";
import type { AuthContextValue } from "./AuthContext";

/** Separated so component files only export components (fast-refresh). */
export const AuthContext = createContext<AuthContextValue | null>(null);
