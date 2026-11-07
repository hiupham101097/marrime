import React, { useState } from 'react';
import { Calendar, MapPin, Heart, X, ZoomIn, Sparkles, Crown, Compass, Feather } from 'lucide-react';
import { TimelineMilestone, WeddingTemplate } from '../../shared/types';

interface TimelineSectionProps {
  milestones: TimelineMilestone[];
  template?: WeddingTemplate;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  milestones,
  template = 'royal',
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section
      id="timeline"
      className={`py-28 px-4 relative ${
        template === 'modern'
          ? 'bg-[#FAF8F5]'
          : template === 'fairytale'
          ? 'bg-gradient-to-b from-[#FFF5F7] via-white to-[#FFF5F7]'
          : template === 'vintage'
          ? 'bg-[#F9F5EC]'
          : 'bg-gradient-to-b from-wedding-cream via-white to-wedding-cream'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-bold mb-3">
            {template === 'fairytale' ? (
              <>
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                <span className="text-pink-600">CÂU CHUYỆN CỦA NẮNG & HOA</span>
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              </>
            ) : template === 'modern' ? (
              <>
                <span className="text-stone-400 font-mono tracking-[0.3em]">03 / OUR TIMELINE</span>
              </>
            ) : template === 'vintage' ? (
              <>
                <Feather className="w-4 h-4 text-[#855B14]" />
                <span className="text-[#855B14] font-serif">NHẬT KÝ HÀNH TRÌNH TÌNH YÊU</span>
                <Feather className="w-4 h-4 text-[#855B14]" />
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-wedding-rose-600 text-wedding-rose-600" />
                <span className="text-wedding-rose-700">KỶ NIỆM ĐONG ĐẦY YÊU THƯƠNG</span>
                <Heart className="w-4 h-4 fill-wedding-rose-600 text-wedding-rose-600" />
              </>
            )}
          </div>

          <h2
            className={`font-serif text-3xl sm:text-5xl font-normal tracking-tight ${
              template === 'vintage'
                ? 'text-[#064E3B]'
                : template === 'modern'
                ? 'text-stone-900'
                : 'text-wedding-burgundy'
            }`}
          >
            {template === 'modern'
              ? 'Milestones'
              : template === 'fairytale'
              ? 'Từng Trang Lưu Bút Nhớ Thương'
              : template === 'vintage'
              ? 'Dấu Ấn Thời Gian'
              : 'Từng Chặng Đường Ta Qua'}
          </h2>

          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Mỗi cột mốc là một minh chứng cho tình yêu bền bỉ, dìu dắt nhau qua giông bão để cùng bước đến ngưỡng cửa hôn nhân
          </p>

          <div
            className={`w-32 h-1 mx-auto mt-4 ${
              template === 'modern'
                ? 'bg-stone-300'
                : template === 'fairytale'
                ? 'bg-pink-300'
                : template === 'vintage'
                ? 'bg-[#855B14]/60'
                : 'bg-gradient-to-r from-transparent via-wedding-gold to-transparent'
            }`}
          />
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Central Vertical Connector */}
          <div
            className={`hidden md:block absolute left-1/2 top-6 bottom-6 w-1 -translate-x-1/2 rounded-full shadow-sm ${
              template === 'modern'
                ? 'bg-stone-200'
                : template === 'fairytale'
                ? 'bg-gradient-to-b from-pink-300 via-rose-400 to-pink-300'
                : template === 'vintage'
                ? 'bg-gradient-to-b from-[#855B14] via-[#064E3B] to-[#855B14]'
                : 'bg-gradient-to-b from-wedding-gold via-wedding-rose-400 to-wedding-gold'
            }`}
          />

          <div className="space-y-20 sm:space-y-28">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div
                    className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 shadow-md items-center justify-center z-10 ${
                      template === 'modern'
                        ? 'bg-white border-stone-300 text-stone-900 font-mono text-xs font-bold'
                        : template === 'fairytale'
                        ? 'bg-pink-500 border-white text-white'
                        : template === 'vintage'
                        ? 'bg-[#064E3B] border-[#855B14] text-[#FFF7CC]'
                        : 'bg-gradient-to-br from-wedding-burgundy to-[#4A1020] border-wedding-gold text-wedding-gold-light'
                    }`}
                  >
                    {template === 'modern' ? (
                      `0${index + 1}`
                    ) : template === 'vintage' ? (
                      <Compass className="w-5 h-5 text-[#C5A059]" />
                    ) : (
                      <Heart className="w-5 h-5 fill-current animate-pulse" />
                    )}
                  </div>

