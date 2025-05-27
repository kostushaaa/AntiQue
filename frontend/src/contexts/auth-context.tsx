import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../util/api"; // axios instance с baseURL и withCredentials

export interface User {
  id: number;
  username: string;
  role: "admin" | "customer";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post("/auth/login", { username, password });

      const { token, role } = response.data;

      const parsedRole = role.includes("ROLE_ADMIN") ? "admin" : "customer";

      const userInfo: User = {
        id: 0, // Заменить при наличии ID
        username,
        role: parsedRole,
      };

      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            isAuthenticated: !!user,
            isAdmin: user?.role === "admin",
            login,
            logout,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};
