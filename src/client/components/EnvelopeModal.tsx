import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Crown,
  Heart,
  Flower2,
  Moon,
  Star,
  Compass,
} from 'lucide-react';
import { GuestInfo, EnvelopeStyle } from '../../shared/types';
import { formatGuestSalutation } from '../hooks/useGuestInfo';

interface EnvelopeModalProps {
  isOpen: boolean;
  onOpenEnvelope: () => void;
  guest: GuestInfo;
  groomName: string;
  brideName: string;
  weddingDateFormatted: string;
  playOpenSound?: () => void;
  envelopeStyle?: EnvelopeStyle;
  waxSealMonogram?: string;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  isOpen,
  onOpenEnvelope,
  guest,
  groomName,
  brideName,
  weddingDateFormatted,
  playOpenSound,
  envelopeStyle = 'royal_velvet',
  waxSealMonogram,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  // Format guest addressing cleanly with zero duplicate prefixes
  const cleanSalutation = formatGuestSalutation(guest);
  const defaultMonogram = `${groomName.charAt(0)} & ${brideName.charAt(0)}`;
  const displayMonogram = waxSealMonogram || defaultMonogram;

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (playOpenSound) {
      playOpenSound();
    }

    try {
      if (envelopeStyle === 'traditional_silk') {
        confetti({
          particleCount: 95,
          spread: 110,
          origin: { y: 0.55 },
          colors: ['#D4AF37', '#B91C1C', '#F59E0B', '#DC2626', '#FFFBEB'],
        });
      } else if (envelopeStyle === 'blush_ribbon' || envelopeStyle === 'korean_chiffon') {
        confetti({
          particleCount: 85,
          spread: 95,
          origin: { y: 0.55 },
          colors: ['#F472B6', '#FDA4AF', '#FFF0F5', '#E11D48', '#FFE4E6'],
        });
      } else if (envelopeStyle === 'celestial_midnight') {
        confetti({
          particleCount: 90,
          spread: 100,
          origin: { y: 0.55 },
          colors: ['#E0E7FF', '#FDE68A', '#93C5FD', '#FBBF24', '#FFFFFF'],
        });
      } else if (envelopeStyle === 'rustic_twine') {
        confetti({
          particleCount: 75,
          spread: 90,
          origin: { y: 0.55 },
          colors: ['#4A5D4E', '#B85D43', '#E6CF9B', '#FDFBF7'],
        });
      } else if (envelopeStyle === 'emerald_brass') {
        confetti({
          particleCount: 85,
          spread: 100,
          origin: { y: 0.55 },
          colors: ['#047857', '#D4AF37', '#10B981', '#F59E0B'],
        });
      } else if (envelopeStyle === 'indochine_kraft') {
        confetti({
          particleCount: 80,
          spread: 95,
          origin: { y: 0.55 },
          colors: ['#1B382B', '#C5A059', '#D97706', '#FFFBEB'],
        });
      } else {
        confetti({
          particleCount: 85,
          spread: 100,
          origin: { y: 0.55 },
          colors: ['#D4AF37', '#F3E5AB', '#DE5B78', '#5B1E31', '#FFFDF9'],
        });
      }
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      onOpenEnvelope();
      setIsOpening(false);
    }, 1100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md transition-all duration-700 animate-fadeIn">
      {/* Dynamic Ambient Glow adapted to style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {envelopeStyle === 'traditional_silk' ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-red-700/25 rounded-full blur-[140px]" />
        ) : envelopeStyle === 'celestial_midnight' ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-indigo-900/35 rounded-full blur-[140px]" />
        ) : envelopeStyle === 'blush_ribbon' || envelopeStyle === 'korean_chiffon' ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-pink-500/20 rounded-full blur-[140px]" />
        ) : envelopeStyle === 'rustic_twine' ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-emerald-800/20 rounded-full blur-[140px]" />
        ) : envelopeStyle === 'emerald_brass' ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-emerald-900/30 rounded-full blur-[140px]" />
        ) : envelopeStyle === 'indochine_kraft' ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-amber-900/25 rounded-full blur-[140px]" />
        ) : (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-wedding-burgundy/30 rounded-full blur-[140px]" />
        )}
      </div>

      <div className="relative w-full max-w-lg mx-auto">
        {/* ===================================================================
            1. STYLE: TRADITIONAL SILK (Gấm Đỏ Song Hỷ 囍 & Dát Vàng Cung Đình)
           =================================================================== */}
        {envelopeStyle === 'traditional_silk' && (
          <div
            className={`relative rounded-[32px] p-2.5 sm:p-4 shadow-2xl transition-all duration-700 border-2 border-[#D4AF37] gold-glow ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.01]'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 20%, #A81B26 0%, #8B111A 45%, #5B060D 100%)',
            }}
          >
            {/* Gilded Imperial Corner Clouds */}
            <div className="absolute top-3 left-3 text-[#D4AF37]/80 w-12 h-12 pointer-events-none">
              <svg viewBox="0 0 50 50" fill="currentColor">
                <path d="M0,0 L0,30 C5,20 20,5 30,0 Z" />
                <circle cx="10" cy="10" r="3" fill="#FFF3A8" />
              </svg>
            </div>
            <div className="absolute top-3 right-3 text-[#D4AF37]/80 w-12 h-12 pointer-events-none scale-x-[-1]">
              <svg viewBox="0 0 50 50" fill="currentColor">
                <path d="M0,0 L0,30 C5,20 20,5 30,0 Z" />
                <circle cx="10" cy="10" r="3" fill="#FFF3A8" />
              </svg>
            </div>
            <div className="absolute bottom-3 left-3 text-[#D4AF37]/80 w-12 h-12 pointer-events-none scale-y-[-1]">
              <svg viewBox="0 0 50 50" fill="currentColor">
                <path d="M0,0 L0,30 C5,20 20,5 30,0 Z" />
                <circle cx="10" cy="10" r="3" fill="#FFF3A8" />
              </svg>
            </div>
            <div className="absolute bottom-3 right-3 text-[#D4AF37]/80 w-12 h-12 pointer-events-none scale-[-1]">
              <svg viewBox="0 0 50 50" fill="currentColor">
                <path d="M0,0 L0,30 C5,20 20,5 30,0 Z" />
                <circle cx="10" cy="10" r="3" fill="#FFF3A8" />
              </svg>
            </div>

            {/* Inner Silk Card */}
            <div
              className={`bg-[#FFFDF7] rounded-2xl p-6 sm:p-9 text-center border-2 border-[#D4AF37]/60 shadow-inner relative overflow-hidden transition-all duration-700 ${
                isOpening ? '-translate-y-8' : 'translate-y-0'
              }`}
            >
              {/* Sacred Song Hy Medallion */}
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B111A] via-[#A81B26] to-[#5B060D] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-3xl font-serif font-bold shadow-lg gold-glow">
                  囍
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B111A]">
                  TRÂN TRỌNG BÁO HỶ • LỄ THÀNH HÔN
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold tracking-tight">
                  {groomName} & {brideName}
                </h2>
                <p className="text-xs text-stone-500 italic">Loan Phụng Hòa Minh • Trăm Năm Hảo Hợp</p>
              </div>

              {/* Guest Addressing Box */}
              <div className="my-5 p-4 rounded-xl bg-[#8B111A]/5 border border-[#D4AF37]/40 space-y-1 text-center">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold block">
                  KÍNH MỜI QUAN KHÁCH
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#8B111A]">
                  {cleanSalutation}
                </div>
                <p className="text-xs text-stone-600 font-light italic">
                  Đến chứng kiến lễ gia tiên và chung vui cùng hai bên gia đình
                </p>
              </div>

              <div className="text-xs text-stone-600 font-mono mb-6">
                🗓️ {weddingDateFormatted}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#8B111A] via-[#B91C1C] to-[#5B060D] text-white font-bold text-sm shadow-xl hover:opacity-95 active:scale-95 transition-all border border-[#D4AF37] cursor-pointer flex items-center justify-center space-x-2"
              >
                <span className="text-[#FFF3A8] text-base">囍</span>
                <span>{isOpening ? 'Đang Mở Thiệp Chúc Phúc...' : 'Chạm Mở Thiệp Cưới May Mắn'}</span>
                <Sparkles className="w-4 h-4 text-[#FFF3A8]" />
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            2. STYLE: ROYAL VELVET (Hào Nhoáng Cung Điện Hoàng Gia Châu Âu)
           =================================================================== */}
        {envelopeStyle === 'royal_velvet' && (
          <div
            className={`relative rounded-[32px] p-2.5 sm:p-4 shadow-2xl transition-all duration-700 border-2 border-wedding-gold gold-glow ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.01]'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 20%, #4A0E17 0%, #30060E 60%, #1A0207 100%)',
            }}
          >
            {/* Baroque Corner Filigrees */}
            <div className="absolute top-3 left-3 text-wedding-gold/80 w-12 h-12 pointer-events-none">
              <svg viewBox="0 0 50 50" fill="currentColor">
                <path d="M2,2 L24,2 C16,6 6,16 2,24 Z" opacity="0.4" />
                <path d="M0,0 L0,32 C5,22 22,5 32,0 Z" />
                <circle cx="10" cy="10" r="3" fill="#FFF3A8" />
              </svg>
            </div>
            <div className="absolute top-3 right-3 text-wedding-gold/80 w-12 h-12 pointer-events-none scale-x-[-1]">
              <svg viewBox="0 0 50 50" fill="currentColor">
                <path d="M2,2 L24,2 C16,6 6,16 2,24 Z" opacity="0.4" />
                <path d="M0,0 L0,32 C5,22 22,5 32,0 Z" />
                <circle cx="10" cy="10" r="3" fill="#FFF3A8" />
              </svg>
            </div>
            <div className="absolute bottom-3 left-3 text-wedding-gold/80 w-12 h-12 pointer-events-none scale-y-[-1]">
              <svg viewBox="0 0 50 50" fill="currentColor">
                <path d="M2,2 L24,2 C16,6 6,16 2,24 Z" opacity="0.4" />
                <path d="M0,0 L0,32 C5,22 22,5 32,0 Z" />
                <circle cx="10" cy="10" r="3" fill="#FFF3A8" />
              </svg>
            </div>
            <div className="absolute bottom-3 right-3 text-wedding-gold/80 w-12 h-12 pointer-events-none scale-[-1]">
              <svg viewBox="0 0 50 50" fill="currentColor">
                <path d="M2,2 L24,2 C16,6 6,16 2,24 Z" opacity="0.4" />
                <path d="M0,0 L0,32 C5,22 22,5 32,0 Z" />
                <circle cx="10" cy="10" r="3" fill="#FFF3A8" />
              </svg>
            </div>

