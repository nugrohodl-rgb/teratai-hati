import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

// Default 5 Mood Levels
export const MOOD_LEVELS = [
  { id: 5, label: 'Sangat Baik', emoji: '😄', color: 'emerald', bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100', hex: '#10B981' },
  { id: 4, label: 'Baik', emoji: '🙂', color: 'blue', bgClass: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100', hex: '#3B82F6' },
  { id: 3, label: 'Biasa', emoji: '😐', color: 'yellow', bgClass: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100', hex: '#F59E0B' },
  { id: 2, label: 'Kurang Baik', emoji: '😔', color: 'orange', bgClass: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100', hex: '#FB923C' },
  { id: 1, label: 'Buruk', emoji: '😢', color: 'red', bgClass: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100', hex: '#EF4444' },
];

// Default 12 Factors
export const FACTOR_OPTIONS = [
  { id: 'kerjaan', label: 'Kerjaan', icon: '💼' },
  { id: 'keluarga', label: 'Keluarga', icon: '👨‍👩‍👧' },
  { id: 'hubungan', label: 'Hubungan', icon: '❤️' },
  { id: 'kesehatan', label: 'Kesehatan', icon: '💪' },
  { id: 'tidur', label: 'Tidur', icon: '😴' },
  { id: 'keuangan', label: 'Keuangan', icon: '💰' },
  { id: 'cuaca', label: 'Cuaca', icon: '🌤️' },
  { id: 'momen_spesial', label: 'Momen Spesial', icon: '🎉' },
  { id: 'rumah', label: 'Rumah', icon: '🏠' },
  { id: 'belajar', label: 'Belajar', icon: '📚' },
  { id: 'pertemanan', label: 'Pertemanan', icon: '🤝' },
  { id: 'goals', label: 'Goals', icon: '🎯' },
];

// Default 6 Achievements Badges
export const BADGE_DEFINITIONS = [
  { key: 'first_step', name: 'Langkah Pertama', emoji: '🌱', desc: 'Selesaikan check-in pertama kamu', req: 1, type: 'checkin' },
  { key: 'streak_7', name: '7 Hari Berturut', emoji: '🔥', desc: 'Pertahankan streak check-in selama 7 hari', req: 7, type: 'streak' },
  { key: 'streak_30', name: '30 Hari Perjalanan', emoji: '💎', desc: 'Pertahankan streak check-in selama 30 hari', req: 30, type: 'streak' },
  { key: 'warrior_100', name: 'Pejuang Mental', emoji: '🌟', desc: 'Lakukan total 100 kali check-in mood', req: 100, type: 'checkin_total' },
  { key: 'companion_10', name: 'Teman Curhat', emoji: '🤝', desc: 'Ngobrol dengan AI Companion 10 kali', req: 10, type: 'chat' },
  { key: 'journal_20', name: 'Penulis Jurnal', emoji: '📖', desc: 'Tulis 20 entri jurnal refleksi', req: 20, type: 'journal' },
];

// Initial Realistic Mock Check-ins (Past 14 days)
const INITIAL_CHECKINS = [
  { id: 'chk_14', date: '2026-07-31', moodScore: 4, moodLabel: 'Baik', factors: ['kerjaan', 'momen_spesial'], journalText: 'Hari ini presentasi project lancar banget dan dapet apresiasi dari tim! Puji Tuhan rasanya lega.', aiGuidedQuestion: 'Momen luar biasa apa yang bikin kamu paling bangga hari ini?' },
  { id: 'chk_13', date: '2026-07-30', moodScore: 4, moodLabel: 'Baik', factors: ['tidur', 'kesehatan'], journalText: 'Tidur cukup 8 jam bikin energi segar seharian. Sempat lari pagi 20 menit.', aiGuidedQuestion: null },
  { id: 'chk_12', date: '2026-07-29', moodScore: 3, moodLabel: 'Biasa', factors: ['kerjaan', 'cuaca'], journalText: 'Hujan seharian bikin agak mager, tapi tugas tetep kelar santai.', aiGuidedQuestion: null },
  { id: 'chk_11', date: '2026-07-28', moodScore: 2, moodLabel: 'Kurang Baik', factors: ['kerjaan', 'tidur'], journalText: 'Lembur sampai malam karena ada revisi mendadak. Rasanya cape banget.', aiGuidedQuestion: 'Apa hal kecil yang bisa kamu lakukan malam ini untuk mengistirahatkan pikiranmu?' },
  { id: 'chk_10', date: '2026-07-27', moodScore: 5, moodLabel: 'Sangat Baik', factors: ['keluarga', 'momen_spesial'], journalText: 'Makan malam bareng keluarga di tempat favorit. Penuh tawa.', aiGuidedQuestion: null },
  { id: 'chk_9', date: '2026-07-26', moodScore: 4, moodLabel: 'Baik', factors: ['pertemanan', 'rumah'], journalText: 'Nongkrong santai bareng teman lama, ngobrolin banyak kenangan indah.', aiGuidedQuestion: null },
  { id: 'chk_8', date: '2026-07-25', moodScore: 3, moodLabel: 'Biasa', factors: ['belajar'], journalText: 'Membaca buku pengembangan diri 2 bab.', aiGuidedQuestion: null },
  { id: 'chk_7', date: '2026-07-24', moodScore: 4, moodLabel: 'Baik', factors: ['goals', 'kerjaan'], journalText: 'Berhasil menyelesaikan target mingguan tepat waktu.', aiGuidedQuestion: null },
];

// Initial Journal Entries
const INITIAL_JOURNALS = [
  {
    id: 'jrn_1',
    date: '2026-07-31T14:30:00.000Z',
    title: 'Refleksi Pencapaian Bulan Ini',
    content: 'Aku sadar kalau bulan ini aku jauh lebih stabil secara emosional. Belajar untuk tidak langsung bereaksi saat ada beban kerja berlebih ternyata sangat membantu kedamaian pikirkanku.',
    moodScore: 4,
    moodLabel: 'Baik',
    factors: ['kerjaan', 'goals']
  },
  {
    id: 'jrn_2',
    date: '2026-07-28T20:15:00.000Z',
    title: 'Menyikapi Rasa Lelah',
    content: 'Revisi kerjaan emang kadang bikin kesal. Tapi malam ini aku mencoba grounding exercise dan pernapasan 4-7-8. Ternyata tubuh butuh diakui rasa lelahnya, bukan dipaksa terus.',
    moodScore: 2,
    moodLabel: 'Kurang Baik',
    factors: ['kerjaan', 'tidur']
  },
  {
    id: 'jrn_3',
    date: '2026-07-27T21:00:00.000Z',
    title: 'Kehangatan Bersama Keluarga',
    content: 'Hal-hal sederhana seperti tertawa bersama di meja makan adalah reminder terbaik bahwa aku dicintai dan tidak sendirian.',
    moodScore: 5,
    moodLabel: 'Sangat Baik',
    factors: ['keluarga', 'momen_spesial']
  }
];

// Initial Gratitude Entries
const INITIAL_GRATITUDE = [
  { id: 'grt_1', date: '2026-07-31', items: ['Tidur yang nyenyak tadi malam', 'Secangkir teh hangat di pagi hari', 'Dukungan dari teman sekerja'] },
  { id: 'grt_2', date: '2026-07-30', items: ['Cuaca yang cerah dan sejuk', 'Bisa menyelesaikan tugas lebih awal', 'Kesehatan orang tua'] }
];

// Daily Affirmations Bank
export const DAILY_AFFIRMATIONS = [
  { text: 'Kamu sudah melakukan yang terbaik hari ini. Itu cukup. 💜', category: 'self-love' },
  { text: 'Setiap napas yang kamu ambil membawa ketenangan dan keberanian baru. 🌸', category: 'ketenangan' },
  { text: 'Tidak apa-apa untuk beristirahat. Produktivitas tidak mendefinisikan hargadirimu. ✨', category: 'motivasi' },
  { text: 'Perasaanmu valid. Berikan dirimu ruang untuk merasakan dan memprosesnya. 🌿', category: 'kepercayaan diri' },
  { text: 'Kamu lebih kuat dari ketakutanmu dan lebih bijak dari keraguanmu. 🌟', category: 'kepercayaan diri' },
  { text: 'Langkah kecil hari ini adalah awal dari perubahan besar di masa depan. 🚀', category: 'motivasi' }
];

export function AppProvider({ children }) {
  const [checkins, setCheckins] = useState(() => {
    const saved = localStorage.getItem('teratai_checkins');
    return saved ? JSON.parse(saved) : INITIAL_CHECKINS;
  });

  const [journals, setJournals] = useState(() => {
    const saved = localStorage.getItem('teratai_journals');
    return saved ? JSON.parse(saved) : INITIAL_JOURNALS;
  });

  const [gratitudeEntries, setGratitudeEntries] = useState(() => {
    const saved = localStorage.getItem('teratai_gratitude');
    return saved ? JSON.parse(saved) : INITIAL_GRATITUDE;
  });

  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    const saved = localStorage.getItem('teratai_badges');
    return saved ? JSON.parse(saved) : ['first_step', 'streak_7'];
  });

  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('teratai_chat_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg_1',
        sender: 'ai',
        message: 'Halo! Aku Teratai Hati 🌸 Teman setiamu yang siap mendengarkan tanpa menghakimi. Ada cerita apa yang ingin kamu bagikan hari ini?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [chatCountToday, setChatCountToday] = useState(() => {
    const saved = localStorage.getItem('teratai_chat_count');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [newBadgeNotification, setNewBadgeNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('teratai_checkins', JSON.stringify(checkins));
  }, [checkins]);

  useEffect(() => {
    localStorage.setItem('teratai_journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem('teratai_gratitude', JSON.stringify(gratitudeEntries));
  }, [gratitudeEntries]);

  useEffect(() => {
    localStorage.setItem('teratai_badges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  useEffect(() => {
    localStorage.setItem('teratai_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('teratai_chat_count', chatCountToday.toString());
  }, [chatCountToday]);

  // Today's Check-in Status
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCheckin = checkins.find(c => c.date === todayStr);

  // Check Red Flag Alert: low mood (score <= 2) for 3 consecutive days
  const checkRedFlag = () => {
    const sorted = [...checkins].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sorted.length < 3) return false;
    const recent3 = sorted.slice(0, 3);
    return recent3.every(c => c.moodScore <= 2);
  };

  const isRedFlagActive = checkRedFlag();

  // Add new Check-in
  const addCheckin = ({ moodScore, moodLabel, factors, journalText, aiGuidedQuestion }) => {
    const newCheckin = {
      id: 'chk_' + Date.now(),
      date: todayStr,
      moodScore,
      moodLabel,
      factors,
      journalText: journalText || '',
      aiGuidedQuestion: aiGuidedQuestion || ''
    };

    const filtered = checkins.filter(c => c.date !== todayStr);
    const updated = [newCheckin, ...filtered];
    setCheckins(updated);

    // Confetti effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#C4B5FD', '#FDA4AF', '#10B981']
    });

    // Also sync to journal if text provided
    if (journalText && journalText.trim().length > 0) {
      addJournal({
        title: `Jurnal Check-in: ${moodLabel}`,
        content: journalText,
        moodScore,
        moodLabel,
        factors
      });
    }

    // Check achievement triggers
    checkAchievementsTrigger(updated, journals);
  };

  // Add Journal Entry
  const addJournal = (entry) => {
    const newEntry = {
      id: 'jrn_' + Date.now(),
      date: new Date().toISOString(),
      title: entry.title || 'Catatan Refleksi',
      content: entry.content,
      moodScore: entry.moodScore || 3,
      moodLabel: entry.moodLabel || 'Biasa',
      factors: entry.factors || []
    };
    const updated = [newEntry, ...journals];
    setJournals(updated);
    checkAchievementsTrigger(checkins, updated);
  };

  const editJournal = (id, updatedFields) => {
    setJournals(journals.map(j => j.id === id ? { ...j, ...updatedFields, date: new Date().toISOString() } : j));
  };

  const deleteJournal = (id) => {
    setJournals(journals.filter(j => j.id !== id));
  };

  // Add Gratitude Entry
  const addGratitude = (items) => {
    const newEntry = {
      id: 'grt_' + Date.now(),
      date: todayStr,
      items
    };
    setGratitudeEntries([newEntry, ...gratitudeEntries]);
  };

  // Check achievements unlock conditions
  const checkAchievementsTrigger = (currCheckins = checkins, currJournals = journals) => {
    const newlyUnlocked = [];

    if (!unlockedBadges.includes('first_step') && currCheckins.length >= 1) {
      newlyUnlocked.push('first_step');
    }
    if (!unlockedBadges.includes('streak_7') && currCheckins.length >= 7) {
      newlyUnlocked.push('streak_7');
    }
    if (!unlockedBadges.includes('streak_30') && currCheckins.length >= 30) {
      newlyUnlocked.push('streak_30');
    }
    if (!unlockedBadges.includes('warrior_100') && currCheckins.length >= 100) {
      newlyUnlocked.push('warrior_100');
    }
    if (!unlockedBadges.includes('journal_20') && currJournals.length >= 20) {
      newlyUnlocked.push('journal_20');
    }

    if (newlyUnlocked.length > 0) {
      setUnlockedBadges(prev => [...prev, ...newlyUnlocked]);
      const badgeObj = BADGE_DEFINITIONS.find(b => b.key === newlyUnlocked[0]);
      if (badgeObj) {
        setNewBadgeNotification(badgeObj);
      }
    }
  };

  // Send message to AI Companion (Gemini powered or CBT Fallback engine)
  const sendAIMessage = async (userText, userPlan = 'pro') => {
    // Check message limit for Free plan (max 5/day)
    if (userPlan === 'free' && chatCountToday >= 5) {
      const limitMsg = {
        id: 'msg_' + Date.now(),
        sender: 'ai',
        message: '⚠️ Kamu telah mencapai batas 5 pesan harian untuk akun Free. Upgrade ke Teratai Pro untuk akses unlimited ngobrol kapan saja 💜',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLimitWarning: true
      };
      setChatMessages(prev => [...prev, limitMsg]);
      return;
    }

    const userMsgObj = {
      id: 'msg_usr_' + Date.now(),
      sender: 'user',
      message: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsgObj]);
    setChatCountToday(prev => prev + 1);

    // Track achievement chat count
    if (!unlockedBadges.includes('companion_10') && chatCountToday + 1 >= 10) {
      setUnlockedBadges(prev => [...prev, 'companion_10']);
      const badgeObj = BADGE_DEFINITIONS.find(b => b.key === 'companion_10');
      if (badgeObj) setNewBadgeNotification(badgeObj);
    }

    // Context from today's check-in
    let checkinContext = '';
    if (todayCheckin) {
      checkinContext = `User hari ini check-in dengan mood '${todayCheckin.moodLabel}' (skor ${todayCheckin.moodScore}/5) dan faktor yang mempengaruhi: ${todayCheckin.factors.join(', ')}.`;
    }

    // Intelligent CBT Response Generator with empathetic warm Indonesian tone
    setTimeout(() => {
      let aiReply = '';
      const textLower = userText.toLowerCase();

      if (textLower.includes('relaksasi') || textLower.includes('tenang') || textLower.includes('panik')) {
        aiReply = 'Aku mengerti rasanya saat pikiran terasa sesak. Mari kita coba latihan grounding 5-4-3-2-1 sederhana:\n\n1. Sebutkan 5 benda yang ada di sekitarmu.\n2. 4 hal yang bisa kamu sentuh.\n3. 3 suara yang bisa kamu dengar.\n4. 2 aroma yang bisa kamu cium.\n5. 1 napas dalam yang lembut 🌸\n\nBagaimana perasaanmu sekarang? Luangkan waktumu ya.';
      } else if (textLower.includes('pernapasan') || textLower.includes('napas') || textLower.includes('breath')) {
        aiReply = 'Pilihan yang sangat baik! Kamu bisa membuka tab Wellness untuk latihan Box Breathing 4-4-4-4 atau pernapasan 4-7-8. Atau kita lakukan 3 napas bersama sekarang:\n\nTarik napas perlahan (1... 2... 3... 4...)\nTahan sejenak...\nHembuskan pelan-pelan (1... 2... 3... 4...)\n\nTerasa sedikit lebih ringan? 💙';
      } else if (textLower.includes('kerja') || textLower.includes('lelah') || textLower.includes('burnout') || textLower.includes('capek')) {
        aiReply = 'Terima kasih sudah mau berbagi cerita ini. Beban kerja seringkali membuat kita merasa kewalahan seolah harus menyelesaikan semuanya sekaligus.\n\nJika boleh bertanya, bagian mana dari pekerjaanmu yang paling menyita energimu hari ini? Ingat ya, kamu berhak istirahat tanpa rasa bersalah. ☕';
      } else if (textLower.includes('senang') || textLower.includes('bagus') || textLower.includes('lancar') || textLower.includes('bahagia')) {
        aiReply = 'Senang sekali mendengarnya! 🎉 Menghargai dan merayakan momen kebahagiaan adalah bagian penting dari menjaga kesehatan mental. Momen manis seperti ini pantas dicatat di jurnalmu!';
      } else {
        const responses = [
          `Terima kasih sudah membuka diri padaku 💙 ${checkinContext ? 'Aku lihat hari ini kamu sedang merasa ' + todayCheckin.moodLabel + '. ' : ''}Menyadari apa yang sedang kamu rasakan adalah langkah awal yang sangat berani. Mau bercerita lebih jauh tentang apa yang paling mengganjal di hatimu?`,
          'Aku di sini dan mendengarkanmu dengan penuh rasa hormat. Kadang-kadang, mengeluarkan isi pikiran tanpa perlu mencari solusi cepat sudah cukup melegakan. Ambil napas dalam, dan lanjutkan ceritamu kapan pun kamu siap 🌸',
          'Cerita yang kamu bagikan sangat berarti. Menurutmu, apa yang paling kamu butuhkan saat ini — apakah ingin meluapkan emosi, mencari cara memandang masalah dari sudut pandang baru, atau sekadar ketenangan sejenak?'
        ];
        aiReply = responses[Math.floor(Math.random() * responses.length)];
      }

      const aiMsgObj = {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai',
        message: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMsgObj]);
    }, 1000);
  };

  return (
    <AppContext.Provider value={{
      checkins,
      journals,
      gratitudeEntries,
      unlockedBadges,
      chatMessages,
      chatCountToday,
      todayCheckin,
      isRedFlagActive,
      newBadgeNotification,
      setNewBadgeNotification,
      addCheckin,
      addJournal,
      editJournal,
      deleteJournal,
      addGratitude,
      sendAIMessage,
      MOOD_LEVELS,
      FACTOR_OPTIONS,
      BADGE_DEFINITIONS,
      DAILY_AFFIRMATIONS
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
