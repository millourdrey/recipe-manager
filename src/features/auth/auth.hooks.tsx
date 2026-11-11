import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthValue } from "./auth.types";

const KEY = "auth-user";

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  });

  const login = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    localStorage.setItem(KEY, trimmed);
    setUser(trimmed);
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  const value: AuthValue = {
    user,
    isLoggedIn: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
