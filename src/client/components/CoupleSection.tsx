import React from 'react';
import { Heart, Home, Crown, Sparkles, Compass, Feather } from 'lucide-react';
import { CoupleMember, WeddingTemplate } from '../../shared/types';

interface CoupleSectionProps {
  groom: CoupleMember;
  bride: CoupleMember;
  template?: WeddingTemplate;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({
  groom,
  bride,
  template = 'royal',
}) => {
  // =========================================================================
  // VARIANT 0: TRADITIONAL VIETNAMESE (Song Hỷ 囍 • Áo Dài • Loan Phụng Hòa Minh)
  // =========================================================================
  if (template === 'traditional') {
    return (
      <section className="py-24 px-4 max-w-6xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#8B111A] text-xs uppercase tracking-[0.25em] font-bold mb-3">
            <span className="text-[#D4AF37] font-serif text-lg">囍</span>
            <span>HAI HỌ THÔNG GIA • LOAN PHỤNG HÒA MINH</span>
            <span className="text-[#D4AF37] font-serif text-lg">囍</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#8B111A] font-bold">
            Tân Lang & Tân Nương
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light italic">
            "Duyên thắm tình nồng, trăm năm hòa hợp, đầu bạc răng long"
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {/* Chú rể Traditional */}
          <div className="bg-[#FFFDF7] rounded-3xl p-8 border-2 border-[#D4AF37] shadow-xl relative gold-glow">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <div className="w-40 h-44 rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-2 ring-[#D4AF37]">
                  <img src={groom.avatar} alt={groom.name} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#8B111A] text-[#FFFBF0] text-[11px] font-bold rounded-full shadow border border-[#D4AF37] whitespace-nowrap">
                  Tân Lang • Chú Rể
                </span>
              </div>

              <div className="text-center sm:text-left flex-1">
                <span className="text-[11px] font-bold text-[#8B111A] uppercase tracking-wider block">Đại Diện Nhà Trai</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">{groom.name}</h3>
                <p className="text-xs text-stone-500 mt-1">{groom.title}</p>
                <div className="mt-3 text-xs text-stone-600 space-y-1 border-t border-[#D4AF37]/30 pt-3">
                  <p>Quê quán: <strong className="text-stone-800">{groom.hometown}</strong></p>
                  <p className="text-[11px] text-stone-500">Trưởng nam của ông: <strong>{groom.parents.father}</strong> & bà: <strong>{groom.parents.mother}</strong></p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#8B111A]/5 p-4 rounded-2xl border border-[#D4AF37]/40 relative text-xs sm:text-sm text-stone-700 italic">
              <span className="text-[#8B111A] font-serif font-bold text-base mr-1">“</span>
              {groom.description}
              <span className="text-[#8B111A] font-serif font-bold text-base ml-1">”</span>
            </div>
          </div>

          {/* Cô dâu Traditional */}
          <div className="bg-[#FFFDF7] rounded-3xl p-8 border-2 border-[#D4AF37] shadow-xl relative gold-glow">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <div className="w-40 h-44 rounded-2xl overflow-hidden shadow-lg border-4 border-white ring-2 ring-[#D4AF37]">
                  <img src={bride.avatar} alt={bride.name} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#8B111A] text-[#FFFBF0] text-[11px] font-bold rounded-full shadow border border-[#D4AF37] whitespace-nowrap">
                  Tân Nương • Cô Dâu
                </span>
              </div>

              <div className="text-center sm:text-left flex-1">
                <span className="text-[11px] font-bold text-[#8B111A] uppercase tracking-wider block">Đại Diện Nhà Gái</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">{bride.name}</h3>
                <p className="text-xs text-stone-500 mt-1">{bride.title}</p>
                <div className="mt-3 text-xs text-stone-600 space-y-1 border-t border-[#D4AF37]/30 pt-3">
                  <p>Quê quán: <strong className="text-stone-800">{bride.hometown}</strong></p>
                  <p className="text-[11px] text-stone-500">Ái nữ của ông: <strong>{bride.parents.father}</strong> & bà: <strong>{bride.parents.mother}</strong></p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#8B111A]/5 p-4 rounded-2xl border border-[#D4AF37]/40 relative text-xs sm:text-sm text-stone-700 italic">
              <span className="text-[#8B111A] font-serif font-bold text-base mr-1">“</span>
              {bride.description}
              <span className="text-[#8B111A] font-serif font-bold text-base ml-1">”</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VARIANT 1: FAIRYTALE (Vườn Hoa Cổ Tích - Scrapbook Polaroid & Ribbon)
  // =========================================================================
  if (template === 'fairytale') {
    return (
      <section className="py-24 px-4 max-w-6xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-pink-600 text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
            <span>KHỞI ĐẦU CHUYỆN TÌNH CỔ TÍCH</span>
            <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal">
            Chàng Hoàng Tử & Nàng Thơ
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light italic">
            "Hai nửa mảnh ghép tình cờ tìm thấy nhau giữa triệu người nơi trần thế"
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {/* Chú rể Fairytale - Polaroid Card */}
          <div className="bg-[#FFF8F9] rounded-3xl p-8 border-2 border-pink-200/80 shadow-lg relative transform hover:-rotate-1 transition-all duration-300">
            {/* Washi Tape Deco */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-pink-200/80 backdrop-blur-sm -rotate-2 rounded shadow-sm border-t border-b border-pink-300 flex items-center justify-center">
              <span className="text-[10px] text-pink-800 font-serif font-bold tracking-widest uppercase">Groom • {groom.shortName}</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <div className="w-40 h-44 rounded-2xl overflow-hidden shadow-md border-4 border-white ring-2 ring-pink-200">
                  <img src={groom.avatar} alt={groom.name} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-pink-600 text-white text-[11px] font-bold rounded-full shadow whitespace-nowrap">
                  Chàng Hoàng Tử
                </span>
              </div>

              <div className="text-center sm:text-left flex-1">
                <span className="text-[11px] font-semibold text-pink-600 uppercase tracking-wider block">Nhà Trai</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">{groom.name}</h3>
                <p className="text-xs text-stone-500 mt-1">{groom.title}</p>
                <div className="mt-3 text-xs text-stone-600 space-y-1 border-t border-pink-100 pt-3">
                  <p>Quê quán: <strong className="text-stone-800">{groom.hometown}</strong></p>
                  <p className="text-[11px] text-stone-500">Con ông: <strong>{groom.parents.father}</strong> & bà: <strong>{groom.parents.mother}</strong></p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white/90 p-4 rounded-2xl border border-pink-100 relative text-xs sm:text-sm text-stone-700 italic">
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400 absolute -top-2 left-6" />
              "{groom.description}"
            </div>
          </div>

          {/* Cô dâu Fairytale - Polaroid Card */}
          <div className="bg-[#FFF8F9] rounded-3xl p-8 border-2 border-pink-200/80 shadow-lg relative transform hover:rotate-1 transition-all duration-300">
            {/* Washi Tape Deco */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-pink-200/80 backdrop-blur-sm rotate-2 rounded shadow-sm border-t border-b border-pink-300 flex items-center justify-center">
              <span className="text-[10px] text-pink-800 font-serif font-bold tracking-widest uppercase">Bride • {bride.shortName}</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <div className="w-40 h-44 rounded-2xl overflow-hidden shadow-md border-4 border-white ring-2 ring-pink-200">
                  <img src={bride.avatar} alt={bride.name} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-rose-600 text-white text-[11px] font-bold rounded-full shadow whitespace-nowrap">
                  Nàng Thơ Dịu Dàng
                </span>
              </div>

              <div className="text-center sm:text-left flex-1">
                <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block">Nhà Gái</span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">{bride.name}</h3>
                <p className="text-xs text-stone-500 mt-1">{bride.title}</p>
                <div className="mt-3 text-xs text-stone-600 space-y-1 border-t border-pink-100 pt-3">
                  <p>Quê quán: <strong className="text-stone-800">{bride.hometown}</strong></p>
                  <p className="text-[11px] text-stone-500">Con ông: <strong>{bride.parents.father}</strong> & bà: <strong>{bride.parents.mother}</strong></p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white/90 p-4 rounded-2xl border border-pink-100 relative text-xs sm:text-sm text-stone-700 italic">
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400 absolute -top-2 left-6" />
              "{bride.description}"
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VARIANT 2: MODERN MINIMAL (Tạp Chí Thời Trang - Editorial 50/50 Split)
  // =========================================================================
  if (template === 'modern') {
    return (
      <section className="py-24 px-4 max-w-6xl mx-auto relative">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <div className="inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-2">
            01 / THE PROTAGONISTS
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 font-light tracking-tight">
            Groom & Bride
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-2 font-mono">
            Two souls, one synchronized wavelength
          </p>
          <div className="w-16 h-px bg-stone-300 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Groom Editorial Card */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-80 sm:h-96 relative overflow-hidden bg-stone-100">
              <img src={groom.avatar} alt={groom.name} className="w-full h-full object-cover object-top" />
              <div className="absolute top-4 left-4 bg-black/80 text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded">
                01 • GROOM
              </div>
            </div>
            <div className="p-7 space-y-4">
              <div>
                <h3 className="font-serif text-2xl font-normal text-stone-900">{groom.name}</h3>
                <span className="text-xs font-mono text-stone-500 uppercase tracking-wider block mt-1">{groom.title}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-light">{groom.description}</p>
              <div className="pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500 flex justify-between">
                <span>Origin: {groom.hometown}</span>
                <span>Son of: {groom.parents.father}</span>
              </div>
            </div>
          </div>

          {/* Bride Editorial Card */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-80 sm:h-96 relative overflow-hidden bg-stone-100">
              <img src={bride.avatar} alt={bride.name} className="w-full h-full object-cover object-top" />
              <div className="absolute top-4 left-4 bg-black/80 text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded">
                02 • BRIDE
              </div>
            </div>
            <div className="p-7 space-y-4">
              <div>
                <h3 className="font-serif text-2xl font-normal text-stone-900">{bride.name}</h3>
                <span className="text-xs font-mono text-stone-500 uppercase tracking-wider block mt-1">{bride.title}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-light">{bride.description}</p>
              <div className="pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500 flex justify-between">
                <span>Origin: {bride.hometown}</span>
                <span>Daughter of: {bride.parents.father}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VARIANT 3: VINTAGE (Nhật Ký Cổ Điển - Cameo Oval & Tem Bưu Chính)
  // =========================================================================
  if (template === 'vintage') {
    return (
      <section className="py-24 px-4 max-w-6xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#855B14] text-xs uppercase tracking-[0.25em] font-serif font-bold mb-3">
            <Feather className="w-4 h-4 text-[#855B14]" />
            <span>KỶ VẬT GIA TỘC & BẢO VẬT TRĂM NĂM</span>
            <Feather className="w-4 h-4 text-[#855B14]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#064E3B] font-normal tracking-tight">
            Đôi Uyên Ương Trăm Năm
          </h2>
          <p className="text-stone-700 text-xs sm:text-sm mt-3 font-serif italic">
            Gia quy nền nếp, hai dòng họ kết tình thâm giao chúc phúc đôi lứa vẹn toàn
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#855B14] to-transparent mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {/* Chú Rể Vintage Cameo */}
          <div className="bg-[#FAF5E9] rounded-3xl p-8 border-2 border-[#855B14]/40 shadow-xl relative">
            <div className="absolute top-4 right-4 px-2.5 py-1 border border-[#855B14]/60 rounded text-[9px] uppercase font-mono text-[#855B14]">
              HERITAGE 1926
            </div>
            <div className="text-center pb-4 mb-6 border-b border-[#855B14]/20">
              <span className="font-serif text-xs font-bold text-[#855B14] tracking-widest uppercase">GIA TỘC NHÀ TRAI</span>
              <p className="text-xs text-stone-700 mt-1 font-serif">
                Thân phụ: <strong className="text-stone-900">{groom.parents.father}</strong> • Thân mẫu: <strong className="text-stone-900">{groom.parents.mother}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Cameo Oval Frame */}
              <div className="w-40 h-48 rounded-[50%] overflow-hidden border-4 border-[#855B14] ring-4 ring-[#FAF5E9] shadow-2xl shrink-0">
                <img src={groom.avatar} alt={groom.name} className="w-full h-full object-cover sepia-[0.15]" />
              </div>

              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-2xl font-bold text-[#064E3B]">{groom.name}</h3>
                <span className="text-xs text-[#855B14] font-serif font-bold uppercase tracking-wider block mt-1">Trưởng Nam • {groom.title}</span>
                <p className="text-xs text-stone-700 mt-3 font-serif leading-relaxed">"{groom.description}"</p>
                <p className="text-[11px] text-stone-500 mt-2 font-mono">Quê quán: {groom.hometown}</p>
              </div>
            </div>
          </div>

          {/* Cô Dâu Vintage Cameo */}
          <div className="bg-[#FAF5E9] rounded-3xl p-8 border-2 border-[#855B14]/40 shadow-xl relative">
            <div className="absolute top-4 right-4 px-2.5 py-1 border border-[#855B14]/60 rounded text-[9px] uppercase font-mono text-[#855B14]">
              HERITAGE 1926
            </div>
            <div className="text-center pb-4 mb-6 border-b border-[#855B14]/20">
              <span className="font-serif text-xs font-bold text-[#855B14] tracking-widest uppercase">GIA TỘC NHÀ GÁI</span>
              <p className="text-xs text-stone-700 mt-1 font-serif">
                Thân phụ: <strong className="text-stone-900">{bride.parents.father}</strong> • Thân mẫu: <strong className="text-stone-900">{bride.parents.mother}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Cameo Oval Frame */}
              <div className="w-40 h-48 rounded-[50%] overflow-hidden border-4 border-[#855B14] ring-4 ring-[#FAF5E9] shadow-2xl shrink-0">
                <img src={bride.avatar} alt={bride.name} className="w-full h-full object-cover sepia-[0.15]" />
              </div>

              <div className="text-center sm:text-left flex-1">
                <h3 className="font-serif text-2xl font-bold text-[#064E3B]">{bride.name}</h3>
                <span className="text-xs text-[#855B14] font-serif font-bold uppercase tracking-wider block mt-1">Ái Nữ • {bride.title}</span>
                <p className="text-xs text-stone-700 mt-3 font-serif leading-relaxed">"{bride.description}"</p>
                <p className="text-[11px] text-stone-500 mt-2 font-mono">Quê quán: {bride.hometown}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VARIANT 4: ROYAL (Hoàng Gia Quý Tộc - Viền Vàng Đúc & Vương Miện)
  // =========================================================================
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 text-wedding-gold-dark text-xs uppercase tracking-[0.25em] font-bold mb-3">
          <Crown className="w-4 h-4 text-wedding-gold" />
          <span>HAI HỌ THÔNG GIA TRÂN TRỌNG GIỚI THIỆU</span>
          <Crown className="w-4 h-4 text-wedding-gold" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal">
          Chú Rể & Cô Dâu
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
          Hai gia đình kết tình thông gia, chúc phúc cho đôi trẻ trọn đời gắn bó keo sơn
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
      </div>

      {/* Couple Profiles Grid with Royal Gilded Frames */}
      <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
        {/* Nhà Trai - Chú Rể */}
        <div className="bg-[#FFFDF9] rounded-3xl p-7 sm:p-10 shadow-luxury border-2 border-wedding-gold/40 relative group hover:border-wedding-gold transition-all duration-500 flex flex-col justify-between ornate-box">
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-wedding-gold/60 rounded-tl" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-wedding-gold/60 rounded-tr" />

          <div>
            <div className="text-center pb-5 mb-6 border-b border-wedding-gold/20">
              <span className="text-[11px] font-bold text-wedding-gold-dark tracking-widest uppercase block">
                ĐẠI DIỆN HỌ NHÀ TRAI
              </span>
              <p className="text-xs text-stone-600 mt-1">
                Thân phụ: <strong className="text-stone-900">{groom.parents.father}</strong>
                <span className="mx-2">•</span>
                Thân mẫu: <strong className="text-stone-900">{groom.parents.mother}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-wedding-cream ring-2 ring-wedding-gold/50">
                  <img
                    src={groom.avatar}
                    alt={groom.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-wedding-burgundy to-[#4A1020] text-wedding-gold-light text-xs font-bold rounded-full shadow-lg border border-wedding-gold/50 whitespace-nowrap">
                  Trưởng Nam • {groom.role}
                </span>
              </div>

              <div className="text-center sm:text-left flex-1 mt-4 sm:mt-0">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {groom.name}
                </h3>
                <p className="text-wedding-rose-700 text-xs font-semibold uppercase tracking-wider mt-1">
                  {groom.title}
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                  <p className="flex items-center justify-center sm:justify-start gap-1.5 text-stone-600">
                    <Home className="w-3.5 h-3.5 text-wedding-gold shrink-0" />
                    <span>Quê quán: <strong className="text-stone-800">{groom.hometown}</strong></span>
                  </p>
                  <p className="text-stone-500 italic text-[11px]">
                    "Điềm đạm, vững vàng, là chỗ dựa trọn đời cho người bạn đời."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-wedding-rose-50/70 p-5 rounded-2xl border border-wedding-rose-100 relative">
            <Heart className="w-4 h-4 text-wedding-rose-500 fill-wedding-rose-500 absolute -top-2 left-6" />
            <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
              "{groom.description}"
            </p>
          </div>
        </div>

        {/* Nhà Gái - Cô Dâu */}
        <div className="bg-[#FFFDF9] rounded-3xl p-7 sm:p-10 shadow-luxury border-2 border-wedding-gold/40 relative group hover:border-wedding-gold transition-all duration-500 flex flex-col justify-between ornate-box">
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-wedding-gold/60 rounded-tl" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-wedding-gold/60 rounded-tr" />

          <div>
            <div className="text-center pb-5 mb-6 border-b border-wedding-gold/20">
              <span className="text-[11px] font-bold text-wedding-rose-700 tracking-widest uppercase block">
                ĐẠI DIỆN HỌ NHÀ GÁI
              </span>
              <p className="text-xs text-stone-600 mt-1">
                Thân phụ: <strong className="text-stone-900">{bride.parents.father}</strong>
                <span className="mx-2">•</span>
                Thân mẫu: <strong className="text-stone-900">{bride.parents.mother}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-wedding-cream ring-2 ring-wedding-gold/50">
                  <img
                    src={bride.avatar}
                    alt={bride.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-wedding-rose-700 to-wedding-rose-800 text-wedding-rose-100 text-xs font-bold rounded-full shadow-lg border border-wedding-rose-400 whitespace-nowrap">
                  Ái Nữ • {bride.role}
                </span>
              </div>

              <div className="text-center sm:text-left flex-1 mt-4 sm:mt-0">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {bride.name}
                </h3>
                <p className="text-wedding-rose-700 text-xs font-semibold uppercase tracking-wider mt-1">
                  {bride.title}
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                  <p className="flex items-center justify-center sm:justify-start gap-1.5 text-stone-600">
                    <Home className="w-3.5 h-3.5 text-wedding-gold shrink-0" />
                    <span>Quê quán: <strong className="text-stone-800">{bride.hometown}</strong></span>
                  </p>
                  <p className="text-stone-500 italic text-[11px]">
                    "Dịu dàng, nết na, mang ánh sáng ấm áp sưởi ấm mái ấm tương lai."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-wedding-rose-50/70 p-5 rounded-2xl border border-wedding-rose-100 relative">
            <Heart className="w-4 h-4 text-wedding-rose-500 fill-wedding-rose-500 absolute -top-2 left-6" />
            <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
              "{bride.description}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
