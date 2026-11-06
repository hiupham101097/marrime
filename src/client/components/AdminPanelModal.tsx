import React, { useState, useRef } from 'react';
import {
  X,
  Lock,
  Save,
  Palette,
  Layout,
  Clock,
  User,
  Heart,
  Building2,
  Check,
  Settings,
  Music,
  Mail,
  Play,
  Pause,
  Volume2,
  Camera,
  Sparkles,
  Wand2,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Eye,
} from 'lucide-react';
import {
  WeddingData,
  WeddingTheme,
  WeddingTemplate,
  EnvelopeStyle,
  AnimationEffect,
  GalleryPhotoItem,
} from '../../shared/types';
import {
  PRESET_MUSIC_TRACKS,
  DEFAULT_GALLERY_PHOTOS,
  SAMPLE_PHOTO_LIBRARY,
} from '../../shared/defaultData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: WeddingData;
  onSaveSuccess: (updated: WeddingData) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onSaveSuccess,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<
    'couple' | 'event' | 'style' | 'photos' | 'animation' | 'music'
  >('couple');
  const [formData, setFormData] = useState<WeddingData>({
    ...currentData,
    gallery: currentData.gallery || DEFAULT_GALLERY_PHOTOS,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Music preview audio element
  const [previewPlayingId, setPreviewPlayingId] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '123456') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Mã PIN không đúng! (Mã mặc định: 123456)');
    }
  };

  const handleTogglePreview = (url?: string, trackId?: string) => {
    if (!url) return;

    if (previewPlayingId === trackId) {
      if (previewAudioRef.current) previewAudioRef.current.pause();
      setPreviewPlayingId(null);
      return;
    }

    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }

    try {
      previewAudioRef.current = new Audio(url);
      previewAudioRef.current
        .play()
        .then(() => {
          setPreviewPlayingId(trackId || 'preview');
        })
        .catch(() => {});

      previewAudioRef.current.onended = () => {
        setPreviewPlayingId(null);
      };
    } catch {
      // Audio fallback
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      setPreviewPlayingId(null);
    }

    try {
      const res = await fetch('/api/admin/wedding-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: pin || '123456',
          config: formData,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSaveMessage('Lưu cấu hình thành công!');
        onSaveSuccess(json.data || formData);
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage(json.message || 'Lỗi khi lưu cấu hình.');
      }
    } catch {
      // Local fallback
      onSaveSuccess(formData);
      setSaveMessage('Đã lưu cấu hình vào bộ nhớ trình duyệt!');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGalleryPhotoChange = (
    index: number,
    field: keyof GalleryPhotoItem,
    value: string
  ) => {
    const updated = [...(formData.gallery || DEFAULT_GALLERY_PHOTOS)];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, gallery: updated });
  };

  const handleResetGalleryToDefault = () => {
    setFormData({ ...formData, gallery: [...DEFAULT_GALLERY_PHOTOS] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FFFDF9] rounded-3xl w-full max-w-4xl max-h-[92vh] border-2 border-wedding-gold/50 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-wedding-burgundy to-[#3A0A17] text-white p-5 px-6 flex items-center justify-between border-b border-wedding-gold/30">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-wedding-gold/20 border border-wedding-gold/50 flex items-center justify-center text-wedding-gold-light">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">
                Bảng Quản Trị Tiệc Cưới Của Dâu & Rể
              </h3>
              <p className="text-[11px] text-wedding-rose-200">
                Tự do thiết kế phong cách, màu sắc, hình ảnh, animation & âm nhạc cho ngày trọng đại
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (previewAudioRef.current) previewAudioRef.current.pause();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-wedding-rose-50 border-2 border-wedding-gold/40 flex items-center justify-center text-wedding-burgundy shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-stone-900 mb-1">
                Khu Vực Riêng Của Dâu Rể
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Quan khách chỉ có quyền xem thiệp. Vui lòng nhập mã PIN quản trị để tùy chỉnh thông tin, màu sắc và âm nhạc.
              </p>
            </div>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Nhập mã PIN (Mặc định: 123456)"
                  className="w-full text-center px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:border-wedding-burgundy text-stone-800 tracking-widest text-lg font-mono bg-white shadow-sm"
                  autoFocus
                />
                {pinError && <p className="text-xs text-red-500 mt-2 font-medium">{pinError}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-wedding-burgundy to-[#4A1020] text-white font-bold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/50"
              >
                Mở Khóa Quản Trị
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Top Navigation Tabs */}
            <div className="flex border-b border-stone-200 bg-stone-50/80 px-4 sm:px-6 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('couple')}
                className={`py-3.5 px-3.5 sm:px-4 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'couple'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white shadow-sm'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Dâu & Rể</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('event')}
                className={`py-3.5 px-3.5 sm:px-4 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'event'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white shadow-sm'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Thời Gian & Sảnh</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('style')}
                className={`py-3.5 px-3.5 sm:px-4 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'style'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white shadow-sm'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Phong Cách, Màu & Thiệp</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`py-3.5 px-3.5 sm:px-4 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'photos'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white shadow-sm'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5 text-pink-600" />
                <span>Hình Ảnh & Album Cưới</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('animation')}
                className={`py-3.5 px-3.5 sm:px-4 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'animation'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white shadow-sm'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Hiệu Ứng Hoạt Ảnh</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('music')}
                className={`py-3.5 px-3.5 sm:px-4 text-xs font-bold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'music'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white shadow-sm'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                <Music className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nhạc Nền Tiệc</span>
              </button>
            </div>

            {/* Tab Body Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* TAB 1: THÔNG TIN DÂU & RỂ */}
              {activeTab === 'couple' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Groom Card */}
                    <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                      <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
                        <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-800 text-xs font-bold flex items-center justify-center">
                          R
                        </span>
                        <h4 className="font-serif text-sm font-bold text-stone-900">
                          Thông Tin Chú Rể
                        </h4>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Họ và Tên Chú Rể
                          </label>
                          <input
                            type="text"
                            value={formData.groom.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                groom: { ...formData.groom, name: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Tên Thân Mật (Ngắn Gọn)
                          </label>
                          <input
                            type="text"
                            value={formData.groom.shortName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                groom: { ...formData.groom, shortName: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Nghề Nghiệp / Danh Xưng
                          </label>
                          <input
                            type="text"
                            value={formData.groom.title}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                groom: { ...formData.groom, title: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Link Ảnh Đại Diện (Avatar URL)
                          </label>
                          <input
                            type="text"
                            value={formData.groom.avatar}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                groom: { ...formData.groom, avatar: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy font-mono text-[11px]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-stone-600 font-semibold mb-1">
                              Thân Phụ (Bố Chú Rể)
                            </label>
                            <input
                              type="text"
                              value={formData.groom.parents.father}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  groom: {
                                    ...formData.groom,
                                    parents: {
                                      ...formData.groom.parents,
                                      father: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 font-semibold mb-1">
                              Thân Mẫu (Mẹ Chú Rể)
                            </label>
                            <input
                              type="text"
                              value={formData.groom.parents.mother}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  groom: {
                                    ...formData.groom,
                                    parents: {
                                      ...formData.groom.parents,
                                      mother: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Ngân Hàng & Số Tài Khoản Mừng Cưới (VietQR)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Tên ngân hàng (VD: VCB)"
                              value={formData.groom.bankInfo.bankName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  groom: {
                                    ...formData.groom,
                                    bankInfo: {
                                      ...formData.groom.bankInfo,
                                      bankName: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Số tài khoản"
                              value={formData.groom.bankInfo.accountNumber}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  groom: {
                                    ...formData.groom,
                                    bankInfo: {
                                      ...formData.groom.bankInfo,
                                      accountNumber: e.target.value,
                                      qrImage: `https://api.vietqr.io/image/970436-${e.target.value}-print.jpg?accountName=${encodeURIComponent(
                                        formData.groom.name
                                      )}&amount=0`,
                                    },
                                  },
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bride Card */}
                    <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                      <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
                        <span className="w-6 h-6 rounded-full bg-rose-50 text-rose-800 text-xs font-bold flex items-center justify-center">
                          D
                        </span>
                        <h4 className="font-serif text-sm font-bold text-stone-900">
                          Thông Tin Cô Dâu
                        </h4>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Họ và Tên Cô Dâu
                          </label>
                          <input
                            type="text"
                            value={formData.bride.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bride: { ...formData.bride, name: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Tên Thân Mật (Ngắn Gọn)
                          </label>
                          <input
                            type="text"
                            value={formData.bride.shortName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bride: { ...formData.bride, shortName: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Nghề Nghiệp / Danh Xưng
                          </label>
                          <input
                            type="text"
                            value={formData.bride.title}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bride: { ...formData.bride, title: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Link Ảnh Đại Diện (Avatar URL)
                          </label>
                          <input
                            type="text"
                            value={formData.bride.avatar}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bride: { ...formData.bride, avatar: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy font-mono text-[11px]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-stone-600 font-semibold mb-1">
                              Thân Phụ (Bố Cô Dâu)
                            </label>
                            <input
                              type="text"
                              value={formData.bride.parents.father}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  bride: {
                                    ...formData.bride,
                                    parents: {
                                      ...formData.bride.parents,
                                      father: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 font-semibold mb-1">
                              Thân Mẫu (Mẹ Cô Dâu)
                            </label>
                            <input
                              type="text"
                              value={formData.bride.parents.mother}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  bride: {
                                    ...formData.bride,
                                    parents: {
                                      ...formData.bride.parents,
                                      mother: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Ngân Hàng & Số Tài Khoản Mừng Cưới (VietQR)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Tên ngân hàng (VD: TCB)"
                              value={formData.bride.bankInfo.bankName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  bride: {
                                    ...formData.bride,
                                    bankInfo: {
                                      ...formData.bride.bankInfo,
                                      bankName: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder="Số tài khoản"
                              value={formData.bride.bankInfo.accountNumber}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  bride: {
                                    ...formData.bride,
                                    bankInfo: {
                                      ...formData.bride.bankInfo,
                                      accountNumber: e.target.value,
                                      qrImage: `https://api.vietqr.io/image/970407-${e.target.value}-print.jpg?accountName=${encodeURIComponent(
                                        formData.bride.name
                                      )}&amount=0`,
                                    },
                                  },
                                })
                              }
                              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: THỜI GIAN & SẢNH CƯỚI */}
              {activeTab === 'event' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-wedding-burgundy" />
                      <span>Thời Gian & Ngày Cưới Trọng Thể</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-stone-600 font-semibold mb-1">
                          Ngày Dương Lịch (Hiển thị văn bản)
                        </label>
                        <input
                          type="text"
                          value={formData.weddingDateFormatted}
                          onChange={(e) =>
                            setFormData({ ...formData, weddingDateFormatted: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-600 font-semibold mb-1">
                          Mốc Đếm Ngược Countdown (ISO 8601)
                        </label>
                        <input
                          type="text"
                          value={formData.weddingDate}
                          onChange={(e) =>
                            setFormData({ ...formData, weddingDate: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  </div>

                  {formData.events.map((evt, idx) => (
                    <div
                      key={evt.id || idx}
                      className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4"
                    >
                      <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-wedding-burgundy" />
                        <span>Sự Kiện #{idx + 1}: {evt.title}</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Tiêu Đề Buổi Lễ
                          </label>
                          <input
                            type="text"
                            value={evt.title}
                            onChange={(e) => {
                              const newEvents = [...formData.events];
                              newEvents[idx].title = e.target.value;
                              setFormData({ ...formData, events: newEvents });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Thời Gian / Giờ Đón Khách
                          </label>
                          <input
                            type="text"
                            value={evt.time}
                            onChange={(e) => {
                              const newEvents = [...formData.events];
                              newEvents[idx].time = e.target.value;
                              setFormData({ ...formData, events: newEvents });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Trung Tâm Tiệc Cưới / Địa Điểm
                          </label>
                          <input
                            type="text"
                            value={evt.venueName}
                            onChange={(e) => {
                              const newEvents = [...formData.events];
                              newEvents[idx].venueName = e.target.value;
                              setFormData({ ...formData, events: newEvents });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-semibold mb-1">
                            Tên Sảnh Cưới (Tầng / Khu Vực)
                          </label>
                          <input
                            type="text"
                            value={evt.hallName}
                            onChange={(e) => {
                              const newEvents = [...formData.events];
                              newEvents[idx].hallName = e.target.value;
                              setFormData({ ...formData, events: newEvents });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-stone-600 font-semibold mb-1">
                            Địa Chỉ Đầy Đủ
                          </label>
                          <input
                            type="text"
                            value={evt.address}
                            onChange={(e) => {
                              const newEvents = [...formData.events];
                              newEvents[idx].address = e.target.value;
                              setFormData({ ...formData, events: newEvents });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-stone-600 font-semibold mb-1">
                            Link Google Maps Chỉ Đường
                          </label>
                          <input
                            type="text"
                            value={evt.googleMapsUrl}
                            onChange={(e) => {
                              const newEvents = [...formData.events];
                              newEvents[idx].googleMapsUrl = e.target.value;
                              setFormData({ ...formData, events: newEvents });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: PHONG CÁCH, FORM MÀU & PHONG BÌ THIỆP */}
              {activeTab === 'style' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* 1. Chọn Phong Cách Tổng Thể (Template) */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                      <Layout className="w-4 h-4 text-wedding-burgundy" />
                      <span>1. Phong Cách Kiến Trúc Tiệc Cưới (Concept & Template)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        {
                          id: 'royal',
                          name: 'Hoàng Gia Quý Tộc',
                          desc: 'Hoa văn baroque, vương miện mạ vàng, phong cách dạ tiệc cung đình trang trọng.',
                          icon: '👑',
                        },
                        {
                          id: 'vintage',
                          name: 'Lãng Mạn Cổ Điển',
                          desc: 'Tông màu ấm áp, ren viền tinh xảo, nét đẹp hoài niệm trữ tình vượt thời gian.',
                          icon: '🕊️',
                        },
                        {
                          id: 'modern',
                          name: 'Tối Giản Hiện Đại',
                          desc: 'Đường nét thanh mảnh, bố cục tinh tế, sang trọng theo phong cách Bắc Âu.',
                          icon: '💎',
                        },
                        {
                          id: 'fairytale',
                          name: 'Vườn Hoa Cổ Tích',
                          desc: 'Dây leo hoa lá mộng mơ, cảm giác trong trẻo, hòa mình cùng cỏ cây thiên nhiên.',
                          icon: '🌸',
                        },
                      ].map((tpl) => (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, template: tpl.id as WeddingTemplate })
                          }
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                            formData.template === tpl.id
                              ? 'border-wedding-burgundy bg-wedding-rose-50/70 ring-2 ring-wedding-burgundy/30 shadow-sm'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="text-2xl mb-1.5">{tpl.icon}</div>
                            <span className="font-serif text-xs font-bold text-stone-900 block">
                              {tpl.name}
                            </span>
                            <span className="text-[10px] text-stone-500 mt-1 block leading-relaxed">
                              {tpl.desc}
                            </span>
                          </div>
                          {formData.template === tpl.id && (
                            <div className="mt-3 flex items-center text-[10px] font-bold text-wedding-burgundy">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-wedding-burgundy" />
                              <span>Đang chọn</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Chọn Form Màu Sắc Chủ Đạo (Theme Color) */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                      <Palette className="w-4 h-4 text-wedding-burgundy" />
                      <span>2. Bảng Màu Sắc Chủ Đạo (Form Màu Toàn Trang)</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {[
                        {
                          id: 'burgundy',
                          name: 'Đỏ Rượu Vang',
                          sub: 'Quý tộc & nồng ấm',
                          bg: '#75142B',
                          ring: 'ring-[#75142B]',
                        },
                        {
                          id: 'rose',
                          name: 'Hồng Phấn Rose',
                          sub: 'Ngọt ngào lãng mạn',
                          bg: '#9D174D',
                          ring: 'ring-[#9D174D]',
                        },
                        {
                          id: 'gold',
                          name: 'Hoàng Kim 5 Sao',
                          sub: 'Vương giả tráng lệ',
                          bg: '#855B14',
                          ring: 'ring-[#855B14]',
                        },
                        {
                          id: 'navy',
                          name: 'Xanh Dạ Tiệc Navy',
                          sub: 'Trang nhã sâu lắng',
                          bg: '#0F172A',
                          ring: 'ring-[#0F172A]',
                        },
                        {
                          id: 'emerald',
                          name: 'Xanh Ngọc Lục Bảo',
                          sub: 'Tươi mới quý phái',
                          bg: '#064E3B',
                          ring: 'ring-[#064E3B]',
                        },
                        {
                          id: 'lavender',
                          name: 'Tím Mộng Mơ',
                          sub: 'Thủy chung son sắt',
                          bg: '#5B21B6',
                          ring: 'ring-[#5B21B6]',
                        },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, theme: item.id as WeddingTheme })
                          }
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                            formData.theme === item.id
                              ? `border-stone-900 ring-2 ${item.ring} bg-stone-50 shadow-sm`
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <span
                            className="w-9 h-9 rounded-full shadow-md mb-2 flex items-center justify-center text-white"
                            style={{ backgroundColor: item.bg }}
                          >
                            {formData.theme === item.id && <Check className="w-4 h-4" />}
                          </span>
                          <span className="font-serif text-[11px] font-bold text-stone-900 block leading-tight">
                            {item.name}
                          </span>
                          <span className="text-[9px] text-stone-500 mt-0.5 block">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Chọn Phong Cách Thiệp Cưới (Envelope Style) */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-wedding-burgundy" />
                      <span>3. Phong Cách Phong Bì Thiệp Cưới (Envelope Style)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {[
                        {
                          id: 'royal_velvet',
                          name: 'Royal Velvet (Nhung Đỏ Quý Tộc)',
                          desc: 'Nhung đỏ burgundy sang trọng, 4 góc viền hoa văn vàng kim và con dấu sáp vàng ấn tượng.',
                          badge: 'Mẫu Cung Đình',
                          color: '#75142B',
                        },
                        {
                          id: 'blush_ribbon',
                          name: 'Blush Ribbon (Hồng Phấn Thắt Nơ Lụa)',
                          desc: 'Tông hồng pastel dịu dàng, nơ ruy băng lụa mềm mại và hoa văn cành lá mùa xuân.',
                          badge: 'Nữ Tính & Thơ Mộng',
                          color: '#F472B6',
                        },
                        {
                          id: 'modern_minimal',
                          name: 'Modern Minimal (Giấy Mỹ Thuật Viền Vàng)',
                          desc: 'Mặt giấy ivory vân nổi dập chìm, đường chỉ mạ vàng tinh tế theo trường phái tối giản.',
                          badge: 'Thanh Lịch Tinh Tế',
                          color: '#E6CF9B',
                        },
                        {
                          id: 'emerald_brass',
                          name: 'Emerald Brass (Xanh Ngọc Lục Bảo & Con Dấu Đồng)',
                          desc: 'Màu xanh lục bảo vương giả, phụ kiện con dấu đồng cổ điển phong cách quý tộc châu Âu.',
                          badge: 'Đẳng Cấp Cổ Điển',
                          color: '#064E3B',
                        },
                      ].map((env) => (
                        <button
                          key={env.id}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, envelopeStyle: env.id as EnvelopeStyle })
                          }
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            formData.envelopeStyle === env.id
                              ? 'border-wedding-burgundy bg-wedding-rose-50/70 ring-2 ring-wedding-burgundy/30 shadow-sm'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span
                                className="w-3.5 h-3.5 rounded-full inline-block border border-black/10 shadow-sm"
                                style={{ backgroundColor: env.color }}
                              />
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                                {env.badge}
                              </span>
                            </div>
                            <span className="font-serif text-xs font-bold text-stone-900 block">
                              {env.name}
                            </span>
                            <span className="text-[11px] text-stone-500 mt-1 block leading-relaxed">
                              {env.desc}
                            </span>
                          </div>
                          {formData.envelopeStyle === env.id && (
                            <div className="mt-3 flex items-center text-[10px] font-bold text-wedding-burgundy">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-wedding-burgundy" />
                              <span>Đang kích hoạt trên web</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: HÌNH ẢNH & ALBUM CƯỚI (PHOTO ASSETS) */}
              {activeTab === 'photos' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Hero Cover Image */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4 text-wedding-burgundy" />
                      <span>Ảnh Bìa Hero Section (Ảnh Cưới Toàn Cảnh Đầu Trang)</span>
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-stone-600 font-semibold mb-1">
                          Link Ảnh Bìa (URL)
                        </label>
                        <input
                          type="text"
                          value={formData.heroImage || ''}
                          onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                          placeholder="Dán link ảnh cưới đẹp nhất tại đây..."
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy font-mono text-[11px]"
                        />
                      </div>

                      {/* Sample Library quick picks for hero */}
                      <div>
                        <span className="block text-stone-500 font-semibold mb-1.5 text-[11px]">
                          Hoặc chọn nhanh từ kho ảnh nghệ thuật có sẵn:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {SAMPLE_PHOTO_LIBRARY.heroBackgrounds.map((bg) => (
                            <button
                              key={bg.name}
                              type="button"
                              onClick={() => setFormData({ ...formData, heroImage: bg.url })}
                              className={`p-2 rounded-lg border text-left transition-all cursor-pointer group ${
                                formData.heroImage === bg.url
                                  ? 'border-wedding-burgundy bg-wedding-rose-50 ring-1 ring-wedding-burgundy'
                                  : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                              }`}
                            >
                              <div className="h-16 rounded overflow-hidden mb-1.5 bg-stone-200">
                                <img
                                  src={bg.url}
                                  alt={bg.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <span className="text-[10px] font-bold text-stone-800 block truncate">
                                {bg.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Royal Gallery Album Management */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-wedding-burgundy" />
                        <span>Quản Lý 6 Bức Ảnh Cưới Nổi Bật (Album Gallery)</span>
                      </h4>
                      <button
                        type="button"
                        onClick={handleResetGalleryToDefault}
                        className="inline-flex items-center space-x-1 text-[11px] font-semibold text-stone-500 hover:text-wedding-burgundy cursor-pointer"
                        title="Khôi phục ảnh mẫu gốc"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Ảnh Mẫu Studio</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(formData.gallery || DEFAULT_GALLERY_PHOTOS).map((photo, idx) => (
                        <div
                          key={photo.id || idx}
                          className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2.5 text-xs"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-200 flex-shrink-0 border border-stone-300">
                              <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-wedding-burgundy uppercase">
                                Ảnh #{idx + 1}
                              </span>
                              <input
                                type="text"
                                value={photo.title}
                                onChange={(e) =>
                                  handleGalleryPhotoChange(idx, 'title', e.target.value)
                                }
                                placeholder="Tiêu đề ảnh..."
                                className="w-full px-2 py-1 rounded border border-stone-300 font-serif font-bold text-xs mt-0.5 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <input
                              type="text"
                              value={photo.url}
                              onChange={(e) =>
                                handleGalleryPhotoChange(idx, 'url', e.target.value)
                              }
                              placeholder="Link URL bức ảnh..."
                              className="w-full px-2 py-1 rounded border border-stone-300 font-mono text-[10px] focus:outline-none"
                            />
                          </div>

                          <div>
                            <input
                              type="text"
                              value={photo.caption}
                              onChange={(e) =>
                                handleGalleryPhotoChange(idx, 'caption', e.target.value)
                              }
                              placeholder="Lời chú thích cảm xúc..."
                              className="w-full px-2 py-1 rounded border border-stone-300 text-[11px] italic text-stone-600 focus:outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: HIỆU ỨNG HOẠT ẢNH (ANIMATION EFFECTS) */}
              {activeTab === 'animation' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Floating Particle Styles */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Lựa Chọn Kiểu Hoạt Ảnh Bay Lơ Lửng (Floating Particles)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'mixed_romance',
                          name: 'Hòa Quyện Lãng Mạn',
                          desc: 'Cánh hoa hồng nhung rơi + Bụi sao hoàng kim lung linh + Trái tim phát sáng.',
                          icon: '🌟',
                          badge: 'Được Yêu Thích Nhất',
                        },
                        {
                          id: 'rose_petals',
                          name: 'Cánh Hoa Hồng Rơi',
                          desc: 'Cơn mưa cánh hoa hồng nhung và hoa trắng rơi chầm chậm dịu dàng.',
                          icon: '🌸',
                          badge: 'Ngọt Ngào Thơ Mộng',
                        },
                        {
                          id: 'golden_stardust',
                          name: 'Bụi Sao Hoàng Kim',
                          desc: 'Những hạt bụi vàng và ngôi sao lấp lánh bay ngược lên như đom đóm trong dạ tiệc 5 sao.',
                          icon: '✨',
                          badge: 'Vương Giả & Sang Trọng',
                        },
                        {
                          id: 'glowing_hearts',
                          name: 'Trái Tim Tình Yêu',
                          desc: 'Những trái tim hồng ửng sáng bay bổng khắp màn hình biểu trưng cho tình yêu đong đầy.',
                          icon: '💖',
                          badge: 'Tràn Đầy Cảm Xúc',
                        },
                        {
                          id: 'winter_snow',
                          name: 'Tuyết Trắng Pha Lê',
                          desc: 'Những bông tuyết pha lê 6 cánh lung linh rơi dịu dàng trong tiệc cưới mùa đông.',
                          icon: '❄️',
                          badge: 'Tinh Khôi Mùa Đông',
                        },
                        {
                          id: 'none',
                          name: 'Tối Giản Tĩnh Lặng',
                          desc: 'Tắt hiệu ứng bay để tập trung hoàn toàn vào nội dung và hình ảnh trang trọng.',
                          icon: '🚫',
                          badge: 'Tĩnh Lặng',
                        },
                      ].map((eff) => (
                        <button
                          key={eff.id}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              animationEffect: eff.id as AnimationEffect,
                            })
                          }
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            (formData.animationEffect || 'mixed_romance') === eff.id
                              ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400/40 shadow-sm'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-2xl">{eff.icon}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                                {eff.badge}
                              </span>
                            </div>
                            <span className="font-serif text-xs font-bold text-stone-900 block">
                              {eff.name}
                            </span>
                            <span className="text-[11px] text-stone-500 mt-1 block leading-relaxed">
                              {eff.desc}
                            </span>
                          </div>
                          {(formData.animationEffect || 'mixed_romance') === eff.id && (
                            <div className="mt-3 flex items-center text-[10px] font-bold text-amber-700">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-amber-600" />
                              <span>Đang hoạt động</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Fairy Mouse Trail Toggle */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="font-serif text-sm font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center space-x-2">
                      <Wand2 className="w-4 h-4 text-purple-600" />
                      <span>Vệt Chuột Thần Tiên (Interactive Fairy Mouse Trail)</span>
                    </h4>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50/50 border border-purple-200">
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">
                          Phát sáng sao và trái tim theo con trỏ chuột
                        </span>
                        <span className="text-[11px] text-stone-500 mt-0.5 block">
                          Khi quan khách di chuyển chuột trên máy tính, vệt sáng nhiệm màu sẽ bay theo từng cử chỉ.
                        </span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.enableMouseTrail !== false}
                          onChange={(e) =>
                            setFormData({ ...formData, enableMouseTrail: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: ĐỔI NHẠC NỀN TIỆC CƯỚI */}
              {activeTab === 'music' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center space-x-2">
                          <Music className="w-4 h-4 text-wedding-burgundy" />
                          <span>Kho Nhạc Cưới Tuyển Chọn (Preset Music Tracks)</span>
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Chọn giai điệu êm dịu làm nền khi quan khách mở thiệp cưới
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {PRESET_MUSIC_TRACKS.map((track) => {
                        const isSelected = formData.music?.trackId === track.trackId;
                        const isPlayingThis = previewPlayingId === track.trackId;

                        return (
                          <div
                            key={track.trackId}
                            className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isSelected
                                ? 'border-wedding-burgundy bg-wedding-rose-50/70 ring-1 ring-wedding-burgundy/40 shadow-sm'
                                : 'border-stone-200 hover:border-stone-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              {/* Audio Preview Button */}
                              {track.url ? (
                                <button
                                  type="button"
                                  onClick={() => handleTogglePreview(track.url, track.trackId)}
                                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                                    isPlayingThis
                                      ? 'bg-wedding-burgundy text-white animate-pulse'
                                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                  }`}
                                  title={isPlayingThis ? 'Tạm dừng nghe thử' : 'Nghe thử bản nhạc'}
                                >
                                  {isPlayingThis ? (
                                    <Pause className="w-4 h-4" />
                                  ) : (
                                    <Play className="w-4 h-4 ml-0.5" />
                                  )}
                                </button>
                              ) : (
                                <div
                                  className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700"
                                  title="Bản hòa tấu acoustic tích hợp sẵn"
                                >
                                  <Music className="w-4 h-4" />
                                </div>
                              )}

                              <div>
                                <span className="font-serif text-xs font-bold text-stone-900 block">
                                  {track.title}
                                </span>
                                <span className="text-[11px] text-stone-500 block">
                                  Nghệ sĩ: {track.artist}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, music: track })}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                                isSelected
                                  ? 'bg-wedding-burgundy text-white shadow-md'
                                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                              }`}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Đang Sử Dụng</span>
                                </>
                              ) : (
                                <span>Chọn Bài Này</span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom MP3 Stream URL */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                    <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-wedding-burgundy" />
                      <span>Tải / Dán Link Nhạc MP3 Riêng Của Dâu & Rể</span>
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      Bạn có thể dán trực tiếp bất kỳ link file âm thanh MP3 nào từ hosting hoặc Google Drive / Dropbox trực tiếp.
                    </p>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-stone-600 font-semibold mb-1">
                          Tên Bài Hát & Ca Sĩ
                        </label>
                        <input
                          type="text"
                          value={formData.music?.trackId === 'custom' ? formData.music.title : ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              music: {
                                trackId: 'custom',
                                title: e.target.value || 'Nhạc Cưới Riêng Của Dâu Rể',
                                artist: 'Tùy Chỉnh',
                                url: formData.music?.trackId === 'custom' ? formData.music.url : '',
                              },
                            })
                          }
                          placeholder="VD: Cưới Nhau Đi - Bùi Anh Tuấn & Hiền Hồ"
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-600 font-semibold mb-1">
                          Đường Dẫn File MP3 (Direct URL)
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={formData.music?.trackId === 'custom' ? formData.music.url : ''}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                music: {
                                  trackId: 'custom',
                                  title:
                                    formData.music?.trackId === 'custom' && formData.music.title
                                      ? formData.music.title
                                      : 'Nhạc Cưới Riêng Của Dâu Rể',
                                  artist: 'Tùy Chỉnh',
                                  url: e.target.value,
                                },
                              })
                            }
                            placeholder="https://domain.com/my-wedding-song.mp3"
                            className="flex-1 px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-wedding-burgundy font-mono text-[11px]"
                          />
                          {formData.music?.trackId === 'custom' && formData.music.url && (
                            <button
                              type="button"
                              onClick={() =>
                                handleTogglePreview(formData.music?.url, 'custom_preview')
                              }
                              className="px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center space-x-1 cursor-pointer"
                            >
                              {previewPlayingId === 'custom_preview' ? (
                                <Pause className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                              <span>Thử</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action Bar */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 bg-[#FFFDF9] py-2">
                <div className="text-xs">
                  {saveMessage && (
                    <span className="font-semibold text-emerald-700 flex items-center space-x-1 animate-fadeIn">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{saveMessage}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (previewAudioRef.current) previewAudioRef.current.pause();
                      onClose();
                    }}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:text-stone-900 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Đóng
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-wedding-burgundy to-[#4A1020] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center justify-center space-x-1.5 border border-wedding-gold/60 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Đang Lưu...' : 'Lưu Thay Đổi Ngay'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
