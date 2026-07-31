import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wind, Sparkles, Heart, Share2, Play, Pause, RotateCcw, Check, Plus, Smile, RefreshCw 
} from 'lucide-react';

export default function WellnessPage() {
  const { gratitudeEntries, addGratitude, DAILY_AFFIRMATIONS } = useApp();

  const [activeTab, setActiveTab] = useState('breathing'); // 'breathing' | 'affirmation' | 'gratitude' | 'booster'

  // ────────────────── BREATHING EXERCISE STATE ──────────────────
  const [breathingTech, setBreathingTech] = useState('box'); // 'box' | '478' | 'deep'
  const [durationMin, setDurationMin] = useState(2);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Tarik Napas (Inhale)...');
  const [breathTimer, setBreathTimer] = useState(4);

  useEffect(() => {
    let interval = null;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathTimer((prev) => {
          if (prev <= 1) {
            // Cycle phases
            if (breathPhase.includes('Tarik')) {
              setBreathPhase('Tahan Napas (Hold)...');
              return 4;
            } else if (breathPhase.includes('Tahan')) {
              setBreathPhase('Hembuskan Pelan (Exhale)...');
              return 4;
            } else {
              setBreathPhase('Tarik Napas (Inhale)...');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase]);

  // ────────────────── GRATITUDE STATE ──────────────────
  const [grat1, setGrat1] = useState('');
  const [grat2, setGrat2] = useState('');
  const [grat3, setGrat3] = useState('');
  const [gratSaved, setGratSaved] = useState(false);

  const handleSaveGratitude = (e) => {
    e.preventDefault();
    if (!grat1 && !grat2 && !grat3) return;
    addGratitude([grat1, grat2, grat3].filter(Boolean));
    setGratSaved(true);
    setTimeout(() => setGratSaved(false), 3000);
    setGrat1(''); setGrat2(''); setGrat3('');
  };

  // ────────────────── MOOD BOOSTER STATE ──────────────────
  const [smileSeconds, setSmileSeconds] = useState(10);
  const [isSmiling, setIsSmiling] = useState(false);

  const startSmileTimer = () => {
    setIsSmiling(true);
    setSmileSeconds(10);
    const interval = setInterval(() => {
      setSmileSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSmiling(false);
          alert('Hebat! Senyumanmu melepaskan kebahagiaan sejati 😊🌸');
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Affirmation category filter
  const [affCat, setAffCat] = useState('all');
  const filteredAffirmations = affCat === 'all' 
    ? DAILY_AFFIRMATIONS 
    : DAILY_AFFIRMATIONS.filter(a => a.category === affCat);

  return (
    <div className="space-y-6">
      
      {/* Top Navigation Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stoneText">Wellness & Ketenangan</h2>
          <p className="text-xs sm:text-sm text-stoneText-muted">
            Kumpulan alat interaktif untuk memulihkan energi dan kedamaian pikiran.
          </p>
        </div>
      </div>

      <div className="flex bg-surface-container p-1 rounded-2xl border border-surface-container-high overflow-x-auto scrollbar-none">
        {[
          { id: 'breathing', label: '🫁 Breathing Exercise' },
          { id: 'affirmation', label: '✨ Daily Affirmation' },
          { id: 'gratitude', label: '📖 Gratitude Journal' },
          { id: 'booster', label: '⚡ Mood Booster' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-center whitespace-nowrap ${
              activeTab === t.id 
                ? 'bg-white text-brand-900 shadow-sm' 
                : 'text-stoneText-calm hover:text-stoneText'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ────────────────── 1. BREATHING EXERCISE TAB ────────────────── */}
      {activeTab === 'breathing' && (
        <div className="bg-gradient-to-br from-brand-900 via-purple-900 to-indigo-950 text-white p-8 sm:p-12 rounded-3xl shadow-soft-lg space-y-8 text-center relative overflow-hidden animate-fade-in">
          
          <div className="max-w-md mx-auto space-y-2">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-brand-200">
              Ketenangan Napas
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">Latihan Box Breathing</h3>
            <p className="text-xs text-brand-200/80">
              Ikuti ritme lingkaran yang mengembang dan mengempis untuk menurunkan tingkat kecemasan.
            </p>
          </div>

          {/* Controls: Technique & Duration */}
          <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
            <select
              value={breathingTech}
              onChange={(e) => setBreathingTech(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white focus:outline-none"
            >
              <option value="box" className="bg-slate-900">Box Breathing (4-4-4-4)</option>
              <option value="478" className="bg-slate-900">Metode 4-7-8 (Tidur Nyenyak)</option>
              <option value="deep" className="bg-slate-900">Pernapasan Dalam Santai</option>
            </select>

            <div className="inline-flex bg-white/10 p-1 rounded-xl border border-white/20">
              {[2, 5, 10].map(m => (
                <button
                  key={m}
                  onClick={() => setDurationMin(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    durationMin === m ? 'bg-brand-600 text-white shadow-sm' : 'text-white/70'
                  }`}
                >
                  {m} Menit
                </button>
              ))}
            </div>
          </div>

          {/* Animated Pulsating Circle Container */}
          <div className="py-8 flex flex-col items-center justify-center space-y-6">
            <div className="relative flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div 
                className={`w-56 h-56 rounded-full bg-brand-500/30 blur-xl transition-all duration-1000 ${
                  isBreathingActive ? 'scale-125 opacity-80' : 'scale-100 opacity-30'
                }`} 
              />
              
              {/* Main Animated Circle */}
              <div 
                className={`absolute w-44 h-44 rounded-full bg-gradient-to-tr from-brand-400 via-purple-300 to-roseAcc-300 flex flex-col items-center justify-center text-slate-950 font-bold shadow-2xl transition-all duration-1000 ${
                  isBreathingActive ? 'scale-110' : 'scale-95 opacity-80'
                }`}
              >
                <span className="text-3xl font-extrabold font-mono">{breathTimer}</span>
                <span className="text-[11px] font-semibold tracking-wider text-center px-2">
                  {isBreathingActive ? breathPhase : 'Siap Sedia'}
                </span>
              </div>
            </div>

            {/* Play / Pause Toggle Button */}
            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className="px-8 py-3.5 rounded-2xl bg-white hover:bg-brand-50 text-brand-950 font-extrabold text-sm shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                {isBreathingActive ? <Pause size={18} /> : <Play size={18} />}
                <span>{isBreathingActive ? 'Jeda Latihan' : 'Mulai Latihan Napas'}</span>
              </button>

              <button
                onClick={() => {
                  setIsBreathingActive(false);
                  setBreathTimer(4);
                  setBreathPhase('Tarik Napas (Inhale)...');
                }}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                title="Reset"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ────────────────── 2. DAILY AFFIRMATION TAB ────────────────── */}
      {activeTab === 'affirmation' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-stoneText text-lg">Galeri Affirmasi Positif</h3>
            <div className="flex items-center gap-2">
              {['all', 'self-love', 'ketenangan', 'motivasi', 'kepercayaan diri'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setAffCat(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
                    affCat === cat 
                      ? 'bg-brand-600 text-white' 
                      : 'bg-surface-container text-stoneText-calm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAffirmations.map((aff, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-roseAcc-100 via-surface-lowest to-brand-50 p-6 rounded-3xl border border-roseAcc-200 shadow-soft flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="px-3 py-1 bg-white/80 rounded-full text-[10px] font-bold text-rose-700 uppercase tracking-wider inline-block">
                    {aff.category}
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-stoneText leading-relaxed italic">
                    "{aff.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-rose-200/60 flex items-center justify-between text-xs">
                  <span className="text-stoneText-muted">TERATAI HATI Sanctuary</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard?.writeText(aff.text);
                      alert('Affirmasi telah disalin ke clipboard! Siap dipasang ke Instagram Stories 🌸');
                    }}
                    className="font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-brand-200 shadow-sm"
                  >
                    <Share2 size={14} />
                    <span>Bagikan ke Story 📸</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ────────────────── 3. GRATITUDE JOURNAL TAB ────────────────── */}
      {activeTab === 'gratitude' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          
          {/* Gratitude Form */}
          <div className="bg-surface-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-soft space-y-5">
            <div>
              <h3 className="font-bold text-stoneText text-lg">Gratitude Journal</h3>
              <p className="text-xs text-stoneText-muted">
                Tulis 3 hal sederhana yang paling kamu syukuri hari ini.
              </p>
            </div>

            {gratSaved && (
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-2">
                <Check size={16} /> 3 Rasa Syukurmu berhasil disimpan! ✨
              </div>
            )}

            <form onSubmit={handleSaveGratitude} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stoneText-calm mb-1">1. Hal Pertama</label>
                <input
                  type="text"
                  value={grat1}
                  onChange={(e) => setGrat1(e.target.value)}
                  placeholder="Aku bersyukur karena..."
                  className="w-full px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stoneText-calm mb-1">2. Hal Kedua</label>
                <input
                  type="text"
                  value={grat2}
                  onChange={(e) => setGrat2(e.target.value)}
                  placeholder="Aku bersyukur karena..."
                  className="w-full px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stoneText-calm mb-1">3. Hal Ketiga</label>
                <input
                  type="text"
                  value={grat3}
                  onChange={(e) => setGrat3(e.target.value)}
                  placeholder="Aku bersyukur karena..."
                  className="w-full px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all"
              >
                Simpan Rasa Syukur 🌸
              </button>
            </form>
          </div>

          {/* Gratitude History */}
          <div className="bg-surface-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-soft space-y-4">
            <h3 className="font-bold text-stoneText text-lg">Riwayat Rasa Syukur</h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {gratitudeEntries.map(entry => (
                <div key={entry.id} className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-brand-700">
                    {entry.date}
                  </span>
                  <ul className="space-y-1 text-xs text-stoneText-calm font-medium">
                    {entry.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-brand-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ────────────────── 4. MOOD BOOSTER TAB ────────────────── */}
      {activeTab === 'booster' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-100 via-orange-100 to-roseAcc-100 border border-amber-200 shadow-soft text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md">
              <Smile size={32} />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-2xl font-extrabold text-amber-950">Mini Aktivitas: Smile Challenge 😊</h3>
              <p className="text-xs text-amber-900 leading-relaxed">
                Coba senyum selama 10 detik penuh, meskipun dipaksa. Otakmu akan melepas hormon dopamin alami!
              </p>
            </div>

            <div className="pt-2">
              {isSmiling ? (
                <div className="text-4xl font-extrabold text-amber-900 font-mono animate-pulse">
                  {smileSeconds} Detik Tersisa... 😊
                </div>
              ) : (
                <button
                  onClick={startSmileTimer}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
                >
                  Mulai Tantangan Senyum 10 Detik 🚀
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft space-y-3">
              <span className="text-xs font-bold uppercase text-brand-600">💡 Fakta Sains Mood</span>
              <h4 className="font-bold text-stoneText">Postur Tubuh Mempengaruhi Pikiran</h4>
              <p className="text-xs text-stoneText-calm leading-relaxed">
                Meluruskan punggung dan membuka dada selama 2 menit dapat menurunkan kadar kortisol (hormon stres) hingga 25%. Coba tegakkan dudukmu sekarang!
              </p>
            </div>

            <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft space-y-3">
              <span className="text-xs font-bold uppercase text-brand-600">☕ Aktivitas 5 Menit</span>
              <h4 className="font-bold text-stoneText">Minum Air Putih Pelan-Pelan</h4>
              <p className="text-xs text-stoneText-calm leading-relaxed">
                Ambil segelas air hangat. Rasakan alirannya saat kamu menelan secara perlahan. Ini adalah teknik kesadaran paling sederhana untuk membumi (grounding).
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
