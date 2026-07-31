import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  User, Bell, Shield, CreditCard, Sparkles, Check, Download, Trash2, Save 
} from 'lucide-react';

export default function SettingsPage() {
  const { user, updateProfile, setPlanTier } = useAuth();
  const { checkins, journals } = useApp();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'reminder' | 'plan' | 'privacy'

  // Profile Form
  const [fullName, setFullName] = useState(user?.full_name || 'Sari Dewi');
  const [email, setEmail] = useState(user?.email || 'sari.dewi@terataihati.id');
  const [timeZone, setTimeZone] = useState(user?.time_zone || 'Asia/Jakarta');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Reminder Form
  const [reminderEnabled, setReminderEnabled] = useState(user?.daily_reminder_enabled ?? true);
  const [reminderTime, setReminderTime] = useState(user?.reminder_time || '20:00');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      email,
      time_zone: timeZone,
      daily_reminder_enabled: reminderEnabled,
      reminder_time: reminderTime
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportData = () => {
    const dataObj = {
      profile: user,
      checkins,
      journals,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", `teratai_hati_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetAccount = () => {
    if (confirm('Apakah kamu yakin ingin menghapus seluruh data check-in dan jurnal secara permanen? Action ini tidak bisa dibatalkan.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stoneText">Pengaturan Akun & Privasi</h2>
        <p className="text-xs sm:text-sm text-stoneText-muted">
          Kelola informasi diri, notifikasi pengingat, dan keanggotaan plan kamu.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex bg-surface-container p-1 rounded-2xl border border-surface-container-high overflow-x-auto">
        {[
          { id: 'profile', label: 'Profil Diri', icon: User },
          { id: 'reminder', label: 'Pengingat Check-in', icon: Bell },
          { id: 'plan', label: 'Paket Membership', icon: CreditCard },
          { id: 'privacy', label: 'Privasi & Data', icon: Shield },
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                isActive 
                  ? 'bg-white text-brand-900 shadow-sm' 
                  : 'text-stoneText-calm hover:text-stoneText'
              }`}
            >
              <Icon size={16} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <Check size={16} /> Pengaturan berhasil disimpan! ✨
        </div>
      )}

      {/* ────────────────── TAB 1: PROFIL DIRI ────────────────── */}
      {activeTab === 'profile' && (
        <div className="bg-surface-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-soft max-w-2xl space-y-6 animate-fade-in">
          <h3 className="font-bold text-stoneText text-lg">Informasi Profil</h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stoneText-calm mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stoneText-calm mb-1">Alamat Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stoneText-calm mb-1">Zona Waktu Default</label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500"
              >
                <option value="Asia/Jakarta">WIB — Asia/Jakarta (GMT+7)</option>
                <option value="Asia/Makassar">WITA — Asia/Makassar (GMT+8)</option>
                <option value="Asia/Jayapura">WIT — Asia/Jayapura (GMT+9)</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save size={16} />
              <span>Simpan Perubahan</span>
            </button>
          </form>
        </div>
      )}

      {/* ────────────────── TAB 2: REMINDER ────────────────── */}
      {activeTab === 'reminder' && (
        <div className="bg-surface-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-soft max-w-2xl space-y-6 animate-fade-in">
          <h3 className="font-bold text-stoneText text-lg">Pengingat Check-in Harian</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-warm border border-surface-container-high">
              <div>
                <h4 className="font-bold text-stoneText text-sm">Aktifkan Notifikasi Pengingat</h4>
                <p className="text-xs text-stoneText-muted">Terima reminder lembut untuk meluangkan waktu check-in.</p>
              </div>
              <button
                type="button"
                onClick={() => setReminderEnabled(!reminderEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  reminderEnabled ? 'bg-brand-600' : 'bg-surface-container-highest'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  reminderEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {reminderEnabled && (
              <div>
                <label className="block text-xs font-bold text-stoneText-calm mb-1">Pilih Jam Reminder</label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>
            )}

            <button
              onClick={handleSaveProfile}
              className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save size={16} />
              <span>Simpan Jam Pengingat</span>
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── TAB 3: PLAN SWITCHER SIMULATOR ────────────────── */}
      {activeTab === 'plan' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-600 to-purple-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-200 tracking-wider">Status Keanggotaan Saat Ini</span>
              <h3 className="text-2xl font-extrabold capitalize">{user?.plan_tier || 'Free'} Member ✨</h3>
              <p className="text-xs text-brand-100 mt-1">Nikmati seluruh fitur TERATAI HATI sesuai tier paketmu.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Free */}
            <div className={`p-6 rounded-3xl border-2 bg-surface-lowest flex flex-col justify-between space-y-4 ${
              user?.plan_tier === 'free' ? 'border-brand-500 ring-2 ring-brand-300' : 'border-surface-container'
            }`}>
              <div className="space-y-2">
                <h4 className="font-bold text-stoneText">Free Plan</h4>
                <div className="text-2xl font-extrabold text-stoneText">Rp0</div>
                <p className="text-xs text-stoneText-muted">Check-in mood & 5 chat AI / hari</p>
              </div>
              <button
                onClick={() => setPlanTier('free')}
                className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-stoneText text-xs font-bold"
              >
                {user?.plan_tier === 'free' ? 'Plan Aktif Saat Ini' : 'Pindah ke Free'}
              </button>
            </div>

            {/* Pro */}
            <div className={`p-6 rounded-3xl border-2 bg-brand-50/50 flex flex-col justify-between space-y-4 ${
              user?.plan_tier === 'pro' ? 'border-brand-600 ring-2 ring-brand-300' : 'border-brand-300'
            }`}>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-brand-700 bg-brand-100 px-2 py-0.5 rounded-full">Rekomendasi</span>
                <h4 className="font-bold text-stoneText">Pro Plan</h4>
                <div className="text-2xl font-extrabold text-brand-700">Rp25.000 <span className="text-xs text-stoneText-muted font-normal">/ bln</span></div>
                <p className="text-xs text-stoneText-muted">Unlimited AI Chat, Heatmap 90-hari, PDF Export</p>
              </div>
              <button
                onClick={() => setPlanTier('pro')}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm"
              >
                {user?.plan_tier === 'pro' ? 'Plan Aktif Saat Ini ✨' : 'Simulasi Upgrade Pro'}
              </button>
            </div>

            {/* Lifetime */}
            <div className={`p-6 rounded-3xl border-2 bg-amber-50/40 flex flex-col justify-between space-y-4 ${
              user?.plan_tier === 'lifetime' ? 'border-amber-500 ring-2 ring-amber-300' : 'border-amber-200'
            }`}>
              <div className="space-y-2">
                <h4 className="font-bold text-stoneText">Lifetime Plan</h4>
                <div className="text-2xl font-extrabold text-amber-900">Rp249.000 <span className="text-xs text-stoneText-muted font-normal">/ sekali</span></div>
                <p className="text-xs text-stoneText-muted">Akses selamanya tanpa biaya bulanan</p>
              </div>
              <button
                onClick={() => setPlanTier('lifetime')}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm"
              >
                {user?.plan_tier === 'lifetime' ? 'Plan Aktif Saat Ini VIP' : 'Simulasi Beli Lifetime'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ────────────────── TAB 4: PRIVASI & EKSPOR DATA ────────────────── */}
      {activeTab === 'privacy' && (
        <div className="bg-surface-lowest p-6 sm:p-8 rounded-3xl border border-surface-container shadow-soft max-w-2xl space-y-6 animate-fade-in">
          <h3 className="font-bold text-stoneText text-lg">Manajemen Privasi & Hak Data</h3>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-surface-warm border border-surface-container-high space-y-2">
              <h4 className="font-bold text-stoneText text-sm flex items-center gap-2">
                <Download size={16} className="text-brand-600" /> Ekspor Semua Catatan & Data (JSON)
              </h4>
              <p className="text-xs text-stoneText-muted">
                Unduh seluruh arsip check-in mood dan catatan jurnal refleksi kamu ke dalam format file backup JSON.
              </p>
              <button
                onClick={handleExportData}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold"
              >
                Unduh File Data (.json)
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-roseAcc-50 border border-roseAcc-200 space-y-2">
              <h4 className="font-bold text-rose-950 text-sm flex items-center gap-2">
                <Trash2 size={16} className="text-rose-600" /> Hapus Semua Data Akun
              </h4>
              <p className="text-xs text-rose-800">
                Tindakan ini akan menghapus seluruh data check-in, jurnal, dan riwayat chat secara permanen dari perangkatmu.
              </p>
              <button
                onClick={handleResetAccount}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Hapus Seluruh Data Saya
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
