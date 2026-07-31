import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart3, Calendar, Sparkles, TrendingUp, AlertTriangle, ArrowRight, Flame, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell } from 'recharts';

export default function AnalyticsPage({ onSelectTab }) {
  const { user } = useAuth();
  const { checkins, isRedFlagActive, MOOD_LEVELS } = useApp();

  const [period, setPeriod] = useState('7'); // '7' | '30' | '90'
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 6, 1)); // July 2026

  // Prepare chart data based on period
  const limitDays = parseInt(period, 10);
  const chartData = checkins.slice(0, limitDays).reverse().map(c => {
    return {
      date: new Date(c.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      score: c.moodScore,
      mood: c.moodLabel,
    };
  });

  // Calculate average score
  const avgScore = chartData.length > 0 
    ? (chartData.reduce((acc, curr) => acc + curr.score, 0) / chartData.length).toFixed(1)
    : '4.0';

  const strokeColor = Number(avgScore) >= 3.5 ? '#10B981' : Number(avgScore) >= 2.5 ? '#F59E0B' : '#EF4444';

  // Trigger analysis counts
  const positiveTriggers = [
    { name: 'Momen Spesial', count: 8, color: '#10B981' },
    { name: 'Hubungan', count: 6, color: '#3B82F6' },
    { name: 'Tidur Cukup', count: 5, color: '#8B5CF6' },
  ];

  const negativeTriggers = [
    { name: 'Kerjaan', count: 8, color: '#FB923C' },
    { name: 'Kurang Tidur', count: 4, color: '#EF4444' },
    { name: 'Keuangan', count: 3, color: '#F59E0B' },
  ];

  // Calendar Heatmap Days (31 days mock grid for July 2026)
  const daysInMonth = 31;
  const heatmapData = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-07-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    const found = checkins.find(c => c.date === dateStr);
    return {
      day: dayNum,
      date: dateStr,
      score: found ? found.moodScore : Math.floor(Math.random() * 5) + 1,
      mood: found ? found.moodLabel : 'Baik'
    };
  });

  const getHeatmapColor = (score) => {
    switch (score) {
      case 5: return 'bg-emerald-500 text-white';
      case 4: return 'bg-emerald-300 text-emerald-950';
      case 3: return 'bg-amber-300 text-amber-950';
      case 2: return 'bg-orange-400 text-white';
      case 1: return 'bg-rose-500 text-white';
      default: return 'bg-surface-container text-stoneText-muted';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header & Period Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stoneText">Analitik & Insights Mood</h2>
          <p className="text-xs sm:text-sm text-stoneText-muted">
            Memahami pola emosi harianmu melalui visualisasi data intuitif.
          </p>
        </div>

        {/* Toggle 7 / 30 / 90 days */}
        <div className="inline-flex p-1 bg-surface-container rounded-2xl border border-surface-container-high shrink-0">
          {['7', '30', '90'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                period === p 
                  ? 'bg-brand-600 text-white shadow-sm' 
                  : 'text-stoneText-calm hover:text-stoneText'
              }`}
            >
              {p} Hari
            </button>
          ))}
        </div>
      </div>

      {/* Red Flag Alert Card if low mood 3 days */}
      {isRedFlagActive && (
        <div className="p-5 rounded-3xl bg-roseAcc-50 border border-roseAcc-300 shadow-soft flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-rose-600 shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-rose-950 text-sm">Red Flag Alert: Suasana Hati Membutuhkan Perhatian</h4>
              <p className="text-xs text-rose-800">Kamu mencatat mood kurang baik selama 3 hari berturut-turut. AI Companion siap mendengarkan.</p>
            </div>
          </div>
          <button 
            onClick={() => onSelectTab('companion')}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shrink-0 hover:bg-rose-700"
          >
            Ngobrol Sekarang
          </button>
        </div>
      )}

      {/* AI Weekly Insight Card */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-700 p-6 sm:p-8 rounded-3xl text-white shadow-soft-lg space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-amber-300" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-200">Weekly AI Insight</span>
        </div>
        <p className="text-base sm:text-lg font-medium leading-relaxed italic">
          "Minggu ini mood kamu rata-rata <strong className="text-amber-300 underline font-bold">🙂 Baik ({avgScore}/5)</strong> — naik 12% dari minggu lalu! Hari Rabu terasa sedikit berat karena Kerjaan, tapi kamu tetap konsisten check-in 7 hari 🔥 Satu saran minggu depan: luangkan 10 menit setiap Rabu pagi untuk latihan pernapasan."
        </p>
        <div className="pt-2 flex justify-between items-center text-xs text-brand-200">
          <span>Diperbarui otomatis setiap Minggu malam</span>
          <button onClick={() => onSelectTab('companion')} className="font-bold text-white hover:underline flex items-center gap-1">
            <span>Diskusi dengan AI</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 4 Stats Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-lowest p-5 rounded-3xl border border-surface-container shadow-soft">
          <span className="text-[11px] font-bold text-stoneText-muted uppercase">Rata-Rata Mood</span>
          <div className="text-2xl font-extrabold text-stoneText mt-1 flex items-baseline gap-2">
            <span>{avgScore} / 5</span>
            <span className="text-xs font-bold text-emerald-600">+0.4</span>
          </div>
          <span className="text-[10px] text-stoneText-muted">vs 30 hari sebelumnya</span>
        </div>

        <div className="bg-surface-lowest p-5 rounded-3xl border border-surface-container shadow-soft">
          <span className="text-[11px] font-bold text-stoneText-muted uppercase">Current Streak</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1 flex items-center gap-1">
            <Flame size={20} className="fill-amber-500" />
            <span>{user?.streak_count || 12} Hari</span>
          </div>
          <span className="text-[10px] text-stoneText-muted">Longest: 18 hari</span>
        </div>

        <div className="bg-surface-lowest p-5 rounded-3xl border border-surface-container shadow-soft">
          <span className="text-[11px] font-bold text-stoneText-muted uppercase">Total Check-in</span>
          <div className="text-2xl font-extrabold text-stoneText mt-1">
            {checkins.length} Hari
          </div>
          <span className="text-[10px] text-stoneText-muted">Konsistensi 95%</span>
        </div>

        <div className="bg-surface-lowest p-5 rounded-3xl border border-surface-container shadow-soft">
          <span className="text-[11px] font-bold text-stoneText-muted uppercase">Waktu Check-in Utama</span>
          <div className="text-2xl font-extrabold text-brand-600 mt-1">
            Malam 🌙
          </div>
          <span className="text-[10px] text-stoneText-muted">Rata-rata 20:15 WIB</span>
        </div>
      </div>

      {/* Main Mood Line Chart */}
      <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-stoneText text-base">Tren Fluktuasi Suasana Hati ({period} Hari Terakhir)</h3>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            <TrendingUp size={14} /> Stabil & Positif
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eeeeed" />
              <XAxis dataKey="date" stroke="#7b7486" fontSize={11} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#7b7486" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e8e8e7', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                formatter={(value, name, props) => [`Skor: ${value}/5 (${props.payload.mood})`, 'Mood']}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke={strokeColor} 
                strokeWidth={4} 
                dot={{ r: 5, fill: strokeColor }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mood Heatmap Calendar (GitHub Style) */}
      <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-brand-600" />
            <h3 className="font-bold text-stoneText text-base">Mood Heatmap Kalender</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-stoneText-calm">
            <button 
              onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
              className="p-1 hover:bg-surface-container rounded-lg"
            >
              <ChevronLeft size={16} />
            </button>
            <span>Juli 2026</span>
            <button 
              onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
              className="p-1 hover:bg-surface-container rounded-lg"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 gap-2 pt-2">
          {heatmapData.map((d) => (
            <div 
              key={d.day}
              className={`h-10 rounded-xl flex flex-col items-center justify-center text-xs font-bold cursor-pointer transition-transform hover:scale-110 shadow-sm ${getHeatmapColor(d.score)}`}
              title={`${d.date}: ${d.mood} (${d.score}/5)`}
            >
              <span className="text-[10px] opacity-75">{d.day}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-container text-xs text-stoneText-muted">
          <span>Intensitas Mood:</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px]">Buruk</span>
            <div className="w-4 h-4 rounded-md bg-rose-500" />
            <div className="w-4 h-4 rounded-md bg-orange-400" />
            <div className="w-4 h-4 rounded-md bg-amber-300" />
            <div className="w-4 h-4 rounded-md bg-emerald-300" />
            <div className="w-4 h-4 rounded-md bg-emerald-500" />
            <span className="text-[10px]">Sangat Baik</span>
          </div>
        </div>
      </div>

      {/* Top Triggers Analysis (Positive vs Negative) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Negative Triggers */}
        <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stoneText text-sm flex items-center gap-2">
              <span className="text-xl">😔</span> Top Trigger Mood Turun
            </h3>
            <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2.5 py-0.5 rounded-full">Perlu Perhatian</span>
          </div>
          <p className="text-xs text-stoneText-muted leading-relaxed">
            "Kerjaan paling sering bikin moodmu turun bulan ini (8 dari 12 hari kurang baik). Pertimbangkan untuk mengambil jeda istirahat pendek."
          </p>

          <div className="space-y-3 pt-2">
            {negativeTriggers.map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-stoneText">
                  <span>{t.name}</span>
                  <span>{t.count} hari</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: `${(t.count / 10) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Positive Triggers */}
        <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stoneText text-sm flex items-center gap-2">
              <span className="text-xl">😄</span> Top Trigger Mood Naik
            </h3>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">Pendorong Positif</span>
          </div>
          <p className="text-xs text-stoneText-muted leading-relaxed">
            "Momen Spesial & Hubungan terbukti paling konsisten meningkatkan kebahagiaanmu. Terus rawat interaksi positif ini."
          </p>

          <div className="space-y-3 pt-2">
            {positiveTriggers.map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-stoneText">
                  <span>{t.name}</span>
                  <span>{t.count} hari</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(t.count / 10) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
