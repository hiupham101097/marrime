import React from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}) => {
  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center bg-white/90 backdrop-blur-md border border-wedding-gold/40 shadow-luxury rounded-full p-1.5 pr-4 space-x-3 transition-all hover:shadow-glow">
      {/* Vinyl Disc Animation */}
      <button
        type="button"
        onClick={onTogglePlay}
        className={`relative w-10 h-10 rounded-full bg-stone-900 border-2 border-wedding-gold flex items-center justify-center text-wedding-gold-light cursor-pointer shadow-md overflow-hidden ${
          isPlaying ? 'animate-spin' : ''
        }`}
        style={{ animationDuration: '6s' }}
        title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc cưới'}
      >
        <Music className="w-4 h-4 text-wedding-gold-light" />
        <span className="absolute w-2 h-2 rounded-full bg-white border border-stone-800" />
      </button>

      {/* Info & Equalizer */}
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[11px] font-semibold text-stone-800 tracking-tight leading-none">
          Canon in D (Acoustic)
        </span>
        <span className="text-[9px] text-wedding-rose-600 font-medium leading-tight mt-0.5">
          {isPlaying ? 'Đang phát nhạc cưới' : 'Nhấp để bật nhạc'}
        </span>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={onTogglePlay}
          className="p-1.5 text-stone-700 hover:text-wedding-rose-600 transition-colors cursor-pointer"
          aria-label={isPlaying ? 'Dừng' : 'Phát'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={onToggleMute}
          className="p-1.5 text-stone-700 hover:text-wedding-rose-600 transition-colors cursor-pointer"
          aria-label={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Soundwaves bars animation */}
      {isPlaying && !isMuted && (
        <div className="hidden sm:flex items-end space-x-0.5 h-3.5">
          <span className="w-0.5 h-2 bg-wedding-rose-500 rounded-full animate-pulse" />
          <span className="w-0.5 h-3.5 bg-wedding-rose-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <span className="w-0.5 h-1.5 bg-wedding-rose-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      )}
    </div>
  );
};

