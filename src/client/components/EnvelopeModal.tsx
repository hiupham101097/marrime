import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Crown,
  Heart,
  Flower2,
  Moon,
  ExternalLink,
  ArrowRight,
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
  hallName = 'Sảnh Grand Ballroom',
  eventAddress = '360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
  eventTime = '11:30',
  dayOfWeek = 'Thứ Sáu',
  lunarDate = 'Nhằm ngày 17 tháng 11 năm Bính Ngọ',
  playOpenSound,
  envelopeStyle = 'royal_velvet',
  waxSealMonogram,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const cleanSalutation = formatGuestSalutation(guest);
  const defaultMonogram = `${groomName.charAt(0)} & ${brideName.charAt(0)}`;
  const displayMonogram = waxSealMonogram || defaultMonogram;

  const fatherGroom = groomParents?.father || 'Kim Văn Nam';
  const motherGroom = groomParents?.mother || 'Lê Thị Hạnh';
  const fatherBride = brideParents?.father || 'Shin Tae Jin';
  const motherBride = brideParents?.mother || 'Park Min Young';

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    if (playOpenSound) {
      playOpenSound();
    }

    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F472B6', '#E11D48', '#FFFBEB', '#DFB76C'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      onOpenEnvelope();
      setIsOpening(false);
    }, 700);
  };

  if (!isOpen) return null;

  // Visual Theme Archetypes
  const isTraditional = envelopeStyle === 'traditional_silk' || envelopeStyle === 'indochine_kraft';
  const isRoyal = envelopeStyle === 'royal_velvet' || envelopeStyle === 'emerald_brass';
  const isKorean = envelopeStyle === 'korean_chiffon';
  const isRomantic = envelopeStyle === 'blush_ribbon';
  const isRustic = envelopeStyle === 'rustic_twine';
  const isEditorial = envelopeStyle === 'modern_minimal' || envelopeStyle === 'editorial_vellum';
  const isCelestial = envelopeStyle === 'celestial_midnight';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/90 backdrop-blur-md transition-all duration-700 animate-fadeIn overflow-y-auto">
      {/* Dynamic Ambient Background Illumination */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isTraditional ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-red-700/20 rounded-full blur-[140px]" />
        ) : isCelestial ? (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-indigo-900/30 rounded-full blur-[140px]" />
        ) : isKorean || isRomantic ? (
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
          onClick={handleOpen}
          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white text-xs font-medium backdrop-blur-md border border-white/10 flex items-center space-x-1.5 transition-all cursor-pointer"
        >
          <span>Vào thẳng website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =====================================================================
          AUTHENTIC LUXURY WEDDING INVITATION CARD (TẤM THIỆP CƯỚI NGHỆ THUẬT)
         ===================================================================== */}
      <div className="relative w-full max-w-lg my-auto pt-4 pb-6">
        <div
          className={`relative rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-700 border-2 text-center overflow-hidden ${
            isTraditional
              ? 'bg-[#FFFDF7] text-stone-900 border-[#D4AF37] gold-glow'
              : isCelestial
              ? 'bg-[#0B132B] text-slate-100 border-indigo-400/60'
              : isKorean
              ? 'bg-[#FFF9F6] text-stone-800 border-orange-200 shadow-rose-100/50'
              : isRomantic
              ? 'bg-[#FFFDF9] text-stone-900 border-pink-200'
              : isRustic
              ? 'bg-[#FDFBF7] text-stone-900 border-emerald-700/40'
              : isEditorial
              ? 'bg-[#FAF8F5] text-stone-900 border-stone-800'
              : 'bg-[#FFFDF9] text-stone-900 border-wedding-gold gold-glow'
          } ${isOpening ? 'scale-95 opacity-80' : 'hover:scale-[1.005]'}`}
        >
          {/* Inner Decorative Hairline Frame */}
          <div
            className={`absolute inset-3 sm:inset-4 rounded-2xl border pointer-events-none ${
              isTraditional
                ? 'border-[#D4AF37]/50'
                : isCelestial
                ? 'border-indigo-400/30'
                : isKorean
                ? 'border-orange-300/40'
                : isRomantic
                ? 'border-pink-300/50'
                : isRustic
                ? 'border-emerald-600/30'
                : isEditorial
                ? 'border-stone-400/40'
                : 'border-wedding-gold/40'
            }`}
          />

          {/* 4 Artistic Corner Filigrees / Ornaments */}
          <div className="absolute top-5 left-5 text-wedding-gold/70 w-8 h-8 pointer-events-none">
            {isTraditional ? (
              <span className="text-amber-600 font-serif text-lg">❖</span>
            ) : isKorean ? (
              <span className="text-orange-400 text-sm">🌸</span>
            ) : isCelestial ? (
              <span className="text-amber-200 text-sm">✦</span>
            ) : (
              <svg viewBox="0 0 40 40" fill="currentColor">
                <path d="M0,0 L0,20 C3,12 12,3 20,0 Z" />
              </svg>
            )}
          </div>
          <div className="absolute top-5 right-5 text-wedding-gold/70 w-8 h-8 pointer-events-none scale-x-[-1]">
            {isTraditional ? (
              <span className="text-amber-600 font-serif text-lg">❖</span>
            ) : isKorean ? (
              <span className="text-orange-400 text-sm">🌸</span>
            ) : isCelestial ? (
              <span className="text-amber-200 text-sm">✦</span>
            ) : (
              <svg viewBox="0 0 40 40" fill="currentColor">
                <path d="M0,0 L0,20 C3,12 12,3 20,0 Z" />
              </svg>
            )}
          </div>
          <div className="absolute bottom-5 left-5 text-wedding-gold/70 w-8 h-8 pointer-events-none scale-y-[-1]">
            {isTraditional ? (
              <span className="text-amber-600 font-serif text-lg">❖</span>
            ) : isKorean ? (
              <span className="text-orange-400 text-sm">🌸</span>
            ) : isCelestial ? (
              <span className="text-amber-200 text-sm">✦</span>
            ) : (
              <svg viewBox="0 0 40 40" fill="currentColor">
                <path d="M0,0 L0,20 C3,12 12,3 20,0 Z" />
              </svg>
            )}
          </div>
          <div className="absolute bottom-5 right-5 text-wedding-gold/70 w-8 h-8 pointer-events-none scale-[-1]">
            {isTraditional ? (
              <span className="text-amber-600 font-serif text-lg">❖</span>
            ) : isKorean ? (
              <span className="text-orange-400 text-sm">🌸</span>
            ) : isCelestial ? (
              <span className="text-amber-200 text-sm">✦</span>
            ) : (
              <svg viewBox="0 0 40 40" fill="currentColor">
                <path d="M0,0 L0,20 C3,12 12,3 20,0 Z" />
              </svg>
            )}
          </div>

          {/* 1. SACRED EMBLEM / CREST */}
          <div className="flex justify-center mb-3">
            {isTraditional ? (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B111A] to-[#5B060D] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif font-bold text-3xl shadow-lg gold-glow">
                囍
              </div>
            ) : isCelestial ? (
              <div className="w-12 h-12 rounded-full bg-indigo-950 border border-amber-200 flex items-center justify-center text-amber-200 text-2xl shadow-md">
                🌙
              </div>
            ) : isKorean ? (
              <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-400 text-xl shadow-sm">
                🌸
              </div>
            ) : isRomantic ? (
              <div className="w-12 h-12 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-500 shadow-sm">
                <Flower2 className="w-6 h-6" />
              </div>
            ) : isRustic ? (
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-800 text-2xl shadow-sm">
                🌿
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-amber-50 to-amber-100 border-2 border-wedding-gold flex items-center justify-center text-wedding-gold shadow-sm">
                <Crown className="w-6 h-6 text-wedding-gold" />
              </div>
            )}
          </div>

          {/* 2. FORMAL INVITATION HEADER */}
          <div className="space-y-1 mb-4">
            <p
              className={`text-[11px] font-bold uppercase tracking-[0.35em] ${
                isTraditional
                  ? 'text-[#8B111A]'
                  : isCelestial
                  ? 'text-amber-200'
                  : isKorean
                  ? 'text-orange-600'
                  : isRomantic
                  ? 'text-pink-600'
                  : isRustic
                  ? 'text-emerald-800'
                  : 'text-wedding-gold-dark'
              }`}
            >
              {isTraditional
                ? 'TRÂN TRỌNG BÁO HỶ'
                : isCelestial
                ? 'CELESTIAL WEDDING INVITATION'
                : isKorean
                ? 'TRÂN TRỌNG BÁO HỶ'
                : isRomantic
                ? 'THIỆP HỒNG BÁO HỶ'
                : isRustic
                ? 'OUTDOOR WEDDING INVITATION'
                : 'ROYAL WEDDING INVITATION'}
            </p>
            <p className="text-xs italic text-stone-500">Lễ Thành Hôn</p>
          </div>

          {/* 3. ĐẠI DIỆN HAI BÊN GIA ĐÌNH (THE TWO FAMILIES) */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-xs py-2 border-y border-stone-200/80 mb-4">
            <div className="space-y-0.5 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                NHÀ TRAI
              </span>
              <p className="font-serif font-semibold text-stone-800 text-xs">Ông: {fatherGroom}</p>
              <p className="font-serif font-semibold text-stone-800 text-xs">Bà: {motherGroom}</p>
            </div>
            <div className="space-y-0.5 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                NHÀ GÁI
              </span>
              <p className="font-serif font-semibold text-stone-800 text-xs">Ông: {fatherBride}</p>
              <p className="font-serif font-semibold text-stone-800 text-xs">Bà: {motherBride}</p>
            </div>
          </div>

          <p className="text-xs text-stone-500 italic mb-3 font-light">
            Trân trọng báo tin lễ thành hôn của hai con chúng tôi
          </p>

          {/* 4. COUPLE NAMES (GRAND ARTISTIC TYPOGRAPHY) */}
          <div className="space-y-1 mb-5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
              <div>
                <h3
                  className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
                    isTraditional
                      ? 'text-[#8B111A]'
                      : isCelestial
                      ? 'text-white'
                      : isKorean
                      ? 'text-stone-900'
                      : isRomantic
                      ? 'text-pink-950 font-serif italic'
                      : 'text-wedding-burgundy'
                  }`}
                >
                  {groomName}
                </h3>
                <span className="text-[10px] text-stone-400 italic block">(Trưởng Nam)</span>
              </div>

              <div
                className={`font-serif text-xl sm:text-2xl font-normal px-2 ${
                  isKorean ? 'text-orange-400' : 'text-wedding-gold'
                }`}
              >
                &
              </div>

              <div>
                <h3
                  className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
                    isTraditional
                      ? 'text-[#8B111A]'
                      : isCelestial
                      ? 'text-white'
                      : isKorean
                      ? 'text-stone-900'
                      : isRomantic
                      ? 'text-pink-950 font-serif italic'
                      : 'text-wedding-burgundy'
                  }`}
                >
                  {brideName}
                </h3>
                <span className="text-[10px] text-stone-400 italic block">(Út Nữ)</span>
              </div>
            </div>
          </div>

          {/* 5. GUEST ADDRESSING (ELEGANT CALLIGRAPHY ADDRESSING) */}
          <div className="my-5 py-3 border-y border-stone-200/80 text-center space-y-1">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-stone-500 block">
              TRÂN TRỌNG KÍNH MỜI
            </span>
            <div
              className={`font-serif text-2xl sm:text-3xl font-bold tracking-wide ${
                isTraditional
                  ? 'text-[#8B111A]'
                  : isCelestial
                  ? 'text-amber-200'
                  : isKorean
                  ? 'text-stone-900'
                  : isRomantic
                  ? 'text-pink-900'
                  : 'text-stone-900'
              }`}
            >
              {cleanSalutation}
            </div>
            <p className="text-xs text-stone-600 font-light italic">
              Đến dự bữa tiệc rượu chung vui cùng gia đình chúng tôi
            </p>
          </div>

          {/* 6. CEREMONY TIME & DATE (CLASSICAL 3-COLUMN TYPOGRAPHIC FORMAT) */}
          <div className="space-y-1 mb-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400">
              HÔN LỄ ĐƯỢC TỔ CHỨC VÀO HỒI
            </p>
            <div className="flex items-center justify-center space-x-2 text-stone-900 font-serif font-bold text-base sm:text-lg">
              <span
                className={`font-mono text-lg sm:text-xl font-bold ${
                  isTraditional ? 'text-[#8B111A]' : 'text-wedding-burgundy'
                }`}
              >
                {eventTime}
              </span>
              <span className="text-stone-400">•</span>
              <span>{dayOfWeek}</span>
            </div>
            <div className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              {weddingDateFormatted}
            </div>
            <p className="text-xs text-stone-500 italic">({lunarDate})</p>
          </div>

          {/* 7. VENUE & RECEPTION HALL */}
          <div className="my-4 text-xs space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              ĐỊA ĐIỂM ĐÓN TIẾP
            </p>
            <div className="font-serif text-base sm:text-lg font-bold text-stone-900">
              {venueName}
            </div>
            <p className="font-medium text-stone-700">{hallName}</p>
            <p className="text-[11px] text-stone-500">{eventAddress}</p>
          </div>

          <p className="text-xs text-stone-500 italic mb-5">
            Sự hiện diện của quý khách là niềm vinh hạnh to lớn cho gia đình chúng tôi!
          </p>

          {/* 8. ACTION BUTTON */}
          <button
            type="button"
            onClick={handleOpen}
            disabled={isOpening}
            className={`w-full py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-widest shadow-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2.5 border ${
              isTraditional
                ? 'bg-gradient-to-r from-[#8B111A] via-[#B91C1C] to-[#5B060D] border-amber-400'
                : isCelestial
                ? 'bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-slate-400'
                : isKorean
                ? 'bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 border-rose-200 text-white shadow-rose-200'
                : isRomantic
                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 border-pink-200'
                : isRustic
                ? 'bg-gradient-to-r from-emerald-800 to-emerald-950 border-emerald-300'
                : 'bg-gradient-to-r from-wedding-rose-800 via-wedding-burgundy to-[#4A1020] border-wedding-gold'
            }`}
          >
            <span>{isOpening ? 'Đang Mở Hôn Lễ...' : 'Chạm Mở Toàn Bộ Hôn Lễ & Gửi Lời Chúc'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
