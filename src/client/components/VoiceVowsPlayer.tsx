import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Heart, Mic } from 'lucide-react';
import { CoupleMember } from '../../shared/types';

interface VoiceVowsPlayerProps {
  groom: CoupleMember;
  bride: CoupleMember;
  audioUrl?: string;
  quote?: string;
}

export const VoiceVowsPlayer: React.FC<VoiceVowsPlayerProps> = ({
  groom,
  bride,
  audioUrl,
  quote = '“Cảm ơn bạn đã luôn là một phần ý nghĩa trong hành trình thanh xuân của chúng mình. Ngày hôm nay, được nắm tay nhau bước vào lễ đường trong sự hiện diện của bạn là niềm hạnh phúc lớn lao nhất.”',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 42; // 42 seconds romantic speech duration
  const timerRef = useRef<number | null>(null);

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // 28 animated waveform bars
  const waveformHeights = [
    25, 45, 70, 30, 85, 95, 60, 40, 80, 100, 75, 50, 90, 65, 35, 75, 90, 55, 30, 85, 95, 70, 45, 80, 60, 35, 20, 15,
  ];

  const progressPercent = Math.min(100, (currentTime / totalDuration) * 100);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-stone-50 via-white to-stone-50 relative overflow-hidden">
      {/* Background soft ambient glowing light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-rose-200/40 to-amber-200/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="p-6 sm:p-9 rounded-3xl bg-white border border-stone-200/80 shadow-luxury space-y-6">
          {/* Header Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[#8B1A32]">
                <Mic size={15} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#A2682A] uppercase tracking-widest block">
                  Audio Note · Lời Thì Thầm Của Đôi Lứa
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                  Gửi Riêng Tới Quý Quan Khách
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 shadow-2xs">
                <Sparkles size={11} className="text-amber-500" />
                <span>Bản thu độc bản</span>
              </span>
            </div>
          </div>

          {/* Quote text */}
          <p className="font-serif text-sm sm:text-base text-stone-700 italic leading-relaxed text-center px-2 sm:px-6">
            {quote}
          </p>

          {/* Modern Interactive Spotify/Instagram-style Audio Waveform Player */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white shadow-md space-y-4">
            <div className="flex items-center space-x-4">
              {/* Play / Pause Circular Button */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#DFB76C] to-[#9C7328] hover:scale-105 active:scale-95 text-stone-950 flex items-center justify-center shrink-0 shadow-lg transition-transform cursor-pointer"
                aria-label={isPlaying ? 'Tạm dừng nghe lời thì thầm' : 'Phát lời thì thầm'}
              >
                {isPlaying ? (
                  <Pause size={22} className="fill-stone-950" />
                ) : (
                  <Play size={22} className="fill-stone-950 ml-1" />
                )}
              </button>

              {/* Dynamic Waveform Visualizer */}
              <div className="flex-1 space-y-2">
                <div className="flex items-end justify-between h-10 gap-0.5 sm:gap-1 px-1">
                  {waveformHeights.map((h, i) => {
                    const barProgress = (i / waveformHeights.length) * 100;
                    const isPassed = barProgress <= progressPercent;

                    return (
                      <span
                        key={i}
                        className={`w-full rounded-full transition-all duration-150 ${
                          isPassed ? 'bg-[#DFB76C]' : 'bg-stone-700'
                        }`}
                        style={{
                          height: isPlaying
                            ? `${Math.max(15, Math.round(h * (0.6 + Math.random() * 0.4)))}%`
                            : `${h}%`,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Scrubber & Time */}
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-sans">
                    {isPlaying ? 'Đang phát lời nhắn…' : 'Chạm để lắng nghe'}
                  </span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
              </div>

              {/* Mute button */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-xl text-stone-400 hover:text-white transition-colors cursor-pointer shrink-0"
                title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>

          {/* Couple signatures */}
          <div className="flex items-center justify-center space-x-3 pt-1 text-xs text-stone-500">
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span className="font-serif font-bold text-stone-800">
              {groom.shortName || groom.name} &amp; {bride.shortName || bride.name}
            </span>
            <span className="text-stone-300">·</span>
            <span>Trân trọng &amp; Yêu thương</span>
          </div>
        </div>
      </div>
    </section>
  );
};
