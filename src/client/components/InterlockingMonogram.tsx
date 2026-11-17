import React from 'react';
import { MonogramStyleKey } from '../../shared/types';

interface InterlockingMonogramProps {
  initialGroom: string;
  initialBride: string;
  style?: MonogramStyleKey;
  color?: string;
  size?: number;
  className?: string;
}

export const MONOGRAM_STYLES: Record<MonogramStyleKey, { label: string; desc: string }> = {
  interlocking: {
    label: 'Chữ Cái Lồng Nhau',
    desc: 'Hai chữ cái tên dâu rể đan lồng quý phái chuẩn phong cách Hoàng Gia Châu Âu',
  },
  crest: {
    label: 'Vương Miện Hoàng Tộc',
    desc: 'Huy hiệu vương miện và vòng nguyệt quế bao bọc tên hai người',
  },
  calligraphy: {
    label: 'Thư Pháp Dạ Tiệc',
    desc: 'Nét chữ bay bổng, lãng mạn với hoa văn uốn lượn',
  },
  botanical: {
    label: 'Vòng Lá Ô-Liu Mộc',
    desc: 'Vòng nguyệt quế và nhánh lá thiên nhiên phong cách Rustic Botanical',
  },
  song_hy: {
    label: 'Song Hỷ Cát Tường',
    desc: 'Chữ Song Hỷ (囍) thư pháp hoàng gia tượng trưng cho trăm năm hạnh phúc',
  },
};

