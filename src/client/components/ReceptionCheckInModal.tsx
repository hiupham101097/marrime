import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Camera,
  QrCode,
  Search,
  CheckCircle2,
  Clock,
  Users,
  Sparkles,
  Volume2,
  ShieldCheck,
  Building2,
  UserCheck,
  RefreshCw,
  Phone,
} from 'lucide-react';
import { GuestItem, WeddingSide } from '../../shared/types';
import { triggerHaptic } from '../utils/soundEffects';

interface ReceptionCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  guests: GuestItem[];
  onUpdateGuests: (updated: GuestItem[]) => void;
  groomName: string;
  brideName: string;
  venueName?: string;
  hallName?: string;
}

export const ReceptionCheckInModal: React.FC<ReceptionCheckInModalProps> = ({
  isOpen,
  onClose,
  guests,
  onUpdateGuests,
  groomName,
  brideName,
  venueName = 'Riverside Palace',
  hallName = 'Sảnh Grand Ballroom',
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'checked_in' | 'pending'>('all');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [lastCheckedInGuest, setLastCheckedInGuest] = useState<GuestItem | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stats calculation
  const totalGuests = guests.length;
  const checkedInCount = guests.filter((g) => g.status === 'checked_in').length;
  const pendingCount = totalGuests - checkedInCount;
  const checkInRate = totalGuests > 0 ? Math.round((checkedInCount / totalGuests) * 100) : 0;

  // Camera QR scanner lifecycle
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Trình duyệt không hỗ trợ truy cập camera.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      setCameraError('Không thể mở camera. Vui lòng cấp quyền camera hoặc dùng ô tìm kiếm bên dưới.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Action: Check-in a guest
  const performCheckIn = (guest: GuestItem) => {
    const nowTimeStr = new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const updated = guests.map((g) =>
      g.id === guest.id
        ? { ...g, status: 'checked_in' as const, checkedInAt: nowTimeStr }
        : g
    );

    onUpdateGuests(updated);
    setLastCheckedInGuest({ ...guest, status: 'checked_in', checkedInAt: nowTimeStr });
    triggerHaptic([30, 60, 30]);

    // Confetti burst celebrating guest arrival
    void confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#DFB76C', '#8B1A32', '#FFF', '#10B981'],
    })?.catch(() => {});
  };

  // Action: Undo check-in
  const undoCheckIn = (guestId: string) => {
    const updated = guests.map((g) =>
      g.id === guestId
        ? { ...g, status: 'confirmed' as const, checkedInAt: undefined }
        : g
    );
    onUpdateGuests(updated);
    if (lastCheckedInGuest?.id === guestId) {
      setLastCheckedInGuest(null);
    }
  };

  // Filtered guest list
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.phone && g.phone.includes(searchQuery)) ||
      (g.tableNumber && g.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterMode === 'checked_in') return g.status === 'checked_in';
    if (filterMode === 'pending') return g.status !== 'checked_in';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-stone-300 rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 bg-gradient-to-r from-[#5C0E1F] via-[#8B1A32] to-[#5C0E1F] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#DFB76C] to-[#9C7328] text-stone-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <QrCode size={20} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  Reception Desk · Bàn Lễ Tân Đón Khách
                </span>
                <span className="text-rose-200">·</span>
                <span className="text-[10px] text-rose-200">{hallName}</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                Quét Mã QR &amp; Check-In Sảnh Tiệc Cưới
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 rounded-xl text-rose-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Đóng bàn lễ tân"
          >
            <X size={20} />
          </button>
        </div>

        {/* Real-time Reception Metrics Cards */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Tổng Khách</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              {totalGuests}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Đã Đến Tiệc</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-800">
              {checkedInCount}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Chưa Đến</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-amber-800">
              {pendingCount}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-[#8B1A32] block">Tiến Độ Đón</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#8B1A32]">
              {checkInRate}%
            </span>
          </div>
        </div>

        {/* Last Checked-In Guest Spotlight Celebration Card */}
        {lastCheckedInGuest && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 px-4 py-3 border-b border-emerald-200 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block">
                  Check-in thành công lúc {lastCheckedInGuest.checkedInAt || 'vừa xong'}
                </span>
                <h4 className="font-serif text-sm font-bold text-stone-900">
                  {lastCheckedInGuest.name} ·{' '}
                  <span className="text-emerald-800">
                    BÀN TIỆC:{' '}
                    {lastCheckedInGuest.tableNumber ? lastCheckedInGuest.tableNumber : 'Tự do'}
                  </span>
                </h4>
              </div>
            </div>

            <button
              type="button"
              onClick={() => undoCheckIn(lastCheckedInGuest.id)}
              className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              Hoàn tác check-in
            </button>
          </div>
        )}

        {/* Main Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Camera QR Scanner Viewport */}
          <div className="rounded-2xl border border-stone-200 bg-stone-900 text-white p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Camera size={16} className="text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Camera Quét Mã QR Thiệp Mời
                </span>
              </div>

              {isCameraActive ? (
                <button
                  type="button"
                  onClick={stopCamera}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
                >
                  Tắt Camera
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer flex items-center space-x-1"
                >
                  <Camera size={12} />
                  <span>Bật Camera Quét</span>
                </button>
              )}
            </div>

            {isCameraActive ? (
              <div className="relative aspect-video max-h-56 mx-auto rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                {/* Viewfinder overlay */}
                <div className="absolute inset-0 border-2 border-amber-300/40 pointer-events-none flex items-center justify-center">
                  <div className="w-36 h-36 border-2 border-amber-300 rounded-2xl relative shadow-lg">
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-amber-400 animate-pulse" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-stone-400 space-y-1">
                <p className="text-xs">
                  Bấm <strong>"Bật Camera Quét"</strong> để hướng camera về phía mã QR trên thiệp mời của khách.
                </p>
                <p className="text-[11px] text-stone-500">
                  Hoặc tìm kiếm nhanh tên khách mời trong danh sách bên dưới để check-in thủ công.
                </p>
              </div>
            )}

            {cameraError && (
              <p className="text-xs text-rose-300 bg-rose-950/60 p-2.5 rounded-xl border border-rose-800 mt-2">
                {cameraError}
              </p>
            )}
          </div>

          {/* Search bar & filter pills */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Gõ tên khách mời, số điện thoại hoặc số bàn tiệc..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs font-semibold focus:outline-none focus:border-[#8B1A32] focus:ring-2 focus:ring-[#8B1A32]/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Status filter tabs */}
              <div className="flex items-center p-1 rounded-xl bg-stone-100 border border-stone-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    filterMode === 'all' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                  }`}
                >
                  Tất cả ({totalGuests})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('checked_in')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    filterMode === 'checked_in'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-stone-600'
                  }`}
                >
                  Đã đến ({checkedInCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    filterMode === 'pending'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-stone-600'
                  }`}
                >
                  Chưa đến ({pendingCount})
                </button>
              </div>
            </div>

            {/* Guest list table / cards */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredGuests.length === 0 ? (
                <div className="py-8 text-center text-stone-400 text-xs bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  Không tìm thấy khách mời nào phù hợp với từ khóa "{searchQuery}"
                </div>
              ) : (
                filteredGuests.map((guest) => {
                  const isCheckedIn = guest.status === 'checked_in';

                  return (
                    <div
                      key={guest.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                        isCheckedIn
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isCheckedIn
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {isCheckedIn ? <CheckCircle2 size={16} /> : <Users size={16} />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <h5 className="font-serif text-xs sm:text-sm font-bold text-stone-900 truncate">
                              {guest.name}
                            </h5>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                guest.side === 'bride'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {guest.side === 'bride' ? 'Nhà Gái' : 'Nhà Trai'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 text-[11px] text-stone-500 mt-0.5">
                            <span>
                              Bàn:{' '}
                              <strong className="text-[#8B1A32]">
                                {guest.tableNumber ? `Bàn ${guest.tableNumber}` : 'Tự do'}
                              </strong>
                            </span>
                            {guest.phone && (
                              <>
                                <span>·</span>
                                <span>{guest.phone}</span>
                              </>
                            )}
                            {isCheckedIn && guest.checkedInAt && (
                              <>
                                <span>·</span>
                                <span className="text-emerald-700 font-semibold">
                                  Đã vào lúc {guest.checkedInAt}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Check-in action button */}
                      <div>
                        {isCheckedIn ? (
                          <button
                            type="button"
                            onClick={() => undoCheckIn(guest.id)}
                            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 text-xs font-semibold cursor-pointer"
                          >
                            Hủy
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => performCheckIn(guest)}
                            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center space-x-1"
                          >
                            <CheckCircle2 size={13} />
                            <span>Check-in</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>
            {groomName} &amp; {brideName} · Lễ Cưới Tại {venueName}
          </span>
          <button
            type="button"
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold cursor-pointer hover:bg-black"
          >
            Đóng Bàn Lễ Tân
          </button>
        </div>
      </div>
    </div>
  );
};
