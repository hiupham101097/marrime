import React, { useState } from 'react';
import {
  Palette,
  Clock,
  Sparkles,
  Heart,
  Wine,
  UserCheck,
  CheckCircle2,
  Info,
  ShieldAlert,
  Shirt,
  Sparkle,
} from 'lucide-react';

export const DresscodeEtiquetteSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'palette' | 'ladies' | 'gentlemen' | 'etiquette'>('palette');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const dresscodeColors = [
    {
      name: 'Champagne Gold',
      hex: '#E6CF9B',
      desc: 'Vàng ánh kim quý phái',
      fabric: 'Lụa satin, gấm dệt kim tuyến nhũ',
      pairing: 'Trang sức ngọc trai, đồng hồ vàng, túi clutch ánh kim',
      vibe: 'Sang trọng, lấp lánh dưới ánh đèn dạ tiệc',
    },
    {
      name: 'Rose Gold & Blush',
      hex: '#F5B8C4',
      desc: 'Hồng phấn thạch anh',
      fabric: 'Voan tơ tằm mềm mại, ren thêu tay, lụa chiffon',
      pairing: 'Giày cao gót nude, hoa tai pha lê hồng nhạt',
      vibe: 'Ngọt ngào, dịu dàng và thanh lịch',
    },
    {
      name: 'Ivory & Cream',
      hex: '#FFFDF9',
      border: true,
      desc: 'Trắng kem tao nhã',
      fabric: 'Linen cao cấp, cotton lụa dệt chéo',
      pairing: 'Khăn cài túi áo suit, sơ mi cream phối quần âu',
      vibe: 'Tao nhã, sáng sủa, ấm áp',
    },
    {
      name: 'Burgundy & Wine',
      hex: '#75142B',
      desc: 'Đỏ rượu vang quyền quý',
      fabric: 'Nhung tuyết (velvet), dạ mềm, lụa tơ sống',
      pairing: 'Cà vạt đỏ Bordeaux, son môi nhung đỏ cổ điển',
      vibe: 'Quyến rũ, quyền quý chuẩn hoàng gia châu Âu',
    },
    {
      name: 'Classic Dark Navy',
      hex: '#1E293B',
      desc: 'Xanh Navy lịch lãm',
      fabric: 'Vải wool may đo cao cấp, cashmere mỏng',
      pairing: 'Giày da Oxford nâu cánh gián, thắt lưng da',
      vibe: 'Chững chạc, nam tính và cuốn hút',
    },
  ];

  const programSteps = [
    {
      time: '10:30 SA',
      title: 'Đón Tiếp Quan Khách',
      desc: 'Check-in thiệp mời cá nhân hóa, ký tên lưu bút điện tử & chụp ảnh photobooth cùng dâu rể',
    },
    {
      time: '11:15 SA',
      title: 'Nghi Thức Lễ Thành Hôn',
      desc: 'Đôi uyên ương tiến vào lễ đường, trao nhẫn hẹn ước trăm năm & nhận chúc phúc từ hai họ',
    },
    {
      time: '12:00 CH',
      title: 'Khai Tiệc Mừng Chung Vui',
      desc: 'Thưởng thức yến tiệc 5 sao cùng các tiết mục hòa tấu vĩ cầm và giao lưu thân mật',
    },
    {
      time: '13:30 CH',
      title: 'Lưu Niệm & Cảm Tạ',
      desc: 'Dâu rể cùng hai bên gia đình gửi lời tri ân, chụp ảnh lưu niệm và trao quà cảm ơn',
    },
  ];

  const selectedColor = dresscodeColors[selectedColorIndex] || dresscodeColors[0];

  return (
    <section className="py-24 px-4 bg-wedding-cream relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-wedding-gold-dark text-xs uppercase tracking-[0.25em] font-bold mb-3">
            <Wine className="w-4 h-4 text-wedding-gold" />
            <span>NGHI THỨC &amp; DRESSCODE HOÀNG GIA</span>
            <Wine className="w-4 h-4 text-wedding-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal tracking-tight">
            Trang Phục &amp; Chương Trình Tiệc
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
            Để ngày vui của chúng mình thêm phần lộng lẫy, trang trọng và đồng điệu trong từng khung hình
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </div>

        {/* 1. Interactive Modern Lookbook Showcase */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 shadow-luxury border-2 border-wedding-gold/30 mb-12 ornate-box space-y-6">
          {/* Lookbook Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-stone-200/80 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab('palette')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'palette'
                  ? 'bg-wedding-burgundy text-wedding-gold-light shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Palette size={14} />
              <span>Bảng Màu Gợi Ý</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ladies')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'ladies'
                  ? 'bg-wedding-burgundy text-wedding-gold-light shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Sparkles size={14} />
              <span>Lookbook Nữ</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('gentlemen')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'gentlemen'
                  ? 'bg-wedding-burgundy text-wedding-gold-light shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Shirt size={14} />
              <span>Lookbook Nam</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('etiquette')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'etiquette'
                  ? 'bg-wedding-burgundy text-wedding-gold-light shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Info size={14} />
              <span>Quy Tắc Tinh Tế</span>
            </button>
          </div>

          {/* TAB 1: Palette Swatches with Interactive Moodboard */}
          {activeTab === 'palette' && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-xs sm:text-sm text-stone-600 font-light text-center">
                Chạm vào từng vòng tròn màu bên dưới để xem chi tiết chất liệu và phụ kiện phối hợp ăn ý nhất:
              </p>

              {/* Swatches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-5 text-center">
                {dresscodeColors.map((c, i) => {
                  const isSelected = selectedColorIndex === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedColorIndex(i)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center group relative ${
                        isSelected
                          ? 'border-wedding-burgundy bg-rose-50/50 shadow-md ring-2 ring-wedding-burgundy/20'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110 mb-2 relative flex items-center justify-center ${
                          c.border ? 'border-2 border-stone-300' : ''
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-white text-wedding-burgundy flex items-center justify-center shadow-xs">
                            <CheckCircle2 size={13} />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-bold text-stone-900 block truncate w-full">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{c.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Color Details Moodboard Box */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center gap-5 animate-fadeIn">
                <div
                  className="w-16 h-16 rounded-2xl shrink-0 shadow-inner flex items-center justify-center border border-white"
                  style={{ backgroundColor: selectedColor.hex }}
                >
                  <Sparkle size={20} className="text-white/80" />
                </div>
                <div className="space-y-1.5 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-serif text-base font-bold text-wedding-burgundy">
                      {selectedColor.name}
                    </h4>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold">
                      {selectedColor.vibe}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700">
                    <strong className="text-stone-900 font-bold">Chất liệu gợi ý:</strong>{' '}
                    {selectedColor.fabric}
                  </p>
                  <p className="text-xs text-stone-700">
                    <strong className="text-stone-900 font-bold">Phụ kiện phối kèm:</strong>{' '}
                    {selectedColor.pairing}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Lookbook Nữ */}
          {activeTab === 'ladies' && (
            <div className="grid sm:grid-cols-3 gap-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-rose-50 text-[#8B1A32] text-[10px] font-bold uppercase tracking-wider block w-fit">
                  Phong Cách 1
                </span>
                <h4 className="font-serif text-sm font-bold text-stone-900">Đầm Dạ Hội Lụa Satin</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Thiết kế đầm dài xẻ tà nhẹ hoặc đầm midi ôm eo tôn dáng trong các tông màu Champagne, Hồng phấn hoặc Đỏ rượu vang.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-rose-50 text-[#8B1A32] text-[10px] font-bold uppercase tracking-wider block w-fit">
                  Phong Cách 2
                </span>
                <h4 className="font-serif text-sm font-bold text-stone-900">Váy Xòe Voan Tơ Tằm</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Nhẹ nhàng, bay bổng với chất liệu voan mềm phối ren nhã nhặn, mang lại vẻ đẹp ngọt ngào và thoải mái khi khiêu vũ.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-rose-50 text-[#8B1A32] text-[10px] font-bold uppercase tracking-wider block w-fit">
                  Phong Cách 3
                </span>
                <h4 className="font-serif text-sm font-bold text-stone-900">Áo Dài Cách Tân Hoàng Gia</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Áo dài lụa tơ sống thêu hoa chìm sang trọng, vừa tôn nét duyên truyền thống Việt Nam vừa vô cùng trang nghiêm.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Lookbook Nam */}
          {activeTab === 'gentlemen' && (
            <div className="grid sm:grid-cols-3 gap-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-[10px] font-bold uppercase tracking-wider block w-fit">
                  Phong Cách 1
                </span>
                <h4 className="font-serif text-sm font-bold text-stone-900">Bộ Veston Navy / Than</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Suit may đo cổ điển tông Xanh Navy hoặc Than chì phối cùng áo sơ mi trắng/kem, cà vạt lụa và khăn cài túi áo.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-[10px] font-bold uppercase tracking-wider block w-fit">
                  Phong Cách 2
                </span>
                <h4 className="font-serif text-sm font-bold text-stone-900">Blazer Hiện Đại Phối Quần Tây</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Áo khoác blazer màu be/champagne kết hợp quần âu tối màu và giày da Loafer, phong thái lịch lãm đầy trẻ trung.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-[10px] font-bold uppercase tracking-wider block w-fit">
                  Phong Cách 3
                </span>
                <h4 className="font-serif text-sm font-bold text-stone-900">Sơ Mi Cao Cấp &amp; Quần Âu</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Sơ mi dài tay form slim-fit tông Champagne hoặc Pastel nhẹ, kèm đồng hồ kim loại và thắt lưng da chỉn chu.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Quy Tắc Tinh Tế (Wedding Etiquette) */}
          {activeTab === 'etiquette' && (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start space-x-3">
                <ShieldAlert size={18} className="text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-950">
                    Trang phục màu trắng tinh khôi:
                  </h4>
                  <p className="text-xs text-amber-900 font-light mt-0.5 leading-relaxed">
                    Theo phong tục lễ cưới quốc tế, sắc trắng tinh khiết là màu váy độc quyền của Cô Dâu. Quý khách vui lòng ưu tiên các tông màu Champagne, Hồng pastel, Rượu vang hoặc Xanh Navy.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start space-x-3">
                <Clock size={18} className="text-wedding-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    Thời gian có mặt lý tưởng:
                  </h4>
                  <p className="text-xs text-stone-600 font-light mt-0.5 leading-relaxed">
                    Quý quan khách nên đến trước giờ cử hành hôn lễ 15 - 30 phút để cùng dâu rể chụp ảnh photobooth lưu niệm và ổn định chỗ ngồi tại sảnh tiệc.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start space-x-3">
                <Heart size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    Khoảnh khắc thiêng liêng lúc làm lễ:
                  </h4>
                  <p className="text-xs text-stone-600 font-light mt-0.5 leading-relaxed">
                    Xin vui lòng chuyển điện thoại sang chế độ rung trong khoảng 20 phút cử hành nghi thức lễ thành hôn để cùng chia sẻ trọn vẹn lời thề ước của hai bạn trẻ.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Program Steps */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-luxury border-2 border-wedding-gold/30">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-wedding-burgundy mb-6">
            <Clock className="w-4 h-4 text-wedding-gold" />
            <span>LỊCH TRÌNH TIỆC CƯỚI 5 SAO</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {programSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-wedding-cream/60 rounded-2xl p-5 border border-wedding-gold/25 relative flex items-start space-x-4 hover:border-wedding-gold/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-wedding-burgundy text-wedding-gold-light flex items-center justify-center text-xs font-bold shrink-0 shadow">
                  {idx + 1}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold text-wedding-rose-700">{step.time}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-stone-900 mt-0.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
