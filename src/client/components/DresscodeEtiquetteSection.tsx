import React from 'react';
import { Palette, Clock, Sparkles, Check, Heart, Wine } from 'lucide-react';

export const DresscodeEtiquetteSection: React.FC = () => {
  const dresscodeColors = [
    { name: 'Champagne Gold', hex: '#E6CF9B', desc: 'Vàng ánh kim quý phái' },
    { name: 'Rose Gold & Pastel', hex: '#F5B8C4', desc: 'Hồng phấn ngọt ngào' },
    { name: 'Ivory & Pure White', hex: '#FFFDF9', border: true, desc: 'Trắng kem tao nhã' },
    { name: 'Burgundy & Wine', hex: '#75142B', desc: 'Đỏ rượu vang quyền quý' },
    { name: 'Classic Dark Navy', hex: '#1E293B', desc: 'Xanh Navy lịch lãm' },
  ];

  const programSteps = [
    { time: '10:30 SA', title: 'Đón Tiếp Quan Khách', desc: 'Check-in thiệp mời, ký tên sổ lưu bút & chụp ảnh lưu niệm tại Photobooth Hoàng Gia' },
    { time: '11:15 SA', title: 'Nghi Thức Lễ Thành Hôn', desc: 'Đôi uyên ương tiến vào lễ đường, trao nhẫn cưới & nhận lời chúc phúc từ hai họ' },
    { time: '12:00 CH', title: 'Khai Tiệc Mừng Chung Vui', desc: 'Thưởng thức yến tiệc 5 sao cùng các tiết mục hòa tấu vĩ cầm và giao lưu thân mật' },
    { time: '13:30 CH', title: 'Lưu Niệm & Cảm Tạ', desc: 'Dâu rể cùng hai bên gia đình gửi lời tri ân và trao quà lưu niệm tới quý quan khách' },
  ];

  return (
    <section className="py-24 px-4 bg-wedding-cream relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-wedding-gold-dark text-xs uppercase tracking-[0.25em] font-bold mb-3">
            <Wine className="w-4 h-4 text-wedding-gold" />
            <span>NGHI THỨC & DRESSCODE HOÀNG GIA</span>
            <Wine className="w-4 h-4 text-wedding-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal tracking-tight">
            Trang Phục & Chương Trình Tiệc
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
            Để ngày vui của chúng mình thêm phần lộng lẫy, trang trọng và đồng điệu trong từng khung hình
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </div>

        {/* 1. Dresscode Palette Showcase */}
        <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 shadow-luxury border-2 border-wedding-gold/30 mb-12 ornate-box">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-wedding-burgundy mb-2">
            <Palette className="w-4 h-4 text-wedding-gold" />
            <span>BẢNG MÀU TRANG PHỤC GỢI Ý (DRESSCODE)</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mb-8 font-light">
            Quý khách có thể lựa chọn những trang phục lịch thiệp mang các gam màu thanh lịch dưới đây để cùng tạo nên những bức ảnh kỷ niệm tuyệt mỹ nhất:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6 text-center">
            {dresscodeColors.map((c, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110 mb-2.5 relative flex items-center justify-center ${
                    c.border ? 'border-2 border-stone-300' : ''
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs font-bold text-stone-800">{c.name}</span>
                <span className="text-[10px] text-stone-500 mt-0.5">{c.desc}</span>
              </div>
            ))}
          </div>
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
                    <span className="text-xs font-extrabold text-wedding-rose-700">
                      {step.time}
                    </span>
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

