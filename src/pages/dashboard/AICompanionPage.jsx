import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Send, Sparkles, ShieldAlert, Heart, RefreshCw, Wind, MessageCircle, AlertCircle 
} from 'lucide-react';

export default function AICompanionPage({ onSelectTab }) {
  const { user } = useAuth();
  const { 
    chatMessages, sendAIMessage, todayCheckin, chatCountToday 
  } = useApp();

  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const isPro = user?.plan_tier === 'pro' || user?.plan_tier === 'lifetime';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSend = async (textToSend) => {
    const msg = textToSend || inputMsg;
    if (!msg.trim()) return;

    setInputMsg('');
    setIsTyping(true);
    await sendAIMessage(msg, user?.plan_tier || 'free');
    setIsTyping(false);
  };

  const quickReplies = [
    "Aku mau cerita lebih",
    "Aku butuh teknik relaksasi",
    "Aku mau latihan pernapasan",
    "Aku cuma mau didengar dulu"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-brand-50/60 via-purple-50/30 to-surface-lowest border border-brand-100 shadow-soft overflow-hidden">
      
      {/* Top Header Bar */}
      <div className="bg-surface-lowest/90 backdrop-blur-md px-6 py-4 border-b border-brand-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-xl shadow-soft">
              🤖
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-stoneText text-sm sm:text-base">Teratai AI Companion</h3>
              <span className="text-[10px] bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-bold">
                CBT & Mindfulness
              </span>
            </div>
            <p className="text-xs text-stoneText-muted">
              Teman bijak yang selalu ada — non-judgmental & sabar mendengarkan
            </p>
          </div>
        </div>

        {/* Free Plan Message Counter Indicator */}
        {!isPro && (
          <div className="text-right">
            <div className="text-[11px] font-bold text-brand-700 bg-brand-100 px-2.5 py-1 rounded-full">
              Pesan Hari Ini: {chatCountToday}/5
            </div>
            <button
              onClick={() => onSelectTab('settings')}
              className="text-[10px] text-brand-600 font-semibold hover:underline mt-0.5 block"
            >
              Upgrade Unlimited ✨
            </button>
          </div>
        )}
      </div>

      {/* Context Banner from Today's Check-in (if available) */}
      {todayCheckin && (
        <div className="bg-brand-100/50 px-6 py-2 border-b border-brand-200/60 text-xs text-brand-900 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span>🌸 Context Check-in:</span>
            <span className="font-bold">{todayCheckin.moodLabel}</span>
            <span className="text-brand-700">({todayCheckin.factors.join(', ')})</span>
          </div>
          <span className="text-[10px] text-brand-700 shrink-0 font-medium">Otomatis Terhubung</span>
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-sm shrink-0 shadow-sm">
                  🤖
                </div>
              )}

              <div className={`max-w-[80%] sm:max-w-[70%] space-y-1 ${isUser ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    isUser
                      ? 'bg-brand-600 text-white rounded-tr-xs shadow-sm font-medium'
                      : msg.isLimitWarning
                        ? 'bg-amber-50 text-amber-900 border border-amber-200 rounded-tl-xs'
                        : 'bg-white text-stoneText-calm border border-brand-100 rounded-tl-xs shadow-sm'
                  }`}
                >
                  {msg.message}
                </div>
                <span className="text-[10px] text-stoneText-muted px-2 block font-mono">
                  {msg.timestamp}
                </span>
              </div>

              {isUser && (
                <img
                  src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-brand-300 object-cover shrink-0"
                />
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-sm shrink-0">
              🤖
            </div>
            <div className="p-4 bg-white border border-brand-100 rounded-3xl rounded-tl-xs shadow-sm text-xs text-stoneText-muted flex items-center gap-1.5">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-ping" />
              <span>Teratai AI sedang mengetik balasan empatik...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies Carousel */}
      <div className="px-4 sm:px-6 py-2 bg-surface-lowest/70 border-t border-brand-100 overflow-x-auto flex items-center gap-2 scrollbar-none">
        <span className="text-[10px] font-bold text-stoneText-muted shrink-0 uppercase tracking-wider">Tanggapan Cepat:</span>
        {quickReplies.map((qr, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qr)}
            className="text-xs px-3.5 py-1.5 rounded-full bg-white hover:bg-brand-50 border border-brand-200 text-brand-800 font-medium whitespace-nowrap transition-colors shadow-sm shrink-0"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-4 bg-surface-lowest border-t border-brand-100 space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Cerita apa yang ada di pikiranmu hari ini..."
            className="flex-1 px-5 py-3.5 rounded-2xl bg-surface-warm border border-surface-container-high text-stoneText text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputMsg.trim() || isTyping}
            className="p-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 shrink-0"
          >
            <Send size={18} />
          </button>
        </form>

        {/* Permanent Mental Health Disclaimer (Mandatory) */}
        <div className="text-[10px] text-center text-stoneText-muted flex items-center justify-center gap-1.5 pt-1">
          <ShieldAlert size={12} className="text-amber-500 shrink-0" />
          <span>
            TERATAI HATI bukan pengganti konsultasi profesional. Jika kamu dalam krisis, hubungi <strong className="text-stoneText font-bold underline">119 ext 8 (Into The Light Indonesia)</strong>.
          </span>
        </div>
      </div>

    </div>
  );
}
