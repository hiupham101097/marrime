import { useId, useState, type CSSProperties } from 'react';
import { Minus, Play, Plus } from 'lucide-react';
import type { EnvelopeStyle } from '../../shared/types';
import './EnvelopeDesign.css';
import './EnvelopeModal.css';

interface StylePalette {
  paperGradient: string;
  pocketGradient: string;
  accentGold: string;
  sealInscription: 'with_love' | 'song_hy' | 'monogram' | 'moon' | 'olive';
  looseSealGrad: [string, string, string];
}

export const envelopePalettes: Record<EnvelopeStyle, StylePalette> = {
  korean_chiffon: {
    paperGradient: 'linear-gradient(135deg, #FAEEE7 0%, #ECD8D0 55%, #DFC3B8 100%)',
    pocketGradient: 'linear-gradient(180deg, #EDDBD3 0%, #DFC3B8 60%, #D4B3A7 100%)',
    accentGold: '#C59A4E',
    sealInscription: 'with_love',
    looseSealGrad: ['#FCE194', '#D4A33B', '#6E4909'],
  },
  royal_velvet: {
    paperGradient: 'linear-gradient(135deg, #F1E3CE 0%, #E7D4B8 55%, #D9BE9C 100%)',
    pocketGradient: 'linear-gradient(180deg, #E6D4B7 0%, #DEC6A5 60%, #CFB08D 100%)',
    accentGold: '#824B55',
    sealInscription: 'with_love',
    looseSealGrad: ['#C58990', '#8B4553', '#4D202C'],
  },
  traditional_silk: {
    paperGradient: 'linear-gradient(135deg, #A11520 0%, #850F18 50%, #5E070E 100%)',
    pocketGradient: 'linear-gradient(180deg, #7C0D16 0%, #680911 60%, #4D040A 100%)',
    accentGold: '#F5D061',
    sealInscription: 'song_hy',
    looseSealGrad: ['#FF6060', '#D01414', '#600202'],
  },
  celestial_midnight: {
    paperGradient: 'linear-gradient(135deg, #131E42 0%, #0B132B 50%, #050814 100%)',
    pocketGradient: 'linear-gradient(180deg, #0A1127 0%, #070B1C 60%, #03050E 100%)',
    accentGold: '#FDE68A',
    sealInscription: 'moon',
    looseSealGrad: ['#BAC6FF', '#4052B5', '#162057'],
  },
  rustic_twine: {
    paperGradient: 'linear-gradient(135deg, #E6DDD0 0%, #D8CEBC 50%, #C3B6A0 100%)',
    pocketGradient: 'linear-gradient(180deg, #D0C4B1 0%, #C4B6A0 60%, #B2A28A 100%)',
    accentGold: '#A66A45',
    sealInscription: 'olive',
    looseSealGrad: ['#EAD198', '#B0883C', '#594112'],
  },
  editorial_vellum: {
    paperGradient: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F0 50%, #E6E6DF 100%)',
    pocketGradient: 'linear-gradient(180deg, #EFEFE9 0%, #E4E4DC 60%, #D4D4CA 100%)',
    accentGold: '#B8860B',
    sealInscription: 'monogram',
    looseSealGrad: ['#FFF0B8', '#D4AF37', '#735705'],
  },
  blush_ribbon: {
    paperGradient: 'linear-gradient(135deg, #FFF6F8 0%, #FCEFF2 50%, #F5D7DE 100%)',
    pocketGradient: 'linear-gradient(180deg, #F9E5EA 0%, #F2D2DA 60%, #E5BDC8 100%)',
    accentGold: '#D47D93',
    sealInscription: 'with_love',
    looseSealGrad: ['#FFD1E0', '#E56D93', '#7A1C3C'],
  },
  emerald_brass: {
    paperGradient: 'linear-gradient(135deg, #183C2E 0%, #10291F 50%, #081610 100%)',
    pocketGradient: 'linear-gradient(180deg, #0E251C 0%, #091D15 60%, #05100B 100%)',
    accentGold: '#D8B863',
    sealInscription: 'monogram',
    looseSealGrad: ['#52DC98', '#167E4E', '#06351F'],
  },
  indochine_kraft: {
    paperGradient: 'linear-gradient(135deg, #EAD7B7 0%, #D8C4A0 50%, #BFAB85 100%)',
    pocketGradient: 'linear-gradient(180deg, #D0BC97 0%, #C3AE87 60%, #B09B74 100%)',
    accentGold: '#B85526',
    sealInscription: 'song_hy',
    looseSealGrad: ['#FF9166', '#C74A1B', '#631B00'],
  },
  modern_minimal: {
    paperGradient: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 50%, #EDEDED 100%)',
    pocketGradient: 'linear-gradient(180deg, #F3F3F3 0%, #E8E8E8 60%, #DCDCDC 100%)',
    accentGold: '#A1A1AA',
    sealInscription: 'monogram',
    looseSealGrad: ['#71717A', '#27272A', '#09090B'],
  },
};

