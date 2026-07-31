import React, { useState, useEffect } from 'react';
import { 
  Home, Heart, MessageSquare, BookOpen, BarChart3, Wind, Trophy, Settings, 
  Sparkles, Flame, Check, ArrowRight, Play, Pause, Search, Plus, Calendar, 
  TrendingUp, ShieldAlert, Share2, Smile, Lock
} from 'lucide-react';

export default function InteractiveDashboardPreview({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('beranda');
  
  // Interactive States inside Demo Preview
  const [selectedMood, setSelectedMood] = useState(4); // Default Baik 🙂
  const [checkinStep, setCheckinStep] = useState(1);
  const [demoFactors, setDemoFactors] = useState(['kerjaan']);
  const [demoChat, setDemoChat] = useState([
    { sender: 'ai', text: 'Halo Sari! Aku lihat kamu lagi ngerasa kurang baik hari ini, dan kerjaan jadi faktornya 💙 Mau cerita apa yang terjadi? Aku di sini buat dengerin — take your time.' },
    { sender: 'user', text: 'Lagi banyak banget revisi dadakan hari ini, rasanya agak kewalahan.' },
    { sender: 'ai', text: 'Aku mengerti sekali rasanya. Menyelesaikan revisi bertubi-tubi memang menguras energi. Mau coba latihan pernapasan 4-7-8 sejenak, atau hanya ingin curhat lebih lanjut? 🌸' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathTimer, setBreathTimer] = useState(4);
  const [planTier, setPlanTier] = useState('pro');

  useEffect(() => {
    let timer = null;
    if (breathingActive) {
      timer = setInterval(() => {
        setBreathTimer(prev => prev <= 1 ? 4 : prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathingActive]);

  const moods = [
    { id: 5, emoji: '😄', label: 'Sangat Baik', border: 'border-emerald-300 bg-emerald-50 text-emerald-700' },
    { id: 4, emoji: '🙂', label: 'Baik', border: 'border-sky-300 bg-sky-50 text-sky-700' },
    { id: 3, emoji: '😐', label: 'Biasa', border: 'border-amber-300 bg-amber-50 text-amber-700' },
    { id: 2, emoji: '😔', label: 'Kurang Baik', border: 'border-orange-300 bg-orange-50 text-orange-700' },
    { id: 1, emoji: '😢', label: 'Buruk', border: 'border-rose-300 bg-rose-50 text-rose-700' },
  ];

  const factorsList = [
    { id: 'kerjaan', label: 'Kerjaan', icon: '💼' },
    { id: 'keluarga', label: 'Keluarga', icon: '👨‍👩‍👧' },
    { id: 'hubungan', label: 'Hubungan', icon: '❤️' },
    { id: 'kesehatan', label: 'Kesehatan', icon: '💪' },
    { id: 'tidur', label: 'Tidur', icon: '😴' },
    { id: 'keuangan', label: 'Keuangan', icon: '💰' },
  ];

  const handleSendDemoChat = (txt) => {
    const msg = txt || chatInput;
    if (!msg.trim()) return;
    setDemoChat(prev => [...prev, { sender: 'user', text: msg }]);
    setChatInput('');
    setTimeout(() => {
      setDemoChat(prev => [...prev, { 
        sender: 'ai', 
        text: 'Terima kasih sudah berbagi denganku 💙 Setiap emosi yang kamu rasakan adalah valid. Ambil napas dalam ya.' 
      }]);
    }, 800);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-12">
      {/* Soft Glow Underlay */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-300 via-roseAcc-200 to-brand-400 rounded-3xl blur-2xl opacity-40 animate-pulse-subtle" />

      {/* Styled Browser Container */}
      <div className="relative bg-surface-lowest rounded-3xl shadow-2xl border border-brand-100 overflow-hidden transform md:-rotate-1 hover:rotate-0 transition-transform duration-500">
        
        {/* Browser Chrome Bar */}
        <div className="bg-surface-container-high px-4 py-3 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>

          <div className="px-6 py-1 bg-surface-lowest rounded-full text-xs text-stoneText-muted font-mono flex items-center gap-1.5 shadow-inner">
            <span className="text-emerald-500 font-bold">https://</span>
            <span>app.terataihati.id/dashboard/{activeTab}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-100 text-brand-700 animate-pulse">
              <Sparkles size={12} /> Live Preview 🌸
            </span>
          </div>
        </div>

        {/* Dashboard Interior Layout */}
        <div className="flex flex-col md:flex-row min-h-[520px]">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-60 bg-surface-low border-r border-surface-container p-4 flex flex-col justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2 px-2 py-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center text-sm font-bold">
                  🌸
                </div>
                <div className="text-left">
                  <span className="font-bold text-stoneText block leading-none">TERATAI HATI</span>
                  <span className="text-[9px] uppercase font-bold text-brand-600 tracking-wider">Sanctuary</span>
                </div>
              </div>

              {/* Interactive Menu List */}
              <div className="space-y-1">
                {[
                  { id: 'beranda', label: 'Beranda', icon: Home },
                  { id: 'checkin', label: 'Check-in', icon: Heart, badge: 'Harian' },
                  { id: 'companion', label: 'AI Companion', icon: MessageSquare, badge: 'CBT' },
                  { id: 'journal', label: 'Jurnal', icon: BookOpen },
                  { id: 'analytics', label: 'Analitik', icon: BarChart3 },
                  { id: 'wellness', label: 'Wellness', icon: Wind },
                  { id: 'achievements', label: 'Pencapaian', icon: Trophy },
                  { id: 'settings', label: 'Pengaturan', icon: Settings },
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-brand-600 text-white shadow-soft font-bold scale-[1.02]'
                          : 'text-stoneText-calm hover:bg-surface-container hover:text-stoneText'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className={isActive ? 'text-white' : 'text-stoneText-muted'} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && !isActive && (
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-brand-100 text-brand-700 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom User Card */}
            <div className="pt-3 border-t border-surface-container space-y-2">
              <div className="flex items-center justify-between px-3 py-1.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 text-[11px] font-semibold">
                <span className="flex items-center gap-1">
                  <Flame size={14} className="text-amber-500 fill-amber-500" /> 12 Hari Streak
                </span>
                <span className="text-[9px] bg-amber-200 px-1 py-0.2 rounded-full">🔥 Top 5%</span>
              </div>

              <div className="flex items-center gap-2 px-2 text-left">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                  alt="Sari Dewi"
                  className="w-7 h-7 rounded-full border border-brand-200 object-cover"
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-stoneText truncate">Sari Dewi</p>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-brand-100 text-brand-700 font-semibold inline-block capitalize">
                    {planTier} Member ✨
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Frame based on activeTab */}
          <div className="flex-1 p-5 sm:p-6 bg-surface-lowest overflow-y-auto max-h-[540px]">
            
            {/* 1. BERANDA TAB */}
            {activeTab === 'beranda' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-stoneText">Halo, Sari 🌸</h3>
                    <p className="text-xs text-stoneText-muted">Bagaimana perasaanmu hari ini? Ambil sejenak untuk refleksi.</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                    <Check size={14} /> Tuntas Check-in Hari Ini 🎉
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brand-50 via-purple-50 to-roseAcc-50 p-4 rounded-3xl border border-brand-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-brand-700">Daily Mood Check-in</span>
                    <span className="text-[10px] text-stoneText-muted">Klik emoji untuk memilih ✨</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {moods.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMood(m.id)}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all ${
                          selectedMood === m.id 
                            ? `${m.border} scale-105 shadow-md font-bold ring-2 ring-brand-400` 
                            : 'bg-white border-surface-container hover:scale-102 text-stoneText-calm'
                        }`}
                      >
                        <span className="text-2xl mb-1">{m.emoji}</span>
                        <span className="text-[10px] text-center">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-roseAcc-100 to-brand-50 p-4 rounded-3xl border border-roseAcc-200 flex flex-col justify-between space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-white/70 px-2 py-0.5 rounded-full self-start">
                      Affirmasi Hari Ini ✨
                    </span>
                    <p className="text-xs font-medium text-stoneText-calm italic leading-relaxed">
                      "Kamu sudah melakukan yang terbaik hari ini. Itu cukup. Beri ruang untuk dirimu bernapas."
                    </p>
                    <span className="text-[10px] text-stoneText-muted pt-1">Kategori: Self-Love</span>
                  </div>

                  <div className="bg-surface-low p-4 rounded-3xl border border-surface-container flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-stoneText">Tren Mood (7 Hari)</span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
                    </div>
                    <div className="flex items-end justify-between h-16 px-1 pt-2">
                      {[60, 75, 40, 80, 90, 95, 85].map((val, idx) => (
                        <div key={idx} className="w-4 rounded-t bg-brand-500" style={{ height: `${val}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CHECK-IN TAB */}
            {activeTab === 'checkin' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="flex items-center justify-between border-b border-surface-container pb-2">
                  <span className="text-xs font-bold uppercase text-brand-600">Simulasi Check-in Harian (Step {checkinStep} dari 3)</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <button 
                        key={i} 
                        onClick={() => setCheckinStep(i)}
                        className={`w-5 h-5 rounded-full text-[10px] font-bold ${checkinStep === i ? 'bg-brand-600 text-white' : 'bg-surface-container text-stoneText-muted'}`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                {checkinStep === 1 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-stoneText text-sm">Bagaimana perasaanmu hari ini?</h4>
                    <div className="space-y-2">
                      {moods.map(m => (
                        <button
                          key={m.id}
                          onClick={() => { setSelectedMood(m.id); setCheckinStep(2); }}
                          className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                            selectedMood === m.id ? 'bg-brand-50 border-brand-500 font-bold' : 'bg-white border-surface-container'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{m.emoji}</span>
                            <span className="text-xs font-semibold">{m.label}</span>
                          </div>
                          {selectedMood === m.id && <Check size={16} className="text-brand-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {checkinStep === 2 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-stoneText text-sm">Apa yang paling mempengaruhi harimu?</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {factorsList.map(f => {
                        const isSel = demoFactors.includes(f.id);
                        return (
                          <button
                            key={f.id}
                            onClick={() => {
                              if (isSel) setDemoFactors(demoFactors.filter(x=>x!==f.id));
                              else setDemoFactors([...demoFactors, f.id]);
                            }}
                            className={`p-2.5 rounded-xl border text-left text-xs flex items-center gap-2 ${
                              isSel ? 'bg-brand-600 text-white font-bold' : 'bg-white border-surface-container'
                            }`}
                          >
                            <span>{f.icon}</span>
                            <span>{f.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <button onClick={() => setCheckinStep(3)} className="w-full py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">
                      Lanjut ke Refleksi 🌸
                    </button>
                  </div>
                )}

                {checkinStep === 3 && (
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-brand-900 italic">
                      "Apa hal kecil yang bisa bikin harimu terasa 1% lebih baik?"
                    </div>
                    <textarea 
                      rows={3}
                      placeholder="Cerita singkat di sini..." 
                      className="w-full p-3 rounded-2xl bg-surface-warm border border-surface-container text-xs focus:outline-none"
                    />
                    <button 
                      onClick={() => alert('Simpan Check-in berhasil dimasukkan ke demo! 🎉')} 
                      className="w-full py-2.5 bg-brand-600 text-white rounded-2xl text-xs font-bold shadow-sm"
                    >
                      Simpan Check-in 🎉
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. AI COMPANION TAB */}
            {activeTab === 'companion' && (
              <div className="space-y-3 animate-fade-in text-left flex flex-col h-full">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <h4 className="font-bold text-xs text-stoneText">Teratai AI Companion (CBT Mode)</h4>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">● Online 24/7</span>
                </div>

                <div className="space-y-3 my-2 max-h-[300px] overflow-y-auto pr-1">
                  {demoChat.map((m, idx) => (
                    <div key={idx} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.sender === 'ai' && <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs shrink-0">🤖</div>}
                      <div className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${m.sender === 'user' ? 'bg-brand-600 text-white' : 'bg-surface-low border border-surface-container text-stoneText-calm'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-surface-container">
                  {['Aku mau cerita lebih', 'Butuh latihan napas'].map((qr, i) => (
                    <button key={i} onClick={() => handleSendDemoChat(qr)} className="text-[10px] px-2.5 py-1 bg-brand-50 text-brand-800 rounded-full border border-brand-200 font-medium">
                      {qr}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendDemoChat()}
                    placeholder="Tulis cerita di sini..."
                    className="flex-1 px-3 py-2 rounded-xl bg-surface-warm border border-surface-container text-xs focus:outline-none"
                  />
                  <button onClick={() => handleSendDemoChat()} className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">Kirim</button>
                </div>
              </div>
            )}

            {/* 4. JURNAL TAB */}
            {activeTab === 'journal' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-stoneText">Catatan Jurnal Refleksi</h4>
                  <button onClick={() => onNavigate('register')} className="px-3 py-1.5 bg-brand-600 text-white rounded-xl text-xs font-bold flex items-center gap-1">
                    <Plus size={14} /> Tulis Jurnal
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { title: 'Refleksi Pencapaian Bulan Ini', date: '31 Jul 2026', mood: '🙂 Baik', text: 'Aku sadar kalau bulan ini aku jauh lebih stabil secara emosional. Belajar untuk tidak langsung bereaksi saat ada beban kerja berlebih.', tag: '#kerjaan #goals' },
                    { title: 'Menyikapi Rasa Lelah', date: '28 Jul 2026', mood: '😔 Kurang Baik', text: 'Revisi kerjaan emang kadang bikin kesal. Tapi malam ini aku mencoba grounding exercise dan pernapasan 4-7-8.', tag: '#tidur #kesehatan' }
                  ].map((j, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-surface-low border border-surface-container space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-brand-900">{j.title}</span>
                        <span className="text-[10px] text-stoneText-muted">{j.date}</span>
                      </div>
                      <p className="text-xs text-stoneText-calm line-clamp-2">{j.text}</p>
                      <span className="text-[10px] text-brand-600 font-semibold">{j.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. ANALITIK TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-stoneText">Analitik & Mood Heatmap</h4>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Avg 4.1/5</span>
                </div>

                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-brand-900 italic">
                  "🤖 AI Weekly Insight: Minggu ini mood kamu rata-rata Baik! Kerjaan paling sering bikin mood turun di hari Rabu."
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-stoneText">Mood Heatmap Kalender (Juli 2026)</span>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }, (_, i) => (
                      <div key={i} className={`h-6 rounded text-[9px] font-bold flex items-center justify-center text-white ${[4,5,3,2,4,5,5,4,3,5,4,4,5,2,3,4,5,5,4,3,4,5,4,5,3,4,5,5][i] >= 4 ? 'bg-emerald-400' : 'bg-orange-300'}`}>
                        {i+1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. WELLNESS TAB */}
            {activeTab === 'wellness' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="p-5 bg-gradient-to-r from-brand-900 to-purple-900 text-white rounded-3xl space-y-3 text-center">
                  <h4 className="font-bold text-sm">🫁 Interactive Box Breathing</h4>
                  <div className="w-24 h-24 mx-auto rounded-full bg-brand-500/30 flex flex-col items-center justify-center text-white font-bold border-2 border-brand-300 animate-pulse">
                    <span className="text-2xl font-mono">{breathTimer}</span>
                    <span className="text-[9px]">Inhale...</span>
                  </div>
                  <button 
                    onClick={() => setBreathingActive(!breathingActive)} 
                    className="px-5 py-1.5 bg-white text-brand-950 font-bold rounded-xl text-xs"
                  >
                    {breathingActive ? 'Pause' : 'Mulai Latihan Napas'}
                  </button>
                </div>
              </div>
            )}

            {/* 7. PENCAPAIAN TAB */}
            {activeTab === 'achievements' && (
              <div className="space-y-4 animate-fade-in text-left">
                <h4 className="font-bold text-sm text-stoneText">Pencapaian & Badge (3 Terbuka)</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Langkah Pertama', emoji: '🌱', unlocked: true },
                    { name: '7 Hari Berturut', emoji: '🔥', unlocked: true },
                    { name: '30 Hari Perjalanan', emoji: '💎', unlocked: false, prog: '12/30' },
                    { name: 'Teman Curhat', emoji: '🤝', unlocked: true },
                  ].map((b, i) => (
                    <div key={i} className={`p-3 rounded-2xl border text-xs space-y-1 ${b.unlocked ? 'bg-amber-50 border-amber-300' : 'bg-surface-low border-surface-container opacity-60'}`}>
                      <div className="text-2xl">{b.emoji}</div>
                      <div className="font-bold text-stoneText">{b.name}</div>
                      <span className="text-[10px] text-stoneText-muted">{b.unlocked ? '✨ Terbuka' : `🔒 ${b.prog}`}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. PENGATURAN TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-4 animate-fade-in text-left">
                <h4 className="font-bold text-sm text-stoneText">Pengaturan Akun & Membership</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-surface-warm rounded-xl border flex justify-between items-center">
                    <span>Pengingat Check-in Harian</span>
                    <span className="font-bold text-brand-600">20:00 WIB</span>
                  </div>
                  <div className="p-3 bg-brand-50 rounded-xl border border-brand-200 flex justify-between items-center">
                    <span>Membership Status</span>
                    <button onClick={() => setPlanTier(planTier === 'pro' ? 'free' : 'pro')} className="px-3 py-1 bg-brand-600 text-white rounded-lg font-bold text-[10px]">
                      {planTier === 'pro' ? 'Pro Member ✨' : 'Switch to Pro'}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

