import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  RotateCw,
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
  // Step 1: Front of envelope (Mặt trước phong bì) -> Step 2: Flipped to back (Mặt sau có sáp nến) -> Step 3: Wax broken, open inside
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cleanSalutation = formatGuestSalutation(guest);
  const defaultMonogram = `${groomName.charAt(0)} & ${brideName.charAt(0)}`;
  const displayMonogram = waxSealMonogram || defaultMonogram;

  // Click on the wax seal to break it, open the flap, and transition to the details page!
  const handleBreakWaxSeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSealBroken || isTransitioning) return;

    setIsSealBroken(true);

    if (playOpenSound) {
      playOpenSound();
    }

    // Flap opens upward in 3D
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 200);

    // Confetti celebration
    try {
      confetti({
        particleCount: 85,
        spread: 95,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#DFB76C', '#E11D48', '#F472B6', '#FFFDF9'],
      });
    } catch {
      // Fallback
    }

    // Smooth transition to full wedding website
    setIsTransitioning(true);
    setTimeout(() => {
      onOpenEnvelope();
    }, 1100);
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
      {/* 0. DRAPED SILK / FABRIC FLATLAY BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isKorean ? (
          <div
            className="w-full h-full opacity-85"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, #FFE5D9 0%, #FFC8B6 45%, #F8A590 85%, #E58670 100%)',
            }}
          />
        ) : isTraditional ? (
          <div
            className="w-full h-full opacity-75"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, #8B111A 0%, #5B060D 60%, #300206 100%)',
            }}
          />
        ) : isRomantic ? (
          <div
            className="w-full h-full opacity-75"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, #FCE4EC 0%, #F8BBD0 55%, #E07A9A 100%)',
            }}
          />
        ) : isCelestial ? (
          <div
            className="w-full h-full opacity-85"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, #0F172A 0%, #080D1D 60%, #020617 100%)',
            }}
          />
        ) : isRustic ? (
          <div
            className="w-full h-full opacity-75"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, #4A5D4E 0%, #2E3B31 60%, #1A231C 100%)',
            }}
          />
        ) : (
          <div
            className="w-full h-full opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, #420815 0%, #29030B 60%, #120104 100%)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Top Quick Bypass Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={handleEnterSiteDirectly}
          className="px-4 py-1.5 rounded-full bg-stone-900/70 hover:bg-stone-900 text-stone-200 hover:text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center space-x-1.5 transition-all shadow-lg cursor-pointer"
        >
          <span>Vào thẳng website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =====================================================================
          THE 3D FLIP ENVELOPE (LẬT MẶT TRƯỚC / MẶT SAU & MỞ CON DẤU SÁP)
         ===================================================================== */}
      <div className="relative w-full max-w-[530px] my-auto py-8 px-2 flex flex-col items-center">
        {/* Helper Guidance Badge Above Envelope */}
        <div className="mb-4 text-center z-40">
          {!isFlipped ? (
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg hover:bg-black/80 transition-all cursor-pointer animate-pulse-subtle"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-300" />
              <span>Chạm phong bì để lật mặt sau có con dấu sáp</span>
            </button>
          ) : (
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-semibold shadow-lg animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Nhấn vào con dấu sáp nến để mở thiệp</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
          )}
        </div>

        {/* 3D Envelope Container with Perspective */}
        <div
          className="relative w-full aspect-[16/10.5] sm:aspect-[16/10] cursor-pointer"
          style={{ perspective: '1400px' }}
        >
          {/* Card Rotator */}
          <div
            className="relative w-full h-full"
            style={{
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.8s cubic-bezier(0.34, 1.3, 0.64, 1)',
            }}
          >
            {/* ===============================================================
                1. MẶT TRƯỚC PHONG BÌ (FRONT FACE) - Chuẩn thiệp cưới sang trọng
               =============================================================== */}
            <div
              onClick={() => setIsFlipped(true)}
              className={`absolute inset-0 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all duration-300 select-none ${
                isKorean
                  ? 'bg-[#E5EFEA] text-stone-800 border-teal-200/80 shadow-rose-900/15'
                  : isTraditional
                  ? 'bg-gradient-to-b from-[#8B111A] via-[#780A13] to-[#5B060D] text-amber-100 border-[#D4AF37] gold-glow'
                  : isRomantic
                  ? 'bg-gradient-to-b from-[#FFF0F5] to-[#FCE4EC] text-stone-900 border-pink-200 shadow-pink-900/15'
                  : isCelestial
                  ? 'bg-gradient-to-b from-[#0F172A] to-[#040814] text-slate-100 border-indigo-400/40'
                  : isRustic
                  ? 'bg-[#E2DACB] text-stone-900 border-emerald-800/30'
                  : isEditorial
                  ? 'bg-[#181818] text-white border-stone-700'
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
                    ? 'border-teal-700/20'
                    : isRomantic
                    ? 'border-pink-300/40'
                    : isCelestial
                    ? 'border-indigo-300/30'
                    : 'border-wedding-gold/40'
                }`}
              />

              {/* Top Row: Couple Monogram & Save The Date */}
              <div className="relative z-10 flex items-center justify-between border-b border-black/10 pb-3">
                <div className="flex items-center space-x-2">
                  <span
                    className={`font-serif text-lg sm:text-xl font-bold tracking-widest ${
                      isTraditional
                        ? 'text-amber-300'
                        : isKorean
                        ? 'text-teal-900'
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
                      isTraditional ? 'text-amber-200/80' : isKorean ? 'text-teal-800/80 font-bold' : 'text-stone-400'
                    }`}
                  >
                    SAVE THE DATE
                  </span>
                </div>

                <div
                  className={`text-[10px] sm:text-xs font-serif italic ${
                    isTraditional ? 'text-amber-200/90' : isKorean ? 'text-teal-900/80' : 'text-stone-400'
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
                      ? 'text-teal-950'
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
                    isTraditional ? 'text-amber-200/80' : isKorean ? 'text-stone-600' : 'text-stone-300'
                  }`}
                >
                  Hôn Lễ: {groomName} & {brideName}
                </p>

                {/* Dotted Line Addressing (Chuẩn như ảnh mẫu 7799 của khách!) */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <span
                    className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                      isTraditional ? 'text-amber-200' : isKorean ? 'text-teal-900 font-bold' : 'text-stone-400'
                    }`}
                  >
                    TRÂN TRỌNG KÍNH MỜI:
                  </span>
                  <span
                    className={`font-serif text-lg sm:text-2xl font-bold border-b border-dotted pb-0.5 px-3 ${
                      isTraditional
                        ? 'text-white border-amber-300'
                        : isKorean
                        ? 'text-teal-950 border-teal-800'
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
              <div className="relative z-10 flex items-center justify-between border-t border-black/10 pt-3 text-[10px] sm:text-[11px]">
                <span
                  className={`italic ${
                    isTraditional ? 'text-amber-200/80' : isKorean ? 'text-stone-500' : 'text-stone-400'
                  }`}
                >
                  {hallName} • {venueName}
                </span>

                <span
                  className={`inline-flex items-center space-x-1 font-bold ${
                    isTraditional ? 'text-amber-300' : isKorean ? 'text-teal-900' : 'text-amber-300'
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
              className={`absolute inset-0 rounded-2xl shadow-2xl overflow-hidden border-2 flex flex-col justify-between transition-all select-none ${
                isKorean
                  ? 'bg-[#E5EFEA] text-stone-800 border-teal-200/80'
                  : isTraditional
                  ? 'bg-gradient-to-b from-[#8B111A] via-[#780A13] to-[#5B060D] text-amber-100 border-[#D4AF37]'
                  : isRomantic
                  ? 'bg-gradient-to-b from-[#FFF0F5] to-[#FCE4EC] text-stone-900 border-pink-200'
                  : isCelestial
                  ? 'bg-gradient-to-b from-[#0F172A] to-[#040814] text-slate-100 border-indigo-400/40'
                  : isRustic
                  ? 'bg-[#E2DACB] text-stone-900 border-emerald-800/30'
                  : isEditorial
                  ? 'bg-[#181818] text-white border-stone-700'
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
                  backgroundSize: '18px 18px',
                }}
              />

              {/* Lower Body of Back Envelope */}
              <div className="absolute inset-x-0 bottom-0 h-[60%] flex flex-col justify-end p-5 text-center z-10 pointer-events-none">
                <div className="space-y-1">
                  <p
                    className={`text-[10px] uppercase tracking-widest ${
                      isTraditional ? 'text-amber-200/80' : isKorean ? 'text-teal-900/80' : 'text-stone-400'
                    }`}
                  >
                    HÔN LỄ TRĂM NĂM
                  </p>
                  <p
                    className={`font-serif text-sm font-bold ${
                      isTraditional ? 'text-white' : isKorean ? 'text-teal-950' : 'text-white'
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
                className="absolute bottom-3 left-3 z-30 px-2.5 py-1 rounded-full bg-black/40 hover:bg-black/60 text-white text-[10px] flex items-center space-x-1 cursor-pointer transition-colors backdrop-blur-sm"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Xem lại mặt trước</span>
              </button>

              {/* Top Triangular V-Flap (Gập xuống che kín, mở lật lên 3D khi nhấn sáp) */}
              <div
                className="absolute top-0 inset-x-0 h-[56%] z-20 origin-top transition-transform duration-700 ease-in-out"
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                }}
              >
                {/* Triangular Flap Body via Clip-Path */}
                <div
                  className={`w-full h-full relative drop-shadow-xl ${
                    isKorean
                      ? 'bg-[#Dbe7e1] border-b border-teal-700/20'
                      : isTraditional
                      ? 'bg-gradient-to-b from-[#9E1420] to-[#780A13]'
                      : isRomantic
                      ? 'bg-gradient-to-b from-[#FCE4EC] to-[#F8BBD0]'
                      : isCelestial
                      ? 'bg-gradient-to-b from-[#1E293B] to-[#0A1128]'
                      : isRustic
                      ? 'bg-[#D5CCBC]'
                      : isEditorial
                      ? 'bg-[#2A2A2A]'
                      : 'bg-gradient-to-b from-[#5C1320] to-[#360810]'
                  }`}
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  }}
                >
                  {/* Flap gold foil piping */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                      boxShadow: 'inset 0 0 0 2px rgba(212, 175, 55, 0.4)',
                    }}
                  />
                </div>

                {/* =============================================================
                    THE 3D WAX SEAL (CON DẤU SÁP NẾN TRÒN - "ĐIỂM MÀU ĐỎ/VÀNG")
                   ============================================================= */}
                <div
                  onClick={handleBreakWaxSeal}
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 transition-all duration-300 cursor-pointer ${
                    isSealBroken ? 'scale-125 opacity-0 pointer-events-none' : 'hover:scale-115 active:scale-95'
                  }`}
                >
                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center cursor-pointer">
                    {/* SVG 3D Organic Wax Seal */}
                    <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-2xl">
                      <defs>
                        {/* Realistic Gold Bronze Wax Gradient (Như ảnh mẫu 7799 của khách) */}
                        <radialGradient id="waxBronzeGrad" cx="35%" cy="35%" r="65%">
                          <stop offset="0%" stopColor="#F5D07A" />
                          <stop offset="35%" stopColor="#C89738" />
                          <stop offset="70%" stopColor="#9E6E1C" />
                          <stop offset="100%" stopColor="#5E3E07" />
                        </radialGradient>
                        {/* Crimson Red Wax Gradient (Sáp nến đỏ son) */}
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

                      {/* Melted organic wax rim with 10 ripples */}
                      <path
                        d="M50 4 C63 3, 72 9, 81 16 C89 23, 96 33, 97 44 C98 55, 94 66, 89 76 C83 85, 74 93, 63 96 C52 99, 40 97, 29 93 C19 88, 11 80, 7 70 C2 60, 3 48, 6 38 C10 27, 18 18, 28 12 C37 6, 44 5, 50 4 Z"
                        fill={isCelestial ? 'url(#waxIndigoGrad)' : isKorean ? 'url(#waxBronzeGrad)' : 'url(#waxRedGrad)'}
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="1.5"
                      />

                      {/* Concentric rings */}
                      <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
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
                        fill={isCelestial ? 'url(#waxIndigoGrad)' : isKorean ? 'url(#waxBronzeGrad)' : 'url(#waxRedGrad)'}
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
                            isKorean ? 'text-amber-950' : 'text-amber-200'
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
                    <span className="px-2 py-0.5 rounded-full bg-black/75 text-amber-300 text-[10px] font-bold shadow-md border border-amber-300/30 flex items-center space-x-1 animate-pulse">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      <span>Nhấn sáp mở thiệp</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transitioning message */}
        {isTransitioning && (
          <div className="mt-4 text-center text-white text-xs font-serif font-semibold animate-fadeIn">
            Đang mở bức thiệp chúc phúc và chuyển tới trang chi tiết...
          </div>
        )}
      </div>
    </div>
  );
};
