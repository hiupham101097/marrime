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
} from 'lucide-react';

export const PlatformLandingPage: React.FC = () => {
  const [lookupInput, setLookupInput] = useState('');
  const [lookupError, setLookupError] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-100 font-sans selection:bg-wedding-rose-900 selection:text-wedding-gold-light">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
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
                LUXURY WEDDING INVITATIONS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold text-stone-300">
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-wedding-gold transition-colors cursor-pointer"
            >
              Tính Năng Đẳng Cấp
            </button>
            <button
              onClick={() => scrollToSection('templates')}
              className="hover:text-wedding-gold transition-colors cursor-pointer"
            >
              Mẫu Thiệp Cưới
            </button>
            <button
              onClick={() => scrollToSection('free-concept')}
              className="hover:text-wedding-gold transition-colors cursor-pointer"
            >
              Nền Tảng Mở
            </button>
            <a
              href="/?w=tuan-anh-mai-phuong"
              target="_blank"
              rel="noreferrer"
              className="text-wedding-rose-400 hover:text-wedding-rose-300 transition-colors flex items-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem Thiệp Mẫu</span>
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => scrollToSection('lookup-portal')}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white font-semibold text-xs border border-stone-700 transition-colors cursor-pointer items-center space-x-1"
            >
              <KeyRound className="w-3.5 h-3.5 text-wedding-gold" />
              <span>Nhập Mã Sửa Thiệp</span>
            </button>

            <a
              href="/studio"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-wedding-rose-800 to-wedding-burgundy text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/50 flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-wedding-gold-light" />
              <span>Tự Tạo Thiệp Ngay (Miễn Phí)</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-20 pb-28 px-4 overflow-hidden text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-wedding-burgundy/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-wedding-gold/40 text-[11px] font-semibold text-wedding-gold uppercase tracking-[0.2em] shadow-luxury">
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
            <span>NỀN TẢNG THIỆP CƯỚI MỞ • TỰ DO THIẾT KẾ CHO DÂU & RỂ</span>
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.15] tracking-tight">
            Tự Tay Thiết Kế Thiệp Cưới Độc Bản &{' '}
            <span className="text-gold-luxury font-bold">Kính Mời Đích Danh</span> Từng Vị Khách
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Không cần tài khoản hay đăng nhập trước: Tự do chọn 4 phong cách hoàng gia, tùy biến ảnh 4K,
            đổi nhạc hòa tấu và lời hẹn ước. Xuất bản xong nhận ngay{' '}
            <strong className="text-wedding-gold font-semibold">Mã Quản Trị Bí Mật</strong> để quay lại chỉnh sửa bất kỳ lúc nào!
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
              onClick={() => scrollToSection('lookup-portal')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-bold text-sm border border-stone-700 transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-wedding-gold" />
              <span>Đã Có Mã? Nhập Mã Sửa Thiệp</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-medium">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Miễn phí 100% • Không quảng cáo rác</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-wedding-gold" />
              <span>Chuẩn mực văn hóa cưới trang trọng</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Smartphone className="w-4 h-4 text-pink-400" />
              <span>Hoàn hảo trên mọi dòng điện thoại</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES & PHILOSOPHY */}
      <section id="features" className="py-20 px-4 bg-[#141211] border-y border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-wedding-gold uppercase tracking-[0.25em]">
              GIÁ TRỊ KHÁC BIỆT
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
              Tại Sao Dâu Rể Chọn Nền Tảng Marrime?
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Đám cưới chỉ có một lần trong đời, hãy để ngày vui của hai bạn toát lên sự hãnh diện và tôn trọng cao nhất dành cho quan khách.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-7 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4 hover:border-wedding-gold/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-wedding-burgundy/20 border border-wedding-gold/40 flex items-center justify-center text-wedding-gold">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Không Rào Cản • Tạo Thiệp Miễn Phí
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Không bắt buộc đăng ký tài khoản phiền toái. Bạn vào là được thiết kế ngay, tự do tải ảnh cưới, đổi nhạc nền và trải nghiệm toàn bộ tính năng cao cấp không giới hạn.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-7 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4 hover:border-wedding-gold/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-wedding-burgundy/20 border border-wedding-gold/40 flex items-center justify-center text-wedding-gold">
                <Send className="w-6 h-6 text-wedding-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Cấp Link Đích Danh & Lời Mời Zalo Từng Người
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Dâu rể chỉ cần nhập tên khách (*Bác Ba, Anh Hùng, Bạn Thảo*), hệ thống tự tạo ngay link thiệp mời riêng có khắc chữ đích danh cùng tin nhắn Zalo mẫu trang trọng. Bạn chỉ việc bấm 1 click gửi đi!
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-7 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4 hover:border-wedding-gold/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-wedding-burgundy/20 border border-wedding-gold/40 flex items-center justify-center text-wedding-gold">
                <Crown className="w-6 h-6 text-wedding-rose-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">
                Nhận Mã Bí Mật Quản Trị Khi Xuất Bản
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Sau khi bấm lưu, bạn nhận ngay một Mã Quản Trị Bí Mật (VD: MAR-6825). Lần tới quay lại Studio, chỉ cần nhập mã là thoải mái cập nhật ảnh, đổi ngày giờ tiệc hoặc xem khách phản hồi RSVP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEMPLATES SHOWCASE */}
      <section id="templates" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-wedding-gold uppercase tracking-[0.25em]">
            BỘ SƯU TẬP 4 PHONG CÁCH
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
            4 Phong Cách Thiệp Cưới Độc Bản
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm">
            Chọn ngay mẫu ưng ý để mở Studio và bắt đầu cá nhân hóa hôn lễ của hai bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              slug: 'royal_velvet',
              templateId: 'royal',
              name: 'Royal Velvet',
              sub: 'Nhung Đỏ Quý Tộc & Baroque Vàng Kim',
              couple: 'Tuấn Anh & Mai Phương',
              monogram: 'T & P',
              color: 'linear-gradient(135deg, #420A16, #6B172B)',
              music: 'Canon in D (Harp & Piano)',
              desc: 'Nhung đỏ burgundy quý tộc, góc viền vàng kim baroque và con dấu sáp vàng hoàng gia.',
              tag: 'Cung Đình Châu Âu',
              sealBorder: 'border-amber-300',
              sealColor: 'bg-gradient-to-br from-amber-200 to-amber-600 text-amber-950',
            },
            {
              slug: 'blush_ribbon',
              templateId: 'fairytale',
              name: 'Blush Ribbon',
              sub: 'Hồng Phấn Nơ Lụa & Vườn Mẫu Đơn',
              couple: 'Minh Trí & Thảo Nhi',
              monogram: 'T & N',
              color: 'linear-gradient(135deg, #FFF0F5, #F8BBD0)',
              music: 'A Thousand Years (Violin)',
              desc: 'Dải nơ lụa thắt hoa văn mùa xuân, scrapbook polaroid dán băng dính hoa và cánh hoa hồng rơi.',
              tag: 'Nàng Thơ Cổ Tích',
              sealBorder: 'border-pink-300',
              sealColor: 'bg-gradient-to-br from-white to-pink-300 text-pink-900',
            },
            {
              slug: 'modern_minimal',
              templateId: 'modern',
              name: 'Modern Minimal',
              sub: 'Giấy Mỹ Thuật & Viền Chỉ Vàng',
              couple: 'Nhật Nam & Thanh Hằng',
              monogram: 'N • H',
              color: 'linear-gradient(135deg, #FAF8F5, #EFEAE1)',
              music: 'Until I Found You (Strings)',
              desc: 'Tạp chí thời trang 50/50 editorial, typography không chân hiện đại chuẩn Scandinavian.',
              tag: 'Tối Giản Tinh Tế',
              sealBorder: 'border-amber-400',
              sealColor: 'bg-stone-900 text-amber-300',
            },
            {
              slug: 'emerald_brass',
              templateId: 'vintage',
              name: 'Emerald Brass',
              sub: 'Xanh Lục Bảo & Con Dấu Đồng Cổ',
              couple: 'Khắc Huy & Thùy Linh',
              monogram: 'H & L',
              color: 'linear-gradient(135deg, #04241A, #093527)',
              music: 'Beautiful in White (Guitar)',
              desc: 'Xanh lục bảo vương giả, chân dung cameo hình oval và góc ảnh bọc đồng thau hoài niệm.',
              tag: 'Vương Giả Cổ Điển',
              sealBorder: 'border-amber-500',
              sealColor: 'bg-gradient-to-br from-amber-400 to-amber-800 text-amber-950',
            },
          ].map((item) => (
            <div
              key={item.slug}
              className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 flex flex-col justify-between hover:border-wedding-gold/50 transition-all group"
            >
              <div>
                <div
                  className="h-32 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden shadow-inner border border-stone-800"
                  style={{ background: item.color }}
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 ${item.sealBorder} ${item.sealColor} flex items-center justify-center font-serif font-bold text-xs shadow-md`}
                  >
                    {item.monogram}
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] bg-black/60 text-white font-semibold">
                    {item.tag}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-white">{item.name}</h4>
                <p className="text-[11px] text-wedding-gold font-semibold">{item.sub}</p>
                <p className="text-[10px] text-stone-400 mt-1">Dâu Rể: <strong className="text-stone-300">{item.couple}</strong></p>
                <p className="text-[10px] text-stone-500">Nhạc nền: {item.music}</p>
                <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-stone-800 space-y-2">
                <a
                  href={`/studio?template=${item.templateId}`}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-wedding-rose-700 to-wedding-burgundy text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-sm hover:opacity-95 transition-opacity"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Tạo Thiệp Bằng Mẫu Này</span>
                </a>

                <a
                  href={`/?w=${item.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-1.5 text-center text-[11px] text-stone-400 hover:text-wedding-gold transition-colors block"
                >
                  Xem thiệp mẫu khách mời →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NỀN TẢNG MỞ & DONATE TÙY TÂM */}
      <section id="free-concept" className="py-20 px-4 bg-[#141211] border-t border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-wedding-gold uppercase tracking-[0.25em]">
              TRIẾT LÝ NỀN TẢNG
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
              Nền Tảng Thiệp Cưới Mở & Donate Tùy Tâm
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Marrime ra đời với mục tiêu mang đến cho các cặp đôi trải nghiệm thiệp cưới đẹp nhất, văn minh nhất và hoàn toàn không bị rào cản tài chính.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                  BƯỚC 1 • KHÔNG CẦN ĐĂNG KÝ
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">Tự Do Chọn Mẫu & Sáng Tạo</h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Bắt đầu ngay tức thì mà không cần khai báo email hay mật khẩu. Tự do thay đổi ảnh cưới, lời hẹn ước, dòng thời gian và bản đồ sảnh tiệc.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-stone-300">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Thiệp cưới đầy đủ thông tin & đồng hồ đếm ngược</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Kho nhạc cưới hòa tấu lãng mạn</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Xem trước mượt mà trên điện thoại & máy tính</span>
                  </li>
                </ul>
              </div>

              <a
                href="/studio"
                className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-colors cursor-pointer text-center block"
              >
                Vào Studio Thiết Kế
              </a>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-[#2A0812] border-2 border-wedding-gold shadow-luxury flex flex-col justify-between space-y-6 relative scale-100 lg:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-wedding-rose-600 to-wedding-burgundy text-amber-100 text-[11px] font-bold border border-wedding-gold/60 shadow-md uppercase tracking-wider">
                TIỆN LỢI & BẢO MẬT ⭐
              </span>

              <div>
                <span className="text-xs font-bold text-wedding-gold uppercase tracking-widest block">
                  BƯỚC 2 • LƯU & XUẤT BẢN
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">Nhận Mã Bí Mật Quản Trị</h3>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Khi nhấn lưu, hệ thống tự cấp cho hai bạn một Mã Quản Trị Bí Mật (VD: MAR-6825). Lần tới chỉ cần nhập mã này là quay lại chỉnh sửa bất kỳ lúc nào.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-stone-200">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-wedding-gold shrink-0" />
                    <span className="font-semibold text-white">Lưu trữ an toàn trên đám mây</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-wedding-gold shrink-0" />
                    <span className="text-wedding-gold">Cấp công cụ gửi link mời đích danh từng vị khách qua Zalo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-wedding-gold shrink-0" />
                    <span>Thu thập phản hồi RSVP & Sổ lưu bút chúc phúc</span>
                  </li>
                </ul>
              </div>

              <a
                href="/studio"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wedding-rose-700 via-wedding-burgundy to-[#4A1020] text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/60 text-center block"
              >
                Bắt Đầu Tạo Thiệp Miễn Phí
              </a>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">
                  BƯỚC 3 • DONATE TÙY TÂM
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">Ủng Hộ Tác Giả Tùy Tâm</h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Nền tảng phục vụ phi lợi nhuận cho dâu rể. Nếu thấy hài lòng, bạn có thể gửi tặng một ly cà phê chúc phúc tới tác giả để duy trì server.
                </p>

                <ul className="mt-6 space-y-3 text-xs text-stone-300">
                  <li className="flex items-center space-x-2">
                    <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-white font-semibold">Tùy tâm gửi tặng — Không ép buộc</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Không donate vẫn sử dụng trọn đời miễn phí</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Hỗ trợ kỹ thuật tận tình suốt tuần lễ cưới</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => scrollToSection('lookup-portal')}
                className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Nhập Mã Chỉnh Sửa Thiệp Cũ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DÂU RỂ LOOKUP / EDIT EXISTING CARD PORTAL */}
      <section id="lookup-portal" className="py-24 px-4 relative overflow-hidden">
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

      {/* 7. FOOTER */}
      <footer className="py-12 px-4 bg-stone-950 border-t border-stone-900 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-serif text-sm text-stone-400">
            Marrime • Nền Tảng Thiệp Cưới Điện Tử Hoàng Gia & Đẳng Cấp
          </p>
          <p className="text-[11px] text-stone-600">
            Nền tảng mở phi lợi nhuận cho dâu rể • Bảo mật danh tính • Không quảng cáo rác
          </p>
          <p className="pt-2">© 2026 Marrime Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
