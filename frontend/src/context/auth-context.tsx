// contexts/auth-context.tsx
import React from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(
          '/auth/login',
          { username, password },
          { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200 && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
