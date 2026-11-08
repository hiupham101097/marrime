import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ExternalLink,
  ArrowRight,
  Heart,
  Crown,
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
  // isOpened = true when user clicks the wax seal to open the envelope
  const [isOpened, setIsOpened] = useState(false);
  const [isCardEjected, setIsCardEjected] = useState(false);

  const cleanSalutation = formatGuestSalutation(guest);
  const defaultMonogram = `${groomName.charAt(0)}${brideName.charAt(0)}`;
  const displayMonogram = waxSealMonogram || defaultMonogram;

  const fatherGroom = groomParents?.father || 'Kim Văn Nam';
  const motherGroom = groomParents?.mother || 'Lê Thị Hạnh';
  const fatherBride = brideParents?.father || 'Shin Tae Jin';
  const motherBride = brideParents?.mother || 'Park Min Young';

  const handleBreakSeal = () => {
    if (isOpened) return;

    if (playOpenSound) {
      playOpenSound();
    }

    // 1. Flip open flap
    setIsOpened(true);

    // 2. Confetti sparkle
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

    // 3. Eject the invitation card smoothly upwards
    setTimeout(() => {
      setIsCardEjected(true);
    }, 400);
  };

  const handleEnterSite = () => {
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
      {/* 0. DRAPED SILK / FABRIC FLATLAY BACKGROUND (Mô phỏng bàn chụp thiệp cưới cao cấp) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isKorean ? (
          /* Draped Peach Silk Chiffon (Như trong ảnh mẫu của khách) */
          <div
            className="w-full h-full opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 30% 20%, #FFE3D6 0%, #FFC5B2 45%, #F8A590 85%, #E58670 100%)',
            }}
          />
        ) : isTraditional ? (
          <div
            className="w-full h-full opacity-70"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, #8B111A 0%, #5B060D 60%, #300206 100%)',
            }}
          />
        ) : isRomantic ? (
          <div
            className="w-full h-full opacity-70"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, #FCE4EC 0%, #F8BBD0 55%, #E07A9A 100%)',
            }}
          />
        ) : isCelestial ? (
          <div
            className="w-full h-full opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, #0F172A 0%, #080D1D 60%, #020617 100%)',
            }}
          />
        ) : isRustic ? (
          <div
            className="w-full h-full opacity-70"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, #4A5D4E 0%, #2E3B31 60%, #1A231C 100%)',
            }}
          />
        ) : (
          <div
            className="w-full h-full opacity-75"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, #420815 0%, #29030B 60%, #120104 100%)',
            }}
          />
        )}

        {/* Ambient Silk Wave Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Top Quick Bypass Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={handleEnterSite}
          className="px-4 py-1.5 rounded-full bg-stone-900/70 hover:bg-stone-900 text-stone-200 hover:text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center space-x-1.5 transition-all shadow-lg cursor-pointer"
        >
          <span>Vào thẳng website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =====================================================================
          MAIN ENVELOPE WRAPPER (Bao Thư Nằm Ngang Tỷ Lệ Chuẩn 16:10)
         ===================================================================== */}
      <div className="relative w-full max-w-[520px] my-auto pt-16 pb-6 px-2">
        {/* PHYSICAL HORIZONTAL ENVELOPE */}
        <div
          className="relative w-full aspect-[16/10] sm:aspect-[16/10.5] rounded-xl shadow-2xl transition-all duration-700"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 1. ENVELOPE BACKBOARD & INNER LINER (Hiện ra khi nắp mở) */}
          <div
            className={`absolute inset-0 rounded-xl overflow-hidden shadow-inner border transition-all ${
              isKorean
                ? 'bg-[#E3EFE8] border-emerald-200/60'
                : isTraditional
                ? 'bg-[#66060E] border-[#D4AF37]/50'
                : isRomantic
                ? 'bg-[#FFF0F5] border-pink-200'
                : isCelestial
                ? 'bg-[#080D1D] border-indigo-400/30'
                : isRustic
                ? 'bg-[#DCD3C4] border-stone-400/50'
                : isEditorial
                ? 'bg-[#181818] border-stone-700'
                : 'bg-[#2E040C] border-wedding-gold/50'
            }`}
          >
            {/* Inner Liner Delicate Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    'radial-gradient(#C5A059 1px, transparent 1px), radial-gradient(#C5A059 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                }}
              />
            </div>
          </div>

          {/* 2. THE AUTHENTIC INVITATION LETTER CARD (Trượt lên cao khi mở thư) */}
          <div
            onClick={isCardEjected ? handleEnterSite : undefined}
            className={`absolute left-3 right-3 sm:left-5 sm:right-5 rounded-2xl p-5 sm:p-7 text-center shadow-2xl border-2 transition-all duration-700 ease-out z-35 ${
              isCardEjected
                ? '-translate-y-52 sm:-translate-y-64 scale-102 opacity-100 cursor-pointer'
                : 'translate-y-2 scale-95 opacity-0 pointer-events-none'
            } ${
              isKorean
                ? 'bg-[#FFFDFB] text-stone-900 border-orange-200 shadow-rose-200/40'
                : isTraditional
                ? 'bg-[#FFFDF7] text-stone-900 border-[#D4AF37] gold-glow'
                : isRomantic
                ? 'bg-white text-stone-900 border-pink-200'
                : isCelestial
                ? 'bg-[#0B132B] text-slate-100 border-indigo-400/60'
                : isRustic
                ? 'bg-[#FDFBF7] text-stone-900 border-emerald-800/40'
                : isEditorial
                ? 'bg-[#FAF8F5] text-stone-900 border-stone-800'
                : 'bg-[#FFFDF9] text-stone-900 border-wedding-gold gold-glow'
            }`}
          >
            {/* Card Inner Hairline Frame */}
            <div className="absolute inset-2 sm:inset-3 rounded-xl border border-stone-300/60 pointer-events-none" />

            {/* Top Emblem */}
            <div className="flex justify-center mb-1">
              {isTraditional ? (
                <span className="text-[#8B111A] font-serif text-2xl font-bold">囍</span>
              ) : isKorean ? (
                <span className="text-orange-400 text-lg">🌸</span>
              ) : isCelestial ? (
                <span className="text-amber-200 text-lg">🌙</span>
              ) : (
                <Crown className="w-5 h-5 text-wedding-gold" />
              )}
            </div>

            {/* Formal Title */}
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-0.5">
              TRÂN TRỌNG BÁO HỶ
            </p>
            <p className="text-[11px] italic text-stone-400 mb-2">Lễ Thành Hôn</p>

            {/* Hai Họ Thông Gia */}
            <div className="grid grid-cols-2 gap-2 text-[11px] py-1.5 border-y border-stone-200/80 mb-2 max-w-xs mx-auto">
              <div className="text-center">
                <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">
                  NHÀ TRAI
                </span>
                <p className="font-serif font-semibold text-stone-800">Ông: {fatherGroom}</p>
                <p className="font-serif font-semibold text-stone-800">Bà: {motherGroom}</p>
              </div>
              <div className="text-center">
                <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">
                  NHÀ GÁI
                </span>
                <p className="font-serif font-semibold text-stone-800">Ông: {fatherBride}</p>
                <p className="font-serif font-semibold text-stone-800">Bà: {motherBride}</p>
              </div>
            </div>

            {/* Couple Names */}
            <div className="my-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {groomName} & {brideName}
              </h3>
              <p className="text-[10px] text-stone-400 italic">(Trưởng Nam & Út Nữ)</p>
            </div>

            {/* Addressing */}
            <div className="my-2 py-1 border-y border-stone-200/80">
              <span className="text-[9px] uppercase tracking-widest text-stone-400 block">
                KÍNH MỜI
              </span>
              <div className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                {cleanSalutation}
              </div>
            </div>

            {/* Time & Venue */}
            <div className="text-xs space-y-0.5 my-2">
              <div className="font-serif font-bold text-stone-900">
                {eventTime} • {dayOfWeek}, {weddingDateFormatted}
              </div>
              <p className="text-[10px] text-stone-500 italic">({lunarDate})</p>
              <div className="font-serif font-semibold text-stone-800 text-xs pt-1">
                {venueName}
              </div>
              <p className="text-[11px] text-stone-600">{hallName}</p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleEnterSite}
              className="w-full mt-2 py-2.5 rounded-full bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-95 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5 border border-stone-700"
            >
              <span>Bước Vào Không Gian Hôn Lễ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. ENVELOPE LOWER POCKET (Phần thân phong bì nằm ngang như ảnh mẫu!) */}
          <div
            className={`absolute inset-x-0 bottom-0 h-[65%] rounded-b-xl shadow-xl z-20 flex flex-col justify-between p-4 sm:p-6 border-t border-white/20 transition-all ${
              isKorean
                ? 'bg-[#E3EFE8] text-stone-800'
                : isTraditional
                ? 'bg-gradient-to-b from-[#8B111A] to-[#60060E] text-amber-100'
                : isRomantic
                ? 'bg-[#FFF0F5] text-stone-900'
                : isCelestial
                ? 'bg-gradient-to-b from-[#0F172A] to-[#040814] text-slate-100'
                : isRustic
                ? 'bg-[#E2DACB] text-stone-900'
                : isEditorial
                ? 'bg-[#1E1E1E] text-white'
                : 'bg-gradient-to-b from-[#4A0E17] to-[#250309] text-amber-100'
            }`}
          >
            {/* Fine Paper Texture Lines */}
            <div className="absolute inset-0 border-2 border-black/5 rounded-b-xl pointer-events-none" />

            {/* Spacer for top flap overlap */}
            <div className="h-6" />

            {/* Front Typography matching user's photo exactly! */}
            <div className="relative z-10 text-center space-y-2 mb-1">
              {/* WEDDING INVITATION Headline */}
              <h2
                className={`font-serif text-sm sm:text-base font-semibold uppercase tracking-[0.25em] ${
                  isKorean
                    ? 'text-teal-900/90'
                    : isTraditional
                    ? 'text-amber-200'
                    : isRomantic
                    ? 'text-pink-900'
                    : isCelestial
                    ? 'text-amber-200'
                    : 'text-wedding-gold-light'
                }`}
              >
                {isTraditional ? 'THIỆP CƯỚI BÁO HỶ' : 'WEDDING INVITATION'}
              </h2>

              {/* Dotted Line with Guest Salutation (Như trên ảnh mẫu!) */}
              <div className="flex items-baseline justify-center space-x-2 text-xs sm:text-sm">
                <span
                  className={`font-sans font-medium uppercase tracking-wider text-[11px] sm:text-xs ${
                    isKorean
                      ? 'text-teal-950/80 font-bold'
                      : isTraditional
                      ? 'text-amber-200/90 font-bold'
                      : 'text-stone-600'
                  }`}
                >
                  TRÂN TRỌNG KÍNH MỜI:
                </span>
                <span
                  className={`font-serif text-base sm:text-lg font-bold border-b border-dotted pb-0.5 px-2 ${
                    isKorean
                      ? 'text-teal-950 border-teal-800'
                      : isTraditional
                      ? 'text-white border-amber-300'
                      : isRomantic
                      ? 'text-pink-950 border-pink-400'
                      : 'text-white border-wedding-gold'
                  }`}
                >
                  {cleanSalutation}
                </span>
              </div>
            </div>

            {/* Hint to tap the wax seal */}
            {!isOpened ? (
              <div className="text-center pt-1">
                <span
                  className={`inline-flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-semibold animate-pulse ${
                    isKorean
                      ? 'text-rose-700'
                      : isTraditional
                      ? 'text-amber-300'
                      : 'text-amber-300'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Chạm con dấu sáp đỏ để mở thiệp</span>
                  <Sparkles className="w-3 h-3" />
                </span>
              </div>
            ) : (
              <div className="h-4" />
            )}
          </div>

          {/* 4. THE 3D TRIANGULAR V-FLAP (Nắp phong bì gập xuống tam giác) */}
          <div
            onClick={handleBreakSeal}
            className={`absolute top-0 inset-x-0 h-[52%] z-30 cursor-pointer origin-top transition-all duration-700 ease-in-out ${
              isOpened ? 'pointer-events-none' : ''
            }`}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              transform: isOpened ? 'rotateX(180deg)' : 'rotateX(0deg)',
            }}
          >
            {/* Flap Body Triangle via clip-path */}
            <div
              className={`w-full h-full relative drop-shadow-xl flex flex-col items-center pt-3 ${
                isKorean
                  ? 'bg-[#E3EFE8]'
                  : isTraditional
                  ? 'bg-gradient-to-b from-[#A81B26] to-[#780A13]'
                  : isRomantic
                  ? 'bg-[#FFF0F5]'
                  : isCelestial
                  ? 'bg-gradient-to-b from-[#1E293B] to-[#0A1128]'
                  : isRustic
                  ? 'bg-[#E2DACB]'
                  : isEditorial
                  ? 'bg-[#262626]'
                  : 'bg-gradient-to-b from-[#5C1320] to-[#360810]'
              }`}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              }}
            >
              {/* Monogram Logo On Flap (Như ảnh mẫu dâu rể!) */}
              <div className="relative text-center mt-1 sm:mt-2 pointer-events-none space-y-0.5">
                <div
                  className={`font-serif text-lg sm:text-2xl font-bold tracking-widest ${
                    isKorean
                      ? 'text-teal-900'
                      : isTraditional
                      ? 'text-amber-200'
                      : isRomantic
                      ? 'text-pink-900'
                      : isCelestial
                      ? 'text-amber-200'
                      : 'text-amber-200'
                  }`}
                >
                  {isTraditional ? '囍' : displayMonogram}
                </div>
                <div
                  className={`text-[8px] sm:text-[9px] font-mono tracking-[0.25em] uppercase ${
                    isKorean
                      ? 'text-teal-800/80 font-bold'
                      : isTraditional
                      ? 'text-amber-200/80 font-bold'
                      : 'text-stone-400'
                  }`}
                >
                  SAVE THE DATE • 2026
                </div>
              </div>
            </div>

            {/* 5. PHOTOREALISTIC 3D WAX SEAL (Con dấu sáp tròn - "Điểm màu đỏ" theo lời người dùng) */}
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40 transition-all duration-500 ${
                isOpened ? 'opacity-0 scale-75' : 'hover:scale-110 active:scale-95 animate-pulse-subtle'
              }`}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer">
                {/* SVG Organic Melted Wax Rim Seal */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full filter drop-shadow-2xl"
                >
                  <defs>
                    {/* Realistic Gold Bronze Wax Gradient (Như trong ảnh mẫu 7799 của người dùng!) */}
                    <radialGradient id="waxBronzeGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#E8BF6A" />
                      <stop offset="35%" stopColor="#C89738" />
                      <stop offset="70%" stopColor="#9E6E1C" />
                      <stop offset="100%" stopColor="#5E3E07" />
                    </radialGradient>
                    {/* Realistic Crimson Red Wax Gradient */}
                    <radialGradient id="waxRedGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#FF4B4B" />
                      <stop offset="35%" stopColor="#C62828" />
                      <stop offset="75%" stopColor="#8E0000" />
                      <stop offset="100%" stopColor="#4A0000" />
                    </radialGradient>
                    {/* Indigo Wax */}
                    <radialGradient id="waxIndigoGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#818CF8" />
                      <stop offset="40%" stopColor="#4338CA" />
                      <stop offset="80%" stopColor="#1E1B4B" />
                      <stop offset="100%" stopColor="#0B092B" />
                    </radialGradient>
                  </defs>

                  {/* Organic Melted Wax Outer Puddle */}
                  <path
                    d="M50 4 C63 3, 72 9, 81 16 C89 23, 96 33, 97 44 C98 55, 94 66, 89 76 C83 85, 74 93, 63 96 C52 99, 40 97, 29 93 C19 88, 11 80, 7 70 C2 60, 3 48, 6 38 C10 27, 18 18, 28 12 C37 6, 44 5, 50 4 Z"
                    fill={isCelestial ? 'url(#waxIndigoGrad)' : isKorean ? 'url(#waxBronzeGrad)' : 'url(#waxRedGrad)'}
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth="1.5"
                  />

                  {/* Inner Groove Rings */}
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

                {/* Stamped "with love" or Monogram in relief (Như ảnh mẫu!) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {isTraditional ? (
                    <span className="font-serif font-bold text-amber-200 text-xl drop-shadow-md">
                      囍
                    </span>
                  ) : isCelestial ? (
                    <span className="text-amber-200 text-lg drop-shadow-md">🌙</span>
                  ) : isKorean ? (
                    <span
                      className="font-script text-amber-950 font-bold text-sm tracking-normal drop-shadow"
                      style={{ fontFamily: '"Pinyon Script", "Great Vibes", cursive' }}
                    >
                      with love
                    </span>
                  ) : (
                    <span
                      className="font-script text-amber-200 font-bold text-sm tracking-normal drop-shadow"
                      style={{ fontFamily: '"Pinyon Script", "Great Vibes", cursive' }}
                    >
                      with love
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
