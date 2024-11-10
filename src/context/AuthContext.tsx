import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the user type (for TypeScript)
interface User {
  email: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  loginAsGuest: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Simulate a login (normally you'd call an API here)
    if (email && password) {
      setUser({ email, isGuest: false });
      console.log(`Logged in as ${email}`);
    }
  };

  const logout = () => {
    setUser(null);
    console.log("Logged out");
  };

  const loginAsGuest = () => {
    setUser({ email: "guest@example.com", isGuest: true });
    console.log("Logged in as Guest");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};
