import React, { useState } from 'react';
import {
  Sparkles,
  Crown,
  Heart,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Send,
  Camera,
  Music,
  Users,
  Smartphone,
  Monitor,
  Globe,
  Check,
  Eye,
  Star,
  Gift,
  Mail,
  Palette,
  Layout,
  Coffee,
  KeyRound,
  Wand2,
  Filter,
  X,
  Menu,
  ExternalLink,
  Copy,
  ChevronDown,
} from 'lucide-react';
import {
  MASTER_TEMPLATE_CATALOG,
  MasterTemplateItem,
  AUTHOR_DONATE_CONFIG,
} from '../../shared/defaultData';

export const PlatformLandingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<MasterTemplateItem | null>(null);
  const [previewMode, setPreviewMode] = useState<'website' | 'envelope'>('website');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [lookupInput, setLookupInput] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [copiedSTK, setCopiedSTK] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupInput.trim()) {
      setLookupError('Vui lòng nhập mã bí mật (VD: MAR-6825) hoặc tên slug thiệp.');
      return;
    }
    setIsLookingUp(true);
    window.location.href = `/studio?code=${encodeURIComponent(lookupInput.trim())}`;
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredTemplates =
    selectedCategory === 'all'
      ? MASTER_TEMPLATE_CATALOG
      : MASTER_TEMPLATE_CATALOG.filter((item) => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'Tất Cả 10 Phong Cách', icon: Sparkles, count: MASTER_TEMPLATE_CATALOG.length },
    { id: 'traditional', label: 'Truyền Thống & Di Sản', icon: Crown, count: 2 },
    { id: 'romantic', label: 'Lãng Mạn & Nàng Thơ', icon: Heart, count: 2 },
    { id: 'modern', label: 'Tạp Chí & Tối Giản', icon: Layout, count: 2 },
    { id: 'nature', label: 'Sân Vườn & Tự Nhiên', icon: Wand2, count: 1 },
    { id: 'luxury', label: 'Hoàng Gia & Dạ Tiệc', icon: Star, count: 2 },
  ];

  const handleCopyAuthorBank = () => {
    navigator.clipboard.writeText(AUTHOR_DONATE_CONFIG.accountNumber);
    setCopiedSTK(true);
    setTimeout(() => setCopiedSTK(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* 1. TOP NAVBAR (ATELIER CƯỚI SANG TRỌNG, TINH TẾ & CHUẨN MỰC) */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="/" className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#722235] to-[#4A1020] text-[#FFFDF9] border border-[#DFB76C]/60 flex items-center justify-center font-serif text-sm font-bold shadow-md shrink-0">
              M
            </div>
            <div className="whitespace-nowrap">
              <span className="font-serif text-xl font-bold text-[#4A1020] tracking-wider block leading-tight">
                MARRIME
              </span>
              <span className="text-[9px] text-[#A2682A] tracking-[0.2em] uppercase font-bold block">
                ATELIER THIỆP CƯỚI ĐỘC BẢN
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Gọn gàng, chuẩn phong cách cưới, không rớt dòng chữ) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-semibold text-stone-600 whitespace-nowrap">
            <button
              type="button"
              onClick={() => scrollToSection('templates')}
              className="hover:text-[#722235] transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <span>Mẫu Thiệp Cưới</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-[10px] text-rose-800 font-bold">
                10 Mẫu
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('features')}
              className="hover:text-[#722235] transition-colors cursor-pointer"
            >
              Tính Năng Nổi Bật
            </button>
            <a
              href="/?w=korean_pastel"
              target="_blank"
              rel="noreferrer"
              className="text-[#722235] hover:text-rose-700 transition-colors flex items-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem Mẫu Trực Tiếp</span>
            </a>
          </nav>

          {/* Header Action Buttons & Mobile Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('lookup-portal')}
              className="hidden md:inline-flex px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs border border-stone-200 transition-colors cursor-pointer items-center space-x-1.5 whitespace-nowrap"
              title="Tra cứu hoặc sửa thiệp đã tạo bằng Mã Bí Mật"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#A2682A]" />
              <span>Tra Cứu Mã Thiệp</span>
            </button>

            <a
              href="/studio"
              className="px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B1A32] via-[#722235] to-[#551020] text-white font-bold text-xs shadow-md hover:shadow-lg hover:opacity-95 transition-all cursor-pointer border border-[#DFB76C]/40 flex items-center space-x-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Tạo Thiệp Cưới</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {isMobileNavOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FFFDF9] px-4 py-4 space-y-3 shadow-lg animate-fadeIn">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-700">
              <button
                type="button"
                onClick={() => {
                  scrollToSection('templates');
                  setIsMobileNavOpen(false);
                }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-100 text-left transition-colors cursor-pointer"
              >
                <span>Mẫu Thiệp Cưới</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-xs text-rose-800 font-bold">
                  10 Phong Cách
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  scrollToSection('features');
                  setIsMobileNavOpen(false);
                }}
                className="p-2 rounded-lg hover:bg-stone-100 text-left transition-colors cursor-pointer"
              >
                Tính Năng Nổi Bật
              </button>
              <a
                href="/?w=korean_pastel"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-stone-100 flex items-center space-x-2 text-[#722235] transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Xem Thiệp Mẫu Thực Tế (7799 Storyteller)</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  scrollToSection('lookup-portal');
                  setIsMobileNavOpen(false);
                }}
                className="p-2 rounded-lg hover:bg-stone-100 flex items-center space-x-2 text-stone-700 transition-colors cursor-pointer text-left"
              >
                <KeyRound className="w-4 h-4 text-[#A2682A]" />
                <span>Tra Cứu Hoặc Sửa Thiệp Cũ Bằng Mã Bí Mật</span>
              </button>
            </nav>
            <div className="pt-2 border-t border-stone-100">
              <a
                href="/studio"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Bắt Đầu Tạo Thiệp Cưới Ngay</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION (LUMINOUS, ROMANTIC, BRIDAL ELEGANCE) */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden text-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FAF8F5]">
        {/* Soft Warm Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-rose-200/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-amber-200/25 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-[#8B1A32] tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A2682A]" />
            <span>NỀN TẢNG THIỆP CƯỚI NGHỆ THUẬT MỞ • 100% MIỄN PHÍ CHO DÂU & RỂ</span>
            <Sparkles className="w-3.5 h-3.5 text-[#A2682A]" />
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-stone-900 font-normal leading-[1.18] tracking-tight">
            Tự Tay Sáng Tạo Thiệp Cưới Độc Bản,{' '}
            <span className="font-bold text-[#722235] block sm:inline">Kính Mời Đích Danh</span> Từng Vị Khách Quý
          </h1>

          {/* Subtitle */}
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Marrime mang đến trải nghiệm mở bao thư 3D chân thực như cầm tấm thiệp trên tay. Không cần đăng ký tài khoản: bạn thỏa sức chọn từ{' '}
            <strong className="text-[#722235] font-semibold">10 phong cách nghệ thuật</strong> (Hàn Quốc Pastel, Hỷ Sự Áo Dài Song Hỷ 囍, Hoàng Gia Châu Âu, Sân Vườn Rustic...). Lưu thiệp nhận{' '}
            <strong className="text-stone-900 font-semibold">Mã Bí Mật Quản Trị</strong> để chỉnh sửa bất kỳ lúc nào!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href="/studio"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B1A32] via-[#722235] to-[#4A1020] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:opacity-95 transition-all cursor-pointer border border-[#DFB76C]/50 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Bắt Đầu Tạo Thiệp Ngay (Miễn Phí)</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </a>

            <button
              onClick={() => scrollToSection('templates')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm border border-stone-300 transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
            >
              <Palette className="w-4 h-4 text-[#A2682A]" />
              <span>Khám Phá 10 Mẫu Thiệp Cưới</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600 font-medium">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Miễn phí 100% • Không giới hạn tính năng</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#A2682A]" />
              <span>10 Phong cách đa dạng chuẩn văn hóa</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Smartphone className="w-4 h-4 text-rose-600" />
              <span>Bao thư 3D tương thích hoàn hảo mọi điện thoại</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. TEMPLATES SHOWCASE (10 MASTER STYLES WITH FILTER) */}
      <section id="templates" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#A2682A] uppercase tracking-[0.25em]">
            BỘ SƯU TẬP 10 PHONG CÁCH CƯỚI ĐỘC BẢN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
            Chọn Phong Cách & Bắt Đầu Thiết Kế
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm">
            Mỗi phong cách được thiết kế riêng biệt từ bao thư 3D, hoa văn văn hóa, typography đến âm nhạc hòa tấu.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-[#722235] text-white border-[#722235] shadow-md'
                    : 'bg-white text-stone-600 hover:text-stone-900 border-stone-200 hover:border-stone-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-stone-200/90 hover:border-[#DFB76C] shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                {/* Image Banner */}
                <div className="h-52 relative overflow-hidden bg-stone-100">
                  <img
                    src={item.heroImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-md text-stone-800 shadow-sm flex items-center space-x-1">
                      <span>{item.icon}</span>
                      <span>{item.categoryLabel}</span>
                    </span>
                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#722235] text-white shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Color Palette Dots */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 bg-white/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/60">
                    {item.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-white shadow-xs inline-block"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#722235] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#A2682A] font-semibold">{item.subtitle}</p>
                  </div>

                  <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
                    <span className="italic truncate pr-2">"{item.tagline}"</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 space-y-2">
                <a
                  href={`/studio?template=${item.id}`}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm hover:opacity-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Tạo Thiệp Bằng Mẫu Này</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(item)}
                    className="flex-1 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[11px] transition-colors cursor-pointer text-center"
                  >
                    Xem Nhanh Mẫu
                  </button>
                  <a
                    href={`/?w=${item.presetKey}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-[#722235] font-semibold text-[11px] transition-colors text-center flex items-center justify-center space-x-1 border border-stone-200"
                  >
                    <span>Mở Tab Mới</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. QUICK LIVE PREVIEW MODAL */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FFFDF9] border border-stone-300 rounded-3xl max-w-5xl w-full h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
            {/* Modal Header */}
            <div className="px-5 py-3 sm:py-4 bg-white border-b border-stone-200 flex flex-wrap items-center justify-between flex-shrink-0 gap-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl sm:text-3xl">{previewTemplate.icon}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                      {previewTemplate.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#A2682A] border border-amber-200">
                      {previewTemplate.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[#A2682A] font-medium">{previewTemplate.subtitle}</p>
                </div>
              </div>

              {/* View Mode & Device Controls */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Mode Switcher */}
                <div className="flex items-center p-1 rounded-xl bg-stone-100 border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('website')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      previewMode === 'website'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-[#A2682A]" />
                    <span>Toàn Bộ Website</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('envelope')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                      previewMode === 'envelope'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-600" />
                    <span>Bao Thư & Sáp Nến 3D</span>
                  </button>
                </div>

                {/* Device Switcher (Desktop / Mobile) */}
                <div className="hidden sm:flex items-center p-1 rounded-xl bg-stone-100 border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                      previewDevice === 'desktop'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title="Xem bản Máy Tính (Desktop)"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                      previewDevice === 'mobile'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title="Xem bản Di Động (Mobile)"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>

                {/* Studio CTA */}
                <a
                  href={`/studio?template=${previewTemplate.id}`}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span className="hidden md:inline">Tạo Bằng Mẫu Này</span>
                  <span className="md:hidden">Dùng Mẫu</span>
                </a>

                {/* Open in new tab */}
                <a
                  href={`/?w=${previewTemplate.presetKey}${previewMode === 'website' ? '&preview=true' : ''}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-[#722235] transition-colors"
                  title="Mở toàn màn hình trong tab mới"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer transition-colors"
                  title="Đóng xem trước"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Iframe Body */}
            <div className="flex-1 bg-stone-100/90 flex items-center justify-center p-3 sm:p-5 overflow-hidden">
              {previewDevice === 'mobile' ? (
                <div className="w-[390px] h-full max-h-[760px] rounded-[44px] border-[10px] border-stone-800 shadow-2xl overflow-hidden relative ring-2 ring-stone-300 flex flex-col bg-white">
                  {/* Dynamic Island / Notch */}
                  <div className="h-6 bg-stone-800 w-full flex items-center justify-center relative flex-shrink-0">
                    <div className="w-24 h-4 bg-stone-900 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-950/80" />
                    </div>
                  </div>
                  <iframe
                    title="Live Template Preview Mobile"
                    src={`/?w=${previewTemplate.presetKey}${previewMode === 'website' ? '&preview=true' : ''}`}
                    className="w-full flex-1 border-none bg-wedding-cream"
                  />
                </div>
              ) : (
                <div className="w-full h-full max-w-5xl rounded-2xl border border-stone-300 shadow-2xl overflow-hidden flex flex-col bg-white">
                  {/* Mock Browser Topbar */}
                  <div className="h-9 bg-stone-200/80 border-b border-stone-300 px-4 flex items-center space-x-3 flex-shrink-0">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 max-w-sm mx-auto h-6 rounded-md bg-white border border-stone-300 flex items-center px-3 text-[11px] text-stone-500 font-mono select-none truncate">
                      🔒 marrime.vn/w/{previewTemplate.presetKey}
                    </div>
                  </div>
                  <iframe
                    title="Live Template Preview Desktop"
                    src={`/?w=${previewTemplate.presetKey}${previewMode === 'website' ? '&preview=true' : ''}`}
                    className="w-full flex-1 border-none bg-wedding-cream"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. CORE VALUES & PHILOSOPHY */}
      <section id="features" className="py-20 px-4 bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-[#A2682A] uppercase tracking-[0.25em]">
              TỰ DO THIẾT KẾ CHO DÂU & RỂ
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-stone-900 font-normal">
              Tại Sao Marrime Khác Biệt?
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm">
              Đám cưới chỉ có một lần trong đời, hãy để ngày vui của hai bạn toát lên sự hãnh diện và tôn trọng cao nhất dành cho quan khách.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-[#FAF8F5] border border-stone-200 space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Không Rào Cản • Mở Tự Do
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Không bắt buộc đăng ký tài khoản phiền toái. Bạn vào là được thiết kế ngay, tự do tải ảnh cưới, đổi nhạc nền và trải nghiệm toàn bộ tính năng cao cấp không giới hạn.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#FAF8F5] border border-stone-200 space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#A2682A]">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Link Đích Danh & Lời Mời Zalo Từng Người
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Dâu rể chỉ cần nhập tên khách (*Bác Ba, Anh Hùng, Bạn Thảo*), hệ thống tự tạo ngay link thiệp mời riêng có khắc chữ đích danh cùng tin nhắn Zalo mẫu trang trọng.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#FAF8F5] border border-stone-200 space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#722235]">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Mã Bí Mật Quản Trị Trọn Đời
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Sau khi bấm lưu, bạn nhận ngay một Mã Quản Trị Bí Mật (VD: MAR-6825). Lần tới quay lại Studio, chỉ cần nhập mã là thoải mái cập nhật ảnh, đổi ngày giờ tiệc hoặc xem khách phản hồi RSVP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NỀN TẢNG MỞ & DONATE TÙY TÂM CHO TÁC GIẢ */}
      <section id="free-concept" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-[#A2682A] uppercase tracking-[0.25em]">
            TRIẾT LÝ PHI LỢI NHUẬN
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-stone-900 font-normal">
            Nền Tảng Mở & Donate Cà Phê Tùy Tâm ☕
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm">
            Marrime là nền tảng miễn phí. Nếu thấy thiệp cưới hữu ích cho hôn lễ của mình, bạn có thể gửi tặng một ly cà phê chúc phúc tới tác giả.
          </p>
        </div>

        <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center gap-8">
          {/* VietQR Box */}
          <div className="shrink-0 flex flex-col items-center p-4 bg-stone-50 rounded-2xl border border-stone-200 shadow-inner">
            <img
              src={AUTHOR_DONATE_CONFIG.qrImageUrl}
              alt="VietQR Tặng Cà Phê Tác Giả"
              className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-xl bg-white p-2 shadow-sm border border-stone-200"
            />
            <span className="text-[11px] text-[#A2682A] font-bold mt-2">
              Quét mã VietQR chuyển khoản nhanh
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <span className="text-xs font-bold text-[#A2682A] uppercase tracking-wider block">
                {AUTHOR_DONATE_CONFIG.title}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                Gửi Tặng Một Ly Cà Phê Chúc Phúc
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {AUTHOR_DONATE_CONFIG.message}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
              <div className="text-stone-600">
                Ngân hàng: <strong className="text-stone-900">{AUTHOR_DONATE_CONFIG.bankName}</strong>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="text-stone-600">Số tài khoản:</span>
                <span className="text-[#8B1A32] font-mono font-bold text-base">
                  {AUTHOR_DONATE_CONFIG.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAuthorBank}
                  className="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-[11px] text-stone-800 font-semibold cursor-pointer transition-colors flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSTK ? 'Đã Chép' : 'Chép STK'}</span>
                </button>
              </div>
              <div className="text-stone-600">
                Chủ tài khoản: <strong className="text-stone-900">{AUTHOR_DONATE_CONFIG.accountHolder}</strong>
              </div>
            </div>

            <p className="text-[11px] text-[#A2682A] italic">
              "Chúc hai bạn trăm năm hạnh phúc, răng long đầu bạc!"
            </p>
          </div>
        </div>
      </section>

      {/* 7. DÂU RỂ LOOKUP / EDIT EXISTING CARD PORTAL */}
      <section id="lookup-portal" className="py-24 px-4 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-md mx-auto text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl relative z-10">
          <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[#722235] mx-auto shadow-sm">
            <KeyRound className="w-7 h-7 text-[#722235]" />
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Quản Trị & Chỉnh Sửa Thiệp Cưới Đã Tạo
            </h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Nhập Mã Bí Mật Quản Trị (VD: MAR-6825) hoặc tên đường dẫn thiệp cưới của hai bạn để mở Studio và tiếp tục chỉnh sửa.
            </p>
          </div>

          <form onSubmit={handleLookupSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value)}
                placeholder="Nhập mã bí mật (VD: MAR-6825)..."
                className="w-full text-center px-4 py-3.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 font-mono text-base tracking-wider focus:outline-none focus:border-[#722235] focus:bg-white shadow-inner transition-colors"
              />
              {lookupError && <p className="text-xs text-rose-600 mt-2">{lookupError}</p>}
            </div>

            <button
              type="submit"
              disabled={isLookingUp}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white font-bold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-4 h-4 text-amber-200" />
              <span>{isLookingUp ? 'Đang Mở Xưởng Studio...' : 'Mở Xưởng Chỉnh Sửa Thiệp'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500">
            <span>Hai bạn chưa tạo thiệp cưới?</span>
            <a
              href="/studio"
              className="text-[#722235] font-bold ml-1.5 hover:underline inline-flex items-center"
            >
              <span>Tự tạo thiệp mới miễn phí ngay</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-12 px-4 bg-white border-t border-stone-200 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-serif text-sm text-stone-700">
            Marrime • Nền Tảng Thiệp Cưới Điện Tử Mở & Độc Bản Cho Cặp Đôi
          </p>
          <p className="text-[11px] text-stone-500">
            10 Phong cách cưới chuẩn mực • Tự do thiết kế • Hoàn toàn miễn phí
          </p>
          <p className="pt-2 text-stone-400">© 2026 Marrime Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
