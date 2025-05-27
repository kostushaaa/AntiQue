import React from "react";
import api from "../util/api";
import { useHistory } from "react-router-dom";

interface User {
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

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const history = useHistory();

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post("/auth/login", { username, password });

      if (response.status === 200) {
        const userData: User = {
          id: response.data.id,
          username: response.data.username,
          role: response.data.role || "customer",
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        if (response.data.token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
          localStorage.setItem("token", response.data.token);
        }

        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    history.push("/");
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";

  return (
      <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
