import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_DEFAULT_USER = {
  id: 'usr_teratai_demo',
  email: 'sari.dewi@terataihati.id',
  full_name: 'Sari Dewi',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  plan_tier: 'pro', // 'free' | 'pro' | 'lifetime'
  streak_count: 12,
  longest_streak: 18,
  daily_reminder_enabled: true,
  reminder_time: '20:00',
  created_at: new Date().toISOString()
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('teratai_user');
    return saved ? JSON.parse(saved) : MOCK_DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('teratai_auth_state');
    return saved !== null ? JSON.parse(saved) : true; // Default logged in as demo user for instant testability
  });

  useEffect(() => {
    localStorage.setItem('teratai_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('teratai_auth_state', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = (email, password) => {
    const nameFromEmail = email ? email.split('@')[0] : 'Sahabat Teratai';
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    const updatedUser = {
      ...user,
      email: email || user.email,
      full_name: user.full_name || formattedName,
    };
    setUser(updatedUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const register = (fullName, email, password) => {
    const newUser = {
      ...MOCK_DEFAULT_USER,
      id: 'usr_' + Date.now(),
      email,
      full_name: fullName,
      streak_count: 1,
      longest_streak: 1,
      plan_tier: 'free'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const setPlanTier = (tier) => {
    const updated = { ...user, plan_tier: tier };
    setUser(updated);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      setPlanTier,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
