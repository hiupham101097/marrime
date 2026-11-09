import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  RotateCw,
  Heart,
  Calendar,
  MapPin,
  Clock,
  UserCheck,
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

interface StylePalette {
  name: string;
  subtitle: string;
  paperBg: string;
  paperGradient: string;
  pocketGradient: string;
  textColor: string;
  subColor: string;
  accentGold: string;
  borderColor: string;
  sealType: 'bronze' | 'crimson' | 'vermilion' | 'sapphire' | 'rose' | 'emerald' | 'terracotta' | 'obsidian';
  sealInscription: 'with_love' | 'song_hy' | 'monogram' | 'moon' | 'olive';
  crestType: 'botanical' | 'crown' | 'song_hy' | 'moon' | 'wreath' | 'editorial' | 'ribbon' | 'lotus' | 'minimal';
  flatlayStyle: React.CSSProperties;
  looseSealGrad: [string, string, string];
  innerLiningPattern: string;
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
  // Interaction State Machine:
  // Step 1: Front of envelope visible (Mặt trước có đề tên khách)
  // Step 2: Flipped to back (Mặt sau có nắp phong bì và con dấu sáp 3D)
  // Step 3: Click wax seal -> seal breaks, flap swings open in 3D, inner letter glides up
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cleanSalutation = formatGuestSalutation(guest);
  const defaultMonogram = `${groomName.charAt(0)} & ${brideName.charAt(0)}`;
  const displayMonogram = waxSealMonogram || defaultMonogram;

  // 10 Bespoke Haute Couture Stationery Themes
  const styleConfigs: Record<EnvelopeStyle, StylePalette> = {
    // 1. Korean Pastel Chiffon (Chuẩn 100% hình ảnh thực tế 7799 Wedding Storyteller)
    korean_chiffon: {
      name: 'Hàn Quốc Pastel Thơ Mộng',
      subtitle: 'MINT SAGE & VOAN ĐÀO CORAL (7799 STORYTELLER)',
      paperBg: 'bg-[#D6E2DA]',
      paperGradient: 'linear-gradient(135deg, #E6F0E9 0%, #D4E3D8 50%, #C1D4C6 100%)',
      pocketGradient: 'linear-gradient(180deg, #CAD9CE 0%, #BFD1C4 60%, #B2C7B7 100%)',
      textColor: 'text-[#1B362C]',
      subColor: 'text-[#2D4F42]',
      accentGold: '#C59A4E',
      borderColor: 'border-[#1B362C]/25',
      sealType: 'bronze',
      sealInscription: 'with_love',
      crestType: 'botanical',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #FFE9DE 0%, #FFD6C4 35%, #F4AB94 70%, #DE8267 100%)',
      },
      looseSealGrad: ['#FCE194', '#D4A33B', '#6E4909'],
      innerLiningPattern: 'radial-gradient(#C59A4E 1.2px, transparent 1.2px), radial-gradient(#C59A4E 1.2px, #FCF9F5 1.2px)',
    },

