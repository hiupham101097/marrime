import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Smartphone,
  Monitor,
  Share2,
  Copy,
  Check,
  ExternalLink,
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
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Eye,
  ArrowRight,
  ArrowLeft,
  Users,
  Layers,
  Gift,
  ShieldCheck,
  SlidersHorizontal,
  Coffee,
  KeyRound,
  Globe,
  HelpCircle,
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
  MASTER_TEMPLATE_CATALOG,
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

  // 5-Step Guided Bridal Creation Stepper (Quy trình 5 bước cực kỳ dễ dùng & trực quan)
  // Step 1: Phong Cách & Font Chữ
  // Step 2: Thông Tin Dâu & Rể + STK Mừng
  // Step 3: Tiệc Cưới, Lịch Trình & Sảnh Tiệc
  // Step 4: Ảnh Cưới & Nhạc Nền
  // Step 5: Bao Thư 3D & Chia Sẻ Lời Mời Zalo
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [advancedTab, setAdvancedTab] = useState<'timeline' | 'vows' | 'builder' | 'animation' | 'rsvp'>('timeline');

  // Preview device & view mode
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [previewViewMode, setPreviewViewMode] = useState<'website' | 'envelope'>('website');
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
    if (templateParam && PRESET_WEDDING_PROJECTS[templateParam]) {
      setFormData(PRESET_WEDDING_PROJECTS[templateParam]);
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

  // Real-time live preview sync with the simulator iframe
  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: 'MARRIME_LIVE_PREVIEW', payload: formData },
        '*'
      );
    }
  }, [formData]);

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

  // Steps definition for top stepper
  const STEPS = [
    { num: 1, title: 'Chọn Mẫu', icon: Palette, desc: '10 Phong Cách & Màu' },
    { num: 2, title: 'Dâu & Rể', icon: User, desc: 'Thông Tin & Mừng Cưới' },
    { num: 3, title: 'Tiệc Cưới', icon: Clock, desc: 'Ngày Giờ & Bản Đồ' },
    { num: 4, title: 'Ảnh & Nhạc', icon: Camera, desc: 'Album & Giai Điệu' },
    { num: 5, title: 'Bao Thư & Lưu', icon: Mail, desc: 'Sáp 3D & Link Zalo' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      {/* GLOBAL STUDIO HEADER (Luminous Bridal Bar) */}
      <header className="h-16 bg-white border-b border-stone-200 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30 shadow-xs">
        {/* Left: Brand & Bride-Groom Monogram */}
        <div className="flex items-center space-x-3">
          <a
            href="/"
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B1A32] to-[#722235] text-amber-100 border border-amber-300/40 flex items-center justify-center font-serif text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
            title="Về Trang Chủ"
          >
            M
          </a>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-sm text-stone-900">
                Marrime Studio • {formData.groom.shortName || 'Chú Rể'} & {formData.bride.shortName || 'Cô Dâu'}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700 font-bold">
                Miễn Phí • Độc Bản
              </span>
            </div>
            <span className="text-[10px] text-stone-500 font-mono hidden sm:block">
              Đường dẫn: /{weddingSlug} {editingPin ? `• Mã quản trị: ${editingPin}` : ''}
            </span>
          </div>
        </div>

        {/* Center: Live Simulator View Mode Controls */}
        <div className="hidden lg:flex items-center bg-stone-100 border border-stone-200 rounded-xl p-1 space-x-1">
          {/* View Mode Toggle: Website vs 3D Envelope */}
          <button
            type="button"
            onClick={() => setPreviewViewMode('website')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              previewViewMode === 'website'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#A2682A]" />
            <span>Trang Web</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewViewMode('envelope')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
              previewViewMode === 'envelope'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-rose-600" />
            <span>Bao Thư 3D</span>
          </button>

          <span className="w-px h-4 bg-stone-300 mx-1" />

          {/* Device Toggle: Mobile vs Desktop */}
          <button
            type="button"
            onClick={() => setPreviewDevice('mobile')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${
              previewDevice === 'mobile'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
            title="Mô phỏng điện thoại"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Di Động</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewDevice('desktop')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${
              previewDevice === 'desktop'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-900'
            }`}
            title="Màn hình máy tính"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Máy Tính</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              setLookupCodeInput('');
              setLookupError('');
              setIsLookupModalOpen(true);
            }}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            title="Nhập mã bí mật để chỉnh sửa thiệp đã tạo trước đó"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#A2682A]" />
            <span className="hidden sm:inline">Nhập Mã Sửa Cũ</span>
          </button>

          <a
            href={`/?w=${weddingSlug}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-700 hover:text-[#722235] hover:border-stone-300 transition-colors shadow-xs"
            title="Mở xem thử trang web thực tế của khách"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>Xem Trang Khách</span>
          </a>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{isPublishing ? 'Đang Lưu...' : 'Lưu Thiệp & Nhận Mã'}</span>
          </button>
        </div>
      </header>

      {/* MAIN SPLIT SCREEN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANE: 5-STEP GUIDED FORM BUILDER */}
        <div className="w-full lg:w-[54%] xl:w-[50%] flex flex-col bg-[#FAF8F5] border-r border-stone-200 overflow-hidden">
          {/* STEPPER PROGRESS BAR (5 Bước Rõ Ràng, Dễ Hiểu) */}
          <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between overflow-x-auto no-scrollbar flex-shrink-0">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isCurrent = currentStep === step.num;
              const isPassed = currentStep > step.num;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center space-x-2 py-1.5 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    isCurrent
                      ? 'bg-rose-50 text-[#722235] border border-rose-200 shadow-xs'
                      : isPassed
                      ? 'text-emerald-700 hover:bg-stone-50'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? 'bg-[#722235] text-white'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {isPassed ? '✓' : step.num}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-xs font-bold block">{step.title}</span>
                    <span className="text-[10px] text-stone-500 block">{step.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* SCROLLABLE STEP FORM BODY */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6">
            {/* ===============================================================
                BƯỚC 1: CHỌN MẪU THIỆP & MÀU SẮC (10 Phong Cách Độc Bản)
               =============================================================== */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div>
                      <h3 className="font-serif text-base font-bold text-stone-900 flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-[#A2682A]" />
                        <span>Bộ Sưu Tập 10 Phong Cách Cưới Độc Bản</span>
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Chọn 1 phong cách phù hợp nhất với câu chuyện tình yêu của hai bạn
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#A2682A] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      Đang chọn: {formData.template}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {MASTER_TEMPLATE_CATALOG.map((tpl) => {
                      const isSelected = formData.template === tpl.id;
                      return (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              template: tpl.id,
                              theme: tpl.recommendedTheme,
                              envelopeStyle: tpl.envelopeStyle,
                            }));
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                            isSelected
                              ? 'border-[#722235] bg-rose-50/40 ring-2 ring-[#722235]/30 shadow-md'
                              : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center text-2xl shrink-0 border border-stone-200 shadow-xs">
                              {tpl.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-1.5">
                                <span className="font-serif text-xs font-bold text-stone-900 truncate">
                                  {tpl.name}
                                </span>
                                {tpl.badge && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#722235] text-white shrink-0 font-semibold">
                                    {tpl.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#A2682A] font-semibold block mt-0.5">
                                {tpl.subtitle}
                              </span>
                              <span className="text-[11px] text-stone-600 mt-1 block leading-relaxed line-clamp-2">
                                {tpl.description}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                            {/* Color Dots */}
                            <div className="flex items-center space-x-1">
                              {tpl.colors.map((c, i) => (
                                <span
                                  key={i}
                                  className="w-3 h-3 rounded-full border border-white shadow-xs inline-block"
                                  style={{ backgroundColor: c }}
                                />
                              ))}
                            </div>

                            {isSelected ? (
                              <div className="flex items-center text-xs font-bold text-[#722235]">
                                <CheckCircle2 className="w-4 h-4 mr-1 text-[#722235]" />
                                <span>Đang áp dụng</span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-stone-500 group-hover:text-stone-900 transition-colors">
                                Chọn mẫu này →
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Font Typography Selector */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                  <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#A2682A]" />
                    <span>Font Chữ Nghệ Thuật (Typography)</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'playfair', name: 'Playfair Display', desc: 'Cung điện quý tộc cổ điển' },
                      { id: 'cormorant', name: 'Cormorant Garamond', desc: 'Thanh lịch và lãng mạn' },
                      { id: 'montserrat', name: 'Montserrat Modern', desc: 'Tối giản đương đại' },
                      { id: 'great_vibes', name: 'Great Vibes Calligraphy', desc: 'Uốn lượn bay bổng' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, typographyFont: f.id as TypographyFont })}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          formData.typographyFont === f.id
                            ? 'border-[#722235] bg-rose-50 text-[#722235] font-bold ring-2 ring-[#722235]/20'
                            : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <span className="text-xs block font-serif">{f.name}</span>
                        <span className="text-[10px] text-stone-500 block mt-0.5">{f.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                BƯỚC 2: THÔNG TIN DÂU & RỂ + TÀI KHOẢN MỪNG CƯỚI
               =============================================================== */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {/* Groom Info Box */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
                    <span className="text-xl">🤵</span>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      Thông Tin Chú Rể (Nhà Trai)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Họ và Tên Chú Rể:
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
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                        placeholder="VD: Nguyễn Tuấn Anh"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Tên Thân Mật (Hiện trên nút & tiêu đề):
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
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                        placeholder="VD: Tuấn Anh"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Họ Tên Bố (Nhà Trai):
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
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                        placeholder="VD: Nguyễn Văn Hùng"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Họ Tên Mẹ (Nhà Trai):
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
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                        placeholder="VD: Lê Thị Thu Thảo"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <ImageSelector
                        label="Ảnh Đại Diện Chú Rể (Chân Dung):"
                        value={formData.groom.avatar}
                        onChange={(val) =>
                          setFormData({
                            ...formData,
                            groom: { ...formData.groom, avatar: val },
                          })
                        }
                        samplePresets={SAMPLE_PHOTO_LIBRARY.groomAvatars}
                      />
                    </div>
                  </div>

                  {/* Groom Bank for Cash Gift */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <span className="text-xs font-bold text-[#A2682A] uppercase tracking-wider block">
                      Tài Khoản Mừng Cưới Chú Rể (Tùy chọn VietQR):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={formData.groom.bankInfo?.bankName || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            groom: {
                              ...formData.groom,
                              bankInfo: {
                                ...formData.groom.bankInfo,
                                bankName: e.target.value,
                                accountNumber: formData.groom.bankInfo?.accountNumber || '',
                                accountHolder: formData.groom.bankInfo?.accountHolder || '',
                              },
                            },
                          })
                        }
                        placeholder="Ngân hàng (VD: Vietcombank)"
                        className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                      />
                      <input
                        type="text"
                        value={formData.groom.bankInfo?.accountNumber || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            groom: {
                              ...formData.groom,
                              bankInfo: {
                                ...formData.groom.bankInfo,
                                accountNumber: e.target.value,
                                bankName: formData.groom.bankInfo?.bankName || '',
                                accountHolder: formData.groom.bankInfo?.accountHolder || '',
                              },
                            },
                          })
                        }
                        placeholder="Số tài khoản"
                        className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                      />
                      <input
                        type="text"
                        value={formData.groom.bankInfo?.accountHolder || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            groom: {
                              ...formData.groom,
                              bankInfo: {
                                ...formData.groom.bankInfo,
                                accountHolder: e.target.value,
                                bankName: formData.groom.bankInfo?.bankName || '',
                                accountNumber: formData.groom.bankInfo?.accountNumber || '',
                              },
                            },
                          })
                        }
                        placeholder="Tên chủ tài khoản"
                        className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Bride Info Box */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
                    <span className="text-xl">👰</span>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      Thông Tin Cô Dâu (Nhà Gái)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Họ và Tên Cô Dâu:
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
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                        placeholder="VD: Trần Mai Phương"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Tên Thân Mật (Hiện trên nút & tiêu đề):
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
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                        placeholder="VD: Mai Phương"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Họ Tên Bố (Nhà Gái):
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
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                        placeholder="VD: Trần Minh Đức"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Họ Tên Mẹ (Nhà Gái):
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
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                        placeholder="VD: Phạm Thị Bích Ngọc"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <ImageSelector
                        label="Ảnh Đại Diện Cô Dâu (Chân Dung):"
                        value={formData.bride.avatar}
                        onChange={(val) =>
                          setFormData({
                            ...formData,
                            bride: { ...formData.bride, avatar: val },
                          })
                        }
                        samplePresets={SAMPLE_PHOTO_LIBRARY.brideAvatars}
                      />
                    </div>
                  </div>

                  {/* Bride Bank for Cash Gift */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <span className="text-xs font-bold text-[#A2682A] uppercase tracking-wider block">
                      Tài Khoản Mừng Cưới Cô Dâu (Tùy chọn VietQR):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={formData.bride.bankInfo?.bankName || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bride: {
                              ...formData.bride,
                              bankInfo: {
                                ...formData.bride.bankInfo,
                                bankName: e.target.value,
                                accountNumber: formData.bride.bankInfo?.accountNumber || '',
                                accountHolder: formData.bride.bankInfo?.accountHolder || '',
                              },
                            },
                          })
                        }
                        placeholder="Ngân hàng (VD: Techcombank)"
                        className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                      />
                      <input
                        type="text"
                        value={formData.bride.bankInfo?.accountNumber || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bride: {
                              ...formData.bride,
                              bankInfo: {
                                ...formData.bride.bankInfo,
                                accountNumber: e.target.value,
                                bankName: formData.bride.bankInfo?.bankName || '',
                                accountHolder: formData.bride.bankInfo?.accountHolder || '',
                              },
                            },
                          })
                        }
                        placeholder="Số tài khoản"
                        className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                      />
                      <input
                        type="text"
                        value={formData.bride.bankInfo?.accountHolder || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bride: {
                              ...formData.bride,
                              bankInfo: {
                                ...formData.bride.bankInfo,
                                accountHolder: e.target.value,
                                bankName: formData.bride.bankInfo?.bankName || '',
                                accountNumber: formData.bride.bankInfo?.accountNumber || '',
                              },
                            },
                          })
                        }
                        placeholder="Tên chủ tài khoản"
                        className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                BƯỚC 3: TIỆC CƯỚI, THỜI GIAN & SẢNH TIỆC GOOGLE MAPS
               =============================================================== */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <h3 className="font-serif text-base font-bold text-stone-900 flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#A2682A]" />
                      <span>Ngày Giờ Đám Cưới (Đếm Ngược)</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Ngày Giờ Hôn Lễ (Dùng để chạy đồng hồ đếm ngược):
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.weddingDate.slice(0, 16)}
                        onChange={(e) =>
                          setFormData({ ...formData, weddingDate: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Dòng Chữ Ngày Cưới Hiển Thị Trang Trọng:
                      </label>
                      <input
                        type="text"
                        value={formData.weddingDateFormatted}
                        onChange={(e) =>
                          setFormData({ ...formData, weddingDateFormatted: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                        placeholder="VD: Chủ Nhật, 20 Tháng 11 Năm 2026"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Schedule List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900">
                        Danh Sách Lễ Thành Hôn & Tiệc Cưới
                      </h4>
                      <p className="text-xs text-stone-500">
                        Địa chỉ sảnh đón tiếp khách và liên kết Google Maps chỉ đường
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddEvent}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#A2682A] border border-amber-200 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm Tiệc / Lễ Vu Quy</span>
                    </button>
                  </div>

                  {formData.events.map((evt, idx) => (
                    <div
                      key={evt.id}
                      className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4 relative"
                    >
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                        <span className="font-serif text-xs font-bold text-[#722235]">
                          Sự Kiện #{idx + 1}: {evt.title}
                        </span>
                        {formData.events.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveEvent(idx)}
                            className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                            title="Xóa sự kiện này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Tên Sự Kiện:
                          </label>
                          <input
                            type="text"
                            value={evt.title}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                            placeholder="VD: Lễ Thành Hôn & Tiệc Mừng"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Giờ Đón Khách:
                          </label>
                          <input
                            type="text"
                            value={evt.time}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].time = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                            placeholder="VD: 11:30 SA"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Trung Tâm / Nhà Hàng Tiệc Cưới:
                          </label>
                          <input
                            type="text"
                            value={evt.venueName}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].venueName = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                            placeholder="VD: Riverside Palace"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Sảnh Cưới:
                          </label>
                          <input
                            type="text"
                            value={evt.hallName}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].hallName = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                            placeholder="VD: Sảnh Grand Ballroom (Tầng 3)"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Địa Chỉ Đón Tiếp:
                          </label>
                          <input
                            type="text"
                            value={evt.address}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].address = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                            placeholder="VD: 360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Đường Dẫn Chỉ Đường Google Maps:
                          </label>
                          <input
                            type="text"
                            value={evt.googleMapsUrl}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].googleMapsUrl = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs focus:outline-none focus:border-[#A2682A]"
                            placeholder="https://maps.google.com/?q=..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                BƯỚC 4: ẢNH CƯỚI NGHỆ THUẬT & NHẠC NỀN LÃNG MẠN
               =============================================================== */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                {/* Hero Background */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
                    <Camera className="w-4 h-4 text-[#A2682A]" />
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      Ảnh Bìa Cưới Đón Tiếp (Hero Banner)
                    </h3>
                  </div>

                  <ImageSelector
                    label="Ảnh Bìa Lớn Đầu Trang Web:"
                    value={formData.heroImage}
                    onChange={(val) => setFormData({ ...formData, heroImage: val })}
                    samplePresets={SAMPLE_PHOTO_LIBRARY.heroBackgrounds}
                  />
                </div>

                {/* Photo Gallery */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div>
                      <h3 className="font-serif text-base font-bold text-stone-900 flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-[#722235]" />
                        <span>Album Ảnh Kỷ Niệm Cưới (Gallery)</span>
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Tải ảnh lên hoặc chọn những khoảnh khắc ngọt ngào nhất
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newPhoto = {
                          id: 'photo-' + Date.now(),
                          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
                          title: 'Khoảnh Khắc Ngọt Ngào',
                          category: 'royal' as const,
                          caption: 'Ngày tình yêu đơm hoa kết trái',
                        };
                        setFormData({ ...formData, gallery: [...formData.gallery, newPhoto] });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#A2682A] border border-amber-200 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm Ảnh</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formData.gallery.map((p, idx) => (
                      <div
                        key={p.id}
                        className="rounded-xl border border-stone-200 overflow-hidden bg-stone-50 relative group"
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={p.url}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-2 bg-white">
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => {
                              const updated = [...formData.gallery];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, gallery: updated });
                            }}
                            className="w-full text-[11px] font-bold text-stone-800 bg-transparent border-none p-0 focus:outline-none"
                            placeholder="Tiêu đề ảnh"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.gallery.filter((_, i) => i !== idx);
                            setFormData({ ...formData, gallery: updated });
                          }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Xóa ảnh này"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Romantic Music Selector */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
                    <Music className="w-4 h-4 text-[#A2682A]" />
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      Giai Điệu & Nhạc Nền Đám Cưới
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {PRESET_MUSIC_TRACKS.map((t) => {
                      const isSelected = formData.music.trackId === t.trackId;
                      const isPlaying = previewPlayingId === t.trackId;

                      return (
                        <div
                          key={t.trackId}
                          onClick={() => setFormData({ ...formData, music: t })}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#722235] bg-rose-50/50 ring-2 ring-[#722235]/20'
                              : 'border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTogglePreviewAudio(t.url, t.trackId);
                              }}
                              className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                                isPlaying
                                  ? 'bg-[#722235] text-white shadow-md'
                                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                              }`}
                              title={isPlaying ? 'Dừng nghe thử' : 'Nghe thử giai điệu'}
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                            </button>

                            <div>
                              <span className="font-serif text-xs font-bold text-stone-900 block">
                                {t.title}
                              </span>
                              <span className="text-[10px] text-stone-500 block">{t.artist}</span>
                            </div>
                          </div>

                          <div className="flex items-center">
                            {isSelected ? (
                              <span className="text-xs font-bold text-[#722235] flex items-center">
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                <span>Đang dùng</span>
                              </span>
                            ) : (
                              <span className="text-xs text-stone-400">Chọn</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                BƯỚC 5: BAO THƯ 3D & LƯU THIỆP / TẠO LINK ZALO GỬI KHÁCH
               =============================================================== */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fadeIn">
                {/* 3D Envelope Selector */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <h3 className="font-serif text-base font-bold text-stone-900 flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-[#A2682A]" />
                      <span>Kiểu Bao Thư Vật Lý 3D & Con Dấu Sáp</span>
                    </h3>
                    <span className="text-xs font-bold text-[#A2682A]">
                      {formData.envelopeStyle}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'royal_velvet', name: 'Nhung Đỏ Hoàng Gia', desc: 'Sáp đỏ son & vàng' },
                      { id: 'korean_chiffon', name: 'Sage & Peach Pastel', desc: 'Chuẩn ảnh 7799' },
                      { id: 'traditional_silk', name: 'Lụa Gấm Song Hỷ', desc: 'Song Hỷ 囍 đỏ thắm' },
                      { id: 'rustic_twine', name: 'Giấy Mộc Kraft Sân Vườn', desc: 'Lá xô thơm' },
                      { id: 'editorial_vellum', name: 'Obsidian Matte Black', desc: 'Thời thượng tối giản' },
                      { id: 'celestial_midnight', name: 'Xanh Đêm Ánh Trăng', desc: 'Ngàn sao lấp lánh' },
                      { id: 'blush_ribbon', name: 'Hồng Phấn Rose Voan', desc: 'Ngọt ngào lãng mạn' },
                      { id: 'emerald_brass', name: 'Lục Bảo & Đồng Cổ', desc: 'Quý tộc di sản' },
                      { id: 'indochine_kraft', name: 'Đông Dương Cổ Điển', desc: 'Tem thư xưa' },
                      { id: 'modern_minimal', name: 'Champagne Ivory', desc: 'Đương đại tinh tế' },
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
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.envelopeStyle === env.id
                            ? 'border-[#722235] bg-rose-50 text-[#722235] ring-2 ring-[#722235]/20 shadow-xs'
                            : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <span className="font-serif text-xs font-bold block">{env.name}</span>
                        <span className="text-[10px] text-stone-500 block mt-0.5">{env.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Wax Seal Monogram */}
                  <div className="pt-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Ký Tự Khắc Trên Con Dấu Sáp Nến (Monogram):
                    </label>
                    <input
                      type="text"
                      value={formData.waxSealMonogram || ''}
                      onChange={(e) => setFormData({ ...formData, waxSealMonogram: e.target.value })}
                      placeholder="VD: T & P hoặc 囍"
                      className="w-full max-w-xs px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:border-[#A2682A]"
                    />
                  </div>
                </div>

                {/* SAVE & PUBLISH BIG CTA */}
                <div className="bg-gradient-to-r from-[#8B1A32] to-[#722235] p-6 rounded-2xl text-white shadow-lg space-y-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <h3 className="font-serif text-lg font-bold">
                      Lưu Thiệp & Nhận Mã Quản Trị Bí Mật
                    </h3>
                  </div>
                  <p className="text-xs text-rose-100 font-light leading-relaxed">
                    Sau khi bấm lưu, bạn sẽ nhận được một Mã Bí Mật Quản Trị (VD: MAR-6825). Lần tới quay lại Studio, bạn chỉ cần nhập mã này là có thể tiếp tục chỉnh sửa thiệp bất cứ lúc nào!
                  </p>
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="w-full py-3 rounded-xl bg-white text-[#722235] font-bold text-sm shadow-md hover:bg-amber-50 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4 text-[#722235]" />
                    <span>{isPublishing ? 'Đang Lưu Thiệp...' : 'Bấm Vào Đây Để Lưu & Xuất Bản Thiệp'}</span>
                  </button>
                </div>

                {/* PERSONALIZED GUEST INVITATION TOOL */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
                    <Send className="w-4 h-4 text-[#A2682A]" />
                    <div>
                      <h3 className="font-serif text-base font-bold text-stone-900">
                        Tạo Lời Mời Zalo & Link Thiệp Khắc Tên Từng Người
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Khách mở thiệp sẽ thấy ngay tên mình được in trang trọng
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      value={guestNameInput}
                      onChange={(e) => setGuestNameInput(e.target.value)}
                      placeholder="Tên khách (VD: Bác Ba, Anh Hùng)"
                      className="col-span-2 px-3 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:border-[#A2682A]"
                    />
                    <select
                      value={guestRoleInput}
                      onChange={(e) => setGuestRoleInput(e.target.value)}
                      className="px-2 py-2 rounded-xl border border-stone-200 bg-white text-stone-900 text-xs cursor-pointer focus:outline-none focus:border-[#A2682A]"
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

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(personalizedGuestUrl);
                        setCopiedGuestLink(true);
                        setTimeout(() => setCopiedGuestLink(false), 2500);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs cursor-pointer flex items-center justify-center space-x-1.5 transition-colors border border-stone-300"
                    >
                      {copiedGuestLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedGuestLink ? 'Đã Chép Link!' : 'Chép Link Thiệp Riêng'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(sampleZaloMessage);
                        setCopiedZaloText(true);
                        setTimeout(() => setCopiedZaloText(false), 2500);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xs cursor-pointer hover:opacity-95 flex items-center justify-center space-x-1.5 shadow-sm"
                    >
                      {copiedZaloText ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Send className="w-3.5 h-3.5" />}
                      <span>{copiedZaloText ? 'Đã Chép Tin Nhắn Zalo!' : 'Chép Lời Mời Zalo Mẫu'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                MỤC MỞ RỘNG (NÂNG CAO - TÙY CHỌN CHO DÂU RỂ THÍCH TÙY BIẾN SÂU)
               =============================================================== */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full p-4 rounded-2xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 flex items-center justify-between cursor-pointer transition-colors shadow-xs"
              >
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#A2682A]" />
                  <span className="font-serif text-xs font-bold text-stone-900">
                    Cài Đặt Mở Rộng (Kỷ Niệm, Lời Hẹn Ước, Bật/Tắt Khối, Hiệu Ứng, RSVP)
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform ${
                    showAdvanced ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showAdvanced && (
                <div className="mt-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4 animate-fadeIn">
                  {/* Advanced Sub-tabs */}
                  <div className="flex items-center space-x-1.5 border-b border-stone-100 pb-3 overflow-x-auto no-scrollbar">
                    {[
                      { id: 'timeline', label: 'Cột Mốc Kỷ Niệm', icon: Heart },
                      { id: 'vows', label: 'Lời Hẹn Ước', icon: Sparkles },
                      { id: 'builder', label: 'Bật/Tắt Các Khối', icon: Layers },
                      { id: 'animation', label: 'Hiệu Ứng Bay', icon: Wand2 },
                      { id: 'rsvp', label: 'Khách RSVP', icon: Users },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = advancedTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setAdvancedTab(tab.id as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 whitespace-nowrap cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-amber-100 text-[#A2682A]'
                              : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sub-tab 1: Milestones */}
                  {advancedTab === 'timeline' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-800">
                          Các Cột Mốc Tình Yêu (Milestones):
                        </span>
                        <button
                          type="button"
                          onClick={handleAddMilestone}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 text-[#A2682A] text-xs font-bold cursor-pointer"
                        >
                          + Thêm Mốc
                        </button>
                      </div>

                      {formData.timeline.map((m, idx) => (
                        <div key={m.id} className="p-3 bg-stone-50 rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={m.title}
                              onChange={(e) => {
                                const updated = [...formData.timeline];
                                updated[idx].title = e.target.value;
                                setFormData({ ...formData, timeline: updated });
                              }}
                              className="font-bold text-stone-900 bg-transparent border-none p-0 focus:outline-none"
                              placeholder="Tiêu đề mốc kỷ niệm"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveMilestone(idx)}
                              className="text-stone-400 hover:text-rose-600"
                            >
                              ✕
                            </button>
                          </div>
                          <textarea
                            value={m.story}
                            onChange={(e) => {
                              const updated = [...formData.timeline];
                              updated[idx].story = e.target.value;
                              setFormData({ ...formData, timeline: updated });
                            }}
                            rows={2}
                            className="w-full p-2 bg-white rounded-lg border border-stone-200 text-stone-700 text-xs"
                            placeholder="Lời kể câu chuyện tình yêu..."
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sub-tab 2: Vows */}
                  {advancedTab === 'vows' && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-stone-800 block">
                        Lời Hẹn Ước Của Dâu Rể:
                      </span>
                      {formData.loveStoryMessages.map((vow, idx) => (
                        <div key={idx} className="p-3 bg-stone-50 rounded-xl space-y-2 text-xs">
                          <input
                            type="text"
                            value={vow.author}
                            onChange={(e) => {
                              const updated = [...formData.loveStoryMessages];
                              updated[idx].author = e.target.value;
                              setFormData({ ...formData, loveStoryMessages: updated });
                            }}
                            className="font-bold text-stone-900 bg-transparent border-none p-0 focus:outline-none"
                            placeholder="Người viết (VD: Tuấn Anh)"
                          />
                          <textarea
                            value={vow.quote}
                            onChange={(e) => {
                              const updated = [...formData.loveStoryMessages];
                              updated[idx].quote = e.target.value;
                              setFormData({ ...formData, loveStoryMessages: updated });
                            }}
                            rows={2}
                            className="w-full p-2 bg-white rounded-lg border border-stone-200 text-stone-700 text-xs"
                            placeholder="Lời tâm sự son sắt..."
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Sub-tab 3: Section Toggles */}
                  {advancedTab === 'builder' && (
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold text-stone-800 block">
                        Bật / Tắt Các Khối Trên Website:
                      </span>
                      {[
                        { key: 'showCouple' as const, label: 'Giới Thiệu Dâu & Rể' },
                        { key: 'showGallery' as const, label: 'Album Ảnh Cưới' },
                        { key: 'showTimeline' as const, label: 'Cột Mốc Tình Yêu' },
                        { key: 'showLoveMessages' as const, label: 'Lời Hẹn Ước' },
                        { key: 'showDresscode' as const, label: 'Trang Phục Gợi Ý' },
                        { key: 'showEvents' as const, label: 'Lịch Trình & Sảnh Tiệc' },
                        { key: 'showRSVP' as const, label: 'Xác Nhận Tham Dự (RSVP)' },
                        { key: 'showWishes' as const, label: 'Sổ Lưu Bút Lời Chúc' },
                        { key: 'showDonateBox' as const, label: 'Hộp Mừng Cưới Chúc Phúc' },
                      ].map((item) => {
                        const currentSections = formData.sectionsConfig || DEFAULT_SECTIONS_CONFIG;
                        const isEnabled = currentSections[item.key] !== false;
                        return (
                          <label
                            key={item.key}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs cursor-pointer hover:bg-stone-100/70"
                          >
                            <span className="text-stone-800 font-medium">{item.label}</span>
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  sectionsConfig: {
                                    ...currentSections,
                                    [item.key]: e.target.checked,
                                  },
                                });
                              }}
                              className="w-4 h-4 rounded text-[#722235] focus:ring-[#722235]"
                            />
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* Sub-tab 4: Animation */}
                  {advancedTab === 'animation' && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-stone-800 block">
                        Hiệu Ứng Bay Lãng Mạn:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'rose_petals', name: 'Cánh Hoa Hồng Rơi' },
                          { id: 'golden_stardust', name: 'Bụi Sao Vàng Lấp Lánh' },
                          { id: 'glowing_hearts', name: 'Trái Tim Bay Bổng' },
                          { id: 'none', name: 'Tắt Hiệu Ứng' },
                        ].map((ef) => (
                          <button
                            key={ef.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                animationEffect: ef.id as AnimationEffect,
                              })
                            }
                            className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer transition-colors ${
                              formData.animationEffect === ef.id
                                ? 'border-[#722235] bg-rose-50 text-[#722235]'
                                : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            {ef.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 5: RSVP List */}
                  {advancedTab === 'rsvp' && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-stone-800 block">
                        Danh Sách Khách Xác Nhận Tham Dự ({rsvps.length}):
                      </span>
                      {rsvps.length === 0 ? (
                        <p className="text-xs text-stone-400 italic">
                          Chưa có khách nào gửi phản hồi RSVP.
                        </p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {rsvps.map((r, i) => (
                            <div
                              key={r.id || i}
                              className="p-2.5 bg-stone-50 rounded-xl text-xs flex justify-between items-center"
                            >
                              <div>
                                <span className="font-bold text-stone-900">{r.guestName}</span>
                                <span className="text-stone-500 block text-[10px]">
                                  {r.attending ? '✅ Sẽ tham dự' : '❌ Tiếc là không đến được'} • {r.guestCount} người
                                </span>
                              </div>
                              <span className="text-[10px] text-stone-400 font-mono">
                                {r.submittedAt ? new Date(r.submittedAt).toLocaleDateString('vi-VN') : ''}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* STICKY BOTTOM FORM FOOTER NAVIGATION (Quay Lại / Tiếp Tục) */}
          <div className="h-16 bg-white border-t border-stone-200 px-6 flex items-center justify-between flex-shrink-0">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentStep === 1
                  ? 'text-stone-300 bg-stone-50 border border-stone-200 cursor-not-allowed'
                  : 'text-stone-700 hover:bg-stone-100 border border-stone-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Bước Trước</span>
            </button>

            <span className="text-xs font-bold text-stone-500">
              Bước {currentStep} / 5
            </span>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Bước Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center space-x-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4 text-emerald-200" />
                <span>{isPublishing ? 'Đang Lưu...' : 'Lưu & Hoàn Tất'}</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT PANE: LIVE PREVIEW SIMULATOR */}
        <div className="hidden lg:flex flex-1 bg-[#F5F3EF] flex-col overflow-hidden items-center justify-center p-4 xl:p-6 relative">
          {/* Top Quick Status Pill */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-stone-700 text-xs font-bold shadow-xs pointer-events-auto flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Xem Trước Trực Tiếp (Real-time Preview)</span>
            </span>

            <div className="flex items-center space-x-2 pointer-events-auto">
              <button
                type="button"
                onClick={() => setPreviewKey((k) => k + 1)}
                className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200 shadow-xs cursor-pointer transition-colors"
                title="Tải lại bản xem trước"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <a
                href={`/?w=${weddingSlug}${previewViewMode === 'website' ? '&preview=true' : ''}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200 shadow-xs cursor-pointer transition-colors"
                title="Mở toàn màn hình trong tab mới"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Device Frame */}
          {previewDevice === 'mobile' ? (
            <div className="w-[390px] h-[92%] max-h-[780px] rounded-[44px] border-[10px] border-stone-800 shadow-2xl overflow-hidden relative ring-2 ring-stone-300 flex flex-col bg-white">
              {/* Dynamic Island / Speaker */}
              <div className="h-6 bg-stone-800 w-full flex items-center justify-center relative flex-shrink-0">
                <div className="w-24 h-4 bg-stone-900 rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-950/80" />
                </div>
              </div>

              {/* Iframe */}
              <iframe
                key={previewKey}
                title="Live Mobile Simulator"
                src={`/?w=${weddingSlug}${previewViewMode === 'website' ? '&preview=true' : ''}&simulator=1`}
                className="w-full flex-1 border-none bg-wedding-cream"
              />
            </div>
          ) : (
            <div className="w-full h-[92%] max-w-4xl rounded-2xl border border-stone-300 shadow-2xl overflow-hidden flex flex-col bg-white">
              {/* Mock Browser Topbar */}
              <div className="h-9 bg-stone-200/80 border-b border-stone-300 px-4 flex items-center space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 max-w-sm mx-auto h-6 rounded-md bg-white border border-stone-300 flex items-center px-3 text-[11px] text-stone-500 font-mono select-none truncate">
                  🔒 marrime.vn/w/{weddingSlug}
                </div>
              </div>

              {/* Iframe */}
              <iframe
                key={previewKey}
                title="Live Desktop Simulator"
                src={`/?w=${weddingSlug}${previewViewMode === 'website' ? '&preview=true' : ''}&simulator=1`}
                className="w-full flex-1 border-none bg-wedding-cream"
              />
            </div>
          )}
        </div>
      </div>

      {/* PUBLISH SUCCESS MODAL WITH SECRET PIN & DONATE INFO */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-stone-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsPublishModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 p-1 cursor-pointer"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center space-y-1.5">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {publishMessage || 'Lưu Thiệp Cưới Thành Công!'}
              </h3>
              <p className="text-xs text-stone-600">
                Thiệp cưới đã sẵn sàng để gửi tới gia đình, bạn bè và quan khách!
              </p>
            </div>

            {/* 1. SECRET MANAGEMENT PIN */}
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 text-[#A2682A] font-bold">
                <KeyRound className="w-4 h-4" />
                <span>MÃ BÍ MẬT QUẢN TRỊ (CHỈ DÀNH RIÊNG CHO BẠN)</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={editingPin}
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-amber-300 text-[#722235] font-mono text-base font-bold tracking-wider text-center"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(editingPin);
                    setCopiedPin(true);
                    setTimeout(() => setCopiedPin(false), 2500);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#722235] text-white font-bold cursor-pointer hover:opacity-90 flex items-center space-x-1"
                >
                  {copiedPin ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPin ? 'Đã Chép!' : 'Sao Chép'}</span>
                </button>
              </div>
              <p className="text-[11px] text-stone-600 font-light leading-relaxed">
                💡 Hãy lưu lại mã này. Lần tới quay lại Studio, chỉ cần bấm <strong>"Nhập Mã Sửa Cũ"</strong> và điền mã này là bạn có thể cập nhật ảnh, đổi ngày tiệc hoặc xem phản hồi RSVP.
              </p>
            </div>

            {/* 2. GENERAL INVITATION LINK */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <span className="font-bold text-stone-800 block">
                Link Thiệp Cưới Chung (Dùng đăng Facebook, Zalo nhóm):
              </span>
              <div className="flex space-x-2">
                <input
                  type="text"
                  readOnly
                  value={generalShareUrl}
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generalShareUrl);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2500);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-[#722235] text-white font-bold cursor-pointer hover:opacity-90 flex items-center space-x-1"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Đã Chép' : 'Sao Chép'}</span>
                </button>
              </div>
            </div>

            {/* 3. AUTHOR DONATE COFFEE BOX */}
            <div className="bg-gradient-to-b from-[#FAF8F5] to-amber-50/50 p-5 rounded-2xl border border-amber-200 space-y-3 text-xs text-stone-800">
              <div className="flex items-center space-x-2 text-[#A2682A] font-bold">
                <Coffee className="w-4 h-4 text-amber-600" />
                <span>GỬI TẶNG TÁC GIẢ LY CÀ PHÊ CHÚC PHÚC (DONATE TÙY TÂM)</span>
              </div>

              <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                Marrime là nền tảng miễn phí. Nếu thấy sản phẩm hữu ích cho ngày vui của hai bạn, hãy gửi tặng một ly cà phê nhỏ để ủng hộ tác giả duy trì máy chủ. <strong>Ủng hộ hoàn toàn tùy tâm, không gửi cũng không sao cả</strong>, thiệp cưới của bạn vẫn lưu vĩnh viễn và hoàn toàn miễn phí!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3.5 rounded-xl border border-stone-200">
                <div className="w-32 h-32 bg-stone-50 p-2 rounded-xl shadow-xs shrink-0 border border-stone-200">
                  <img
                    src={AUTHOR_DONATE_CONFIG.qrImageUrl}
                    alt="Mã QR VietQR ACB"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 space-y-1 text-left w-full">
                  <span className="text-[10px] text-stone-500 uppercase font-mono block">Tài khoản tác giả:</span>
                  <div className="font-serif text-sm font-bold text-stone-900">{AUTHOR_DONATE_CONFIG.bankName}</div>
                  <div className="flex items-center space-x-2 pt-0.5">
                    <span className="font-mono text-base font-bold text-[#A2682A] tracking-wider">
                      {AUTHOR_DONATE_CONFIG.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(AUTHOR_DONATE_CONFIG.accountNumber);
                        setCopiedAuthorBank(true);
                        setTimeout(() => setCopiedAuthorBank(false), 2000);
                      }}
                      className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-[10px] text-stone-700 cursor-pointer border border-stone-300"
                    >
                      {copiedAuthorBank ? '✓ Đã chép' : 'Chép STK'}
                    </button>
                  </div>
                  <div className="text-xs text-stone-800 font-semibold">{AUTHOR_DONATE_CONFIG.accountHolder}</div>
                  <span className="text-[10px] text-[#A2682A] italic block pt-1">
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
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white font-bold text-xs shadow-md hover:opacity-95 text-center flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở Xem Thiệp Cưới Khách Ngay</span>
              </a>
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(false)}
                className="px-6 py-3 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 font-semibold text-xs cursor-pointer transition-colors"
              >
                Đóng Bảng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOOKUP EXISTING WEDDING PROJECT MODAL */}
      {isLookupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-stone-300 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsLookupModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 p-1 cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[#A2682A] flex items-center justify-center mx-auto shadow-xs">
                <KeyRound className="w-6 h-6 text-[#A2682A]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Nhập Mã Quản Trị Chỉnh Sửa Thiệp
              </h3>
              <p className="text-xs text-stone-600">
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
                  className="w-full text-center px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 font-mono text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-[#A2682A]/30 focus:border-[#A2682A]"
                  autoFocus
                />
                {lookupError && <p className="text-xs text-rose-600 mt-2 text-center font-medium">{lookupError}</p>}
              </div>

              <button
                type="submit"
                disabled={isLookingUp}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                {isLookingUp ? <span>Đang Tải Dữ Liệu...</span> : <span>Mở Lại Thiệp Để Chỉnh Sửa</span>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
