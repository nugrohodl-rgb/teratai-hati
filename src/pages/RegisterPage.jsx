import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function RegisterPage({ onNavigate }) {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMsg('Mohon lengkapi semua kolom pendaftaran 🌸');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      register(fullName, email, password);
      setIsLoading(false);
      onNavigate('dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row font-sans text-stoneText">
      
      {/* Left Branding Panel (40% Desktop) */}
      <div className="hidden md:flex md:w-5/12 bg-gradient-to-tr from-brand-600 via-brand-500 to-purple-800 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-10 -left-10 w-72 h-72 bg-brand-300/20 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-10 -right-10 w-80 h-80 bg-roseAcc-300/20 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '3s' }} />

        <div 
          onClick={() => onNavigate('landing')} 
          className="flex items-center gap-3 cursor-pointer group z-10"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold group-hover:scale-105 transition-transform">
            🌸
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight block">TERATAI HATI</span>
            <span className="text-xs text-brand-200 font-medium">Ruang aman untuk perjalananmu</span>
          </div>
        </div>

        <div className="space-y-8 z-10 my-auto py-12">
          <h2 className="text-3xl font-extrabold leading-tight">
            Mulai perjalanan mengenal diri hari ini 🌸
          </h2>

          <div className="space-y-4 text-sm text-brand-100/90 font-medium">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white text-xs">
                <Check size={14} />
              </div>
              <span>Gratis selamanya tanpa memerlukan kartu kredit</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white text-xs">
                <Check size={14} />
              </div>
              <span>Tidak ada judgment — privasi data terjamin</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white text-xs">
                <Check size={14} />
              </div>
              <span>Satu klik setup langsung aktif dalam 2 menit</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs italic leading-relaxed text-brand-50">
            "Sangat membantu di saat-saat penat. Rasanya seperti punya teman yang selalu paham."
            <div className="mt-2 text-right not-italic font-semibold text-white/90">— Dina, Jakarta</div>
          </div>
        </div>

        <div className="text-xs text-brand-200/60 z-10">
          © TERATAI HATI • Teman Setia Kesehatan Mentalmu
        </div>
      </div>

      {/* Right Form Panel (60% Desktop) */}
      <div className="flex-1 bg-surface-lowest p-6 sm:p-12 md:p-16 flex flex-col justify-between">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stoneText-muted hover:text-brand-600 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Halaman Utama
          </button>

          <div className="flex md:hidden items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="font-bold text-base text-stoneText">TERATAI HATI</span>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-8 space-y-6">
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stoneText">Buat Akun Gratis</h1>
            <p className="text-xs sm:text-sm text-stoneText-muted">
              Isi data singkat untuk mulai perjalanan kesehatan mentalmu.
            </p>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={() => {
              setFullName('Sahabat Teratai');
              setEmail('user@terataihati.id');
              setPassword('password123');
              handleSubmit({ preventDefault: () => {} });
            }}
            className="w-full py-3 px-4 rounded-2xl border border-surface-container-high bg-white hover:bg-surface-container text-stoneText-calm font-semibold text-xs sm:text-sm flex items-center justify-center gap-3 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Daftar dengan Google</span>
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-surface-container w-full" />
            <span className="bg-surface-lowest px-3 text-[11px] font-medium text-stoneText-muted uppercase tracking-wider shrink-0">
              atau isi data email
            </span>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-roseAcc-50 border border-roseAcc-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-stoneText-calm mb-1.5">Nama Lengkap / Panggilan</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="misal: Sari Dewi"
                className="w-full px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-stoneText text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stoneText-calm mb-1.5">Alamat Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-stoneText text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stoneText-calm mb-1.5">Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-3 rounded-2xl bg-surface-warm border border-surface-container-high text-stoneText text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? 'Membuat Akun...' : 'Daftar Sekarang — Gratis 🌸'}
            </button>
          </form>

          <p className="text-center text-xs text-stoneText-muted">
            Sudah punya akun?{' '}
            <button 
              onClick={() => onNavigate('login')}
              className="font-bold text-brand-600 hover:underline"
            >
              Masuk di sini
            </button>
          </p>

        </div>

        <div className="text-center text-[11px] text-stoneText-muted">
          Dengan mendaftar, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi TERATAI HATI.
        </div>

      </div>

    </div>
  );
}
