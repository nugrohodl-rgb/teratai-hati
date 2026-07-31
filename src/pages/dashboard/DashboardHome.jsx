import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  Flame, Heart, Sparkles, MessageSquare, Wind, BookOpen, 
  ArrowRight, ShieldAlert, CheckCircle2, TrendingUp, Sun, Moon, CloudSun
} from 'lucide-react';

export default function DashboardHome({ onSelectTab }) {
  const { user } = useAuth();
  const { 
    todayCheckin, checkins, isRedFlagActive, 
    DAILY_AFFIRMATIONS, MOOD_LEVELS 
  } = useApp();

  // Greeting based on hour
  const currentHour = new Date().getHours();
  let greetingText = 'Selamat pagi';
  let greetingIcon = <Sun size={20} className="text-amber-500" />;
  if (currentHour >= 11 && currentHour < 15) {
    greetingText = 'Selamat siang';
    greetingIcon = <Sun size={20} className="text-amber-500" />;
  } else if (currentHour >= 15 && currentHour < 18) {
    greetingText = 'Selamat sore';
    greetingIcon = <CloudSun size={20} className="text-amber-500" />;
  } else if (currentHour >= 18 || currentHour < 5) {
    greetingText = 'Selamat malam';
    greetingIcon = <Moon size={20} className="text-purple-400" />;
  }

  // Affirmation of the day
  const todayAffirmation = DAILY_AFFIRMATIONS[0];

  // Calculate streak progress to 30-day badge
  const currentStreak = user?.streak_count || checkins.length || 12;
  const targetStreak = 30;
  const streakPercent = Math.min(100, Math.round((currentStreak / targetStreak) * 100));

  return (
    <div className="space-y-6">
      
      {/* Red Flag Soft Alert Banner (if low mood 3 days in a row) */}
      {isRedFlagActive && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-roseAcc-100 via-roseAcc-50 to-brand-50 border border-roseAcc-300 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-bounce-gentle">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 text-xl font-bold">
              💙
            </div>
            <div>
              <h4 className="font-bold text-stoneText text-sm sm:text-base">
                Kamu terlihat sedang tidak baik-baik saja beberapa hari ini 💙
              </h4>
              <p className="text-xs text-stoneText-calm mt-0.5 leading-relaxed">
                Mau ngobrol sedikit? AI Companion siap mendengarkan tanpa judgment — ambil napas sejenak ya.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectTab('companion')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shrink-0 shadow-md shadow-brand-500/20 transition-transform active:scale-95"
          >
            Ngobrol dengan AI 🌸
          </button>
        </div>
      )}

      {/* Top Greeting Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-brand-600 via-brand-500 to-purple-700 p-6 sm:p-8 rounded-3xl text-white shadow-soft-lg relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold">
            {greetingIcon}
            <span>{greetingText}, {user?.full_name?.split(' ')[0] || 'Sahabat'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {todayCheckin ? 'Terima kasih sudah check-in hari ini 🎉' : 'Bagaimana perasaanmu hari ini?'}
          </h2>
          <p className="text-xs sm:text-sm opacity-90 max-w-xl leading-relaxed">
            {todayCheckin 
              ? `Kamu mencatat mood "${todayCheckin.moodLabel}". Jaga irama ketenanganmu ya.`
              : 'Ambil sejenak 30 detik untuk mengenali emosimu sebelum melangkah lebih jauh.'}
          </p>
        </div>

        <div className="z-10 shrink-0">
          {todayCheckin ? (
            <button
              onClick={() => onSelectTab('checkin')}
              className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs border border-white/30 transition-all flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-emerald-300" />
              <span>Lihat Detail Check-in</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectTab('checkin')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-brand-50 text-brand-900 font-extrabold text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Heart size={18} className="text-brand-600 fill-brand-600" />
              <span>Check-in Sekarang</span>
            </button>
          )}
        </div>

        {/* Ambient Orb inside banner */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Grid Row 1: Streak Progress & Daily Affirmation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Streak Counter Card */}
        <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Flame size={22} className="fill-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-stoneText text-sm">Streak Check-in Harian</h3>
                <p className="text-xs text-stoneText-muted">Konsistensi merawat diri</p>
              </div>
            </div>
            <span className="text-2xl font-extrabold text-amber-600 font-mono">
              🔥 {currentStreak} Hari
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stoneText-calm font-medium">
              <span>Progress Badge 30 Hari</span>
              <span>{currentStreak} / {targetStreak} hari ({streakPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${streakPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-stoneText-muted italic">
              {30 - currentStreak > 0 
                ? `Tinggal ${30 - currentStreak} hari lagi untuk membuka badge 💎 30 Hari Perjalanan!`
                : 'Selamat! Kamu telah mencapai milestone 30 hari streak 🎉'}
            </p>
          </div>
        </div>

        {/* Daily Affirmation Card */}
        <div className="bg-gradient-to-br from-roseAcc-100 via-roseAcc-50 to-brand-50 p-6 rounded-3xl border border-roseAcc-200 shadow-soft flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-white/70 px-2.5 py-0.5 rounded-full">
                Affirmasi Hari Ini ✨
              </span>
              <span className="text-[11px] text-stoneText-muted">Refreshed</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-stoneText-calm italic leading-relaxed">
              "{todayAffirmation.text}"
            </p>
          </div>

          <div className="pt-2 border-t border-rose-200/50 flex items-center justify-between text-xs text-stoneText-muted">
            <span className="capitalize">Kategori: {todayAffirmation.category}</span>
            <button 
              onClick={() => onSelectTab('wellness')}
              className="font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              <span>Wellness Tools</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Grid Row 2: 7-Day Mood Trend Preview & Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 7-Day Mood Overview (2 Cols) */}
        <div className="md:col-span-2 bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-brand-600" />
              <h3 className="font-bold text-stoneText text-sm">Grafik Ringkasan Suasana Hati (7 Hari)</h3>
            </div>
            <button
              onClick={() => onSelectTab('analytics')}
              className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              <span>Analitik Lengkap</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-32 pt-4 px-2 border-b border-surface-container pb-4">
            {checkins.slice(0, 7).reverse().map((chk, idx) => {
              const moodObj = MOOD_LEVELS.find(m => m.id === chk.moodScore) || MOOD_LEVELS[1];
              const heightPercent = (chk.moodScore / 5) * 100;
              return (
                <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity font-bold text-stoneText">
                    {chk.moodScore}/5
                  </span>
                  <div 
                    className="w-full max-w-[36px] rounded-t-xl transition-all group-hover:scale-105 shadow-sm"
                    style={{ height: `${heightPercent}%`, backgroundColor: moodObj.hex }}
                  />
                  <div className="text-center">
                    <span className="text-lg block">{moodObj.emoji}</span>
                    <span className="text-[10px] text-stoneText-muted block font-mono">
                      {new Date(chk.date).toLocaleDateString('id-ID', { weekday: 'short' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Access Tools (1 Col) */}
        <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft space-y-4">
          <h3 className="font-bold text-stoneText text-sm">Akses Cepat Tools</h3>

          <div className="space-y-3">
            <button
              onClick={() => onSelectTab('companion')}
              className="w-full p-3 rounded-2xl bg-brand-50 hover:bg-brand-100 border border-brand-200 flex items-center justify-between text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center text-sm">
                  🤖
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-950">AI Companion</h4>
                  <p className="text-[10px] text-brand-700">Ngobrol CBT 24/7</p>
                </div>
              </div>
              <ArrowRight size={15} className="text-brand-600" />
            </button>

            <button
              onClick={() => onSelectTab('wellness')}
              className="w-full p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 flex items-center justify-between text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center text-sm">
                  🫁
                </div>
                <div>
                  <h4 className="font-bold text-xs text-sky-950">Box Breathing</h4>
                  <p className="text-[10px] text-sky-700">Latihan relaksasi napas</p>
                </div>
              </div>
              <ArrowRight size={15} className="text-sky-600" />
            </button>

            <button
              onClick={() => onSelectTab('journal')}
              className="w-full p-3 rounded-2xl bg-roseAcc-50 hover:bg-roseAcc-100 border border-roseAcc-200 flex items-center justify-between text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center text-sm">
                  📖
                </div>
                <div>
                  <h4 className="font-bold text-xs text-rose-950">Jurnal Refleksi</h4>
                  <p className="text-[10px] text-rose-700">Tulis cerita harimu</p>
                </div>
              </div>
              <ArrowRight size={15} className="text-rose-600" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