            {/* Inner Cotton Card */}
            <div
              className={`bg-[#FFFDF9] rounded-2xl p-6 sm:p-9 text-center border-2 border-wedding-gold/50 shadow-inner relative overflow-hidden transition-all duration-700 ${
                isOpening ? '-translate-y-8' : 'translate-y-0'
              }`}
            >
              {/* Golden Crown */}
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-wedding-gold flex items-center justify-center text-wedding-gold shadow-sm">
                  <Crown className="w-6 h-6 text-wedding-gold" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-wedding-gold-dark font-sans">
                  ROYAL WEDDING INVITATION
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-wedding-burgundy font-normal tracking-tight">
                  {groomName} & {brideName}
                </h1>
                <p className="text-xs text-stone-500 italic">Lễ Thành Hôn • Save Our Date</p>
              </div>

              {/* Guest Addressing Box */}
              <div className="my-5 p-4 rounded-xl bg-wedding-rose-50/70 border border-wedding-gold/30 space-y-1 text-center">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold block">
                  TRÂN TRỌNG KÍNH MỜI
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  {cleanSalutation}
                </div>
                <p className="text-xs text-stone-600 font-light italic">
                  Đến dự tiệc chung vui cùng đôi uyên ương và hai bên gia đình
                </p>
              </div>