export const envelopeDesigns: { id: EnvelopeStyle; name: string; detail: string }[] = [
  { id: 'royal_velvet', name: 'Giấy kem mực rượu', detail: 'Chữ mực rượu và đường chỉ in trên giấy kem' },
  { id: 'korean_chiffon', name: 'Đào phai', detail: 'Cành đào loang màu trên giấy hồng phấn' },
  { id: 'traditional_silk', name: 'Song Hỷ son', detail: 'Chữ hỷ tròn và viền vân sóng trên giấy đỏ son' },
  { id: 'rustic_twine', name: 'Vườn mộc', detail: 'Cành ô liu in trên giấy kraft' },
  { id: 'editorial_vellum', name: 'Ấn bản đen trắng', detail: 'Chữ in lớn và bố cục tạp chí' },
  { id: 'celestial_midnight', name: 'Đêm nguyệt thực', detail: 'Vầng trăng và chòm sao' },
  { id: 'blush_ribbon', name: 'Nơ lụa hồng', detail: 'Dải lụa ngang và bảng tên oval' },
  { id: 'emerald_brass', name: 'Lục bảo Art Deco', detail: 'Hình học bậc thang và nét đồng' },
  { id: 'indochine_kraft', name: 'Bưu thiếp Đông Dương', detail: 'Tem sen và dấu bưu điện' },
  { id: 'modern_minimal', name: 'Giấy ngà tối giản', detail: 'Chữ nhỏ, đường chỉ và khoảng trắng' },
];

