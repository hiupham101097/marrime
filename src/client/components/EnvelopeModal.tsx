import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Crown,
  Heart,
  Flower2,
  Moon,
  Compass,
  ArrowRight,
  ExternalLink,
  Volume2,
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
  // Step 1: Envelope sealed shut -> Step 2: Flap flips up, card slides out -> Step 3: Proceed to site
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isCardEjected, setIsCardEjected] = useState(false);

  const cleanSalutation = formatGuestSalutation(guest);
  const defaultMonogram = `${groomName.charAt(0)}${brideName.charAt(0)}`;
  const displayMonogram = waxSealMonogram || defaultMonogram;

  const handleBreakSeal = () => {
    if (isFlapOpen) return;

    if (playOpenSound) {
      playOpenSound();
    }

    // Step 1: Open the flap
    setIsFlapOpen(true);

    // Trigger theme-specific confetti
    try {
      if (envelopeStyle === 'traditional_silk') {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#B91C1C', '#F59E0B', '#DC2626', '#FFFBEB'],
        });
      } else if (envelopeStyle === 'blush_ribbon' || envelopeStyle === 'korean_chiffon') {
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#FDA4AF', '#FFF0F5', '#E11D48'],
        });
      } else if (envelopeStyle === 'celestial_midnight') {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#E0E7FF', '#FDE68A', '#93C5FD', '#FFFFFF'],
        });
      } else {
        confetti({
          particleCount: 75,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#DFB76C', '#8A223B', '#FAF8F5'],
        });
      }
    } catch {
      // Fallback
    }

    // Step 2: Slide the invitation card up out of the envelope pocket
    setTimeout(() => {
      setIsCardEjected(true);
    }, 450);
  };

  const handleEnterSite = () => {
    onOpenEnvelope();
  };

  if (!isOpen) return null;

  // Visual Theme Configs
  const isRoyal = envelopeStyle === 'royal_velvet' || envelopeStyle === 'emerald_brass';
  const isTraditional = envelopeStyle === 'traditional_silk' || envelopeStyle === 'indochine_kraft';
  const isRomantic = envelopeStyle === 'blush_ribbon' || envelopeStyle === 'korean_chiffon';
  const isEditorial = envelopeStyle === 'modern_minimal' || envelopeStyle === 'editorial_vellum';
  const isRustic = envelopeStyle === 'rustic_twine';
  const isCelestial = envelopeStyle === 'celestial_midnight';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/90 backdrop-blur-md transition-all duration-700 animate-fadeIn overflow-y-auto">
      {/* Dynamic Ambient Background Illumination */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isTraditional ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-red-700/20 rounded-full blur-[140px]" />
        ) : isCelestial ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-indigo-900/30 rounded-full blur-[140px]" />
        ) : isRomantic ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-pink-500/18 rounded-full blur-[140px]" />
        ) : isRustic ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-emerald-800/18 rounded-full blur-[140px]" />
        ) : (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-wedding-burgundy/25 rounded-full blur-[140px]" />
        )}
      </div>

      {/* Top Quick Bypass Action */}
      <div className="absolute top-4 right-4 z-40">
        <button
          type="button"
          onClick={handleEnterSite}
          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white text-xs font-medium backdrop-blur-md border border-white/10 flex items-center space-x-1.5 transition-all cursor-pointer"
        >
          <span>Vào thẳng website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main 3D Envelope Wrapper */}
      <div className="relative w-full max-w-md sm:max-w-lg my-auto pt-8 pb-4">
        {/* =========================================================
            THE 3D PHYSICAL ENVELOPE OBJECT
           ========================================================= */}
        <div
          className="relative w-full aspect-[4/3] rounded-2xl shadow-2xl transition-all duration-700"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 1. ENVELOPE BACK WALL & INNER LINER PATTERN (Visible when flap is open) */}
          <div
            className={`absolute inset-0 rounded-2xl overflow-hidden shadow-inner border ${
              isTraditional
                ? 'bg-[#5B060D] border-amber-500/40'
                : isCelestial
                ? 'bg-[#060A17] border-indigo-400/30'
                : isRomantic
                ? 'bg-[#FCE4EC] border-pink-300/40'
                : isRustic
                ? 'bg-[#2E3B31] border-emerald-600/30'
                : isEditorial
                ? 'bg-[#000000] border-stone-800'
                : 'bg-[#2B040B] border-wedding-gold/40'
            }`}
          >
            {/* Artistic Inner Lining Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {isTraditional ? (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'radial-gradient(#D4AF37 1px, transparent 1px), radial-gradient(#D4AF37 1px, #5B060D 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px',
                  }}
                />
              ) : isCelestial ? (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'radial-gradient(#CBD5E1 1px, transparent 1px), radial-gradient(#FDE68A 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    backgroundPosition: '0 0, 12px 12px',
                  }}
                />
              ) : isRomantic ? (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'radial-gradient(#F472B6 1px, transparent 1px), radial-gradient(#F472B6 1px, #FCE4EC 1px)',
                    backgroundSize: '18px 18px',
                    backgroundPosition: '0 0, 9px 9px',
                  }}
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'radial-gradient(#DFB76C 1px, transparent 1px), radial-gradient(#DFB76C 1px, #2B040B 1px)',
                    backgroundSize: '22px 22px',
                    backgroundPosition: '0 0, 11px 11px',
                  }}
                />
              )}
            </div>
          </div>

          {/* 2. THE INVITATION LETTER CARD (Nestled inside, slides up when open) */}
          <div
            onClick={isCardEjected ? handleEnterSite : undefined}
            className={`absolute left-4 right-4 sm:left-6 sm:right-6 rounded-xl p-5 sm:p-7 text-center shadow-2xl border transition-all duration-700 ease-out z-20 ${
              isCardEjected
                ? '-translate-y-44 sm:-translate-y-56 scale-102 opacity-100 cursor-pointer'
                : 'translate-y-6 scale-95 opacity-0 pointer-events-none'
            } ${
              isTraditional
                ? 'bg-[#FFFDF7] text-stone-900 border-[#D4AF37]/80'
                : isCelestial
                ? 'bg-[#0B132B] text-slate-100 border-indigo-300/60'
                : isRomantic
                ? 'bg-white text-stone-900 border-pink-200'
                : isRustic
                ? 'bg-[#FDFBF7] text-stone-900 border-emerald-700/50'
                : isEditorial
                ? 'bg-[#FAF8F5] text-stone-900 border-stone-800'
                : 'bg-[#FFFDF9] text-stone-900 border-wedding-gold'
            }`}
          >
            {/* Card Emblem */}
            <div className="flex justify-center mb-2">
              {isTraditional ? (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B111A] to-[#5B060D] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-bold text-2xl shadow-md gold-glow">
                  囍
                </div>
              ) : isCelestial ? (
                <div className="w-11 h-11 rounded-full bg-indigo-950 border border-amber-200 flex items-center justify-center text-amber-200 text-xl shadow-md">
                  🌙
                </div>
              ) : isRomantic ? (
                <div className="w-11 h-11 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-500 shadow-sm">
                  <Flower2 className="w-5 h-5" />
                </div>
              ) : isRustic ? (
                <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-800 text-xl shadow-sm">
                  🌿
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-b from-amber-50 to-amber-100 border border-wedding-gold flex items-center justify-center text-wedding-gold shadow-sm">
                  <Crown className="w-5 h-5 text-wedding-gold" />
                </div>
              )}
            </div>

            {/* Subtitle */}
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-1 ${
                isTraditional
                  ? 'text-[#8B111A]'
                  : isCelestial
                  ? 'text-amber-200'
                  : isRomantic
                  ? 'text-pink-600'
                  : isRustic
                  ? 'text-emerald-800'
                  : 'text-wedding-gold-dark'
              }`}
            >
              {isTraditional
                ? 'LỄ THÀNH HÔN • BÁO HỶ'
                : isCelestial
                ? 'WRITTEN IN THE STARS'
                : isRomantic
                ? 'THIỆP HỒNG BÁO HỶ'
                : isRustic
                ? 'OUTDOOR CELEBRATION'
                : 'ROYAL WEDDING INVITATION'}
            </p>

            {/* Couple Names */}
            <h2
              className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
                isCelestial ? 'text-white' : 'text-stone-900'
              }`}
            >
              {groomName} & {brideName}
            </h2>

            {/* Salutation Box */}
            <div
              className={`my-3 p-3 rounded-lg border ${
                isTraditional
                  ? 'bg-red-50/70 border-red-200'
                  : isCelestial
                  ? 'bg-indigo-950/60 border-indigo-800'
                  : isRomantic
                  ? 'bg-pink-50/60 border-pink-200'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">
                KÍNH MỜI
              </div>
              <div
                className={`font-serif text-lg sm:text-xl font-bold ${
                  isTraditional
                    ? 'text-[#8B111A]'
                    : isCelestial
                    ? 'text-amber-200'
                    : isRomantic
                    ? 'text-pink-900'
                    : 'text-stone-900'
                }`}
              >
                {cleanSalutation}
              </div>
            </div>

            <div className="text-xs text-stone-500 font-mono mb-4">
              🗓️ {weddingDateFormatted}
            </div>

            {/* Enter Site Button */}
            <button
              type="button"
              onClick={handleEnterSite}
              className={`w-full py-3 rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2 border ${
                isTraditional
                  ? 'bg-gradient-to-r from-[#8B111A] to-[#5B060D] border-amber-400'
                  : isCelestial
                  ? 'bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-slate-400'
                  : isRomantic
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 border-pink-200'
                  : isRustic
                  ? 'bg-gradient-to-r from-emerald-800 to-emerald-950 border-emerald-300'
                  : 'bg-gradient-to-r from-wedding-rose-800 to-wedding-burgundy border-wedding-gold'
              }`}
            >
              <span>Khám Phá Toàn Bộ Hôn Lễ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. ENVELOPE LOWER POCKET (Covers front of envelope, holds the card) */}
          <div
            className={`absolute inset-x-0 bottom-0 h-[68%] rounded-b-2xl shadow-xl z-25 overflow-hidden flex flex-col justify-end p-5 sm:p-7 border-t border-white/10 ${
              isTraditional
                ? 'bg-gradient-to-b from-[#8B111A] to-[#5B060D] text-amber-100'
                : isCelestial
                ? 'bg-gradient-to-b from-[#0F172A] to-[#030712] text-slate-100'
                : isRomantic
                ? 'bg-gradient-to-b from-[#FFF0F5] to-[#F8BBD0] text-stone-800'
                : isRustic
                ? 'bg-gradient-to-b from-[#4A5D4E] to-[#202A22] text-stone-100'
                : isEditorial
                ? 'bg-gradient-to-b from-[#1E1E1E] to-[#0A0A0A] text-white'
                : 'bg-gradient-to-b from-[#4A0E17] to-[#1A0207] text-amber-100'
            }`}
          >
            {/* Subtle Gold Piping Border on Pocket */}
            <div className="absolute inset-0 border-2 border-wedding-gold/30 rounded-b-2xl pointer-events-none" />

            {/* Front Calligraphy Addressing on Envelope Face */}
            <div className="relative z-10 text-center space-y-1 my-auto">
              <span
                className={`text-[10px] uppercase tracking-[0.3em] font-sans block ${
                  isRomantic ? 'text-pink-700 font-bold' : 'text-wedding-gold-light/80'
                }`}
              >
                TRÂN QUÝ KÍNH GỬI
              </span>
              <div
                className={`font-serif text-2xl sm:text-3xl font-bold tracking-wide drop-shadow ${
                  isRomantic ? 'text-pink-950' : 'text-white'
                }`}
              >
                {cleanSalutation}
              </div>
              <p
                className={`text-[11px] italic font-light ${
                  isRomantic ? 'text-stone-600' : 'text-stone-300'
                }`}
              >
                Hôn Lễ {groomName} & {brideName}
              </p>
            </div>

            {/* Bottom Subtle Note */}
            {!isFlapOpen && (
              <div className="text-center pt-2">
                <span
                  className={`inline-flex items-center space-x-1.5 text-[11px] font-semibold animate-pulse ${
                    isRomantic ? 'text-pink-700' : 'text-amber-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chạm vào con dấu sáp để mở thiệp</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              </div>
            )}
          </div>

          {/* 4. THE 3D TRIANGULAR V-FLAP (Folds down from top; flips UP when opened) */}
          <div
            onClick={handleBreakSeal}
            className={`absolute top-0 inset-x-0 h-[52%] z-30 cursor-pointer origin-top transition-transform duration-700 ease-in-out ${
              isFlapOpen ? 'pointer-events-none' : ''
            }`}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            }}
          >
            {/* Triangular Flap Body with Clip-Path */}
            <div
              className={`w-full h-full relative drop-shadow-2xl ${
                isTraditional
                  ? 'bg-gradient-to-b from-[#A81B26] to-[#730811]'
                  : isCelestial
                  ? 'bg-gradient-to-b from-[#1E293B] to-[#090D1A]'
                  : isRomantic
                  ? 'bg-gradient-to-b from-[#FCE4EC] to-[#F48FB1]'
                  : isRustic
                  ? 'bg-gradient-to-b from-[#566D5B] to-[#354438]'
                  : isEditorial
                  ? 'bg-gradient-to-b from-[#2A2A2A] to-[#121212]'
                  : 'bg-gradient-to-b from-[#5C1320] to-[#360810]'
              }`}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              }}
            >
              {/* Gold Filigree Line along triangular edge */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  boxShadow: 'inset 0 0 0 2px rgba(212, 175, 55, 0.4)',
                }}
              />
            </div>

            {/* 5. PHOTOREALISTIC 3D WAX SEAL (Centered at the apex of the triangular flap) */}
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 transition-all duration-500 ${
                isFlapOpen ? 'opacity-0 scale-75' : 'hover:scale-108 active:scale-95 animate-pulse-subtle'
              }`}
            >
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center cursor-pointer">
                {/* Organic Wax Rim SVG */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full filter drop-shadow-xl"
                >
                  <defs>
                    <radialGradient id="waxRedGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#E53935" />
                      <stop offset="45%" stopColor="#C62828" />
                      <stop offset="75%" stopColor="#8E0000" />
                      <stop offset="100%" stopColor="#4A0000" />
                    </radialGradient>
                    <radialGradient id="waxGoldGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#FFF3A8" />
                      <stop offset="40%" stopColor="#D4AF37" />
                      <stop offset="80%" stopColor="#AA771C" />
                      <stop offset="100%" stopColor="#5E3E07" />
                    </radialGradient>
                    <radialGradient id="waxIndigoGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#818CF8" />
                      <stop offset="40%" stopColor="#4338CA" />
                      <stop offset="80%" stopColor="#1E1B4B" />
                      <stop offset="100%" stopColor="#0B092B" />
                    </radialGradient>
                    <radialGradient id="waxPinkGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#F472B6" />
                      <stop offset="45%" stopColor="#DB2777" />
                      <stop offset="80%" stopColor="#9D174D" />
                      <stop offset="100%" stopColor="#4C0519" />
                    </radialGradient>
                    <radialGradient id="waxEmeraldGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="45%" stopColor="#059669" />
                      <stop offset="80%" stopColor="#064E3B" />
                      <stop offset="100%" stopColor="#02261C" />
                    </radialGradient>
                  </defs>

                  {/* Melted organic wax rim with 10 ripples */}
                  <path
                    d="M50 4 C62 3, 71 9, 80 16 C88 23, 95 32, 97 43 C99 54, 94 65, 89 75 C84 84, 75 92, 64 96 C53 100, 41 98, 30 94 C20 89, 12 81, 7 71 C2 61, 3 49, 6 39 C10 28, 17 19, 27 12 C36 6, 43 5, 50 4 Z"
                    fill={
                      isCelestial
                        ? 'url(#waxIndigoGrad)'
                        : isRomantic
                        ? 'url(#waxPinkGrad)'
                        : isRustic
                        ? 'url(#waxEmeraldGrad)'
                        : 'url(#waxRedGrad)'
                    }
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth="1.5"
                  />

                  {/* Inner Concentric Rings */}
                  <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
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
                        : isRomantic
                        ? 'url(#waxPinkGrad)'
                        : isRustic
                        ? 'url(#waxEmeraldGrad)'
                        : 'url(#waxRedGrad)'
                    }
                  />
                </svg>

                {/* Monogram / Icon stamped in center of wax */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {isTraditional ? (
                    <span className="font-serif font-bold text-amber-200 text-lg sm:text-xl drop-shadow-md">
                      囍
                    </span>
                  ) : isCelestial ? (
                    <span className="text-amber-200 text-base sm:text-lg drop-shadow-md">🌙</span>
                  ) : isRomantic ? (
                    <span className="font-serif font-black text-white text-xs sm:text-sm tracking-wider drop-shadow-md">
                      {displayMonogram}
                    </span>
                  ) : (
                    <span className="font-serif font-black text-amber-200 text-xs sm:text-sm tracking-widest drop-shadow-md">
                      {displayMonogram}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
