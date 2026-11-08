import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  RotateCw,
  Heart,
  Crown,
  Calendar,
  MapPin,
  Clock,
} from 'lucide-react';
import { GuestInfo, EnvelopeStyle } from '../../shared/types';
import { formatGuestSalutation } from '../hooks/useGuestInfo';

interface EnvelopeModalProps {
  isOpen: boolean;
  onOpenEnvelope: () => void;
  guest: GuestInfo;
  groomName: string;
  brideName: string;
  groomParents?: { father: string; mother: string };
  brideParents?: { father: string; mother: string };
  weddingDateFormatted: string;
  venueName?: string;
  hallName?: string;
  eventAddress?: string;
  eventTime?: string;
  dayOfWeek?: string;
  lunarDate?: string;
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
  groomParents,
  brideParents,
  weddingDateFormatted,
  venueName = 'Trung Tâm Tiệc Cưới Riverside Palace',
  hallName = 'Sảnh Grand Ballroom (Tầng 3)',
  eventAddress = '360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
  eventTime = '11:30',
  dayOfWeek = 'Thứ Sáu',
  lunarDate = 'Nhằm ngày 17 tháng 11 năm Bính Ngọ',
  playOpenSound,
  envelopeStyle = 'royal_velvet',
  waxSealMonogram,
}) => {
  // Step 1: Front of envelope (Mặt trước) -> Step 2: Flipped to back (Mặt sau có sáp nến) -> Step 3: Wax broken, flap opens, card glides up
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cleanSalutation = formatGuestSalutation(guest);
  const defaultMonogram = `${groomName.charAt(0)} & ${brideName.charAt(0)}`;
  const displayMonogram = waxSealMonogram || defaultMonogram;

  // Click on the 3D wax seal to break it, swing open the flap, and transition
  const handleBreakWaxSeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSealBroken || isTransitioning) return;

    setIsSealBroken(true);

    if (playOpenSound) {
      playOpenSound();
    }

    // Flap swings open upward in 3D
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 180);

    // Confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#DFB76C', '#E11D48', '#F472B6', '#FFFDF9', '#B8860B'],
      });
    } catch {
      // Fallback
    }

    // Smooth transition to full wedding website
    setIsTransitioning(true);
    setTimeout(() => {
      onOpenEnvelope();
    }, 1300);
  };

  const handleEnterSiteDirectly = () => {
    onOpenEnvelope();
  };

  if (!isOpen) return null;

  // Determine aesthetic archetype
  const isTraditional = envelopeStyle === 'traditional_silk' || envelopeStyle === 'indochine_kraft';
  const isRoyal = envelopeStyle === 'royal_velvet' || envelopeStyle === 'emerald_brass';
  const isKorean = envelopeStyle === 'korean_chiffon';
  const isRomantic = envelopeStyle === 'blush_ribbon';
  const isRustic = envelopeStyle === 'rustic_twine';
  const isEditorial = envelopeStyle === 'modern_minimal' || envelopeStyle === 'editorial_vellum';
  const isCelestial = envelopeStyle === 'celestial_midnight';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/92 backdrop-blur-md transition-all duration-700 animate-fadeIn overflow-y-auto">
      {/* 0. DRAPED SILK / CHIFFON FABRIC FLATLAY BACKGROUND (Như ảnh chụp phong bì thực tế của khách) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isKorean ? (
          // Soft peach-coral draped chiffon silk flatlay (Chuẩn 100% như ảnh mẫu 7799)
          <div
            className="w-full h-full opacity-90"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, #FFE9DE 0%, #FFD6C4 40%, #F5AE96 75%, #DF856B 100%)',
            }}
          />
        ) : isTraditional ? (
          <div
            className="w-full h-full opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, #8B111A 0%, #5B060D 60%, #300206 100%)',
            }}
          />
        ) : isRomantic ? (
          <div
            className="w-full h-full opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, #FCE4EC 0%, #F8BBD0 55%, #E07A9A 100%)',
            }}
          />
        ) : isCelestial ? (
          <div
            className="w-full h-full opacity-90"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, #0F172A 0%, #080D1D 60%, #020617 100%)',
            }}
          />
        ) : isRustic ? (
          <div
            className="w-full h-full opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, #4A5D4E 0%, #2E3B31 60%, #1A231C 100%)',
            }}
          />
        ) : (
          <div
            className="w-full h-full opacity-85"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, #420815 0%, #29030B 60%, #120104 100%)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* Top Quick Bypass Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={handleEnterSiteDirectly}
          className="px-4 py-1.5 rounded-full bg-stone-900/75 hover:bg-stone-900 text-stone-200 hover:text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center space-x-1.5 transition-all shadow-lg cursor-pointer"
        >
          <span>Vào thẳng website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =====================================================================
          THE 3D PHYSICAL FLIP ENVELOPE (LẬT MẶT TRƯỚC / MẶT SAU & MỞ CON DẤU SÁP)
         ===================================================================== */}
      <div className="relative w-full max-w-[540px] my-auto py-6 px-2 flex flex-col items-center">
        {/* Step Guide Badge Above Envelope */}
        <div className="mb-4 text-center z-40">
          {!isFlipped ? (
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-lg hover:bg-black/85 transition-all cursor-pointer animate-pulse-subtle"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-300" />
              <span>Chạm phong bì để lật mặt sau có con dấu sáp</span>
            </button>
          ) : (
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-semibold shadow-lg animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Nhấn vào con dấu sáp nến tròn để mở thiệp</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
          )}
        </div>

        {/* 3D Envelope Perspective Container */}
        <div
          className="relative w-full aspect-[16/10.5] sm:aspect-[16/10] cursor-pointer"
          style={{ perspective: '1600px' }}
        >
          {/* Card Rotator */}
          <div
            className="relative w-full h-full"
            style={{
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.85s cubic-bezier(0.34, 1.25, 0.64, 1)',
            }}
          >
            {/* ===============================================================
                1. MẶT TRƯỚC PHONG BÌ (FRONT FACE) - Chuẩn thiệp cưới sang trọng
               =============================================================== */}
            <div
              onClick={() => setIsFlipped(true)}
              className={`absolute inset-0 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all duration-300 select-none ${
                isKorean
                  ? 'bg-[#E3ECE6] text-[#1B3830] border-teal-300/60 shadow-teal-950/20'
                  : isTraditional
                  ? 'bg-gradient-to-b from-[#8B111A] via-[#780A13] to-[#5B060D] text-amber-100 border-[#D4AF37] gold-glow'
                  : isRomantic
                  ? 'bg-gradient-to-b from-[#FFF0F5] to-[#FCE4EC] text-stone-900 border-pink-200 shadow-pink-900/15'
                  : isCelestial
                  ? 'bg-gradient-to-b from-[#0F172A] to-[#040814] text-slate-100 border-indigo-400/40'
                  : isRustic
                  ? 'bg-[#DFD7C8] text-stone-900 border-emerald-800/30'
                  : isEditorial
                  ? 'bg-[#18181B] text-white border-stone-700'
                  : 'bg-gradient-to-b from-[#4A0E17] via-[#380810] to-[#200308] text-amber-100 border-wedding-gold gold-glow'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              {/* Outer Decorative Hairline Frame */}
              <div
                className={`absolute inset-3 sm:inset-4 rounded-xl border pointer-events-none ${
                  isTraditional
                    ? 'border-[#D4AF37]/50'
                    : isKorean
                    ? 'border-[#1B3830]/25'
                    : isRomantic
                    ? 'border-pink-300/40'
                    : isCelestial
                    ? 'border-indigo-300/30'
                    : isRustic
                    ? 'border-stone-500/30'
                    : 'border-wedding-gold/40'
                }`}
              />

              {/* Top Row: Couple Monogram & Save The Date */}
              <div
                className={`relative z-10 flex items-center justify-between border-b pb-3 ${
                  isKorean
                    ? 'border-[#1B3830]/15'
                    : isTraditional
                    ? 'border-amber-300/20'
                    : 'border-white/10'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`font-serif text-lg sm:text-xl font-bold tracking-widest ${
                      isTraditional
                        ? 'text-amber-300'
                        : isKorean
                        ? 'text-[#1B3830]'
                        : isRomantic
                        ? 'text-pink-900'
                        : isCelestial
                        ? 'text-amber-200'
                        : 'text-wedding-gold'
                    }`}
                  >
                    {isTraditional ? '囍' : displayMonogram}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase ${
                      isTraditional
                        ? 'text-amber-200/80'
                        : isKorean
                        ? 'text-[#1B3830]/75 font-semibold'
                        : 'text-stone-400'
                    }`}
                  >
                    SAVE THE DATE
                  </span>
                </div>

                <div
                  className={`text-[10px] sm:text-xs font-serif italic ${
                    isTraditional
                      ? 'text-amber-200/90'
                      : isKorean
                      ? 'text-[#1B3830]/80 font-medium'
                      : 'text-stone-300'
                  }`}
                >
                  {weddingDateFormatted}
                </div>
              </div>

              {/* Center Content: WEDDING INVITATION & Guest Name */}
              <div className="relative z-10 text-center my-auto space-y-2 py-3">
                <h2
                  className={`font-serif text-base sm:text-xl font-bold uppercase tracking-[0.3em] ${
                    isTraditional
                      ? 'text-amber-200'
                      : isKorean
                      ? 'text-[#142B25]'
                      : isRomantic
                      ? 'text-pink-950'
                      : isCelestial
                      ? 'text-amber-200'
                      : 'text-wedding-gold-light'
                  }`}
                >
                  {isTraditional ? 'THIỆP CƯỚI BÁO HỶ' : 'WEDDING INVITATION'}
                </h2>

                <p
                  className={`text-xs italic font-light ${
                    isTraditional
                      ? 'text-amber-200/80'
                      : isKorean
                      ? 'text-[#2C483F]'
                      : 'text-stone-300'
                  }`}
                >
                  Hôn Lễ: {groomName} & {brideName}
                </p>

                {/* Dotted Line Addressing (Chuẩn 100% như ảnh mẫu 7799 của khách!) */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <span
                    className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                      isTraditional
                        ? 'text-amber-200'
                        : isKorean
                        ? 'text-[#1B3830] font-bold'
                        : 'text-stone-400'
                    }`}
                  >
                    TRÂN TRỌNG KÍNH MỜI:
                  </span>
                  <span
                    className={`font-serif text-lg sm:text-2xl font-bold border-b border-dotted pb-0.5 px-3 ${
                      isTraditional
                        ? 'text-white border-amber-300'
                        : isKorean
                        ? 'text-[#0E201B] border-[#1B3830]'
                        : isRomantic
                        ? 'text-pink-950 border-pink-400'
                        : 'text-white border-wedding-gold'
                    }`}
                  >
                    {cleanSalutation}
                  </span>
                </div>
              </div>

              {/* Bottom Interactive Hint */}
              <div
                className={`relative z-10 flex items-center justify-between border-t pt-3 text-[10px] sm:text-[11px] ${
                  isKorean
                    ? 'border-[#1B3830]/15'
                    : isTraditional
                    ? 'border-amber-300/20'
                    : 'border-white/10'
                }`}
              >
                <span
                  className={`italic truncate max-w-[200px] sm:max-w-none ${
                    isTraditional
                      ? 'text-amber-200/80'
                      : isKorean
                      ? 'text-[#2C483F]'
                      : 'text-stone-400'
                  }`}
                >
                  {hallName} • {venueName}
                </span>

                <span
                  className={`inline-flex items-center space-x-1 font-bold ${
                    isTraditional
                      ? 'text-amber-300'
                      : isKorean
                      ? 'text-[#0E201B]'
                      : 'text-amber-300'
                  }`}
                >
                  <span>Chạm để lật mặt sau</span>
                  <RotateCw className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* ===============================================================
                2. MẶT SAU PHONG BÌ (BACK FACE) - Nắp Tam Giác & Con Dấu Sáp Nến
               =============================================================== */}
            <div
              className={`absolute inset-0 rounded-2xl shadow-2xl overflow-hidden border-2 transition-all select-none ${
                isKorean
                  ? 'bg-[#E3ECE6] text-[#1B3830] border-teal-300/60 shadow-teal-950/20'
                  : isTraditional
                  ? 'bg-gradient-to-b from-[#8B111A] via-[#780A13] to-[#5B060D] text-amber-100 border-[#D4AF37]'
                  : isRomantic
                  ? 'bg-gradient-to-b from-[#FFF0F5] to-[#FCE4EC] text-stone-900 border-pink-200'
                  : isCelestial
                  ? 'bg-gradient-to-b from-[#0F172A] to-[#040814] text-slate-100 border-indigo-400/40'
                  : isRustic
                  ? 'bg-[#DFD7C8] text-stone-900 border-emerald-800/30'
                  : isEditorial
                  ? 'bg-[#18181B] text-white border-stone-700'
                  : 'bg-gradient-to-b from-[#4A0E17] via-[#380810] to-[#200308] text-amber-100 border-wedding-gold'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {/* Inner Liner Texture Visible when flap opens */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isFlapOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background:
                    'radial-gradient(#D4AF37 1px, transparent 1px), radial-gradient(#D4AF37 1px, #FFFDF9 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* =============================================================
                  THE INNER INVITATION CARD (CHỈ LƯỚT LÊN KHI NHẤN MỞ SÁP NẾN)
                 ============================================================= */}
              <div
                onClick={handleEnterSiteDirectly}
                className={`absolute inset-x-4 top-3 bottom-4 rounded-xl bg-white shadow-2xl p-5 border border-amber-200/60 flex flex-col justify-between transition-all duration-700 ease-out z-10 cursor-pointer text-stone-900 ${
                  isFlapOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  transform: isFlapOpen ? 'translateY(-48%)' : 'translateY(25%)',
                }}
              >
                {/* Inner Card Hairline Frame */}
                <div className="absolute inset-2 rounded-lg border border-amber-300/40 pointer-events-none" />

                <div className="text-center space-y-1 relative z-10">
                  <span className="font-serif text-sm font-bold tracking-widest text-[#A2682A] uppercase">
                    LỄ THÀNH HÔN
                  </span>
                  <div className="flex items-center justify-center space-x-2 text-stone-800">
                    <span className="font-serif text-lg font-bold">{groomName}</span>
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span className="font-serif text-lg font-bold">{brideName}</span>
                  </div>
                </div>

                <div className="text-center py-2 relative z-10 space-y-1 border-y border-stone-100">
                  <div className="text-[11px] text-stone-600 flex items-center justify-center space-x-1">
                    <Calendar className="w-3 h-3 text-[#A2682A]" />
                    <span>{weddingDateFormatted}</span>
                  </div>
                  <div className="text-[11px] text-stone-600 flex items-center justify-center space-x-1">
                    <Clock className="w-3 h-3 text-[#A2682A]" />
                    <span>{eventTime} • {hallName}</span>
                  </div>
                  <div className="text-[10px] text-stone-500 flex items-center justify-center space-x-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span className="truncate max-w-[280px]">{venueName}</span>
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <button
                    type="button"
                    className="w-full py-1.5 rounded-lg bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>Bước Vào Không Gian Hôn Lễ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Lower Body of Back Envelope (Túi đựng thiệp phía dưới) */}
              <div
                className={`absolute inset-x-0 bottom-0 h-[62%] rounded-b-2xl border-t shadow-inner z-20 flex flex-col justify-end p-5 text-center pointer-events-none ${
                  isKorean
                    ? 'bg-[#E3ECE6] border-teal-300/50'
                    : isTraditional
                    ? 'bg-gradient-to-t from-[#5B060D] via-[#780A13] to-[#8B111A] border-amber-300/30'
                    : isRomantic
                    ? 'bg-gradient-to-t from-[#F8BBD0] to-[#FFF0F5] border-pink-200'
                    : isCelestial
                    ? 'bg-gradient-to-t from-[#040814] to-[#0F172A] border-indigo-400/30'
                    : isRustic
                    ? 'bg-[#DFD7C8] border-stone-400/30'
                    : isEditorial
                    ? 'bg-[#18181B] border-stone-700'
                    : 'bg-gradient-to-t from-[#200308] via-[#380810] to-[#4A0E17] border-amber-300/30'
                }`}
              >
                <div className="space-y-0.5">
                  <p
                    className={`text-[9px] uppercase tracking-[0.25em] ${
                      isTraditional
                        ? 'text-amber-200/80'
                        : isKorean
                        ? 'text-[#1B3830]/75 font-semibold'
                        : 'text-stone-400'
                    }`}
                  >
                    HÔN LỄ TRĂM NĂM
                  </p>
                  <p
                    className={`font-serif text-sm font-bold ${
                      isTraditional
                        ? 'text-white'
                        : isKorean
                        ? 'text-[#0E201B]'
                        : 'text-white'
                    }`}
                  >
                    {groomName} & {brideName}
                  </p>
                </div>
              </div>

              {/* Flip back to front button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="absolute bottom-3 left-3 z-30 px-2.5 py-1 rounded-full bg-black/50 hover:bg-black/75 text-white text-[10px] flex items-center space-x-1 cursor-pointer transition-colors backdrop-blur-sm"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Xem lại mặt trước</span>
              </button>

              {/* ===============================================================
                  3. TOP TRIANGULAR V-FLAP WITH 3D TURNING (ZERO MIRRORED TEXT)
                 =============================================================== */}
              <div
                className="absolute top-0 inset-x-0 h-[56%] z-30 origin-top pointer-events-none"
                style={{
                  perspective: '1200px',
                }}
              >
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-in-out pointer-events-auto"
                  style={{
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  }}
                >
                  {/* 3A. FLAP OUTER FACE (Visible when closed, hides when rotated 180deg) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateX(0deg)',
                    }}
                  >
                    {/* Flap Body via Clip-Path */}
                    <div
                      className={`w-full h-full relative ${
                        isKorean
                          ? 'bg-[#D6E3DA] border-b border-teal-700/20'
                          : isTraditional
                          ? 'bg-gradient-to-b from-[#9E1420] to-[#780A13]'
                          : isRomantic
                          ? 'bg-gradient-to-b from-[#FCE4EC] to-[#F8BBD0]'
                          : isCelestial
                          ? 'bg-gradient-to-b from-[#1E293B] to-[#0A1128]'
                          : isRustic
                          ? 'bg-[#D2C8B5]'
                          : isEditorial
                          ? 'bg-[#2A2A2E]'
                          : 'bg-gradient-to-b from-[#5C1320] to-[#360810]'
                      }`}
                      style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))',
                      }}
                    >
                      {/* Flap Content: Botanical Laurel & Monogram (Chuẩn theo ảnh mẫu 7799) */}
                      <div className="absolute inset-x-0 top-3 sm:top-4 text-center z-10 space-y-0.5">
                        {/* Botanical Leaf sprig */}
                        <div className="flex justify-center text-xs opacity-75">
                          {isKorean ? (
                            <span className="text-[#1B3830]">🌿</span>
                          ) : isTraditional ? (
                            <span className="text-amber-300">囍</span>
                          ) : isCelestial ? (
                            <span className="text-amber-200">✨</span>
                          ) : (
                            <span className="text-amber-300">❦</span>
                          )}
                        </div>

                        {/* Monogram */}
                        <div
                          className={`font-serif text-sm sm:text-base font-bold tracking-wider ${
                            isKorean
                              ? 'text-[#142B25]'
                              : isTraditional
                              ? 'text-amber-200'
                              : 'text-white'
                          }`}
                        >
                          {isTraditional ? 'SONG HỶ' : displayMonogram}
                        </div>

                        {/* Save the Date subtext */}
                        <div
                          className={`text-[8px] sm:text-[9px] font-mono tracking-widest uppercase ${
                            isKorean
                              ? 'text-[#2C483F]'
                              : isTraditional
                              ? 'text-amber-200/80'
                              : 'text-stone-300'
                          }`}
                        >
                          SAVE THE DATE
                        </div>
                      </div>
                    </div>

                    {/* =========================================================
                        3B. THE 3D WAX SEAL (CON DẤU SÁP NẾN TRÒN - NHẤN VÀO ĐỂ MỞ)
                       ========================================================= */}
                    {!isFlapOpen && (
                      <div
                        onClick={handleBreakWaxSeal}
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 transition-all duration-300 cursor-pointer ${
                          isSealBroken
                            ? 'scale-125 opacity-0 pointer-events-none'
                            : 'hover:scale-115 active:scale-95'
                        }`}
                        title="Nhấn vào con dấu sáp để mở thiệp cưới"
                      >
                        <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center cursor-pointer">
                          {/* SVG 3D Organic Wax Seal */}
                          <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full filter drop-shadow-2xl"
                          >
                            <defs>
                              {/* Realistic Antique Bronze Wax Gradient (Chuẩn 100% ảnh 7799 của khách) */}
                              <radialGradient id="waxBronzeGrad" cx="35%" cy="35%" r="65%">
                                <stop offset="0%" stopColor="#F7D788" />
                                <stop offset="30%" stopColor="#D4A03E" />
                                <stop offset="70%" stopColor="#A3721F" />
                                <stop offset="100%" stopColor="#634209" />
                              </radialGradient>
                              {/* Crimson Red Wax Gradient */}
                              <radialGradient id="waxRedGrad" cx="35%" cy="35%" r="65%">
                                <stop offset="0%" stopColor="#FF4B4B" />
                                <stop offset="35%" stopColor="#C62828" />
                                <stop offset="75%" stopColor="#8E0000" />
                                <stop offset="100%" stopColor="#4A0000" />
                              </radialGradient>
                              {/* Indigo Wax Gradient */}
                              <radialGradient id="waxIndigoGrad" cx="35%" cy="35%" r="65%">
                                <stop offset="0%" stopColor="#818CF8" />
                                <stop offset="40%" stopColor="#4338CA" />
                                <stop offset="80%" stopColor="#1E1B4B" />
                                <stop offset="100%" stopColor="#0B092B" />
                              </radialGradient>
                            </defs>

                            {/* Melted organic wax rim with ripples */}
                            <path
                              d="M50 4 C63 3, 72 9, 81 16 C89 23, 96 33, 97 44 C98 55, 94 66, 89 76 C83 85, 74 93, 63 96 C52 99, 40 97, 29 93 C19 88, 11 80, 7 70 C2 60, 3 48, 6 38 C10 27, 18 18, 28 12 C37 6, 44 5, 50 4 Z"
                              fill={
                                isCelestial
                                  ? 'url(#waxIndigoGrad)'
                                  : isKorean || isRustic
                                  ? 'url(#waxBronzeGrad)'
                                  : 'url(#waxRedGrad)'
                              }
                              stroke="rgba(0,0,0,0.3)"
                              strokeWidth="1.5"
                            />

                            {/* Concentric rings */}
                            <circle
                              cx="50"
                              cy="50"
                              r="34"
                              fill="none"
                              stroke="rgba(255,255,255,0.35)"
                              strokeWidth="1"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="31"
                              fill="none"
                              stroke="rgba(0,0,0,0.35)"
                              strokeWidth="1"
                              strokeDasharray="2,2"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="27"
                              fill={
                                isCelestial
                                  ? 'url(#waxIndigoGrad)'
                                  : isKorean || isRustic
                                  ? 'url(#waxBronzeGrad)'
                                  : 'url(#waxRedGrad)'
                              }
                            />
                          </svg>

                          {/* Wax Stamp Seal Inscription: "with love" or Monogram */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {isTraditional ? (
                              <span className="font-serif font-bold text-amber-200 text-xl drop-shadow-md">
                                囍
                              </span>
                            ) : isCelestial ? (
                              <span className="text-amber-200 text-lg drop-shadow-md">🌙</span>
                            ) : (
                              <span
                                className={`font-bold text-sm tracking-normal drop-shadow ${
                                  isKorean || isRustic ? 'text-[#3E2703]' : 'text-amber-200'
                                }`}
                                style={{ fontFamily: '"Pinyon Script", "Great Vibes", cursive' }}
                              >
                                with love
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Pulsing Hint Badge right under the seal */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap pointer-events-none">
                          <span className="px-2.5 py-0.5 rounded-full bg-black/80 text-amber-300 text-[10px] font-bold shadow-lg border border-amber-300/40 flex items-center space-x-1 animate-pulse">
                            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                            <span>Nhấn sáp mở thiệp</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3C. FLAP INNER LINING (Visible ONLY when rotated 180deg open - ZERO MIRRORED TEXT) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateX(180deg)',
                    }}
                  >
                    <div
                      className="w-full h-full relative"
                      style={{
                        clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                        background:
                          'linear-gradient(180deg, #FFFDF9 0%, #F5EFE6 60%, #E8DFD3 100%)',
                        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))',
                      }}
                    >
                      {/* Subtle silk lining pattern */}
                      <div
                        className="absolute inset-0 opacity-40 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(#D4AF37 1px, transparent 1px)',
                          backgroundSize: '12px 12px',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transitioning message */}
        {isTransitioning && (
          <div className="mt-4 text-center text-white text-xs font-serif font-semibold animate-fadeIn">
            Đang mở bức thiệp chúc phúc và chuyển tới trang hôn lễ...
          </div>
        )}
      </div>
    </div>
  );
};