export function EnvelopeArtwork({ style }: { style: EnvelopeStyle }) {
  const gradient = useId();
  const corner = useId();
  const flower = useId();
  const motifs = {
    royal_velvet: <>
      <path fill="#743845" opacity=".09" stroke="none" d="M0 0h49v360H0z"/>
      <path d="M48 0v360M55 0v360M254 268h92" opacity=".56"/>
      <path d="M268 94c15 0 22-5 32-15 10 10 17 15 32 15m-64 7c15 0 22 5 32 15 10-10 17-15 32-15" opacity=".6"/>
      <path fill="currentColor" stroke="none" d="m300 93 5 5-5 5-5-5z"/>
    </>,
    korean_chiffon: <>
      <defs>
        <radialGradient id={gradient}>
          <stop stopColor="#b15d61" stopOpacity=".85"/>
          <stop offset=".52" stopColor="#d58b89" stopOpacity=".64"/>
          <stop offset="1" stopColor="#edb9ac" stopOpacity=".3"/>
        </radialGradient>
        <g id={flower}>
          <path fill={`url(#${gradient})`} stroke="none" d="M0 0C-39 1-41-29-18-29C-25-53 6-57 12-31C31-48 49-22 25-10C48 9 26 31 9 14C0 39-29 28-23 9Z"/>
          <path d="M0 0l-16-19M0 0l8-21M0 0l21-13M0 0l13 11M0 0l-14 12" strokeWidth=".85" opacity=".75"/>
          <circle r="3" fill="currentColor"/>
        </g>
      </defs>
      <path d="M596 360C555 274 509 222 450 167m85 96c-47-12-78-12-100-7m114 24c11-27 10-57 5-84m-35 38c1-40-6-74-27-102" strokeWidth="1.6" opacity=".68"/>
      <use href={`#${flower}`} transform="translate(451 168) rotate(-17)"/>
      <use href={`#${flower}`} transform="translate(491 131) scale(.62) rotate(17)"/>
      <use href={`#${flower}`} transform="translate(556 197) scale(.79) rotate(32)"/>
      <use href={`#${flower}`} transform="translate(436 256) scale(.48) rotate(-20)"/>
      <path fill="#9d9e7b" stroke="none" opacity=".56" d="M517 239c-31-7-38-20-43-41 24 6 37 21 43 41Zm28 30c17-21 34-21 54-15-17 16-36 19-54 15Z"/>
    </>,
    traditional_silk: <>
      <defs>
        <pattern id={corner} width="44" height="22" patternUnits="userSpaceOnUse">
          <path d="M0 22Q11 1 22 22Q33 1 44 22M0 22Q11 9 22 22Q33 9 44 22" opacity=".66"/>
        </pattern>
      </defs>
      <path fill={`url(#${corner})`} stroke="none" d="M0 0h600v44H0zm0 316h600v44H0z"/>
      <path d="M0 47h600m0 266H0" opacity=".6"/>
      <path d="M75 180c0-30 25-54 55-54s55 24 55 54-25 54-55 54-55-24-55-54Z"/>
      <path d="M82 180a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" opacity=".53"/>
      <path d="M209 95v170" opacity=".46"/>
    </>,
    rustic_twine: <>
      <path d="M436 341c28-92 71-172 138-244m-101 162c-32-20-40-43-34-69 24 17 39 41 34 69Zm17-37c7-25 31-43 65-47-9 29-33 44-65 47Zm32-53c-20-20-18-46-10-65 18 19 23 43 10 65Zm29-40c5-30 22-49 43-53-2 24-17 46-43 53Zm-98 182c-33-12-49-36-45-61 29 12 47 36 45 61Z"/>
      <path strokeWidth="2" opacity=".55" d="M0 24c159 42 316-33 600 2M0 29c159 42 316-33 600 2"/>
    </>,
    editorial_vellum: <>
      <path fill="#21201f" stroke="none" d="M0 0h150v360H0z"/>
      <path d="M180 45h380m-380 266h380"/>
      <path strokeWidth="3" d="M180 53h49"/>
    </>,
    celestial_midnight: <>
      <path opacity=".45" d="m341 272 58-58 31 7 57-60 52 19 26-53"/>
      <path fill="currentColor" stroke="none" d="M481 44c-33 7-49 35-44 63 6 32 37 52 67 44-33 25-77 5-84-33-7-34 19-72 61-74Z"/>
      <path fill="currentColor" stroke="none" d="m539 68 3 9 9 3-9 3-3 9-3-9-9-3 9-3zm-140 140 2 4 4 2-4 2-2 4-2-4-4-2 4-2zm152 35 2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>
      <path strokeWidth="4" strokeLinecap="round" d="M341 272h.1m88-51h.1m57-60h.1m52 19h.1m26-53h.1m-191-54h.1m18 37h.1m172 184h.1"/>
    </>,
    blush_ribbon: <>
      <defs><linearGradient id={gradient} x2="0" y2="1"><stop stopColor="#ad5369"/><stop offset=".48" stopColor="#edb2bd"/><stop offset="1" stopColor="#a85368"/></linearGradient></defs>
      <path fill={`url(#${gradient})`} stroke="none" d="M0 150h600v60H0z"/>
      <ellipse cx="300" cy="180" rx="184" ry="104" fill="#fff3ef" strokeWidth="1.5"/>
      <ellipse cx="300" cy="180" rx="176" ry="96" opacity=".5"/>
      <path fill="#d3899c" d="M300 79c-80 10-67-66 0-9 67-57 80 19 0 9zm0-3c-5 18-23 34-34 38l7-16-17 4c20-10 29-16 35-26m9 0c5 18 23 34 34 38l-7-16 17 4c-20-10-29-16-35-26"/>
      <circle cx="300" cy="75" r="7" fill="#b9677d"/>
    </>,
    emerald_brass: <>
      <path d="M22 119V74h13V61h13V48h13V35h13V22h452v13h13v13h13v13h13v13h13v45m0 122v45h-13v13h-13v13h-13v13h-13v13H74v-13H61v-13H48v-13H35v-13H22v-45"/>
      <path d="m300 28 39 38-39 38-39-38zm-62 38h-94l-42 42m260-42h94l42 42M138 287h324m-296 10h268" opacity=".64"/>
    </>,
    indochine_kraft: <>
      <path strokeWidth="2" strokeDasharray="12 8" opacity=".62" d="M13 13h574v334H13z"/>
      <path strokeDasharray="2 3" d="M474 31h89v91h-89z"/>
      <path d="M482 39h73v75h-73zm36 56c-24-1-26-20-26-20 16-1 23 12 26 20Zm0 0c24-1 26-20 26-20-16-1-23 12-26 20Zm0 0c-16-17 0-35 0-35s16 18 0 35Z"/>
      <circle cx="448" cy="111" r="27" opacity=".57"/>
      <path d="M411 106q-28 16-56 0m56 7q-28 16-56 0m56 7q-28 16-56 0M51 249h315m-315 12h315" opacity=".57"/>
    </>,
    modern_minimal: <>
      <path d="M42 41h516m-516 278h516" opacity=".46"/>
      <path fill="currentColor" stroke="none" d="m300 235 3 3-3 3-3-3z"/>
    </>,
  };
  return <svg className="envelope-design__art" viewBox="0 0 600 360" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">{motifs[style]}</svg>;
}