                  {/* Image Card */}
                  <div className="w-full md:w-1/2 px-2 sm:px-8">
                    <div
                      className={`relative group overflow-hidden shadow-lg border-4 transition-all duration-500 ${
                        template === 'modern'
                          ? 'rounded-2xl border-white bg-white hover:shadow-xl'
                          : template === 'fairytale'
                          ? 'rounded-3xl border-white ring-2 ring-pink-200 transform hover:rotate-1'
                          : template === 'vintage'
                          ? 'rounded-2xl border-[#FAF5E9] ring-2 ring-[#855B14]/40'
                          : 'rounded-3xl border-white bg-stone-100 ring-2 ring-wedding-gold/40 hover:scale-[1.02]'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-72 sm:h-88 md:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ${
                          template === 'vintage' ? 'sepia-[0.15]' : ''
                        }`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <button
                          type="button"
                          onClick={() => setSelectedPhoto(item.image)}
                          className="px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-stone-900 flex items-center space-x-2 shadow-lg cursor-pointer hover:bg-stone-50 transition-colors"
                        >
                          <ZoomIn className="w-4 h-4 text-wedding-rose-600" />
                          <span>Phóng to ảnh kỷ niệm</span>
                        </button>
                      </div>

                      <span
                        className={`absolute top-4 left-4 px-3.5 py-1.5 backdrop-blur-md text-xs font-bold rounded-full shadow-md ${
                          template === 'modern'
                            ? 'bg-stone-900/90 text-white font-mono text-[10px]'
                            : template === 'fairytale'
                            ? 'bg-pink-600 text-white'
                            : template === 'vintage'
                            ? 'bg-[#064E3B] text-[#FFF7CC] border border-[#855B14]'
                            : 'bg-stone-900/80 text-wedding-gold-light border border-wedding-gold/50'
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Story Text Card */}
                  <div className="w-full md:w-1/2 px-2 sm:px-8 mt-6 md:mt-0">
                    <div
                      className={`p-7 sm:p-10 shadow-lg border relative ${
                        template === 'modern'
                          ? 'bg-white rounded-2xl border-stone-200'
                          : template === 'fairytale'
                          ? 'bg-[#FFF8F9] rounded-3xl border-pink-200/80'
                          : template === 'vintage'
                          ? 'bg-[#FAF5E9] rounded-3xl border-[#855B14]/40 font-serif'
                          : 'paper-luxury rounded-3xl border-2 border-wedding-gold/30 ornate-box'
                      } ${isEven ? 'md:text-right' : 'md:text-left'}`}
                    >
                      {/* Date Badge */}
                      <div
                        className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 ${
                          template === 'modern'
                            ? 'bg-stone-100 text-stone-700 font-mono text-[11px]'
                            : template === 'fairytale'
                            ? 'bg-pink-100 border border-pink-200 text-pink-700'
                            : template === 'vintage'
                            ? 'bg-[#F2E8D5] border border-[#855B14]/50 text-[#855B14]'
                            : 'bg-wedding-rose-100/80 border border-wedding-rose-300 text-wedding-rose-800'
                        } ${isEven ? 'md:flex-row-reverse md:space-x-reverse' : ''}`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.dateStr}</span>
                      </div>

                      <h3
                        className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
                          template === 'vintage'
                            ? 'text-[#064E3B]'
                            : template === 'modern'
                            ? 'text-stone-900'
                            : 'text-stone-900'
                        }`}
                      >
                        {item.title}
                      </h3>

                      {item.subtitle && (
                        <p
                          className={`text-xs sm:text-sm font-semibold mt-1.5 flex items-center gap-1.5 ${
                            template === 'vintage'
                              ? 'text-[#855B14]'
                              : template === 'modern'
                              ? 'text-stone-500 font-mono text-xs'
                              : 'text-wedding-gold-dark'
                          } ${isEven ? 'md:justify-end justify-start' : 'justify-start'}`}
                        >
                          <MapPin className="w-4 h-4 text-wedding-rose-600 shrink-0" />
                          <span>{item.subtitle}</span>
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-stone-700 mt-5 leading-relaxed font-light">
                        {item.story}
                      </p>

                      <div
                        className={`mt-6 pt-4 border-t flex items-center text-xs text-stone-400 italic ${
                          template === 'modern'
                            ? 'border-stone-100 font-mono text-[10px]'
                            : template === 'vintage'
                            ? 'border-[#855B14]/20 text-[#855B14]/70'
                            : 'border-wedding-gold/20'
                        } ${isEven ? 'md:justify-end justify-start' : 'justify-start'}`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-wedding-gold mr-1" />
                        <span>Khoảnh khắc khắc ghi một đời</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo Preview */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 text-white hover:text-wedding-gold p-2.5 rounded-full bg-white/10 cursor-pointer transition-colors"
            aria-label="Đóng ảnh"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Preview"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl border-2 border-wedding-gold/40"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
