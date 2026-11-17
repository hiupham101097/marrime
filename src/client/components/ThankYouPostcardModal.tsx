import React, { useState } from 'react';
import {
  Heart,
  Send,
  Download,
  Copy,
  Check,
  X,
  Sparkles,
  Share2,
  Printer,
  Crown,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerHaptic } from '../utils/soundEffects';

interface ThankYouPostcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
  brideName: string;
  weddingDateFormatted?: string;
  venueName?: string;
  guestName?: string;
  heroImage?: string;
}

export const ThankYouPostcardModal: React.FC<ThankYouPostcardModalProps> = ({
  isOpen,
  onClose,
  groomName,
  brideName,
  weddingDateFormatted = 'Chủ Nhật, 20/11/2026',
  venueName = 'Riverside Palace',
  guestName = '',
  heroImage,
}) => {
  if (!isOpen) return null;

  const [recipientName, setRecipientName] = useState(guestName || 'Quý Khách');
  const [copiedZalo, setCopiedZalo] = useState(false);

  const cleanGroom = groomName || 'Tuấn Anh';
  const cleanBride = brideName || 'Mai Phương';

  const defaultPhoto =
    heroImage ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop';

  const thankYouText =
    `Kính gửi ${recipientName},\n\n` +
    `Ngày vui trọng đại của ${cleanGroom} & ${cleanBride} đã diễn ra trọn vẹn và ngập tràn hạnh phúc. Chúng mình xin được gửi lời cảm ơn sâu sắc và chân thành nhất đến ${recipientName} vì đã dành thời gian quý báu đến tham dự, nâng ly chúc mừng và gửi trao những tình cảm ấm áp nhất đến hai đứa mình.\n\n` +
    `Sự hiện diện và lời chúc phúc của ${recipientName} chính là món quà ý nghĩa nhất mà chúng mình luôn trân quý khắc ghi!\n\n` +
    `Kính chúc ${recipientName} và gia đình luôn dồi dào sức khỏe, an khang thịnh vượng và ngập tràn niềm vui! 💍`;

  const handleCopyZalo = () => {
    navigator.clipboard.writeText(thankYouText);
    setCopiedZalo(true);
    triggerHaptic([40, 60]);
    void confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#DFB76C', '#8B1A32', '#FDE047'],
    });
    setTimeout(() => setCopiedZalo(false), 2500);
  };

  const handlePrintPostcard = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Bưu Thiếp Tri Ân - ${cleanGroom} & ${cleanBride}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@400;600&display=swap');
          @page { size: A5 landscape; margin: 10mm; }
          body {
            margin: 0;
            padding: 20px;
            font-family: 'Playfair Display', serif;
            background: #FAF8F5;
            color: #2D0B14;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 90vh;
          }
          .postcard {
            border: 3px double #DFB76C;
            border-radius: 24px;
            background: #FFFDF9;
            padding: 36px 40px;
            max-width: 620px;
            width: 100%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.06);
            text-align: center;
          }
          .monogram {
            font-size: 26px;
            font-weight: bold;
            color: #8B1A32;
            letter-spacing: 4px;
            margin-bottom: 6px;
          }
          .title {
            font-family: 'Montserrat', sans-serif;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #A2682A;
            font-weight: 600;
            margin-bottom: 20px;
          }
          .photo {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 16px;
            margin-bottom: 20px;
          }
          .message {
            font-size: 14.5px;
            line-height: 1.8;
            color: #3B0E1B;
            font-style: italic;
            text-align: justify;
            white-space: pre-line;
          }
          .signatures {
            margin-top: 24px;
            font-size: 16px;
            font-weight: bold;
            color: #8B1A32;
          }
        </style>
      </head>
      <body>
        <div class="postcard">
          <div class="monogram">${cleanGroom.charAt(0)} & ${cleanBride.charAt(0)}</div>
          <div class="title">BƯU THIẾP TRI ÂN • WEDDING THANK YOU</div>
          <img src="${defaultPhoto}" class="photo" />
          <div class="message">${thankYouText}</div>
          <div class="signatures">${cleanGroom} & ${cleanBride} Đồng Cảm Tạ</div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn select-none">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl border-2 border-[#DFB76C]/60 shadow-[0_20px_70px_rgba(0,0,0,0.5)] overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5C0E1F] via-[#8B1A32] to-[#5C0E1F] p-5 text-white flex items-center justify-between border-b border-[#DFB76C]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DFB76C] to-[#9C7328] text-[#5C0E1F] flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 fill-[#5C0E1F]" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-amber-200 block">
                MARRIME POST-WEDDING • TRI ÂN QUAN KHÁCH
              </span>
              <h3 className="font-serif text-lg font-bold text-amber-50 leading-tight">
                Bưu Thiếp Tri Ân Cá Nhân Hóa Sau Cưới
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Recipient Customizer */}
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider">
              Gửi Tặng Khách Quý (Tên hiển thị trên thiệp):
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="VD: Anh Tuấn, Bác Ba, Bạn Thùy Chi..."
              className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-bold text-stone-900 focus:outline-none focus:border-[#8B1A32]"
            />
          </div>

          {/* Postcard Preview Card */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#DFB76C]/60 shadow-md space-y-3 relative overflow-hidden">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-stone-100">
              <img
                src={defaultPhoto}
                alt="Khoảnh khắc cưới"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <span className="font-serif text-sm font-bold text-amber-100">
                  {cleanGroom} & {cleanBride} • {weddingDateFormatted}
                </span>
              </div>
            </div>

            <blockquote className="font-serif text-xs sm:text-sm text-stone-800 italic leading-relaxed whitespace-pre-line p-3 bg-stone-50/70 rounded-xl border border-stone-100">
              {thankYouText}
            </blockquote>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleCopyZalo}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md cursor-pointer transition-all"
            >
              <Send className="w-3.5 h-3.5 text-blue-200" />
              <span>{copiedZalo ? 'Đã Chép Lời Cảm Ơn!' : 'Chép Tin Nhắn Cảm Ơn Zalo'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintPostcard}
              className="py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#8B1A32] border border-amber-300 text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-[#A2682A]" />
              <span>In Bưu Thiếp Khổ A5 Mạ Vàng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
