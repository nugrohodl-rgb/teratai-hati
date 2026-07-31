import React, { useState } from 'react';
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
  const { isAuthenticated } = useAuth();
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

  // Render view
  if (currentView === 'login') {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  if (currentView === 'register') {
    return <RegisterPage onNavigate={handleNavigate} />;
  }

  if (currentView === 'dashboard' || (isAuthenticated && currentView !== 'landing')) {
    return (
      <DashboardLayout
        currentTab={dashboardTab}
        onSelectTab={handleSelectTab}
        onNavigateLanding={() => handleNavigate('landing')}
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