              <div className="text-xs text-stone-600 font-mono mb-6">
                🗓️ {weddingDateFormatted}
              </div>

              {/* 3D Wax Seal Open Button */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-wedding-rose-800 via-wedding-burgundy to-[#4A1020] text-white font-bold text-sm shadow-luxury hover:opacity-95 active:scale-95 transition-all border border-wedding-gold/60 cursor-pointer flex items-center justify-center space-x-2.5"
              >
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 text-amber-950 font-serif font-black text-xs flex items-center justify-center shadow-md border border-amber-100">
                  {displayMonogram}
                </span>
                <span>{isOpening ? 'Đang Mở Dấu Ấn Hoàng Gia...' : 'Chạm Mở Thiệp Hoàng Gia'}</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            3. STYLE: ROMANTIC PEONY & SILK RIBBON (Lãng Mạn Nàng Thơ Cổ Tích)
           =================================================================== */}
        {envelopeStyle === 'blush_ribbon' && (
          <div
            className={`relative rounded-[32px] p-2.5 sm:p-4 shadow-2xl transition-all duration-700 border-2 border-pink-300/80 ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.01]'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 20%, #FFF5F7 0%, #FCE4EC 55%, #F8BBD0 100%)',
            }}
          >
            {/* Chiffon Ribbon Bow Bar */}
            <div className="h-6 w-full flex items-center justify-center mb-1">
              <span className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-pink-400 to-pink-300" />
              <span className="px-3 text-pink-600 text-base filter drop-shadow-sm">🎀</span>
              <span className="h-0.5 flex-1 bg-gradient-l from-transparent via-pink-400 to-pink-300" />
            </div>

            {/* Inner Paper Card */}
            <div
              className={`bg-white rounded-2xl p-6 sm:p-9 text-center border border-pink-200 shadow-sm relative overflow-hidden transition-all duration-700 ${
                isOpening ? '-translate-y-8' : 'translate-y-0'
              }`}
            >
              <div className="flex justify-center mb-2">
                <span className="w-10 h-10 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-500 shadow-sm">
                  <Flower2 className="w-5 h-5" />
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-pink-500 font-sans">
                  SWEET ROMANTIC STORY
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-pink-900 font-normal italic tracking-wide">
                  {groomName} & {brideName}
                </h1>
                <p className="text-xs text-stone-500 italic">"Giấc mơ cổ tích ngập tràn sắc hoa và tình yêu"</p>
              </div>

              {/* Guest Addressing Box */}
              <div className="my-5 p-4 rounded-xl bg-pink-50/70 border border-pink-200/90 space-y-1 text-center">
                <span className="text-[10px] text-pink-500 uppercase tracking-widest font-semibold block">
                  THÂN MỜI
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-pink-950">
                  {cleanSalutation}
                </div>
                <p className="text-xs text-stone-600 font-light italic">
                  Đến cùng chung vui trong ngày hạnh phúc ngập tràn hoa hồng
                </p>
              </div>

              <div className="text-xs text-stone-600 font-mono mb-6">
                🗓️ {weddingDateFormatted}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-sm shadow-lg hover:opacity-95 active:scale-95 transition-all border border-pink-200 cursor-pointer flex items-center justify-center space-x-2"
              >
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>{isOpening ? 'Đang Mở Dải Ruy Băng...' : 'Chạm Mở Thiệp Nàng Thơ'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            4. STYLE: KOREAN CHIFFON (Hàn Quốc Pastel Thơ Mộng & Voan Lụa)
           =================================================================== */}
        {envelopeStyle === 'korean_chiffon' && (
          <div
            className={`relative rounded-[32px] p-2.5 sm:p-4 shadow-2xl transition-all duration-700 border-2 border-orange-200/80 ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.01]'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 20%, #FFF8F5 0%, #FFE8DF 60%, #FFD3C4 100%)',
            }}
          >
            <div className="h-6 w-full flex items-center justify-center mb-1 text-orange-400 text-xs tracking-widest font-mono">
              🌸 ✦ WEDDING ESSENCE ✦ 🌸
            </div>

            {/* Inner Paper Card */}
            <div
              className={`bg-white/95 rounded-2xl p-6 sm:p-9 text-center border border-orange-200 shadow-sm relative overflow-hidden transition-all duration-700 ${
                isOpening ? '-translate-y-8' : 'translate-y-0'
              }`}
            >
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-400 font-sans">
                  KOREAN PASTEL SERENITY
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-stone-800 font-normal tracking-wide">
                  {groomName} & {brideName}
                </h1>
                <p className="text-xs text-stone-500 italic">"Như thước phim thanh xuân êm đềm và dịu ngọt"</p>
              </div>

              {/* Guest Addressing Box */}
              <div className="my-5 p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-1 text-center">
                <span className="text-[10px] text-orange-600 uppercase tracking-widest font-semibold block">
                  THƯ MỜI THÂN YÊU
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  {cleanSalutation}
                </div>
                <p className="text-xs text-stone-600 font-light italic">
                  Cùng chứng kiến khoảnh khắc ngọt ngào nhất đời chúng mình
                </p>
              </div>

              <div className="text-xs text-stone-600 font-mono mb-6">
                🗓️ {weddingDateFormatted}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 text-white font-bold text-sm shadow-md hover:opacity-95 active:scale-95 transition-all border border-rose-200 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>🌸</span>
                <span>{isOpening ? 'Đang Mở Lớp Voan Lụa...' : 'Chạm Mở Thiệp Pastel'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            5. STYLE: MODERN EDITORIAL & VELLUM (Thanh Lịch Tối Giản Tạp Chí)
           =================================================================== */}
        {(envelopeStyle === 'modern_minimal' || envelopeStyle === 'editorial_vellum') && (
          <div
            className={`relative rounded-3xl p-3 sm:p-5 shadow-2xl transition-all duration-700 border border-stone-800 ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.01]'
            }`}
            style={{
              background: '#121212',
            }}
          >
            {/* Top Issue Tag */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-[10px] font-mono tracking-[0.25em] text-stone-400 uppercase">
              <span>SPECIAL ISSUE</span>
              <span>EST. 2026</span>
            </div>

            {/* Inner Paper Card */}
            <div
              className={`bg-[#FAF8F5] text-stone-900 rounded-xl p-6 sm:p-9 text-center relative overflow-hidden transition-all duration-700 my-2 ${
                isOpening ? '-translate-y-8' : 'translate-y-0'
              }`}
            >
              <div className="space-y-1">
                <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-stone-500 font-bold">
                  THE WEDDING INVITATION
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight uppercase">
                  {groomName} & {brideName}
                </h1>
                <p className="text-xs text-stone-500 font-light tracking-wide">
                  Contemporary Architecture • Minimalist Chic
                </p>
              </div>

              {/* Guest Addressing Box */}
              <div className="my-6 py-4 border-y border-stone-300 space-y-1 text-center">
                <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">
                  INVITED GUEST
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-black">
                  {cleanSalutation}
                </div>
              </div>

              <div className="text-xs text-stone-600 font-mono mb-6">
                DATE: {weddingDateFormatted}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="w-full py-3.5 rounded-none bg-stone-950 text-white font-mono font-bold text-xs uppercase tracking-[0.2em] shadow-md hover:bg-stone-800 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>{isOpening ? 'OPENING...' : 'OPEN INVITATION'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            6. STYLE: RUSTIC BOTANICAL (Tươi Tắn Sân Vườn & Cành Lá Oliu)
           =================================================================== */}
        {envelopeStyle === 'rustic_twine' && (
          <div
            className={`relative rounded-[32px] p-2.5 sm:p-4 shadow-2xl transition-all duration-700 border-2 border-emerald-700/60 ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.01]'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 20%, #4A5D4E 0%, #354438 60%, #202A22 100%)',
            }}
          >
            {/* Inner Kraft Cotton Card */}
            <div
              className={`bg-[#FDFBF7] text-stone-900 rounded-2xl p-6 sm:p-9 text-center border-2 border-emerald-800/30 shadow-inner relative overflow-hidden transition-all duration-700 ${
                isOpening ? '-translate-y-8' : 'translate-y-0'
              }`}
            >
              <div className="flex justify-center mb-2 text-2xl">
                🌿
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-800 font-sans">
                  OUTDOOR CELEBRATION
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
                  {groomName} & {brideName}
                </h1>
                <p className="text-xs text-stone-500 italic">"Tình yêu đơm hoa kết trái giữa thiên nhiên thanh bình"</p>
              </div>

              {/* Guest Addressing Box */}
              <div className="my-5 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1 text-center">
                <span className="text-[10px] text-emerald-800 uppercase tracking-widest font-semibold block">
                  KÍNH MỜI BẠN QUÝ
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  {cleanSalutation}
                </div>
                <p className="text-xs text-stone-600 font-light italic">
                  Đến hòa mình vào không gian cưới sân vườn ấm áp cùng chúng mình
                </p>
              </div>

              <div className="text-xs text-stone-600 font-mono mb-6">
                🗓️ {weddingDateFormatted}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-800 via-[#4A5D4E] to-emerald-900 text-white font-bold text-sm shadow-lg hover:opacity-95 active:scale-95 transition-all border border-emerald-300/40 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>🌿</span>
                <span>{isOpening ? 'Đang Mở Cánh Cổng Vườn...' : 'Chạm Mở Thiệp Sân Vườn'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            7. STYLE: CELESTIAL MIDNIGHT (Huyền Ảo Dạ Tiệc Ánh Trăng Ngàn Sao)
           =================================================================== */}
        {envelopeStyle === 'celestial_midnight' && (
          <div
            className={`relative rounded-[32px] p-2.5 sm:p-4 shadow-2xl transition-all duration-700 border-2 border-slate-400/70 ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.01]'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 20%, #1E293B 0%, #0F172A 50%, #030712 100%)',
            }}
          >
            {/* Constellation Star Accents */}
            <div className="flex items-center justify-center space-x-2 py-1 text-amber-200 text-xs">
              <span>✨</span>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-300">
                WRITTEN IN THE STARS
              </span>
              <span>✨</span>
            </div>

            {/* Inner Dark Starlight Card */}
            <div
              className={`bg-[#0B132B] text-slate-100 rounded-2xl p-6 sm:p-9 text-center border border-slate-700 shadow-2xl relative overflow-hidden transition-all duration-700 ${
                isOpening ? '-translate-y-8' : 'translate-y-0'
              }`}
            >
              <div className="flex justify-center mb-2 text-2xl">
                🌙
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-200 font-sans">
                  MOONLIGHT SOIRÉE
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
                  {groomName} & {brideName}
                </h1>
                <p className="text-xs text-slate-400 italic">"Nguyện ước trăm năm khắc ghi giữa dải ngân hà"</p>
              </div>

              {/* Guest Addressing Box */}
              <div className="my-5 p-4 rounded-xl bg-slate-900/90 border border-slate-700 space-y-1 text-center">
                <span className="text-[10px] text-amber-200 uppercase tracking-widest font-semibold block">
                  CORDIALLY INVITED
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                  {cleanSalutation}
                </div>
                <p className="text-xs text-slate-400 font-light italic">
                  Đến dự dạ tiệc ánh trăng lãng mạn dưới bầu trời ngàn sao
                </p>
              </div>

              <div className="text-xs text-slate-400 font-mono mb-6">
                🗓️ {weddingDateFormatted}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white font-bold text-sm shadow-2xl hover:opacity-95 active:scale-95 transition-all border border-slate-400 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span className="text-amber-200">🌙</span>
                <span>{isOpening ? 'Đang Mở Bầu Trời Sao...' : 'Chạm Mở Thiệp Ánh Trăng'}</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            8. STYLE: INDOCHINE KRAFT (Đông Dương Hoài Niệm & Di Sản Gạch Bông)
           =================================================================== */}
        {envelopeStyle === 'indochine_kraft' && (
          <div
            className={`relative rounded-[32px] p-2.5 sm:p-4 shadow-2xl transition-all duration-700 border-2 border-amber-600/70 ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.01]'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 20%, #1B382B 0%, #12251D 60%, #0A1510 100%)',
            }}
          >
            {/* Top Vintage Postmark Tag */}
            <div className="flex items-center justify-between pb-2 border-b border-amber-600/40 text-[10px] font-mono tracking-widest text-amber-200 uppercase">
              <span>🏛️ INDOCHINE HERITAGE</span>
              <span>POSTAL D'AMOUR</span>
            </div>

            {/* Inner Parchment Card */}
            <div
              className={`bg-[#F5F0E6] text-[#2C2622] rounded-2xl p-6 sm:p-9 text-center border-2 border-amber-700/30 shadow-inner relative overflow-hidden transition-all duration-700 my-2 ${
                isOpening ? '-translate-y-8' : 'translate-y-0'
              }`}
            >
              <div className="flex justify-center mb-2">
                <span className="w-12 h-12 rounded-full bg-[#1B382B] text-amber-200 flex items-center justify-center border-2 border-amber-600 font-serif font-bold text-xl shadow-md">
                  印
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1B382B] font-sans">
                  THIỆP BÁO HỶ ĐÔNG DƯƠNG
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1B382B] font-bold tracking-tight">
                  {groomName} & {brideName}
                </h1>
                <p className="text-xs text-stone-600 italic">"Mối lương duyên son sắt mang phong vị di sản xưa"</p>
              </div>

              {/* Guest Addressing Box */}
              <div className="my-5 p-4 rounded-xl bg-[#1B382B]/10 border border-amber-700/40 space-y-1 text-center">
                <span className="text-[10px] text-amber-900 uppercase tracking-widest font-semibold block">
                  KÍNH MỜI QUÝ BÁC QUÝ KHÁCH
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#1B382B]">
                  {cleanSalutation}
                </div>
                <p className="text-xs text-stone-600 font-light italic">
                  Đến chứng kiến hôn lễ và chung vui cùng hai họ chúng tôi
                </p>
              </div>

              <div className="text-xs text-stone-700 font-mono mb-6">
                🗓️ {weddingDateFormatted}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#1B382B] via-[#2A5240] to-[#1B382B] text-amber-100 font-bold text-sm shadow-xl hover:opacity-95 active:scale-95 transition-all border border-amber-500/50 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>🏛️</span>
                <span>{isOpening ? 'Đang Mở Thư Đông Dương...' : 'Chạm Mở Bức Thư Hoài Niệm'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================================================================
            9. STYLE: EMERALD BRASS (Cổ Điển Ngọc Lục Bảo & Đồng Hoàng Gia)
           =================================================================== */}
        {envelopeStyle === 'emerald_brass' && (
          <div
            className={`relative rounded-[32px] p-2.5 sm:p-4 shadow-2xl transition-all duration-700 border-2 border-amber-400/80 ${
              isOpening ? 'scale-105 opacity-90' : 'hover:scale-[1.01]'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 20%, #064E3B 0%, #04382B 60%, #02241B 100%)',
            }}
          >
            {/* Inner Emerald Card */}
            <div
              className={`bg-[#FAF5E9] text-stone-900 rounded-2xl p-6 sm:p-9 text-center border-2 border-amber-500/50 shadow-inner relative overflow-hidden transition-all duration-700 ${
                isOpening ? '-translate-y-8' : 'translate-y-0'
              }`}
            >
              <div className="flex justify-center mb-2">
                <span className="w-12 h-12 rounded-full bg-[#064E3B] text-amber-300 flex items-center justify-center border-2 border-amber-400 font-serif shadow-md">
                  <Compass className="w-6 h-6" />
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#064E3B] font-sans">
                  EMERALD & ANTIQUE BRASS
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#064E3B] font-normal tracking-tight">
                  {groomName} & {brideName}
                </h1>
                <p className="text-xs text-stone-500 italic">"Vẻ đẹp vương giả trường tồn cùng năm tháng"</p>
              </div>

              {/* Guest Addressing Box */}
              <div className="my-5 p-4 rounded-xl bg-emerald-900/10 border border-amber-600/40 space-y-1 text-center">
                <span className="text-[10px] text-[#064E3B] uppercase tracking-widest font-semibold block">
                  CORDIALLY INVITED
                </span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#064E3B]">
                  {cleanSalutation}
                </div>
                <p className="text-xs text-stone-600 font-light italic">
                  Hân hạnh được đón tiếp trong không gian tiệc cưới quý phái
                </p>
              </div>

              <div className="text-xs text-stone-600 font-mono mb-6">
                🗓️ {weddingDateFormatted}
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#064E3B] via-[#08674E] to-[#064E3B] text-amber-100 font-bold text-sm shadow-xl hover:opacity-95 active:scale-95 transition-all border border-amber-400/60 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 font-bold text-xs flex items-center justify-center">
                  ✦
                </span>
                <span>{isOpening ? 'Đang Mở Thiệp Lục Bảo...' : 'Chạm Mở Thiệp Ngọc Lục Bảo'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
