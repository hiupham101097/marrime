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
      // Golden star burst
      confetti({
        particleCount: 70,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#F3E5AB', '#FFF3A8', '#E6CF9B'],
      });

      // Romantic rose heart flutter
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 80,
          origin: { x: 0.15, y: 0.65 },
          colors: ['#DE5B78', '#F472B6', '#FFF0F5', '#C5A059'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 80,
          origin: { x: 0.85, y: 0.65 },
          colors: ['#DE5B78', '#F472B6', '#FFF0F5', '#C5A059'],
        });
      }, 250);

      setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 120,
          origin: { y: 0.4 },
          colors: ['#D4AF37', '#DE5B78', '#FFFFFF', '#FCE7F0'],
        });
      }, 500);
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      onOpenEnvelope();
      setIsOpening(false);
    }, 1300);
  };

  if (!isOpen) return null;

  // Style configurations for the 4 envelope designs
  const getStyleConfigs = () => {
    switch (envelopeStyle) {
      case 'blush_ribbon':
        return {
          wrapperBg: 'bg-gradient-to-br from-[#FCE7F0] via-[#FAD9DF] to-[#F5B8C4]',
          borderColor: 'border-wedding-rose-400/80',
          sealBg: 'radial-gradient(circle at 35% 35%, #F472B6 0%, #DB2777 55%, #9D174D 100%)',
          ribbonVisible: true,
          badgeColor: 'text-wedding-rose-800 bg-white/70 border-wedding-rose-300',
          titleColor: 'text-wedding-rose-900',
          btnBg: 'bg-gradient-to-r from-wedding-rose-700 to-wedding-rose-500',
        };
      case 'modern_minimal':
        return {
          wrapperBg: 'bg-gradient-to-br from-[#FAF8F5] via-[#FFFDF9] to-[#F4ECE1]',
          borderColor: 'border-wedding-gold/60',
          sealBg: 'radial-gradient(circle at 35% 35%, #D4AF37 0%, #AA771C 60%, #5E3D0A 100%)',
          ribbonVisible: false,
          badgeColor: 'text-wedding-gold-dark bg-wedding-cream border-wedding-gold/40',
          titleColor: 'text-stone-900',
          btnBg: 'bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900',
        };
      case 'emerald_brass':
        return {
          wrapperBg: 'bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#041D17]',
          borderColor: 'border-amber-400/70',
          sealBg: 'radial-gradient(circle at 35% 35%, #F59E0B 0%, #D97706 50%, #92400E 100%)',
          ribbonVisible: false,
          badgeColor: 'text-emerald-900 bg-emerald-50 border-emerald-300',
          titleColor: 'text-emerald-950',
          btnBg: 'bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#064E3B]',
        };
      default: // 'royal_velvet'
        return {
          wrapperBg: 'bg-gradient-to-br from-[#4A1020] via-[#5B1E31] to-[#340914]',
          borderColor: 'border-wedding-gold/70',
          sealBg: 'radial-gradient(circle at 35% 35%, #DE5B78 0%, #B82A4C 45%, #75142B 80%, #4A0B1B 100%)',
          ribbonVisible: false,
          badgeColor: 'text-wedding-gold-dark bg-wedding-cream border-wedding-gold/40',
          titleColor: 'text-wedding-burgundy',
          btnBg: 'bg-gradient-to-r from-wedding-rose-800 via-wedding-rose-700 to-wedding-burgundy',
        };
    }
  };

  const styleConfig = getStyleConfigs();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md transition-all duration-700 animate-fadeIn">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-wedding-rose-600/20 rounded-full blur-[100px] animate-pulse-subtle" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[100px] animate-pulse-subtle" />
      </div>

      <div className="relative w-full max-w-xl mx-auto">
        {/* Envelope Outer Wrapper */}
        <div
          className={`relative ${styleConfig.wrapperBg} rounded-3xl shadow-2xl p-2 sm:p-3 transition-transform duration-700 border-2 ${styleConfig.borderColor} gold-glow ${
            isOpening ? 'scale-105' : 'hover:scale-[1.01]'
          }`}
        >
          {/* Silk Ribbon Cross Band (If Blush Ribbon style) */}
          {styleConfig.ribbonVisible && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-wedding-rose-300/80 border-y border-white/50 pointer-events-none z-20 flex items-center justify-center ribbon-wave">
              <span className="w-6 h-6 rounded-full bg-white/90 border border-wedding-rose-300 shadow-sm" />
            </div>
          )}

          {/* Golden Vintage Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-wedding-gold/70 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-wedding-gold/70 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-wedding-gold/70 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-wedding-gold/70 rounded-br-lg pointer-events-none" />

          {/* Inner Paper Card (Slides up when opening) */}
          <div
            className={`paper-luxury rounded-2xl p-6 sm:p-10 text-center border-2 border-wedding-gold/40 shadow-inner relative overflow-hidden transition-all duration-1000 ${
              isOpening ? '-translate-y-10 opacity-95 shadow-2xl' : 'translate-y-0'
            }`}
          >
            {/* Subtle Royal Shimmer Band */}
            <div className="absolute inset-0 shimmer-gold-effect pointer-events-none opacity-40" />

            {/* Crown & Royal Laurel Emblem */}
            <div className="relative z-10 flex items-center justify-center space-x-3 mb-3">
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-wedding-gold" />
              <div className="w-8 h-8 rounded-full bg-wedding-rose-50 border border-wedding-gold/50 flex items-center justify-center text-wedding-gold-dark shadow-sm">
                <Crown className="w-4 h-4 text-wedding-gold" />
              </div>
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-wedding-gold" />
            </div>

            <p className="relative z-10 text-[11px] uppercase tracking-[0.3em] text-wedding-gold-dark font-semibold mb-1">
              TRÂN TRỌNG BÁO HỶ • THIỆP MỜI TRÂN QUÝ
            </p>
            <h1 className={`relative z-10 font-serif text-2xl sm:text-3xl ${styleConfig.titleColor} font-normal tracking-wide`}>
              Wedding Invitation
            </h1>

            {/* Couple Monogram / Names with Golden Polish */}
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

            {/* Personalized Guest Invitation Salutation */}
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

            {/* Wedding Date Preview */}
            <p className="relative z-10 text-xs sm:text-sm text-stone-700 font-semibold tracking-wider">
              {weddingDateFormatted}
            </p>

            {/* Wax Seal / Tap to Open Button */}
            <div className="relative z-10 mt-8 flex flex-col items-center">
              <button
                type="button"
                onClick={handleOpen}
                disabled={isOpening}
                className={`group relative flex items-center justify-center space-x-3.5 px-8 py-3.5 ${styleConfig.btnBg} text-white rounded-full shadow-2xl hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-wedding-gold/60 cursor-pointer`}
              >
                {/* 3D Wax seal emblem */}
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-serif font-black text-amber-100 shadow-md border border-amber-300/60 ring-2 ring-amber-400/20 tracking-tighter"
                  style={{ background: styleConfig.sealBg }}
                >
                  {waxSealMonogram || `${groomName.charAt(0)}&${brideName.charAt(0)}`}
                </span>
                <span className="font-semibold tracking-wide text-sm sm:text-base text-amber-50">
                  {isOpening ? 'Đang Mở Thiệp Cưới...' : 'Chạm Vào Đây Để Mở Thiệp'}
                </span>
                <Sparkles className="w-4 h-4 text-wedding-gold-light animate-spin" style={{ animationDuration: '4s' }} />
              </button>

              <p className="text-[11px] text-stone-400 mt-3.5 flex items-center space-x-1">
                <span>Nhấp mở thiệp để khám phá trọn vẹn hành trình & khoảnh khắc thiêng liêng</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
