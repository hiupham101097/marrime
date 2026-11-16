import { useId, type CSSProperties } from 'react';
import { Check, Play } from 'lucide-react';
import type { EnvelopeStyle } from '../../shared/types';
import './EnvelopeDesign.css';
import './EnvelopeModal.css';

export interface StylePalette {
  name: string;
  tag: string;
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
  linerBg: string;
}

export const envelopePalettes: Record<EnvelopeStyle, StylePalette> = {
  // 1. Korean Pastel Mint & Coral (Chuẩn 100% phong cách 7799 Wedding Storyteller)
  korean_chiffon: {
    name: 'Hàn Quốc Pastel 7799 Storyteller',
    tag: 'Mint Sage & Voan San Hô',
    detail: 'Giấy mỹ thuật mint sage, cành khuynh diệp nhã nhặn, con dấu sáp vàng đồng hoàng gia',
    paperGradient: 'linear-gradient(135deg, #EEF5F1 0%, #DFECE4 50%, #CFE2D6 100%)',
    pocketGradient: 'linear-gradient(180deg, #D6E6DC 0%, #C8DDD0 60%, #B7D1C0 100%)',
    accentGold: '#C59A4E',
    sealInscription: 'olive',
    looseSealGrad: ['#FFE9A6', '#D4A33B', '#6E4909'],
    sceneGradient: 'radial-gradient(ellipse at 42% 28%, #FFEFE6 0%, #FFDFCF 45%, #F5BCA8 75%, #DF886E 100%)',
    ctaGradient: 'linear-gradient(135deg, #1C4234, #0F2A20)',
    ctaText: '#FFFDF9',
    letterInk: '#18382D',
    linerBg: '#EAF3ED',
  },

  // 2. Hoàng Gia Châu Âu (Royal European Burgundy Velvet & Baroque Gold)
  royal_velvet: {
    name: 'Hoàng Gia Quý Tộc Châu Âu',
    tag: 'Nhung Đỏ Burgundy & Ép Kim Vàng',
    detail: 'Nhung đỏ rượu Bordeaux vương giả, hoa văn Baroque hoàng gia dập nổi ánh kim',
    paperGradient: 'linear-gradient(135deg, #5C0E1F 0%, #3D0814 50%, #24040B 100%)',
    pocketGradient: 'linear-gradient(180deg, #4A0B19 0%, #350611 60%, #1E0308 100%)',
    accentGold: '#E5C368',
    sealInscription: 'monogram',
    looseSealGrad: ['#F5D075', '#B8860B', '#5A3D00'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #4C0D1A 0%, #2E050D 55%, #180106 100%)',
    ctaGradient: 'linear-gradient(135deg, #8B1A32, #551020)',
    ctaText: '#FDE68A',
    letterInk: '#4A0A16',
    linerBg: '#32060F',
  },

  // 3. Đỏ Son Truyền Thống (Song Hỷ Sơn Son Thiếp Vàng Cung Đình)
  traditional_silk: {
    name: 'Đỏ Son Cung Đình Truyền Thống',
    tag: 'Gấm Chu Sa & Song Hỷ Dát Vàng',
    detail: 'Lụa đỏ son cung đình Huế, đại huy hiệu Song Hỷ mạ vàng, vân mây cát tường ngũ sắc',
    paperGradient: 'linear-gradient(135deg, #B51824 0%, #94101A 50%, #6E0810 100%)',
    pocketGradient: 'linear-gradient(180deg, #8C0E17 0%, #750A12 60%, #54040A 100%)',
    accentGold: '#FADB6B',
    sealInscription: 'song_hy',
    looseSealGrad: ['#FF7878', '#D61A1A', '#6B0505'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #6E0A12 0%, #450308 55%, #220104 100%)',
    ctaGradient: 'linear-gradient(135deg, #9E0D19, #5E050C)',
    ctaText: '#FFF0D0',
    letterInk: '#5E050C',
    linerBg: '#59060C',
  },

  // 4. Dạ Tiệc Nguyệt Dạ (Celestial Midnight Blue & Starlight Gold)
  celestial_midnight: {
    name: 'Đêm Nguyệt Thực Vũ Trụ',
    tag: 'Xanh Đêm & Ngân Hà Tinh Tú',
    detail: 'Giấy xanh đêm huyền bí ánh sao, chu kỳ trăng khuyết và hải đồ tinh tú dát vàng dát bạc',
    paperGradient: 'linear-gradient(135deg, #182650 0%, #0E1838 50%, #060B1E 100%)',
    pocketGradient: 'linear-gradient(180deg, #0F1B3E 0%, #091129 60%, #040816 100%)',
    accentGold: '#FDE68A',
    sealInscription: 'moon',
    looseSealGrad: ['#9BB0FF', '#3B52C7', '#111C54'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #162452 0%, #0B122E 55%, #030510 100%)',
    ctaGradient: 'linear-gradient(135deg, #2B3D82, #141E47)',
    ctaText: '#FDE68A',
    letterInk: '#162452',
    linerBg: '#091026',
  },

  // 5. Vườn Mộc Rustic (Rustic Botanical & Kraft Linen)
  rustic_twine: {
    name: 'Vườn Mộc Sân Vườn Rustic',
    tag: 'Kraft Tái Sinh & Lá Olive Mộc',
    detail: 'Bao thiệp kraft vẽ tay cành ô liu mộc mạc, thẻ hành lý vintage và dây gai tự nhiên',
    paperGradient: 'linear-gradient(135deg, #EDE5D8 0%, #DDD2C0 50%, #C9BCA6 100%)',
    pocketGradient: 'linear-gradient(180deg, #D9CCA9 0%, #C8B99E 60%, #B4A385 100%)',
    accentGold: '#9E6738',
    sealInscription: 'olive',
    looseSealGrad: ['#F0D8A8', '#B58D46', '#543D15'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #4A5B40 0%, #303D28 55%, #1B221A 100%)',
    ctaGradient: 'linear-gradient(135deg, #4A5B40, #2E3827)',
    ctaText: '#F0EAD4',
    letterInk: '#382C1E',
    linerBg: '#D6C8B4',
  },

  // 6. Ấn Bản Tạp Chí Editorial (Haute Couture Editorial Vellum)
  editorial_vellum: {
    name: 'Ấn Bản Tạp Chí Vogue Editorial',
    tag: 'Haute Couture & Dấu Sáp Đen',
    detail: 'Bố cục bìa tạp chí thời trang Vogue, typography Bodoni tinh xảo, dấu sáp đen Obsidian',
    paperGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F5 50%, #EDEDE6 100%)',
    pocketGradient: 'linear-gradient(180deg, #F3F3ED 0%, #E8E8DF 60%, #D8D8CC 100%)',
    accentGold: '#C5A059',
    sealInscription: 'monogram',
    looseSealGrad: ['#555555', '#222222', '#080808'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #2D2C2A 0%, #1A1917 55%, #0D0C0A 100%)',
    ctaGradient: 'linear-gradient(135deg, #2D2C2A, #141312)',
    ctaText: '#FFFDF9',
    letterInk: '#1C1B1A',
    linerBg: '#ECECE5',
  },

  // 7. Nơ Lụa Hồng Pastel (Dior Romantic Blush Ribbon)
  blush_ribbon: {
    name: 'Nơ Lụa Hồng Nàng Thơ Dior',
    tag: 'Ruy Băng Lụa & Mề Đay Ngọc Trai',
    detail: 'Dải lụa satin ngang thân thiệp, mề đay Cameo chạm ngọc trai, dấu sáp cánh hoa hồng',
    paperGradient: 'linear-gradient(135deg, #FFF7F9 0%, #FDECF0 50%, #F7D8E2 100%)',
    pocketGradient: 'linear-gradient(180deg, #F9E2EA 0%, #F0CFDC 60%, #E2B9C8 100%)',
    accentGold: '#DF7D97',
    sealInscription: 'with_love',
    looseSealGrad: ['#FFD6E2', '#E86F95', '#7A1A3C'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #FDE4EC 0%, #F8B4CA 45%, #E67597 75%, #BD3B67 100%)',
    ctaGradient: 'linear-gradient(135deg, #9C3357, #661834)',
    ctaText: '#FFF0F5',
    letterInk: '#612136',
    linerBg: '#FCE7EE',
  },

  // 8. Lục Bảo Art Deco (Gatsby Imperial Emerald & Gold)
  emerald_brass: {
    name: 'Lục Bảo Art Deco Gatsby',
    tag: 'Emerald Hoàng Gia & Khung Mạ Vàng',
    detail: 'Màu xanh lục bảo vương giả, khung kim loại hình học Great Gatsby 1920s mạ vàng sắc sảo',
    paperGradient: 'linear-gradient(135deg, #1C4535 0%, #133226 50%, #091C15 100%)',
    pocketGradient: 'linear-gradient(180deg, #143528 0%, #0D261C 60%, #061610 100%)',
    accentGold: '#E5C368',
    sealInscription: 'monogram',
    looseSealGrad: ['#5CE09C', '#1B8754', '#063821'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #183C2E 0%, #0D2520 55%, #05100C 100%)',
    ctaGradient: 'linear-gradient(135deg, #1C4535, #0B2118)',
    ctaText: '#F9EFCF',
    letterInk: '#0E291F',
    linerBg: '#0D271D',
  },

  // 9. Bưu Thiếp Đông Dương (Indochine Heritage Saigon 1930)
  indochine_kraft: {
    name: 'Bưu Thiếp Bưu Điện Đông Dương 1930',
    tag: 'Hoài Cổ Sài Gòn & Tem Sen Cổ',
    detail: 'Bưu thiếp hoài cổ Sài Gòn xưa, tem sen hoa cổ, dấu nhật ấn bưu điện và viền bưu vụ song sắc',
    paperGradient: 'linear-gradient(135deg, #F3E4C8 0%, #E5D0AC 50%, #D2B78B 100%)',
    pocketGradient: 'linear-gradient(180deg, #DFCA9E 0%, #CEB482 60%, #BA9C66 100%)',
    accentGold: '#BA5424',
    sealInscription: 'song_hy',
    looseSealGrad: ['#FFA07A', '#C94E1E', '#611B00'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #6B4228 0%, #4A2912 55%, #2A1206 100%)',
    ctaGradient: 'linear-gradient(135deg, #7A3C20, #4A1F0A)',
    ctaText: '#FAF0D8',
    letterInk: '#4D2C1A',
    linerBg: '#DCC39A',
  },

  // 10. Tối Giản Hiện Đại (Modern Minimalist Cotton)
  modern_minimal: {
    name: 'Tối Giản Thuần Khiết Bắc Âu',
    tag: 'Alabaster & Kiến Trúc Tối Giản',
    detail: 'Bố cục kiến trúc bất đối xứng Bắc Âu, khoảng trắng tinh khôi, typographic hiện đại chuẩn mực',
    paperGradient: 'linear-gradient(135deg, #FFFFFF 0%, #FAF9F6 50%, #F0EEE9 100%)',
    pocketGradient: 'linear-gradient(180deg, #F5F4EF 0%, #EBE9E2 60%, #DDD9D0 100%)',
    accentGold: '#998A78',
    sealInscription: 'monogram',
    looseSealGrad: ['#E8D5B5', '#B89B6C', '#5C4624'],
    sceneGradient: 'radial-gradient(ellipse at 40% 25%, #2C3931 0%, #1A221D 55%, #0A0E0C 100%)',
    ctaGradient: 'linear-gradient(135deg, #2C3931, #131A16)',
    ctaText: '#F5F5F0',
    letterInk: '#242A27',
    linerBg: '#E8E5DF',
  },
};

export const envelopeDesigns: { id: EnvelopeStyle; name: string; tag: string; detail: string }[] =
  Object.entries(envelopePalettes).map(([id, p]) => ({
    id: id as EnvelopeStyle,
    name: p.name,
    tag: p.tag,
    detail: p.detail,
  }));

/**
 * Bespoke Artistic Interior Lining Pattern per Envelope Style
 */
export function EnvelopeLiner({ style }: { style: EnvelopeStyle }) {
  const palette = envelopePalettes[style] || envelopePalettes.royal_velvet;

  if (style === 'royal_velvet') {
    return (
      <div className="envelope-liner envelope-liner--royal" style={{ backgroundColor: palette.linerBg }}>
        <svg viewBox="0 0 100 100" className="envelope-liner__svg" fill="none" stroke="#E5C368" opacity="0.25">
          <pattern id="liner-royal-damask" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M12.5 2 C8 6 4 10 4 15 C4 20 8 22 12.5 22 C17 22 21 20 21 15 C21 10 17 6 12.5 2 Z" strokeWidth="0.8" />
            <path d="M12.5 6 C10 9 7 12 7 15 C7 18 10 19 12.5 19 C15 19 18 18 18 15 C18 12 15 9 12.5 6 Z" strokeWidth="0.5" />
            <circle cx="12.5" cy="12.5" r="1.5" fill="#E5C368" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#liner-royal-damask)" />
        </svg>
      </div>
    );
  }

  if (style === 'korean_chiffon') {
    return (
      <div className="envelope-liner envelope-liner--korean" style={{ backgroundColor: palette.linerBg }}>
        <svg viewBox="0 0 100 100" className="envelope-liner__svg" fill="none" stroke="#2D5A47" opacity="0.2">
          <pattern id="liner-korean-leaves" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M5 25 Q15 15 25 5" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M12 18 Q8 12 12 8 Q16 12 12 18 Z" fill="#2D5A47" opacity="0.3" />
            <path d="M18 12 Q22 6 26 10 Q22 16 18 12 Z" fill="#2D5A47" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#liner-korean-leaves)" />
        </svg>
      </div>
    );
  }

  if (style === 'traditional_silk') {
    return (
      <div className="envelope-liner envelope-liner--trad" style={{ backgroundColor: palette.linerBg }}>
        <svg viewBox="0 0 100 100" className="envelope-liner__svg" fill="none" stroke="#FADB6B" opacity="0.25">
          <pattern id="liner-trad-cloud" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M6 18 A 6 6 0 0 1 18 18 A 6 6 0 0 1 24 18 A 3 3 0 0 1 21 24 L 9 24 A 3 3 0 0 1 6 18 Z" strokeWidth="0.8" />
            <circle cx="15" cy="15" r="1" fill="#FADB6B" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#liner-trad-cloud)" />
        </svg>
      </div>
    );
  }

  if (style === 'celestial_midnight') {
    return (
      <div className="envelope-liner envelope-liner--celestial" style={{ backgroundColor: palette.linerBg }}>
        <svg viewBox="0 0 100 100" className="envelope-liner__svg" fill="none" stroke="#FDE68A" opacity="0.25">
          <pattern id="liner-celestial-stars" width="35" height="35" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1.2" fill="#FDE68A" />
            <circle cx="28" cy="22" r="1.5" fill="#FFF" />
            <circle cx="18" cy="30" r="0.8" fill="#FDE68A" />
            <line x1="8" y1="8" x2="28" y2="22" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#liner-celestial-stars)" />
        </svg>
      </div>
    );
  }

  if (style === 'emerald_brass') {
    return (
      <div className="envelope-liner envelope-liner--emerald" style={{ backgroundColor: palette.linerBg }}>
        <svg viewBox="0 0 100 100" className="envelope-liner__svg" fill="none" stroke="#E5C368" opacity="0.25">
          <pattern id="liner-deco-fan" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 24 A 12 12 0 0 1 24 24" strokeWidth="0.7" />
            <path d="M3 24 A 9 9 0 0 1 21 24" strokeWidth="0.5" />
            <path d="M6 24 A 6 6 0 0 1 18 24" strokeWidth="0.5" />
            <line x1="12" y1="24" x2="12" y2="12" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#liner-deco-fan)" />
        </svg>
      </div>
    );
  }

  // Default subtle fine-linen liner pattern
  return (
    <div className="envelope-liner envelope-liner--classic" style={{ backgroundColor: palette.linerBg }}>
      <svg viewBox="0 0 100 100" className="envelope-liner__svg" fill="none" stroke="currentColor" opacity="0.12">
        <pattern id="liner-classic-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="0.8" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#liner-classic-grid)" />
      </svg>
    </div>
  );
}

export function EnvelopeArtwork({ style }: { style: EnvelopeStyle }) {
  if (style === 'traditional_silk') {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.12">
        <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
        <text x="50" y="65" textAnchor="middle" fontSize="48" fill="currentColor" stroke="none">囍</text>
      </svg>
    );
  }
  if (style === 'celestial_midnight') {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.12">
        <circle cx="50" cy="50" r="35" strokeDasharray="4 2" />
        <path d="M42 20 A 18 18 0 1 0 58 20 A 14 14 0 1 1 42 20" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.12">
      <path d="M20 70 Q50 30 80 70" strokeLinecap="round" />
      <ellipse cx="38" cy="50" rx="8" ry="4" transform="rotate(-20 38 50)" fill="currentColor" />
      <ellipse cx="62" cy="50" rx="8" ry="4" transform="rotate(20 62 50)" fill="currentColor" />
      <ellipse cx="50" cy="38" rx="7" ry="3.5" fill="currentColor" />
    </svg>
  );
}

export interface EnvelopeDesignProps {
  style: EnvelopeStyle;
  monogram: string;
  guest: string;
  couple: string;
  date?: string;
}

/**
 * 10 PHONG CÁCH MẶT TRƯỚC BAO THIỆP — HAUTE COUTURE STATIONERY (KHÔNG EMOJI)
 */
export function EnvelopeDesign({ style, monogram, guest, couple, date }: EnvelopeDesignProps) {
  // ── 1. KOREAN CHIFFON (CHUẨN 100% 7799 WEDDING STORYTELLER MINT SAGE) ──
  if (style === 'korean_chiffon') {
    return (
      <span className="envelope-design envelope-design--korean" data-design={style}>
        {/* Botanical Sprig Sketch Vector positioned absolutely */}
        <svg className="korean-sprig-svg" viewBox="0 0 200 90" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M20 75 Q100 20 180 75" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
          <path d="M60 48 Q50 30 70 28 Q78 42 60 48 Z" fill="currentColor" opacity="0.25" />
          <path d="M90 35 Q85 15 105 14 Q110 30 90 35 Z" fill="currentColor" opacity="0.3" />
          <path d="M125 35 Q145 15 140 32 Q125 40 125 35 Z" fill="currentColor" opacity="0.3" />
          <path d="M150 48 Q170 30 160 48 Z" fill="currentColor" opacity="0.25" />
        </svg>

        {/* Top: Arched SAVE THE DATE & Monogram */}
        <div className="korean-top-crest">
          {date && <span className="korean-save-the-date">SAVE THE DATE · {date}</span>}
          <span className="korean-monogram">{monogram}</span>
        </div>

        {/* Center: Spaced WEDDING INVITATION */}
        <div className="korean-invitation-bar">
          <span>WEDDING INVITATION</span>
        </div>

        {/* Lower: Trân trọng kính mời with Authentic Dotted Leader */}
        <div className="korean-guest-zone">
          <div className="korean-guest-line-wrapper">
            <span className="korean-salutation">TRÂN TRỌNG KÍNH MỜI:</span>
            <strong className="korean-guest-name">{guest}</strong>
          </div>
          <span className="korean-dotted-leader" />
        </div>

        {/* Bottom Couple Signature */}
        <div className="korean-footer">
          <span>{couple}</span>
        </div>
      </span>
    );
  }

  // ── 2. TRADITIONAL SILK (ĐỎ SON CUNG ĐÌNH & SONG HỶ THIẾP VÀNG) ──
  if (style === 'traditional_silk') {
    return (
      <span className="envelope-design envelope-design--traditional" data-design={style}>
        <div className="trad-wave-border trad-wave-border--top" />
        <div className="trad-wave-border trad-wave-border--bottom" />

        <div className="trad-layout">
          <div className="trad-medallion-box">
            <div className="trad-medallion">
              <span className="trad-songhy">囍</span>
              <span className="trad-sub-blessing">TRĂM NĂM HẠNH PHÚC</span>
            </div>
          </div>

          <div className="trad-text-box">
            <span className="trad-headline">THIỆP HỒNG BÁO HỶ</span>
            <span className="trad-salutation">Kính mời quan khách danh dự:</span>
            <strong className="trad-guest-name">{guest}</strong>
            <span className="trad-gold-line" />
            <div className="trad-footer-info">
              <span>HÔN LỄ: {couple}</span>
              {date && <span>NGÀY LÀNH: {date}</span>}
            </div>
          </div>
        </div>
      </span>
    );
  }

  // ── 3. INDOCHINE KRAFT (BƯU THIẾP BƯU ĐIỆN SÀI GÒN 1930) ──
  if (style === 'indochine_kraft') {
    return (
      <span className="envelope-design envelope-design--indochine" data-design={style}>
        <div className="indochine-airmail-frame" />

        <div className="indochine-postcard">
          <div className="indochine-left">
            <span className="indochine-header">CARTE POSTALE · THƯ BÁO HỶ</span>
            <p className="indochine-body-quote">
              "Nguyện cùng nhau trọn kiếp ba sinh, trăm năm tay nắm bàn tay đi qua thăng trầm..."
            </p>
            <span className="indochine-couple-sign">{couple}</span>
            <span className="indochine-location">Sài Gòn - Chợ Lớn · 1930</span>
          </div>

          <div className="indochine-divider" />

          <div className="indochine-right">
            <div className="indochine-stamp-zone">
              <div className="indochine-stamp">
                <svg className="indochine-stamp-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 4 Q7 12 12 18 Q17 12 12 4 Z" fill="currentColor" opacity="0.3" />
                  <path d="M12 10 Q5 14 8 20 Q12 18 12 10 Z" fill="currentColor" opacity="0.2" />
                  <path d="M12 10 Q19 14 16 20 Q12 18 12 10 Z" fill="currentColor" opacity="0.2" />
                </svg>
                <span className="indochine-stamp-val">POSTES 5c</span>
              </div>
              <div className="indochine-postmark">
                <span>POSTES</span>
                <strong>SAIGON</strong>
                <small>{date || '1930'}</small>
              </div>
            </div>

            <div className="indochine-address-lines">
              <span className="indochine-dest-label">Destinataire / Kính gửi:</span>
              <strong className="indochine-guest-name">{guest}</strong>
              <div className="indochine-line" />
              <span className="indochine-line indochine-line--sub">Tới dự lễ thành hôn đôi lứa</span>
            </div>
          </div>
        </div>
      </span>
    );
  }

  // ── 4. EDITORIAL VELLUM (ẤN BẢN TẠP CHÍ VOGUE THỜI TRANG) ──
  if (style === 'editorial_vellum') {
    return (
      <span className="envelope-design envelope-design--editorial" data-design={style}>
        <span className="editorial-crop editorial-crop--tl" />
        <span className="editorial-crop editorial-crop--tr" />
        <span className="editorial-crop editorial-crop--bl" />
        <span className="editorial-crop editorial-crop--br" />

        <div className="editorial-masthead">
          <span className="editorial-title">THE WEDDING ISSUE</span>
          <span className="editorial-issue">VOL. 26 // ATELIER EDITION</span>
        </div>

        <div className="editorial-body">
          <div className="editorial-hero-initials">{monogram}</div>
          <div className="editorial-feature">
            <span className="editorial-tag">SPECIAL VIP GUEST</span>
            <strong className="editorial-guest-name">{guest}</strong>
            <p className="editorial-story">
              EXCLUSIVELY INVITED TO CELEBRATE THE UNION OF {couple.toUpperCase()}
            </p>
            {date && <span className="editorial-date-code">{date} — HCM CITY</span>}
          </div>
        </div>
      </span>
    );
  }

  // ── 5. CELESTIAL MIDNIGHT (DẠ TIỆC VŨ TRỤ & HẢI ĐỒ TINH TÚ) ──
  if (style === 'celestial_midnight') {
    return (
      <span className="envelope-design envelope-design--celestial" data-design={style}>
        <div className="celestial-stars" />

        <div className="celestial-moon-phases">
          <svg viewBox="0 0 160 24" className="celestial-moons-svg" fill="currentColor">
            <circle cx="20" cy="12" r="6" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.8" />
            <path d="M50 6 A 6 6 0 0 0 50 18 A 4 4 0 0 1 50 6 Z" />
            <circle cx="80" cy="12" r="7.5" fill="#FDE68A" />
            <path d="M110 6 A 6 6 0 0 1 110 18 A 4 4 0 0 0 110 6 Z" />
            <circle cx="140" cy="12" r="6" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>

        <div className="celestial-astral-ring">
          <span className="celestial-sub-orbit">WRITTEN IN THE STARS</span>
          <span className="celestial-salutation">Trân trọng đón mời quan khách:</span>
          <strong className="celestial-guest-name">{guest}</strong>
          <div className="celestial-gold-dust-line" />
          <p className="celestial-couple-orbit">
            HÔN LỄ TRĂM NĂM DƯỚI BẦU TRỜI NGÀN SAO CỦA {couple}
          </p>
          {date && <span className="celestial-coord-date">{date} · MOONLIGHT GALA</span>}
        </div>
      </span>
    );
  }

  // ── 6. BLUSH RIBBON (NƠ LỤA NÀNG THƠ & MỀ ĐAY DIOR) ──
  if (style === 'blush_ribbon') {
    return (
      <span className="envelope-design envelope-design--blush" data-design={style}>
        <div className="blush-top-banner">
          <span className="blush-french-title">INVITATION AU MARIAGE</span>
          {date && <span className="blush-date-stamp">{date}</span>}
        </div>

        <div className="blush-ribbon-bar">
          <div className="blush-ribbon-stripe" />
          <div className="blush-cameo-medallion">
            <span className="blush-cameo-monogram">{monogram}</span>
          </div>
        </div>

        <div className="blush-guest-zone">
          <span className="blush-salutation">Trân quý kính mời:</span>
          <strong className="blush-guest-name">{guest}</strong>
          <div className="blush-pearl-line" />
          <span className="blush-couple-names">{couple}</span>
        </div>
      </span>
    );
  }

  // ── 7. EMERALD BRASS (GATSBY 1920s ART DECO MẠ VÀNG) ──
  if (style === 'emerald_brass') {
    return (
      <span className="envelope-design envelope-design--emerald" data-design={style}>
        <span className="deco-corner deco-corner--tl" />
        <span className="deco-corner deco-corner--tr" />
        <span className="deco-corner deco-corner--bl" />
        <span className="deco-corner deco-corner--br" />

        <div className="deco-frame">
          <div className="deco-top-emblem">
            <span className="deco-line-art" />
            <span className="deco-header-text">THE GREAT WEDDING SOIREE</span>
            <span className="deco-line-art" />
          </div>

          <div className="deco-guest-cartouche">
            <span className="deco-cartouche-label">CORDIALLY INVITING:</span>
            <strong className="deco-guest-name">{guest}</strong>
          </div>

          <div className="deco-footer-plaque">
            <span className="deco-couple-names">MR. &amp; MRS. {couple.toUpperCase()}</span>
            {date && <span className="deco-date-badge">{date}</span>}
          </div>
        </div>
      </span>
    );
  }

  // ── 8. RUSTIC TWINE (VƯỜN MỘC KRAFT & THẺ TREO CÀNH LÁ) ──
  if (style === 'rustic_twine') {
    return (
      <span className="envelope-design envelope-design--rustic" data-design={style}>
        <div className="rustic-luggage-tag">
          <div className="rustic-tag-header">
            <svg className="rustic-sprig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 20 Q12 12 20 4" strokeLinecap="round" />
              <path d="M10 14 Q6 10 10 6 Q14 10 10 14 Z" fill="currentColor" opacity="0.3" />
              <path d="M16 8 Q12 4 16 0 Q20 4 16 8 Z" fill="currentColor" opacity="0.3" />
            </svg>
            <span className="rustic-sub">GARDEN WEDDING INVITATION</span>
          </div>

          <div className="rustic-tag-body">
            <span className="rustic-salutation">Thân mời bạn:</span>
            <strong className="rustic-guest-name">{guest}</strong>
            <div className="rustic-dashed-line" />
            <p className="rustic-couple-lead">
              Đến chung vui hôn lễ sân vườn cùng đôi lứa
            </p>
            <span className="rustic-couple-sign">{couple}</span>
            {date && <span className="rustic-date-tag">{date}</span>}
          </div>
        </div>
      </span>
    );
  }

  // ── 9. MODERN MINIMAL (KIẾN TRÚC & TỐI GIẢN BẮC ÂU) ──
  if (style === 'modern_minimal') {
    return (
      <span className="envelope-design envelope-design--minimal" data-design={style}>
        <span className="minimal-grid-mark minimal-grid-mark--tl">+</span>
        <span className="minimal-grid-mark minimal-grid-mark--br">+</span>

        <div className="minimal-split-layout">
          <div className="minimal-left-col">
            <span className="minimal-vert-title">WEDDING</span>
            <span className="minimal-vert-sub">INVITATION</span>
            <span className="minimal-vert-code">// 2026</span>
          </div>

          <div className="minimal-separator" />

          <div className="minimal-right-col">
            <div className="minimal-guest-box">
              <span className="minimal-label">HONORED GUEST:</span>
              <strong className="minimal-guest-name">{guest}</strong>
            </div>

            <div className="minimal-couple-box">
              <span className="minimal-label">CELEBRATING:</span>
              <span className="minimal-couple-name">{couple}</span>
              {date && <span className="minimal-date">{date}</span>}
            </div>
          </div>
        </div>
      </span>
    );
  }

  // ── 10 (DEFAULT): ROYAL VELVET (HOÀNG GIA QUÝ TỘC CHÂU ÂU) ──
  return (
    <span className="envelope-design envelope-design--royal" data-design={style}>
      <span className="royal-corner royal-corner--tl" />
      <span className="royal-corner royal-corner--tr" />
      <span className="royal-corner royal-corner--bl" />
      <span className="royal-corner royal-corner--br" />

      {/* Royal Crown Vector Emblem */}
      <div className="royal-crest-box">
        <svg className="royal-crown-svg" viewBox="0 0 36 24" fill="currentColor">
          <path d="M4 20 L32 20 L30 10 L23 16 L18 6 L13 16 L6 10 Z" />
          <circle cx="6" cy="8" r="1.5" />
          <circle cx="18" cy="4" r="2" />
          <circle cx="30" cy="8" r="1.5" />
          <rect x="4" y="21" width="28" height="2" rx="1" opacity="0.8" />
        </svg>
        <span className="royal-monogram">{monogram}</span>
        <span className="royal-proclamation">HOÀNG GIA CHÂU ÂU · ATELIER</span>
      </div>

      <div className="royal-title-bar">
        <span>ROYAL WEDDING INVITATION</span>
      </div>

      <div className="royal-guest-zone">
        <span className="royal-salutation">Trân trọng kính mời Quan khách Quý tộc:</span>
        <strong className="royal-guest-name">{guest}</strong>
        <div className="royal-gold-line" />
        <span className="royal-couple-lead">
          Tham dự lễ cưới hoàng gia của {couple}
        </span>
      </div>

      {date && (
        <div className="royal-footer">
          <span>{date} · GRAND BALLROOM</span>
        </div>
      )}
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

/**
 * 3D Physical Envelope Back Pocket & Flap with Monogram Wax Seal
 */
export function EnvelopeBack({
  style,
  monogram,
  onOpen,
  sealed = true,
}: {
  style: EnvelopeStyle;
  monogram?: string;
  onOpen?: () => void;
  sealed?: boolean;
}) {
  const palette = envelopePalettes[style] || envelopePalettes.royal_velvet;
  const sealGradientId = useId();
  const sealShineId = useId();
  const Seal = onOpen ? 'button' : 'span';

  // Monogram priority: If user or couple has a monogram, proudly display it!
  const displayInscription =
    monogram && monogram.trim().length > 0
      ? monogram
      : palette.sealInscription === 'song_hy'
      ? '囍'
      : palette.sealInscription === 'moon'
      ? '☾'
      : palette.sealInscription === 'olive'
      ? '❧'
      : 'with love';

  return (
    <div className="wedding-envelope__back-assembly" data-design={style}>
      {/* 1. Inside Back Wall Lining Pattern (revealed when flap opens) */}
      <EnvelopeLiner style={style} />

      {/* 2. Solid Front Pocket (Completely conceals letter card when closed) */}
      <div className="wedding-envelope__pocket" aria-hidden="true">
        <div className="wedding-envelope__pocket-rim" />
        <div className="wedding-envelope__pocket-crease wedding-envelope__pocket-crease--left" />
        <div className="wedding-envelope__pocket-crease wedding-envelope__pocket-crease--right" />
        <div className="wedding-envelope__pocket-crease wedding-envelope__pocket-crease--bottom" />
      </div>

      {/* 3. Triangular Closure Flap (Folds down when sealed, flips up 180° when opened) */}
      <div className="wedding-envelope__flap" aria-hidden="true">
        <div className="wedding-envelope__flap-paper" />
        <div className="wedding-envelope__flap-lining">
          <EnvelopeLiner style={style} />
        </div>
      </div>

      {/* 4. Photorealistic Embossed Wax Seal Mounted on Flap Apex */}
      <Seal
        type={onOpen ? 'button' : undefined}
        className="wedding-envelope__seal"
        aria-label={onOpen ? 'Mở thiệp bằng con dấu sáp' : undefined}
        disabled={onOpen ? !sealed : undefined}
        onClick={onOpen}
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <radialGradient id={sealGradientId} cx="34%" cy="25%" r="78%">
              <stop offset="0%" stopColor={palette.looseSealGrad[0]} />
              <stop offset="42%" stopColor={palette.looseSealGrad[1]} />
              <stop offset="85%" stopColor={palette.looseSealGrad[2]} />
              <stop offset="100%" stopColor={palette.looseSealGrad[2]} stopOpacity="0.85" />
            </radialGradient>
            <radialGradient id={sealShineId} cx="32%" cy="22%" r="48%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.75)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
          </defs>

          {/* Liquid organic wax edge contour */}
          <path
            fill={`url(#${sealGradientId})`}
            d="M50 4C64 1 72 8 83 14C96 21 94 33 98 45C104 58 93 70 89 82C85 94 74 93 61 98C48 103 38 96 26 94C13 91 13 78 7 67C1 55 8 44 9 33C11 20 25 19 35 11C41 6 47 7 50 4Z"
          />

          {/* Specular highlight on upper curve */}
          <path
            fill={`url(#${sealShineId})`}
            d="M50 4C64 1 72 8 83 14C96 21 94 33 98 45C104 58 93 70 89 82C85 94 74 93 61 98C48 103 38 96 26 94C13 91 13 78 7 67C1 55 8 44 9 33C11 20 25 19 35 11C41 6 47 7 50 4Z"
            opacity="0.8"
          />

          {/* Embossed inner coin depression */}
          <circle
            cx="50"
            cy="50"
            r="31"
            fill="rgba(0, 0, 0, 0.16)"
            stroke="rgba(255, 240, 190, 0.65)"
            strokeWidth="1.2"
          />
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke="rgba(0, 0, 0, 0.25)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Embossed inscription inside wax coin */}
        <span
          className={`wedding-envelope__seal-text ${
            displayInscription === 'with love' ? 'is-script' : ''
          }`}
          aria-hidden="true"
        >
          {displayInscription}
        </span>
      </Seal>
    </div>
  );
}

/**
 * Modern High-End Envelope Style Gallery (Studio Step 5 & Admin Panel)
 */
export function EnvelopeDesignPicker({
  value,
  onChange,
  onOpenPreview,
}: {
  value?: EnvelopeStyle;
  onChange: (style: EnvelopeStyle) => void;
  sample?: Omit<EnvelopeDesignProps, 'style'>;
  onOpenPreview?: () => void;
}) {
  const selectedStyle = value || 'royal_velvet';
  const selectedPalette = envelopePalettes[selectedStyle] || envelopePalettes.royal_velvet;

  return (
    <div className="space-y-4">
      {/* Header bar with Active Badge and Fullscreen 3D Unboxing button */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-xl shadow-xs border border-white/60 flex items-center justify-center text-xs shrink-0"
            style={{ background: selectedPalette.pocketGradient, color: selectedPalette.ctaText }}
          >
            ✦
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Mẫu phong bì đang chọn:
            </span>
            <span className="font-serif text-sm font-bold text-stone-900 truncate block">
              {selectedPalette.name}
            </span>
          </div>
        </div>

        {onOpenPreview && (
          <button
            type="button"
            onClick={onOpenPreview}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white text-xs font-bold shadow-md hover:opacity-95 transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
            title="Mở toàn màn hình để trải nghiệm hiệu ứng bóc phong bì 3D"
          >
            <Play size={13} className="text-amber-300" aria-hidden="true" />
            <span>Mở Thử Thiệp 3D</span>
          </button>
        )}
      </div>

      {/* 10 Envelope Collection Gallery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {envelopeDesigns.map((item) => {
          const isSelected = selectedStyle === item.id;
          const p = envelopePalettes[item.id];

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'border-[#722235] bg-rose-50/40 ring-2 ring-[#722235]/30 shadow-md'
                  : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/60'
              }`}
            >
              <div className="space-y-2.5">
                {/* Visual Palette Swatch & Seal Indicator */}
                <div
                  className="h-16 w-full rounded-xl relative overflow-hidden shadow-xs border border-stone-200/60 flex items-center justify-center"
                  style={{ background: p.paperGradient }}
                >
                  {/* Flap shape illusion */}
                  <div
                    className="absolute top-0 inset-x-0 h-9"
                    style={{
                      background: p.pocketGradient,
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      opacity: 0.9,
                    }}
                  />

                  {/* Mini Wax Seal in Center */}
                  <div
                    className="w-6 h-6 rounded-full shadow-md flex items-center justify-center text-[9px] font-serif font-bold text-white relative z-10"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${p.looseSealGrad[0]}, ${p.looseSealGrad[1]} 60%, ${p.looseSealGrad[2]})`,
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    {p.sealInscription === 'song_hy' ? '囍' : '✦'}
                  </div>

                  {/* Active Selection Badge */}
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-[#722235] text-white text-[9px] font-bold flex items-center space-x-1 shadow-xs z-20">
                      <Check size={10} strokeWidth={3} />
                      <span>Đang chọn</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-serif text-xs font-bold text-stone-900 truncate">
                      {item.name}
                    </h4>
                  </div>
                  <span className="text-[10px] text-[#A2682A] font-bold block mt-0.5">
                    {item.tag}
                  </span>
                  <p className="text-[11px] text-stone-500 leading-snug font-light mt-1 line-clamp-2">
                    {item.detail}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
