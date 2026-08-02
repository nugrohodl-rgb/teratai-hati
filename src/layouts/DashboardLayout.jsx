import React from 'react';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import BadgeNotificationModal from '../components/BadgeNotificationModal';
import { useAuth } from '../context/AuthContext';
import { Flame, LogOut } from 'lucide-react';

export default function DashboardLayout({ currentTab, onSelectTab, onNavigateLanding, onLogout, children }) {
  const { user, logout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    if (onLogout) {
      onLogout();
    } else if (onNavigateLanding) {
      onNavigateLanding();
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row font-sans text-stoneText antialiased">
      {/* Sparkle Badge Unlock Notification */}
      <BadgeNotificationModal />

      {/* Desktop Sidebar */}
      <Sidebar 
        currentTab={currentTab} 
        onSelectTab={onSelectTab} 
        onNavigateLanding={onNavigateLanding} 
        onLogout={handleLogoutClick}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        
        {/* Mobile Header Bar */}
        <header className="md:hidden bg-surface-lowest/90 backdrop-blur-md px-4 py-3 border-b border-surface-container flex items-center justify-between sticky top-0 z-30">
          <div 
            onClick={onNavigateLanding}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center text-sm font-bold">
              🌸
            </div>
            <span className="font-bold text-sm text-stoneText">TERATAI HATI</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200 text-amber-900 text-xs font-bold">
              <Flame size={14} className="text-amber-500 fill-amber-500" />
              <span>{user?.streak_count || 12}d</span>
            </div>
            <button
              onClick={handleLogoutClick}
              title="Keluar dari Akun"
              className="p-1.5 text-stoneText-muted hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl w-full mx-auto animate-fade-in">
          {children}
        </main>

      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav currentTab={currentTab} onSelectTab={onSelectTab} />
    </div>
  );
}
