
import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// This would be replaced with a real authentication system
// In a production app, these would NOT be hardcoded
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345678";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    // Check if the user is already logged in
    localStorage.getItem("isAuthenticated") === "true"
  );

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple authentication check
    // In a real app, this would be an API call to your backend
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
