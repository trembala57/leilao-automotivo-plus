
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Added this property
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: 'user' | 'admin';
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Added loading state

  // Simulated authentication state
  useEffect(() => {
    // Check if user is logged in using localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
    // Set loading to false after checking authentication
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true); // Set loading when login starts
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real app, would validate credentials with backend
    // For demo purposes, accept any email/password and set user role
    
    let role: 'user' | 'admin' = 'user';
    let isVerified = true;
    
    // Set admin role for specific emails
    if (email === 'admin@example.com') {
      role = 'admin';
    }
    
    // For demo, set some users as unverified
    if (email === 'unverified@example.com') {
      isVerified = false;
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      isVerified,
      role
    };
    
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false); // Set loading to false when login completes
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    setIsLoading(true); // Set loading when registration starts
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real app, would register the user with backend
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      isVerified: false, // New users start unverified
      role: 'user' as const
    };
    
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false); // Set loading to false when registration completes
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    isLoading, // Added this property to the context value
    user,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
