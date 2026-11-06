import React from 'react';
import { Heart, Quote, Feather } from 'lucide-react';
import { LoveMessage } from '../../shared/types';

interface LoveMessagesSectionProps {
  messages: LoveMessage[];
}

export const LoveMessagesSection: React.FC<LoveMessagesSectionProps> = ({ messages }) => {
  return (
    <section className="py-20 px-4 bg-wedding-cream relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-wedding-rose-600 text-xs uppercase tracking-widest font-semibold mb-2">
            <Feather className="w-3.5 h-3.5" />
            <span>Lời Nhắn Nhủ Yêu Thương</span>
            <Feather className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-wedding-burgundy font-medium">
            Gửi Người Bạn Đời
          </h2>
          <p className="text-stone-600 text-sm mt-3 font-light">
            Những lời thì thầm từ tận đáy lòng trước ngưỡng cửa hôn nhân
          </p>
        </div>

        {/* Letters Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {messages.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-10 shadow-luxury border border-wedding-gold/30 relative flex flex-col justify-between"
            >
              {/* Quote ornament */}
              <div className="absolute top-6 right-6 text-wedding-gold/20">
                <Quote className="w-12 h-12" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-wedding-rose-100/70 text-wedding-burgundy text-xs font-semibold rounded-full mb-4">
                  {item.author}
                </span>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mb-4">
                  {item.recipient}
                </h3>

                {item.quote && (
                  <p className="font-serif italic text-wedding-rose-700 text-sm sm:text-base border-l-2 border-wedding-rose-400 pl-4 py-1 mb-5">
                    {item.quote}
                  </p>
                )}

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-light">
                  {item.content}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-wedding-gold/20 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center space-x-1 text-wedding-rose-600">
                  <Heart className="w-3.5 h-3.5 fill-wedding-rose-500" />
                  <span>Trọn vẹn một tình yêu</span>
                </span>
                <span>{item.dateStr}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

