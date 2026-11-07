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
  Check,
  HelpCircle,
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
  ExternalLink,
  Copy,
} from 'lucide-react';
import {
  MASTER_TEMPLATE_CATALOG,
  MasterTemplateItem,
  AUTHOR_DONATE_CONFIG,
} from '../../shared/defaultData';

export const PlatformLandingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<MasterTemplateItem | null>(null);
  const [lookupInput, setLookupInput] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [copiedSTK, setCopiedSTK] = useState(false);

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
    { id: 'all', label: 'Tất Cả Mẫu', icon: Sparkles, count: MASTER_TEMPLATE_CATALOG.length },
    { id: 'traditional', label: 'Truyền Thống & Di Sản', icon: Crown, count: 2 },
    { id: 'romantic', label: 'Lãng Mạn & Cổ Tích', icon: Heart, count: 2 },
    { id: 'modern', label: 'Tối Giản & Editorial', icon: Layout, count: 2 },
    { id: 'nature', label: 'Sân Vườn & Tự Nhiên', icon: Wand2, count: 1 },
    { id: 'luxury', label: 'Hoàng Gia & Dạ Tiệc', icon: Star, count: 2 },
  ];

  const handleCopyAuthorBank = () => {
    navigator.clipboard.writeText(AUTHOR_DONATE_CONFIG.accountNumber);
    setCopiedSTK(true);
    setTimeout(() => setCopiedSTK(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-100 font-sans selection:bg-wedding-rose-900 selection:text-wedding-gold-light">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-wedding-burgundy to-[#4A1020] text-wedding-gold-light border border-wedding-gold/60 flex items-center justify-center font-serif text-sm font-bold shadow-luxury">
              A&P
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white tracking-wider block leading-none">
                MARRIME
              </span>
              <span className="text-[9px] text-wedding-gold tracking-[0.25em] uppercase font-bold">
                XƯỞNG THIỆP CƯỚI ĐỘC BẢN
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold text-stone-300">
            <button
              onClick={() => scrollToSection('templates')}
              className="hover:text-wedding-gold transition-colors cursor-pointer flex items-center space-x-1"
            >
              <span>10 Phong Cách Cưới</span>
              <span className="px-1.5 py-0.2 rounded-full bg-wedding-burgundy text-[10px] text-amber-200">
                10
              </span>
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-wedding-gold transition-colors cursor-pointer"
            >
              Tính Năng Tự Thiết Kế
            </button>
            <button
              onClick={() => scrollToSection('free-concept')}
              className="hover:text-wedding-gold transition-colors cursor-pointer"
            >
              Nền Tảng Mở & Donate
            </button>
            <a
              href="/?w=tuan-anh-mai-phuong"
              target="_blank"
              rel="noreferrer"
              className="text-wedding-rose-400 hover:text-wedding-rose-300 transition-colors flex items-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem Thiệp Khách Mẫu</span>
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => scrollToSection('lookup-portal')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white font-semibold text-xs border border-stone-700 transition-colors cursor-pointer items-center space-x-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-wedding-gold" />
              <span>Nhập Mã Sửa Thiệp</span>
            </button>

            <a
              href="/studio"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-wedding-rose-800 to-wedding-burgundy text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/50 flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-wedding-gold-light" />
              <span>Vào Studio Tạo Thiệp (Miễn Phí)</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-wedding-burgundy/25 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-amber-500/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-wedding-gold/40 text-[11px] font-semibold text-wedding-gold uppercase tracking-[0.2em] shadow-luxury">
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
            <span>NỀN TẢNG MỞ • 10 PHONG CÁCH ĐỘC BẢN CHO DÂU & RỂ</span>
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.18] tracking-tight">
            Tự Tay Xây Dựng Thiệp Cưới Độc Bản,{' '}
            <span className="text-gold-luxury font-bold">Kính Mời Đích Danh</span> Từng Vị Khách
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Không cần tài khoản, không bị bó buộc: Dâu rể thoải mái chọn từ{' '}
            <strong className="text-wedding-gold font-semibold">10 phong cách nghệ thuật</strong> (Áo Dài Truyền Thống Song Hỷ 囍, Đông Dương Di Sản, Editorial Vogue, Vườn Sân Vườn, Hàn Quốc Pastel...). Lưu xong nhận{' '}
            <strong className="text-white font-semibold">Mã Bí Mật Quản Trị</strong> để chỉnh sửa bất kỳ lúc nào!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href="/studio"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-wedding-rose-700 via-wedding-burgundy to-[#4A1020] text-white font-bold text-sm shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/60 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Bắt Đầu Tạo Thiệp Ngay (Miễn Phí)</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </a>

            <button
              onClick={() => scrollToSection('templates')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-bold text-sm border border-stone-700 transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <Palette className="w-4 h-4 text-wedding-gold" />
              <span>Khám Phá 10 Mẫu Thiệp Độc Bản</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-medium">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Miễn phí 100% • Không quảng cáo</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-wedding-gold" />
              <span>10 Phong cách đa dạng chuẩn văn hóa</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Smartphone className="w-4 h-4 text-pink-400" />
              <span>Tương thích hoàn hảo mọi điện thoại</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. TEMPLATES SHOWCASE (10 MASTER STYLES WITH FILTER) */}
      <section id="templates" className="py-20 px-4 max-w-7xl mx-auto border-t border-stone-800">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-wedding-gold uppercase tracking-[0.25em]">
            BỘ SƯU TẬP 10 PHONG CÁCH CƯỚI ĐỘC BẢN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Chọn Phong Cách & Bắt Đầu Sáng Tạo
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm">
            Mỗi phong cách được thiết kế tỉ mỉ từ màu sắc, font chữ, con dấu sáp và âm nhạc hòa tấu tương ứng.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 border ${
                  isSelected
                    ? 'bg-wedding-burgundy text-white border-wedding-gold/70 shadow-luxury'
                    : 'bg-stone-900/80 text-stone-400 hover:text-white border-stone-800 hover:border-stone-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/40 text-amber-200' : 'bg-stone-800 text-stone-400'
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
              className="bg-stone-900/90 rounded-3xl border border-stone-800 hover:border-wedding-gold/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                {/* Image Banner */}
                <div className="h-48 relative overflow-hidden bg-stone-950">
                  <img
                    src={item.heroImage}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/75 backdrop-blur-md text-amber-200 border border-wedding-gold/40 shadow-sm flex items-center space-x-1">
                      <span>{item.icon}</span>
                      <span>{item.categoryLabel}</span>
                    </span>
                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-wedding-burgundy text-white border border-wedding-gold/60 shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Color Palette Dots */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-stone-700">
                    {item.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/40 shadow-sm inline-block"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-wedding-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-wedding-gold font-semibold">{item.subtitle}</p>
                  </div>

                  <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                    <span className="italic truncate pr-2">"{item.tagline}"</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 space-y-2">
                <a
                  href={`/studio?template=${item.id}`}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-wedding-rose-700 to-wedding-burgundy text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Tạo Thiệp Bằng Mẫu Này</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(item)}
                    className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-semibold text-[11px] transition-colors cursor-pointer text-center"
                  >
                    Xem Nhanh Mẫu
                  </button>
                  <a
                    href={`/?w=${item.presetKey}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 rounded-lg bg-stone-800/60 hover:bg-stone-700 text-stone-300 hover:text-wedding-gold font-semibold text-[11px] transition-colors text-center flex items-center justify-center space-x-1"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#141211] border-2 border-wedding-gold/60 rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
            {/* Modal Header */}
            <div className="h-16 px-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{previewTemplate.icon}</span>
                <div>
                  <h4 className="font-serif text-base font-bold text-white">
                    {previewTemplate.name}
                  </h4>
                  <p className="text-[11px] text-wedding-gold">{previewTemplate.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={`/studio?template=${previewTemplate.id}`}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-wedding-rose-700 to-wedding-burgundy text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all border border-wedding-gold/50 flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Sử Dụng Mẫu Này Trong Studio</span>
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Iframe Body */}
            <div className="flex-1 bg-stone-950 flex items-center justify-center p-4 overflow-hidden">
              <div className="w-[390px] h-full max-h-[750px] rounded-[40px] border-[10px] border-stone-800 shadow-2xl overflow-hidden relative ring-2 ring-wedding-gold/30">
                <iframe
                  title="Live Template Preview"
                  src={`/?w=${previewTemplate.presetKey}`}
                  className="w-full h-full border-none bg-wedding-cream"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CORE VALUES & PHILOSOPHY */}
      <section id="features" className="py-20 px-4 bg-[#141211] border-y border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-wedding-gold uppercase tracking-[0.25em]">
              TỰ DO THIẾT KẾ CHO DÂU & RỂ
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
              Tại Sao Marrime Khác Biệt?
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Đám cưới chỉ có một lần trong đời, hãy để ngày vui của hai bạn toát lên sự hãnh diện và tôn trọng cao nhất dành cho quan khách.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4 hover:border-wedding-gold/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-wedding-burgundy/20 border border-wedding-gold/40 flex items-center justify-center text-wedding-gold">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Không Rào Cản • Mở Tự Do
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Không bắt buộc đăng ký tài khoản phiền toái. Bạn vào là được thiết kế ngay, tự do tải ảnh cưới, đổi nhạc nền và trải nghiệm toàn bộ tính năng cao cấp không giới hạn.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4 hover:border-wedding-gold/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-wedding-burgundy/20 border border-wedding-gold/40 flex items-center justify-center text-wedding-gold">
                <Send className="w-6 h-6 text-wedding-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Link Đích Danh & Lời Mời Zalo Từng Người
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Dâu rể chỉ cần nhập tên khách (*Bác Ba, Anh Hùng, Bạn Thảo*), hệ thống tự tạo ngay link thiệp mời riêng có khắc chữ đích danh cùng tin nhắn Zalo mẫu trang trọng.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4 hover:border-wedding-gold/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-wedding-burgundy/20 border border-wedding-gold/40 flex items-center justify-center text-wedding-gold">
                <Crown className="w-6 h-6 text-wedding-rose-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Mã Bí Mật Quản Trị Trọn Đời
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Sau khi bấm lưu, bạn nhận ngay một Mã Quản Trị Bí Mật (VD: MAR-6825). Lần tới quay lại Studio, chỉ cần nhập mã là thoải mái cập nhật ảnh, đổi ngày giờ tiệc hoặc xem khách phản hồi RSVP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NỀN TẢNG MỞ & DONATE TÙY TÂM CHO TÁC GIẢ */}
      <section id="free-concept" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-wedding-gold uppercase tracking-[0.25em]">
            TRIẾT LÝ PHI LỢI NHUẬN
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
            Nền Tảng Mở & Donate Cà Phê Tùy Tâm ☕
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm">
            Marrime là nền tảng miễn phí. Nếu thấy thiệp cưới hữu ích cho hôn lễ của mình, bạn có thể gửi tặng một ly cà phê chúc phúc tới tác giả.
          </p>
        </div>

        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border-2 border-wedding-gold/50 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          {/* VietQR Box */}
          <div className="shrink-0 flex flex-col items-center p-4 bg-stone-950 rounded-2xl border border-stone-800 shadow-inner">
            <img
              src={AUTHOR_DONATE_CONFIG.qrImageUrl}
              alt="VietQR Tặng Cà Phê Tác Giả"
              className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-xl bg-white p-2 shadow-md"
            />
            <span className="text-[11px] text-wedding-gold font-bold mt-2">
              Quét mã VietQR chuyển khoản nhanh
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <span className="text-xs font-bold text-wedding-gold uppercase tracking-wider block">
                {AUTHOR_DONATE_CONFIG.title}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                Gửi Tặng Một Ly Cà Phê Chúc Phúc
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                {AUTHOR_DONATE_CONFIG.message}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1.5 text-xs">
              <div className="text-stone-400">
                Ngân hàng: <strong className="text-white">{AUTHOR_DONATE_CONFIG.bankName}</strong>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="text-stone-400">Số tài khoản:</span>
                <span className="text-wedding-gold font-mono font-bold text-sm">
                  {AUTHOR_DONATE_CONFIG.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAuthorBank}
                  className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-300 hover:text-white cursor-pointer transition-colors flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSTK ? 'Đã Chép' : 'Chép STK'}</span>
                </button>
              </div>
              <div className="text-stone-400">
                Chủ tài khoản: <strong className="text-white">{AUTHOR_DONATE_CONFIG.accountHolder}</strong>
              </div>
            </div>

            <p className="text-[11px] text-amber-300/80 italic">
              "Chúc hai bạn trăm năm hạnh phúc, răng long đầu bạc!"
            </p>
          </div>
        </div>
      </section>

      {/* 7. DÂU RỂ LOOKUP / EDIT EXISTING CARD PORTAL */}
      <section id="lookup-portal" className="py-24 px-4 bg-[#141211] border-t border-stone-800">
        <div className="max-w-md mx-auto text-center space-y-6 bg-gradient-to-b from-stone-900 to-[#1A1414] p-8 sm:p-10 rounded-3xl border-2 border-wedding-gold/50 shadow-2xl relative z-10">
          <div className="w-14 h-14 rounded-full bg-wedding-burgundy/20 border-2 border-wedding-gold/60 flex items-center justify-center text-wedding-gold mx-auto shadow-md">
            <KeyRound className="w-7 h-7 text-wedding-gold" />
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Quản Trị & Chỉnh Sửa Thiệp Cưới Đã Tạo
            </h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Nhập Mã Bí Mật Quản Trị (VD: MAR-6825) hoặc tên đường dẫn thiệp cưới của hai bạn để mở Studio và tiếp tục chỉnh sửa.
            </p>
          </div>

          <form onSubmit={handleLookupSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value)}
                placeholder="Nhập mã bí mật (VD: MAR-6825) hoặc slug..."
                className="w-full text-center px-4 py-3.5 rounded-xl border border-stone-700 bg-stone-800 text-white font-mono text-base tracking-wider focus:outline-none focus:border-wedding-gold shadow-inner"
              />
              {lookupError && <p className="text-xs text-rose-400 mt-2">{lookupError}</p>}
            </div>

            <button
              type="submit"
              disabled={isLookingUp}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wedding-rose-700 to-wedding-burgundy text-white font-bold text-sm shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/60 flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-4 h-4 text-amber-200" />
              <span>{isLookingUp ? 'Đang Mở Xưởng Studio...' : 'Mở Xưởng Chỉnh Sửa Thiệp'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-400">
            <span>Hai bạn chưa tạo thiệp cưới?</span>
            <a
              href="/studio"
              className="text-wedding-gold font-bold ml-1.5 hover:underline inline-flex items-center"
            >
              <span>Tự tạo thiệp mới miễn phí ngay</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-12 px-4 bg-stone-950 border-t border-stone-900 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-serif text-sm text-stone-400">
            Marrime • Nền Tảng Thiệp Cưới Điện Tử Mở & Độc Bản Cho Cặp Đôi
          </p>
          <p className="text-[11px] text-stone-600">
            10 Phong cách cưới chuẩn mực • Tự do thiết kế • Hoàn toàn miễn phí
          </p>
          <p className="pt-2">© 2026 Marrime Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
