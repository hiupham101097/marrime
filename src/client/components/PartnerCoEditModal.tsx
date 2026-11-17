import React, { useState } from 'react';
import {
  HeartHandshake,
  Users,
  Copy,
  Check,
  X,
  QrCode,
  Sparkles,
  Smartphone,
  Laptop,
  Share2,
  ShieldCheck,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerHaptic } from '../utils/soundEffects';

interface PartnerCoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretPin: string;
  weddingSlug: string;
  groomName: string;
  brideName: string;
}

export const PartnerCoEditModal: React.FC<PartnerCoEditModalProps> = ({
  isOpen,
  onClose,
  secretPin,
  weddingSlug,
  groomName,
  brideName,
}) => {
  if (!isOpen) return null;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);
  const [copiedZalo, setCopiedZalo] = useState(false);

  const cleanGroom = groomName || 'Chú Rể';
  const cleanBride = brideName || 'Cô Dâu';
  const effectivePin = secretPin || '123456';

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://marrime.pages.dev';
  const coEditUrl = `${baseUrl}/studio?code=${encodeURIComponent(effectivePin)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(coEditUrl)}&margin=8`;

  const zaloMessage =
    `Mình ơi! Cùng vào chuẩn bị thiệp cưới online độc bản của tụi mình nhé!\n\n` +
    `👉 Bấm mở Studio chỉnh sửa ngay trên điện thoại/laptop:\n${coEditUrl}\n\n` +
    `🔑 Mã PIN đồng bộ bí mật: ${effectivePin}\n\n` +
    `Mọi thay đổi về ảnh cưới, danh sách khách mời và lịch trình sẽ tự động đồng bộ tức thì giữa hai đứa mình! 💍`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(coEditUrl);
    setCopiedLink(true);
    triggerHaptic([30]);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(effectivePin);
    setCopiedPin(true);
    triggerHaptic([30]);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const handleCopyZalo = () => {
    navigator.clipboard.writeText(zaloMessage);
    setCopiedZalo(true);
    triggerHaptic([40, 80]);
    void confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#DFB76C', '#8B1A32', '#FDE047'],
    });
    setTimeout(() => setCopiedZalo(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn select-none">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl border-2 border-[#DFB76C]/60 shadow-[0_20px_70px_rgba(0,0,0,0.5)] overflow-hidden my-auto flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#5C0E1F] via-[#8B1A32] to-[#5C0E1F] p-5 text-white flex items-center justify-between border-b border-[#DFB76C]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DFB76C] to-[#9C7328] text-[#5C0E1F] flex items-center justify-center shadow-md">
              <HeartHandshake className="w-5 h-5 text-[#5C0E1F]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[10px] tracking-widest uppercase font-bold text-amber-200">
                  CO-EDITING • ĐỒNG QUẢN TRỊ DÂU & RỂ
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-50 leading-tight">
                Mời Bạn Đời Cùng Chuẩn Bị Thiệp Cưới
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Couple Illustration Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white border border-amber-300 flex items-center justify-center font-serif text-sm font-bold text-[#8B1A32] shadow-xs">
                🤵
              </div>
              <div>
                <span className="text-xs font-bold text-stone-800 block">
                  Đồng bộ tức thì đa thiết bị
                </span>
                <span className="text-[11px] text-stone-600">
                  Chú rể soạn trên laptop, cô dâu kiểm tra danh sách khách trên iPhone!
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white border border-amber-300 flex items-center justify-center font-serif text-sm font-bold text-[#8B1A32] shadow-xs">
              👰
            </div>
          </div>

          {/* Secret PIN Box */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500 block">
              MÃ BÍ MẬT ĐỒNG QUẢN TRỊ (SECRET PIN)
            </span>
            <div className="flex items-center justify-between">
              <div className="font-mono text-2xl font-bold tracking-widest text-[#8B1A32]">
                {effectivePin}
              </div>
              <button
                type="button"
                onClick={handleCopyPin}
                className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
              >
                {copiedPin ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPin ? 'Đã Chép' : 'Chép Mã PIN'}</span>
              </button>
            </div>
          </div>

          {/* QR Code & Direct Link */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Left: QR Code */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-stone-200 text-center space-y-2">
              <img
                src={qrUrl}
                alt="QR Code Quét Mở Studio"
                className="w-36 h-36 object-contain"
              />
              <span className="text-[10px] text-stone-500 font-medium">
                Quét camera điện thoại để mở thẳng trang sửa thiệp
              </span>
            </div>

            {/* Right: Direct Link & Zalo Share */}
            <div className="sm:col-span-7 space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-stone-700 block">
                  Link chỉnh sửa trực tiếp (Đã gắn sẵn mã PIN):
                </span>
                <div className="flex items-center space-x-1.5">
                  <input
                    type="text"
                    readOnly
                    value={coEditUrl}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-[11px] font-mono text-stone-800 select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 shrink-0 cursor-pointer transition-colors"
                    title="Sao chép link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Zalo 1-Click Message Button */}
              <button
                type="button"
                onClick={handleCopyZalo}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md cursor-pointer transition-all"
              >
                <Send className="w-3.5 h-3.5 text-blue-200" />
                <span>{copiedZalo ? 'Đã Chép Tin Nhắn Zalo!' : 'Chép Tin Nhắn Mời Vợ / Chồng'}</span>
              </button>
            </div>
          </div>

          {/* Privacy & Cloud Architecture Note */}
          <div className="p-3.5 rounded-xl bg-stone-100/70 text-stone-600 text-[11px] flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Bảo Mật & Hoàn Toàn Miễn Phí:</strong> Dữ liệu thiệp cưới được lưu trữ mã hóa và đồng bộ tức thì trên mạng lưới toàn cầu Cloudflare Edge. Hai bạn có thể an tâm chỉnh sửa cùng lúc mà không lo mất dữ liệu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
