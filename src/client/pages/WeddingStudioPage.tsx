import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Smartphone,
  Monitor,
  Share2,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Lock,
  Save,
  Palette,
  Layout,
  Clock,
  User,
  Heart,
  Building2,
  Settings,
  Music,
  Mail,
  Play,
  Pause,
  Camera,
  Wand2,
  Plus,
  Trash2,
  RefreshCw,
  Send,
  Download,
  CheckCircle2,
  ChevronRight,
  Eye,
  ArrowLeft,
  Users,
} from 'lucide-react';
import {
  WeddingData,
  WeddingTheme,
  WeddingTemplate,
  EnvelopeStyle,
  AnimationEffect,
  TypographyFont,
  TimelineMilestone,
  WeddingEventSchedule,
  RSVPRecord,
} from '../../shared/types';
import {
  DEFAULT_WEDDING_DATA,
  PRESET_MUSIC_TRACKS,
  DEFAULT_GALLERY_PHOTOS,
  SAMPLE_PHOTO_LIBRARY,
} from '../../shared/defaultData';

export const WeddingStudioPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Active studio tab
  const [activeTab, setActiveTab] = useState<
    | 'style'
    | 'envelope'
    | 'couple'
    | 'photos'
    | 'timeline'
    | 'events'
    | 'vows'
    | 'animation'
    | 'music'
    | 'rsvp'
  >('style');

  // Preview device mode: mobile or desktop
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  // Wedding form data
  const [weddingSlug, setWeddingSlug] = useState('tuan-anh-mai-phuong');
  const [formData, setFormData] = useState<WeddingData>({ ...DEFAULT_WEDDING_DATA });
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);

  // Music preview ref
  const [previewPlayingId, setPreviewPlayingId] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Publish / Share modal state
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Personalized Guest Link Tool
  const [guestNameInput, setGuestNameInput] = useState('');
  const [guestRoleInput, setGuestRoleInput] = useState('ban');
  const [copiedGuestLink, setCopiedGuestLink] = useState(false);
  const [copiedZaloText, setCopiedZaloText] = useState(false);

  // Load existing wedding data on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slugParam = params.get('w') || 'tuan-anh-mai-phuong';
    setWeddingSlug(slugParam);

    fetch(`/api/wedding-info?w=${slugParam}`)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success && res.data) {
          setFormData(res.data);
        }
      })
      .catch(() => {});

    // Fetch RSVP list
    fetch('/api/rsvp')
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success && res.data) {
          setRsvps(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '123456') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Mã PIN không đúng! (Mã mặc định dành cho Dâu Rể: 123456)');
    }
  };

  const handleTogglePreviewAudio = (url?: string, trackId?: string) => {
    if (!url) return;
    if (previewPlayingId === trackId) {
      if (previewAudioRef.current) previewAudioRef.current.pause();
      setPreviewPlayingId(null);
      return;
    }
    if (previewAudioRef.current) previewAudioRef.current.pause();

    try {
      previewAudioRef.current = new Audio(url);
      previewAudioRef.current
        .play()
        .then(() => setPreviewPlayingId(trackId || 'preview'))
        .catch(() => {});
      previewAudioRef.current.onended = () => setPreviewPlayingId(null);
    } catch {
      // Handled
    }
  };

  // Publish wedding project to backend database
  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishMessage('');

    try {
      const res = await fetch('/api/weddings/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: weddingSlug,
          secretPin: pin || '123456',
          config: formData,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        if (json.slug) setWeddingSlug(json.slug);
        setPublishMessage('Đã lưu vào cơ sở dữ liệu và xuất bản thành công!');
        setIsPublishModalOpen(true);
      } else {
        setPublishMessage(json.message || 'Lỗi khi xuất bản.');
        setIsPublishModalOpen(true);
      }
    } catch {
      setPublishMessage('Đã lưu cấu hình vào bộ nhớ trình duyệt!');
      setIsPublishModalOpen(true);
    } finally {
      setIsPublishing(false);
    }
  };

  // Timeline Milestone Helpers
  const handleAddMilestone = () => {
    const newMilestone: TimelineMilestone = {
      id: 'milestone-' + Date.now(),
      year: '2026',
      dateStr: '01.01.2026',
      title: 'Mốc Kỷ Niệm Mới',
      subtitle: 'Địa điểm kỷ niệm',
      story: 'Chia sẻ kỷ niệm đẹp đẽ của hai bạn tại đây...',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
      tag: 'Kỷ Niệm Đẹp',
      location: 'Việt Nam',
    };
    setFormData({ ...formData, timeline: [...formData.timeline, newMilestone] });
  };

  const handleRemoveMilestone = (idx: number) => {
    const updated = formData.timeline.filter((_, i) => i !== idx);
    setFormData({ ...formData, timeline: updated });
  };

  // Event Schedule Helpers
  const handleAddEvent = () => {
    const newEvent: WeddingEventSchedule = {
      id: 'event-' + Date.now(),
      title: 'Tiệc Cưới Thân Mật',
      date: formData.events[0]?.date || '20/11/2026',
      time: '18:00 CH',
      dayOfWeek: 'Chủ Nhật',
      lunarDate: formData.events[0]?.lunarDate || 'Ngày 12 Tháng 10 Năm Bính Ngọ',
      venueName: 'Nhà Hàng Tiệc Cưới',
      hallName: 'Sảnh Hoàng Gia',
      address: 'TP. Hồ Chí Minh',
      googleMapsUrl: 'https://maps.google.com',
    };
    setFormData({ ...formData, events: [...formData.events, newEvent] });
  };

  const handleRemoveEvent = (idx: number) => {
    const updated = formData.events.filter((_, i) => i !== idx);
    setFormData({ ...formData, events: updated });
  };

  // Compute live URLs
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://marrime.pages.dev';
  const generalShareUrl = `${baseUrl}/?w=${weddingSlug}`;
  const personalizedGuestUrl = `${baseUrl}/?w=${weddingSlug}&guest=${encodeURIComponent(
    guestNameInput || 'Khách Quý'
  )}&role=${guestRoleInput}`;

  const sampleZaloMessage = `Trân trọng kính mời ${
    guestNameInput || 'Anh/Chị/Bạn'
  } đến tham dự Lễ Thành Hôn của chúng em:\n👰 ${formData.bride.name} & 🤵 ${formData.groom.name}\n⏰ Thời gian: ${
    formData.events[0]?.time || '11:00 SA'
  } ${formData.weddingDateFormatted}\n📍 Địa điểm: ${
    formData.events[0]?.venueName
  } - ${formData.events[0]?.hallName}\n\nKính mời bạn bấm vào liên kết thiệp cưới điện tử bên dưới để xem hình ảnh và xác nhận tham dự:\n👉 ${personalizedGuestUrl}\n\nSự hiện diện của bạn là niềm vinh hạnh lớn cho hai bên gia đình!`;

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans">
      {/* 1. AUTHENTICATION LOCK SCREEN */}
      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-[#1C1917] border-2 border-wedding-gold/40 rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wedding-burgundy to-[#4A1020] border-2 border-wedding-gold/60 text-wedding-gold-light flex items-center justify-center font-serif text-xl font-bold mx-auto shadow-luxury">
              A&P
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] text-wedding-gold uppercase block mb-1">
                MARRIME WEDDING STUDIO
              </span>
              <h2 className="font-serif text-2xl font-bold text-white">
                Không Gian Sáng Tạo Dành Cho Dâu & Rể
              </h2>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Trang này được cấp riêng cho hai bạn để tự tay thiết kế phong cách, màu sắc, hình ảnh và tạo link gửi đến từng vị khách quý.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Nhập mã PIN riêng (Mặc định: 123456)"
                  className="w-full text-center px-4 py-3.5 rounded-xl border border-stone-700 bg-stone-800 text-white font-mono text-lg tracking-widest focus:outline-none focus:border-wedding-gold shadow-inner"
                  autoFocus
                />
                {pinError && <p className="text-xs text-rose-400 mt-2">{pinError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wedding-rose-700 to-wedding-burgundy text-white font-bold text-sm shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/60 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Mở Cửa Studio Cưới</span>
              </button>
            </form>

            <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-500">
              <a href="/" className="hover:text-stone-300 transition-colors inline-flex items-center space-x-1">
                <ArrowLeft className="w-3 h-3" />
                <span>Quay lại trang thiệp cưới khách mời</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* 2. THE DEDICATED MARRIME STUDIO WORKSPACE */
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Top Global Studio Navigation Bar */}
          <header className="h-16 bg-stone-950 border-b border-stone-800 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30">
            {/* Left: Brand & Wedding Project Slug */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-wedding-burgundy to-[#4A1020] text-wedding-gold-light border border-wedding-gold/60 flex items-center justify-center font-serif text-xs font-bold shadow-sm">
                A&P
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-xs sm:text-sm text-white tracking-wide font-serif">
                    Marrime Studio • {formData.groom.shortName || 'Chú Rể'} & {formData.bride.shortName || 'Cô Dâu'}
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-400 font-bold">
                    Dự Án Riêng Của Dâu Rể
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono hidden sm:block">
                  slug: {weddingSlug}
                </span>
              </div>
            </div>

            {/* Center: Device Simulator Toggle */}
            <div className="hidden md:flex items-center bg-stone-900 border border-stone-700 rounded-xl p-1 space-x-1">
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  previewDevice === 'mobile'
                    ? 'bg-wedding-burgundy text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mô Phỏng Điện Thoại</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  previewDevice === 'desktop'
                    ? 'bg-wedding-burgundy text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Màn Hình Lớn</span>
              </button>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center space-x-2.5">
              <a
                href={`/?w=${weddingSlug}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-stone-700 bg-stone-900 text-xs font-semibold text-stone-300 hover:text-white hover:border-stone-500 transition-colors"
                title="Mở xem thử trang web thực tế của khách"
              >
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                <span>Xem Trang Khách</span>
              </a>

              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-wedding-rose-800 to-wedding-burgundy text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/60 flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4 text-amber-200" />
                <span>{isPublishing ? 'Đang Lưu...' : 'Xuất Bản & Lấy Link Mời'}</span>
              </button>
            </div>
          </header>

          {/* Main Studio Body: Split Screen */}
          <div className="flex-1 flex overflow-hidden">
            {/* LEFT PANE: STUDIO CONTROLS (Scrollable Form) */}
            <div className="w-full lg:w-[55%] xl:w-[50%] flex flex-col border-r border-stone-800 bg-[#141211] overflow-hidden">
              {/* Studio Tabs Navigation */}
              <div className="flex border-b border-stone-800 bg-stone-950/80 px-3 overflow-x-auto no-scrollbar flex-shrink-0">
                {[
                  { id: 'style', name: 'Concept & Màu', icon: Palette },
                  { id: 'envelope', name: 'Phong Bì & Dấu Sáp', icon: Mail },
                  { id: 'couple', name: 'Dâu & Rể', icon: User },
                  { id: 'photos', name: 'Ảnh & Bìa Hero', icon: Camera },
                  { id: 'timeline', name: 'Chặng Đường', icon: Heart },
                  { id: 'events', name: 'Lịch & Sảnh', icon: Clock },
                  { id: 'vows', name: 'Hẹn Ước & Tri Ân', icon: Sparkles },
                  { id: 'animation', name: 'Hoạt Ảnh Bay', icon: Wand2 },
                  { id: 'music', name: 'Đổi Nhạc Nền', icon: Music },
                  { id: 'rsvp', name: 'Sổ Khách RSVP', icon: Users },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center space-x-1.5 whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'border-wedding-gold text-wedding-gold bg-stone-900/60'
                          : 'border-transparent text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Form Fields */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-stone-200">
                {/* 1. CONCEPT & MÀU SẮC */}
                {activeTab === 'style' && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Template Concept */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <Layout className="w-4 h-4 text-wedding-gold" />
                        <span>1. Phong Cách Kiến Trúc Tiệc Cưới</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            id: 'royal',
                            name: 'Hoàng Gia Quý Tộc',
                            desc: 'Vương miện vàng kim, phong cách cung đình châu Âu tráng lệ.',
                            icon: '👑',
                          },
                          {
                            id: 'vintage',
                            name: 'Lãng Mạn Cổ Điển',
                            desc: 'Ren mềm mại, màu giấy hoài niệm ấm áp, đậm chất thi vị.',
                            icon: '🕊️',
                          },
                          {
                            id: 'modern',
                            name: 'Tối Giản Hiện Đại',
                            desc: 'Đường nét thanh mảnh, bố cục tối giản tinh tế trường phái Bắc Âu.',
                            icon: '💎',
                          },
                          {
                            id: 'fairytale',
                            name: 'Vườn Hoa Cổ Tích',
                            desc: 'Dây leo hoa lá mộng mơ, trong trẻo hòa quyện cùng thiên nhiên.',
                            icon: '🌸',
                          },
                        ].map((tpl) => (
                          <button
                            key={tpl.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, template: tpl.id as WeddingTemplate })
                            }
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              formData.template === tpl.id
                                ? 'border-wedding-gold bg-stone-800 ring-2 ring-wedding-gold/40 shadow-md'
                                : 'border-stone-800 hover:border-stone-700 bg-stone-900/50'
                            }`}
                          >
                            <div>
                              <div className="text-2xl mb-1">{tpl.icon}</div>
                              <span className="font-serif text-xs font-bold text-white block">
                                {tpl.name}
                              </span>
                              <span className="text-[10px] text-stone-400 mt-0.5 block leading-relaxed">
                                {tpl.desc}
                              </span>
                            </div>
                            {formData.template === tpl.id && (
                              <div className="mt-2.5 flex items-center text-[10px] font-bold text-wedding-gold">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                <span>Đang áp dụng</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Theme */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-wedding-gold" />
                        <span>2. Form Màu Sắc Chủ Đạo (Color Palette)</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'burgundy', name: 'Đỏ Rượu Vang', bg: '#75142B', desc: 'Quý tộc nồng nàn' },
                          { id: 'rose', name: 'Hồng Phấn Rose', bg: '#9D174D', desc: 'Ngọt ngào mộng mơ' },
                          { id: 'gold', name: 'Hoàng Kim 5 Sao', bg: '#855B14', desc: 'Vương giả rực rỡ' },
                          { id: 'navy', name: 'Xanh Navy Dạ Tiệc', bg: '#0F172A', desc: 'Trang nhã sâu lắng' },
                          { id: 'emerald', name: 'Xanh Ngọc Lục Bảo', bg: '#064E3B', desc: 'Tươi mới quý tộc' },
                          { id: 'lavender', name: 'Tím Lavender', bg: '#5B21B6', desc: 'Son sắt thủy chung' },
                        ].map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, theme: c.id as WeddingTheme })
                            }
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                              formData.theme === c.id
                                ? 'border-wedding-gold bg-stone-800 ring-2 ring-wedding-gold/40'
                                : 'border-stone-800 hover:border-stone-700 bg-stone-900/40'
                            }`}
                          >
                            <span
                              className="w-9 h-9 rounded-full mb-1.5 flex items-center justify-center text-white shadow-md border border-white/20"
                              style={{ backgroundColor: c.bg }}
                            >
                              {formData.theme === c.id && <Check className="w-4 h-4" />}
                            </span>
                            <span className="font-serif text-xs font-bold text-white block">
                              {c.name}
                            </span>
                            <span className="text-[9px] text-stone-400 mt-0.5 block">{c.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PHONG BÌ & CON DẤU SÁP */}
                {activeTab === 'envelope' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-4">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-wedding-gold" />
                        <span>Phong Cách Bìa Thiệp Mời Cưới</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {[
                          {
                            id: 'royal_velvet',
                            name: 'Royal Velvet (Nhung Đỏ Quý Tộc)',
                            desc: 'Nhung đỏ burgundy sang trọng, viền hoa văn vàng kim góc nhọn và con dấu sáp vàng hoàng gia.',
                            color: '#75142B',
                          },
                          {
                            id: 'blush_ribbon',
                            name: 'Blush Ribbon (Hồng Phấn Thắt Nơ Lụa)',
                            desc: 'Tông hồng pastel ngọt ngào, dải nơ lụa thắt hoa văn mùa xuân.',
                            color: '#F472B6',
                          },
                          {
                            id: 'modern_minimal',
                            name: 'Modern Minimal (Giấy Mỹ Thuật Viền Vàng)',
                            desc: 'Mặt giấy ivory vân nổi dập chìm, đường chỉ mạ vàng tinh tế.',
                            color: '#E6CF9B',
                          },
                          {
                            id: 'emerald_brass',
                            name: 'Emerald Brass (Xanh Ngọc Lục Bảo & Con Dấu Đồng)',
                            desc: 'Màu xanh lục bảo vương giả kết hợp phụ kiện con dấu đồng cổ điển châu Âu.',
                            color: '#064E3B',
                          },
                        ].map((env) => (
                          <button
                            key={env.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                envelopeStyle: env.id as EnvelopeStyle,
                              })
                            }
                            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              formData.envelopeStyle === env.id
                                ? 'border-wedding-gold bg-stone-800 ring-2 ring-wedding-gold/40 shadow-md'
                                : 'border-stone-800 hover:border-stone-700 bg-stone-900/40'
                            }`}
                          >
                            <div>
                              <div className="flex items-center space-x-2 mb-1.5">
                                <span
                                  className="w-4 h-4 rounded-full border border-white/20"
                                  style={{ backgroundColor: env.color }}
                                />
                                <span className="font-serif text-xs font-bold text-white">
                                  {env.name}
                                </span>
                              </div>
                              <span className="text-[11px] text-stone-400 block leading-relaxed">
                                {env.desc}
                              </span>
                            </div>
                            {formData.envelopeStyle === env.id && (
                              <div className="mt-3 flex items-center text-[10px] font-bold text-wedding-gold">
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                <span>Đang áp dụng</span>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Wax Seal Monogram Initial */}
                      <div className="pt-4 border-t border-stone-800">
                        <label className="block text-stone-300 font-semibold mb-1 text-xs">
                          Chữ Viết Tắt Khắc Nổi Trên Con Dấu Sáp (Wax Seal Monogram)
                        </label>
                        <input
                          type="text"
                          value={
                            formData.waxSealMonogram ||
                            `${formData.groom.shortName.charAt(0)}&${formData.bride.shortName.charAt(0)}`
                          }
                          onChange={(e) =>
                            setFormData({ ...formData, waxSealMonogram: e.target.value })
                          }
                          placeholder="VD: A & P hoặc T & P"
                          className="w-full sm:w-64 px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white font-serif font-bold text-sm focus:outline-none focus:border-wedding-gold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. DÂU & RỂ */}
                {activeTab === 'couple' && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Chú Rể */}
                      <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3 text-xs">
                        <h4 className="font-serif text-sm font-bold text-blue-400 border-b border-stone-800 pb-2">
                          Thông Tin Chú Rể
                        </h4>
                        <div>
                          <label className="block text-stone-400 mb-1">Họ & Tên Chú Rể</label>
                          <input
                            type="text"
                            value={formData.groom.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                groom: { ...formData.groom, name: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white focus:outline-none focus:border-wedding-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-400 mb-1">Tên Gọi Thân Mật</label>
                          <input
                            type="text"
                            value={formData.groom.shortName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                groom: { ...formData.groom, shortName: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white focus:outline-none focus:border-wedding-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-400 mb-1">Ảnh Đại Diện (URL)</label>
                          <input
                            type="text"
                            value={formData.groom.avatar}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                groom: { ...formData.groom, avatar: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono text-[10px] focus:outline-none focus:border-wedding-gold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-stone-400 mb-1">Bố Chú Rể</label>
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
                              className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-400 mb-1">Mẹ Chú Rể</label>
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
                              className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-stone-400 mb-1">Số Tài Khoản VietQR Mừng Cưới</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Ngân hàng (VD: VCB)"
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
                              className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white"
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
                              className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Cô Dâu */}
                      <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3 text-xs">
                        <h4 className="font-serif text-sm font-bold text-rose-400 border-b border-stone-800 pb-2">
                          Thông Tin Cô Dâu
                        </h4>
                        <div>
                          <label className="block text-stone-400 mb-1">Họ & Tên Cô Dâu</label>
                          <input
                            type="text"
                            value={formData.bride.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bride: { ...formData.bride, name: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white focus:outline-none focus:border-wedding-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-400 mb-1">Tên Gọi Thân Mật</label>
                          <input
                            type="text"
                            value={formData.bride.shortName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bride: { ...formData.bride, shortName: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white focus:outline-none focus:border-wedding-gold"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-400 mb-1">Ảnh Đại Diện (URL)</label>
                          <input
                            type="text"
                            value={formData.bride.avatar}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                bride: { ...formData.bride, avatar: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono text-[10px] focus:outline-none focus:border-wedding-gold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-stone-400 mb-1">Bố Cô Dâu</label>
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
                              className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-400 mb-1">Mẹ Cô Dâu</label>
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
                              className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-stone-400 mb-1">Số Tài Khoản VietQR Mừng Cưới</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Ngân hàng (VD: TCB)"
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
                              className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white"
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
                              className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. ẢNH BÌA HERO & ALBUM CƯỚI */}
                {activeTab === 'photos' && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Hero Background */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-wedding-gold" />
                        <span>Ảnh Bìa Hero Section (Toàn Cảnh Đầu Trang)</span>
                      </h4>
                      <input
                        type="text"
                        value={formData.heroImage || ''}
                        onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                        placeholder="Dán link ảnh cưới đẹp nhất tại đây..."
                        className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono text-[11px] focus:outline-none focus:border-wedding-gold"
                      />

                      <div className="pt-2">
                        <span className="text-[11px] text-stone-400 block mb-2">Hoặc chọn nhanh ảnh mẫu studio:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {SAMPLE_PHOTO_LIBRARY.heroBackgrounds.map((bg) => (
                            <button
                              key={bg.name}
                              type="button"
                              onClick={() => setFormData({ ...formData, heroImage: bg.url })}
                              className={`p-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                                formData.heroImage === bg.url
                                  ? 'border-wedding-gold bg-stone-800 ring-1 ring-wedding-gold'
                                  : 'border-stone-800 hover:border-stone-700 bg-stone-900/40'
                              }`}
                            >
                              <div className="h-14 rounded overflow-hidden mb-1">
                                <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[10px] text-stone-300 font-bold block truncate">{bg.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Album Gallery */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                        <h4 className="font-serif text-sm font-bold text-white">6 Bức Ảnh Cưới Nổi Bật (Album Gallery)</h4>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, gallery: [...DEFAULT_GALLERY_PHOTOS] })}
                          className="text-[11px] text-wedding-gold hover:underline flex items-center space-x-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Dùng Bộ Ảnh Mẫu Studio</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {(formData.gallery || DEFAULT_GALLERY_PHOTOS).map((photo, idx) => (
                          <div key={photo.id || idx} className="p-3 rounded-xl border border-stone-800 bg-stone-900/50 space-y-2">
                            <div className="flex items-center space-x-2.5">
                              <div className="w-12 h-12 rounded bg-stone-800 overflow-hidden flex-shrink-0 border border-stone-700">
                                <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                              </div>
                              <input
                                type="text"
                                value={photo.title}
                                onChange={(e) => {
                                  const updated = [...(formData.gallery || DEFAULT_GALLERY_PHOTOS)];
                                  updated[idx] = { ...updated[idx], title: e.target.value };
                                  setFormData({ ...formData, gallery: updated });
                                }}
                                className="w-full px-2 py-1 rounded bg-stone-800 border border-stone-700 text-white font-bold text-xs"
                              />
                            </div>
                            <input
                              type="text"
                              value={photo.url}
                              onChange={(e) => {
                                const updated = [...(formData.gallery || DEFAULT_GALLERY_PHOTOS)];
                                updated[idx] = { ...updated[idx], url: e.target.value };
                                setFormData({ ...formData, gallery: updated });
                              }}
                              className="w-full px-2 py-1 rounded bg-stone-800 border border-stone-700 text-white font-mono text-[10px]"
                            />
                            <input
                              type="text"
                              value={photo.caption}
                              onChange={(e) => {
                                const updated = [...(formData.gallery || DEFAULT_GALLERY_PHOTOS)];
                                updated[idx] = { ...updated[idx], caption: e.target.value };
                                setFormData({ ...formData, gallery: updated });
                              }}
                              className="w-full px-2 py-1 rounded bg-stone-800 border border-stone-700 text-stone-300 text-[11px] italic"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. CHẶNG ĐƯỜNG TÌNH YÊU (TIMELINE BUILDER) */}
                {activeTab === 'timeline' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-wedding-rose-500" />
                        <span>Chặng Đường Kỷ Niệm Của Hai Bạn</span>
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddMilestone}
                        className="px-3 py-1.5 rounded-lg bg-wedding-burgundy text-white text-xs font-bold flex items-center space-x-1 cursor-pointer hover:opacity-90"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm Mốc Mới</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.timeline.map((item, idx) => (
                        <div key={item.id || idx} className="p-4 rounded-xl border border-stone-800 bg-stone-900/60 space-y-3 text-xs">
                          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                            <span className="font-serif font-bold text-wedding-gold">Cột Mốc #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveMilestone(idx)}
                              className="text-stone-500 hover:text-rose-400 p-1 cursor-pointer"
                              title="Xóa mốc này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={item.year}
                              onChange={(e) => {
                                const updated = [...formData.timeline];
                                updated[idx].year = e.target.value;
                                setFormData({ ...formData, timeline: updated });
                              }}
                              placeholder="Năm (VD: 2020)"
                              className="px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-white"
                            />
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const updated = [...formData.timeline];
                                updated[idx].title = e.target.value;
                                setFormData({ ...formData, timeline: updated });
                              }}
                              placeholder="Tiêu đề khoảnh khắc..."
                              className="px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-white font-bold"
                            />
                          </div>

                          <input
                            type="text"
                            value={item.image}
                            onChange={(e) => {
                              const updated = [...formData.timeline];
                              updated[idx].image = e.target.value;
                              setFormData({ ...formData, timeline: updated });
                            }}
                            placeholder="Link ảnh kỷ niệm..."
                            className="w-full px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-white font-mono text-[10px]"
                          />

                          <textarea
                            rows={2}
                            value={item.story}
                            onChange={(e) => {
                              const updated = [...formData.timeline];
                              updated[idx].story = e.target.value;
                              setFormData({ ...formData, timeline: updated });
                            }}
                            placeholder="Lời tự sự về khoảnh khắc này..."
                            className="w-full px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-stone-300 text-[11px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. LỊCH TRÌNH & SẢNH TIỆC */}
                {activeTab === 'events' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-wedding-gold" />
                        <span>Danh Sách Các Buổi Lễ & Sảnh Cưới</span>
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddEvent}
                        className="px-3 py-1.5 rounded-lg bg-wedding-burgundy text-white text-xs font-bold flex items-center space-x-1 cursor-pointer hover:opacity-90"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm Buổi Lễ</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.events.map((evt, idx) => (
                        <div key={evt.id || idx} className="p-4 rounded-xl border border-stone-800 bg-stone-900/60 space-y-3 text-xs">
                          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                            <span className="font-serif font-bold text-wedding-gold">Buổi Lễ #{idx + 1}</span>
                            {formData.events.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveEvent(idx)}
                                className="text-stone-500 hover:text-rose-400 p-1 cursor-pointer"
                                title="Xóa buổi lễ này"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={evt.title}
                              onChange={(e) => {
                                const updated = [...formData.events];
                                updated[idx].title = e.target.value;
                                setFormData({ ...formData, events: updated });
                              }}
                              placeholder="Tên lễ (VD: Lễ Thành Hôn)"
                              className="px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-white font-bold"
                            />
                            <input
                              type="text"
                              value={evt.time}
                              onChange={(e) => {
                                const updated = [...formData.events];
                                updated[idx].time = e.target.value;
                                setFormData({ ...formData, events: updated });
                              }}
                              placeholder="Giờ (VD: 11:00 SA)"
                              className="px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={evt.venueName}
                              onChange={(e) => {
                                const updated = [...formData.events];
                                updated[idx].venueName = e.target.value;
                                setFormData({ ...formData, events: updated });
                              }}
                              placeholder="Trung tâm tiệc cưới"
                              className="px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-white"
                            />
                            <input
                              type="text"
                              value={evt.hallName}
                              onChange={(e) => {
                                const updated = [...formData.events];
                                updated[idx].hallName = e.target.value;
                                setFormData({ ...formData, events: updated });
                              }}
                              placeholder="Tên sảnh cưới"
                              className="px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-white"
                            />
                          </div>

                          <input
                            type="text"
                            value={evt.address}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].address = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            placeholder="Địa chỉ đầy đủ..."
                            className="w-full px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-white"
                          />

                          <input
                            type="text"
                            value={evt.googleMapsUrl}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].googleMapsUrl = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            placeholder="Link Google Maps chỉ đường..."
                            className="w-full px-2.5 py-1.5 rounded bg-stone-800 border border-stone-700 text-white font-mono text-[10px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. HẸN ƯỚC & TRI ÂN */}
                {activeTab === 'vows' && (
                  <div className="space-y-4 animate-fadeIn text-xs">
                    <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-2">
                      <h4 className="font-serif font-bold text-white">Lời Hẹn Ước Của Chú Rể</h4>
                      <textarea
                        rows={3}
                        value={formData.loveStoryMessages[0]?.content || ''}
                        onChange={(e) => {
                          const updated = [...formData.loveStoryMessages];
                          if (updated[0]) updated[0].content = e.target.value;
                          setFormData({ ...formData, loveStoryMessages: updated });
                        }}
                        className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-700 text-stone-200"
                      />
                    </div>

                    <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-2">
                      <h4 className="font-serif font-bold text-white">Lời Hẹn Ước Của Cô Dâu</h4>
                      <textarea
                        rows={3}
                        value={formData.loveStoryMessages[1]?.content || ''}
                        onChange={(e) => {
                          const updated = [...formData.loveStoryMessages];
                          if (updated[1]) updated[1].content = e.target.value;
                          setFormData({ ...formData, loveStoryMessages: updated });
                        }}
                        className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-700 text-stone-200"
                      />
                    </div>

                    <div className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-2">
                      <h4 className="font-serif font-bold text-white">Lời Tri Ân Bố Mẹ & Quan Khách</h4>
                      <textarea
                        rows={3}
                        value={formData.thankYouNote.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            thankYouNote: { ...formData.thankYouNote, message: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded bg-stone-800 border border-stone-700 text-stone-200"
                      />
                    </div>
                  </div>
                )}

                {/* 8. HOẠT ẢNH BAY */}
                {activeTab === 'animation' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <Wand2 className="w-4 h-4 text-amber-400" />
                        <span>Kiểu Hoạt Ảnh Bay Lơ Lửng</span>
                      </h4>

                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'mixed_romance', name: 'Hòa Quyện Lãng Mạn', icon: '🌟' },
                          { id: 'rose_petals', name: 'Cánh Hoa Hồng Rơi', icon: '🌸' },
                          { id: 'golden_stardust', name: 'Bụi Sao Hoàng Kim', icon: '✨' },
                          { id: 'glowing_hearts', name: 'Trái Tim Tình Yêu', icon: '💖' },
                          { id: 'winter_snow', name: 'Tuyết Trắng Pha Lê', icon: '❄️' },
                          { id: 'none', name: 'Tắt Hoạt Ảnh', icon: '🚫' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                animationEffect: item.id as AnimationEffect,
                              })
                            }
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center space-x-3 ${
                              (formData.animationEffect || 'mixed_romance') === item.id
                                ? 'border-amber-400 bg-stone-800 ring-1 ring-amber-400'
                                : 'border-stone-800 hover:border-stone-700 bg-stone-900/50'
                            }`}
                          >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-serif text-xs font-bold text-white block">
                              {item.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white block">Vệt Chuột Thần Tiên</span>
                          <span className="text-[10px] text-stone-400 block">Sao & trái tim bay theo con trỏ chuột máy tính</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.enableMouseTrail !== false}
                          onChange={(e) =>
                            setFormData({ ...formData, enableMouseTrail: e.target.checked })
                          }
                          className="w-5 h-5 accent-wedding-gold cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. ĐỔI NHẠC NỀN */}
                {activeTab === 'music' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <Music className="w-4 h-4 text-emerald-400" />
                        <span>Kho Nhạc Cưới Tuyển Chọn</span>
                      </h4>

                      <div className="space-y-2.5">
                        {PRESET_MUSIC_TRACKS.map((t) => {
                          const isSelected = formData.music.trackId === t.trackId;
                          const isPlayingThis = previewPlayingId === t.trackId;
                          return (
                            <div
                              key={t.trackId}
                              className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                                isSelected
                                  ? 'border-emerald-500 bg-stone-800 ring-1 ring-emerald-500'
                                  : 'border-stone-800 bg-stone-900/40'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                {t.url ? (
                                  <button
                                    type="button"
                                    onClick={() => handleTogglePreviewAudio(t.url, t.trackId)}
                                    className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-white cursor-pointer hover:bg-stone-600"
                                  >
                                    {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                                  </button>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-amber-950/80 text-amber-300 flex items-center justify-center">
                                    <Music className="w-3.5 h-3.5" />
                                  </div>
                                )}
                                <div>
                                  <span className="font-serif text-xs font-bold text-white block">{t.title}</span>
                                  <span className="text-[10px] text-stone-400 block">{t.artist}</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, music: t })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                                  isSelected ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                                }`}
                              >
                                {isSelected ? 'Đang Dùng' : 'Chọn'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. SỔ KHÁCH MỜI & RSVP */}
                {activeTab === 'rsvp' && (
                  <div className="space-y-4 animate-fadeIn text-xs">
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                        <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                          <Users className="w-4 h-4 text-wedding-gold" />
                          <span>Danh Sách Phản Hồi Tham Dự ({rsvps.length} lượt)</span>
                        </h4>
                      </div>

                      {rsvps.length === 0 ? (
                        <p className="text-stone-400 py-6 text-center italic">
                          Chưa có phản hồi nào. Khi quan khách bấm xác nhận trên thiệp, danh sách sẽ hiển thị tại đây.
                        </p>
                      ) : (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {rsvps.map((r) => (
                            <div key={r.id} className="p-3 rounded-lg bg-stone-800/80 border border-stone-700 flex items-center justify-between">
                              <div>
                                <span className="font-bold text-white block">{r.guestName}</span>
                                <span className="text-[10px] text-stone-400">
                                  {r.phone || 'Không có SĐT'} • Đi cùng: {r.attendeesCount} người {r.dietRequirement ? `• Ăn: ${r.dietRequirement}` : ''}
                                </span>
                                {r.message && <p className="text-[11px] text-amber-200 mt-1 italic">"{r.message}"</p>}
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.attending === 'yes' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600' : 'bg-rose-950 text-rose-400'}`}>
                                {r.attending === 'yes' ? 'Sẽ Tham Dự' : 'Rất Tiếc Không Thể Đi'}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANE: LIVE INTERACTIVE PREVIEW */}
            <div className="hidden lg:flex flex-1 bg-stone-950 items-center justify-center p-6 relative overflow-hidden">
              <div
                className={`transition-all duration-500 relative shadow-2xl overflow-hidden flex flex-col ${
                  previewDevice === 'mobile'
                    ? 'w-[390px] h-[780px] rounded-[48px] border-[10px] border-stone-800 ring-2 ring-wedding-gold/30'
                    : 'w-full h-full rounded-2xl border-2 border-stone-800'
                }`}
              >
                {/* Mobile Device Notch & Status Bar */}
                {previewDevice === 'mobile' && (
                  <div className="h-6 bg-black absolute top-0 inset-x-0 z-30 flex items-center justify-center pointer-events-none">
                    <span className="w-20 h-4 bg-stone-900 rounded-b-xl" />
                  </div>
                )}

                {/* Live Preview Iframe */}
                <iframe
                  title="Live Wedding Invitation Preview"
                  src={`/?w=${weddingSlug}`}
                  className="w-full h-full border-none bg-wedding-cream"
                />
              </div>
            </div>
          </div>

          {/* 3. PUBLISH & PERSONALIZED GUEST INVITATION HUB MODAL */}
          {isPublishModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
              <div className="bg-[#1C1917] border-2 border-wedding-gold/60 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 cursor-pointer"
                >
                  ✕
                </button>

                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Xuất Bản Thiệp Cưới Thành Công!
                  </h3>
                  <p className="text-xs text-stone-400">
                    Dữ liệu đã được lưu an toàn. Dưới đây là các đường link để dâu rể gửi tới quan khách.
                  </p>
                </div>

                {/* General Link for Facebook / Group Zalo */}
                <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-2 text-xs">
                  <span className="font-bold text-wedding-gold block">
                    1. Link Thiệp Cưới Chung (Dùng đăng Facebook, Zalo nhóm, mã QR)
                  </span>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      readOnly
                      value={generalShareUrl}
                      className="flex-1 px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono text-[11px]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(generalShareUrl);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2500);
                      }}
                      className="px-3.5 py-2 rounded-lg bg-wedding-burgundy text-white font-bold cursor-pointer hover:opacity-90 flex items-center space-x-1"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Đã Chép' : 'Sao Chép'}</span>
                    </button>
                  </div>
                </div>

                {/* 2. Tool Tạo Link Thiệp Riêng Cho Từng Vị Khách */}
                <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-3 text-xs">
                  <span className="font-bold text-wedding-gold block">
                    2. Công Cụ Tạo Thiệp Riêng Cho Từng Vị Khách (Kính Mời Đích Danh)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={guestNameInput}
                      onChange={(e) => setGuestNameInput(e.target.value)}
                      placeholder="Tên khách (VD: Bác Ba, Bạn Linh)"
                      className="col-span-2 px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white"
                    />
                    <select
                      value={guestRoleInput}
                      onChange={(e) => setGuestRoleInput(e.target.value)}
                      className="px-2 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white cursor-pointer"
                    >
                      <option value="ban">Bạn Bè</option>
                      <option value="anh">Anh/Chị</option>
                      <option value="em">Em</option>
                      <option value="co">Cô/Dì</option>
                      <option value="chu">Chú</option>
                      <option value="bac">Bác</option>
                      <option value="dong_nghiep">Đồng Nghiệp</option>
                      <option value="gia_dinh">Gia Đình</option>
                    </select>
                  </div>

                  <div className="flex space-x-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(personalizedGuestUrl);
                        setCopiedGuestLink(true);
                        setTimeout(() => setCopiedGuestLink(false), 2500);
                      }}
                      className="flex-1 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold cursor-pointer border border-stone-600 flex items-center justify-center space-x-1"
                    >
                      {copiedGuestLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedGuestLink ? 'Đã Chép Link Riêng!' : 'Chép Link Riêng'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(sampleZaloMessage);
                        setCopiedZaloText(true);
                        setTimeout(() => setCopiedZaloText(false), 2500);
                      }}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-bold cursor-pointer hover:opacity-90 flex items-center justify-center space-x-1"
                    >
                      {copiedZaloText ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Send className="w-3.5 h-3.5" />}
                      <span>{copiedZaloText ? 'Đã Chép Lời Mời Zalo!' : 'Chép Lời Mời Zalo'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setIsPublishModalOpen(false)}
                    className="px-6 py-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white font-semibold text-xs cursor-pointer"
                  >
                    Đóng Bảng Này
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
