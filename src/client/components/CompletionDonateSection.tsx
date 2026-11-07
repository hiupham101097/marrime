import React, { useState } from 'react';
import {
  Gift,
  Copy,
  Check,
  QrCode,
  Heart,
  Crown,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { CoupleMember, WeddingTemplate, WeddingDonateConfig } from '../../shared/types';

interface CompletionDonateSectionProps {
  groom: CoupleMember;
  bride: CoupleMember;
  template?: WeddingTemplate;
  donateConfig?: WeddingDonateConfig;
  isCompleted?: boolean; // Triggered when RSVP or Wish submitted
}

export const CompletionDonateSection: React.FC<CompletionDonateSectionProps> = ({
  groom,
  bride,
  template = 'royal',
  donateConfig,
  isCompleted = false,
}) => {
  const config = donateConfig || {
    enabled: true,
    title: 'Hộp Mừng Cưới & Chúc Phúc Tùy Tâm',
    subtitle:
      'Tình cảm và lời chúc của bạn là món quà quý giá nhất. Nếu ở xa không thể về dự tiệc, bạn có thể gửi quà chúc phúc tùy tâm tới Dâu & Rể tại đây.',
    revealMode: 'on_completion_only',
    showQr: false,
    thankYouMessage: 'Dâu & Rể xin chân thành cảm ơn tình cảm thương quý của bạn!',
  };

  if (!config.enabled) return null;

  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);
  const [showQrPreview, setShowQrPreview] = useState(config.showQr ?? false);

  const shouldShow =
    config.revealMode === 'show_always' ||
    (config.revealMode === 'on_completion_only' && (isCompleted || isManuallyOpened)) ||
    (config.revealMode === 'button_trigger' && isManuallyOpened);

  const handleCopy = (text: string, isGroom: boolean) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (isGroom) {
          setCopiedGroom(true);
          setTimeout(() => setCopiedGroom(false), 2000);
        } else {
          setCopiedBride(true);
          setTimeout(() => setCopiedBride(false), 2000);
        }
      })
      .catch(() => {});
  };

  const currentMember = activeTab === 'groom' ? groom : bride;
  const isGroomActive = activeTab === 'groom';

  // Distinct Style Wrappers based on template
  const getTemplateContainerStyle = () => {
    switch (template) {
      case 'fairytale':
        return 'bg-gradient-to-b from-[#FFF0F5] to-[#FFFDF9] border-2 border-pink-200/80 shadow-xl rounded-3xl';
      case 'modern':
        return 'bg-white border border-stone-200 shadow-lg rounded-2xl';
      case 'vintage':
        return 'bg-[#FBF6EE] border-2 border-[#855B14]/40 shadow-xl rounded-3xl relative';
      case 'royal':
      default:
        return 'bg-[#FFFDF9] border-2 border-wedding-gold/50 shadow-luxury rounded-3xl relative ornate-box';
    }
  };

  const getTemplateHeaderIcon = () => {
    switch (template) {
      case 'fairytale':
        return <Heart className="w-5 h-5 text-wedding-rose-500 fill-wedding-rose-400" />;
      case 'modern':
        return <CreditCard className="w-5 h-5 text-stone-700" />;
      case 'vintage':
        return <Sparkles className="w-5 h-5 text-[#855B14]" />;
      case 'royal':
      default:
        return <Crown className="w-5 h-5 text-wedding-gold" />;
    }
  };

  return (
    <section id="donate-box" className="py-16 px-4 bg-transparent relative transition-all">
      <div className="max-w-3xl mx-auto">
        {/* If collapsed and user can manually trigger it */}
        {!shouldShow && (
          <div className="text-center py-6">
            <button
              type="button"
              onClick={() => setIsManuallyOpened(true)}
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-wedding-gold/40 text-stone-800 text-xs sm:text-sm font-semibold shadow-md hover:bg-wedding-cream transition-all cursor-pointer group"
            >
              <Gift className="w-4 h-4 text-wedding-rose-600 group-hover:scale-110 transition-transform" />
              <span>Gửi Món Quà Chúc Phúc Tùy Tâm (Dành Cho Khách Ở Xa)</span>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>
            <p className="text-[11px] text-stone-400 mt-2 font-light">
              Món quà tình cảm tùy tâm gửi tới Dâu & Rể nếu bạn không thể đến chung vui
            </p>
          </div>
        )}

        {/* Revealed Hộp Mừng Cưới Box */}
        {shouldShow && (
          <div className={`${getTemplateContainerStyle()} p-6 sm:p-10 animate-fadeIn`}>
            {/* Template Specific Flourishes */}
            {template === 'royal' && (
              <>
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-wedding-gold/60 rounded-tl" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-wedding-gold/60 rounded-tr" />
              </>
            )}

            {template === 'vintage' && (
              <>
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#855B14]/60" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#855B14]/60" />
              </>
            )}

            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wedding-rose-50 border border-wedding-rose-200 mb-3 shadow-sm">
                {getTemplateHeaderIcon()}
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest block text-stone-500 mb-1">
                {template === 'royal'
                  ? 'RƯƠNG CHÚC PHÚC HOÀNG GIA'
                  : template === 'fairytale'
                  ? 'HỘP THƠ TÌNH & MÓN QUÀ CHÚC PHÚC'
                  : template === 'modern'
                  ? '01 / WEDDING GIFT & BLESSING'
                  : 'HÒM THƯ BƯU CHÍNH DI SẢN'}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 tracking-tight">
                {config.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-light leading-relaxed">
                {config.subtitle}
              </p>

              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
            </div>

            {/* Groom / Bride Switch Tabs */}
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto bg-stone-100 p-1.5 rounded-2xl mb-8 border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveTab('groom')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  isGroomActive
                    ? template === 'modern'
                      ? 'bg-stone-900 text-white shadow'
                      : template === 'fairytale'
                      ? 'bg-pink-600 text-white shadow'
                      : template === 'vintage'
                      ? 'bg-[#064E3B] text-[#FFF7CC] shadow'
                      : 'bg-wedding-burgundy text-wedding-gold-light shadow'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Mừng Chú Rể ({groom.shortName || groom.name})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bride')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  !isGroomActive
                    ? template === 'modern'
                      ? 'bg-stone-900 text-white shadow'
                      : template === 'fairytale'
                      ? 'bg-pink-600 text-white shadow'
                      : template === 'vintage'
                      ? 'bg-[#064E3B] text-[#FFF7CC] shadow'
                      : 'bg-wedding-rose-600 text-white shadow'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Mừng Cô Dâu ({bride.shortName || bride.name})</span>
              </button>
            </div>

            {/* Member Card Details */}
            <div className="max-w-md mx-auto bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm space-y-5">
              {/* Profile Avatar & Bank Recipient */}
              <div className="flex items-center space-x-4 pb-4 border-b border-stone-100">
                <img
                  src={currentMember.avatar}
                  alt={currentMember.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-wedding-gold/50 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-wedding-gold-dark tracking-wider block">
                    {currentMember.role}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-stone-900 truncate">
                    {currentMember.name}
                  </h4>
                  <p className="text-xs text-stone-500 truncate">
                    Ngân hàng: <strong>{currentMember.bankInfo.bankName}</strong>
                  </p>
                </div>
              </div>

              {/* Account Number Box with 1-Click Copy */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Số tài khoản</span>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Chính chủ dâu rể
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-lg sm:text-xl font-bold text-stone-900 tracking-wider">
                    {currentMember.bankInfo.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(currentMember.bankInfo.accountNumber, isGroomActive)
                    }
                    className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors shadow-sm"
                  >
                    {(isGroomActive ? copiedGroom : copiedBride) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xs text-stone-600 pt-1">
                  Chủ TK: <strong className="text-stone-900">{currentMember.bankInfo.accountHolder}</strong>
                </div>
              </div>

              {/* Optional VietQR Preview toggle */}
              {currentMember.bankInfo.qrImage && (
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setShowQrPreview(!showQrPreview)}
                    className="text-xs text-wedding-rose-700 hover:text-wedding-rose-900 font-semibold inline-flex items-center space-x-1.5 cursor-pointer underline underline-offset-4"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{showQrPreview ? 'Ẩn mã QR' : 'Mở xem mã QR chuyển khoản nhanh'}</span>
                  </button>

                  {showQrPreview && (
                    <div className="mt-4 p-3 bg-white rounded-2xl border border-stone-200 shadow-sm max-w-[220px] mx-auto animate-fadeIn">
                      <img
                        src={currentMember.bankInfo.qrImage}
                        alt="QR Code"
                        className="w-full h-auto object-contain rounded-xl"
                      />
                      <span className="text-[10px] text-stone-400 mt-2 block">
                        Quét bằng ứng dụng ngân hàng bất kỳ
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Polite Thank You Message */}
              <p className="text-xs text-center text-stone-500 italic pt-2 border-t border-stone-100">
                "{config.thankYouMessage}"
              </p>
            </div>

            {/* Collapse button if opened manually */}
            {isManuallyOpened && config.revealMode !== 'show_always' && (
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => setIsManuallyOpened(false)}
                  className="text-xs text-stone-400 hover:text-stone-600 cursor-pointer inline-flex items-center space-x-1"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Thu gọn bảng này</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

