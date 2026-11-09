import { useId, useState, type CSSProperties } from 'react';
import { Minus, Play, Plus } from 'lucide-react';
import type { EnvelopeStyle } from '../../shared/types';
import './EnvelopeDesign.css';
import './EnvelopeModal.css';

interface StylePalette {
  name: string;
  detail: string;
  paperGradient: string;
  pocketGradient: string;
  accentGold: string;
  sealInscription: 'with_love' | 'song_hy' | 'monogram' | 'moon' | 'olive';
  looseSealGrad: [string, string, string];
  sceneGradient: string;
  ctaGradient: string;
  ctaText: string;
  letterInk: string;
}

export const envelopePalettes: Record<EnvelopeStyle, StylePalette> = {
  // 1. Korean Pastel Sage & Coral (Chuẩn 100% phong cách 7799 Wedding Storyteller)
  korean_chiffon: {
    name: 'Hàn Quốc Pastel Thơ Mộng',
    detail: 'Giấy mint sage, cành khuynh diệp nhã nhặn, con dấu sáp vàng đồng trên nền voan đào coral',
    paperGradient: 'linear-gradient(135deg, #F0F6F2 0%, #E3EFE7 50%, #D4E4DA 100%)',
    pocketGradient: 'linear-gradient(180deg, #DCE9E0 0%, #D0E0D5 60%, #BFD4C6 100%)',
    accentGold: '#C59A4E',
    sealInscription: 'with_love',
    looseSealGrad: ['#FFE79A', '#D4A33B', '#6E4909'],
    sceneGradient: 'radial-gradient(ellipse at 42% 28%, #FFEFE6 0%, #FFDFCF 45%, #F5BCA8 75%, #DF886E 100%)',
    ctaGradient: 'linear-gradient(135deg, #1E4436, #112820)',
    ctaText: '#FFFDF9',
    letterInk: '#18382D',
  },

  // 2. Hoàng Gia Châu Âu (Royal European Burgundy & Champagne Gold)
  royal_velvet: {
    name: 'Hoàng Gia Quý Tộc',
    detail: 'Giấy kem dệt vân sang trọng, hoa văn Baroque hoàng gia, dấu sáp đỏ rượu bordeaux',
    paperGradient: 'linear-gradient(135deg, #FFFDF8 0%, #F5ECDD 50%, #E8D9C0 100%)',
    pocketGradient: 'linear-gradient(180deg, #EFE3CE 0%, #E2D2B8 60%, #D2BFA1 100%)',
    accentGold: '#DFB76C',
    sealInscription: 'with_love',
    looseSealGrad: ['#E84860', '#A3182E', '#4A0812'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #4C0D1A 0%, #2E050D 55%, #180106 100%)',
    ctaGradient: 'linear-gradient(135deg, #8B1A32, #551020)',
    ctaText: '#FDE68A',
    letterInk: '#5A1222',
  },

  // 3. Đỏ Son Truyền Thống (Song Hỷ Sơn Son Thiếp Vàng)
  traditional_silk: {
    name: 'Đỏ Son Truyền Thống',
    detail: 'Lụa đỏ son cung đình, họa tiết Song Hỷ vân mây cát tường, dấu sáp chu sa son',
    paperGradient: 'linear-gradient(135deg, #B51824 0%, #94101A 50%, #6E0810 100%)',
    pocketGradient: 'linear-gradient(180deg, #8C0E17 0%, #750A12 60%, #54040A 100%)',
    accentGold: '#FADB6B',
    sealInscription: 'song_hy',
    looseSealGrad: ['#FF6B6B', '#D61A1A', '#6B0505'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #6E0A12 0%, #450308 55%, #220104 100%)',
    ctaGradient: 'linear-gradient(135deg, #9E0D19, #5E050C)',
    ctaText: '#FFF0D0',
    letterInk: '#5E050C',
  },

  // 4. Dạ Tiệc Nguyệt Dạ (Celestial Midnight Blue)
  celestial_midnight: {
    name: 'Đêm Nguyệt Thực Vũ Trụ',
    detail: 'Giấy xanh đêm huyền bí, ánh trăng bạc và chòm sao dát vàng, dấu sáp sapphire vũ trụ',
    paperGradient: 'linear-gradient(135deg, #182650 0%, #0E1838 50%, #060B1E 100%)',
    pocketGradient: 'linear-gradient(180deg, #0F1B3E 0%, #091129 60%, #040816 100%)',
    accentGold: '#FDE68A',
    sealInscription: 'moon',
    looseSealGrad: ['#9BB0FF', '#3B52C7', '#111C54'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #162452 0%, #0B122E 55%, #030510 100%)',
    ctaGradient: 'linear-gradient(135deg, #2B3D82, #141E47)',
    ctaText: '#FDE68A',
    letterInk: '#162452',
  },

  // 5. Vườn Mộc Rustic (Rustic Botanical & Kraft Linen)
  rustic_twine: {
    name: 'Vườn Mộc Rustic',
    detail: 'Giấy kraft tự nhiên, cành ô liu vẽ tay mộc mạc, con dấu sáp đồng cổ điển',
    paperGradient: 'linear-gradient(135deg, #EDE5D8 0%, #DDD2C0 50%, #C9BCA6 100%)',
    pocketGradient: 'linear-gradient(180deg, #D9CCA9 0%, #C8B99E 60%, #B4A385 100%)',
    accentGold: '#9E6738',
    sealInscription: 'olive',
    looseSealGrad: ['#F0D8A8', '#B58D46', '#543D15'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #4A5B40 0%, #303D28 55%, #1B221A 100%)',
    ctaGradient: 'linear-gradient(135deg, #4A5B40, #2E3827)',
    ctaText: '#F0EAD4',
    letterInk: '#382C1E',
  },

  // 6. Ấn Bản Tạp Chí Editorial (Haute Couture Editorial Vellum)
  editorial_vellum: {
    name: 'Ấn Bản Tạp Chí Vogue',
    detail: 'Giấy vellum ngà cao cấp, phong cách typography tạp chí tối giản, dấu sáp đen obsidian',
    paperGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F5 50%, #EDEDE6 100%)',
    pocketGradient: 'linear-gradient(180deg, #F3F3ED 0%, #E8E8DF 60%, #D8D8CC 100%)',
    accentGold: '#C5A059',
    sealInscription: 'monogram',
    looseSealGrad: ['#555555', '#222222', '#080808'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #2D2C2A 0%, #1A1917 55%, #0D0C0A 100%)',
    ctaGradient: 'linear-gradient(135deg, #2D2C2A, #141312)',
    ctaText: '#FFFDF9',
    letterInk: '#1C1B1A',
  },

  // 7. Nơ Lụa Hồng Pastel (Dior Romantic Blush Ribbon)
  blush_ribbon: {
    name: 'Nơ Lụa Hồng Nàng Thơ',
    detail: 'Sắc hồng phấn dịu dàng, nơ lụa satin mềm mại, dấu sáp cánh hồng thanh nhã',
    paperGradient: 'linear-gradient(135deg, #FFF7F9 0%, #FDECF0 50%, #F7D8E2 100%)',
    pocketGradient: 'linear-gradient(180deg, #F9E2EA 0%, #F0CFDC 60%, #E2B9C8 100%)',
    accentGold: '#DF7D97',
    sealInscription: 'with_love',
    looseSealGrad: ['#FFD6E2', '#E86F95', '#7A1A3C'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #FDE4EC 0%, #F8B4CA 45%, #E67597 75%, #BD3B67 100%)',
    ctaGradient: 'linear-gradient(135deg, #9C3357, #661834)',
    ctaText: '#FFF0F5',
    letterInk: '#612136',
  },

  // 8. Lục Bảo Art Deco (Gatsby Imperial Emerald & Gold)
  emerald_brass: {
    name: 'Lục Bảo Art Deco',
    detail: 'Màu xanh lục bảo vương giả, đường nét hình học Gatsby mạ vàng, dấu sáp ngọc bích',
    paperGradient: 'linear-gradient(135deg, #1C4535 0%, #133226 50%, #091C15 100%)',
    pocketGradient: 'linear-gradient(180deg, #143528 0%, #0D261C 60%, #061610 100%)',
    accentGold: '#E5C368',
    sealInscription: 'monogram',
    looseSealGrad: ['#5CE09C', '#1B8754', '#063821'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #183C2E 0%, #0D2520 55%, #05100C 100%)',
    ctaGradient: 'linear-gradient(135deg, #1C4535, #0B2118)',
    ctaText: '#F9EFCF',
    letterInk: '#0E291F',
  },

  // 9. Bưu Thiếp Đông Dương (Indochine Heritage Saigon 1930)
  indochine_kraft: {
    name: 'Bưu Thiếp Đông Dương',
    detail: 'Sắc vàng nghệ hoài cổ Sài Gòn xưa, hoa sen dập nổi và dấu bưu điện, dấu sáp đất nung',
    paperGradient: 'linear-gradient(135deg, #F3E4C8 0%, #E5D0AC 50%, #D2B78B 100%)',
    pocketGradient: 'linear-gradient(180deg, #DFCA9E 0%, #CEB482 60%, #BA9C66 100%)',
    accentGold: '#BA5424',
    sealInscription: 'song_hy',
    looseSealGrad: ['#FFA07A', '#C94E1E', '#611B00'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #6B4228 0%, #4A2912 55%, #2A1206 100%)',
    ctaGradient: 'linear-gradient(135deg, #7A3C20, #4A1F0A)',
    ctaText: '#FAF0D8',
    letterInk: '#4D2C1A',
  },

  // 10. Tối Giản Hiện Đại (Modern Minimalist Cotton)
  modern_minimal: {
    name: 'Tối Giản Thuần Khiết',
    detail: 'Giấy cotton trắng ngà Bắc Âu, khoảng trắng tinh tế, dấu sáp vàng mờ sang trọng',
    paperGradient: 'linear-gradient(135deg, #FFFFFF 0%, #FAF9F6 50%, #F0EEE9 100%)',
    pocketGradient: 'linear-gradient(180deg, #F5F4EF 0%, #EBE9E2 60%, #DDD9D0 100%)',
    accentGold: '#998A78',
    sealInscription: 'monogram',
    looseSealGrad: ['#E8D5B5', '#B89B6C', '#5C4624'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #2C3931 0%, #1A221D 55%, #0A0E0C 100%)',
    ctaGradient: 'linear-gradient(135deg, #2C3931, #131A16)',
    ctaText: '#F5F5F0',
    letterInk: '#242A27',
  },
};

export const envelopeDesigns: { id: EnvelopeStyle; name: string; detail: string }[] = Object.entries(
  envelopePalettes
).map(([id, p]) => ({
  id: id as EnvelopeStyle,
  name: p.name,
  detail: p.detail,
}));

export function EnvelopeArtwork({ style }: { style: EnvelopeStyle }) {
  const gradient = useId();
  const pattern = useId();

  const motifs = {
    // 1. Korean Chiffon (Botanical Sprig fine line art inspired by 7799 Storyteller)
    korean_chiffon: (
      <>
        {/* Soft botanical eucalyptus/olive branch framing the crest */}
        <g opacity="0.48" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Main stem */}
          <path d="M180 80 Q230 45 300 45 Q370 45 420 80" fill="none" />
          {/* Left leaves */}
          <path d="M210 65 Q200 45 220 40 Q230 55 210 65 Z" fill="currentColor" opacity="0.3" />
          <path d="M250 52 Q245 32 265 30 Q270 45 250 52 Z" fill="currentColor" opacity="0.35" />
          <path d="M285 46 Q285 24 300 24 Q305 40 285 46 Z" fill="currentColor" opacity="0.4" />
          {/* Right leaves */}
          <path d="M315 46 Q315 24 300 24 Q295 40 315 46 Z" fill="currentColor" opacity="0.4" />
          <path d="M350 52 Q355 32 335 30 Q330 45 350 52 Z" fill="currentColor" opacity="0.35" />
          <path d="M390 65 Q400 45 380 40 Q370 55 390 65 Z" fill="currentColor" opacity="0.3" />
        </g>
        {/* Fine border hairline */}
        <rect x="20" y="20" width="560" height="320" rx="3" fill="none" opacity="0.28" strokeWidth="0.8" />
        <rect x="24" y="24" width="552" height="312" rx="2" fill="none" opacity="0.14" strokeWidth="0.5" strokeDasharray="4 3" />
      </>
    ),

    // 2. Royal European (Baroque gold filigree & ornamental corners)
    royal_velvet: (
      <>
        {/* Crown & Filigree flourish over crest */}
        <g opacity="0.55" strokeWidth="1" strokeLinecap="round">
          <path d="M260 48 Q300 32 340 48" fill="none" />
          <path d="M280 44 Q300 22 320 44" fill="none" />
          {/* Small crown motif */}
          <path d="M292 36 L296 28 L300 33 L304 28 L308 36 Z" fill="currentColor" opacity="0.75" />
          <circle cx="296" cy="27" r="1.5" fill="currentColor" />
          <circle cx="300" cy="31" r="1.5" fill="currentColor" />
          <circle cx="304" cy="27" r="1.5" fill="currentColor" />
        </g>
        {/* Ornate corner brackets */}
        <g opacity="0.4" strokeWidth="1.2" fill="none">
          <path d="M32 52 L32 32 L52 32 M38 42 L38 38 L42 38" />
          <path d="M568 52 L568 32 L548 32 M562 42 L562 38 L558 38" />
          <path d="M32 308 L32 328 L52 328 M38 318 L38 322 L42 322" />
          <path d="M568 308 L568 328 L548 328 M562 318 L562 322 L558 322" />
        </g>
        <rect x="36" y="36" width="528" height="288" fill="none" opacity="0.22" strokeWidth="0.75" />
      </>
    ),

    // 3. Traditional Silk (Song Hỷ & Auspicious Wave Borders)
    traditional_silk: (
      <>
        <defs>
          <pattern id={pattern} width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 20 Q10 0 20 20 Q30 0 40 20" fill="none" stroke="currentColor" opacity="0.45" strokeWidth="0.8" />
          </pattern>
        </defs>
        {/* Top and bottom auspicious wave ribbons */}
        <rect x="0" y="0" width="600" height="24" fill={`url(#${pattern})`} />
        <rect x="0" y="336" width="600" height="24" fill={`url(#${pattern})`} />
        <line x1="0" y1="26" x2="600" y2="26" opacity="0.5" strokeWidth="0.8" />
        <line x1="0" y1="334" x2="600" y2="334" opacity="0.5" strokeWidth="0.8" />
        {/* Medallion circle behind crest */}
        <circle cx="300" cy="74" r="38" fill="none" opacity="0.35" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="300" cy="74" r="42" fill="none" opacity="0.25" strokeWidth="0.75" />
      </>
    ),

    // 4. Celestial Midnight (Moon phases & Constellations)
    celestial_midnight: (
      <>
        {/* Constellation lines */}
        <g opacity="0.45" strokeWidth="0.75" strokeLinecap="round">
          <path d="M80 60 L120 40 L160 55 L200 45" fill="none" />
          <circle cx="80" cy="60" r="2" fill="currentColor" />
          <circle cx="120" cy="40" r="2" fill="currentColor" />
          <circle cx="160" cy="55" r="2.5" fill="currentColor" />
          <circle cx="200" cy="45" r="2" fill="currentColor" />
          {/* Starbursts */}
          <path d="M500 50 L500 70 M490 60 L510 60" />
          <path d="M530 80 L530 94 M523 87 L537 87" opacity="0.7" />
          <circle cx="500" cy="60" r="2" fill="currentColor" />
        </g>
        {/* Crescent moon over crest */}
        <path
          d="M285 36 A 14 14 0 1 0 315 36 A 10 10 0 1 1 285 36"
          fill="currentColor"
          opacity="0.65"
          stroke="none"
        />
        <rect x="25" y="25" width="550" height="310" rx="3" fill="none" opacity="0.3" strokeWidth="0.75" />
      </>
    ),

    // 5. Rustic Twine (Hand-drawn olive branches)
    rustic_twine: (
      <>
        <g opacity="0.45" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          {/* Top-right sprig */}
          <path d="M440 30 Q490 25 540 60" fill="none" />
          <ellipse cx="470" cy="26" rx="9" ry="4" transform="rotate(-15 470 26)" fill="currentColor" opacity="0.3" />
          <ellipse cx="505" cy="35" rx="9" ry="4" transform="rotate(18 505 35)" fill="currentColor" opacity="0.3" />
          <ellipse cx="530" cy="52" rx="8" ry="3.5" transform="rotate(35 530 52)" fill="currentColor" opacity="0.3" />
          {/* Bottom-left sprig */}
          <path d="M160 330 Q110 335 60 300" fill="none" />
          <ellipse cx="130" cy="334" rx="9" ry="4" transform="rotate(-15 130 334)" fill="currentColor" opacity="0.3" />
          <ellipse cx="95" cy="325" rx="9" ry="4" transform="rotate(18 95 325)" fill="currentColor" opacity="0.3" />
        </g>
        {/* Subtle kraft border */}
        <rect x="24" y="24" width="552" height="312" fill="none" opacity="0.25" strokeWidth="1" />
      </>
    ),

    // 6. Editorial Vellum (Haute couture typography & minimalist crop lines)
    editorial_vellum: (
      <>
        <g opacity="0.4" strokeWidth="0.8">
          {/* Crop marks in corners */}
          <path d="M15 28 L35 28 M28 15 L28 35" fill="none" />
          <path d="M585 28 L565 28 M572 15 L572 35" fill="none" />
          <path d="M15 332 L35 332 M28 345 L28 325" fill="none" />
          <path d="M585 332 L565 332 M572 345 L572 325" fill="none" />
        </g>
        <line x1="50" y1="50" x2="550" y2="50" opacity="0.2" strokeWidth="0.6" />
        <line x1="50" y1="310" x2="550" y2="310" opacity="0.2" strokeWidth="0.6" />
      </>
    ),

    // 7. Blush Ribbon (Delicate satin band & French bow cartouche)
    blush_ribbon: (
      <>
        <defs>
          <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="0.5" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {/* Horizontal ribbon bar */}
        <rect x="0" y="65" width="600" height="20" fill={`url(#${gradient})`} />
        <line x1="0" y1="65" x2="600" y2="65" opacity="0.3" strokeWidth="0.6" />
        <line x1="0" y1="85" x2="600" y2="85" opacity="0.3" strokeWidth="0.6" />
        {/* Oval cartouche around monogram */}
        <ellipse cx="300" cy="75" rx="55" ry="34" fill="none" opacity="0.45" strokeWidth="1" />
        <ellipse cx="300" cy="75" rx="51" ry="30" fill="none" opacity="0.2" strokeWidth="0.6" strokeDasharray="3 2" />
      </>
    ),

    // 8. Emerald Brass (Art Deco stepped geometric corners)
    emerald_brass: (
      <>
        <g opacity="0.5" strokeWidth="1" fill="none">
          {/* Top-left stepped deco */}
          <path d="M22 60 L22 30 L30 30 L30 22 L60 22" />
          <path d="M30 45 L30 38 L38 38 L38 30 L45 30" opacity="0.6" />
          {/* Top-right stepped deco */}
          <path d="M578 60 L578 30 L570 30 L570 22 L540 22" />
          {/* Bottom-left stepped deco */}
          <path d="M22 300 L22 330 L30 330 L30 338 L60 338" />
          {/* Bottom-right stepped deco */}
          <path d="M578 300 L578 330 L570 330 L570 338 L540 338" />
        </g>
        <rect x="36" y="36" width="528" height="288" fill="none" opacity="0.25" strokeWidth="0.8" />
      </>
    ),

    // 9. Indochine Kraft (Vintage postmark stamp & airmail border)
    indochine_kraft: (
      <>
        {/* Airmail dashed border */}
        <rect x="18" y="18" width="564" height="324" fill="none" opacity="0.45" strokeWidth="1.5" strokeDasharray="14 10" />
        {/* Postage stamp in top-right */}
        <g opacity="0.55" strokeWidth="1">
          <rect x="480" y="32" width="76" height="88" fill="none" strokeDasharray="3 2" />
          {/* Lotus flower inside stamp */}
          <path d="M518 88 Q508 72 518 56 Q528 72 518 88 Z" fill="currentColor" opacity="0.3" />
          <path d="M518 78 Q496 70 504 60 Q514 66 518 78 Z" fill="currentColor" opacity="0.25" />
          <path d="M518 78 Q540 70 532 60 Q522 66 518 78 Z" fill="currentColor" opacity="0.25" />
          {/* Circular postmark cancellation */}
          <circle cx="468" cy="80" r="28" fill="none" opacity="0.5" strokeWidth="1.2" />
          <line x1="432" y1="72" x2="400" y2="72" opacity="0.5" strokeWidth="1" />
          <line x1="432" y1="80" x2="395" y2="80" opacity="0.5" strokeWidth="1" />
          <line x1="432" y1="88" x2="400" y2="88" opacity="0.5" strokeWidth="1" />
        </g>
      </>
    ),

    // 10. Modern Minimal (Pure architectural harmony)
    modern_minimal: (
      <>
        <rect x="30" y="30" width="540" height="300" fill="none" opacity="0.35" strokeWidth="0.75" />
        <line x1="45" y1="45" x2="45" y2="55" opacity="0.6" strokeWidth="1.2" />
        <line x1="45" y1="45" x2="55" y2="45" opacity="0.6" strokeWidth="1.2" />
        <line x1="555" y1="315" x2="555" y2="305" opacity="0.6" strokeWidth="1.2" />
        <line x1="555" y1="315" x2="545" y2="315" opacity="0.6" strokeWidth="1.2" />
      </>
    ),
  };

  return (
    <svg
      className="envelope-design__art"
      viewBox="0 0 600 360"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {motifs[style] || motifs.royal_velvet}
    </svg>
  );
}

interface EnvelopeDesignProps {
  style: EnvelopeStyle;
  monogram: string;
  guest: string;
  couple: string;
  date?: string;
}

export function EnvelopeDesign({ style, monogram, guest, couple, date }: EnvelopeDesignProps) {
  const isTraditional = style === 'traditional_silk';

  return (
    <span className="envelope-design" data-design={style}>
      <EnvelopeArtwork style={style} />

      {/* 1. TOP CREST ZONE: SAVE THE DATE & MONOGRAM */}
      <span className="envelope-design__crest-zone" aria-hidden="true">
        {date && (
          <span className="envelope-design__date-badge">
            SAVE THE DATE · {date}
          </span>
        )}
        <span className="envelope-design__monogram">
          {isTraditional ? '囍' : monogram}
        </span>
      </span>

      {/* 2. FORMAL INVITATION HEADLINE (SPACED CAPITALS) */}
      <span className="envelope-design__title-zone" aria-hidden="true">
        <span className="envelope-design__title-text">
          {isTraditional ? 'THIỆP MỜI THÀNH HÔN' : 'WEDDING INVITATION'}
        </span>
      </span>

      {/* 3. GUEST ZONE: SALUTATION & GUEST NAME WITH AUTHENTIC DOTTED LEADER (7799 SIGNATURE) */}
      <span className="envelope-design__guest-zone">
        <span className="envelope-design__salutation">Trân trọng kính mời:</span>
        <strong className="envelope-design__guest-name">{guest}</strong>
        <span className="envelope-design__dotted-line" aria-hidden="true" />
      </span>

      {/* 4. FOOTER: COUPLE SIGNATURE */}
      <span className="envelope-design__footer-zone" aria-hidden="true">
        <span className="envelope-design__couple-names">{couple}</span>
      </span>
    </span>
  );
}

export function envelopePaperStyle(style: EnvelopeStyle): CSSProperties {
  const palette = envelopePalettes[style] || envelopePalettes.royal_velvet;
  return {
    '--paper': palette.paperGradient,
    '--pocket': palette.pocketGradient,
    '--foil': palette.accentGold,
    '--letter-ink': palette.letterInk,
    '--scene-bg': palette.sceneGradient,
    '--cta-bg': palette.ctaGradient,
    '--cta-fg': palette.ctaText,
  } as CSSProperties;
}

export function EnvelopeBack({
  style,
  monogram,
  onOpen,
  sealed = true,
}: {
  style: EnvelopeStyle;
  monogram: string;
  onOpen?: () => void;
  sealed?: boolean;
}) {
  const palette = envelopePalettes[style] || envelopePalettes.royal_velvet;
  const sealGradientId = useId();
  const sealShineId = useId();
  const Seal = onOpen ? 'button' : 'span';
  const sealMarks = {
    with_love: 'with love',
    song_hy: '囍',
    monogram,
    moon: '☾',
    olive: '❧',
  };

  return (
    <>
      {/* 3D Envelope folds (left, right, bottom pocket) */}
      <div className="wedding-envelope__folds" aria-hidden="true">
        <div className="wedding-envelope__fold wedding-envelope__fold--left" />
        <div className="wedding-envelope__fold wedding-envelope__fold--right" />
        <div className="wedding-envelope__fold wedding-envelope__fold--bottom" />
      </div>

      {/* Triangular Flap */}
      <div className="wedding-envelope__flap" aria-hidden="true">
        <div className="wedding-envelope__flap-paper">
          <div className="wedding-envelope__flap-print">
            <EnvelopeArtwork style={style} />
          </div>
        </div>
        <div className="wedding-envelope__flap-lining" />
      </div>

      {/* Photorealistic Wax Seal positioned right on the flap apex */}
      <Seal
        type={onOpen ? 'button' : undefined}
        className="wedding-envelope__seal"
        aria-label={onOpen ? 'Mở thiệp bằng con dấu sáp' : undefined}
        disabled={onOpen ? !sealed : undefined}
        onClick={onOpen}
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            {/* Rich sealing wax gradient */}
            <radialGradient id={sealGradientId} cx="34%" cy="25%" r="78%">
              <stop offset="0%" stopColor={palette.looseSealGrad[0]} />
              <stop offset="42%" stopColor={palette.looseSealGrad[1]} />
              <stop offset="85%" stopColor={palette.looseSealGrad[2]} />
              <stop offset="100%" stopColor={palette.looseSealGrad[2]} stopOpacity="0.8" />
            </radialGradient>
            {/* Top specular shine for 3D realism */}
            <radialGradient id={sealShineId} cx="32%" cy="22%" r="48%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
          </defs>

          {/* Liquid organic wax edge contour */}
          <path
            fill={`url(#${sealGradientId})`}
            d="M50 4C64 1 72 8 83 14C96 21 94 33 98 45C104 58 93 70 89 82C85 94 74 93 61 98C48 103 38 96 26 94C13 91 13 78 7 67C1 55 8 44 9 33C11 20 25 19 35 11C41 6 47 7 50 4Z"
          />

          {/* Realistic specular highlight on the upper curve */}
          <path
            fill={`url(#${sealShineId})`}
            d="M50 4C64 1 72 8 83 14C96 21 94 33 98 45C104 58 93 70 89 82C85 94 74 93 61 98C48 103 38 96 26 94C13 91 13 78 7 67C1 55 8 44 9 33C11 20 25 19 35 11C41 6 47 7 50 4Z"
            opacity="0.75"
          />

          {/* Embossed inner coin depression */}
          <circle
            cx="50"
            cy="50"
            r="31"
            fill="rgba(0, 0, 0, 0.16)"
            stroke="rgba(255, 240, 190, 0.55)"
            strokeWidth="1.2"
          />
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke="rgba(0, 0, 0, 0.3)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Embossed text inscription inside the wax coin */}
        <span
          className={`wedding-envelope__seal-text ${
            palette.sealInscription === 'with_love' ? 'is-script' : ''
          }`}
          aria-hidden="true"
        >
          {sealMarks[palette.sealInscription]}
        </span>
      </Seal>
    </>
  );
}

export function EnvelopeDesignPicker({
  value,
  onChange,
  sample,
  onOpenPreview,
}: {
  value?: EnvelopeStyle;
  onChange: (style: EnvelopeStyle) => void;
  sample?: Omit<EnvelopeDesignProps, 'style'>;
  onOpenPreview?: () => void;
}) {
  const selected = envelopeDesigns.find(({ id }) => id === value) ?? envelopeDesigns[0];
  const sampleContent = sample ?? {
    monogram: 'T & P',
    guest: 'Bạn và Người Thương',
    couple: 'Tuấn Anh & Mai Phương',
  };
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [zoom, setZoom] = useState(100);

  return (
    <section className="envelope-collection" aria-label="Bàn thiết kế phong bì">
      <aside className="envelope-collection__library">
        <div className="envelope-collection__library-heading">
          <h3>Bộ sưu tập</h3>
          <span>{envelopeDesigns.length} phong cách độc bản</span>
        </div>
        <div className="envelope-picker" role="group" aria-label="Chọn mẫu phong bì">
          {envelopeDesigns.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              aria-pressed={selected.id === id}
              onClick={() => onChange(id)}
            >
              <span className="envelope-picker__sample" aria-hidden="true">
                <EnvelopeDesign
                  style={id}
                  monogram="T & P"
                  guest="Bạn và Người Thương"
                  couple="Tuấn Anh & Mai Phương"
                />
              </span>
              <strong>{name}</strong>
            </button>
          ))}
        </div>
      </aside>

      <div className="envelope-collection__workspace">
        <div className="envelope-collection__toolbar">
          <div className="envelope-collection__sides" role="group" aria-label="Mặt phong bì">
            <button
              type="button"
              aria-pressed={side === 'front'}
              onClick={() => setSide('front')}
            >
              Mặt trước
            </button>
            <button
              type="button"
              aria-pressed={side === 'back'}
              onClick={() => setSide('back')}
            >
              Mặt sau & Dấu sáp
            </button>
          </div>
          <div className="envelope-collection__zoom" role="group" aria-label="Thu phóng bản xem">
            <button
              type="button"
              aria-label="Thu nhỏ"
              disabled={zoom === 75}
              onClick={() => setZoom(zoom - 25)}
            >
              <Minus size={16} />
            </button>
            <button type="button" aria-label="Đặt lại tỷ lệ" onClick={() => setZoom(100)}>
              {zoom}%
            </button>
            <button
              type="button"
              aria-label="Phóng to"
              disabled={zoom === 150}
              onClick={() => setZoom(zoom + 25)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div
          className="envelope-collection__mat"
          style={{ '--zoom': zoom / 100 } as CSSProperties}
        >
          <div
            className="envelope-collection__paper"
            data-design={selected.id}
            style={envelopePaperStyle(selected.id)}
          >
            {side === 'front' ? (
              <>
                <div className="envelope-collection__insert" aria-hidden="true">
                  <EnvelopeArtwork style={selected.id} />
                  <span>{sampleContent.monogram}</span>
                </div>
                <div className="envelope-collection__envelope">
                  <EnvelopeDesign style={selected.id} {...sampleContent} />
                </div>
              </>
            ) : (
              <div className="wedding-envelope__face">
                <EnvelopeBack style={selected.id} monogram={sampleContent.monogram} />
              </div>
            )}
          </div>
        </div>

        <div className="envelope-collection__footer">
          <div aria-live="polite">
            <h4>{selected.name}</h4>
            <p>{selected.detail}</p>
          </div>
          {onOpenPreview && (
            <button type="button" onClick={onOpenPreview}>
              <Play size={15} aria-hidden="true" /> Mở thử thiệp
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
