import React, { useState } from 'react';
import { Calendar, MapPin, Heart, X, ZoomIn, Sparkles, Crown } from 'lucide-react';
import { TimelineMilestone } from '../../shared/types';

interface TimelineSectionProps {
  milestones: TimelineMilestone[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ milestones }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section id="timeline" className="py-28 px-4 bg-gradient-to-b from-wedding-cream via-white to-wedding-cream relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center space-x-2 text-wedding-rose-700 text-xs uppercase tracking-[0.25em] font-bold mb-3">
            <Heart className="w-4 h-4 fill-wedding-rose-600 text-wedding-rose-600" />
            <span>KỶ NIỆM ĐONG ĐẦY YÊU THƯƠNG</span>
            <Heart className="w-4 h-4 fill-wedding-rose-600 text-wedding-rose-600" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal tracking-tight">
            Từng Chặng Đường Ta Qua
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Mỗi cột mốc là một minh chứng cho tình yêu bền bỉ, dìu dắt nhau qua giông bão để cùng bước đến ngưỡng cửa hôn nhân
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Central Vertical Golden Ribbon Line */}
          <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-1 bg-gradient-to-b from-wedding-gold via-wedding-rose-400 to-wedding-gold -translate-x-1/2 rounded-full shadow-sm" />

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
                  {/* Central Node Royal Seal Icon */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-wedding-burgundy to-[#4A1020] border-2 border-wedding-gold shadow-luxury items-center justify-center z-10 text-wedding-gold-light">
                    <Heart className="w-5 h-5 fill-wedding-rose-500 text-wedding-rose-500 animate-pulse" />
                  </div>

                  {/* Image Card in Gilded Frame */}
                  <div className="w-full md:w-1/2 px-2 sm:px-8">
                    <div className="relative group overflow-hidden rounded-3xl shadow-luxury border-4 border-white bg-stone-100 ring-2 ring-wedding-gold/40 transform hover:scale-[1.02] transition-all duration-500">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-72 sm:h-88 md:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <button
                          type="button"
                          onClick={() => setSelectedPhoto(item.image)}
                          className="px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-wedding-burgundy flex items-center space-x-2 shadow-lg cursor-pointer hover:bg-wedding-cream transition-colors"
                        >
                          <ZoomIn className="w-4 h-4 text-wedding-rose-600" />
                          <span>Phóng to ảnh kỷ niệm</span>
                        </button>
                      </div>

                      <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-stone-900/80 backdrop-blur-md text-wedding-gold-light text-xs font-bold rounded-full border border-wedding-gold/50 shadow-md">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Story Text Card */}
                  <div className="w-full md:w-1/2 px-2 sm:px-8 mt-6 md:mt-0">
                    <div
                      className={`paper-luxury rounded-3xl p-7 sm:p-10 shadow-luxury border-2 border-wedding-gold/30 relative ornate-box ${
                        isEven ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      {/* Date Badge */}
                      <div
                        className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-wedding-rose-100/80 border border-wedding-rose-300 text-wedding-rose-800 text-xs font-bold mb-4 ${
                          isEven ? 'md:flex-row-reverse md:space-x-reverse' : ''
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.dateStr}</span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                        {item.title}
                      </h3>

                      {item.subtitle && (
                        <p
                          className={`text-xs sm:text-sm text-wedding-gold-dark font-semibold mt-1.5 flex items-center gap-1.5 ${
                            isEven ? 'md:justify-end justify-start' : 'justify-start'
                          }`}
                        >
                          <MapPin className="w-4 h-4 text-wedding-rose-600 shrink-0" />
                          <span>{item.subtitle}</span>
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-stone-700 mt-5 leading-relaxed font-light">
                        {item.story}
                      </p>

                      <div
                        className={`mt-6 pt-4 border-t border-wedding-gold/20 flex items-center text-xs text-stone-400 italic ${
                          isEven ? 'md:justify-end justify-start' : 'justify-start'
                        }`}
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
