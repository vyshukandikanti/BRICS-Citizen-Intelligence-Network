"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface AuthUser {
  email: string;
  name: string;
  department: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo government credentials
const DEMO_CREDENTIALS = [
  {
    email: "admin@bcin.gov.in",
    password: "admin123",
    name: "Dr. Rajesh Kumar",
    department: "Ministry of Infrastructure",
    role: "Senior Analyst",
  },
  {
    email: "officer@bcin.gov.in",
    password: "officer123",
    name: "Priya Sharma",
    department: "District Administration",
    role: "District Officer",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string, password: string): boolean => {
    const found = DEMO_CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );
    if (found) {
      setUser({
        email: found.email,
        name: found.name,
        department: found.department,
        role: found.role,
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
