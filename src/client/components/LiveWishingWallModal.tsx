import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, Minimize2, X, Heart, QrCode, MessageCircleHeart, Users } from 'lucide-react';
import { WishMessage } from '../../shared/types';

interface LiveWishingWallModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
  brideName: string;
  weddingDateFormatted: string;
  wishes: WishMessage[];
  weddingSlug: string;
}

export const LiveWishingWallModal: React.FC<LiveWishingWallModalProps> = ({
  isOpen,
  onClose,
  groomName,
  brideName,
  weddingDateFormatted,
  wishes,
  weddingSlug,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-cycle through wishes every 5.5 seconds
  useEffect(() => {
    if (!isOpen || wishes.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wishes.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isOpen, wishes.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  if (!isOpen) return null;

  const currentWish = wishes[currentIndex] || wishes[0];
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://marrime.pages.dev';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    `${baseUrl}/?w=${weddingSlug}#wishes`
  )}&margin=8`;

  return (
    <div className="fixed inset-0 z-50 bg-[#1A050B] text-[#FFFDF9] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden animate-fadeIn">
      {/* Ambient Drifting Golden Starlight */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_40%,rgba(223,183,108,0.18)_0%,transparent_75%)]" />

      {/* Top Floating Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#DFB76C]/30 pb-4">
        {/* Left: Couple Identity */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1A32] via-[#5C1626] to-[#3B0A16] border border-[#DFB76C] flex items-center justify-center font-serif text-lg font-bold text-amber-200 shadow-lg">
            {groomName.charAt(0)}&{brideName.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-amber-100 leading-tight">
              {groomName} & {brideName}
            </h1>
            <span className="text-[11px] text-[#DFB76C] tracking-[0.25em] uppercase font-bold block mt-0.5">
              LỄ THÀNH HÔN • {weddingDateFormatted}
            </span>
          </div>
        </div>

        {/* Center: Live Wishes Counter */}
        <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#DFB76C]/40 text-amber-200 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Màn Hình Chúc Phúc Thời Gian Thực • {wishes.length} Lời Chúc Đã Gửi</span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/20 transition-colors cursor-pointer"
            title="Bật/Tắt Toàn Màn Hình LED (F11)"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-colors cursor-pointer"
            title="Đóng màn hình chiếu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Stage */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 py-6 max-w-6xl mx-auto w-full">
        {/* Left Card: Featured Floating Wish Card */}
        <div className="flex-1 w-full flex flex-col justify-center">
          {currentWish ? (
            <div
              key={currentWish.id || currentIndex}
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#2D0B14]/90 via-[#3B0E1B]/95 to-[#24060E]/90 border border-[#DFB76C]/60 shadow-[0_12px_45px_rgba(0,0,0,0.5)] space-y-6 transform transition-all duration-700 animate-fadeIn relative"
            >
              {/* Corner Floral Filigree Accent */}
              <div className="absolute top-4 right-4 text-[#DFB76C]/30 text-3xl font-serif select-none pointer-events-none">
                ❧ ✦ ☙
              </div>

              {/* Guest Author Header */}
              <div className="flex items-center space-x-4 border-b border-[#DFB76C]/25 pb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#DFB76C] to-[#9C7328] text-[#3B0A16] flex items-center justify-center font-bold text-xl shadow-md">
                  {currentWish.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                    {currentWish.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DFB76C]/20 border border-[#DFB76C]/40 text-[#FFE7A8] text-xs font-semibold">
                      {currentWish.relationRole || 'Khách Quý'}
                    </span>
                    <span className="text-xs text-stone-400">
                      {new Date(currentWish.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Wish Content */}
              <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-[#FFF8EB] italic whitespace-pre-line">
                "{currentWish.content}"
              </blockquote>

              {/* Hearts Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-1.5 text-rose-400 text-sm font-bold">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-bounce" />
                  <span>{currentWish.heartCount || 1} trái tim chúc phúc</span>
                </div>
                <span className="text-xs text-stone-400">
                  Lời chúc #{currentIndex + 1} / {wishes.length}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 rounded-3xl bg-white/5 border border-white/10 space-y-3">
              <MessageCircleHeart className="w-12 h-12 text-[#DFB76C] mx-auto animate-pulse" />
              <p className="font-serif text-xl text-amber-100">Chưa có lời chúc nào được gửi</p>
              <p className="text-xs text-stone-300">Hãy quét mã QR bên cạnh để là người đầu tiên gửi lời chúc!</p>
            </div>
          )}
        </div>

        {/* Right Card: QR Code To Send Wish Immediately */}
        <div className="w-full lg:w-80 flex flex-col items-center justify-center p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-[#DFB76C]/40 text-center space-y-4 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DFB76C]">
            Gửi Lời Chúc Ngay Tại Bàn
          </span>

          <div className="p-3 bg-white rounded-2xl shadow-lg border border-amber-200">
            <img
              src={qrUrl}
              alt="Mã QR Gửi Lời Chúc"
              className="w-44 h-44 sm:w-52 sm:h-52 object-contain"
            />
          </div>

          <div className="space-y-1">
            <p className="font-serif text-sm font-bold text-amber-100">
              Quét camera điện thoại để gửi lời chúc
            </p>
            <p className="text-[11px] text-stone-300">
              Lời chúc của bạn sẽ xuất hiện trực tiếp trên màn hình LED sảnh tiệc trong tích tắc!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Ticker Bar */}
      <div className="relative z-10 border-t border-[#DFB76C]/30 pt-3 flex items-center justify-between text-xs text-stone-400">
        <span className="tracking-wide">
          ✦ Xưởng Thiệp Cưới Nghệ Thuật MARRIME • Chúc tân lang tân giai nhân bách niên giai lão
        </span>
        <span className="hidden sm:inline-block text-[#DFB76C]">
          Nhấn phím <strong>F11</strong> để chiếu toàn màn hình sảnh tiệc
        </span>
      </div>
    </div>
  );
};
