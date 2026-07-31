# TERATAI HATI — Panduan Utama Project

**Tagline**: Teman setia untuk perjalanan kesehatan mentalmu  
**Deskripsi**: Platform pelacakan kesehatan mental berbasis empati, CBT, dan mindfulness. Menemanimu melacak emosi harian, mengenali pola emosi melalui visualisasi data intuitif, dan bercerita dengan AI Companion tanpa rasa takut dihakimi.

---

## 🎨 Design System & Visual Identity
- **Prinsip**: Modern Soft-Minimalism, Tactile Comfort, Organic Rounded Containers (`2rem` / `3rem` border-radius), Pill Buttons.
- **Warna Utama**:
  - **Brand Soft Purple**: `#8B5CF6` / `#6B38D4`
  - **Lavender Accent**: `#C4B5FD`
  - **Warm White Surface**: `#FAFAF9` / `#F9F9F8`
  - **Soft Rose Accent**: `#FDA4AF`
  - **Mood Positif**: Emerald Green (`#10B981`)
  - **Mood Netral**: Warm Yellow (`#F59E0B`) / Soft Blue (`#3B82F6`)
  - **Mood Negatif**: Soft Orange (`#FB923C`) / Soft Red (`#EF4444`)
  - **Teks**: Warm Stone Dark (`#44403C`)
- **Tipografi**: *Plus Jakarta Sans*

---

## 🚀 Fitur Utama Application
1. **Daily Check-in (3-Step Guided)**
   - Step 1: 5 Pilihan Mood Emoji dengan efek animasi bounce.
   - Step 2: 12 Faktor Pengaruh (Kerjaan, Keluarga, Hubungan, Kesehatan, Tidur, Keuangan, Cuaca, Momen Spesial, Rumah, Belajar, Pertemanan, Goals).
   - Step 3: Jurnal Refleksi & Pertanyaan Terpandu dari AI (AI-guided reflection question).
   - Selebrasi confetti & pembaruan streak harian.
2. **AI Companion (Gemini / CBT Approach)**
   - Room chat 24/7 empatik dan non-judgmental.
   - Otomatis membaca konteks check-in hari ini.
   - Quick reply prompts & disclaimer darurat kesehatan mental (119 ext 8).
3. **Jurnal Refleksi**
   - Manajemen pencatatan, penyaringan berdasarkan bulan/mood, dan pencarian kata kunci.
4. **Analitik & Mood Heatmap**
   - Line Chart fluktuasi mood 7/30/90 hari.
   - GitHub-style Monthly Mood Heatmap Calendar.
   - Top Trigger Analysis (Faktor positif vs negatif).
   - Ringkasan AI Mingguan & Red Flag Alert (notifikasi lembut jika mood rendah 3 hari berturut-turut).
5. **Wellness Tools**
   - Interactive Box Breathing (4-4-4-4, 4-7-8, Pernapasan Dalam) dengan animasi bernapas.
   - Daily Affirmations & 1-Click IG Stories share copy.
   - Gratitude Journal (3 Rasa Syukur Harian).
   - Mood Booster & Tantangan Senyum 10 Detik.
6. **Streak & Achievements**
   - 6 Badge Pencapaian (🌱 Langkah Pertama, 🔥 7 Hari Berturut, 💎 30 Hari Perjalanan, 🌟 Pejuang Mental, 🤝 Teman Curhat, 📖 Penulis Jurnal).

---

## 🛠️ Arsitektur Teknikal
- **Frontend Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Design Tokens
- **Icons & Visuals**: Lucide React + Canvas Confetti + Recharts
- **Database & Auth**: Supabase PostgreSQL (termasuk migrasi skema lengkap di `supabase/migrations/20260731_initial_schema.sql` dan fallback LocalStorage/IndexedDB).
- **Deployment target**: Vercel
