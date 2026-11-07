import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Clock, ChevronDown, Sparkles, Crown, Feather } from 'lucide-react';
import { WeddingTemplate } from '../../shared/types';

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  weddingDateIso: string;
  weddingDateFormatted: string;
  onExploreClick: () => void;
  onRsvpClick: () => void;
  heroImage?: string;
  template?: WeddingTemplate;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  groomName,
  brideName,
  weddingDateIso,
  weddingDateFormatted,
  onExploreClick,
  onRsvpClick,
  heroImage = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
  template = 'royal',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(weddingDateIso).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [weddingDateIso]);

  return (
    <section className="relative min-h-[96vh] flex items-center justify-center text-center overflow-hidden bg-wedding-cream">
      {/* Background Hero Image with prestige cinematic color grading */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Wedding Ceremony"
          className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.1]"
        />
        <div
          className={`absolute inset-0 ${
            template === 'traditional'
              ? 'bg-gradient-to-b from-stone-950/85 via-[#8B111A]/60 to-[#FFFBF0]/90'
              : template === 'indochine'
              ? 'bg-gradient-to-b from-stone-950/85 via-[#1B382B]/60 to-[#F5F0E6]/90'
              : template === 'rustic'
              ? 'bg-gradient-to-b from-stone-950/80 via-[#4A5D4E]/60 to-[#FDFBF7]/90'
              : template === 'editorial'
              ? 'bg-gradient-to-b from-black/90 via-stone-900/75 to-stone-950/95'
              : template === 'korean'
              ? 'bg-gradient-to-b from-stone-950/75 via-[#F472B6]/40 to-[#FFF5F5]/90'
              : template === 'celestial'
              ? 'bg-gradient-to-b from-black/90 via-[#090D1A]/85 to-[#0F172A]/95'
              : template === 'fairytale'
              ? 'bg-gradient-to-b from-stone-950/75 via-[#831843]/45 to-pink-50/90'
              : template === 'modern'
              ? 'bg-gradient-to-b from-stone-950/80 via-stone-900/60 to-[#FAF8F5]'
              : template === 'vintage'
              ? 'bg-gradient-to-b from-stone-950/80 via-[#064E3B]/60 to-[#FAF5E9]'
              : 'bg-gradient-to-b from-stone-950/75 via-[#4a1020]/50 to-wedding-cream'
          }`}
        />
      </div>

      {/* Floating Sparkles & Soft Lights */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-white">
        {/* Prestige Subtitle Ribbon */}
        <div className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-stone-900/70 backdrop-blur-md border border-wedding-gold/60 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-6 shadow-luxury">
          <Sparkles className="w-4 h-4 text-wedding-gold animate-spin" style={{ animationDuration: '5s' }} />
          <span className="text-wedding-gold-light">
            {template === 'traditional'
              ? 'LỄ THÀNH HÔN • TRĂM NĂM HẠNH PHÚC'
              : template === 'indochine'
              ? 'MỐI LƯƠNG DUYÊN ĐÔNG DƯƠNG DI SẢN'
              : template === 'rustic'
              ? 'LOVE IN FULL BLOOM • OUTDOOR CELEBRATION'
              : template === 'editorial'
              ? 'THE WEDDING EDIT • SPECIAL ISSUE'
              : template === 'korean'
              ? 'SWEET ROMANCE • FOREVER & ALWAYS'
              : template === 'celestial'
              ? 'WRITTEN IN THE STARS • MOONLIGHT GALA'
              : 'HÔN LỄ TRỌNG THỂ • SAVE OUR DATE'}
          </span>
          <Sparkles className="w-4 h-4 text-wedding-gold animate-spin" style={{ animationDuration: '5s' }} />
        </div>

        {/* Distinct Emblem for each Template */}
        <div className="flex justify-center mb-6">
          {template === 'traditional' ? (
            <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#8B111A] to-[#5B060D] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-3xl font-serif font-bold shadow-luxury gold-glow">
              囍
            </div>
          ) : template === 'celestial' ? (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E293B] to-[#090D1A] border-2 border-slate-300 flex items-center justify-center text-amber-200 text-3xl shadow-luxury">
              🌙
            </div>
          ) : template === 'rustic' ? (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#38473B] to-[#2C382F] border-2 border-amber-200/60 flex items-center justify-center text-emerald-200 text-3xl shadow-luxury">
              🌿
            </div>
          ) : template === 'editorial' ? (
            <div className="px-5 py-2 border-2 border-white text-white font-mono text-xs tracking-[0.4em] uppercase bg-black/60 backdrop-blur-md">
              ISSUE NO. 01
            </div>
          ) : template === 'indochine' ? (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14281E] to-[#0F1F17] border-2 border-[#C5A059] flex items-center justify-center text-[#C5A059] text-2xl shadow-luxury">
              🏛️
            </div>
          ) : (
            <div className="rings-halo relative flex items-center justify-center">
              <svg
                className="w-16 h-12 text-wedding-gold filter drop-shadow-md"
                viewBox="0 0 100 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ring 1 */}
                <circle cx="38" cy="30" r="22" stroke="url(#goldGrad)" strokeWidth="4.5" />
                {/* Diamond */}
                <polygon points="38,2 44,8 38,14 32,8" fill="#FFF7CC" />
                {/* Ring 2 */}
                <circle cx="62" cy="30" r="22" stroke="url(#goldGrad)" strokeWidth="4.5" />
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="60" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FBF5B7" />
                    <stop offset="0.5" stopColor="#D4AF37" />
                    <stop offset="1" stopColor="#AA771C" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>

        {/* Couple Main Titles */}
        <div className="space-y-2 mb-4">
          <h1
            className={`${
              template === 'modern'
                ? 'font-sans font-light tracking-[0.05em] uppercase'
                : template === 'fairytale'
                ? 'font-serif italic font-normal tracking-wide'
                : 'font-serif font-bold tracking-tight'
            } text-4xl sm:text-6xl md:text-7xl text-white drop-shadow-lg`}
          >
            {groomName}
          </h1>
          <div
            className={`${
              template === 'modern'
                ? 'font-sans text-xl sm:text-2xl text-amber-300 font-light uppercase tracking-[0.3em] my-1'
                : 'font-handwriting text-4xl sm:text-5xl md:text-6xl text-wedding-gold-light my-2'
            }`}
          >
            {template === 'modern' ? 'and' : '&'}
          </div>
          <h1
            className={`${
              template === 'modern'
                ? 'font-sans font-light tracking-[0.05em] uppercase'
                : template === 'fairytale'
                ? 'font-serif italic font-normal tracking-wide'
                : 'font-serif font-bold tracking-tight'
            } text-4xl sm:text-6xl md:text-7xl text-white drop-shadow-lg`}
          >
            {brideName}
          </h1>
        </div>

        {/* Sacred Love & Honor Quote */}
        <p className="text-sm sm:text-lg text-rose-100 font-light italic max-w-2xl mx-auto mt-4 mb-8 tracking-wide drop-shadow leading-relaxed">
          "Hôn nhân là dấu mốc thiêng liêng nhất của một đời người — Nơi tình yêu được đơm hoa kết trái trong niềm hãnh diện, chúc phúc của hai bên gia đình và người thân."
        </p>

        {/* Wedding Date Pill with Metallic Border */}
        <div
          className={`inline-flex items-center space-x-2.5 backdrop-blur-md px-6 py-3 rounded-full border-2 text-xs sm:text-sm font-bold tracking-wider mb-10 shadow-luxury ${
            template === 'traditional'
              ? 'bg-gradient-to-r from-[#8B111A]/95 via-[#5B060D]/95 to-[#8B111A]/95 border-[#D4AF37] text-[#FFFBF0]'
              : template === 'indochine'
              ? 'bg-gradient-to-r from-[#1B382B]/95 via-[#0F1F17]/95 to-[#1B382B]/95 border-[#C5A059] text-[#F5F0E6]'
              : template === 'rustic'
              ? 'bg-gradient-to-r from-[#4A5D4E]/95 via-[#2C382F]/95 to-[#4A5D4E]/95 border-amber-200/80 text-[#FDFBF7]'
              : template === 'editorial'
              ? 'bg-black/90 border-white text-white font-mono uppercase tracking-widest'
              : template === 'celestial'
              ? 'bg-gradient-to-r from-[#090D1A]/95 via-[#1E293B]/95 to-[#090D1A]/95 border-slate-300 text-slate-100'
              : template === 'korean'
              ? 'bg-gradient-to-r from-pink-500/90 via-rose-500/90 to-pink-500/90 border-pink-200 text-white'
              : template === 'fairytale'
              ? 'bg-gradient-to-r from-pink-900/90 via-rose-950/90 to-pink-900/90 border-pink-300/80 text-pink-100'
              : template === 'modern'
              ? 'bg-gradient-to-r from-stone-900/90 via-stone-800/90 to-stone-900/90 border-amber-400/80 text-amber-100 font-sans'
              : template === 'vintage'
              ? 'bg-gradient-to-r from-[#063b2c]/90 via-[#04241A]/90 to-[#063b2c]/90 border-amber-400/80 text-amber-100 font-serif'
              : 'bg-gradient-to-r from-wedding-burgundy/90 via-[#4A1020]/90 to-wedding-burgundy/90 border-wedding-gold/60 text-wedding-gold-light'
          }`}
        >
          <Calendar className="w-4 h-4 text-wedding-gold" />
          <span>{weddingDateFormatted}</span>
        </div>

        {/* Countdown Timer with Gilded Metallic Cards */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-5 max-w-lg mx-auto mb-12">
          {[
            { value: timeLeft.days, label: 'Ngày' },
            { value: timeLeft.hours, label: 'Giờ' },
            { value: timeLeft.minutes, label: 'Phút' },
            { value: timeLeft.seconds, label: 'Giây' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`backdrop-blur-md border-2 rounded-2xl p-3.5 sm:p-5 text-center shadow-luxury transform hover:scale-105 transition-transform ${
                template === 'traditional'
                  ? 'bg-[#8B111A]/80 border-[#D4AF37]/80 text-[#FFFBF0]'
                  : template === 'editorial'
                  ? 'bg-black/90 border-stone-600 text-white'
                  : template === 'indochine'
                  ? 'bg-[#1B382B]/80 border-[#C5A059]/80 text-[#F5F0E6]'
                  : template === 'rustic'
                  ? 'bg-[#4A5D4E]/80 border-amber-200/60 text-[#FDFBF7]'
                  : template === 'celestial'
                  ? 'bg-[#090D1A]/90 border-slate-400/60 text-amber-200'
                  : 'bg-stone-950/70 border-wedding-gold/50'
              }`}
            >
              <span className="block font-serif text-2xl sm:text-4xl font-extrabold text-wedding-gold-light drop-shadow">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-200 uppercase tracking-widest font-semibold mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExploreClick}
            className="px-7 py-3.5 rounded-full bg-white text-stone-900 font-bold text-xs sm:text-sm shadow-xl hover:bg-stone-50 transition-all transform hover:-translate-y-1 cursor-pointer border border-stone-300"
          >
            Khám Phá Hành Trình
          </button>
          <button
            type="button"
            onClick={onRsvpClick}
            className={`px-7 py-3.5 rounded-full text-white font-bold text-xs sm:text-sm border-2 backdrop-blur-md shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer ${
              template === 'traditional'
                ? 'bg-gradient-to-r from-[#8B111A] to-[#B91C1C] border-[#D4AF37] hover:shadow-red-900/50'
                : template === 'indochine'
                ? 'bg-gradient-to-r from-[#1B382B] to-[#14281E] border-[#C5A059]'
                : template === 'rustic'
                ? 'bg-gradient-to-r from-[#4A5D4E] to-[#B85D43] border-amber-200'
                : template === 'editorial'
                ? 'bg-white text-black font-mono uppercase tracking-widest hover:bg-stone-200 border-none'
                : template === 'celestial'
                ? 'bg-gradient-to-r from-[#1E293B] to-[#090D1A] border-slate-300 text-amber-200'
                : template === 'korean'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 border-pink-200'
                : template === 'fairytale'
                ? 'bg-gradient-to-r from-pink-600 to-rose-700 border-pink-300 hover:shadow-pink-500/30'
                : template === 'modern'
                ? 'bg-stone-900 hover:bg-stone-800 border-amber-300/80 hover:shadow-amber-500/20 font-sans tracking-wider uppercase'
                : template === 'vintage'
                ? 'bg-gradient-to-r from-[#064E3B] to-[#022C22] border-amber-400 hover:shadow-emerald-950/40'
                : 'bg-gradient-to-r from-wedding-rose-700 to-wedding-burgundy border-wedding-gold/60 hover:shadow-glow'
            }`}
          >
            Xác Nhận Tham Dự
          </button>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-14 flex justify-center animate-bounce">
          <button
            type="button"
            onClick={onExploreClick}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Cuộn xuống xem tiếp"
          >
            <ChevronDown className="w-7 h-7 text-wedding-gold-light" />
          </button>
        </div>
      </div>
    </section>
  );
};
