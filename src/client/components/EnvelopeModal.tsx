import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { GuestInfo, EnvelopeStyle } from '../../shared/types';
import { formatGuestSalutation } from '../hooks/useGuestInfo';
import {
  EnvelopeArtwork,
  EnvelopeBack,
  EnvelopeDesign,
  EnvelopeLiner,
  envelopePalettes,
  envelopePaperStyle,
} from './EnvelopeDesign';

interface EnvelopeModalProps {
  isOpen: boolean;
  isPreview?: boolean;
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
  isPreview = false,
  onOpenEnvelope,
  guest,
  groomName,
  brideName,
  weddingDateFormatted,
  eventAddress,
  venueName,
  hallName,
  eventTime,
  dayOfWeek,
  lunarDate,
  playOpenSound,
  envelopeStyle = 'royal_velvet',
  waxSealMonogram,
}) => {
  const design = Object.hasOwn(envelopePalettes, envelopeStyle) ? envelopeStyle : 'royal_velvet';
  const currentStyle = envelopePalettes[design];
  const [phase, setPhase] = useState<'front' | 'back' | 'opening' | 'open'>('front');
  const actionRef = useRef<HTMLButtonElement>(null);
  const letterActionRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<number>(undefined);
  const autoAdvanceTimer = useRef<number>(undefined);
  const cleanSalutation = formatGuestSalutation(guest);
  const displayMonogram = waxSealMonogram || `${groomName.charAt(0)} & ${brideName.charAt(0)}`;
  const isFlipped = phase !== 'front';
  const isFlapOpen = phase === 'open';
  const formattedDate =
    dayOfWeek &&
    !weddingDateFormatted.trim().toLocaleLowerCase('vi').startsWith(dayOfWeek.trim().toLocaleLowerCase('vi'))
      ? [dayOfWeek, weddingDateFormatted].filter(Boolean).join(', ')
      : weddingDateFormatted;

  // Dynamic 3D interactive spatial parallax & touch swipe
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const stage = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - stage.left) / stage.width;
    const y = (e.clientY - stage.top) / stage.height;
    const tiltX = (y - 0.5) * -14;
    const tiltY = (x - 0.5) * 16;
    setTilt({
      x: Math.max(-14, Math.min(14, tiltX)),
      y: Math.max(-16, Math.min(16, tiltY)),
      glareX: Math.round(x * 100),
      glareY: Math.round(y * 100),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    if (touch) {
      const diffX = touch.clientX - touchStartRef.current.x;
      const diffY = touch.clientY - touchStartRef.current.y;
      if (Math.abs(diffX) > 45 && Math.abs(diffY) < 60 && phase !== 'open' && phase !== 'opening') {
        flipEnvelope();
      }
    }
    touchStartRef.current = null;
  };

  useEffect(() => {
    if (isOpen) {
      actionRef.current?.focus({ preventScroll: true });
    } else {
      setPhase('front');
    }
    return () => {
      window.clearTimeout(openTimer.current);
      window.clearTimeout(autoAdvanceTimer.current);
      openTimer.current = undefined;
      autoAdvanceTimer.current = undefined;
    };
  }, [isOpen]);

  // Keyboard accessibility: Escape key to skip directly to website
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenEnvelope();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onOpenEnvelope]);

  useEffect(() => {
    if (isOpen && isFlapOpen) {
      letterActionRef.current?.focus({ preventScroll: true });

      // In real wedding guest mode (not studio preview), gently auto-advance to site after 3s
      if (!isPreview) {
        window.clearTimeout(autoAdvanceTimer.current);
        autoAdvanceTimer.current = window.setTimeout(() => {
          onOpenEnvelope();
        }, 3200);
      }
    }
  }, [isOpen, isFlapOpen, isPreview, onOpenEnvelope]);

  const triggerSealOpen = () => {
    playOpenSound?.();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('open');
      return;
    }

    setPhase('opening');
    openTimer.current = window.setTimeout(() => setPhase('open'), 220);
    void confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.52 },
      colors: [currentStyle.accentGold, '#FFFDF9', currentStyle.looseSealGrad[0]],
      disableForReducedMotion: true,
    })?.catch(() => {});
  };

  const openSeal = () => {
    if (phase !== 'back') return;
    triggerSealOpen();
  };

  const flipEnvelope = () => {
    setPhase((previous) => (previous === 'front' ? 'back' : 'front'));
    actionRef.current?.focus({ preventScroll: true });
  };

  // 1-Click Smooth Ritual: Tapping envelope on front immediately flips and opens!
  const handleOpenFlow = () => {
    if (phase === 'front') {
      setPhase('back');
      playOpenSound?.();
      window.setTimeout(() => {
        triggerSealOpen();
      }, 420);
    } else if (phase === 'back') {
      openSeal();
    } else if (phase === 'open') {
      onOpenEnvelope();
    }
  };

  if (!isOpen) return null;

  const hintTexts: Record<typeof phase, string> = {
    front: '✦  Chạm để mở thiệp cưới cao cấp',
    back: '✦  Chạm con dấu sáp để mở thiệp',
    opening: '✦  Đang mở thiệp cưới…',
    open: '✦  Chúc mừng ngày vui trăm năm',
  };

  return (
    <div
      className="wedding-envelope"
      role="dialog"
      aria-modal="true"
      aria-label="Phong bì thiệp cưới cao cấp"
      data-design={design}
      style={envelopePaperStyle(design)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Living Atmospheric Space (Bóng đổ nắng qua rèm & bụi vàng atelier bay lơ lửng) */}
      <div className="wedding-envelope__ambient-shadows" aria-hidden="true" />
      <div className="wedding-envelope__ambient-motes" aria-hidden="true" />

      <div className="wedding-envelope__scene">
        {/* Bypass / Direct Entrance button in top corner (Safe on iOS Dynamic Island) */}
        <button
          type="button"
          className="wedding-envelope__skip"
          onClick={onOpenEnvelope}
          title="Bỏ qua hiệu ứng mở thiệp"
        >
          {isPreview ? 'Đóng xem thử' : 'Vào thẳng website'} <ArrowUpRight size={14} aria-hidden="true" />
        </button>

        {/* Flatlay loose wax seal accessory on the fabric backdrop (7799 Storyteller signature) */}
        <div className="wedding-envelope__flatlay-seal" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs>
              <radialGradient id="flatlayLooseSealGrad" cx="34%" cy="25%" r="78%">
                <stop offset="0%" stopColor={currentStyle.looseSealGrad[0]} />
                <stop offset="42%" stopColor={currentStyle.looseSealGrad[1]} />
                <stop offset="85%" stopColor={currentStyle.looseSealGrad[2]} />
              </radialGradient>
            </defs>
            <path
              fill="url(#flatlayLooseSealGrad)"
              d="M50 4C64 1 72 8 83 14C96 21 94 33 98 45C104 58 93 70 89 82C85 94 74 93 61 98C48 103 38 96 26 94C13 91 13 78 7 67C1 55 8 44 9 33C11 20 25 19 35 11C41 6 47 7 50 4Z"
            />
            <circle cx="50" cy="50" r="30" fill="rgba(0,0,0,0.15)" stroke="rgba(255,240,190,0.5)" strokeWidth="1.2" />
          </svg>
          <span className="wedding-envelope__flatlay-seal-text">
            {displayMonogram || (currentStyle.sealInscription === 'song_hy' ? '囍' : 'with love')}
          </span>
        </div>

        {/* Flatlay Antique Brass Letter-Opener / Calligraphy Pen Accessory */}
        <div className="wedding-envelope__flatlay-tool" aria-hidden="true">
          <svg viewBox="0 0 32 160" className="wedding-envelope__flatlay-tool-svg">
            <defs>
              <linearGradient id="brassToolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2C6" />
                <stop offset="35%" stopColor="#DFB76C" />
                <stop offset="70%" stopColor="#9C7328" />
                <stop offset="100%" stopColor="#5E4010" />
              </linearGradient>
            </defs>
            {/* Ornate Handle */}
            <circle cx="16" cy="18" r="10" fill="none" stroke="url(#brassToolGrad)" strokeWidth="3" />
            <circle cx="16" cy="18" r="4" fill="url(#brassToolGrad)" />
            <rect x="13" y="28" width="6" height="18" rx="2" fill="url(#brassToolGrad)" />
            {/* Tapered Blade */}
            <path d="M13 46 L19 46 L17.5 145 Q16 156 14.5 145 Z" fill="url(#brassToolGrad)" />
            <line x1="16" y1="46" x2="16" y2="148" stroke="#FFF7DD" strokeWidth="0.8" opacity="0.6" />
          </svg>
        </div>

        <div className="wedding-envelope__layout">
          {/* Animated hint badge */}
          <div className="wedding-envelope__hint" aria-live="polite" aria-atomic="true">
            <span className="wedding-envelope__hint-badge">{hintTexts[phase]}</span>
          </div>

          <div
            className="wedding-envelope__stage"
            data-phase={phase}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              '--tilt-x': `${tilt.x}deg`,
              '--tilt-y': `${tilt.y}deg`,
              '--glare-x': `${tilt.glareX}%`,
              '--glare-y': `${tilt.glareY}%`,
            } as React.CSSProperties}
          >
            <div className="wedding-envelope__rotator">
              {/* 1. FRONT OF ENVELOPE */}
              <div className="wedding-envelope__face wedding-envelope__front" inert={isFlipped}>
                <button
                  type="button"
                  className="wedding-envelope__front-button"
                  onClick={handleOpenFlow}
                  title="Nhấn để mở thiệp cưới"
                >
                  <EnvelopeDesign
                    style={design}
                    monogram={displayMonogram}
                    guest={cleanSalutation}
                    couple={`${groomName} & ${brideName}`}
                    date={weddingDateFormatted}
                  />

                  {/* Subtle Interactive Invitation Callout */}
                  <div className="wedding-envelope__front-tap-cue" aria-hidden="true">
                    <Sparkles size={13} className="text-amber-300 animate-pulse" />
                    <span>Chạm để mở thiệp</span>
                  </div>
                </button>
              </div>

              {/* 2. BACK OF ENVELOPE (WITH WAX SEAL & EXTRACTABLE LETTER) */}
              <div className="wedding-envelope__face wedding-envelope__back" inert={!isFlipped}>
                {/* 2A. INNER LETTER CARD (Completely hidden inside pocket when closed, slides up when open) */}
                <div
                  className="wedding-envelope__letter"
                  data-open={isFlapOpen}
                  onClick={isFlapOpen ? onOpenEnvelope : undefined}
                  role={isFlapOpen ? 'button' : undefined}
                  tabIndex={isFlapOpen ? 0 : -1}
                  onKeyDown={isFlapOpen ? (e) => e.key === 'Enter' && onOpenEnvelope() : undefined}
                  title={isFlapOpen ? 'Chạm lá thiệp để bước vào không gian hôn lễ' : undefined}
                >
                  <div className="wedding-envelope__letter-inner">
                    {/* Watermark Crest Background */}
                    <div className="wedding-envelope__letter-watermark" aria-hidden="true">
                      {displayMonogram}
                    </div>

                    <p className="wedding-envelope__letter-monogram">{displayMonogram}</p>
                    <p className="wedding-envelope__letter-salutation-label">TRÂN TRỌNG KÍNH MỜI QUAN KHÁCH</p>
                    <h2 className="wedding-envelope__letter-guest">{cleanSalutation}</h2>

                    <div className="wedding-envelope__letter-divider-ornament" aria-hidden="true">
                      <span className="wedding-envelope__letter-line" />
                      <span className="wedding-envelope__letter-gem">✦</span>
                      <span className="wedding-envelope__letter-line" />
                    </div>

                    <p className="wedding-envelope__letter-occasion">Tới dự lễ thành hôn trăm năm của</p>

                    <h3 className="wedding-envelope__letter-couple">
                      {groomName}{' '}
                      <span className="wedding-envelope__letter-amp">&amp;</span>{' '}
                      {brideName}
                    </h3>

                    <div className="wedding-envelope__letter-details">
                      <p className="wedding-envelope__letter-date">
                        {[formattedDate, eventTime].filter(Boolean).join(' · ')}
                      </p>
                      {lunarDate && (
                        <p className="wedding-envelope__letter-lunar">{lunarDate}</p>
                      )}
                      {(venueName || hallName) && (
                        <p className="wedding-envelope__letter-venue">
                          {[venueName, hallName].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      {eventAddress && (
                        <p className="wedding-envelope__letter-address">{eventAddress}</p>
                      )}
                    </div>

                    <button
                      ref={letterActionRef}
                      type="button"
                      className="wedding-envelope__letter-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEnvelope();
                      }}
                    >
                      <Sparkles size={14} className="text-amber-200" aria-hidden="true" />
                      <span>{isPreview ? 'Đóng Xem Thử' : 'Bước Vào Không Gian Hôn Lễ'}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* 2B. ENVELOPE BACK POCKET & FLAP & WAX SEAL */}
                <EnvelopeBack
                  style={design}
                  monogram={displayMonogram}
                  onOpen={openSeal}
                  sealed={phase === 'back'}
                />
              </div>
            </div>
          </div>

          {/* Controls underneath the envelope */}
          <div className="wedding-envelope__controls">
            {phase === 'front' ? (
              <div className="wedding-envelope__btn-group">
                <button
                  type="button"
                  ref={actionRef}
                  className="wedding-envelope__action wedding-envelope__action--primary"
                  onClick={handleOpenFlow}
                >
                  <Sparkles size={16} className="text-amber-300" aria-hidden="true" />
                  <span>Mở Thiệp Cưới</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="wedding-envelope__reverse"
                  onClick={flipEnvelope}
                >
                  Lật xem mặt sau & dấu sáp →
                </button>
              </div>
            ) : phase === 'back' ? (
              <div className="wedding-envelope__btn-group">
                <button
                  type="button"
                  ref={actionRef}
                  className="wedding-envelope__action wedding-envelope__action--primary"
                  onClick={openSeal}
                >
                  <Sparkles size={16} className="text-amber-300" aria-hidden="true" />
                  <span>Nhấn Mở Dấu Sáp</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="wedding-envelope__reverse"
                  onClick={flipEnvelope}
                >
                  ← Xem lại mặt trước
                </button>
              </div>
            ) : (
              <div className="wedding-envelope__btn-group">
                <button
                  type="button"
                  className="wedding-envelope__action wedding-envelope__action--primary"
                  onClick={onOpenEnvelope}
                >
                  <Sparkles size={16} className="text-amber-300" aria-hidden="true" />
                  <span>{isPreview ? 'Đóng Xem Thử' : 'Bước Vào Không Gian Hôn Lễ'}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
