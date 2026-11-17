import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Maximize2,
  Minimize2,
  X,
  Heart,
  QrCode,
  Trophy,
  Gift,
  Disc3,
  HelpCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  Music,
  Users,
  Radio,
  Image as ImageIcon,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WishMessage, GuestItem, SongRequestItem, TriviaQuestion, GalleryPhotoItem } from '../../shared/types';
import { playRouletteTick, playCelebrationFanfare, triggerHaptic } from '../utils/soundEffects';
import { moderateWishContent } from '../utils/profanityFilter';

interface StageLedWallModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
  brideName: string;
  weddingDateFormatted: string;
  venueName?: string;
  hallName?: string;
  weddingSlug: string;
  wishes: WishMessage[];
  guests?: GuestItem[];
  songRequests?: SongRequestItem[];
  triviaQuestions?: TriviaQuestion[];
  galleryPhotos?: GalleryPhotoItem[];
}

export const StageLedWallModal: React.FC<StageLedWallModalProps> = ({
  isOpen,
  onClose,
  groomName,
  brideName,
  weddingDateFormatted,
  venueName = 'Riverside Palace',
  hallName = 'Sảnh Grand Ballroom',
  weddingSlug,
  wishes,
  guests = [],
  songRequests = [],
  triviaQuestions = [],
  galleryPhotos = [],
}) => {
  if (!isOpen) return null;

  // Active Screen Mode
  const [activeTab, setActiveTab] = useState<'wishes' | 'lucky_draw' | 'jukebox' | 'trivia'>('wishes');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Wishes & Photo Slideshow state
  const [wishIndex, setWishIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<'wish' | 'photo'>('wish');

  // Lucky Draw State
  const [selectedPrize, setSelectedPrize] = useState('Giải May Mắn Của Dâu & Rể');
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<GuestItem | null>(null);
  const [winnerHistory, setWinnerHistory] = useState<Array<{ guest: GuestItem; prize: string; time: string }>>([]);
  const [displayedCandidate, setDisplayedCandidate] = useState<GuestItem | null>(null);

  // Trivia Stage State
  const [triviaIdx, setTriviaIdx] = useState(0);
  const [showTriviaAnswer, setShowTriviaAnswer] = useState(false);

  // Auto-cycle through wishes and photos every 6 seconds
  useEffect(() => {
    if (!isOpen || activeTab !== 'wishes') return;

    const interval = setInterval(() => {
      // Toggle between wish and photo if photos exist
      if (galleryPhotos.length > 0 && Math.random() > 0.45) {
        setDisplayMode('photo');
        setPhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
      } else if (wishes.length > 0) {
        setDisplayMode('wish');
        setWishIndex((prev) => (prev + 1) % wishes.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isOpen, activeTab, wishes.length, galleryPhotos.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Lucky Draw Spin Logic
  const eligibleGuests = guests.filter((g) => g.name && g.name.trim().length > 0);
  const pool = eligibleGuests.length > 0
    ? eligibleGuests
    : [
        { id: 'sample-1', name: 'Nguyễn Văn Tuấn', role: 'ban' as const, tableNumber: '02' },
        { id: 'sample-2', name: 'Trần Thị Thu Thảo', role: 'ban' as const, tableNumber: '06' },
        { id: 'sample-3', name: 'Bác Ba & Gia Đình', role: 'bac' as const, tableNumber: 'Họ Trai 01' },
        { id: 'sample-4', name: 'Anh Hoàng Nam', role: 'anh' as const, tableNumber: 'VIP 02' },
        { id: 'sample-5', name: 'Chị Mai Linh', role: 'chi' as const, tableNumber: '03' },
      ];

  const handleStartLuckyDraw = () => {
    if (isSpinning || pool.length === 0) return;

    setIsSpinning(true);
    setWinner(null);
    triggerHaptic([40]);

    let speed = 40; // Initial interval ms
    let iterations = 0;
    const maxIterations = 35; // Total steps

    const spinStep = () => {
      const randomGuest = pool[Math.floor(Math.random() * pool.length)];
      setDisplayedCandidate(randomGuest);
      playRouletteTick();

      iterations++;
      if (iterations < maxIterations) {
        // Decelerate as it approaches the finish
        if (iterations > 20) speed += 25;
        if (iterations > 28) speed += 45;
        setTimeout(spinStep, speed);
      } else {
        // Final Winner Decided!
        setIsSpinning(false);
        setWinner(randomGuest);
        playCelebrationFanfare();

        setWinnerHistory((prev) => [
          {
            guest: randomGuest,
            prize: selectedPrize,
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          },
          ...prev,
        ]);

        void confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#DFB76C', '#8B1A32', '#FDE047', '#E11D48'],
        });
      }
    };

    spinStep();
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://marrime.pages.dev';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    `${baseUrl}/?w=${weddingSlug}#wishes`
  )}&margin=8`;

  const currentWish = wishes[wishIndex] || wishes[0];
  const moderatedWish = currentWish ? moderateWishContent(currentWish.content) : null;
  const currentPhoto = galleryPhotos[photoIndex] || galleryPhotos[0];
  const currentTrivia = triviaQuestions[triviaIdx] || triviaQuestions[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#160408] text-[#FFFDF9] flex flex-col justify-between p-4 sm:p-8 select-none overflow-hidden animate-fadeIn font-sans">
      {/* Ambient Drifting Golden Starlight & Vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_35%,rgba(223,183,108,0.22)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.65)_100%)]" />

      {/* Top Floating Ballroom Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-[#DFB76C]/30 pb-3 gap-3">
        {/* Left: Couple Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1A32] via-[#5C1626] to-[#3B0A16] border-2 border-[#DFB76C] flex items-center justify-center font-serif text-lg font-bold text-amber-200 shadow-xl">
            {groomName.charAt(0)}&{brideName.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-amber-100 leading-tight">
              {groomName} & {brideName}
            </h1>
            <span className="text-[10px] text-[#DFB76C] tracking-[0.25em] uppercase font-bold block mt-0.5">
              {hallName} • {venueName} • {weddingDateFormatted}
            </span>
          </div>
        </div>

        {/* Center: Stage Projection Mode Switcher */}
        <div className="flex items-center space-x-1 sm:space-x-2 bg-black/40 backdrop-blur-md p-1 rounded-2xl border border-[#DFB76C]/30">
          <button
            type="button"
            onClick={() => setActiveTab('wishes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'wishes'
                ? 'bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-200 shadow-md border border-[#DFB76C]/50'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sổ Lưu Bút ({wishes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lucky_draw')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'lucky_draw'
                ? 'bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-200 shadow-md border border-[#DFB76C]/50'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Bốc Thăm May Mắn</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jukebox')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'jukebox'
                ? 'bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-200 shadow-md border border-[#DFB76C]/50'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Disc3 className="w-3.5 h-3.5 text-amber-300" />
            <span>Yêu Cầu Bài Hát ({songRequests.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('trivia')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'trivia'
                ? 'bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-200 shadow-md border border-[#DFB76C]/50'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>Đố Vui Sân Khấu</span>
          </button>
        </div>

        {/* Right: Screen & Audio Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/20 transition-colors cursor-pointer"
            title="Bật/Tắt Toàn Màn Hình LED (F11)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-colors cursor-pointer"
            title="Đóng màn hình chiếu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===============================================================
          TAB 1: LIVE WISHES & PHOTO WATERFALL
         =============================================================== */}
      {activeTab === 'wishes' && (
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 py-4 max-w-6xl mx-auto w-full">
          {/* Left: Main Stage Card (Wish or Photo) */}
          <div className="flex-1 w-full flex flex-col justify-center">
            {displayMode === 'photo' && currentPhoto ? (
              /* Photo Highlight Slide */
              <div
                key={`p_${photoIndex}`}
                className="relative rounded-3xl overflow-hidden border-2 border-[#DFB76C]/60 shadow-[0_15px_50px_rgba(0,0,0,0.6)] animate-fadeIn max-h-[500px]"
              >
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  className="w-full h-80 sm:h-[440px] object-cover scale-105 transition-transform duration-[6000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#DFB76C] font-bold">
                    KHOẢNH KHẮC HOÀNG GIA • WEDDING MOMENT
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                    {currentPhoto.title}
                  </h3>
                  {currentPhoto.caption && (
                    <p className="text-xs text-stone-300 italic font-serif max-w-lg">
                      "{currentPhoto.caption}"
                    </p>
                  )}
                </div>
              </div>
            ) : currentWish ? (
              /* Wish Card */
              <div
                key={`w_${wishIndex}`}
                className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#2D0B14]/90 via-[#3B0E1B]/95 to-[#24060E]/90 border-2 border-[#DFB76C]/60 shadow-[0_15px_50px_rgba(0,0,0,0.6)] space-y-6 animate-fadeIn relative"
              >
                <div className="absolute top-4 right-4 text-[#DFB76C]/30 text-3xl font-serif select-none pointer-events-none">
                  ❧ ✦ ☙
                </div>

                <div className="flex items-center space-x-4 border-b border-[#DFB76C]/25 pb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#DFB76C] to-[#9C7328] text-[#3B0A16] flex items-center justify-center font-bold text-xl shadow-md shrink-0">
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
                        {currentWish.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-[#FFF8EB] italic whitespace-pre-line">
                  "{moderatedWish?.filteredText || currentWish.content}"
                </blockquote>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1.5 text-rose-400 text-sm font-bold">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-bounce" />
                    <span>{currentWish.heartCount || 1} trái tim chúc phúc</span>
                  </div>
                  <span className="text-xs text-stone-400">
                    Lời chúc #{wishIndex + 1} / {wishes.length}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center p-12 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                <Sparkles className="w-12 h-12 text-[#DFB76C] mx-auto animate-pulse" />
                <p className="font-serif text-xl text-amber-100">Đang chờ những lời chúc phúc đầu tiên...</p>
                <p className="text-xs text-stone-300">Quý khách vui lòng quét mã QR bên cạnh để gửi lời chúc!</p>
              </div>
            )}
          </div>

          {/* Right: High-Res QR Scan Portal */}
          <div className="w-full lg:w-76 flex flex-col items-center justify-center p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-[#DFB76C]/40 text-center space-y-4 shadow-xl shrink-0">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DFB76C]">
              Gửi Lời Chúc Ngay Tại Bàn
            </span>

            <div className="p-3 bg-white rounded-2xl shadow-lg border border-amber-200">
              <img
                src={qrUrl}
                alt="Mã QR Gửi Lời Chúc"
                className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
              />
            </div>

            <div className="space-y-1">
              <p className="font-serif text-sm font-bold text-amber-100">
                Quét camera điện thoại để chúc phúc
              </p>
              <p className="text-[11px] text-stone-300">
                Lời chúc & bài hát yêu cầu của bạn sẽ xuất hiện trực tiếp trên màn hình LED!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===============================================================
          TAB 2: LUCKY DRAW ROULETTE (BỐC THĂM MAY MẮN HOÀNG GIA)
         =============================================================== */}
      {activeTab === 'lucky_draw' && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full py-4 space-y-6">
          {/* Prize Selection Bar */}
          <div className="flex items-center space-x-3 bg-black/30 px-5 py-2.5 rounded-2xl border border-[#DFB76C]/30">
            <Gift className="w-5 h-5 text-amber-300 shrink-0" />
            <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">Hạng Mục Giải Thưởng:</span>
            <select
              value={selectedPrize}
              disabled={isSpinning}
              onChange={(e) => setSelectedPrize(e.target.value)}
              className="bg-stone-900 border border-[#DFB76C]/50 text-amber-100 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="Giải May Mắn Của Dâu & Rể">Giải May Mắn Của Dâu & Rể</option>
              <option value="Giải Đặc Biệt (Vali Du Lịch Hoàng Gia)">Giải Đặc Biệt (Vali Du Lịch Hoàng Gia)</option>
              <option value="Giải Nhất (Bộ Ấm Trà Gốm Sứ Bát Tràng)">Giải Nhất (Bộ Ấm Trà Bát Tràng)</option>
              <option value="Giải Nhì (Cặp Rượu Vang Bordeaux)">Giải Nhì (Cặp Rượu Vang Bordeaux)</option>
              <option value="Giải Ba (Bao Lì Xì Vàng May Mắn 2 Triệu)">Giải Ba (Bao Lì Xì May Mắn)</option>
            </select>
          </div>

          {/* Central Roulette Stage Display */}
          <div className="w-full max-w-xl p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#2D0B14] via-[#451020] to-[#24060E] border-2 border-[#DFB76C] shadow-[0_20px_70px_rgba(0,0,0,0.7)] text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-3 left-4 text-[10px] font-bold uppercase tracking-widest text-amber-300/80">
              MARRIME ROYAL LUCKY DRAW • POOL ({pool.length} KHÁCH MỜI)
            </div>

            {winner ? (
              /* Winner Reveal Card */
              <div className="space-y-4 animate-fadeIn">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 shadow-lg animate-bounce">
                  <Trophy className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-[#DFB76C] block">
                    CHÚC MỪNG KHÁCH MỜI TRÚNG THƯỞNG
                  </span>
                  <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 mt-2">
                    {winner.name}
                  </h2>
                  <p className="text-base text-amber-200 font-bold mt-1">
                    {winner.tableNumber ? `📍 Vị Trí: Bàn số ${winner.tableNumber}` : '📍 Khách Quý Của Dâu Rể'}
                  </p>
                  <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-bold">
                    🎁 {selectedPrize}
                  </span>
                </div>
              </div>
            ) : isSpinning && displayedCandidate ? (
              /* Spinning Candidate */
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-300 animate-pulse block">
                  ĐANG QUAY SỐ BỐC THĂM...
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-200 scale-105 transition-transform">
                  {displayedCandidate.name}
                </h2>
                <p className="text-sm text-stone-400">
                  {displayedCandidate.tableNumber ? `Bàn: ${displayedCandidate.tableNumber}` : ''}
                </p>
              </div>
            ) : (
              /* Ready State */
              <div className="space-y-3 py-4">
                <Trophy className="w-16 h-16 text-[#DFB76C] mx-auto opacity-90" />
                <h3 className="font-serif text-2xl font-bold text-amber-100">
                  Vòng Quay May Mắn Sảnh Tiệc
                </h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto">
                  MC và Dâu Rể hãy nhấn nút quay số dưới đây để tìm ra vị khách quý may mắn nhận quà kỷ niệm ngày cưới!
                </p>
              </div>
            )}

            {/* Spin Action Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isSpinning}
                onClick={handleStartLuckyDraw}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#DFB76C] via-[#F3CE86] to-[#C59A4E] text-[#4A1020] font-serif text-base font-bold shadow-[0_8px_25px_rgba(223,183,108,0.4)] hover:opacity-95 transition-all flex items-center justify-center space-x-2 mx-auto cursor-pointer border border-amber-200 active:scale-95 disabled:opacity-50"
              >
                <Play className="w-5 h-5 fill-[#4A1020]" />
                <span>{isSpinning ? 'ĐANG QUAY THƯỞNG...' : winner ? 'QUAY LƯỢT TIẾP THEO' : 'BẮT ĐẦU QUAY THƯỞNG'}</span>
              </button>
            </div>
          </div>

          {/* Winner History List */}
          {winnerHistory.length > 0 && (
            <div className="w-full max-w-xl bg-black/30 p-4 rounded-2xl border border-white/10 space-y-2">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Danh sách khách vừa trúng thưởng ({winnerHistory.length}):
              </span>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                {winnerHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-white/10 text-xs flex items-center space-x-2 border border-white/10"
                  >
                    <span className="text-amber-300 font-bold">{item.guest.name}</span>
                    <span className="text-stone-400 text-[10px]">({item.prize})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===============================================================
          TAB 3: WEDDING JUKEBOX LIVE QUEUE
         =============================================================== */}
      {activeTab === 'jukebox' && (
        <div className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full py-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#DFB76C]/30 pb-2">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 flex items-center space-x-2">
                <Disc3 className="w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Danh Sách Bài Hát Khách Yêu Cầu Cho Ban Nhạc & MC</span>
              </h2>
              <p className="text-xs text-stone-400">
                Giai điệu được khách mời gửi từ điện thoại tại bàn tiệc theo thời gian thực
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#DFB76C]/20 border border-[#DFB76C]/40 text-amber-200 text-xs font-bold">
              {songRequests.length} bài hát
            </span>
          </div>

          {/* Songs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[460px] pr-1">
            {songRequests.length > 0 ? (
              songRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-gradient-to-br from-[#2D0B14]/80 to-[#1F070E]/80 border border-[#DFB76C]/30 space-y-2 hover:border-[#DFB76C]/60 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 truncate mr-2">
                      <Music className="w-4 h-4 text-amber-300 shrink-0" />
                      <span className="font-serif text-base font-bold text-amber-100 truncate">
                        {req.songTitle}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 shrink-0">
                      {req.tableNumber ? `Bàn ${req.tableNumber}` : 'Bàn Tiệc'}
                    </span>
                  </div>

                  <div className="text-xs text-stone-300 flex items-center justify-between">
                    <span>Nghệ sĩ: <strong className="text-amber-200">{req.artist}</strong></span>
                    <span className="text-stone-400 text-[11px]">{req.guestName}</span>
                  </div>

                  {req.dedicationMessage && (
                    <p className="text-xs text-[#FFF8EB]/80 italic bg-black/20 p-2 rounded-lg border border-white/5">
                      "{req.dedicationMessage}"
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center p-12 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                <Music className="w-10 h-10 text-stone-500 mx-auto" />
                <p className="font-serif text-base text-stone-300">Chưa có bài hát nào được gửi yêu cầu</p>
                <p className="text-xs text-stone-500">Khách mời có thể gửi yêu cầu bài hát ngay từ thiệp cưới điện tử!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===============================================================
          TAB 4: STAGE COUPLE TRIVIA
         =============================================================== */}
      {activeTab === 'trivia' && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full py-4 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DFB76C]">
              MINIGAME GIAO LƯU SÂN KHẤU CÙNG QUAN KHÁCH
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              Đố Vui: Hiểu Ý Dâu & Rể
            </h2>
          </div>

          <div className="w-full max-w-2xl p-8 rounded-3xl bg-gradient-to-br from-[#2D0B14] to-[#1C060D] border-2 border-[#DFB76C] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#DFB76C]/30 pb-3">
              <span className="text-xs font-bold text-amber-300">
                Câu hỏi {triviaIdx + 1} / {triviaQuestions.length}
              </span>
              <button
                type="button"
                onClick={() => setShowTriviaAnswer(!showTriviaAnswer)}
                className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold cursor-pointer transition-colors"
              >
                {showTriviaAnswer ? 'Ẩn Đáp Án' : 'Bấm Xem Đáp Án Đúng'}
              </button>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-50 leading-relaxed">
              {currentTrivia.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTrivia.options.map((opt, idx) => {
                const isCorrect = idx === currentTrivia.correctIndex;
                const highlight = showTriviaAnswer && isCorrect;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs font-medium flex items-center space-x-3 transition-all ${
                      highlight
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-bold scale-102 shadow-lg'
                        : 'bg-white/5 border-white/10 text-stone-200'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-white/10 text-amber-200 font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>

            {showTriviaAnswer && (
              <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-xs text-amber-200 animate-fadeIn">
                <strong>✦ Tiết lộ từ Dâu & Rể: </strong>
                {currentTrivia.explanation}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={triviaIdx === 0}
                onClick={() => {
                  setTriviaIdx((prev) => Math.max(0, prev - 1));
                  setShowTriviaAnswer(false);
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold disabled:opacity-30 cursor-pointer"
              >
                Câu Trước
              </button>

              <button
                type="button"
                disabled={triviaIdx + 1 >= triviaQuestions.length}
                onClick={() => {
                  setTriviaIdx((prev) => Math.min(triviaQuestions.length - 1, prev + 1));
                  setShowTriviaAnswer(false);
                }}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-100 font-bold text-xs shadow-md disabled:opacity-30 cursor-pointer"
              >
                Câu Tiếp Theo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Ticker Bar */}
      <div className="relative z-10 border-t border-[#DFB76C]/30 pt-3 flex items-center justify-between text-xs text-stone-400">
        <span className="tracking-wide">
          ✦ Xưởng Thiệp Cưới MARRIME • Chúc tân lang tân giai nhân bách niên giai lão
        </span>
        <span className="hidden sm:inline-block text-[#DFB76C]">
          Nhấn phím <strong>F11</strong> để chiếu toàn màn hình sân khấu tiệc cưới
        </span>
      </div>
    </div>
  );
};
