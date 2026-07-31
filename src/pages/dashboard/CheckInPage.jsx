import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  ArrowLeft, ArrowRight, Check, Flame, Sparkles, MessageSquare, Heart 
} from 'lucide-react';

export default function CheckInPage({ onSelectTab }) {
  const { user } = useAuth();
  const { 
    addCheckin, MOOD_LEVELS, FACTOR_OPTIONS, DAILY_AFFIRMATIONS 
  } = useApp();

  const [step, setStep] = useState(1);
  const [selectedMoodId, setSelectedMoodId] = useState(4); // Default Baik 🙂
  const [selectedFactors, setSelectedFactors] = useState(['kerjaan']);
  const [journalText, setJournalText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Selected mood object
  const currentMood = MOOD_LEVELS.find(m => m.id === selectedMoodId) || MOOD_LEVELS[1];

  // Dynamic AI Guided Question based on mood & factors
  const generateAIGuidedQuestion = () => {
    const factorLabels = selectedFactors.join(' & ');
    if (selectedMoodId <= 2) {
      if (selectedFactors.includes('kerjaan')) {
        return "Apa yang paling berat dari beban kerjaanmu hari ini? Luapkan saja di sini 💙";
      } else if (selectedFactors.includes('tidur')) {
        return "Apakah pikiranmu terasa sesak karena terlalu lelah? Istirahat sejenak yuk.";
      } else {
        return "Apa hal kecil yang bisa membuat perasaanmu terasa 1% lebih ringan hari ini?";
      }
    } else if (selectedMoodId === 5) {
      if (selectedFactors.includes('momen_spesial')) {
        return "Momen spesial apa yang terjadi hari ini? Ceritain kebahagiaanmu dong! 🎉";
      } else {
        return "Apa rasa syukur terbesar yang bikin senyummu mengembang hari ini?";
      }
    } else {
      return "Ceritakan lebih lanjut tentang apa yang mengisi harimu... (opsional)";
    }
  };

  const aiQuestion = generateAIGuidedQuestion();

  // Toggle factor selection
  const toggleFactor = (factorId) => {
    if (selectedFactors.includes(factorId)) {
      setSelectedFactors(selectedFactors.filter(id => id !== factorId));
    } else {
      setSelectedFactors([...selectedFactors, factorId]);
    }
  };

  // Submit Check-in
  const handleSave = () => {
    addCheckin({
      moodScore: selectedMoodId,
      moodLabel: currentMood.label,
      factors: selectedFactors,
      journalText,
      aiGuidedQuestion: aiQuestion
    });
    setIsCompleted(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Top Header Step Indicator */}
      {!isCompleted && (
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-2 text-stoneText-muted hover:text-stoneText rounded-xl hover:bg-surface-container transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Daily Check-in • Step {step} dari 3
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step 
                    ? 'w-7 bg-brand-600' 
                    : i < step 
                      ? 'w-2 bg-brand-300' 
                      : 'w-2 bg-surface-container-high'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ────────────────── STEP 1: PILIH MOOD ────────────────── */}
      {step === 1 && !isCompleted && (
        <div className="space-y-6 text-center animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stoneText">
              Bagaimana perasaanmu hari ini?
            </h2>
            <p className="text-xs sm:text-sm text-stoneText-muted">
              Ambil sejenak untuk mengenali perasaanmu. Tidak ada jawaban yang salah 🌸
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
            {MOOD_LEVELS.map(m => {
              const isSelected = selectedMoodId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMoodId(m.id)}
                  className={`p-4 rounded-3xl border-2 transition-all flex items-center justify-between shadow-sm transform ${
                    isSelected
                      ? `${m.bgClass} scale-102 border-brand-500 shadow-md font-bold ring-2 ring-brand-300`
                      : 'bg-surface-lowest border-surface-container hover:border-brand-200 text-stoneText-calm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-4xl transition-transform ${isSelected ? 'scale-125 animate-bounce-gentle' : ''}`}>
                      {m.emoji}
                    </span>
                    <div className="text-left">
                      <h4 className="text-base font-bold">{m.label}</h4>
                      <span className="text-[11px] opacity-80">Tingkat {m.id} dari 5</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0">
                      <Check size={16} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4">
            <button
              onClick={() => setStep(2)}
              className="w-full max-w-md py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Lanjut ke Pilih Faktor</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── STEP 2: PILIH FAKTOR ────────────────── */}
      {step === 2 && !isCompleted && (
        <div className="space-y-6 text-center animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stoneText">
              Apa yang paling mempengaruhi harimu?
            </h2>
            <p className="text-xs sm:text-sm text-stoneText-muted">
              Pilih satu atau lebih faktor yang paling mewarnai suasana hatimu hari ini.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FACTOR_OPTIONS.map(f => {
              const isSelected = selectedFactors.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggleFactor(f.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-brand-600 text-white border-brand-600 shadow-md font-bold scale-[1.02]'
                      : 'bg-surface-lowest border-surface-container hover:border-brand-200 text-stoneText-calm'
                  }`}
                >
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-xs sm:text-sm">{f.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={() => setStep(1)}
              className="w-1/3 py-4 rounded-2xl bg-surface-container hover:bg-surface-container-high text-stoneText font-semibold text-sm transition-colors"
            >
              Kembali
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-2/3 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Lanjut ke Jurnal Refleksi</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── STEP 3: JURNAL OPSIONAL ────────────────── */}
      {step === 3 && !isCompleted && (
        <div className="space-y-6 animate-fade-in text-left">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stoneText">
              Jurnal Refleksi Haramu (Opsional)
            </h2>
            <p className="text-xs sm:text-sm text-stoneText-muted">
              Tuangkan pikiranmu jika ingin melepaskan beban atau mengabadikan momen ini.
            </p>
          </div>

          {/* AI Guided Question Prompt Card */}
          <div className="bg-gradient-to-r from-brand-50 via-purple-50 to-roseAcc-50 p-4 rounded-2xl border border-brand-200 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 flex items-center gap-1">
              <Sparkles size={12} /> Pertanyaan Refleksi AI
            </span>
            <p className="text-xs sm:text-sm font-semibold text-stoneText-calm italic">
              "{aiQuestion}"
            </p>
          </div>

          <div className="space-y-2">
            <textarea
              rows={6}
              value={journalText}
              onChange={(e) => setJournalText(e.target.value.slice(0, 1000))}
              placeholder="Ceritakan lebih tentang harimu di sini..."
              className="w-full p-4 rounded-3xl bg-surface-lowest border border-surface-container-high text-stoneText text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all shadow-inner"
            />
            <div className="flex justify-between text-xs text-stoneText-muted px-2">
              <span>*Tersimpan otomatis ke Jurnal pribadi</span>
              <span>{journalText.length} / 1000 Karakter</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setStep(2)}
              className="w-1/3 py-4 rounded-2xl bg-surface-container hover:bg-surface-container-high text-stoneText font-semibold text-sm transition-colors"
            >
              Kembali
            </button>
            <button
              onClick={handleSave}
              className="w-2/3 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Heart size={18} className="fill-white" />
              <span>Simpan Check-in Harian 🎉</span>
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── POST CHECK-IN SUCCESS ────────────────── */}
      {isCompleted && (
        <div className="bg-surface-lowest p-8 rounded-3xl border border-brand-200 shadow-soft-lg space-y-6 text-center animate-fade-in">
          
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl shadow-inner animate-bounce-gentle">
            🎉
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stoneText">
              Check-in Hari Ini Berhasil Tersimpan!
            </h2>
            <p className="text-sm text-stoneText-muted max-w-md mx-auto">
              Kamu sudah meluangkan waktu untuk hadir bagi dirimu sendiri. Langkah kecil ini sangat berarti.
            </p>
          </div>

          {/* Streak Counter */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 inline-flex items-center gap-3 text-amber-900 font-bold text-sm">
            <Flame size={24} className="text-amber-500 fill-amber-500" />
            <span>🔥 {(user?.streak_count || 12) + 1} Hari Berturut-turut! Kamu konsisten banget.</span>
          </div>

          {/* Daily Affirmation Card */}
          <div className="bg-gradient-to-r from-roseAcc-100 via-roseAcc-50 to-brand-50 p-5 rounded-3xl border border-roseAcc-200 text-left space-y-2 max-w-lg mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-white/70 px-2.5 py-0.5 rounded-full inline-block">
              Affirmasi Spesial Hari Ini ✨
            </span>
            <p className="text-xs sm:text-sm font-medium text-stoneText-calm italic leading-relaxed">
              "{DAILY_AFFIRMATIONS[0].text}"
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onSelectTab('companion')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              <span>Mulai Ngobrol dengan AI 🌸</span>
            </button>
            <button
              onClick={() => onSelectTab('home')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-surface-container hover:bg-surface-container-high text-stoneText font-semibold text-sm transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
