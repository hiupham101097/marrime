import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { GuestInfo, EnvelopeStyle } from '../../shared/types';
import { formatGuestSalutation } from '../hooks/useGuestInfo';
import { EnvelopeArtwork, EnvelopeBack, EnvelopeDesign, envelopePalettes, envelopePaperStyle } from './EnvelopeDesign';

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
  const formattedDate = dayOfWeek && !weddingDateFormatted.trim().toLocaleLowerCase('vi').startsWith(dayOfWeek.trim().toLocaleLowerCase('vi'))
    ? [dayOfWeek, weddingDateFormatted].filter(Boolean).join(', ')
    : weddingDateFormatted;

  useEffect(() => {
    if (isOpen) actionRef.current?.focus({ preventScroll: true });
    else setPhase('front');
    return () => {
      window.clearTimeout(openTimer.current);
      openTimer.current = undefined;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && isFlapOpen) letterActionRef.current?.focus({ preventScroll: true });
  }, [isOpen, isFlapOpen]);

  const openSeal = () => {
    if (phase !== 'back') return;

    playOpenSound?.();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('open');
      return;
    }

    setPhase('opening');
    openTimer.current = window.setTimeout(() => setPhase('open'), 160);
    void confetti({
      particleCount: 48,
      spread: 68,
      origin: { y: 0.52 },
      colors: [currentStyle.accentGold, '#FFFDF9', currentStyle.looseSealGrad[1]],
      disableForReducedMotion: true,
    })?.catch(() => {});
  };

  const flipEnvelope = () => {
    setPhase((previous) => previous === 'front' ? 'back' : 'front');
    actionRef.current?.focus({ preventScroll: true });
  };

  if (!isOpen) return null;

  const hintTexts: Record<typeof phase, string> = {
    front: '✦  Chạm phong bì để lật mặt sau',
    back: '✦  Chạm con dấu sáp để mở thiệp',
    opening: '✦  Đang mở thiệp…',
    open: '',
  };

  return (
    <div
      className="wedding-envelope"
      role="dialog"
      aria-modal="true"
      aria-label="Phong bì thiệp cưới"
      data-design={design}
      style={envelopePaperStyle(design)}
    >
      <div className="wedding-envelope__scene">
        <button type="button" className="wedding-envelope__skip" onClick={onOpenEnvelope}>
          {isPreview ? 'Đóng xem thử' : 'Xem trang cưới'} <ArrowUpRight size={14} aria-hidden="true" />
        </button>

        <div className="wedding-envelope__layout">
          {/* Animated hint badge */}
          {phase !== 'open' && (
            <div className="wedding-envelope__hint" aria-live="polite" aria-atomic="true">
              <span className="wedding-envelope__hint-badge">
                {hintTexts[phase]}
              </span>
            </div>
          )}

          <div className="wedding-envelope__stage" data-phase={phase}>
            <div className="wedding-envelope__rotator">
              <div className="wedding-envelope__face wedding-envelope__front" inert={isFlipped}>
                <button type="button" className="wedding-envelope__front-button" onClick={flipEnvelope} tabIndex={-1}>
                  <EnvelopeDesign
                    style={design}
                    monogram={displayMonogram}
                    guest={cleanSalutation}
                    couple={`${groomName} & ${brideName}`}
                    date={weddingDateFormatted}
                  />
                </button>
              </div>

              <div className="wedding-envelope__face wedding-envelope__back" inert={!isFlipped}>
                <div className="wedding-envelope__letter" inert={!isFlapOpen}>
                  <div className="wedding-envelope__letter-art" aria-hidden="true"><EnvelopeArtwork style={design} /></div>
                  <p className="wedding-envelope__letter-label">Trân trọng kính mời</p>
                  <h2>{groomName} <span>&amp;</span> {brideName}</h2>
                  <p className="wedding-envelope__letter-occasion">Lễ cưới</p>
                  <div className="wedding-envelope__letter-details">
                    <p className="wedding-envelope__letter-date">{[formattedDate, eventTime].filter(Boolean).join(' · ')}</p>
                    {lunarDate && <p>{lunarDate}</p>}
                    {(venueName || hallName) && <p>{[venueName, hallName].filter(Boolean).join(' · ')}</p>}
                    {eventAddress && <p>{eventAddress}</p>}
                  </div>
                  <button ref={letterActionRef} type="button" onClick={onOpenEnvelope}>
                    {isPreview ? 'Quay lại chọn mẫu' : 'Xem trang cưới'}
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>

                <EnvelopeBack style={design} monogram={displayMonogram} onOpen={openSeal} sealed={phase === 'back'} />
              </div>
            </div>
          </div>

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
                ? 'Lật phong bì'
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
              ← Xem mặt trước
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
