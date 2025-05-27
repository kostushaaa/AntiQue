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
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(
          '/auth/login', // 👈 относительный путь для прокси
          { username, password },
          {
            withCredentials: true, // 👈 важно для cookies (если сервер отдает jwt как cookie)
            headers: { 'Content-Type': 'application/json' },
          }
      );

      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');

        // Если сервер возвращает токен в теле и ты хочешь его хранить (опционально)
        // Если сервер возвращает токен в теле и ты хочешь его хранить (опционально)
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    // можно также отправить запрос на logout, если сервер это поддерживает
  };

  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
