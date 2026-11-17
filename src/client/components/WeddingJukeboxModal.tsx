import React, { useState } from 'react';
import {
  Disc3,
  Music,
  Send,
  X,
  Sparkles,
  Heart,
  CheckCircle2,
  Mic2,
  Radio,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SongRequestItem } from '../../shared/types';
import { triggerHaptic } from '../utils/soundEffects';

interface WeddingJukeboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
  tableNumber?: string;
  onAddSongRequest: (request: SongRequestItem) => void;
  recentRequests?: SongRequestItem[];
}

const PRESET_SONG_SUGGESTIONS = [
  { title: 'Until I Found You', artist: 'Stephen Sanchez' },
  { title: 'Ánh Nắng Của Anh', artist: 'Đức Phúc' },
  { title: 'Perfect', artist: 'Ed Sheeran' },
  { title: 'Qua Đêm Nay', artist: 'Hà Anh Tuấn & Phương Linh' },
  { title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley' },
  { title: 'Cưới Nhau Đi (Yes I Do)', artist: 'Bùi Anh Tuấn & Hiền Hồ' },
  { title: 'A Thousand Years', artist: 'Christina Perri' },
  { title: 'Nơi Này Có Anh', artist: 'Sơn Tùng M-TP' },
];

export const WeddingJukeboxModal: React.FC<WeddingJukeboxModalProps> = ({
  isOpen,
  onClose,
  guestName = '',
  tableNumber = '',
  onAddSongRequest,
  recentRequests = [],
}) => {
  if (!isOpen) return null;

  const [songTitle, setSongTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [dedication, setDedication] = useState('');
  const [senderName, setSenderName] = useState(guestName);
  const [senderTable, setSenderTable] = useState(tableNumber);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!songTitle.trim()) return;

    const newRequest: SongRequestItem = {
      id: 'sr_' + Date.now() + Math.random().toString(36).substring(2, 6),
      songTitle: songTitle.trim(),
      artist: artist.trim() || 'Nhiều nghệ sĩ',
      guestName: senderName.trim() || 'Khách Quý',
      tableNumber: senderTable.trim() || undefined,
      dedicationMessage: dedication.trim() || undefined,
      createdAt: 'Vừa xong',
      status: 'queued',
      votes: 1,
    };

    onAddSongRequest(newRequest);
    setIsSubmitted(true);
    triggerHaptic([30, 60, 30]);

    void confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#DFB76C', '#8B1A32', '#FDE047'],
    });

    setTimeout(() => {
      setIsSubmitted(false);
      setSongTitle('');
      setArtist('');
      setDedication('');
      onClose();
    }, 2400);
  };

  const handlePickPreset = (preset: { title: string; artist: string }) => {
    setSongTitle(preset.title);
    setArtist(preset.artist);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border-2 border-[#DFB76C]/60 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden my-auto">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#5C0E1F] via-[#8B1A32] to-[#5C0E1F] p-5 text-white flex items-center justify-between border-b border-[#DFB76C]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#DFB76C] text-[#5C0E1F] flex items-center justify-center shadow-md animate-spin" style={{ animationDuration: '8s' }}>
              <Disc3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <Radio className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="text-[10px] tracking-widest uppercase font-bold text-amber-200">
                  WEDDING JUKEBOX • BÀI HÁT YÊU THÍCH
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-50 leading-tight">
                Gửi Yêu Cầu Bài Hát Tặng Dâu & Rể
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#8B1A32]">
              Đã Chuyển Yêu Cầu Lên Ban Nhạc & MC!
            </h4>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Bài hát <strong>"{songTitle}"</strong> của bạn đã được đưa vào danh sách phát sóng sảnh tiệc. Hãy cùng lắng nghe trong ít phút nữa nhé!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              Bạn muốn ban nhạc hoặc DJ sảnh tiệc chơi giai điệu nào để chúc mừng ngày vui của hai bạn trẻ? Hãy gửi yêu cầu kèm lời nhắn thương quý ngay dưới đây:
            </p>

            {/* Quick Suggestions Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Gợi ý những ca khúc lãng mạn phổ biến:</span>
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {PRESET_SONG_SUGGESTIONS.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handlePickPreset(preset)}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 hover:bg-amber-100 text-[#8B1A32] border border-amber-200 transition-colors cursor-pointer"
                  >
                    🎵 {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Song Title & Artist Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Tên Bài Hát *
                </label>
                <div className="relative">
                  <Music className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    placeholder="VD: Perfect, Cho Cùng Ngày Sau..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-900 bg-white focus:outline-none focus:border-[#8B1A32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Ca Sĩ / Nghệ Sĩ
                </label>
                <div className="relative">
                  <Mic2 className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="VD: Ed Sheeran, Vũ..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs font-medium text-stone-900 bg-white focus:outline-none focus:border-[#8B1A32]"
                  />
                </div>
              </div>
            </div>

            {/* Dedication Note */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                Lời Nhắn Tặng Dâu Rể Khi Phát Bài Này (Tùy chọn)
              </label>
              <textarea
                rows={2}
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                placeholder="VD: Tặng người anh em thân thương, chúc hai bạn mãi mãi ngọt ngào như lời ca này!"
                className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-white focus:outline-none focus:border-[#8B1A32]"
              />
            </div>

            {/* Sender Identity */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Người Gửi Yêu Cầu
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Tên của bạn"
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Bàn Số
                </label>
                <input
                  type="text"
                  value={senderTable}
                  onChange={(e) => setSenderTable(e.target.value)}
                  placeholder="VD: 06, VIP 01"
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-900 bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-[#8B1A32] via-[#722235] to-[#5C0E1F] text-amber-100 hover:text-white font-serif text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer border border-[#DFB76C]/40"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Gửi Lên Ban Nhạc & Màn Hình LED</span>
              </button>
            </div>

            {/* Recent Requests Preview */}
            {recentRequests.length > 0 && (
              <div className="pt-3 border-t border-stone-200">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Bài hát vừa được khách khác yêu cầu:
                </span>
                <div className="space-y-1.5 max-h-24 overflow-y-auto">
                  {recentRequests.slice(0, 3).map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-white border border-stone-100"
                    >
                      <div className="truncate mr-2">
                        <strong className="text-stone-800">{req.songTitle}</strong>
                        <span className="text-stone-500 text-[11px]"> - {req.artist}</span>
                      </div>
                      <span className="text-[10px] text-amber-700 font-bold shrink-0 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {req.guestName} {req.tableNumber ? `(Bàn ${req.tableNumber})` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
