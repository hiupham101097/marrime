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
  // 1. Korean Pastel Mint & Coral (Chuẩn 100% phong cách 7799 Wedding Storyteller)
  korean_chiffon: {
    name: 'Hàn Quốc Pastel 7799 Storyteller',
    detail: 'Giấy mint sage, cành khuynh diệp nhã nhặn, con dấu sáp vàng đồng trên nền voan đào san hô',
    paperGradient: 'linear-gradient(135deg, #EEF5F1 0%, #DFECE4 50%, #CFE2D6 100%)',
    pocketGradient: 'linear-gradient(180deg, #D6E6DC 0%, #C8DDD0 60%, #B7D1C0 100%)',
    accentGold: '#C59A4E',
    sealInscription: 'with_love',
    looseSealGrad: ['#FFE9A6', '#D4A33B', '#6E4909'],
    sceneGradient: 'radial-gradient(ellipse at 42% 28%, #FFEFE6 0%, #FFDFCF 45%, #F5BCA8 75%, #DF886E 100%)',
    ctaGradient: 'linear-gradient(135deg, #1C4234, #0F2A20)',
    ctaText: '#FFFDF9',
    letterInk: '#18382D',
  },

  // 2. Hoàng Gia Châu Âu (Royal European Burgundy & Champagne Gold)
  royal_velvet: {
    name: 'Hoàng Gia Quý Tộc Châu Âu',
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
    name: 'Đỏ Son Cung Đình Truyền Thống',
    detail: 'Lụa đỏ son cung đình, đại huy hiệu Song Hỷ mạ vàng, vân mây cát tường',
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
    detail: 'Giấy xanh đêm huyền bí, chu kỳ trăng khuyết và hải đồ tinh tú, dấu sáp sapphire vũ trụ',
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
    name: 'Vườn Mộc Sân Vườn Rustic',
    detail: 'Bao thiệp kraft vẽ tay cành ô liu mộc mạc, thẻ hành lý và dây thừng tự nhiên',
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
    name: 'Ấn Bản Tạp Chí Vogue Editorial',
    detail: 'Bố cục bìa tạp chí thời trang Vogue, typography ấn tượng, dấu sáp đen obsidian',
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
    name: 'Nơ Lụa Hồng Nàng Thơ Dior',
    detail: 'Dải lụa satin ngang thân thiệp, mề đay Cameo chạm ngọc trai, dấu sáp cánh hồng',
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
    name: 'Lục Bảo Art Deco Gatsby',
    detail: 'Màu xanh lục bảo vương giả, khung kim loại hình học Great Gatsby 1920s mạ vàng',
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
    name: 'Bưu Thiếp Bưu Điện Đông Dương 1930',
    detail: 'Bưu thiếp hoài cổ Sài Gòn xưa, tem sen hoa cổ, dấu nhật ấn bưu điện và viền bưu vụ',
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
    name: 'Tối Giản Thuần Khiết Bắc Âu',
    detail: 'Bố cục kiến trúc bất đối xứng Bắc Âu, khoảng trắng tinh khôi, typographic hiện đại',
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
  if (style === 'indochine_kraft') {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1">
        <circle cx="50" cy="50" r="38" />
        <path d="M50 30 Q40 50 50 70 Q60 50 50 30 Z" fill="currentColor" />
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

interface EnvelopeDesignProps {
  style: EnvelopeStyle;
  monogram: string;
  guest: string;
  couple: string;
  date?: string;
}

/**
 * 10 PHONG CÁCH BAO THIỆP ĐỘC BẢN HOÀN TOÀN — KHÔNG CÓ BẤT KỲ EMOJI NÀO
 */
export function EnvelopeDesign({ style, monogram, guest, couple, date }: EnvelopeDesignProps) {
  // ── 1. KOREAN CHIFFON (CHUẨN 100% 7799 WEDDING STORYTELLER MINT SAGE) ──
  if (style === 'korean_chiffon') {
    return (
      <span className="envelope-design envelope-design--korean" data-design={style}>
        {/* Botanical Sprig Sketch Vector */}
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
          {/* Left Column: Big Gold Medallion with Song Hy */}
          <div className="trad-medallion-box">
            <div className="trad-medallion">
              <span className="trad-songhy">囍</span>
              <span className="trad-sub-blessing">TRĂM NĂM HẠNH PHÚC</span>
            </div>
          </div>

          {/* Right Column: Formal Vietnamese Proclamation */}
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
          {/* Left Half: Carte Postale message */}
          <div className="indochine-left">
            <span className="indochine-header">CARTE POSTALE · THƯ BÁO HỶ</span>
            <p className="indochine-body-quote">
              "Nguyện cùng nhau trọn kiếp ba sinh, trăm năm tay nắm bàn tay đi qua thăng trầm..."
            </p>
            <span className="indochine-couple-sign">{couple}</span>
            <span className="indochine-location">Sài Gòn - Chợ Lớn · 1930</span>
          </div>

          <div className="indochine-divider" />

          {/* Right Half: Stamp & Address Lines */}
          <div className="indochine-right">
            <div className="indochine-stamp-zone">
              {/* Postage Stamp with Lotus Vector */}
              <div className="indochine-stamp">
                <svg className="indochine-stamp-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 4 Q7 12 12 18 Q17 12 12 4 Z" fill="currentColor" opacity="0.3" />
                  <path d="M12 10 Q5 14 8 20 Q12 18 12 10 Z" fill="currentColor" opacity="0.2" />
                  <path d="M12 10 Q19 14 16 20 Q12 18 12 10 Z" fill="currentColor" opacity="0.2" />
                </svg>
                <span className="indochine-stamp-val">POSTES 5c</span>
              </div>
              {/* Circular Postal Cancellation Mark */}
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
        {/* Corner Crop Marks */}
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

        {/* Top Moon Phases Vector Banner */}
        <div className="celestial-moon-phases">
          <svg viewBox="0 0 160 24" className="celestial-moons-svg" fill="currentColor">
            <circle cx="20" cy="12" r="6" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.8" />
            <path d="M50 6 A 6 6 0 0 0 50 18 A 4 4 0 0 1 50 6 Z" />
            <circle cx="80" cy="12" r="7.5" fill="#FDE68A" />
            <path d="M110 6 A 6 6 0 0 1 110 18 A 4 4 0 0 0 110 6 Z" />
            <circle cx="140" cy="12" r="6" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Astrological Centerpiece */}
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

        {/* Satin Ribbon Band with Center Oval Cameo */}
        <div className="blush-ribbon-bar">
          <div className="blush-ribbon-stripe" />
          <div className="blush-cameo-medallion">
            <span className="blush-cameo-monogram">{monogram}</span>
          </div>
        </div>

        {/* Bottom Guest Area */}
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
        {/* Stepped Art Deco Geometric Corners */}
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
        <div className="wedding-envelope__flap-paper" />
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
            <radialGradient id={sealGradientId} cx="34%" cy="25%" r="78%">
              <stop offset="0%" stopColor={palette.looseSealGrad[0]} />
              <stop offset="42%" stopColor={palette.looseSealGrad[1]} />
              <stop offset="85%" stopColor={palette.looseSealGrad[2]} />
              <stop offset="100%" stopColor={palette.looseSealGrad[2]} stopOpacity="0.8" />
            </radialGradient>
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

          {/* Specular highlight on upper curve */}
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

        {/* Embossed inscription inside wax coin */}
        <span
          className={`wedding-envelope__seal-text ${
            palette.sealInscription === 'with_love' ? 'is-script' : ''
          }`}
          aria-hidden="true"
        >
          {palette.sealInscription === 'song_hy'
            ? '囍'
            : palette.sealInscription === 'with_love'
            ? 'with love'
            : palette.sealInscription === 'moon'
            ? '☾'
            : palette.sealInscription === 'olive'
            ? '❧'
            : monogram}
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
              <div className="envelope-collection__envelope">
                <EnvelopeDesign style={selected.id} {...sampleContent} />
              </div>
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
