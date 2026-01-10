import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Загрузка из localStorage при старте приложения
  useEffect(() => {
    const saved = localStorage.getItem('yt_clone_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (email, name = 'Пользователь') => {
    const userData = {
      name,
      email,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/67.jpg',
    };
    setUser(userData);
    localStorage.setItem('yt_clone_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yt_clone_user');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};