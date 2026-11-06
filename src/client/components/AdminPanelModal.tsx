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
} from 'lucide-react';
import { WeddingData, WeddingTheme, WeddingTemplate, EnvelopeStyle } from '../../shared/types';
import { PRESET_MUSIC_TRACKS } from '../../shared/defaultData';

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
  const [activeTab, setActiveTab] = useState<'couple' | 'event' | 'envelope' | 'music'>('couple');
  const [formData, setFormData] = useState<WeddingData>({ ...currentData });
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
      previewAudioRef.current.play().then(() => {
        setPreviewPlayingId(trackId || 'preview');
      }).catch(() => {});

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FFFDF9] rounded-3xl w-full max-w-4xl max-h-[92vh] border-2 border-wedding-gold/50 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-wedding-burgundy to-[#3A0A17] text-white p-5 px-6 flex items-center justify-between border-b border-wedding-gold/30">
          <div className="flex items-center space-x-2.5">
            <Settings className="w-5 h-5 text-wedding-gold-light animate-spin" style={{ animationDuration: '10s' }} />
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                Bảng Quản Trị Website Cưới
              </h3>
              <p className="text-[11px] text-amber-200/80">
                Tùy chỉnh phong cách thiệp cưới, nhạc nền, thông tin dâu rể, sảnh cưới & màu sắc
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (previewAudioRef.current) previewAudioRef.current.pause();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-full bg-wedding-rose-100 text-wedding-burgundy flex items-center justify-center mx-auto mb-4 border border-wedding-rose-300">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
              Xác Thực Quyền Quản Trị
            </h4>
            <p className="text-xs text-stone-500 mb-6">
              Vui lòng nhập mã PIN bảo vệ để chỉnh sửa nội dung đám cưới (Mã mặc định: <strong className="text-stone-800">123456</strong>)
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Nhập mã PIN 6 số..."
                className="w-full text-center text-xl tracking-widest px-4 py-3 bg-stone-50 border-2 border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wedding-rose-500 font-mono"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-600 font-medium">{pinError}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-wedding-burgundy text-wedding-gold-light hover:bg-wedding-rose-900 font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Mở Bảng Quản Trị
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Management Tabs */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs Navigation */}
            <div className="flex border-b border-stone-200 bg-stone-100/70 overflow-x-auto text-xs font-semibold text-stone-600">
              <button
                type="button"
                onClick={() => setActiveTab('couple')}
                className={`flex items-center space-x-2 px-5 py-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'couple'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white'
                    : 'border-transparent hover:text-stone-900'
                }`}
              >
                <User className="w-4 h-4 text-wedding-gold" />
                <span>Cô Dâu & Chú Rể</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('event')}
                className={`flex items-center space-x-2 px-5 py-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'event'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white'
                    : 'border-transparent hover:text-stone-900'
                }`}
              >
                <Clock className="w-4 h-4 text-wedding-gold" />
                <span>Thời Gian & Sảnh Cưới</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('envelope')}
                className={`flex items-center space-x-2 px-5 py-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'envelope'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white'
                    : 'border-transparent hover:text-stone-900'
                }`}
              >
                <Mail className="w-4 h-4 text-wedding-gold" />
                <span>Phong Cách Thiệp & Form Màu</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('music')}
                className={`flex items-center space-x-2 px-5 py-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'music'
                    ? 'border-wedding-burgundy text-wedding-burgundy bg-white'
                    : 'border-transparent hover:text-stone-900'
                }`}
              >
                <Music className="w-4 h-4 text-wedding-gold" />
                <span>Đổi Nhạc Nền</span>
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* TAB 1: THÔNG TIN DÂU RỂ */}
              {activeTab === 'couple' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Chú Rể */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-wedding-gold/30 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 font-serif text-lg font-bold text-wedding-burgundy border-b border-stone-100 pb-2">
                      <Heart className="w-4 h-4 text-wedding-rose-600 fill-wedding-rose-600" />
                      <span>Thông Tin Chú Rể</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Họ và tên chú rể *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.groom.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              groom: { ...formData.groom, name: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Tên gọi ngắn gọn (Short name)
                        </label>
                        <input
                          type="text"
                          value={formData.groom.shortName || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              groom: { ...formData.groom, shortName: e.target.value },
                            })
                          }
                          placeholder="Tuấn Anh"
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Thân phụ chú rể (Bố)
                        </label>
                        <input
                          type="text"
                          value={formData.groom.parents.father}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              groom: {
                                ...formData.groom,
                                parents: { ...formData.groom.parents, father: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Thân mẫu chú rể (Mẹ)
                        </label>
                        <input
                          type="text"
                          value={formData.groom.parents.mother}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              groom: {
                                ...formData.groom,
                                parents: { ...formData.groom.parents, mother: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Link ảnh đại diện chú rể (URL ảnh)
                        </label>
                        <input
                          type="url"
                          value={formData.groom.avatar}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              groom: { ...formData.groom, avatar: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Số tài khoản ngân hàng mừng cưới
                        </label>
                        <input
                          type="text"
                          value={formData.groom.bankInfo.accountNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              groom: {
                                ...formData.groom,
                                bankInfo: { ...formData.groom.bankInfo, accountNumber: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Tên ngân hàng chú rể
                        </label>
                        <input
                          type="text"
                          value={formData.groom.bankInfo.bankName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              groom: {
                                ...formData.groom,
                                bankInfo: { ...formData.groom.bankInfo, bankName: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cô Dâu */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-wedding-gold/30 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 font-serif text-lg font-bold text-wedding-rose-700 border-b border-stone-100 pb-2">
                      <Heart className="w-4 h-4 text-wedding-rose-600 fill-wedding-rose-600" />
                      <span>Thông Tin Cô Dâu</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Họ và tên cô dâu *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.bride.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bride: { ...formData.bride, name: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Tên gọi ngắn gọn (Short name)
                        </label>
                        <input
                          type="text"
                          value={formData.bride.shortName || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bride: { ...formData.bride, shortName: e.target.value },
                            })
                          }
                          placeholder="Mai Phương"
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Thân phụ cô dâu (Bố)
                        </label>
                        <input
                          type="text"
                          value={formData.bride.parents.father}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bride: {
                                ...formData.bride,
                                parents: { ...formData.bride.parents, father: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Thân mẫu cô dâu (Mẹ)
                        </label>
                        <input
                          type="text"
                          value={formData.bride.parents.mother}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bride: {
                                ...formData.bride,
                                parents: { ...formData.bride.parents, mother: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Link ảnh đại diện cô dâu (URL ảnh)
                        </label>
                        <input
                          type="url"
                          value={formData.bride.avatar}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bride: { ...formData.bride, avatar: e.target.value },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Số tài khoản ngân hàng mừng cưới
                        </label>
                        <input
                          type="text"
                          value={formData.bride.bankInfo.accountNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bride: {
                                ...formData.bride,
                                bankInfo: { ...formData.bride.bankInfo, accountNumber: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Tên ngân hàng cô dâu
                        </label>
                        <input
                          type="text"
                          value={formData.bride.bankInfo.bankName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bride: {
                                ...formData.bride,
                                bankInfo: { ...formData.bride.bankInfo, bankName: e.target.value },
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: THỜI GIAN & SẢNH CƯỚI */}
              {activeTab === 'event' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-wedding-gold/30 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 font-serif text-lg font-bold text-wedding-burgundy border-b border-stone-100 pb-2">
                      <Building2 className="w-4 h-4 text-wedding-gold" />
                      <span>Thông Tin Hôn Lễ & Tiệc Cưới</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Thời gian hiển thị (Chuỗi định dạng)
                        </label>
                        <input
                          type="text"
                          value={formData.weddingDateFormatted}
                          onChange={(e) =>
                            setFormData({ ...formData, weddingDateFormatted: e.target.value })
                          }
                          placeholder="Chủ Nhật, 20 Tháng 11 Năm 2026"
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Tên Sảnh Cưới Đón Khách *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.events[0]?.hallName || ''}
                          onChange={(e) => {
                            const newEvents = [...formData.events];
                            if (newEvents[0]) newEvents[0].hallName = e.target.value;
                            setFormData({ ...formData, events: newEvents });
                          }}
                          placeholder="Sảnh Grand Ballroom (Tầng 3)"
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none font-semibold text-wedding-burgundy"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Tên Trung Tâm Tiệc Cưới / Địa Điểm *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.events[0]?.venueName || ''}
                          onChange={(e) => {
                            const newEvents = [...formData.events];
                            if (newEvents[0]) newEvents[0].venueName = e.target.value;
                            setFormData({ ...formData, events: newEvents });
                          }}
                          placeholder="Trung Tâm Hội Nghị & Tiệc Cưới Riverside Palace"
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Giờ Đón Khách & Khai Tiệc
                        </label>
                        <input
                          type="text"
                          value={formData.events[0]?.time || ''}
                          onChange={(e) => {
                            const newEvents = [...formData.events];
                            if (newEvents[0]) newEvents[0].time = e.target.value;
                            setFormData({ ...formData, events: newEvents });
                          }}
                          placeholder="11:00 SA"
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Địa chỉ sảnh cưới đầy đủ *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.events[0]?.address || ''}
                          onChange={(e) => {
                            const newEvents = [...formData.events];
                            if (newEvents[0]) newEvents[0].address = e.target.value;
                            setFormData({ ...formData, events: newEvents });
                          }}
                          placeholder="360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh"
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                          Đường dẫn chỉ đường Google Maps
                        </label>
                        <input
                          type="url"
                          value={formData.events[0]?.googleMapsUrl || ''}
                          onChange={(e) => {
                            const newEvents = [...formData.events];
                            if (newEvents[0]) newEvents[0].googleMapsUrl = e.target.value;
                            setFormData({ ...formData, events: newEvents });
                          }}
                          placeholder="https://maps.google.com/?q=..."
                          className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PHONG CÁCH THIỆP & FORM MÀU */}
              {activeTab === 'envelope' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Phong Cách Thiệp Cưới Mở Đầu (Envelope Style) */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-wedding-gold/30 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 font-serif text-lg font-bold text-wedding-burgundy border-b border-stone-100 pb-2">
                      <Mail className="w-4 h-4 text-wedding-gold" />
                      <span>Lựa Chọn Phong Cách Thiệp Cưới (Bì Thư Mở Đầu)</span>
                    </div>
                    <p className="text-xs text-stone-500 font-light">
                      Chọn kiểu dáng phong bì và con dấu sáp xuất hiện đầu tiên khi khách mời mở website.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {[
                        {
                          id: 'royal_velvet' as EnvelopeStyle,
                          name: 'Nhung Đỏ Hoàng Gia (Royal Velvet)',
                          desc: 'Chất liệu nhung đỏ thẫm kiêu sa, góc hoa văn cổ điển và con dấu sáp đỏ dập nổi chữ lồng A&P.',
                          badge: 'bg-[#5B1E31] text-amber-200 border-amber-300/40',
                        },
                        {
                          id: 'blush_ribbon' as EnvelopeStyle,
                          name: 'Ruy Băng Lụa & Hồng Phấn (Blush Ribbon)',
                          desc: 'Sắc hồng pastel ngọt ngào với dải ruy băng lụa thắt nơ mềm mại, con dấu hồng kim dịu dàng.',
                          badge: 'bg-[#FCE7F0] text-wedding-rose-800 border-wedding-rose-300',
                        },
                        {
                          id: 'modern_minimal' as EnvelopeStyle,
                          name: 'Tối Giản Ép Kim (Modern Minimal)',
                          desc: 'Giấy mỹ thuật trắng kem cao cấp, viền đôi ép kim mạ vàng tinh tế, phong cách đương đại.',
                          badge: 'bg-[#FFFDF9] text-stone-800 border-wedding-gold',
                        },
                        {
                          id: 'emerald_brass' as EnvelopeStyle,
                          name: 'Ngọc Lục Bảo & Dấu Đồng (Emerald Brass)',
                          desc: 'Sắc xanh ngọc lục bảo quý tộc kết hợp con dấu sáp vàng đồng hoàng gia uy nghi.',
                          badge: 'bg-[#064E3B] text-amber-100 border-amber-400',
                        },
                      ].map((env) => (
                        <div
                          key={env.id}
                          onClick={() => setFormData({ ...formData, envelopeStyle: env.id })}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                            formData.envelopeStyle === env.id
                              ? 'border-wedding-burgundy bg-wedding-rose-50/70 shadow-md ring-2 ring-wedding-gold/40'
                              : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-full border shadow-sm shrink-0 flex items-center justify-center font-bold text-xs ${env.badge}`}
                          >
                            {formData.envelopeStyle === env.id ? <Check className="w-4 h-4" /> : '✉'}
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-stone-900">{env.name}</h5>
                            <p className="text-[11px] text-stone-600 mt-1 font-light leading-relaxed">
                              {env.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Màu (Color Theme) */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-wedding-gold/30 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 font-serif text-lg font-bold text-wedding-burgundy border-b border-stone-100 pb-2">
                      <Palette className="w-4 h-4 text-wedding-gold" />
                      <span>Form Màu Chủ Đạo Của Toàn Website</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 pt-2">
                      {[
                        {
                          id: 'burgundy' as WeddingTheme,
                          name: 'Royal Burgundy',
                          desc: 'Đỏ rượu vang & nhũ vàng hoàng gia',
                          color: '#5B1E31',
                        },
                        {
                          id: 'rose' as WeddingTheme,
                          name: 'Romantic Rose Gold',
                          desc: 'Hồng phấn pastel & cánh hoa hồng',
                          color: '#BE185D',
                        },
                        {
                          id: 'gold' as WeddingTheme,
                          name: 'Luxury Champagne Gold',
                          desc: 'Vàng ánh kim & kem hoàng tộc',
                          color: '#99732B',
                        },
                        {
                          id: 'navy' as WeddingTheme,
                          name: 'Classic Royal Navy',
                          desc: 'Xanh navy quý phái & bạc kim',
                          color: '#0F172A',
                        },
                        {
                          id: 'emerald' as WeddingTheme,
                          name: 'Emerald Elegance',
                          desc: 'Xanh ngọc lục bảo quý tộc',
                          color: '#064E3B',
                        },
                      ].map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setFormData({ ...formData, theme: t.id })}
                          className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center space-x-3 ${
                            formData.theme === t.id
                              ? 'border-wedding-burgundy bg-wedding-rose-50/60 shadow-md ring-2 ring-wedding-gold/40'
                              : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                          }`}
                        >
                          <div
                            className="w-9 h-9 rounded-full shadow-inner shrink-0 flex items-center justify-center text-white"
                            style={{ backgroundColor: t.color }}
                          >
                            {formData.theme === t.id && <Check className="w-4 h-4" />}
                          </div>
                          <div>
                            <h5 className="font-semibold text-xs text-stone-900">{t.name}</h5>
                            <p className="text-[10px] text-stone-500">{t.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ĐỔI NHẠC NỀN ĐÁM CƯỚI */}
              {activeTab === 'music' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-wedding-gold/30 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 font-serif text-lg font-bold text-wedding-burgundy border-b border-stone-100 pb-2">
                      <Music className="w-4 h-4 text-wedding-gold" />
                      <span>Chọn Bản Nhạc Nền Tuyển Chọn</span>
                    </div>
                    <p className="text-xs text-stone-500 font-light">
                      Chọn bài nhạc cưới lãng mạn phát tự động khi khách mở thiệp. Bạn có thể bấm nút <Volume2 className="w-3.5 h-3.5 inline mx-0.5 text-wedding-burgundy" /> để nghe thử trực tiếp.
                    </p>

                    <div className="space-y-3 pt-2">
                      {PRESET_MUSIC_TRACKS.map((track) => {
                        const isSelected = formData.music.trackId === track.trackId;
                        const isPreviewPlaying = previewPlayingId === track.trackId;

                        return (
                          <div
                            key={track.trackId}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                music: {
                                  ...track,
                                  url: track.trackId === 'custom' ? formData.music.url || '' : track.url,
                                },
                              })
                            }
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'border-wedding-burgundy bg-wedding-rose-50/70 shadow-md ring-2 ring-wedding-gold/40'
                                : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isSelected
                                    ? 'bg-wedding-burgundy text-wedding-gold-light'
                                    : 'bg-stone-200 text-stone-600'
                                }`}
                              >
                                {isSelected ? <Check className="w-4 h-4" /> : <Music className="w-4 h-4" />}
                              </div>
                              <div>
                                <h5 className="font-bold text-xs text-stone-900">{track.title}</h5>
                                <p className="text-[11px] text-stone-500">{track.artist}</p>
                              </div>
                            </div>

                            {/* Preview Audio Play/Pause Button */}
                            {track.url && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTogglePreview(track.url, track.trackId);
                                }}
                                className={`p-2 rounded-full border transition-all cursor-pointer ${
                                  isPreviewPlaying
                                    ? 'bg-wedding-rose-600 text-white border-wedding-rose-600 shadow'
                                    : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
                                }`}
                                title={isPreviewPlaying ? 'Dừng nghe thử' : 'Nghe thử'}
                              >
                                {isPreviewPlaying ? (
                                  <Pause className="w-3.5 h-3.5" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 fill-current" />
                                )}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Custom MP3 Audio URL Input */}
                    <div className="pt-4 border-t border-stone-100 space-y-2">
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Đường dẫn link MP3 tự tải lên (Nếu muốn dùng bài hát khác):
                      </label>
                      <input
                        type="url"
                        value={formData.music.url || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            music: {
                              trackId: 'custom',
                              title: formData.music.title || 'Nhạc cưới theo yêu cầu',
                              artist: 'Tự tải lên',
                              url: e.target.value,
                            },
                          })
                        }
                        placeholder="https://example.com/my-wedding-song.mp3"
                        className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none text-stone-800"
                      />
                      <p className="text-[11px] text-stone-400 italic">
                        * Mẹo: Bạn có thể dán link tệp âm thanh trực tiếp (.mp3 / .wav) từ máy chủ lưu trữ hoặc các trang nhạc đám mây.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Sticky Action Bar */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  {saveMessage && (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center space-x-1">
                      <Check className="w-4 h-4" />
                      <span>{saveMessage}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (previewAudioRef.current) previewAudioRef.current.pause();
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-gradient-to-r from-wedding-burgundy to-[#4A1020] hover:opacity-95 text-wedding-gold-light text-xs font-bold rounded-xl shadow-lg flex items-center space-x-2 transition-all cursor-pointer border border-wedding-gold/40"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Đang lưu...' : 'Lưu Cấu Hình Đám Cưới'}</span>
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
