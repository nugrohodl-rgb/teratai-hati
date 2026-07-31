import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigate }) {
  const { isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-surface/90 backdrop-blur-md border-b border-surface-container-high shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-brand-300 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
            <span className="text-xl">🌸</span>
          </div>
          <div>
            <span className="font-bold text-lg sm:text-xl text-stoneText tracking-tight block">
              TERATAI HATI
            </span>
            <span className="text-[10px] uppercase font-semibold text-brand-600 tracking-wider hidden sm:block">
              Sanctuary
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-stoneText-calm">
          <a href="#fitur" className="hover:text-brand-600 transition-colors">Fitur</a>
          <a href="#demo" className="hover:text-brand-600 transition-colors flex items-center gap-1">
            <span>Demo</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-brand-100 text-brand-700 font-semibold">Live</span>
          </a>
          <a href="#testimoni" className="hover:text-brand-600 transition-colors">Kisah</a>
          <a href="#harga" className="hover:text-brand-600 transition-colors">Harga</a>
          <a href="#faq" className="hover:text-brand-600 transition-colors">FAQ</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-soft hover:shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Ke Dashboard 🚀
              </button>
              <button
                onClick={logout}
                className="px-3 py-2 text-stoneText-muted hover:text-stoneText text-sm font-medium transition-colors"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-stoneText-calm hover:text-brand-600 font-medium text-sm transition-colors"
              >
                Masuk
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-soft hover:shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
              >
                <Sparkles size={15} />
                <span>Mulai Gratis</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-stoneText hover:text-brand-600 rounded-xl"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-lowest/98 backdrop-blur-xl border-b border-surface-container-high px-6 py-6 space-y-4 animate-fade-in shadow-soft-lg">
          <nav className="flex flex-col space-y-3 font-medium text-stoneText-calm text-base">
            <a href="#fitur" onClick={() => setMobileOpen(false)}>Fitur</a>
            <a href="#demo" onClick={() => setMobileOpen(false)}>Demo Interaktif</a>
            <a href="#testimoni" onClick={() => setMobileOpen(false)}>Testimoni</a>
            <a href="#harga" onClick={() => setMobileOpen(false)}>Harga Plan</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
          </nav>
          <div className="pt-4 border-t border-surface-container flex flex-col gap-2.5">
            {isAuthenticated ? (
              <button
                onClick={() => { setMobileOpen(false); onNavigate('dashboard'); }}
                className="w-full py-3 rounded-2xl bg-brand-600 text-white font-semibold text-center"
              >
                Ke Dashboard 🚀
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setMobileOpen(false); onNavigate('login'); }}
                  className="w-full py-3 rounded-2xl bg-surface-container text-stoneText font-semibold text-center"
                >
                  Masuk Akun
                </button>
                <button
                  onClick={() => { setMobileOpen(false); onNavigate('register'); }}
                  className="w-full py-3 rounded-2xl bg-brand-600 text-white font-semibold text-center shadow-soft"
                >
                  Mulai Gratis 🌸
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
