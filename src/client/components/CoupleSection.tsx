import React from 'react';
import { Heart, Home, Sparkles, Award, Crown } from 'lucide-react';
import { CoupleMember } from '../../shared/types';

interface CoupleSectionProps {
  groom: CoupleMember;
  bride: CoupleMember;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ groom, bride }) => {
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
          {/* Subtle Gilded Corner Flourishes */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-wedding-gold/60 rounded-tl" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-wedding-gold/60 rounded-tr" />

          <div>
            {/* Family Origin Banner */}
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
              {/* Portrait in Gilded Oval / Rounded Frame */}
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
          {/* Subtle Gilded Corner Flourishes */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-wedding-gold/60 rounded-tl" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-wedding-gold/60 rounded-tr" />

          <div>
            {/* Family Origin Banner */}
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
              {/* Portrait in Gilded Oval / Rounded Frame */}
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
