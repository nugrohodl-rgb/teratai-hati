import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/DashboardLayout';

import DashboardHome from './pages/dashboard/DashboardHome';
import CheckInPage from './pages/dashboard/CheckInPage';
import AICompanionPage from './pages/dashboard/AICompanionPage';
import JournalPage from './pages/dashboard/JournalPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';
import WellnessPage from './pages/dashboard/WellnessPage';
import AchievementsPage from './pages/dashboard/AchievementsPage';
import SettingsPage from './pages/dashboard/SettingsPage';

function AppContent() {
  const { isAuthenticated, logout } = useAuth();
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'login' | 'register' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('home'); // 'home' | 'checkin' | 'companion' | 'journal' | 'analytics' | 'wellness' | 'achievements' | 'settings'

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab) => {
    setDashboardTab(tab);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logout();
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render view logic
  if (currentView === 'login') {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  if (currentView === 'register') {
    return <RegisterPage onNavigate={handleNavigate} />;
  }

  if (currentView === 'dashboard') {
    return (
      <DashboardLayout
        currentTab={dashboardTab}
        onSelectTab={handleSelectTab}
        onNavigateLanding={() => handleNavigate('landing')}
        onLogout={handleLogout}
      >
        {dashboardTab === 'home' && <DashboardHome onSelectTab={handleSelectTab} />}
        {dashboardTab === 'checkin' && <CheckInPage onSelectTab={handleSelectTab} />}
        {dashboardTab === 'companion' && <AICompanionPage onSelectTab={handleSelectTab} />}
        {dashboardTab === 'journal' && <JournalPage />}
        {dashboardTab === 'analytics' && <AnalyticsPage onSelectTab={handleSelectTab} />}
        {dashboardTab === 'wellness' && <WellnessPage />}
        {dashboardTab === 'achievements' && <AchievementsPage />}
        {dashboardTab === 'settings' && <SettingsPage />}
      </DashboardLayout>
    );
  }

  return <LandingPage onNavigate={handleNavigate} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
