import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext();

const MOCK_DEFAULT_USER = {
  id: 'usr_teratai_demo',
  email: 'sari.dewi@terataihati.id',
  full_name: 'Sari Dewi',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  plan_tier: 'pro',
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
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('teratai_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('teratai_auth_state', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Supabase Auth Listener for Google OAuth callback & session state
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // Fetch initial session or OAuth redirect callback
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) console.error('Supabase session fetch error:', error);
      if (session?.user) {
        const u = session.user;
        const profile = {
          id: u.id,
          email: u.email,
          full_name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Sahabat Teratai',
          avatar_url: u.user_metadata?.avatar_url || u.user_metadata?.picture || MOCK_DEFAULT_USER.avatar_url,
          plan_tier: 'pro',
          streak_count: 12,
          longest_streak: 18
        };
        setUser(profile);
        setIsAuthenticated(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Supabase Auth State Event:', event, session);
      if (session?.user) {
        const u = session.user;
        const profile = {
          id: u.id,
          email: u.email,
          full_name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Sahabat Teratai',
          avatar_url: u.user_metadata?.avatar_url || u.user_metadata?.picture || MOCK_DEFAULT_USER.avatar_url,
          plan_tier: 'pro',
          streak_count: 12,
          longest_streak: 18
        };
        setUser(profile);
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

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

  const loginWithGoogle = async () => {
    try {
      const redirectUrl = window.location.origin;
      console.log('Initiating Google OAuth to redirect:', redirectUrl);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
      return data;
    } catch (err) {
      console.error('Google OAuth Login error:', err);
      throw err;
    }
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

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
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
      loginWithGoogle,
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
