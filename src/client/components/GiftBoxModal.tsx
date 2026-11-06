import React, { useState } from 'react';
import { Gift, X, Copy, Check, QrCode } from 'lucide-react';
import { CoupleMember } from '../../shared/types';

interface GiftBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  groom: CoupleMember;
  bride: CoupleMember;
}

export const GiftBoxModal: React.FC<GiftBoxModalProps> = ({
  isOpen,
  onClose,
  groom,
  bride,
}) => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, isGroom: boolean) => {
    navigator.clipboard.writeText(text).then(() => {
      if (isGroom) {
        setCopiedGroom(true);
        setTimeout(() => setCopiedGroom(false), 2000);
      } else {
        setCopiedBride(true);
        setTimeout(() => setCopiedBride(false), 2000);
      }
    }).catch(() => {});
  };

  const currentMember = activeTab === 'groom' ? groom : bride;
  const isGroomActive = activeTab === 'groom';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-wedding-gold/40 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-wedding-rose-100 text-wedding-rose-600 flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-wedding-burgundy">
            Hộp Mừng Cưới
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Gửi gắm yêu thương & lời chúc phúc từ phương xa đến dâu rể
          </p>
        </div>

        {/* Tabs Groom / Bride */}
        <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1.5 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('groom')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isGroomActive
                ? 'bg-wedding-burgundy text-wedding-gold-light shadow'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Mừng Chú Rể (Tuấn Anh)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bride')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              !isGroomActive
                ? 'bg-wedding-rose-600 text-white shadow'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Mừng Cô Dâu (Mai Phương)
          </button>
        </div>

        {/* Bank & QR Details */}
        <div className="bg-wedding-cream rounded-2xl p-6 border border-wedding-gold/30 text-center">
          {/* VietQR Code preview */}
          {currentMember.bankInfo.qrImage && (
            <div className="w-48 h-48 mx-auto bg-white p-2 rounded-2xl shadow-sm border border-stone-200 mb-4 overflow-hidden">
              <img
                src={currentMember.bankInfo.qrImage}
                alt="VietQR Code"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <div className="space-y-2 text-xs sm:text-sm text-stone-700">
            <p>
              <span className="text-stone-400">Ngân hàng: </span>
              <strong className="text-stone-900">{currentMember.bankInfo.bankName}</strong>
            </p>
            <p>
              <span className="text-stone-400">Chủ tài khoản: </span>
              <strong className="text-stone-900">{currentMember.bankInfo.accountHolder}</strong>
            </p>

            <div className="flex items-center justify-center space-x-2 pt-2">
              <span className="text-stone-400">Số tài khoản: </span>
              <span className="font-mono font-bold text-wedding-burgundy text-base">
                {currentMember.bankInfo.accountNumber}
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(currentMember.bankInfo.accountNumber, isGroomActive)
                }
                className="p-1.5 rounded-lg bg-stone-200 hover:bg-wedding-rose-100 text-stone-700 hover:text-wedding-rose-700 transition-colors cursor-pointer"
                title="Sao chép số tài khoản"
              >
                {(isGroomActive ? copiedGroom : copiedBride) ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-stone-400 mt-4 italic">
          Mọi lời chúc và tình cảm của quý vị đều là món quà quý giá vô hạn đối với chúng mình!
        </p>
      </div>
    </div>
  );
};

