import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X } from 'lucide-react';

export default function BadgeNotificationModal() {
  const { newBadgeNotification, setNewBadgeNotification } = useApp();

  if (!newBadgeNotification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-soft-lg border border-brand-100 overflow-hidden transform transition-all animate-bounce-gentle">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 via-roseAcc-300 to-brand-600" />
        
        <button 
          onClick={() => setNewBadgeNotification(null)}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="w-20 h-20 mx-auto my-3 rounded-full bg-brand-50 border-2 border-brand-200 flex items-center justify-center text-4xl shadow-inner">
          {newBadgeNotification.emoji}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold mb-2">
          <Sparkles size={14} className="text-amber-500" />
          Pencapaian Baru Dibuka!
        </div>

        <h3 className="text-xl font-bold text-stoneText font-sans">
          {newBadgeNotification.name}
        </h3>
        <p className="text-sm text-stoneText-calm mt-2 leading-relaxed">
          {newBadgeNotification.desc}
        </p>

        <button
          onClick={() => setNewBadgeNotification(null)}
          className="mt-6 w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-2xl shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Lanjutkan Perjalanan 🌸
        </button>
      </div>
    </div>
  );
}
