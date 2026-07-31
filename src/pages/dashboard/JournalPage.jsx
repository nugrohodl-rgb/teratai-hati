import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, Plus, Search, Filter, Trash2, Edit3, X, Calendar, Tag, Heart, Check 
} from 'lucide-react';

export default function JournalPage() {
  const { 
    journals, addJournal, editJournal, deleteJournal, MOOD_LEVELS, FACTOR_OPTIONS 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState('all'); // 'all' | 5 | 4 | 3 | 2 | 1
  const [monthFilter, setMonthFilter] = useState('all'); // 'all' | 'this_month'
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMoodId, setSelectedMoodId] = useState(4);
  const [selectedFactors, setSelectedFactors] = useState([]);

  // Filter journals
  const filteredJournals = journals.filter(j => {
    // Search query
    const matchSearch = (j.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (j.content || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    // Mood filter
    const matchMood = moodFilter === 'all' || j.moodScore === Number(moodFilter);

    // Month filter
    let matchMonth = true;
    if (monthFilter === 'this_month') {
      const entryDate = new Date(j.date);
      const now = new Date();
      matchMonth = entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
    }

    return matchSearch && matchMood && matchMonth;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setSelectedMoodId(4);
    setSelectedFactors([]);
    setModalOpen(true);
  };

  const handleOpenEdit = (entry) => {
    setEditingId(entry.id);
    setTitle(entry.title || '');
    setContent(entry.content);
    setSelectedMoodId(entry.moodScore || 4);
    setSelectedFactors(entry.factors || []);
    setModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const moodObj = MOOD_LEVELS.find(m => m.id === selectedMoodId) || MOOD_LEVELS[1];

    if (editingId) {
      editJournal(editingId, {
        title: title || 'Catatan Refleksi',
        content,
        moodScore: selectedMoodId,
        moodLabel: moodObj.label,
        factors: selectedFactors
      });
    } else {
      addJournal({
        title: title || 'Catatan Refleksi',
        content,
        moodScore: selectedMoodId,
        moodLabel: moodObj.label,
        factors: selectedFactors
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stoneText">Jurnal Refleksi</h2>
          <p className="text-xs sm:text-sm text-stoneText-muted">
            Ruang privat untuk menuliskan perasaan dan cerita perjalanan emosimu.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          <span>Tulis Jurnal Baru</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-surface-lowest p-4 rounded-3xl border border-surface-container shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stoneText-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci dalam jurnal..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500 transition-all"
            />
          </div>

          {/* Month Filter */}
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-surface-warm border border-surface-container-high text-xs font-semibold text-stoneText-calm focus:outline-none focus:border-brand-500"
          >
            <option value="all">Semua Waktu</option>
            <option value="this_month">Bulan Ini</option>
          </select>

          {/* Mood Filter */}
          <select
            value={moodFilter}
            onChange={(e) => setMoodFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-surface-warm border border-surface-container-high text-xs font-semibold text-stoneText-calm focus:outline-none focus:border-brand-500"
          >
            <option value="all">Semua Mood</option>
            <option value="5">😄 Sangat Baik</option>
            <option value="4">🙂 Baik</option>
            <option value="3">😐 Biasa</option>
            <option value="2">😔 Kurang Baik</option>
            <option value="1">😢 Buruk</option>
          </select>

        </div>
      </div>

      {/* Journal Cards List Grid */}
      {filteredJournals.length === 0 ? (
        <div className="p-12 text-center bg-surface-lowest rounded-3xl border border-surface-container space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-2xl">
            📖
          </div>
          <h3 className="font-bold text-stoneText text-base">Belum Ada Catatan Jurnal</h3>
          <p className="text-xs text-stoneText-muted max-w-sm mx-auto">
            Tidak ada entri jurnal yang sesuai dengan kriteria pencarian atau filtermu.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJournals.map(entry => {
            const moodObj = MOOD_LEVELS.find(m => m.id === entry.moodScore) || MOOD_LEVELS[1];
            return (
              <div 
                key={entry.id}
                className="bg-surface-lowest p-6 rounded-3xl border border-surface-container shadow-soft hover:border-brand-200 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  
                  {/* Top Bar: Mood Badge & Date */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${moodObj.bgClass}`}>
                      <span>{moodObj.emoji}</span>
                      <span>{entry.moodLabel || moodObj.label}</span>
                    </span>

                    <span className="text-[11px] text-stoneText-muted flex items-center gap-1 font-mono">
                      <Calendar size={12} />
                      {new Date(entry.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Title & Preview Text */}
                  <div>
                    <h3 className="font-bold text-stoneText text-base group-hover:text-brand-700 transition-colors">
                      {entry.title || 'Catatan Refleksi'}
                    </h3>
                    <p className="text-xs sm:text-sm text-stoneText-calm mt-1.5 leading-relaxed line-clamp-4 whitespace-pre-line">
                      {entry.content}
                    </p>
                  </div>

                </div>

                {/* Bottom Bar: Factors & Actions */}
                <div className="pt-3 border-t border-surface-container flex items-center justify-between">
                  
                  {/* Factors tags */}
                  <div className="flex flex-wrap gap-1">
                    {entry.factors && entry.factors.map((fac, idx) => (
                      <span key={idx} className="text-[10px] bg-surface-container px-2 py-0.5 rounded-full text-stoneText-calm capitalize">
                        #{fac}
                      </span>
                    ))}
                  </div>

                  {/* Edit / Delete Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(entry)}
                      className="p-1.5 text-stoneText-muted hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => deleteJournal(entry.id)}
                      className="p-1.5 text-stoneText-muted hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Journal Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-soft-lg border border-brand-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-surface-container pb-3">
              <h3 className="font-bold text-stoneText text-lg">
                {editingId ? 'Edit Catatan Jurnal' : 'Tulis Jurnal Refleksi Baru'}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-stoneText-muted hover:text-stoneText rounded-full hover:bg-surface-container"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-stoneText-calm mb-1">Judul Catatan</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Judul refleksi hari ini..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stoneText-calm mb-1.5">Mood Saat Menulis</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {MOOD_LEVELS.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMoodId(m.id)}
                      className={`p-2 rounded-xl text-center border text-xs flex flex-col items-center gap-1 transition-all ${
                        selectedMoodId === m.id
                          ? 'border-brand-500 bg-brand-50 text-brand-800 font-bold ring-2 ring-brand-300'
                          : 'border-surface-container bg-surface-warm text-stoneText-calm'
                      }`}
                    >
                      <span className="text-xl">{m.emoji}</span>
                      <span className="text-[10px] leading-none truncate">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stoneText-calm mb-1">Isi Jurnal</label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuangkan isi pikiranmu secara bebas tanpa takut dihakimi..."
                  className="w-full p-4 rounded-2xl bg-surface-warm border border-surface-container-high text-xs sm:text-sm text-stoneText focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-surface-container hover:bg-surface-container-high text-stoneText text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20"
                >
                  {editingId ? 'Simpan Perubahan' : 'Terbitkan Catatan 🌸'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
