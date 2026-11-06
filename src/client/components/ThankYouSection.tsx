import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface ThankYouSectionProps {
  title: string;
  message: string;
  signatures: string;
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({
  title,
  message,
  signatures,
}) => {
  return (
    <section className="py-20 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-wedding-rose-50/70 via-white to-wedding-cream rounded-3xl p-8 sm:p-14 border border-wedding-gold/30 shadow-luxury text-center relative overflow-hidden">
          {/* Top heart ornament */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="w-12 h-px bg-wedding-gold/40" />
            <Heart className="w-5 h-5 text-wedding-rose-500 fill-wedding-rose-500 animate-pulse" />
            <span className="w-12 h-px bg-wedding-gold/40" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-wedding-burgundy font-medium mb-6">
            {title}
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            {message}
          </p>

          <div className="mt-8 pt-6 border-t border-wedding-gold/20">
            <p className="font-handwriting text-2xl sm:text-3xl text-wedding-rose-700 font-bold">
              {signatures}
            </p>
            <p className="text-xs text-stone-500 mt-2">
              Xin chân thành cảm ơn tình cảm thương quý của tất cả mọi người!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

