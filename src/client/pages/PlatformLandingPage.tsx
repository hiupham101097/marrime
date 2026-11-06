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
} from 'lucide-react';

export const PlatformLandingPage: React.FC = () => {
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleStudioLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setLoginError('Vui lòng nhập mã PIN quản trị của dâu rể.');
      return;
    }

    if (pinInput === '123456') {
      setIsLoggingIn(true);
      window.location.href = '/studio';
    } else {
      setLoginError('Mã PIN không đúng (Mã mặc định dành cho Dâu Rể: 123456)');
    }
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
              Mẫu Thiệp Mời
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="hover:text-wedding-gold transition-colors cursor-pointer"
            >
              Gói Dịch Vụ
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

          {/* Login / Studio Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scrollToSection('login-portal')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-wedding-rose-800 to-wedding-burgundy text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/50 flex items-center space-x-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-wedding-gold-light" />
              <span>Đăng Nhập Dâu Rể</span>
            </button>
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
            <span>NỀN TẢNG THIỆP CƯỚI ĐIỆN TỬ 5 SAO DÀNH CHO DÂU & RỂ</span>
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.15] tracking-tight">
            Tạo Thiệp Cưới Sang Trọng, Đẳng Cấp &{' '}
            <span className="text-gold-luxury font-bold">Kính Mời Đích Danh</span> Từng Vị Khách
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Khác biệt hoàn toàn với thiệp online thông thường: Hiệu ứng mở phong bì 3D chân thực,
            hòa tấu lãng mạn, album ảnh 4K và công cụ sinh link mời riêng cho từng khách mà{' '}
            <strong className="text-wedding-rose-300 font-semibold">
              không vòi tiền, không QR chuyển khoản phản cảm
            </strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => scrollToSection('login-portal')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-wedding-rose-700 via-wedding-burgundy to-[#4A1020] text-white font-bold text-sm shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/60 flex items-center justify-center space-x-2"
            >
              <span>Vào Studio Thiết Kế Của Bạn</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </button>

            <a
              href="/?w=tuan-anh-mai-phuong"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-bold text-sm border border-stone-700 transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <Eye className="w-4 h-4 text-wedding-gold" />
              <span>Xem Thiệp Mẫu Thực Tế</span>
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-medium">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bảo mật danh tính & không quảng cáo</span>
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
                Không QR Chuyển Khoản • Tôn Trọng Quan Khách
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Nhiều web cưới hiện nay chèn mã QR xin tiền đại trà, dễ gây phản cảm hoặc nghi ngờ lừa đảo. Marrime giữ trọn nét thanh lịch truyền thống, tập trung vào lời mời chân thành, tình cảm gia đình và lời chúc phúc.
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
                Hiệu Ứng Phong Bì 3D & Con Dấu Sáp Hoàng Gia
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Mở thiệp như một nghi thức hoàng tộc: nắp phong bì nhung đỏ hoặc nơ lụa mềm mại bật mở cùng âm thanh sột soạt giấy mỹ thuật và tiếng chuông ngân arpeggio lãng mạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TEMPLATES SHOWCASE */}
      <section id="templates" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-wedding-gold uppercase tracking-[0.25em]">
            BỘ SƯU TẬP HOÀNG GIA
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
            4 Phong Cách Thiệp Cưới Độc Bản
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm">
            Tự do chuyển đổi phong cách và form màu chỉ với 1 cú nhấp chuột trong xưởng Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              name: 'Royal Velvet',
              sub: 'Nhung Đỏ Quý Tộc',
              color: '#75142B',
              desc: 'Nhung đỏ burgundy sang trọng, góc viền vàng kim và con dấu sáp vàng hoàng gia.',
              tag: 'Cung Đình Châu Âu',
            },
            {
              name: 'Blush Ribbon',
              sub: 'Hồng Phấn Nơ Lụa',
              color: '#9D174D',
              desc: 'Tông pastel ngọt ngào, dải nơ lụa thắt hoa văn mùa xuân nữ tính và thanh thoát.',
              tag: 'Thơ Mộng Lãng Mạn',
            },
            {
              name: 'Modern Minimal',
              sub: 'Giấy Mỹ Thuật Viền Vàng',
              color: '#E6CF9B',
              desc: 'Mặt giấy ivory vân nổi dập chìm, đường chỉ mạ vàng tinh xảo theo phong cách Bắc Âu.',
              tag: 'Tối Giản Tinh Tế',
            },
            {
              name: 'Emerald Brass',
              sub: 'Ngọc Lục Bảo & Con Dấu Đồng',
              color: '#064E3B',
              desc: 'Xanh lục bảo vương giả kết hợp phụ kiện con dấu đồng cổ điển phong cách quý tộc.',
              tag: 'Vương Giả Cổ Điển',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 flex flex-col justify-between hover:border-wedding-gold/50 transition-all group"
            >
              <div>
                <div className="h-32 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: item.color }}>
                  <div className="w-12 h-12 rounded-full border-2 border-wedding-gold/70 bg-black/20 flex items-center justify-center text-wedding-gold-light font-serif font-bold text-xs shadow-md">
                    A&P
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[9px] bg-black/50 text-white font-semibold">
                    {item.tag}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-white">{item.name}</h4>
                <p className="text-[11px] text-wedding-gold font-semibold">{item.sub}</p>
                <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <a
                href="/?w=tuan-anh-mai-phuong"
                target="_blank"
                rel="noreferrer"
                className="pt-3 border-t border-stone-800 text-[11px] text-wedding-gold font-bold hover:underline flex items-center justify-between"
              >
                <span>Xem trải nghiệm mẫu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRICING & SERVICE PACKAGES */}
      <section id="pricing" className="py-20 px-4 bg-[#141211] border-t border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-wedding-gold uppercase tracking-[0.25em]">
              BẢNG GIÁ DỊCH VỤ
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
              Gói Dịch Vụ Cưới Dành Cho Hai Bạn
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Chi phí 1 lần duy nhất, không phí duy trì hàng tháng. Xuất bản thiệp cưới và gửi link tới khách mời không giới hạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {/* GÓI 1: KHỞI ĐẦU */}
            <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">
                  GÓI TIÊU CHUẨN
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">Silver Romance</h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Dành cho dâu rể muốn có một trang thiệp cưới đơn giản, nhẹ nhàng và thanh lịch.
                </p>

                <div className="mt-5 pt-5 border-t border-stone-800 flex items-baseline space-x-1">
                  <span className="font-serif text-3xl font-bold text-white">199.000đ</span>
                  <span className="text-xs text-stone-500">/ trọn gói hôn lễ</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-stone-300">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Thiệp cưới điện tử đầy đủ thông tin</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Nhạc nền đám cưới hòa tấu</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Đồng hồ đếm ngược & Bản đồ Google Maps</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Lưu trữ 12 tháng</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => scrollToSection('login-portal')}
                className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Chọn Gói Tiêu Chuẩn
              </button>
            </div>

            {/* GÓI 2: HOÀNG GIA (BEST SELLER) */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-[#2A0812] border-2 border-wedding-gold shadow-luxury flex flex-col justify-between space-y-6 relative scale-100 lg:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-wedding-rose-600 to-wedding-burgundy text-amber-100 text-[11px] font-bold border border-wedding-gold/60 shadow-md uppercase tracking-wider">
                ĐƯỢC CHỌN NHIỀU NHẤT 🔥
              </span>

              <div>
                <span className="text-xs font-bold text-wedding-gold uppercase tracking-widest block">
                  GÓI HOÀNG GIA 5 SAO
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">Royal Luxury Suite</h3>
                <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                  Trải nghiệm hoàn hảo nhất: Hiệu ứng phong bì 3D, âm thanh mở thiệp, chặng đường tình yêu và bộ sinh link đích danh từng khách.
                </p>

                <div className="mt-5 pt-5 border-t border-stone-800 flex items-baseline space-x-1">
                  <span className="font-serif text-4xl font-bold text-gold-luxury">399.000đ</span>
                  <span className="text-xs text-stone-400">/ vĩnh viễn</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-stone-200">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-wedding-gold shrink-0" />
                    <span className="font-semibold text-white">Hiệu ứng mở phong bì 3D + Con dấu sáp hoàng gia</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-wedding-gold shrink-0" />
                    <span>Tùy chọn 4 phong cách bìa & 6 form màu nghệ thuật</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-wedding-gold shrink-0" />
                    <span>Album ảnh 4K & Timeline chặng đường tình yêu</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-wedding-gold shrink-0" />
                    <span className="font-semibold text-wedding-gold">Công cụ tạo link mời đích danh từng khách (Zalo/SMS)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-wedding-gold shrink-0" />
                    <span>Sổ lưu bút chúc phúc & Quản lý khách RSVP</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-wedding-gold shrink-0" />
                    <span>Lưu trữ vĩnh viễn kỷ niệm không bao giờ xóa</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => scrollToSection('login-portal')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wedding-rose-700 via-wedding-burgundy to-[#4A1020] text-white font-bold text-xs shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/60"
              >
                Bắt Đầu Tạo Thiệp Hoàng Gia
              </button>
            </div>

            {/* GÓI 3: KIM CƯƠNG ĐẶC QUYỀN */}
            <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">
                  GÓI ĐẶC QUYỀN VIP
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-1">Diamond Grand</h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Dành cho những cặp đôi mong muốn có tên miền riêng theo tên hai bạn và được thiết kế theo yêu cầu đặc biệt.
                </p>

                <div className="mt-5 pt-5 border-t border-stone-800 flex items-baseline space-x-1">
                  <span className="font-serif text-3xl font-bold text-white">699.000đ</span>
                  <span className="text-xs text-stone-500">/ độc quyền</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-stone-300">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tất cả tính năng của gói Hoàng Gia</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-white font-semibold">Tên miền riêng theo tên (VD: tuananhmaiphuong.com)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Chuyên viên hỗ trợ thiết kế ảnh & nội dung 1-1</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Hỗ trợ kỹ thuật VIP 24/7 suốt tuần lễ cưới</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => scrollToSection('login-portal')}
                className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Đăng Ký Gói Đặc Quyền
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DÂU RỂ SIGN-IN / STUDIO ACCESS PORTAL */}
      <section id="login-portal" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-md mx-auto text-center space-y-6 bg-gradient-to-b from-stone-900 to-[#1A1414] p-8 sm:p-10 rounded-3xl border-2 border-wedding-gold/50 shadow-2xl relative z-10">
          <div className="w-14 h-14 rounded-full bg-wedding-burgundy/20 border-2 border-wedding-gold/60 flex items-center justify-center text-wedding-gold mx-auto shadow-md">
            <Lock className="w-7 h-7 text-wedding-gold" />
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Đăng Nhập Xưởng Thiết Kế Của Dâu Rể
            </h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              Nhập mã PIN riêng của hai bạn để mở Studio và bắt đầu cá nhân hóa thiệp cưới.
            </p>
          </div>

          <form onSubmit={handleStudioLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Nhập mã PIN Dâu Rể (Mặc định: 123456)"
                className="w-full text-center px-4 py-3.5 rounded-xl border border-stone-700 bg-stone-800 text-white font-mono text-base tracking-widest focus:outline-none focus:border-wedding-gold shadow-inner"
              />
              {loginError && <p className="text-xs text-rose-400 mt-2">{loginError}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wedding-rose-700 to-wedding-burgundy text-white font-bold text-sm shadow-luxury hover:opacity-95 transition-all cursor-pointer border border-wedding-gold/60 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isLoggingIn ? 'Đang Mở Studio...' : 'Vào Xưởng Studio Thiết Kế'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-stone-800 text-[11px] text-stone-400">
            <span>Hai bạn muốn xem thiệp cưới mẫu thực tế trước?</span>
            <a
              href="/?w=tuan-anh-mai-phuong"
              target="_blank"
              rel="noreferrer"
              className="text-wedding-gold font-bold ml-1.5 hover:underline inline-flex items-center"
            >
              <span>Xem thiệp mẫu tại đây</span>
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
            Cam kết bảo mật thông tin gia đình • Không có quảng cáo rác • Không xin tiền/QR chuyển khoản phản cảm
          </p>
          <p className="pt-2">© 2026 Marrime Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

