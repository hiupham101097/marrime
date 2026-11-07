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
  Layers,
  Gift,
  ShieldCheck,
  SlidersHorizontal,
  Coffee,
  KeyRound,
  Key,
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
  WeddingSectionsConfig,
  WeddingDonateConfig,
} from '../../shared/types';
import {
  DEFAULT_WEDDING_DATA,
  PRESET_MUSIC_TRACKS,
  DEFAULT_GALLERY_PHOTOS,
  SAMPLE_PHOTO_LIBRARY,
  DEFAULT_SECTIONS_CONFIG,
  DEFAULT_DONATE_CONFIG,
  AUTHOR_DONATE_CONFIG,
  PRESET_WEDDING_PROJECTS,
} from '../../shared/defaultData';
import { ImageSelector } from '../components/ImageSelector';

export const WeddingStudioPage: React.FC = () => {
  // Free & open access: No login gate needed!
  const [editingPin, setEditingPin] = useState('');
  const [copiedPin, setCopiedPin] = useState(false);
  const [copiedAuthorBank, setCopiedAuthorBank] = useState(false);

  // Lookup existing wedding project modal state
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [lookupCodeInput, setLookupCodeInput] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);

  // Active studio tab
  const [activeTab, setActiveTab] = useState<
    | 'style'
    | 'builder'
    | 'donate'
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
  const [previewKey, setPreviewKey] = useState(0);

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

  // Load wedding data or template preset on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateParam = params.get('template') as WeddingTemplate;
    const slugParam = params.get('w') || params.get('slug');
    const codeParam = params.get('code') || params.get('pin');

    // 1. If user entered with a template (e.g. from Landing Page)
    if (templateParam) {
      if (templateParam === 'fairytale' && PRESET_WEDDING_PROJECTS['blush_ribbon']) {
        setFormData(PRESET_WEDDING_PROJECTS['blush_ribbon']);
      } else if (templateParam === 'modern' && PRESET_WEDDING_PROJECTS['modern_minimal']) {
        setFormData(PRESET_WEDDING_PROJECTS['modern_minimal']);
      } else if (templateParam === 'vintage' && PRESET_WEDDING_PROJECTS['emerald_brass']) {
        setFormData(PRESET_WEDDING_PROJECTS['emerald_brass']);
      } else if (templateParam === 'royal' && PRESET_WEDDING_PROJECTS['royal_velvet']) {
        setFormData(PRESET_WEDDING_PROJECTS['royal_velvet']);
      }
    }

    // 2. If user entered with a code / pin to edit
    if (codeParam) {
      fetch('/api/weddings/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeParam.trim() }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json && json.success && json.data) {
            setWeddingSlug(json.slug);
            setFormData(json.data);
            if (json.secretPin) setEditingPin(json.secretPin);
          }
        })
        .catch(() => {});
    } else if (slugParam) {
      setWeddingSlug(slugParam);
      fetch(`/api/wedding-info?w=${encodeURIComponent(slugParam)}`)
        .then((res) => res.json())
        .then((res) => {
          if (res && res.success && res.data) {
            setFormData(res.data);
          }
        })
        .catch(() => {});
    }

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

  // Lookup existing card by code / slug
  const handleLookupCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCodeInput.trim()) return;

    setIsLookingUp(true);
    setLookupError('');
    try {
      const res = await fetch('/api/weddings/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: lookupCodeInput.trim() }),
      });
      const json = await res.json();
      if (res.ok && json.success && json.data) {
        setWeddingSlug(json.slug);
        setFormData(json.data);
        setEditingPin(json.secretPin || '');
        setIsLookupModalOpen(false);
        setPreviewKey((k) => k + 1);
      } else {
        setLookupError(json.message || 'Không tìm thấy thiệp cưới tương ứng với mã này.');
      }
    } catch {
      setLookupError('Lỗi kết nối máy chủ. Vui lòng thử lại!');
    } finally {
      setIsLookingUp(false);
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

    // Generate or keep clean slug
    const cleanGroom = formData.groom.shortName || formData.groom.name;
    const cleanBride = formData.bride.shortName || formData.bride.name;
    const computedSlug =
      weddingSlug && weddingSlug !== 'tuan-anh-mai-phuong'
        ? weddingSlug
        : `${cleanGroom}-${cleanBride}`
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9_-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || 'wedding-' + Date.now();

    // Generate easy-to-remember pin if not set yet
    const pinToUse = editingPin || 'MAR-' + Math.floor(1000 + Math.random() * 9000);

    try {
      const res = await fetch('/api/weddings/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: computedSlug,
          secretPin: pinToUse,
          config: formData,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        if (json.slug) setWeddingSlug(json.slug);
        const finalPin = json.secretPin || pinToUse;
        setEditingPin(finalPin);
        setPublishMessage('Đã lưu thiệp cưới thành công!');
        setIsPublishModalOpen(true);
        setPreviewKey((k) => k + 1);

        try {
          localStorage.setItem('marrime_saved_slug', json.slug || computedSlug);
          localStorage.setItem('marrime_saved_pin', finalPin);
        } catch {}
      } else {
        setPublishMessage(json.message || 'Lỗi khi xuất bản.');
        setIsPublishModalOpen(true);
      }
    } catch {
      setEditingPin(pinToUse);
      setPublishMessage('Đã lưu thiệp cưới vào bộ nhớ trình duyệt!');
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
      {/* THE DEDICATED MARRIME STUDIO WORKSPACE (OPEN & FREE ACCESS) */}
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
                  Tự Do Sáng Tạo
                </span>
              </div>
              <span className="text-[10px] text-stone-400 font-mono hidden sm:block">
                slug: {weddingSlug} {editingPin ? `• Mã sửa: ${editingPin}` : ''}
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
            <button
              type="button"
              onClick={() => {
                setLookupCodeInput('');
                setLookupError('');
                setIsLookupModalOpen(true);
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-wedding-gold/40 bg-stone-900 text-xs font-semibold text-wedding-gold hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title="Nhập mã bí mật để chỉnh sửa thiệp đã tạo trước đó"
            >
              <KeyRound className="w-3.5 h-3.5 text-wedding-gold" />
              <span className="hidden sm:inline">Nhập Mã Sửa Thiệp Cũ</span>
              <span className="sm:hidden">Sửa Cũ</span>
            </button>

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
              <span>{isPublishing ? 'Đang Lưu...' : 'Lưu & Nhận Mã Chỉnh Sửa'}</span>
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
                  { id: 'builder', name: 'Bố Cục & Tự Thiết Kế', icon: Layers },
                  { id: 'donate', name: 'Mừng Cưới Tùy Tâm', icon: Gift },
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

                {/* TAB: BUILDER - BỐ CỤC & TỰ THIẾT KẾ MỞ */}
                {activeTab === 'builder' && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Current Template Architecture Overview */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                          <Layers className="w-4 h-4 text-wedding-gold" />
                          <span>
                            Kiến Trúc Đang Áp Dụng:{' '}
                            {formData.template === 'fairytale'
                              ? 'Vườn Hoa Cổ Tích (Scrapbook Polaroid)'
                              : formData.template === 'modern'
                              ? 'Tạp Chí Thời Trang (Editorial 50/50 Minimalist)'
                              : formData.template === 'vintage'
                              ? 'Nhật Ký Di Sản (Cameo Oval & Tem Bưu Chính)'
                              : 'Hoàng Gia Quý Tộc (Vương Miện & Viền Vàng Đúc)'}
                          </span>
                        </h4>
                        <span className="text-[10px] px-2.5 py-1 rounded bg-stone-800 text-stone-300 font-mono">
                          {formData.template}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        Bốn phong cách sở hữu 4 hệ thống bố cục, khung hình, hiệu ứng và ngôn ngữ thị giác hoàn toàn riêng biệt. Bạn có thể tự do bật/tắt bất kỳ phân hệ nào bên dưới để thiệp cưới mang dấu ấn cá nhân trọn vẹn nhất.
                      </p>
                    </div>

                    {/* Section Toggles Grid */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                            <span>Tự Do Bật / Tắt Các Phân Hệ Trên Thiệp Cưới</span>
                          </h4>
                          <span className="text-[10px] text-stone-400">
                            Tùy biến nội dung thiệp theo mong muốn riêng của Dâu & Rể
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          {
                            key: 'showGuestCard' as const,
                            title: '1. Thư Mời Đích Danh Quan Khách',
                            desc: 'Hiển thị thiệp mời cá nhân hóa cho từng khách kèm tên và lời xưng hô',
                            icon: '💌',
                          },
                          {
                            key: 'showCouple' as const,
                            title: '2. Chân Dung Dâu & Rể',
                            desc: 'Giới thiệu hai gia đình thông gia, thông điệp tính cách và chân dung cô dâu chú rể',
                            icon: '👰🤵',
                          },
                          {
                            key: 'showGallery' as const,
                            title: '3. Album Ảnh Cưới (Photo Gallery)',
                            desc: 'Bộ sưu tập ảnh cưới sắc nét với bố cục thay đổi theo từng phong cách',
                            icon: '📸',
                          },
                          {
                            key: 'showTimeline' as const,
                            title: '4. Chặng Đường Tình Yêu (Milestones)',
                            desc: 'Từng cột mốc từ ngày đầu gặp gỡ, chiếc nhẫn cầu hôn đến ngưỡng cửa hôn nhân',
                            icon: '⏳',
                          },
                          {
                            key: 'showLoveMessages' as const,
                            title: '5. Lời Hẹn Ước & Tri Ân',
                            desc: 'Những dòng tâm sự son sắt dâu rể gửi gắm đến người bạn đời',
                            icon: '💍',
                          },
                          {
                            key: 'showDresscode' as const,
                            title: '6. Trang Phục Gợi Ý & Lễ Nghi (Dresscode)',
                            desc: 'Bảng màu trang phục đề xuất và lưu ý trang trọng cho tiệc cưới',
                            icon: '👔',
                          },
                          {
                            key: 'showEvents' as const,
                            title: '7. Lịch Trình & Sảnh Tiệc Google Maps',
                            desc: 'Thời gian, địa điểm, bản đồ dẫn đường và tính năng lưu vào Google Calendar',
                            icon: '📍',
                          },
                          {
                            key: 'showRSVP' as const,
                            title: '8. Hộp Xác Nhận Tham Dự (RSVP)',
                            desc: 'Thu thập thông tin khách tham dự, số lượng người đi cùng và chế độ ăn uống',
                            icon: '📋',
                          },
                          {
                            key: 'showWishes' as const,
                            title: '9. Sổ Lưu Bút Chúc Phúc Trực Tuyến',
                            desc: 'Khách mời gửi lời chúc ngọt ngào và thả tim theo thời gian thực',
                            icon: '✨',
                          },
                          {
                            key: 'showDonateBox' as const,
                            title: '10. Hộp Mừng Cưới & Chúc Phúc Tùy Tâm',
                            desc: 'Chỉ xuất hiện sau khi khách hoàn thành lời chúc/RSVP hoặc bấm nút tùy tâm',
                            icon: '🎁',
                          },
                        ].map((item) => {
                          const currentSections = formData.sectionsConfig || DEFAULT_SECTIONS_CONFIG;
                          const isEnabled = currentSections[item.key] !== false;

                          return (
                            <div
                              key={item.key}
                              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                                isEnabled
                                  ? 'border-emerald-500/40 bg-emerald-950/20'
                                  : 'border-stone-800 bg-stone-900/30 opacity-60'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                                <div>
                                  <span className="font-serif text-xs font-bold text-white block">
                                    {item.title}
                                  </span>
                                  <span className="text-[10px] text-stone-400 block leading-relaxed mt-0.5">
                                    {item.desc}
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const updated = { ...currentSections, [item.key]: !isEnabled };
                                  setFormData({ ...formData, sectionsConfig: updated });
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                                  isEnabled
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                                    : 'bg-stone-800 hover:bg-stone-700 text-stone-400'
                                }`}
                              >
                                {isEnabled ? 'Đang Bật' : 'Đã Tắt'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: DONATE - MỪNG CƯỚI TÙY TÂM */}
                {activeTab === 'donate' && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Master Switch */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                          <Gift className="w-4 h-4 text-wedding-gold" />
                          <span>Hộp Mừng Cưới & Chúc Phúc Tùy Tâm</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            const current = formData.donateConfig || DEFAULT_DONATE_CONFIG;
                            setFormData({
                              ...formData,
                              donateConfig: { ...current, enabled: !current.enabled },
                            });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            formData.donateConfig?.enabled !== false
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-800 text-stone-400'
                          }`}
                        >
                          {formData.donateConfig?.enabled !== false ? 'Đang Hoạt Động' : 'Đã Tắt'}
                        </button>
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        Phân hệ tinh tế dành cho bạn bè, người thân ở xa không thể về dự tiệc muốn gửi món quà chúc phúc. Được thiết kế tôn trọng sự tự nguyện của quan khách.
                      </p>
                    </div>

                    {/* Reveal Trigger Mode */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>1. Cơ Chế Hiển Thị (Tránh gây phản cảm & nghi ngờ lừa đảo)</span>
                      </h4>
                      <div className="space-y-2.5">
                        {[
                          {
                            id: 'on_completion_only',
                            name: 'Chỉ hiện sau khi khách đã gửi lời chúc / RSVP (Khuyên dùng)',
                            desc: 'Khách gửi lời chúc lên sổ lưu bút hoặc xác nhận tham dự xong thì thiệp mới nhẹ nhàng mở ra món quà chúc phúc. Cực kỳ lịch sự và văn minh.',
                            badge: 'Tinh tế nhất',
                          },
                          {
                            id: 'button_trigger',
                            name: 'Hiện nút bấm trang nhã ở cuối thiệp để khách tự bấm',
                            desc: 'Nút "Gửi Món Quà Chúc Phúc Tùy Tâm" xuất hiện kín đáo ở cuối thiệp, chỉ bung ra khi khách chủ động bấm vào.',
                            badge: 'Trang nhã',
                          },
                          {
                            id: 'show_always',
                            name: 'Luôn hiển thị như một phân hệ cố định ở chân thiệp',
                            desc: 'Hiển thị công khai thông tin tài khoản ở phân hệ cuối cùng của thiệp.',
                            badge: 'Công khai',
                          },
                        ].map((mode) => {
                          const currentMode = formData.donateConfig?.revealMode || 'on_completion_only';
                          const isSelected = currentMode === mode.id;

                          return (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => {
                                const current = formData.donateConfig || DEFAULT_DONATE_CONFIG;
                                setFormData({
                                  ...formData,
                                  donateConfig: { ...current, revealMode: mode.id as any },
                                });
                              }}
                              className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? 'border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500'
                                  : 'border-stone-800 hover:border-stone-700 bg-stone-900/40'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-serif text-xs font-bold text-white">{mode.name}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                                  {mode.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-400 leading-relaxed">{mode.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* QR Security Option */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <h4 className="font-serif text-sm font-bold text-white flex items-center space-x-2">
                        <QrCode className="w-4 h-4 text-wedding-gold" />
                        <span>2. Tùy Chọn An Toàn QR Chuyển Khoản</span>
                      </h4>
                      <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-white block">Cho phép khách bấm xem mã QR</span>
                          <span className="text-[10px] text-stone-400 block mt-0.5">
                            Nếu tắt, thiệp chỉ hiện số tài khoản chính chủ và tên ngân hàng kèm nút chép số nhanh (tránh bị nghi lừa đảo)
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.donateConfig?.showQr !== false}
                          onChange={(e) => {
                            const current = formData.donateConfig || DEFAULT_DONATE_CONFIG;
                            setFormData({
                              ...formData,
                              donateConfig: { ...current, showQr: e.target.checked },
                            });
                          }}
                          className="w-5 h-5 accent-emerald-500 cursor-pointer shrink-0"
                        />
                      </div>
                    </div>

                    {/* Custom Texts */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-4">
                      <h4 className="font-serif text-sm font-bold text-white">
                        3. Tiêu Đề & Thông Điệp Chúc Phúc
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-stone-400 mb-1 font-semibold">Tiêu Đề Hộp Mừng Cưới</label>
                          <input
                            type="text"
                            value={formData.donateConfig?.title || 'Hộp Mừng Cưới & Chúc Phúc Tùy Tâm'}
                            onChange={(e) => {
                              const current = formData.donateConfig || DEFAULT_DONATE_CONFIG;
                              setFormData({
                                ...formData,
                                donateConfig: { ...current, title: e.target.value },
                              });
                            }}
                            className="w-full px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-400 mb-1 font-semibold">Lời Nhắn Gửi Tới Khách Mời</label>
                          <textarea
                            rows={2}
                            value={formData.donateConfig?.subtitle || ''}
                            onChange={(e) => {
                              const current = formData.donateConfig || DEFAULT_DONATE_CONFIG;
                              setFormData({
                                ...formData,
                                donateConfig: { ...current, subtitle: e.target.value },
                              });
                            }}
                            className="w-full px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-400 mb-1 font-semibold">Lời Tri Ân Cảm Ơn Cuối Hộp</label>
                          <input
                            type="text"
                            value={formData.donateConfig?.thankYouMessage || ''}
                            onChange={(e) => {
                              const current = formData.donateConfig || DEFAULT_DONATE_CONFIG;
                              setFormData({
                                ...formData,
                                donateConfig: { ...current, thankYouMessage: e.target.value },
                              });
                            }}
                            className="w-full px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bank Account Numbers Groom & Bride */}
                    <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-4">
                      <h4 className="font-serif text-sm font-bold text-white">
                        4. Thông Tin Tài Khoản Chú Rể & Cô Dâu
                      </h4>

                      {/* Groom Bank */}
                      <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-3">
                        <span className="text-xs font-bold text-wedding-gold block">
                          Tài Khoản Chú Rể ({formData.groom.shortName || formData.groom.name})
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                          <div>
                            <label className="text-[10px] text-stone-400 block mb-0.5">Tên Ngân Hàng</label>
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
                              className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-400 block mb-0.5">Số Tài Khoản</label>
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
                              className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-400 block mb-0.5">Tên Chủ Tài Khoản</label>
                            <input
                              type="text"
                              value={formData.groom.bankInfo.accountHolder}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  groom: {
                                    ...formData.groom,
                                    bankInfo: { ...formData.groom.bankInfo, accountHolder: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white uppercase"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bride Bank */}
                      <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-3">
                        <span className="text-xs font-bold text-pink-400 block">
                          Tài Khoản Cô Dâu ({formData.bride.shortName || formData.bride.name})
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                          <div>
                            <label className="text-[10px] text-stone-400 block mb-0.5">Tên Ngân Hàng</label>
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
                              className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-400 block mb-0.5">Số Tài Khoản</label>
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
                              className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-400 block mb-0.5">Tên Chủ Tài Khoản</label>
                            <input
                              type="text"
                              value={formData.bride.bankInfo.accountHolder}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  bride: {
                                    ...formData.bride,
                                    bankInfo: { ...formData.bride.bankInfo, accountHolder: e.target.value },
                                  },
                                })
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white uppercase"
                            />
                          </div>
                        </div>
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
                        <ImageSelector
                          label="Ảnh Đại Diện Chú Rể"
                          value={formData.groom.avatar}
                          onChange={(url) =>
                            setFormData({
                              ...formData,
                              groom: { ...formData.groom, avatar: url },
                            })
                          }
                          category="groom"
                          aspectRatio="square"
                          helperText="Chọn ảnh chú rể hoặc tải từ máy"
                        />
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
                        <ImageSelector
                          label="Ảnh Đại Diện Cô Dâu"
                          value={formData.bride.avatar}
                          onChange={(url) =>
                            setFormData({
                              ...formData,
                              bride: { ...formData.bride, avatar: url },
                            })
                          }
                          category="bride"
                          aspectRatio="square"
                          helperText="Chọn ảnh cô dâu hoặc tải từ máy"
                        />
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
                      <ImageSelector
                        label="Ảnh Bìa Hero Section (Toàn Cảnh Đầu Trang)"
                        value={formData.heroImage || ''}
                        onChange={(url) => setFormData({ ...formData, heroImage: url })}
                        category="hero"
                        aspectRatio="video"
                        helperText="Ảnh cưới khổ ngang đẹp nhất để đón tiếp khách mời"
                      />
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        {(formData.gallery || DEFAULT_GALLERY_PHOTOS).map((photo, idx) => (
                          <div key={photo.id || idx} className="p-3.5 rounded-2xl border border-stone-800 bg-stone-900/70 space-y-3">
                            <ImageSelector
                              label={`Bức Ảnh #${idx + 1}`}
                              value={photo.url}
                              onChange={(newUrl) => {
                                const updated = [...(formData.gallery || DEFAULT_GALLERY_PHOTOS)];
                                updated[idx] = { ...updated[idx], url: newUrl };
                                setFormData({ ...formData, gallery: updated });
                              }}
                              category="moments"
                              aspectRatio="video"
                              helperText="Chọn từ máy hoặc thư viện"
                            />

                            <div className="space-y-2">
                              <div>
                                <label className="block text-[10px] text-stone-400 mb-0.5">Tiêu đề ảnh:</label>
                                <input
                                  type="text"
                                  value={photo.title}
                                  onChange={(e) => {
                                    const updated = [...(formData.gallery || DEFAULT_GALLERY_PHOTOS)];
                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                    setFormData({ ...formData, gallery: updated });
                                  }}
                                  placeholder="Tiêu đề ảnh..."
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white font-bold text-xs"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-stone-400 mb-0.5">Lời nhắn / Chú thích ảnh:</label>
                                <input
                                  type="text"
                                  value={photo.caption}
                                  onChange={(e) => {
                                    const updated = [...(formData.gallery || DEFAULT_GALLERY_PHOTOS)];
                                    updated[idx] = { ...updated[idx], caption: e.target.value };
                                    setFormData({ ...formData, gallery: updated });
                                  }}
                                  placeholder="Dòng cảm xúc..."
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 text-[11px] italic"
                                />
                              </div>
                            </div>
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

                          <ImageSelector
                            label="Ảnh Kỷ Niệm Khoảnh Khắc"
                            value={item.image}
                            onChange={(newUrl) => {
                              const updated = [...formData.timeline];
                              updated[idx].image = newUrl;
                              setFormData({ ...formData, timeline: updated });
                            }}
                            category="moments"
                            aspectRatio="video"
                            helperText="Chọn ảnh kỷ niệm hoặc tải từ máy"
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
            <div className="hidden lg:flex flex-1 bg-stone-950 flex-col items-center justify-center p-6 relative overflow-hidden">
              {/* Preview Toolbar */}
              <div className="w-full max-w-md flex items-center justify-between mb-3 px-2 text-xs text-stone-400">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      previewDevice === 'mobile'
                        ? 'bg-stone-800 text-white border border-wedding-gold/40'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Di Động</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      previewDevice === 'desktop'
                        ? 'bg-stone-800 text-white border border-wedding-gold/40'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Máy Tính</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setPreviewKey((k) => k + 1)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                    title="Tải lại giao diện xem trước"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`/?w=${weddingSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                    title="Mở thiệp trong tab trình duyệt mới"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

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
                  key={previewKey}
                  title="Live Wedding Invitation Preview"
                  src={`/?w=${weddingSlug}&v=${previewKey}`}
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
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Xuất Bản Thiệp Cưới Thành Công!
                  </h3>
                  <p className="text-xs text-stone-400">
                    Thiệp cưới của hai bạn đã được lưu an toàn. Dưới đây là mã quản trị để sửa thiệp lần sau và các link gửi quan khách.
                  </p>
                </div>

                {/* 1. SECRET EDIT CODE (MÃ BÍ MẬT QUẢN TRỊ) */}
                <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 p-4 rounded-2xl border-2 border-wedding-gold/60 shadow-lg text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-wedding-gold font-bold">
                      <KeyRound className="w-4 h-4 text-wedding-gold" />
                      <span>MÃ BÍ MẬT QUẢN TRỊ (LƯU LẠI ĐỂ SỬA THIỆP LẦN TỚI)</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/50 font-bold">
                      Bí Mật Của Dâu Rể
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 pt-1">
                    <div className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-stone-700 text-wedding-gold font-mono text-base font-bold tracking-widest text-center shadow-inner">
                      {editingPin || 'MAR-1234'}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(editingPin || 'MAR-1234');
                        setCopiedPin(true);
                        setTimeout(() => setCopiedPin(false), 2500);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-wedding-burgundy text-white font-bold text-xs flex items-center space-x-1 cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      {copiedPin ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedPin ? 'Đã Chép Mã!' : 'Sao Chép'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                    💡 Hãy lưu lại mã này. Lần tới khi quay lại <code className="text-wedding-gold font-mono">/studio</code>, bạn chỉ cần bấm <strong>"Nhập Mã Sửa Thiệp Cũ"</strong> và điền mã này là có thể chỉnh sửa ảnh, đổi ngày giờ hoặc xem khách phản hồi RSVP.
                  </p>
                </div>

                {/* 2. General Link for Facebook / Group Zalo */}
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

                {/* 3. Tool Tạo Link Thiệp Riêng Cho Từng Vị Khách */}
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

                {/* 4. DONATE TÙY TÂM ỦNG HỘ TÁC GIẢ (MÃ QR CỦA TÁC GIẢ) */}
                <div className="bg-gradient-to-b from-[#1E1B18] to-stone-900 p-5 rounded-2xl border border-wedding-gold/40 space-y-3.5 text-xs text-stone-200">
                  <div className="flex items-center space-x-2 text-wedding-gold font-bold">
                    <Coffee className="w-4 h-4 text-amber-400" />
                    <span>TẶNG TÁC GIẢ LY CÀ PHÊ CHÚC PHÚC (DONATE TÙY TÂM)</span>
                  </div>

                  <p className="text-[11px] text-stone-300 leading-relaxed font-light">
                    Marrime là nền tảng tạo thiệp cưới miễn phí dành cho các cặp đôi. Nếu hai bạn thấy sản phẩm này đẹp và hữu ích, hãy gửi tặng một ly cà phê nhỏ để ủng hộ tác giả duy trì máy chủ. <strong>Ủng hộ hoàn toàn tùy tâm, không gửi cũng không sao cả</strong>, thiệp cưới của hai bạn vẫn hoạt động vĩnh viễn và hoàn toàn miễn phí!
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-stone-950/80 p-3.5 rounded-xl border border-stone-800">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 bg-white p-2 rounded-xl shadow shrink-0">
                      <img
                        src={AUTHOR_DONATE_CONFIG.qrImageUrl}
                        alt="Mã QR Donate Tác Giả"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 space-y-1.5 text-left w-full">
                      <span className="text-[10px] text-stone-400 uppercase font-mono block">Tài khoản tác giả:</span>
                      <div className="font-serif text-sm font-bold text-white">{AUTHOR_DONATE_CONFIG.bankName}</div>
                      <div className="flex items-center space-x-2 pt-0.5">
                        <span className="font-mono text-base font-bold text-wedding-gold tracking-wider">
                          {AUTHOR_DONATE_CONFIG.accountNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(AUTHOR_DONATE_CONFIG.accountNumber);
                            setCopiedAuthorBank(true);
                            setTimeout(() => setCopiedAuthorBank(false), 2000);
                          }}
                          className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-stone-300 hover:text-white cursor-pointer"
                        >
                          {copiedAuthorBank ? '✓ Đã chép' : 'Chép STK'}
                        </button>
                      </div>
                      <div className="text-xs text-stone-300 font-semibold">{AUTHOR_DONATE_CONFIG.accountHolder}</div>
                      <span className="text-[10px] text-amber-300/80 italic block pt-1">
                        "Chúc hai bạn trăm năm hạnh phúc, răng long đầu bạc!"
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <a
                    href={generalShareUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-wedding-rose-700 to-wedding-burgundy text-white font-bold text-xs shadow-luxury hover:opacity-95 text-center flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Hoàn Tất & Mở Xem Thiệp Khách</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsPublishModalOpen(false)}
                    className="px-6 py-3 rounded-xl bg-stone-800 text-stone-300 hover:text-white font-semibold text-xs cursor-pointer transition-colors"
                  >
                    Đóng Bảng
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. LOOKUP EXISTING WEDDING PROJECT MODAL */}
          {isLookupModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
              <div className="bg-[#1C1917] border-2 border-wedding-gold/60 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
                <button
                  type="button"
                  onClick={() => setIsLookupModalOpen(false)}
                  className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 cursor-pointer"
                >
                  ✕
                </button>

                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-wedding-burgundy/20 border border-wedding-gold/60 text-wedding-gold flex items-center justify-center mx-auto shadow-md">
                    <KeyRound className="w-6 h-6 text-wedding-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    Nhập Mã Chỉnh Sửa Thiệp Cưới
                  </h3>
                  <p className="text-xs text-stone-400">
                    Nhập Mã Bí Mật (VD: MAR-6825) hoặc tên đường dẫn slug bạn đã nhận khi lưu thiệp lần trước.
                  </p>
                </div>

                <form onSubmit={handleLookupCode} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={lookupCodeInput}
                      onChange={(e) => setLookupCodeInput(e.target.value)}
                      placeholder="Nhập mã bí mật hoặc tên slug..."
                      className="w-full text-center px-4 py-3 rounded-xl border border-stone-700 bg-stone-800 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-wedding-gold"
                      autoFocus
                    />
                    {lookupError && <p className="text-xs text-rose-400 mt-2 text-center">{lookupError}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLookingUp}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-wedding-rose-700 to-wedding-burgundy text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/60 flex items-center justify-center space-x-2"
                  >
                    {isLookingUp ? <span>Đang Tải Dữ Liệu...</span> : <span>Mở Lại Thiệp Cưới Để Chỉnh Sửa</span>}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

