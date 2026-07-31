import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Trophy, Sparkles, CheckCircle2, Lock, Flame } from 'lucide-react';

export default function AchievementsPage() {
  const { user } = useAuth();
  const { 
    unlockedBadges, BADGE_DEFINITIONS, checkins, journals, chatCountToday 
  } = useApp();

  const getBadgeProgress = (badge) => {
    let current = 0;
    if (badge.type === 'checkin') {
      current = checkins.length;
    } else if (badge.type === 'streak') {
      current = user?.streak_count || checkins.length || 12;
    } else if (badge.type === 'checkin_total') {
      current = checkins.length;
    } else if (badge.type === 'chat') {
      current = chatCountToday;
    } else if (badge.type === 'journal') {
      current = journals.length;
    }
    const percent = Math.min(100, Math.round((current / badge.req) * 100));
    return { current, percent };
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stoneText flex items-center gap-2">
            <span>Pencapaian & Badge</span>
            <Sparkles className="text-amber-500 animate-spin" size={24} style={{ animationDuration: '6s' }} />
          </h2>
          <p className="text-xs sm:text-sm text-stoneText-muted">
            Setiap langkah kecil dalam merawat kesehatan mentalmu adalah kemenangan yang pantas dirayakan.
          </p>
        </div>

        <div className="px-4 py-2 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs font-bold shrink-0 flex items-center gap-2">
          <Trophy size={18} className="text-amber-500" />
          <span>{unlockedBadges.length} dari {BADGE_DEFINITIONS.length} Badge Terbuka</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BADGE_DEFINITIONS.map(badge => {
          const isUnlocked = unlockedBadges.includes(badge.key);
          const { current, percent } = getBadgeProgress(badge);

          return (
            <div
              key={badge.key}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 relative overflow-hidden shadow-soft ${
                isUnlocked
                  ? 'bg-surface-lowest border-amber-300 shadow-md transform hover:scale-[1.02]'
                  : 'bg-surface-low border-surface-container opacity-85 grayscale hover:grayscale-0'
              }`}
            >
              {/* Unlocked Sparkle Indicator */}
              {isUnlocked && (
                <div className="absolute top-3 right-3 text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-amber-600" /> Terbuka
                </div>
              )}

              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-50 via-purple-50 to-amber-50 border border-brand-200 flex items-center justify-center text-4xl shadow-inner">
                  {badge.emoji}
                </div>

                <div>
                  <h3 className="font-bold text-stoneText text-base">{badge.name}</h3>
                  <p className="text-xs text-stoneText-calm mt-1 leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              </div>

              {/* Progress Bar for Locked Badges */}
              {!isUnlocked ? (
                <div className="space-y-1.5 pt-2 border-t border-surface-container">
                  <div className="flex justify-between text-[11px] font-semibold text-stoneText-muted">
                    <span className="flex items-center gap-1">
                      <Lock size={12} /> Progress Unlock
                    </span>
                    <span>{current} / {badge.req}</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-500 rounded-full transition-all duration-500" 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-amber-100 text-[11px] text-amber-700 font-medium italic">
                  ✨ Berhasil dibuka pada {new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
