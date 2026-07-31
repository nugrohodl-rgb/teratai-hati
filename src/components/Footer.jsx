import React from 'react';
import { Heart, ShieldAlert } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#1F192F] text-surface-lowest pt-16 pb-12 border-t border-brand-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-lg font-bold">
                🌸
              </div>
              <span className="font-bold text-xl tracking-tight text-white">TERATAI HATI</span>
            </div>
            <p className="text-xs text-brand-200/80 leading-relaxed">
              Teman setia untuk perjalanan kesehatan mentalmu. Menemanimu melacak emosi, mengenali pola diri, dan menemukan ketenangan.
            </p>
            <p className="text-xs text-roseAcc-300 font-medium italic flex items-center gap-1">
              "Karena kamu layak dipahami — termasuk oleh dirimu sendiri 💜"
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300">Fitur Utama</h4>
            <ul className="space-y-2 text-xs text-brand-100/70">
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Daily Check-in Mood</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">AI Companion CBT</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Analitik & Mood Heatmap</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Wellness & Box Breathing</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Jurnal Refleksi & Gratitude</button></li>
            </ul>
          </div>

          {/* Column 3: Tentang & Komunitas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300">Sanctuary</h4>
            <ul className="space-y-2 text-xs text-brand-100/70">
              <li><a href="#fitur" className="hover:text-white transition-colors">Filosofi Desain Soft-Minimalism</a></li>
              <li><a href="#testimoni" className="hover:text-white transition-colors">Kisah Komunitas</a></li>
              <li><a href="#harga" className="hover:text-white transition-colors">Rencana Keanggotaan Pro</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Pertanyaan Umum (FAQ)</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Kontak */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-300">Privasi & Keamanan</h4>
            <ul className="space-y-2 text-xs text-brand-100/70">
              <li><a href="#privacy" className="hover:text-white transition-colors">Kebijakan Privasi Data</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Syarat & Ketentuan Layanan</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Keamanan Terenkripsi</a></li>
              <li><a href="mailto:dukungan@terataihati.id" className="hover:text-white transition-colors">Hubungi Tim Dukungan</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer Banner (Mandatory Mental Health Disclaimer) */}
        <div className="mt-8 p-4 rounded-2xl bg-brand-950/60 border border-brand-800/60 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-roseAcc-300 text-xs font-bold">
            <ShieldAlert size={16} /> Disclaimer Penting Kesehatan Mental
          </div>
          <p className="text-[11px] text-brand-200/70 max-w-3xl mx-auto leading-relaxed">
            TERATAI HATI bukan pengganti layanan kesehatan mental profesional, konseling, atau medis. Jika kamu atau orang terdekat sedang berada dalam krisis mendesak atau pikiran menyakiti diri, mohon hubungi layanan darurat <span className="text-white font-bold underline">119 ext 8 (Into The Light Indonesia / Kemenkes RI)</span> atau datangi fasilitas medis terdekat.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-brand-200/40">
          © {new Date().getFullYear()} TERATAI HATI. Hak Cipta Dilindungi. Dibuat dengan cinta untuk kesehatan mental Indonesia.
        </div>

      </div>
    </footer>
  );
}
