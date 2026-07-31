import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InteractiveDashboardPreview from '../components/InteractiveDashboardPreview';
import { 
  Sparkles, Heart, Shield, ArrowRight, CheckCircle2, ChevronDown, 
  HelpCircle, Star, Users, MessageSquare, LineChart, Smile, Zap 
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Apakah TERATAI HATI bisa menggantikan terapi atau konseling profesional?",
      a: "Tidak. TERATAI HATI dirancang sebagai alat bantu refleksi diri harian, pertolongan pertama emosional, dan teman pendamping. Kami tidak menyediakan diagnosis medis atau terapi klinis. Untuk kondisi krisis atau gangguan klinis, kami menyarankan Anda menghubungi profesional kesehatan mental."
    },
    {
      q: "Apakah data jurnal dan catatanku aman dan privat?",
      a: "Sangat aman. Semua entri jurnal dan catatan emosi kamu disimpankan dalam enkripsi ketat. Kami memegang teguh komitmen bahwa perasaanmu adalah ruang privatmu — tidak akan pernah dijual atau dibagikan ke pihak ketiga."
    },
    {
      q: "Apa yang dimaksud dengan AI Companion berbasis CBT?",
      a: "AI Companion kami diprogram menggunakan prinsip-prinsip Cognitive Behavioral Therapy (CBT) dan mindfulness. AI membantu kamu menguraikan pikiran negatif (reframing), memberikan ruang ventilasi emosi, serta menawarkan latihan pernapasan saat kewalahan."
    },
    {
      q: "Apakah ada fitur khusus untuk situasi darurat atau krisis emosional?",
      a: "Ya, kami menyediakan tombol hotline krisis darurat langsung (119 ext 8 Into The Light Indonesia) serta fitur Red Flag Alert yang secara halus menyapa kamu jika mood kamu berada di tingkat rendah selama 3 hari berturut-turut."
    },
    {
      q: "Apa perbedaan antara akun Free dan akun Pro?",
      a: "Akun Free memberikan akses gratis selamanya untuk check-in harian, jurnal hingga 30 entri, grafik 7 hari, dan 5 pesan AI harian. Akun Pro (Rp25.000/bln) membuka AI Companion unlimited, jurnal tanpa batas, heatmap 90 hari, weekly AI insight personal, gratitude journal, dan ekspor laporan PDF."
    },
    {
      q: "Berapa lama data catatan emosiku disimpan?",
      a: "Data tersimpan selamanya di akunmu selama akun aktif, sehingga kamu dapat melihat kembali grafik perkembangan kesehatan mentalmu dari bulan ke bulan."
    },
    {
      q: "Bisakah saya menghapus semua data saya kapan saja?",
      a: "Tentu saja. Di halaman Settings akunmu, terdapat fitur 'Hapus Semua Data' satu-klik untuk menghapus seluruh riwayat check-in dan jurnal secara permanen."
    }
  ];

  return (
    <div className="min-h-screen bg-surface font-sans text-stoneText">
      {/* Sticky Header Navbar */}
      <Navbar onNavigate={onNavigate} />

      {/* ────────────────── 1. HERO SECTION ────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Ambient Soft Orbs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-200/40 via-roseAcc-200/40 to-purple-100/40 rounded-full blur-3xl -z-10 animate-pulse-subtle" />
        <div className="absolute top-40 -left-20 w-80 h-80 bg-brand-300/30 rounded-full blur-3xl -z-10 animate-float-slow" />
        <div className="absolute top-60 -right-20 w-96 h-96 bg-roseAcc-300/25 rounded-full blur-3xl -z-10 animate-float-slow" style={{ animationDelay: '2s' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Pre-headline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-semibold shadow-sm animate-fade-in">
            <span className="text-base">🌸</span>
            <span>Ruang aman untuk perasaanmu</span>
          </div>

          {/* Headline H1 */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-stoneText font-sans">
            Kamu tidak harus baik-baik saja setiap saat.{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-roseAcc-400 bg-clip-text text-transparent block sm:inline">
              Tapi kamu bisa mulai memahami dirimu.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-xl text-stoneText-calm max-w-2xl mx-auto font-normal leading-relaxed">
            <strong className="font-semibold text-brand-700">TERATAI HATI</strong> menemanimu melacak perasaan, mengenali pola emosi, dan menemukan ketenangan — satu hari dalam satu waktu.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('register')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Mulai Perjalananmu — Gratis</span>
              <ArrowRight size={18} />
            </button>
            <a
              href="#demo"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-surface-lowest hover:bg-surface-container text-stoneText-calm font-semibold text-base border border-surface-container-high transition-colors flex items-center justify-center gap-2"
            >
              <span>Lihat Cara Kerjanya 🌸</span>
            </a>
          </div>

          {/* Micro-copy */}
          <p className="text-xs text-stoneText-muted font-medium flex items-center justify-center gap-3">
            <span>✓ Gratis selamanya</span>
            <span>•</span>
            <span>✓ Tidak ada judgment</span>
            <span>•</span>
            <span>✓ Setup 2 menit</span>
          </p>

          {/* Social Proof Overlap Avatars */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
              ].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="User"
                  className="w-9 h-9 rounded-full border-2 border-surface-lowest object-cover"
                />
              ))}
            </div>
            <div className="text-left text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-stoneText font-bold ml-1">4.9/5</span>
              </div>
              <p className="text-stoneText-muted">Dipakai <strong className="text-stoneText font-semibold">3.000+ orang</strong> yang peduli dengan diri sendiri</p>
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────── 2. INTERACTIVE DASHBOARD PREVIEW ────────────────── */}
      <section id="demo" className="py-12 px-4 sm:px-6 bg-gradient-to-b from-surface via-brand-50/40 to-surface">
        <div className="max-w-5xl mx-auto text-center space-y-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100 px-3 py-1 rounded-full">
            Demo Interaktif
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-stoneText">Lihat TERATAI HATI Beraksi</h2>
          <p className="text-sm sm:text-base text-stoneText-muted max-w-xl mx-auto">
            Explore semua fiturnya langsung di bawah ini — tanpa perlu mendaftar dulu 🌸
          </p>
        </div>

        <InteractiveDashboardPreview onNavigate={onNavigate} />
      </section>

      {/* ────────────────── 3. LOGO MARQUEE BAR ────────────────── */}
      <section className="py-10 bg-surface-lowest border-y border-surface-container overflow-hidden">
        <p className="text-center text-xs uppercase tracking-widest font-semibold text-stoneText-muted mb-6">
          Dipercaya oleh komunitas & praktisi wellness Indonesia
        </p>
        <div className="flex space-x-12 animate-marquee whitespace-nowrap opacity-60 grayscale hover:grayscale-0 transition-all">
          {['Mindful Indonesia', 'Kesehatan Mental ID', 'Ruang Jiwa', 'Teman Hati', 'Aura Wellness', 'Lentera Diri', 'Mindful Indonesia', 'Kesehatan Mental ID'].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm font-bold text-stoneText-calm">
              <span className="text-brand-500">❖</span> {logo}
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────── 4. PROBLEM SECTION ────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-surface-warm/60">
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stoneText">Kamu tidak sendirian.</h2>
          <p className="text-base sm:text-lg text-stoneText-muted max-w-xl mx-auto">
            Banyak dari kita merasakan hal yang sama setiap hari...
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-surface-lowest p-8 rounded-3xl border border-surface-container-high shadow-soft space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-3xl">
              😔
            </div>
            <h3 className="text-lg font-bold text-stoneText">"Aku oke, kok." — Padahal Tidak</h3>
            <p className="text-sm text-stoneText-calm leading-relaxed">
              Kita sering memaksakan diri menjawab "baik-baik saja" ke orang lain, tapi tidak pernah benar-benar berhenti untuk bertanya pada diri sendiri: sebenarnya aku merasa apa?
            </p>
          </div>

          <div className="bg-surface-lowest p-8 rounded-3xl border border-surface-container-high shadow-soft space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-brand-600 flex items-center justify-center text-3xl">
              🌀
            </div>
            <h3 className="text-lg font-bold text-stoneText">Mood Naik Turun Tanpa Pola</h3>
            <p className="text-sm text-stoneText-calm leading-relaxed">
              Satu hari merasa bersemangat, besoknya tiba-tiba drop total tanpa alasan jelas. Tanpa melacak polanya, kita kesulitan memahami penyebab utama kestabilan emosi kita.
            </p>
          </div>

          <div className="bg-surface-lowest p-8 rounded-3xl border border-surface-container-high shadow-soft space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl">
              🗣️
            </div>
            <h3 className="text-lg font-bold text-stoneText">Bingung Harus Cerita ke Mana</h3>
            <p className="text-sm text-stoneText-calm leading-relaxed">
              Tidak semua orang punya tempat aman untuk berbagi tanpa takut dihakimi, dianggap lemah, atau diberi nasihat kaku yang belum tentu kita butuhkan.
            </p>
          </div>

        </div>
      </section>

      {/* ────────────────── 5. SOLUTION TRANSITION ────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-r from-brand-600 via-brand-500 to-roseAcc-400 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-lg sm:text-xl font-medium opacity-90">
            Dan sekarang, kamu punya teman yang selalu ada.
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Introducing TERATAI HATI 🌸
          </h2>
          <p className="text-sm sm:text-base font-normal max-w-xl mx-auto opacity-90 leading-relaxed">
            Platform pelacakan emosi dan kesehatan mental berbasis empati — dirancang untuk merawat jiwamu seperti teman terdekat.
          </p>
        </div>
      </section>

      {/* ────────────────── 6. FEATURES SECTION ────────────────── */}
      <section id="fitur" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-20">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1 rounded-full">
            Fitur Lengkap
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stoneText">
            Semua yang Kamu Butuhkan untuk Memahami Dirimu
          </h2>
        </div>

        {/* Fitur 1: Daily Check-in */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
              Hanya 30 Detik Sehari
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-stoneText">
              Mulai Kenali Perasaanmu — Tanpa Ribet
            </h3>
            <p className="text-sm sm:text-base text-stoneText-calm leading-relaxed">
              Tidak perlu menulis panjang berlembar-lembar. Cukup pilih emoji yang paling mewakili harimu, centang faktor yang mempengaruhi, dan biarkan TERATAI HATI yang merapikan perjalananmu.
            </p>
            <ul className="space-y-2.5 text-sm text-stoneText font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Check-in cepat dengan 5 emoji bermakna</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Guided reflection questions dari AI yang relevan</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> Streak harian yang membangun konsistensi positif</li>
            </ul>
          </div>
          <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container-high shadow-soft-lg space-y-4">
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 flex items-center gap-3">
              <span className="text-4xl">😄</span>
              <div>
                <h4 className="font-bold text-emerald-900">Sangat Baik</h4>
                <p className="text-xs text-emerald-700">Terima kasih sudah hadir untuk dirimu hari ini.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-brand-100 text-brand-800 rounded-full font-medium">💼 Kerjaan</span>
              <span className="px-3 py-1 bg-brand-100 text-brand-800 rounded-full font-medium">🎉 Momen Spesial</span>
              <span className="px-3 py-1 bg-brand-100 text-brand-800 rounded-full font-medium">😴 Tidur</span>
            </div>
          </div>
        </div>

        {/* Fitur 2: AI Companion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-surface-lowest p-6 rounded-3xl border border-surface-container-high shadow-soft-lg space-y-4">
            <div className="flex items-start gap-3 bg-brand-50 p-4 rounded-2xl">
              <span className="text-2xl">🤖</span>
              <p className="text-xs text-stoneText-calm leading-relaxed">
                "Halo Sari! Aku lihat kamu lagi ngerasa kurang baik hari ini, dan kerjaan jadi faktornya 💙 Mau cerita apa yang terjadi? Aku di sini buat dengerin — take your time."
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] px-3 py-1 bg-white border border-stone-200 rounded-full text-stoneText-calm">Aku mau cerita lebih</span>
              <span className="text-[11px] px-3 py-1 bg-white border border-stone-200 rounded-full text-stoneText-calm">Aku butuh teknik relaksasi</span>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-5">
            <span className="px-3 py-1 bg-brand-100 text-brand-700 border border-brand-200 text-xs font-bold rounded-full">
              Powered by AI & CBT
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-stoneText">
              Teman Curhat yang Tidak Pernah Judge
            </h3>
            <p className="text-sm sm:text-base text-stoneText-calm leading-relaxed">
              TERATAI HATI hadir 24 jam, siap mendengarkan apa pun yang kamu rasakan. Dengan pendekatan psikologi CBT yang hangat dan empatik, AI Companion membantu kamu memproses emosi dan menemukan perspektif baru.
            </p>
            <ul className="space-y-2.5 text-sm text-stoneText font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-brand-600" /> Akses 24/7 tanpa henti</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-brand-600" /> Empatik, sabar, dan non-judgmental</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-brand-600" /> Membantu reframing pikiran negatif & grounding</li>
            </ul>
          </div>
        </div>

        {/* Fitur 3: Mood Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="px-3 py-1 bg-roseAcc-100 text-rose-700 border border-roseAcc-200 text-xs font-bold rounded-full">
              Data-Driven Self-Awareness
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-stoneText">
              Kenali Polamu, Kenali Dirimu
            </h3>
            <p className="text-sm sm:text-base text-stoneText-calm leading-relaxed">
              Visualisasi perjalanan emosimu — grafik mood 7/30/90 hari, heatmap bulanan seperti GitHub contribution graph, dan ringkasan AI mingguan yang membantu kamu mengetahui apa yang benar-benar membuat mood-mu naik atau turun.
            </p>
            <ul className="space-y-2.5 text-sm text-stoneText font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-rose-500" /> Line chart interaktif & dynamic mood colors</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-rose-500" /> GitHub-style monthly mood heatmap</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-rose-500" /> Automatic Weekly AI Insight report</li>
            </ul>
          </div>
          <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container-high shadow-soft-lg space-y-4">
            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200">
              <h4 className="text-xs font-bold text-brand-900 mb-1">🤖 AI Weekly Summary</h4>
              <p className="text-xs text-stoneText-calm italic leading-relaxed">
                "Minggu ini mood kamu rata-rata Baik — naik dari minggu lalu! Rabu terasa berat karena Kerjaan, tapi kamu tetap konsisten 7 hari 🔥"
              </p>
            </div>
            <div className="grid grid-cols-7 gap-1.5 pt-2">
              {[5, 4, 3, 2, 5, 4, 4, 3, 4, 5, 5, 4, 3, 2, 4, 5, 4, 5, 4, 3, 2, 1, 3, 4, 5, 5, 4, 5].map((sc, i) => {
                const colors = ['bg-rose-300', 'bg-orange-300', 'bg-amber-300', 'bg-sky-300', 'bg-emerald-400'];
                return (
                  <div key={i} className={`h-6 rounded-md ${colors[sc - 1]} transition-transform hover:scale-110`} />
                );
              })}
            </div>
          </div>
        </div>

      </section>

      {/* ────────────────── 7. TESTIMONIAL MASONRY ────────────────── */}
      <section id="testimoni" className="py-20 px-4 sm:px-6 bg-surface-warm/50 border-t border-surface-container">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100 px-3 py-1 rounded-full">
              Kisah Nyata
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stoneText">
              Mereka Sudah Memulai Perjalanannya
            </h2>
            <p className="text-sm sm:text-base text-stoneText-muted">
              3.000+ orang yang memilih untuk lebih memahami diri sendiri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Featured Main Testimonial */}
            <div className="md:col-span-2 bg-gradient-to-br from-brand-600 via-brand-700 to-purple-900 text-white p-8 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-300">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-300" />)}
                </div>
                <p className="text-base sm:text-lg font-medium leading-relaxed italic">
                  "Aku dulu pikir journaling itu ribet dan makan waktu. Tapi TERATAI HATI bikin prosesnya se-simple pilih emoji dan tulis sedikit. Setelah 3 bulan, aku akhirnya ngerti kenapa aku sering bad mood di hari Senin — ternyata karena aku tidak istirahat cukup di weekend. Hal sekecil itu yang aku tidak pernah sadarin sebelumnya."
                </p>
              </div>
              <div className="pt-4 border-t border-white/20 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Dina" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <div>
                  <h4 className="font-bold text-sm">Dina, 26 tahun</h4>
                  <p className="text-xs text-brand-200">Marketing Executive · Jakarta</p>
                </div>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400" />)}
                </div>
                <p className="text-xs sm:text-sm text-stoneText-calm leading-relaxed italic">
                  "AI Companion-nya beda banget sama chatbot biasa. Dia beneran dengerin dan kasih pertanyaan refleksi yang bikin aku mikir lebih dalam soal perasaanku sendiri."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-surface-container">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Rizky" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-stoneText">Rizky, 22 tahun</h4>
                  <p className="text-[11px] text-stoneText-muted">Mahasiswa · Yogyakarta</p>
                </div>
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400" />)}
                </div>
                <p className="text-xs sm:text-sm text-stoneText-calm leading-relaxed italic">
                  "Fitur streak-nya yang bikin aku konsisten. Sayang banget kalau putus setelah 14 hari berturut-turut!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-surface-container">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" alt="Mama Tari" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-stoneText">Mama Tari, 42 tahun</h4>
                  <p className="text-[11px] text-stoneText-muted">Ibu Rumah Tangga · Surabaya</p>
                </div>
              </div>
            </div>

            {/* Testimonial Card 4 */}
            <div className="md:col-span-2 bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400" />)}
                </div>
                <p className="text-xs sm:text-sm text-stoneText-calm leading-relaxed italic">
                  "Akhirnya ada aplikasi kesehatan mental yang pakai Bahasa Indonesia dan ngerti konteks kita sehari-hari. Bukan terjemahan kaku dari aplikasi bule."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-surface-container">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Fajar" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-stoneText">Fajar, 31 tahun</h4>
                  <p className="text-[11px] text-stoneText-muted">Software Developer · Bandung</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────── 8. PRICING SECTION ────────────────── */}
      <section id="harga" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100 px-3.5 py-1 rounded-full">
            Investasi Terbaik
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stoneText">
            Investasi Terbaik Adalah untuk Dirimu Sendiri
          </h2>
          <p className="text-sm sm:text-base text-stoneText-muted max-w-lg mx-auto">
            Mulai gratis, upgrade kapan saja kalau sudah merasakan manfaatnya 🌸
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 bg-surface-container rounded-full border border-surface-container-high">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-stoneText shadow-sm' : 'text-stoneText-muted'
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-brand-600 text-white shadow-sm' : 'text-stoneText-muted'
              }`}
            >
              <span>Tahunan</span>
              <span className="bg-amber-400 text-amber-950 text-[10px] px-1.5 py-0.2 rounded-full">Hemat 20%</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Plan 1: Free */}
          <div className="bg-surface-lowest p-8 rounded-3xl border border-surface-container shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-stoneText-muted">Gratis Selamanya</span>
              <h3 className="text-2xl font-bold text-stoneText">Free Plan</h3>
              <div className="text-3xl font-extrabold text-stoneText">
                Rp0 <span className="text-xs font-normal text-stoneText-muted">/ selamanya</span>
              </div>
              <p className="text-xs text-stoneText-muted">Untuk kamu yang ingin mencoba memulai kebiasaan check-in harian.</p>
              <ul className="space-y-3 text-xs text-stoneText-calm pt-4 border-t border-surface-container">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> Check-in mood harian</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> Jurnal dasar (max 30 entri)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> Grafik mood 7 hari</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> Daily Affirmation & Breathing</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> AI Companion (5 pesan / hari)</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('register')}
              className="w-full py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high text-stoneText font-semibold text-sm transition-colors"
            >
              Mulai Gratis
            </button>
          </div>

          {/* Plan 2: Pro (Highlighted) */}
          <div className="relative bg-gradient-to-b from-brand-50 via-surface-lowest to-surface-lowest p-8 rounded-3xl border-2 border-brand-500 shadow-soft-lg flex flex-col justify-between space-y-6 transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Paling Populer ✨
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-brand-700">Akses Penuh</span>
              <h3 className="text-2xl font-bold text-stoneText">Pro Plan</h3>
              <div className="text-3xl font-extrabold text-brand-700">
                {billingCycle === 'monthly' ? 'Rp25.000' : 'Rp20.000'} <span className="text-xs font-normal text-stoneText-muted">/ bulan</span>
              </div>
              <p className="text-xs text-stoneText-muted">Untuk kamu yang ingin pendampingan emosional tanpa batas.</p>
              <ul className="space-y-3 text-xs text-stoneText-calm pt-4 border-t border-brand-100">
                <li className="flex items-center gap-2 font-semibold text-brand-900"><CheckCircle2 size={16} className="text-brand-600" /> Semua fitur Free</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> AI Companion UNLIMITED 24/7</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> Jurnal UNLIMITED</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> Analitik 90 hari + Mood Heatmap</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> Weekly AI Insight & Red Flag Alert</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> Gratitude Journal & Mood Booster</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600" /> Export Laporan PDF Bulanan</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('register')}
              className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02]"
            >
              Coba Pro 14 Hari Gratis 🌸
            </button>
          </div>

          {/* Plan 3: Lifetime */}
          <div className="bg-surface-lowest p-8 rounded-3xl border border-surface-container shadow-soft flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-amber-600">Investasi Sekali</span>
              <h3 className="text-2xl font-bold text-stoneText">Lifetime Plan</h3>
              <div className="text-3xl font-extrabold text-stoneText">
                Rp249.000 <span className="text-xs font-normal text-stoneText-muted">/ sekali bayar</span>
              </div>
              <p className="text-xs text-stoneText-muted">Akses seumur hidup untuk seluruh fitur Pro selamanya.</p>
              <ul className="space-y-3 text-xs text-stoneText-calm pt-4 border-t border-surface-container">
                <li className="flex items-center gap-2 font-semibold text-amber-900"><CheckCircle2 size={16} className="text-amber-500" /> Semua fitur Pro Selamanya</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Tidak ada biaya langganan lagi</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Early access untuk fitur AI terbaru</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Badge VIP khusus di profil</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('register')}
              className="w-full py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-sm transition-colors"
            >
              Beli Akses Lifetime
            </button>
          </div>

        </div>

        <p className="text-center text-xs text-stoneText-muted">
          *Payment gateway akan segera hadir. Daftar sekarang dan nikmati akses gratis lebih lama 🌸
        </p>
      </section>

      {/* ────────────────── 9. FAQ SECTION ────────────────── */}
      <section id="faq" className="py-20 px-4 sm:px-6 bg-surface-warm/60">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100 px-3 py-1 rounded-full">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stoneText">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-surface-lowest rounded-2xl border border-surface-container overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base text-stoneText flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`transition-transform duration-300 text-stoneText-muted shrink-0 ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stoneText-calm leading-relaxed border-t border-surface-container/50 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────── 10. FINAL CTA ────────────────── */}
      <section className="py-24 px-4 bg-gradient-to-tr from-brand-600 via-brand-500 to-roseAcc-300 text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-2xl">🌸</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Perjalanan seribu mil dimulai dari satu langkah kecil.
          </h2>
          <p className="text-base sm:text-lg opacity-90 max-w-xl mx-auto">
            Check-in pertamamu hanya membutuhkan waktu 30 detik.
          </p>
          <div>
            <button
              onClick={() => onNavigate('register')}
              className="px-9 py-4 rounded-full bg-white text-brand-900 hover:bg-brand-50 font-bold text-base shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Mulai Sekarang — Gratis 🌸
            </button>
          </div>
          <p className="text-xs text-white/80 font-medium">
            Tidak ada judgment • Tidak ada kartu kredit • Selalu ada untukmu
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