interface EnvelopeDesignProps {
  style: EnvelopeStyle;
  monogram: string;
  guest: string;
  couple: string;
  date?: string;
}

export function EnvelopeDesign({ style, monogram, guest, couple, date }: EnvelopeDesignProps) {
  return (
    <span className="envelope-design" data-design={style}>
      <EnvelopeArtwork style={style} />
      <span className="envelope-design__mark" aria-hidden="true">{style === 'traditional_silk' ? '囍' : monogram}</span>
      <span className="envelope-design__address">
        <span>Trân trọng kính mời</span>
        <strong>{guest}</strong>
      </span>
      <span className="envelope-design__signature">
        <span>{couple}</span>
        {date && <span>{date}</span>}
      </span>
    </span>
  );
}

export function envelopePaperStyle(style: EnvelopeStyle): CSSProperties {
  const palette = envelopePalettes[style];
  return {
    '--paper': palette.paperGradient,
    '--pocket': palette.pocketGradient,
    '--foil': palette.accentGold,
    '--letter-ink': palette.looseSealGrad[2],
  } as CSSProperties;
}

export function EnvelopeBack({ style, monogram, onOpen, sealed = true }: {
  style: EnvelopeStyle;
  monogram: string;
  onOpen?: () => void;
  sealed?: boolean;
}) {
  const palette = envelopePalettes[style];
  const sealGradient = useId();
  const Seal = onOpen ? 'button' : 'span';
  const sealMarks = { with_love: 'With love', song_hy: '囍', monogram, moon: '☾', olive: '❧' };
  return (
    <>
    <div className="wedding-envelope__folds" aria-hidden="true">
      <div className="wedding-envelope__fold wedding-envelope__fold--left" />
      <div className="wedding-envelope__fold wedding-envelope__fold--right" />
      <div className="wedding-envelope__fold wedding-envelope__fold--bottom" />
    </div>

    <div className="wedding-envelope__flap" aria-hidden="true">
      <div className="wedding-envelope__flap-paper">
        <div className="wedding-envelope__flap-print">
          <EnvelopeArtwork style={style} />
        </div>
      </div>
      <div className="wedding-envelope__flap-lining" />
    </div>

    <Seal
      type={onOpen ? 'button' : undefined}
      className="wedding-envelope__seal"
      aria-label={onOpen ? 'Mở thiệp bằng dấu sáp' : undefined}
      disabled={onOpen ? !sealed : undefined}
      onClick={onOpen}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id={sealGradient} cx="32%" cy="23%" r="78%">
            <stop stopColor={palette.looseSealGrad[0]} />
            <stop offset=".48" stopColor={palette.looseSealGrad[1]} />
            <stop offset="1" stopColor={palette.looseSealGrad[2]} />
          </radialGradient>
        </defs>
        <path fill={`url(#${sealGradient})`} d="M50 5C63 2 69 8 80 13C93 19 91 31 96 42C102 55 91 66 88 78C84 91 73 90 60 96C47 101 37 94 25 92C12 89 12 76 6 65C0 53 7 42 8 31C10 18 24 17 34 9C40 5 46 6 50 5Z" />
        <circle cx="50" cy="50" r="32" fill="#200c09" fillOpacity=".24" stroke="#fff4dc" strokeOpacity=".48" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="#220d0a" strokeOpacity=".32" />
      </svg>
      <span aria-hidden="true">{sealMarks[palette.sealInscription]}</span>
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
  const sampleContent = sample ?? { monogram: 'M & A', guest: 'Bạn Lan', couple: 'Minh & An' };
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [zoom, setZoom] = useState(100);

  return (
    <section className="envelope-collection" aria-label="Bàn thiết kế phong bì">
      <aside className="envelope-collection__library">
        <div className="envelope-collection__library-heading">
          <h3>Bộ sưu tập</h3><span>{envelopeDesigns.length} mẫu</span>
        </div>
        <div className="envelope-picker" role="group" aria-label="Chọn mẫu phong bì">
          {envelopeDesigns.map(({ id, name }) => (
            <button key={id} type="button" aria-pressed={selected.id === id} onClick={() => onChange(id)}>
              <span className="envelope-picker__sample" aria-hidden="true">
                <EnvelopeDesign style={id} monogram="M & A" guest="Bạn Lan" couple="Minh & An" />
              </span>
              <strong>{name}</strong>
            </button>
          ))}
        </div>
      </aside>
      <div className="envelope-collection__workspace">
        <div className="envelope-collection__toolbar">
          <div className="envelope-collection__sides" role="group" aria-label="Mặt phong bì">
            <button type="button" aria-pressed={side === 'front'} onClick={() => setSide('front')}>Mặt trước</button>
            <button type="button" aria-pressed={side === 'back'} onClick={() => setSide('back')}>Mặt sau</button>
          </div>
          <div className="envelope-collection__zoom" role="group" aria-label="Thu phóng bản xem">
            <button type="button" aria-label="Thu nhỏ" disabled={zoom === 75} onClick={() => setZoom(zoom - 25)}><Minus size={16} /></button>
            <button type="button" aria-label="Đặt lại tỷ lệ" onClick={() => setZoom(100)}>{zoom}%</button>
            <button type="button" aria-label="Phóng to" disabled={zoom === 150} onClick={() => setZoom(zoom + 25)}><Plus size={16} /></button>
          </div>
        </div>
        <div className="envelope-collection__mat" style={{ '--zoom': zoom / 100 } as CSSProperties}>
          <div className="envelope-collection__paper" data-design={selected.id} style={envelopePaperStyle(selected.id)}>
            {side === 'front'
              ? <>
                  <div className="envelope-collection__insert" aria-hidden="true">
                    <EnvelopeArtwork style={selected.id} />
                    <span>{sampleContent.monogram}</span>
                  </div>
                  <div className="envelope-collection__envelope">
                    <EnvelopeDesign style={selected.id} {...sampleContent} />
                  </div>
                </>
              : <div className="wedding-envelope__face"><EnvelopeBack style={selected.id} monogram={sampleContent.monogram} /></div>}
          </div>
        </div>
        <div className="envelope-collection__footer">
          <div aria-live="polite"><h4>{selected.name}</h4><p>{selected.detail}</p></div>
          {onOpenPreview && <button type="button" onClick={onOpenPreview}><Play size={15} aria-hidden="true" /> Mở thử thiệp</button>}
        </div>
      </div>
    </section>
  );
}
