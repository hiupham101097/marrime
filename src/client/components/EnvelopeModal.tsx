import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { GuestInfo, EnvelopeStyle } from '../../shared/types';
import { formatGuestSalutation } from '../hooks/useGuestInfo';
import {
  EnvelopeBack,
  EnvelopeDesign,
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
  const cleanSalutation = formatGuestSalutation(guest);
  const displayMonogram = waxSealMonogram || `${groomName.charAt(0)} & ${brideName.charAt(0)}`;
  const isFlipped = phase !== 'front';
  const isFlapOpen = phase === 'open';
  const formattedDate =
    dayOfWeek &&
    !weddingDateFormatted.trim().toLocaleLowerCase('vi').startsWith(dayOfWeek.trim().toLocaleLowerCase('vi'))
      ? [dayOfWeek, weddingDateFormatted].filter(Boolean).join(', ')
      : weddingDateFormatted;

  useEffect(() => {
    if (isOpen) {
      actionRef.current?.focus({ preventScroll: true });
    } else {
      setPhase('front');
    }
    return () => {
      window.clearTimeout(openTimer.current);
      openTimer.current = undefined;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isFlapOpen) {
      letterActionRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen, isFlapOpen]);

  const openSeal = () => {
    if (phase !== 'back') return;

    playOpenSound?.();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('open');
      return;
    }

    setPhase('opening');
    openTimer.current = window.setTimeout(() => setPhase('open'), 180);
    void confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.52 },
      colors: [currentStyle.accentGold, '#FFFDF9', currentStyle.looseSealGrad[1]],
      disableForReducedMotion: true,
    })?.catch(() => {});
  };

  const flipEnvelope = () => {
    setPhase((previous) => (previous === 'front' ? 'back' : 'front'));
    actionRef.current?.focus({ preventScroll: true });
  };

  if (!isOpen) return null;

  const hintTexts: Record<typeof phase, string> = {
    front: '✦  Chạm phong bì để lật mặt sau',
    back: '✦  Chạm con dấu sáp để mở thiệp',
    opening: '✦  Đang mở thiệp cưới…',
    open: '',
  };

  return (
    <div
      className="wedding-envelope"
      role="dialog"
      aria-modal="true"
      aria-label="Phong bì thiệp cưới cao cấp"
      data-design={design}
      style={envelopePaperStyle(design)}
    >
      <div className="wedding-envelope__scene">
        {/* Bypass / Direct Entrance button in top corner */}
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
            {currentStyle.sealInscription === 'song_hy' ? '囍' : 'with love'}
          </span>
        </div>

        <div className="wedding-envelope__layout">
          {/* Animated hint badge */}
          {phase !== 'open' && (
            <div className="wedding-envelope__hint" aria-live="polite" aria-atomic="true">
              <span className="wedding-envelope__hint-badge">{hintTexts[phase]}</span>
            </div>
          )}

          <div className="wedding-envelope__stage" data-phase={phase}>
            <div className="wedding-envelope__rotator">
              {/* 1. FRONT OF ENVELOPE */}
              <div className="wedding-envelope__face wedding-envelope__front" inert={isFlipped}>
                <button
                  type="button"
                  className="wedding-envelope__front-button"
                  onClick={flipEnvelope}
                  title="Nhấn để lật phong bì xem mặt sau"
                >
                  <EnvelopeDesign
                    style={design}
                    monogram={displayMonogram}
                    guest={cleanSalutation}
                    couple={`${groomName} & ${brideName}`}
                    date={weddingDateFormatted}
                  />
                </button>
              </div>

              {/* 2. BACK OF ENVELOPE (WITH WAX SEAL & EXTRACTABLE LETTER) */}
              <div className="wedding-envelope__face wedding-envelope__back" inert={!isFlipped}>
                {/* 2A. INNER LETTER CARD */}
                <div className="wedding-envelope__letter" inert={!isFlapOpen}>
                  <div className="wedding-envelope__letter-inner">
                    <p className="wedding-envelope__letter-monogram">{displayMonogram}</p>
                    <p className="wedding-envelope__letter-salutation-label">Trân trọng kính mời</p>
                    <h2 className="wedding-envelope__letter-guest">{cleanSalutation}</h2>
                    <p className="wedding-envelope__letter-occasion">Tới dự lễ thành hôn của</p>

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
                      onClick={onOpenEnvelope}
                    >
                      <Sparkles size={14} className="text-amber-200" aria-hidden="true" />
                      <span>{isPreview ? 'Quay Lại Chọn Mẫu' : 'Bước Vào Không Gian Hôn Lễ'}</span>
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
            <button
              type="button"
              ref={actionRef}
              className="wedding-envelope__action"
              hidden={isFlapOpen}
              onClick={isFlipped ? openSeal : flipEnvelope}
              disabled={phase === 'opening' || isFlapOpen}
            >
              {phase === 'front'
                ? 'Lật xem mặt sau'
                : phase === 'back'
                ? 'Nhấn mở dấu sáp'
                : 'Đang mở thiệp…'}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="wedding-envelope__reverse"
              onClick={flipEnvelope}
              hidden={phase !== 'back'}
            >
              ← Xem lại mặt trước
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
