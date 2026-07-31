import React from 'react';
import { Home, MessageSquare, BookOpen, BarChart3, Wind } from 'lucide-react';

export default function MobileNav({ currentTab, onSelectTab }) {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'companion', label: 'AI Chat', icon: MessageSquare },
    { id: 'journal', label: 'Jurnal', icon: BookOpen },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
    { id: 'wellness', label: 'Wellness', icon: Wind },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-lowest/95 backdrop-blur-md border-t border-surface-container-high px-3 py-2 flex items-center justify-around md:hidden shadow-lg">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-[10px] font-bold transition-all ${
              isActive
                ? 'bg-brand-600 text-white shadow-soft py-1.5 px-4 scale-105'
                : 'text-stoneText-muted hover:text-stoneText'
            }`}
          >
            <Icon size={18} className={isActive ? 'text-white mb-0.5' : 'text-stoneText-muted mb-0.5'} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