    // 2. Royal Velvet European
    royal_velvet: {
      name: 'Hoàng Gia Quý Tộc Châu Âu',
      subtitle: 'BAROQUE GOLD & NHUNG ĐỎ BURGUNDY',
      paperBg: 'bg-[#3A0711]',
      paperGradient: 'linear-gradient(135deg, #4F0B19 0%, #3A0711 50%, #250208 100%)',
      pocketGradient: 'linear-gradient(180deg, #380710 0%, #2A040B 60%, #1D0106 100%)',
      textColor: 'text-amber-100',
      subColor: 'text-amber-200/80',
      accentGold: '#E6CA65',
      borderColor: 'border-[#E6CA65]/40',
      sealType: 'crimson',
      sealInscription: 'with_love',
      crestType: 'crown',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #4A0A17 0%, #2E040D 55%, #150105 100%)',
      },
      looseSealGrad: ['#FF7373', '#B81414', '#570000'],
      innerLiningPattern: 'radial-gradient(#DFB76C 1.2px, transparent 1.2px), radial-gradient(#DFB76C 1.2px, #FFFDF9 1.2px)',
    },

    // 3. Traditional Silk Asian
    traditional_silk: {
      name: 'Truyền Thống Á Đông Hoàng Triều',
      subtitle: 'SONG HỶ ĐỎ HOÀNG GIA & KHÍ CHẤT GIA TỘC',
      paperBg: 'bg-[#850F18]',
      paperGradient: 'linear-gradient(135deg, #A11520 0%, #850F18 50%, #5E070E 100%)',
      pocketGradient: 'linear-gradient(180deg, #7C0D16 0%, #680911 60%, #4D040A 100%)',
      textColor: 'text-amber-100',
      subColor: 'text-amber-200/85',
      accentGold: '#F5D061',
      borderColor: 'border-[#F5D061]/50',
      sealType: 'vermilion',
      sealInscription: 'song_hy',
      crestType: 'song_hy',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #9E1621 0%, #6E0911 55%, #3D0206 100%)',
      },
      looseSealGrad: ['#FF6060', '#D01414', '#600202'],
      innerLiningPattern: 'radial-gradient(#F5D061 1.5px, transparent 1.5px), radial-gradient(#F5D061 1.5px, #FFFBF0 1.5px)',
    },

    // 4. Celestial Midnight
    celestial_midnight: {
      name: 'Bầu Trời Sao Đêm & Dạ Tiệc',
      subtitle: 'MIDNIGHT SAPPHIRE & BỤI SAO VÀNG ÁNH KIM',
      paperBg: 'bg-[#0B132B]',
      paperGradient: 'linear-gradient(135deg, #131E42 0%, #0B132B 50%, #050814 100%)',
      pocketGradient: 'linear-gradient(180deg, #0A1127 0%, #070B1C 60%, #03050E 100%)',
      textColor: 'text-slate-100',
      subColor: 'text-slate-300/80',
      accentGold: '#FDE68A',
      borderColor: 'border-indigo-400/35',
      sealType: 'sapphire',
      sealInscription: 'moon',
      crestType: 'moon',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #15224D 0%, #0B1229 55%, #03050F 100%)',
      },
      looseSealGrad: ['#BAC6FF', '#4052B5', '#162057'],
      innerLiningPattern: 'radial-gradient(#FDE68A 1.2px, transparent 1.2px), radial-gradient(#FDE68A 1.2px, #070B1A 1.2px)',
    },

    // 5. Rustic Twine
    rustic_twine: {
      name: 'Mộc Mạc Bohemian & Thảo Mộc',
      subtitle: 'KRAFT LINEN TỰ NHIÊN & LÁ OLIU CỔ THỤ',
      paperBg: 'bg-[#D8CEBC]',
      paperGradient: 'linear-gradient(135deg, #E6DDD0 0%, #D8CEBC 50%, #C3B6A0 100%)',
      pocketGradient: 'linear-gradient(180deg, #D0C4B1 0%, #C4B6A0 60%, #B2A28A 100%)',
      textColor: 'text-[#2D382E]',
      subColor: 'text-[#485749]',
      accentGold: '#A66A45',
      borderColor: 'border-[#2D382E]/25',
      sealType: 'bronze',
      sealInscription: 'olive',
      crestType: 'wreath',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #586B5A 0%, #3B4B3D 55%, #1F2820 100%)',
      },
      looseSealGrad: ['#EAD198', '#B0883C', '#594112'],
      innerLiningPattern: 'radial-gradient(#A66A45 1.2px, transparent 1.2px), radial-gradient(#A66A45 1.2px, #FAF6EE 1.2px)',
    },

    // 6. Editorial Vellum
    editorial_vellum: {
      name: 'Tạp Chí Thời Trang Vogue',
      subtitle: 'MONOCHROME MINIMALIST & CHỮ SERIF CAO CẤP',
      paperBg: 'bg-[#F5F5F0]',
      paperGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F0 50%, #E6E6DF 100%)',
      pocketGradient: 'linear-gradient(180deg, #EFEFE9 0%, #E4E4DC 60%, #D4D4CA 100%)',
      textColor: 'text-[#171717]',
      subColor: 'text-[#525252]',
      accentGold: '#B8860B',
      borderColor: 'border-stone-400/40',
      sealType: 'bronze',
      sealInscription: 'monogram',
      crestType: 'editorial',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #333333 0%, #1A1A1A 60%, #0A0A0A 100%)',
      },
      looseSealGrad: ['#FFF0B8', '#D4AF37', '#735705'],
      innerLiningPattern: 'radial-gradient(#171717 1px, transparent 1px), radial-gradient(#171717 1px, #FFFFFF 1px)',
    },

    // 7. Blush Ribbon
    blush_ribbon: {
      name: 'Lãng Mạn Pastel Hồng Phấn',
      subtitle: 'PEONY BLUSH & DẢI RUY BĂNG LỤA TƠ TẰM',
      paperBg: 'bg-[#FCEFF2]',
      paperGradient: 'linear-gradient(135deg, #FFF6F8 0%, #FCEFF2 50%, #F5D7DE 100%)',
      pocketGradient: 'linear-gradient(180deg, #F9E5EA 0%, #F2D2DA 60%, #E5BDC8 100%)',
      textColor: 'text-[#68182D]',
      subColor: 'text-[#8C334A]',
      accentGold: '#D47D93',
      borderColor: 'border-[#68182D]/20',
      sealType: 'rose',
      sealInscription: 'with_love',
      crestType: 'ribbon',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #FCE4EC 0%, #F8BBD0 55%, #D47997 100%)',
      },
      looseSealGrad: ['#FFD1E0', '#E56D93', '#7A1C3C'],
      innerLiningPattern: 'radial-gradient(#D47D93 1.2px, transparent 1.2px), radial-gradient(#D47D93 1.2px, #FFF9FA 1.2px)',
    },

    // 8. Emerald Brass
    emerald_brass: {
      name: 'Khu Vườn Cổ Điển Emerald & Brass',
      subtitle: 'HERITAGE GREEN & ĐỒNG THAU VƯƠNG GIẢ',
      paperBg: 'bg-[#10291F]',
      paperGradient: 'linear-gradient(135deg, #183C2E 0%, #10291F 50%, #081610 100%)',
      pocketGradient: 'linear-gradient(180deg, #0E251C 0%, #091D15 60%, #05100B 100%)',
      textColor: 'text-amber-100',
      subColor: 'text-amber-200/80',
      accentGold: '#D8B863',
      borderColor: 'border-[#D8B863]/40',
      sealType: 'emerald',
      sealInscription: 'monogram',
      crestType: 'crown',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #15382B 0%, #0D241B 55%, #05100C 100%)',
      },
      looseSealGrad: ['#52DC98', '#167E4E', '#06351F'],
      innerLiningPattern: 'radial-gradient(#D8B863 1.2px, transparent 1.2px), radial-gradient(#D8B863 1.2px, #0B1E16 1.2px)',
    },

    // 9. Indochine Kraft
    indochine_kraft: {
      name: 'Đông Dương Cổ Điển Indochine Sài Gòn',
      subtitle: 'HOA SEN ĐỒNG & GIẤY GIANG VINTAGE 1930',
      paperBg: 'bg-[#D8C4A0]',
      paperGradient: 'linear-gradient(135deg, #EAD7B7 0%, #D8C4A0 50%, #BFAB85 100%)',
      pocketGradient: 'linear-gradient(180deg, #D0BC97 0%, #C3AE87 60%, #B09B74 100%)',
      textColor: 'text-[#442510]',
      subColor: 'text-[#693D1E]',
      accentGold: '#B85526',
      borderColor: 'border-[#442510]/30',
      sealType: 'terracotta',
      sealInscription: 'song_hy',
      crestType: 'lotus',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #593116 0%, #3B1E0A 55%, #1F0D03 100%)',
      },
      looseSealGrad: ['#FF9166', '#C74A1B', '#631B00'],
      innerLiningPattern: 'radial-gradient(#B85526 1.2px, transparent 1.2px), radial-gradient(#B85526 1.2px, #FAF5EA 1.2px)',
    },

    // 10. Modern Minimal
    modern_minimal: {
      name: 'Tối Giản Đương Đại Minimalist',
      subtitle: 'GALLERY WHITE 400GSM & CHỮ KHẮC CHÌ',
      paperBg: 'bg-[#FAFAFA]',
      paperGradient: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 50%, #EDEDED 100%)',
      pocketGradient: 'linear-gradient(180deg, #F3F3F3 0%, #E8E8E8 60%, #DCDCDC 100%)',
      textColor: 'text-[#18181B]',
      subColor: 'text-[#52525B]',
      accentGold: '#A1A1AA',
      borderColor: 'border-zinc-300',
      sealType: 'obsidian',
      sealInscription: 'monogram',
      crestType: 'minimal',
      flatlayStyle: {
        background: 'radial-gradient(ellipse at 35% 25%, #27272A 0%, #18181B 60%, #09090B 100%)',
      },
      looseSealGrad: ['#71717A', '#27272A', '#09090B'],
      innerLiningPattern: 'radial-gradient(#18181B 1px, transparent 1px), radial-gradient(#18181B 1px, #FFFFFF 1px)',
    },
  };

  const currentStyle = styleConfigs[envelopeStyle] || styleConfigs.royal_velvet;

  // Breaking the wax seal action
  const handleBreakWaxSeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSealBroken || isTransitioning) return;

    setIsSealBroken(true);

    if (playOpenSound) {
      playOpenSound();
    }

    // Step A: Flap swings open 180deg upward in 3D
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 220);

    // Step B: Shimmering gold, floral & stardust celebration
    try {
      confetti({
        particleCount: 110,
        spread: 110,
        origin: { y: 0.52 },
        colors: [
          currentStyle.accentGold,
          '#FFFDF9',
          currentStyle.sealType === 'crimson' || currentStyle.sealType === 'vermilion'
            ? '#E11D48'
            : currentStyle.sealType === 'bronze'
            ? '#DFB76C'
            : '#93C5FD',
          '#FDE68A',
        ],
      });
    } catch {
      // Confetti fallback
    }

    // Step C: Seamless auto-transition into the full wedding website
    setIsTransitioning(true);
    setTimeout(() => {
      onOpenEnvelope();
    }, 1450);
  };

  const handleEnterSiteDirectly = () => {
    onOpenEnvelope();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/95 backdrop-blur-md transition-all duration-700 select-none overflow-y-auto">
      {/* =======================================================================
          0. DRAPED BRIDAL SILK / TULLE FLATLAY PHOTOGRAPHY STAGING
          (Mô phỏng 100% bối cảnh chụp ảnh thiệp cưới phẳng trên nền vải voan/lụa 7799 Storyteller)
         ======================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fabric Base Gradient */}
        <div className="w-full h-full opacity-95 transition-all duration-700" style={currentStyle.flatlayStyle} />

        {/* Photorealistic Soft Fabric Waves & Ripple Folds */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.3) 0%, transparent 50%), repeating-linear-gradient(60deg, transparent, transparent 50px, rgba(255,255,255,0.08) 50px, rgba(255,255,255,0.08) 100px)',
          }}
        />

        {/* Ambient Vignette & Studio Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

        {/* Realistic loose accessory wax seal coin lying casually on the draped tulle (Like 7799 photo!) */}
        <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-14 w-12 h-12 sm:w-16 sm:h-16 opacity-75 filter drop-shadow(0 12px 14px rgba(0,0,0,0.45)) hidden sm:block pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="looseWaxGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor={currentStyle.looseSealGrad[0]} />
                <stop offset="45%" stopColor={currentStyle.looseSealGrad[1]} />
                <stop offset="100%" stopColor={currentStyle.looseSealGrad[2]} />
              </radialGradient>
            </defs>
            <path
              d="M50 4 C64 2, 74 9, 83 16 C91 23, 98 34, 98 45 C98 56, 94 67, 88 77 C82 86, 73 94, 61 97 C49 100, 38 97, 27 92 C17 87, 9 78, 6 68 C3 57, 4 45, 8 35 C12 25, 20 16, 30 11 C39 6, 45 4, 50 4 Z"
              fill="url(#looseWaxGrad)"
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="1.2"
            />
            <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
            <circle cx="50" cy="50" r="28" fill="url(#looseWaxGrad)" />
            <text
              x="50"
              y="54"
              textAnchor="middle"
              fill="rgba(255,255,255,0.85)"
              fontSize="14"
              fontFamily='"Pinyon Script", "Great Vibes", cursive'
              style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }}
            >
              with love
            </text>
          </svg>
        </div>
      </div>

      {/* Top Quick Bypass Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={handleEnterSiteDirectly}
          className="px-3.5 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-200 hover:text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center space-x-1.5 transition-all shadow-lg cursor-pointer"
        >
          <span>Vào thẳng website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* =======================================================================
          THE HAUTE COUTURE WEDDING ENVELOPE (PERSPECTIVE 3D STAGE)
         ======================================================================= */}
      <div className="relative w-full max-w-[540px] my-auto py-4 px-2 sm:px-4 flex flex-col items-center">
        {/* Step Guide Hint Badge */}
        <div className="mb-3 sm:mb-4 text-center z-40">
          {!isFlipped ? (
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-xl hover:bg-black/90 transition-all cursor-pointer animate-pulse-subtle"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-300" />
              <span>Chạm phong bì để lật mặt sau niêm phong sáp</span>
            </button>
          ) : !isFlapOpen ? (
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-semibold shadow-xl animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Chạm vào con dấu sáp 3D để mở nắp thiệp</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
          ) : (
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-semibold shadow-xl animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Đang mở bức thư cưới chúc phúc...</span>
            </div>
          )}
        </div>

        {/* 3D Envelope Container (Landscape Ratio 16:10.5 như phong bì thiệp cưới thật) */}
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
                1. MẶT TRƯỚC PHONG BÌ (FRONT FACE) - VĂN PHÒNG PHẨM CƯỚI CAO CẤP
               =============================================================== */}
            <div
              onClick={() => setIsFlipped(true)}
              className={`absolute inset-0 rounded-2xl p-5 sm:p-7 flex flex-col justify-between border transition-all duration-300 select-none overflow-hidden ${currentStyle.paperBg} ${currentStyle.textColor} ${currentStyle.borderColor}`}
              style={{
                background: currentStyle.paperGradient,
                boxShadow:
                  '0 25px 45px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
            >
              {/* Outer Decorative Double Gold Foil Hairline Frame */}
              <div
                className={`absolute inset-3 sm:inset-4 rounded-xl border pointer-events-none ${currentStyle.borderColor}`}
              />
              <div
                className="absolute inset-4 sm:inset-5 rounded-lg border opacity-40 pointer-events-none"
                style={{ borderColor: currentStyle.accentGold }}
              />

              {/* 4 Corner Ornamental Flourishes */}
              <div
                className="absolute top-4 left-4 text-xs opacity-65 pointer-events-none select-none"
                style={{ color: currentStyle.accentGold }}
              >
                {currentStyle.crestType === 'song_hy' ? '囍' : '❦'}
              </div>
              <div
                className="absolute top-4 right-4 text-xs opacity-65 pointer-events-none select-none"
                style={{ color: currentStyle.accentGold }}
              >
                {currentStyle.crestType === 'song_hy' ? '囍' : '❦'}
              </div>
              <div
                className="absolute bottom-4 left-4 text-xs opacity-65 pointer-events-none select-none"
                style={{ color: currentStyle.accentGold }}
              >
                {currentStyle.crestType === 'song_hy' ? '囍' : '❦'}
              </div>
              <div
                className="absolute bottom-4 right-4 text-xs opacity-65 pointer-events-none select-none"
                style={{ color: currentStyle.accentGold }}
              >
                {currentStyle.crestType === 'song_hy' ? '囍' : '❦'}
              </div>

              {/* Top Row: Atelier Brand Insignia & Save The Date */}
              <div className="relative z-10 flex items-center justify-between border-b border-black/10 pb-2.5">
                <div className="flex items-center space-x-2">
                  <span
                    className="font-serif text-lg sm:text-xl font-bold tracking-widest drop-shadow-xs"
                    style={{ color: currentStyle.accentGold }}
                  >
                    {currentStyle.crestType === 'song_hy' ? '囍' : displayMonogram}
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] uppercase font-bold opacity-80">
                      MARRIME ATELIER • 2026
                    </span>
                    <span className="text-[7px] font-mono tracking-widest opacity-60 uppercase">
                      ÉDITION SUR MESURE
                    </span>
                  </div>
                </div>

                <div className="text-[10px] sm:text-xs font-serif italic opacity-85">
                  Save The Date • {weddingDateFormatted}
                </div>
              </div>

              {/* Center Content: WEDDING INVITATION & Recipient Salutation (Chuẩn 100% như ảnh mẫu 7799!) */}
              <div className="relative z-10 text-center my-auto space-y-1.5 py-1">
                {/* Botanical Laurel Sprig / Crest */}
                <div className="flex justify-center text-sm opacity-80" style={{ color: currentStyle.accentGold }}>
                  {currentStyle.crestType === 'song_hy'
                    ? '囍'
                    : currentStyle.crestType === 'moon'
                    ? '🌙 ✨'
                    : currentStyle.crestType === 'crown'
                    ? '👑'
                    : currentStyle.crestType === 'ribbon'
                    ? '🎀'
                    : '🌿'}
                </div>

                <h2
                  className="font-serif text-base sm:text-xl font-bold uppercase tracking-[0.35em] drop-shadow-xs"
                  style={{ color: currentStyle.accentGold }}
                >
                  {currentStyle.crestType === 'song_hy' ? 'THIỆP CƯỚI BÁO HỶ' : 'WEDDING INVITATION'}
                </h2>

                <p className="text-xs sm:text-sm italic font-light opacity-80">
                  Hôn Lễ: <strong className="font-semibold">{groomName}</strong> & <strong className="font-semibold">{brideName}</strong>
                </p>

                {/* Formal Addressing Dotted Line (Exact 7799 Storyteller Layout) */}
                <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider opacity-75">
                    TRÂN TRỌNG KÍNH MỜI:
                  </span>
                  <span
                    className="font-serif text-lg sm:text-2xl font-bold border-b border-dotted pb-0.5 px-3 min-w-[180px]"
                    style={{ borderColor: currentStyle.accentGold }}
                  >
                    {cleanSalutation}
                  </span>
                </div>
              </div>

              {/* Bottom Interactive Hint */}
              <div className="relative z-10 flex items-center justify-between border-t border-black/10 pt-2.5 text-[10px] sm:text-[11px]">
                <span className="italic truncate max-w-[190px] sm:max-w-none opacity-75">
                  {hallName} • {venueName}
                </span>

                <span
                  className="inline-flex items-center space-x-1 font-bold cursor-pointer hover:opacity-85 transition-opacity"
                  style={{ color: currentStyle.accentGold }}
                >
                  <span>Chạm để lật mặt sau</span>
                  <RotateCw className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* ===============================================================
                2. MẶT SAU PHONG BÌ (BACK FACE) - KẾT CẤU TÚI THẬT & CON DẤU SÁP 3D
                (Được bọc kín 100% bằng giấy bao thư đồng màu, triệt tiêu hoàn toàn góc trắng thừa!)
               =============================================================== */}
            <div
              className={`absolute inset-0 rounded-2xl overflow-hidden border transition-all select-none ${currentStyle.paperBg} ${currentStyle.textColor} ${currentStyle.borderColor}`}
              style={{
                background: currentStyle.paperGradient,
                boxShadow:
                  '0 25px 45px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {/* Layer 1: Solid Interior Base Wall with Silk Damask Pattern (Revealed when flap opens) */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                  isFlapOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background: currentStyle.innerLiningPattern,
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Layer 2: THE INNER INVITATION CARD (Tấm thiệp lụa dập nổi bên trong)
                  - Khi nắp đóng: Nằm sâu trong túi (translateY(25%), opacity-0), không thể lộ ra ngoài!
                  - Khi mở sáp: Nổi lên và trượt dần ra khỏi miệng túi (translateY(-52%)) */}
              <div
                onClick={handleEnterSiteDirectly}
                className={`absolute inset-x-4 top-2 bottom-3 rounded-xl bg-[#FFFDFB] shadow-2xl p-4 sm:p-5 border border-amber-200/90 flex flex-col justify-between transition-all duration-700 ease-out z-10 cursor-pointer text-stone-900 ${
                  isFlapOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  transform: isFlapOpen ? 'translateY(-50%)' : 'translateY(25%)',
                  boxShadow: '0 20px 30px -10px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.4)',
                }}
              >
                {/* Inner Card Hairline Frame */}
                <div className="absolute inset-2 rounded-lg border border-amber-300/50 pointer-events-none" />

                {/* Card Header: Lễ Thành Hôn & Dâu Rể */}
                <div className="text-center space-y-0.5 relative z-10">
                  <span className="font-serif text-xs font-bold tracking-[0.25em] text-[#A2682A] uppercase">
                    LỄ THÀNH HÔN
                  </span>
                  <div className="flex items-center justify-center space-x-2 text-stone-800">
                    <span className="font-serif text-base sm:text-lg font-bold">{groomName}</span>
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span className="font-serif text-base sm:text-lg font-bold">{brideName}</span>
                  </div>
                </div>

                {/* Ceremony Details */}
                <div className="text-center py-1.5 relative z-10 space-y-1 border-y border-stone-100 text-[11px] text-stone-600">
                  <div className="flex items-center justify-center space-x-1.5 font-medium">
                    <Calendar className="w-3 h-3 text-[#A2682A]" />
                    <span>{dayOfWeek}, {weddingDateFormatted} ({lunarDate})</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1.5">
                    <Clock className="w-3 h-3 text-[#A2682A]" />
                    <span>{eventTime} • {hallName}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1.5 text-stone-500 text-[10px]">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span className="truncate max-w-[280px]">{venueName}</span>
                  </div>
                </div>

                {/* Action CTA Button */}
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

              {/* Layer 3: LOWER ENVELOPE POCKET BODY (Túi đựng thiệp phía dưới)
                  - Có độ cao 64% bao phủ toàn bộ đáy và hai bên sườn
                  - Nằm ở Z-INDEX 20 (Đè lên trên tấm thiệp bên trong) để thiệp rút từ trong túi ra! */}
              <div
                className={`absolute inset-x-0 bottom-0 h-[64%] rounded-b-2xl border-t shadow-inner z-20 flex flex-col justify-end p-4 sm:p-5 text-center pointer-events-none ${currentStyle.borderColor}`}
                style={{
                  background: currentStyle.pocketGradient,
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 -4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {/* Atelier Blind Deboss / Inscription on Pocket */}
                <div className="space-y-0.5">
                  <p className="text-[9px] uppercase tracking-[0.25em] font-semibold opacity-70">
                    HÔN LỄ TRĂM NĂM
                  </p>
                  <p className="font-serif text-xs sm:text-sm font-bold">
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
                className="absolute bottom-3 left-3 z-30 px-2.5 py-1 rounded-full bg-black/55 hover:bg-black/80 text-white text-[10px] flex items-center space-x-1 cursor-pointer transition-colors backdrop-blur-sm"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Xem mặt trước</span>
              </button>

              {/* Layer 4: TOP TRIANGULAR V-FLAP WITH 3D TURNING (ZERO MIRRORED TEXT)
                  - Nắp tam giác gập từ mép trên xuống
                  - Khi mở, xoay 180deg quanh cạnh trên, mặt sau là lót lụa đồng màu, KHÔNG bị lật ngược chữ! */}
              <div
                className="absolute top-0 inset-x-0 h-[56%] z-30 origin-top pointer-events-none"
                style={{ perspective: '1200px' }}
              >
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-in-out pointer-events-auto"
                  style={{
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  }}
                >
                  {/* 4A. FLAP OUTER FACE (Visible when closed, hides when rotated 180deg) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateX(0deg)',
                    }}
                  >
                    {/* Flap Body via Clip-Path with Realistic Ambient Shadow */}
                    <div
                      className="w-full h-full relative"
                      style={{
                        background: currentStyle.paperGradient,
                        clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                        filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))',
                      }}
                    >
                      {/* Flap gold foil hairline piping */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                          boxShadow: 'inset 0 0 0 1.5px rgba(212, 175, 55, 0.4)',
                        }}
                      />

                      {/* Flap Content: Botanical Laurel & Monogram (Chuẩn theo ảnh mẫu 7799) */}
                      <div className="absolute inset-x-0 top-3 sm:top-4 text-center z-10 space-y-0.5">
                        <div
                          className="flex justify-center text-xs opacity-80"
                          style={{ color: currentStyle.accentGold }}
                        >
                          {currentStyle.crestType === 'song_hy'
                            ? '囍'
                            : currentStyle.crestType === 'moon'
                            ? '🌙'
                            : currentStyle.crestType === 'crown'
                            ? '👑'
                            : '🌿'}
                        </div>

                        {/* Monogram */}
                        <div
                          className="font-serif text-sm sm:text-base font-bold tracking-wider"
                          style={{ color: currentStyle.accentGold }}
                        >
                          {currentStyle.crestType === 'song_hy' ? 'SONG HỶ' : displayMonogram}
                        </div>

                        {/* Save the Date subtext */}
                        <div className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase opacity-70">
                          SAVE THE DATE
                        </div>
                      </div>
                    </div>

                    {/* =========================================================
                        4B. THE 3D ORGANIC METALLIC WAX SEAL (CON DẤU SÁP THẬT)
                        (Con dấu sáp tròn kim loại 3D chuẩn tự nhiên)
                       ========================================================= */}
                    {!isFlapOpen && (
                      <div
                        onClick={handleBreakWaxSeal}
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 transition-all duration-300 cursor-pointer ${
                          isSealBroken
                            ? 'scale-125 opacity-0 pointer-events-none'
                            : 'hover:scale-115 active:scale-95'
                        }`}
                        title="Chạm vào con dấu sáp để mở thiệp cưới"
                      >
                        <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center cursor-pointer">
                          {/* SVG 3D Organic Metallic Wax Seal */}
                          <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full filter drop-shadow(0 10px 18px rgba(0,0,0,0.5))"
                          >
                            <defs>
                              {/* Antique Bronze Wax Gradient (Chuẩn 100% ảnh 7799 Storyteller của khách) */}
                              <radialGradient id="waxBronzeGrad" cx="35%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#FFF2B2" />
                                <stop offset="25%" stopColor="#E2AE48" />
                                <stop offset="60%" stopColor="#9C6B1C" />
                                <stop offset="88%" stopColor="#6E4407" />
                                <stop offset="100%" stopColor="#3F2502" />
                              </radialGradient>

                              {/* Royal Crimson Red Wax Gradient */}
                              <radialGradient id="waxCrimsonGrad" cx="35%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#FF7373" />
                                <stop offset="30%" stopColor="#C91818" />
                                <stop offset="70%" stopColor="#820808" />
                                <stop offset="90%" stopColor="#540000" />
                                <stop offset="100%" stopColor="#300000" />
                              </radialGradient>

                              {/* Traditional Vermilion Imperial Red */}
                              <radialGradient id="waxVermilionGrad" cx="35%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#FFA185" />
                                <stop offset="30%" stopColor="#E02A14" />
                                <stop offset="70%" stopColor="#9E1202" />
                                <stop offset="100%" stopColor="#590800" />
                              </radialGradient>

                              {/* Rose Pink Wax Gradient */}
                              <radialGradient id="waxRoseGrad" cx="35%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#FDE8F0" />
                                <stop offset="30%" stopColor="#F472B6" />
                                <stop offset="70%" stopColor="#BE185D" />
                                <stop offset="100%" stopColor="#831843" />
                              </radialGradient>

                              {/* Sapphire Midnight Wax Gradient */}
                              <radialGradient id="waxSapphireGrad" cx="35%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#C7D2FE" />
                                <stop offset="35%" stopColor="#4F46E5" />
                                <stop offset="75%" stopColor="#312E81" />
                                <stop offset="100%" stopColor="#1E1B4B" />
                              </radialGradient>

                              {/* Emerald Green Wax Gradient */}
                              <radialGradient id="waxEmeraldGrad" cx="35%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#A7F3D0" />
                                <stop offset="35%" stopColor="#059669" />
                                <stop offset="75%" stopColor="#065F46" />
                                <stop offset="100%" stopColor="#022C22" />
                              </radialGradient>

                              {/* Terracotta Wax Gradient */}
                              <radialGradient id="waxTerracottaGrad" cx="35%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#FED7AA" />
                                <stop offset="35%" stopColor="#EA580C" />
                                <stop offset="75%" stopColor="#9A3412" />
                                <stop offset="100%" stopColor="#431407" />
                              </radialGradient>

                              {/* Obsidian Black Wax Gradient */}
                              <radialGradient id="waxObsidianGrad" cx="35%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#A1A1AA" />
                                <stop offset="35%" stopColor="#3F3F46" />
                                <stop offset="75%" stopColor="#18181B" />
                                <stop offset="100%" stopColor="#09090B" />
                              </radialGradient>
                            </defs>

                            {/* Organic melted wax rim with natural wavy ripples */}
                            <path
                              d="M50 4 C64 2, 74 9, 83 16 C91 23, 98 34, 98 45 C98 56, 94 67, 88 77 C82 86, 73 94, 61 97 C49 100, 38 97, 27 92 C17 87, 9 78, 6 68 C3 57, 4 45, 8 35 C12 25, 20 16, 30 11 C39 6, 45 4, 50 4 Z"
                              fill={
                                currentStyle.sealType === 'sapphire'
                                  ? 'url(#waxSapphireGrad)'
                                  : currentStyle.sealType === 'rose'
                                  ? 'url(#waxRoseGrad)'
                                  : currentStyle.sealType === 'vermilion'
                                  ? 'url(#waxVermilionGrad)'
                                  : currentStyle.sealType === 'emerald'
                                  ? 'url(#waxEmeraldGrad)'
                                  : currentStyle.sealType === 'terracotta'
                                  ? 'url(#waxTerracottaGrad)'
                                  : currentStyle.sealType === 'obsidian'
                                  ? 'url(#waxObsidianGrad)'
                                  : currentStyle.sealType === 'bronze'
                                  ? 'url(#waxBronzeGrad)'
                                  : 'url(#waxCrimsonGrad)'
                              }
                              stroke="rgba(0,0,0,0.35)"
                              strokeWidth="1.5"
                            />

                            {/* Concentric pressed inner rings */}
                            <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
                            <circle
                              cx="50"
                              cy="50"
                              r="31"
                              fill="none"
                              stroke="rgba(0,0,0,0.4)"
                              strokeWidth="1"
                              strokeDasharray="2,2"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="27"
                              fill={
                                currentStyle.sealType === 'sapphire'
                                  ? 'url(#waxSapphireGrad)'
                                  : currentStyle.sealType === 'rose'
                                  ? 'url(#waxRoseGrad)'
                                  : currentStyle.sealType === 'vermilion'
                                  ? 'url(#waxVermilionGrad)'
                                  : currentStyle.sealType === 'emerald'
                                  ? 'url(#waxEmeraldGrad)'
                                  : currentStyle.sealType === 'terracotta'
                                  ? 'url(#waxTerracottaGrad)'
                                  : currentStyle.sealType === 'obsidian'
                                  ? 'url(#waxObsidianGrad)'
                                  : currentStyle.sealType === 'bronze'
                                  ? 'url(#waxBronzeGrad)'
                                  : 'url(#waxCrimsonGrad)'
                              }
                            />
                          </svg>

                          {/* Wax Stamp Seal Inscription: "with love" or Song Hỷ or Monogram */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                            {currentStyle.sealInscription === 'song_hy' ? (
                              <span className="font-serif font-bold text-amber-200 text-xl drop-shadow-md">
                                囍
                              </span>
                            ) : currentStyle.sealInscription === 'moon' ? (
                              <span className="text-amber-200 text-lg drop-shadow-md">🌙</span>
                            ) : currentStyle.sealInscription === 'olive' ? (
                              <span className="text-amber-200 text-base drop-shadow-md">🌿</span>
                            ) : currentStyle.sealInscription === 'monogram' ? (
                              <span className="font-serif font-bold text-amber-200 text-sm tracking-wider drop-shadow-md">
                                {displayMonogram}
                              </span>
                            ) : (
                              <span
                                className={`font-bold text-sm tracking-normal drop-shadow ${
                                  currentStyle.sealType === 'bronze' ? 'text-[#3E2703]' : 'text-amber-200'
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
                          <span className="px-2.5 py-0.5 rounded-full bg-black/85 text-amber-300 text-[10px] font-bold shadow-lg border border-amber-300/40 flex items-center space-x-1 animate-pulse">
                            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                            <span>Nhấn sáp mở thiệp</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 4C. FLAP INNER LINING (Visible ONLY when rotated 180deg open - ZERO MIRRORED TEXT) */}
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
                          background: 'radial-gradient(#D4AF37 1px, transparent 1px)',
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

        {/* Transitioning status message */}
        {isTransitioning && (
          <div className="mt-4 text-center text-white text-xs font-serif font-semibold animate-fadeIn">
            Đang mở bức thiệp chúc phúc và chuyển tới trang hôn lễ...
          </div>
        )}
      </div>
    </div>
  );
};