export const InterlockingMonogram: React.FC<InterlockingMonogramProps> = ({
  initialGroom,
  initialBride,
  style = 'interlocking',
  color = '#DFB76C',
  size = 64,
  className = '',
}) => {
  const g = (initialGroom || 'T').trim().charAt(0).toUpperCase();
  const b = (initialBride || 'P').trim().charAt(0).toUpperCase();

  // 1. Song Hy (囍)
  if (style === 'song_hy') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`interlocking-monogram ${className}`}
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="1.5" />
        <circle cx="50" cy="50" r="41" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" />
        <text
          x="50"
          y="68"
          textAnchor="middle"
          fontSize="48"
          fill={color}
          fontFamily='"Cinzel", "Playfair Display", serif'
          fontWeight="bold"
        >
          囍
        </text>
      </svg>
    );
  }

  // 2. Crest (Crown & Medallion)
  if (style === 'crest') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`interlocking-monogram ${className}`}
        aria-hidden="true"
      >
        {/* Imperial Crown at Top */}
        <path
          d="M38 24 L42 20 L50 25 L58 20 L62 24 L60 30 L40 30 Z"
          fill={color}
          opacity="0.9"
        />
        <circle cx="42" cy="19" r="1.5" fill={color} />
        <circle cx="50" cy="24" r="1.5" fill={color} />
        <circle cx="58" cy="19" r="1.5" fill={color} />

        {/* Double Wreath Ring */}
        <circle cx="50" cy="56" r="34" fill="none" stroke={color} strokeWidth="1.5" />
        <circle cx="50" cy="56" r="30" fill="none" stroke={color} strokeWidth="0.75" strokeDasharray="2 2" />

        {/* Laurel leaves on sides */}
        <path
          d="M20 65 Q18 50 25 38 Q20 48 24 58 Z"
          fill={color}
          opacity="0.8"
        />
        <path
          d="M80 65 Q82 50 75 38 Q80 48 76 58 Z"
          fill={color}
          opacity="0.8"
        />

        {/* Initials with Ampersand */}
        <text
          x="42"
          y="64"
          textAnchor="middle"
          fontSize="24"
          fill={color}
          fontFamily='"Cinzel", "Playfair Display", Georgia, serif'
          fontWeight="bold"
        >
          {g}
        </text>
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fontSize="14"
          fill={color}
          fontFamily='"Cinzel", "Playfair Display", Georgia, serif'
          fontStyle="italic"
          opacity="0.8"
        >
          &amp;
        </text>
        <text
          x="58"
          y="64"
          textAnchor="middle"
          fontSize="24"
          fill={color}
          fontFamily='"Cinzel", "Playfair Display", Georgia, serif'
          fontWeight="bold"
        >
          {b}
        </text>
      </svg>
    );
  }

  // 3. Botanical Laurel (Olive Wreath)
  if (style === 'botanical') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`interlocking-monogram ${className}`}
        aria-hidden="true"
      >
        {/* Botanical Wreath Branches */}
        <path
          d="M24 74 C14 55 18 35 32 24 C30 30 31 38 36 42"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M76 74 C86 55 82 35 68 24 C70 30 69 38 64 42"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Little Olive leaves */}
        <ellipse cx="22" cy="50" rx="3" ry="6" transform="rotate(-30 22 50)" fill={color} opacity="0.8" />
        <ellipse cx="78" cy="50" rx="3" ry="6" transform="rotate(30 78 50)" fill={color} opacity="0.8" />
        <ellipse cx="28" cy="35" rx="3" ry="6" transform="rotate(-50 28 35)" fill={color} opacity="0.8" />
        <ellipse cx="72" cy="35" rx="3" ry="6" transform="rotate(50 72 35)" fill={color} opacity="0.8" />

        {/* Initials */}
        <text
          x="41"
          y="58"
          textAnchor="middle"
          fontSize="25"
          fill={color}
          fontFamily='"Cinzel", "Playfair Display", Georgia, serif'
          fontWeight="bold"
        >
          {g}
        </text>
        <text
          x="50"
          y="50"
          textAnchor="middle"
          fontSize="14"
          fill={color}
          fontFamily='"Playfair Display", Georgia, serif'
          fontStyle="italic"
        >
          &amp;
        </text>
        <text
          x="59"
          y="58"
          textAnchor="middle"
          fontSize="25"
          fill={color}
          fontFamily='"Cinzel", "Playfair Display", Georgia, serif'
          fontWeight="bold"
        >
          {b}
        </text>
      </svg>
    );
  }

  // 4. Calligraphy (Flourished script)
  if (style === 'calligraphy') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`interlocking-monogram ${className}`}
        aria-hidden="true"
      >
        {/* Flourish Top Swash */}
        <path
          d="M25 28 Q45 18 60 26 T75 22"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="75" cy="22" r="1.5" fill={color} />

        {/* Flourish Bottom Swash */}
        <path
          d="M75 72 Q55 82 40 74 T25 78"
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="25" cy="78" r="1.5" fill={color} />

        {/* Cursive Monogram */}
        <text
          x="38"
          y="58"
          textAnchor="middle"
          fontSize="36"
          fill={color}
          fontFamily='"Playfair Display", "Cormorant Garamond", cursive, serif'
          fontStyle="italic"
          fontWeight="bold"
        >
          {g}
        </text>
        <text
          x="62"
          y="64"
          textAnchor="middle"
          fontSize="36"
          fill={color}
          fontFamily='"Playfair Display", "Cormorant Garamond", cursive, serif'
          fontStyle="italic"
          fontWeight="bold"
        >
          {b}
        </text>
      </svg>
    );
  }

  // 5. Default: Interlocking Letters (Hai chữ cái lồng vào nhau tinh xảo)
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`interlocking-monogram ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter id="monogramGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.4)" />
        </filter>
      </defs>

      {/* Decorative Outer Diamond Hairline */}
      <rect
        x="22"
        y="22"
        width="56"
        height="56"
        transform="rotate(45 50 50)"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.6"
      />
      <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" opacity="0.7" />

      {/* Intertwined First Initial (Left, slightly back) */}
      <text
        x="40"
        y="60"
        textAnchor="middle"
        fontSize="34"
        fill={color}
        fontFamily='"Cinzel", "Playfair Display", Georgia, serif'
        fontWeight="bold"
        filter="url(#monogramGlow)"
      >
        {g}
      </text>

      {/* Golden Ampersand Knot */}
      <text
        x="50"
        y="52"
        textAnchor="middle"
        fontSize="16"
        fill={color}
        fontFamily='"Playfair Display", Georgia, serif'
        fontStyle="italic"
        opacity="0.9"
      >
        &amp;
      </text>

      {/* Intertwined Second Initial (Right, slightly front with subtle stroke cutout) */}
      <text
        x="60"
        y="60"
        textAnchor="middle"
        fontSize="34"
        fill={color}
        fontFamily='"Cinzel", "Playfair Display", Georgia, serif'
        fontWeight="bold"
        filter="url(#monogramGlow)"
      >
        {b}
      </text>
    </svg>
  );
};
