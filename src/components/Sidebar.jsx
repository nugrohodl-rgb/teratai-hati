import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { 
  Home, Heart, MessageSquare, BookOpen, BarChart3, Wind, Trophy, Settings, LogOut, Flame, Sparkles 
} from 'lucide-react';

export default function Sidebar({ currentTab, onSelectTab, onNavigateLanding }) {
  const { user, logout } = useAuth();
  const { checkins } = useApp();

  // Calculate streak count
  const streakCount = user?.streak_count || checkins.length || 0;

  const menuItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'checkin', label: 'Check-in', icon: Heart, badge: 'Harian' },
    { id: 'companion', label: 'AI Companion', icon: MessageSquare, badge: 'CBT' },
    { id: 'journal', label: 'Jurnal', icon: BookOpen },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
    { id: 'wellness', label: 'Wellness', icon: Wind },
    { id: 'achievements', label: 'Pencapaian', icon: Trophy },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface-low border-r border-surface-container flex flex-col justify-between p-5 min-h-screen shrink-0 hidden md:flex">
      
      {/* Top Header */}
      <div>
        <div 
          onClick={() => onNavigateLanding()}
          className="flex items-center gap-2.5 px-2 py-2 mb-6 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-lg font-bold shadow-soft group-hover:scale-105 transition-transform">
            🌸
          </div>
          <div>
            <h1 className="font-bold text-base text-stoneText tracking-tight block">TERATAI HATI</h1>
            <span className="text-[10px] text-brand-600 font-semibold uppercase tracking-wider block">
              Sanctuary
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-soft font-bold'
                    : 'text-stoneText-calm hover:bg-surface-container hover:text-stoneText'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-stoneText-muted'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-brand-100 text-brand-700 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile & Streak Box */}
      <div className="pt-4 border-t border-surface-container space-y-3">
        
        {/* Streak Pill */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs font-bold shadow-sm">
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-amber-500 fill-amber-500" />
            <span>{streakCount} Hari Streak</span>
          </div>
          <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full">
            Konsisten! 🔥
          </span>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img 
              src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
              alt={user?.full_name} 
              className="w-9 h-9 rounded-full border border-brand-300 object-cover shrink-0"
            />
            <div className="overflow-hidden text-left">
              <p className="text-xs font-bold text-stoneText truncate">{user?.full_name || 'Sahabat Teratai'}</p>
              <div className="flex items-center gap-1">
                <Sparkles size={10} className="text-brand-600" />
                <span className="text-[10px] font-bold uppercase text-brand-700 capitalize">
                  {user?.plan_tier || 'Free'} Plan
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            title="Keluar"
            className="p-2 text-stoneText-muted hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>

      </div>

    </aside>
  );
}
