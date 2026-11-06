import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Crown, Feather, Flower2 } from 'lucide-react';
import { GuestInfo, EnvelopeStyle } from '../../shared/types';
import { ROLE_CONFIG } from '../hooks/useGuestInfo';

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

  const roleData = ROLE_CONFIG[guest.role] || ROLE_CONFIG.ban;
  const salutation = guest.role === 'gia_dinh' ? guest.name : `${roleData.prefix} ${guest.name}`;

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (playOpenSound) {
      playOpenSound();
    }

    try {
      if (envelopeStyle === 'blush_ribbon') {
        // Soft pink and rose petal burst
        confetti({
          particleCount: 75,
          spread: 90,
          origin: { y: 0.55 },
          colors: ['#F472B6', '#FDA4AF', '#FFF0F5', '#E11D48'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 70,
            angle: 60,
            spread: 75,
            origin: { x: 0.15, y: 0.65 },
            colors: ['#FBCFE8', '#F43F5E', '#FFFFFF'],
          });
          confetti({
            particleCount: 70,
            angle: 120,
            spread: 75,
            origin: { x: 0.85, y: 0.65 },
            colors: ['#FBCFE8', '#F43F5E', '#FFFFFF'],
          });
        }, 200);
      } else if (envelopeStyle === 'emerald_brass') {
        // Antique brass and emerald glints
        confetti({
          particleCount: 75,
          spread: 90,
          origin: { y: 0.55 },
          colors: ['#D97706', '#059669', '#FBBF24', '#047857', '#FAF5E9'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 60,
            spread: 100,
            origin: { y: 0.4 },
            colors: ['#B45309', '#10B981', '#F59E0B'],
          });
        }, 250);
      } else if (envelopeStyle === 'modern_minimal') {
        // Crisp champagne and silver stardust
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#D4AF37', '#E2E8F0', '#FFFFFF', '#AA771C'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 70,
            spread: 110,
            origin: { y: 0.4 },
            colors: ['#F3E5AB', '#94A3B8', '#D4AF37'],
          });
        }, 250);
      } else {
        // Royal velvet: Crimson & royal gold burst
        confetti({
          particleCount: 70,
          spread: 100,
          origin: { y: 0.55 },
          colors: ['#D4AF37', '#F3E5AB', '#FFF3A8', '#E6CF9B'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 80,
            origin: { x: 0.15, y: 0.65 },
            colors: ['#DE5B78', '#991B1B', '#FFF0F5', '#C5A059'],
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 80,
            origin: { x: 0.85, y: 0.65 },
            colors: ['#DE5B78', '#991B1B', '#FFF0F5', '#C5A059'],
          });
        }, 250);
      }
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      onOpenEnvelope();
      setIsOpening(false);
    }, 1250);
  };

  if (!isOpen) return null;

  const defaultMonogram = `${groomName.charAt(0)} & ${brideName.charAt(0)}`;
  const displayMonogram = waxSealMonogram || defaultMonogram;

  // =========================================================================
  // RENDER RADICALLY DISTINCT ENVELOPES BASED ON SELECTED STYLE
  // =========================================================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md transition-all duration-700 animate-fadeIn">
      {/* Background ambient lighting adapted to style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {envelopeStyle === 'blush_ribbon' ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[110px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-400/20 rounded-full blur-[110px]" />
          </>
        ) : envelopeStyle === 'modern_minimal' ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-400/15 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-stone-500/15 rounded-full blur-[120px]" />
          </>
        ) : envelopeStyle === 'emerald_brass' ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/25 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px]" />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-wedding-burgundy/30 rounded-full blur-[110px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[110px]" />
          </>
        )}
      </div>

      <div className="relative w-full max-w-xl mx-auto">
        {/* ===================================================================
            STYLE 1: ROYAL VELVET (Nhung Đỏ Quý Tộc & Baroque Vàng Kim)
           =================================================================== */}
        {envelopeStyle === 'royal_velvet' && (
          <div
            className={`relative bg-gradient-to-br from-[#3D0A16] via-[#5A1424] to-[#2B040B] rounded-3xl shadow-2xl p-2.5 sm:p-3.5 transition-transform duration-700 border-2 border-wedding-gold/80 gold-glow ${
              isOpening ? 'scale-105' : 'hover:scale-[1.01]'
            }`}
          >
            {/* Intricate Baroque Corner Filigrees (All 4 Corners) */}
            <div className="absolute top-3 left-3 w-10 h-10 pointer-events-none text-wedding-gold/80">
              <svg viewBox="0 0 40 40" fill="currentColor">
                <path d="M2,2 L18,2 C12,5 5,12 2,18 Z" opacity="0.4" />
                <path d="M0,0 L0,24 C4,16 16,4 24,0 Z" />
                <circle cx="8" cy="8" r="2.5" fill="#FFF3A8" />
              </svg>
            </div>
            <div className="absolute top-3 right-3 w-10 h-10 pointer-events-none text-wedding-gold/80 scale-x-[-1]">
              <svg viewBox="0 0 40 40" fill="currentColor">
                <path d="M2,2 L18,2 C12,5 5,12 2,18 Z" opacity="0.4" />
                <path d="M0,0 L0,24 C4,16 16,4 24,0 Z" />
                <circle cx="8" cy="8" r="2.5" fill="#FFF3A8" />
              </svg>
            </div>
            <div className="absolute bottom-3 left-3 w-10 h-10 pointer-events-none text-wedding-gold/80 scale-y-[-1]">
              <svg viewBox="0 0 40 40" fill="currentColor">
                <path d="M2,2 L18,2 C12,5 5,12 2,18 Z" opacity="0.4" />
                <path d="M0,0 L0,24 C4,16 16,4 24,0 Z" />
                <circle cx="8" cy="8" r="2.5" fill="#FFF3A8" />
              </svg>
            </div>
            <div className="absolute bottom-3 right-3 w-10 h-10 pointer-events-none text-wedding-gold/80 scale-[-1]">
              <svg viewBox="0 0 40 40" fill="currentColor">
                <path d="M2,2 L18,2 C12,5 5,12 2,18 Z" opacity="0.4" />
                <path d="M0,0 L0,24 C4,16 16,4 24,0 Z" />
                <circle cx="8" cy="8" r="2.5" fill="#FFF3A8" />
              </svg>
            </div>

            {/* Inner Paper Card */}
            <div
              className={`paper-luxury rounded-2xl p-6 sm:p-10 text-center border-2 border-wedding-gold/50 shadow-inner relative overflow-hidden transition-all duration-1000 ${
                isOpening ? '-translate-y-10 opacity-95 shadow-2xl' : 'translate-y-0'
              }`}
            >
              <div className="absolute inset-0 shimmer-gold-effect pointer-events-none opacity-40" />

              {/* Imperial Crown Emblem */}
              <div className="relative z-10 flex items-center justify-center space-x-3 mb-2">
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-wedding-gold" />
                <div className="w-9 h-9 rounded-full bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-wedding-gold flex items-center justify-center text-wedding-gold-dark shadow-sm">
                  <Crown className="w-5 h-5 text-wedding-gold" />
                </div>
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-wedding-gold" />
              </div>

              <p className="relative z-10 text-[11px] uppercase tracking-[0.3em] text-wedding-gold-dark font-bold mb-1">
                TRÂN TRỌNG BÁO HỶ • THIỆP MỜI HOÀNG GIA
              </p>
              <h1 className="relative z-10 font-serif text-2xl sm:text-3xl text-wedding-burgundy font-normal tracking-wide">
                Royal Wedding Invitation
              </h1>

              {/* Couple Names */}
              <div className="relative z-10 my-5 py-4 border-y border-wedding-gold/30">
                <div className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold tracking-tight">
                  {groomName}
                </div>
                <div className="font-handwriting text-3xl sm:text-4xl text-wedding-rose-600 my-1">
                  &
                </div>
                <div className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold tracking-tight">
                  {brideName}
                </div>
              </div>

              {/* Guest Salutation Box */}
              <div className="relative z-10 bg-gradient-to-r from-wedding-rose-50/90 via-wedding-cream to-wedding-rose-50/90 border border-wedding-gold/40 rounded-2xl p-4 my-5 shadow-sm">
                <p className="text-[11px] text-stone-500 uppercase tracking-widest font-semibold mb-1">
                  Kính Mời Quan Khách
                </p>
                <p className="text-xl sm:text-2xl font-bold text-wedding-burgundy font-serif">
                  {salutation}
                </p>
                <p className="text-xs text-stone-600 mt-1 italic">
                  Cùng {roleData.companion} tới dự hôn lễ chung vui cùng hai bên gia đình
                </p>
              </div>

              <p className="relative z-10 text-xs sm:text-sm text-stone-700 font-semibold tracking-wider">
                {weddingDateFormatted}
              </p>

              {/* Wax Seal Action Button */}
              <div className="relative z-10 mt-7 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleOpen}
                  disabled={isOpening}
                  className="group relative flex items-center justify-center space-x-3.5 px-8 py-3.5 bg-gradient-to-r from-[#75142B] via-[#9E1B38] to-[#5C0F22] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-wedding-gold/70 cursor-pointer"
                >
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-serif font-black text-amber-100 shadow-md border border-amber-300/80 ring-2 ring-amber-400/20"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 35%, #DE5B78 0%, #B82A4C 45%, #75142B 80%, #4A0B1B 100%)',
                    }}
                  >
                    {displayMonogram}
                  </span>
                  <span className="font-semibold tracking-wide text-sm sm:text-base text-amber-50">
                    {isOpening ? 'Đang Mở Thiệp Hoàng Gia...' : 'Chạm Mở Thiệp Cưới'}
                  </span>
                  <Sparkles className="w-4 h-4 text-wedding-gold-light animate-spin" style={{ animationDuration: '4s' }} />
                </button>
                <p className="text-[11px] text-stone-400 mt-3">
                  Phong cách Cung Điện Châu Âu • Nhung Đỏ & Sáp Vàng
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            STYLE 2: BLUSH RIBBON (Hồng Phấn Nơ Lụa & Vườn Cổ Tích)
           =================================================================== */}
        {envelopeStyle === 'blush_ribbon' && (
          <div
            className={`relative bg-gradient-to-br from-[#FFF5F8] via-[#FCE4EC] to-[#F8BBD0] rounded-3xl shadow-2xl p-3 sm:p-4 transition-transform duration-700 border-2 border-rose-300 shadow-pink-500/20 ${
              isOpening ? 'scale-105' : 'hover:scale-[1.01]'
            }`}
          >
            {/* Satin Ribbon Cross-Band with Realistic Silky Highlights */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-r from-rose-200 via-rose-100 to-rose-200 border-y border-rose-300/90 shadow-md pointer-events-none z-20 flex items-center justify-center opacity-90" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-b from-rose-200 via-rose-100 to-rose-200 border-x border-rose-300/90 shadow-md pointer-events-none z-20 flex items-center justify-center opacity-90" />

            {/* Central Realistic 3D Satin Ribbon Bow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Left bow loop */}
                <div className="w-8 h-6 bg-gradient-to-br from-rose-300 to-rose-200 rounded-full border border-rose-400/80 -rotate-25 shadow-md -mr-1.5" />
                {/* Center pearl ring */}
                <div className="w-8 h-8 rounded-full bg-white border-2 border-rose-300 shadow-lg flex items-center justify-center z-10">
                  <Flower2 className="w-4 h-4 text-pink-500" />
                </div>
                {/* Right bow loop */}
                <div className="w-8 h-6 bg-gradient-to-bl from-rose-300 to-rose-200 rounded-full border border-rose-400/80 rotate-25 shadow-md -ml-1.5" />
              </div>
            </div>

            {/* Inner Card */}
            <div
              className={`bg-[#FFFBFC] rounded-2xl p-6 sm:p-10 text-center border border-rose-200 shadow-inner relative overflow-hidden transition-all duration-1000 ${
                isOpening ? '-translate-y-10 opacity-95 shadow-2xl' : 'translate-y-0'
              }`}
            >
              {/* Botanical Blossom Emblem */}
              <div className="relative z-10 flex items-center justify-center space-x-3 mb-2">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-pink-300" />
                <div className="w-9 h-9 rounded-full bg-pink-50 border border-pink-300 flex items-center justify-center text-pink-600 shadow-sm">
                  <Flower2 className="w-5 h-5 text-pink-500" />
                </div>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-pink-300" />
              </div>

              <p className="relative z-10 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-pink-700 font-semibold mb-1">
                LỜI HẸN ƯỚC MÙA XUÂN • FAIRYTALE ROMANCE
              </p>
              <h1 className="relative z-10 font-serif italic text-2xl sm:text-3xl text-pink-900 font-normal tracking-wide">
                Wedding Invitation
              </h1>

              {/* Couple Names */}
              <div className="relative z-10 my-5 py-4 border-y border-pink-200">
                <div className="font-serif text-2xl sm:text-3xl text-stone-800 font-bold tracking-tight">
                  {groomName}
                </div>
                <div className="font-handwriting text-3xl sm:text-4xl text-rose-500 my-1">
                  &
                </div>
                <div className="font-serif text-2xl sm:text-3xl text-stone-800 font-bold tracking-tight">
                  {brideName}
                </div>
              </div>

              {/* Guest Salutation Box */}
              <div className="relative z-10 bg-gradient-to-r from-pink-50/90 via-white to-pink-50/90 border border-pink-200 rounded-2xl p-4 my-5 shadow-sm">
                <p className="text-[11px] text-pink-700 uppercase tracking-widest font-semibold mb-1">
                  Kính Mời Quan Khách
                </p>
                <p className="text-xl sm:text-2xl font-bold text-pink-900 font-serif">
                  {salutation}
                </p>
                <p className="text-xs text-stone-600 mt-1 italic">
                  Cùng {roleData.companion} tới dự hôn lễ chung vui cùng hai bên gia đình
                </p>
              </div>

              <p className="relative z-10 text-xs sm:text-sm text-pink-800 font-medium tracking-wider">
                {weddingDateFormatted}
              </p>

              {/* Pearl Cameo Action Button */}
              <div className="relative z-10 mt-7 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleOpen}
                  disabled={isOpening}
                  className="group relative flex items-center justify-center space-x-3 px-8 py-3.5 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white rounded-full shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all duration-300 border border-pink-200 cursor-pointer"
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-serif font-black text-rose-950 shadow-sm border border-white ring-2 ring-pink-300"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FCE7F0 45%, #F472B6 95%)',
                    }}
                  >
                    {displayMonogram}
                  </span>
                  <span className="font-semibold tracking-wide text-sm sm:text-base text-white">
                    {isOpening ? 'Đang Mở Dải Nơ Lụa...' : 'Mở Dải Nơ Lụa Thiệp Cưới'}
                  </span>
                  <Heart className="w-4 h-4 text-pink-200 fill-pink-200" />
                </button>
                <p className="text-[11px] text-pink-600/80 mt-3">
                  Phong cách Nàng Thơ • Nơ Lụa Pastel & Hoa Mẫu Đơn
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            STYLE 3: MODERN MINIMAL (Tối Giản Bắc Âu & Giấy Mỹ Thuật Viền Vàng)
           =================================================================== */}
        {envelopeStyle === 'modern_minimal' && (
          <div
            className={`relative bg-gradient-to-br from-[#FAF8F5] via-[#FFFDF9] to-[#EFEAE1] rounded-2xl shadow-2xl p-3 sm:p-4 transition-transform duration-700 border-[1.5px] border-amber-300/80 ${
              isOpening ? 'scale-105' : 'hover:scale-[1.01]'
            }`}
          >
            {/* Minimalist Corner Crosshairs (Architectural Precision) */}
            <div className="absolute top-3 left-3 text-amber-500/80 font-mono text-xs pointer-events-none">
              +
            </div>
            <div className="absolute top-3 right-3 text-amber-500/80 font-mono text-xs pointer-events-none">
              +
            </div>
            <div className="absolute bottom-3 left-3 text-amber-500/80 font-mono text-xs pointer-events-none">
              +
            </div>
            <div className="absolute bottom-3 right-3 text-amber-500/80 font-mono text-xs pointer-events-none">
              +
            </div>

            {/* Inner Card (Pure Architectural Cotton White) */}
            <div
              className={`bg-white rounded-xl p-6 sm:p-10 text-center border border-stone-200/90 shadow-sm relative overflow-hidden transition-all duration-1000 ${
                isOpening ? '-translate-y-10 opacity-95 shadow-2xl' : 'translate-y-0'
              }`}
            >
              {/* Minimalist Diamond Emblem */}
              <div className="relative z-10 flex items-center justify-center space-x-3 mb-3">
                <span className="h-[1px] w-12 bg-stone-300" />
                <div className="w-8 h-8 rounded-full border border-amber-400/80 flex items-center justify-center text-amber-600">
                  <span className="w-2.5 h-2.5 rotate-45 border border-amber-500 block" />
                </div>
                <span className="h-[1px] w-12 bg-stone-300" />
              </div>

              <p className="relative z-10 text-[10px] uppercase tracking-[0.38em] text-stone-500 font-sans font-medium mb-1">
                WEDDING INVITATION • SCANDINAVIAN EDITORIAL
              </p>
              <h1 className="relative z-10 font-sans text-xl sm:text-2xl text-stone-900 font-light tracking-[0.2em] uppercase">
                Save Our Date
              </h1>

              {/* Couple Names (Crisp High-Fashion Editorial Typography) */}
              <div className="relative z-10 my-6 py-4 border-y border-stone-200">
                <div className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal tracking-tight">
                  {groomName}
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-amber-600 font-sans my-1 font-semibold">
                  and
                </div>
                <div className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal tracking-tight">
                  {brideName}
                </div>
              </div>

              {/* Guest Salutation Box (Clean Framed Line) */}
              <div className="relative z-10 bg-stone-50 border border-stone-200 rounded-xl p-4 my-5">
                <p className="text-[10px] text-stone-400 uppercase tracking-widest font-sans font-medium mb-1">
                  Trân Trọng Kính Mời
                </p>
                <p className="text-lg sm:text-xl font-medium text-stone-900 font-sans">
                  {salutation}
                </p>
                <p className="text-xs text-stone-500 mt-1 font-light">
                  Cùng {roleData.companion} tới dự hôn lễ chung vui
                </p>
              </div>

              <p className="relative z-10 text-xs text-stone-600 font-sans uppercase tracking-[0.18em]">
                {weddingDateFormatted}
              </p>

              {/* Scandinavian Charcoal Button */}
              <div className="relative z-10 mt-7 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleOpen}
                  disabled={isOpening}
                  className="group relative flex items-center justify-center space-x-3 px-8 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/70 cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-full bg-stone-800 border border-amber-400/60 flex items-center justify-center text-[11px] font-sans font-bold text-amber-300 tracking-wider">
                    {displayMonogram}
                  </span>
                  <span className="font-sans text-xs sm:text-sm uppercase tracking-widest text-stone-100 font-medium">
                    {isOpening ? 'Opening...' : 'Mở Thiệp Tối Giản'}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-3 font-sans">
                  Phong cách Tối Giản • Giấy Mỹ Thuật & Viền Vàng Kim
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            STYLE 4: EMERALD BRASS (Ngọc Lục Bảo & Con Dấu Đồng Cổ Điển)
           =================================================================== */}
        {envelopeStyle === 'emerald_brass' && (
          <div
            className={`relative bg-gradient-to-br from-[#04241A] via-[#093527] to-[#021710] rounded-3xl shadow-2xl p-2.5 sm:p-3.5 transition-transform duration-700 border-2 border-amber-500/80 shadow-emerald-950/60 ${
              isOpening ? 'scale-105' : 'hover:scale-[1.01]'
            }`}
          >
            {/* Heavy Cast Antique Brass Corner Plates with Rivet Studs */}
            <div className="absolute top-2.5 left-2.5 w-10 h-10 pointer-events-none">
              <div className="w-full h-full border-t-4 border-l-4 border-amber-500/90 rounded-tl-sm relative">
                <span className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-700 shadow-sm" />
              </div>
            </div>
            <div className="absolute top-2.5 right-2.5 w-10 h-10 pointer-events-none">
              <div className="w-full h-full border-t-4 border-r-4 border-amber-500/90 rounded-tr-sm relative">
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-700 shadow-sm" />
              </div>
            </div>
            <div className="absolute bottom-2.5 left-2.5 w-10 h-10 pointer-events-none">
              <div className="w-full h-full border-b-4 border-l-4 border-amber-500/90 rounded-bl-sm relative">
                <span className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-700 shadow-sm" />
              </div>
            </div>
            <div className="absolute bottom-2.5 right-2.5 w-10 h-10 pointer-events-none">
              <div className="w-full h-full border-b-4 border-r-4 border-amber-500/90 rounded-br-sm relative">
                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-700 shadow-sm" />
              </div>
            </div>

            {/* Inner Card (Warm Antique Parchment Paper) */}
            <div
              className={`bg-[#FAF5E9] rounded-2xl p-6 sm:p-10 text-center border-2 border-amber-600/40 shadow-inner relative overflow-hidden transition-all duration-1000 ${
                isOpening ? '-translate-y-10 opacity-95 shadow-2xl' : 'translate-y-0'
              }`}
            >
              {/* Victorian Heraldic Feather Emblem */}
              <div className="relative z-10 flex items-center justify-center space-x-3 mb-2">
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-amber-700" />
                <div className="w-9 h-9 rounded-full bg-emerald-950 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-md">
                  <Feather className="w-4 h-4 text-amber-300" />
                </div>
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-amber-700" />
              </div>

              <p className="relative z-10 text-[11px] uppercase tracking-[0.3em] text-emerald-950 font-serif font-bold mb-1">
                DI SẢN TRĂM NĂM • VINTAGE HERITAGE WEDDING
              </p>
              <h1 className="relative z-10 font-serif text-2xl sm:text-3xl text-emerald-950 font-normal tracking-wide">
                Wedding Invitation
              </h1>

              {/* Couple Names */}
              <div className="relative z-10 my-5 py-4 border-y border-amber-700/30">
                <div className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold tracking-tight">
                  {groomName}
                </div>
                <div className="font-serif italic text-2xl sm:text-3xl text-amber-700 my-1 font-normal">
                  — & —
                </div>
                <div className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold tracking-tight">
                  {brideName}
                </div>
              </div>

              {/* Guest Salutation Box */}
              <div className="relative z-10 bg-gradient-to-r from-emerald-50 via-[#FAF5E9] to-emerald-50 border border-emerald-800/30 rounded-2xl p-4 my-5 shadow-sm">
                <p className="text-[11px] text-emerald-800 uppercase tracking-widest font-semibold mb-1">
                  Kính Mời Quý Khách
                </p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-950 font-serif">
                  {salutation}
                </p>
                <p className="text-xs text-stone-600 mt-1 italic">
                  Cùng {roleData.companion} tới dự hôn lễ chung vui cùng hai bên gia tộc
                </p>
              </div>

              <p className="relative z-10 text-xs sm:text-sm text-emerald-950 font-semibold tracking-wider font-serif">
                {weddingDateFormatted}
              </p>

              {/* Heavy Cast Antique Brass Button */}
              <div className="relative z-10 mt-7 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleOpen}
                  disabled={isOpening}
                  className="group relative flex items-center justify-center space-x-3.5 px-8 py-3.5 bg-gradient-to-r from-[#063b2c] via-[#08503c] to-[#04281e] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-amber-400 cursor-pointer"
                >
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-serif font-black text-amber-950 shadow-md border border-amber-200 ring-2 ring-amber-500/40"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 35%, #FDE68A 0%, #D97706 45%, #92400E 80%, #451A03 100%)',
                    }}
                  >
                    {displayMonogram}
                  </span>
                  <span className="font-serif tracking-wide text-sm sm:text-base text-amber-100 font-bold">
                    {isOpening ? 'Đang Mở Dấu Ấn Cổ Điển...' : 'Chạm Mở Thiệp Vương Giả'}
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </button>
                <p className="text-[11px] text-emerald-900 mt-3 font-serif italic">
                  Phong cách Cổ Điển • Ngọc Lục Bảo & Con Dấu Đồng
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
