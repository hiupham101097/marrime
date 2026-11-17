import React, { useState } from 'react';
import confetti from 'canvas-confetti';
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
  Coins,
  Send,
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
    showQr: true,
    thankYouMessage: 'Dâu & Rể xin chân thành cảm ơn tình cảm thương quý của bạn!',
  };

  if (!config.enabled) return null;

  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);
  const [showQrPreview, setShowQrPreview] = useState(config.showQr ?? true);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

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
        void confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#DFB76C', '#FFD700', '#B81E38', '#FFF'],
        })?.catch(() => {});
      })
      .catch(() => {});
  };

  const currentMember = activeTab === 'groom' ? groom : bride;
  const isGroomActive = activeTab === 'groom';

  // Amount preset definitions (Vietnamese wedding tradition lucky amounts)
  const amountPresets = [
    { label: '200.000đ', value: 200000, tag: 'Cát Tường' },
    { label: '500.000đ', value: 500000, tag: 'Như Ý' },
    { label: '1.000.000đ', value: 1000000, tag: 'Trăm Năm Hạnh Phúc' },
    { label: '2.000.000đ', value: 2000000, tag: 'Viên Mãn' },
  ];

  // Map popular Vietnamese bank names to VietQR short bin IDs
  const getBankShortCode = (bankName: string) => {
    const b = bankName.toLowerCase();
    if (b.includes('vcb') || b.includes('vietcom')) return 'vietcombank';
    if (b.includes('tcb') || b.includes('techcom')) return 'techcombank';
    if (b.includes('mb') || b.includes('quan doi')) return 'mbbank';
    if (b.includes('acb')) return 'acb';
    if (b.includes('bidv')) return 'bidv';
    if (b.includes('vpb') || b.includes('vpbank')) return 'vpbank';
    if (b.includes('tpbank')) return 'tpbank';
    if (b.includes('vib')) return 'vib';
    if (b.includes('agribank')) return 'agribank';
    return 'mbbank'; // safe default
  };

  // Generate dynamic official VietQR Napas247 URL with amount and memo preset
  const bankCode = getBankShortCode(currentMember.bankInfo.bankName);
  const cleanAccount = currentMember.bankInfo.accountNumber.replace(/\s+/g, '');
  const transferMemo = encodeURIComponent(`Mung cuoi ${groom.shortName || 'Tuan Anh'} ${bride.shortName || 'Mai Phuong'}`);
  const dynamicQrUrl = `https://img.vietqr.io/image/${bankCode}-${cleanAccount}-compact2.png?amount=${
    selectedAmount || ''
  }&addInfo=${transferMemo}&accountName=${encodeURIComponent(currentMember.bankInfo.accountHolder)}`;

  return (
    <section id="donate-box" className="py-20 px-4 bg-transparent relative transition-all">
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
              <span>Gửi Món Quà Chúc Phúc Tùy Tâm (Bao Lì Xì May Mắn)</span>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>
            <p className="text-[11px] text-stone-400 mt-2 font-light">
              Món quà tình cảm tùy tâm gửi tới Dâu &amp; Rể nếu bạn không thể đến chung vui
            </p>
          </div>
        )}

        {/* Revealed Hộp Mừng Cưới Box */}
        {shouldShow && (
          <div className="bg-[#FFFDF9] border-2 border-wedding-gold/50 shadow-luxury rounded-3xl p-6 sm:p-10 relative ornate-box animate-fadeIn">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B1A32] to-[#5C0E1F] text-amber-200 mb-3 shadow-md border border-amber-300/40">
                <span className="font-serif font-bold text-2xl">囍</span>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest block text-[#A2682A] mb-1">
                BAO LÌ XÌ MAY MẮN &amp; HỘP MỪNG CƯỚI 3D
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                {config.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-light leading-relaxed">
                {config.subtitle}
              </p>

              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
            </div>

            {/* Groom / Bride Switch Tabs */}
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto bg-stone-100 p-1.5 rounded-2xl mb-6 border border-stone-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('groom');
                  setSelectedAmount(null);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  isGroomActive
                    ? 'bg-wedding-burgundy text-wedding-gold-light shadow'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Mừng Chú Rể ({groom.shortName || groom.name})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('bride');
                  setSelectedAmount(null);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  !isGroomActive
                    ? 'bg-wedding-rose-600 text-white shadow'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Mừng Cô Dâu ({bride.shortName || bride.name})</span>
              </button>
            </div>

            {/* Lucky Amount Presets */}
            <div className="max-w-md mx-auto mb-6">
              <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block text-center mb-2.5">
                Chọn Định Mức Lì Xì May Mắn (Tùy Chọn):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {amountPresets.map((preset) => {
                  const isSelected = selectedAmount === preset.value;
                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(isSelected ? null : preset.value);
                        void confetti({
                          particleCount: 20,
                          spread: 50,
                          origin: { y: 0.8 },
                          colors: ['#DFB76C', '#FFD700', '#B81E38'],
                        })?.catch(() => {});
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#8B1A32] bg-rose-50 text-[#8B1A32] font-bold ring-2 ring-[#8B1A32]/30 shadow-2xs'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                      }`}
                    >
                      <span className="text-xs font-bold">{preset.label}</span>
                      <span className="text-[9px] text-[#A2682A] font-medium mt-0.5">
                        {preset.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
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
                  <span>Số tài khoản thụ hưởng</span>
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

              {/* Dynamic VietQR Preview toggle */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowQrPreview(!showQrPreview)}
                  className="text-xs text-wedding-rose-700 hover:text-wedding-rose-900 font-semibold inline-flex items-center space-x-1.5 cursor-pointer underline underline-offset-4"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>
                    {showQrPreview
                      ? 'Ẩn mã QR'
                      : 'Mở xem mã QR VietQR Napas247 chuyển khoản 1-chạm'}
                  </span>
                </button>

                {showQrPreview && (
                  <div className="mt-4 p-4 bg-white rounded-2xl border-2 border-stone-200 shadow-md max-w-[240px] mx-auto animate-fadeIn space-y-2">
                    <img
                      src={dynamicQrUrl}
                      alt="VietQR Code"
                      className="w-full h-auto object-contain rounded-xl"
                      onError={(e) => {
                        // Fallback to static qr image if dynamic VietQR network fails
                        if (currentMember.bankInfo.qrImage) {
                          (e.target as HTMLImageElement).src = currentMember.bankInfo.qrImage;
                        }
                      }}
                    />
                    <div className="text-[10px] text-stone-500 font-medium">
                      {selectedAmount ? (
                        <span className="text-[#8B1A32] font-bold block">
                          Đã cài sẵn số tiền: {selectedAmount.toLocaleString('vi-VN')}đ
                        </span>
                      ) : (
                        <span>Quét bằng app ngân hàng hoặc Momo</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

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
