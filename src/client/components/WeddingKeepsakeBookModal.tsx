import React, { useState } from 'react';
import {
  BookOpen,
  Printer,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Download,
  Heart,
  Crown,
  Quote,
} from 'lucide-react';
import { WeddingData, WishMessage, GuestDropPhotoItem } from '../../shared/types';
import { triggerHaptic } from '../utils/soundEffects';

interface WeddingKeepsakeBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  weddingData: WeddingData;
  wishes: WishMessage[];
  guestPhotos?: GuestDropPhotoItem[];
}

export const WeddingKeepsakeBookModal: React.FC<WeddingKeepsakeBookModalProps> = ({
  isOpen,
  onClose,
  weddingData,
  wishes,
  guestPhotos = [],
}) => {
  if (!isOpen) return null;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 5;

  const cleanGroom = weddingData.groom.shortName || weddingData.groom.name;
  const cleanBride = weddingData.bride.shortName || weddingData.bride.name;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      triggerHaptic([20]);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      triggerHaptic([20]);
    }
  };

  const handlePrintFullBooklet = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const wishesHtml = wishes
      .slice(0, 8)
      .map(
        (w) => `
        <div style="margin-bottom: 16px; padding: 12px; background: #FAF8F5; border-radius: 12px; border: 1px solid #DFB76C;">
          <strong style="color: #8B1A32; font-size: 14px;">${w.name}</strong> 
          <span style="color: #8C7862; font-size: 11px;">(${w.relationRole || 'Khách Quý'})</span>
          <p style="margin: 6px 0 0 0; font-style: italic; font-size: 13px; color: #3B0E1B;">"${w.content}"</p>
        </div>
      `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Kỷ Yếu Cưới Hoàng Gia - ${cleanGroom} & ${cleanBride}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@400;600&display=swap');
          @page { size: A4 portrait; margin: 15mm; }
          body {
            margin: 0;
            font-family: 'Playfair Display', serif;
            color: #2D0B14;
            background: #FFFDF9;
          }
          .page {
            page-break-after: always;
            padding: 30px;
            box-sizing: border-box;
            border: 2px double #DFB76C;
            border-radius: 20px;
            min-height: 90vh;
            margin-bottom: 20px;
          }
          h1 { text-align: center; color: #8B1A32; font-size: 32px; margin-bottom: 6px; }
          h2 { text-align: center; color: #A2682A; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 24px; font-family: 'Montserrat', sans-serif; }
          .hero-img { width: 100%; height: 360px; object-fit: cover; border-radius: 16px; margin-bottom: 24px; }
          .vows { font-size: 15px; line-height: 1.8; font-style: italic; color: #2B050E; text-align: justify; margin-bottom: 20px; }
          .footer { text-align: center; font-size: 10px; color: #8C7862; text-transform: uppercase; letter-spacing: 2px; margin-top: 30px; font-family: 'Montserrat', sans-serif; }
        </style>
      </head>
      <body>
        <!-- Page 1: Cover -->
        <div class="page">
          <h2>Ấn Phẩm Kỷ Yếu Cưới Hoàng Gia • MARRIME</h2>
          <h1>${cleanGroom} & ${cleanBride}</h1>
          <h2>LỄ THÀNH HÔN • ${weddingData.weddingDateFormatted}</h2>
          <img src="${weddingData.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'}" class="hero-img" />
          <p style="text-align: center; font-size: 16px; font-style: italic; color: #4A1020; max-w: 500px; margin: 0 auto;">
            "${weddingData.thankYouNote.message}"
          </p>
          <div class="footer">${weddingData.events[0]?.venueName || 'Riverside Palace'} • ${weddingData.weddingDateFormatted}</div>
        </div>

        <!-- Page 2: Vows & Love Story -->
        <div class="page">
          <h2>Lời Hẹn Ước Trăm Năm</h2>
          <h1>Trao Nhau Lời Thề Thiêng Liêng</h1>
          ${weddingData.loveStoryMessages.map((v) => `
            <div style="margin-bottom: 24px; padding: 16px; background: #FAF8F5; border-radius: 14px; border: 1px solid #DFB76C;">
              <strong style="color: #8B1A32; font-size: 16px; display: block; margin-bottom: 6px;">${v.author}</strong>
              <div class="vows">"${v.quote || v.content}"</div>
            </div>
          `).join('')}
          <div class="footer">MARRIME ROYAL WEDDING MEMORY CAPSULE</div>
        </div>

        <!-- Page 3: Wishes Wall -->
        <div class="page">
          <h2>Sổ Lưu Bút Trăm Năm</h2>
          <h1>Lời Chúc Phúc Của Hai Bên Gia Đình & Bạn Bè</h1>
          <div style="margin-top: 20px;">
            ${wishesHtml}
          </div>
          <div class="footer">Hạnh Phúc Trọn Đời Bắt Đầu Từ Hôm Nay</div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border-2 border-[#DFB76C]/60 shadow-[0_30px_90px_rgba(0,0,0,0.7)] overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#5C0E1F] via-[#8B1A32] to-[#5C0E1F] p-4 sm:p-5 text-white flex items-center justify-between border-b border-[#DFB76C]/40 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#DFB76C] text-[#5C0E1F] flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-[#5C0E1F]" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-amber-200 block">
                ATELIER KEEPSAKE BOOK • KỶ YẾU HOÀNG GIA
              </span>
              <h3 className="font-serif text-lg font-bold text-amber-50 leading-tight">
                Tạp Chí Cưới Kỷ Niệm ({currentPage} / {totalPages})
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrintFullBooklet}
              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors shadow-xs"
              title="In hoặc tải trọn bộ tạp chí kỷ yếu dạng PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In Cuốn Kỷ Yếu / Lưu PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Magazine Page Viewer */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Page 1: Cover */}
          {currentPage === 1 && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-[#DFB76C] shadow-lg text-center space-y-5 animate-fadeIn">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#A2682A] block">
                MARRIME ATELIER WEDDING KEEPSAKE
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#8B1A32]">
                {cleanGroom} & {cleanBride}
              </h2>

              <span className="text-xs text-stone-500 uppercase tracking-widest font-semibold block">
                LỄ THÀNH HÔN • {weddingData.weddingDateFormatted}
              </span>

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-stone-200 max-w-lg mx-auto shadow-md">
                <img
                  src={weddingData.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'}
                  alt="Bìa Kỷ Yếu"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-serif text-sm italic text-stone-700 max-w-md mx-auto leading-relaxed">
                "{weddingData.thankYouNote.message}"
              </p>
            </div>
          )}

          {/* Page 2: Vows */}
          {currentPage === 2 && (
            <div className="p-8 rounded-3xl bg-white border-2 border-[#DFB76C] shadow-lg space-y-5 animate-fadeIn">
              <div className="text-center space-y-1 border-b border-stone-200 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A2682A]">
                  TRANG 2 • LỜI THỀ NGUYỆN
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#8B1A32]">
                  Lời Hẹn Ước Son Sắt Lễ Đường
                </h3>
              </div>

              <div className="space-y-4">
                {weddingData.loveStoryMessages.map((msg, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-200/80 space-y-1.5">
                    <strong className="text-xs font-bold text-[#8B1A32] block uppercase tracking-wider">
                      {msg.author}
                    </strong>
                    <p className="font-serif text-sm italic text-stone-800 leading-relaxed whitespace-pre-line">
                      "{msg.quote || msg.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page 3: Love Timeline */}
          {currentPage === 3 && (
            <div className="p-8 rounded-3xl bg-white border-2 border-[#DFB76C] shadow-lg space-y-5 animate-fadeIn">
              <div className="text-center space-y-1 border-b border-stone-200 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A2682A]">
                  TRANG 3 • BIÊN NIÊN SỬ TÌNH YÊU
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#8B1A32]">
                  Những Cột Mốc Đáng Nhớ
                </h3>
              </div>

              <div className="space-y-3">
                {weddingData.timeline.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start space-x-3 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[#8B1A32] font-bold text-[10px] shrink-0">
                      {item.year || item.dateStr}
                    </span>
                    <div>
                      <strong className="text-stone-900 block font-serif text-sm">{item.title}</strong>
                      <p className="text-stone-600 mt-0.5">{item.story}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page 4: Wishes Wall */}
          {currentPage === 4 && (
            <div className="p-8 rounded-3xl bg-white border-2 border-[#DFB76C] shadow-lg space-y-5 animate-fadeIn">
              <div className="text-center space-y-1 border-b border-stone-200 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A2682A]">
                  TRANG 4 • SỔ LƯU BÚT TRĂM NĂM
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#8B1A32]">
                  Lời Chúc Phúc Của Người Thân & Bạn Bè
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {wishes.slice(0, 6).map((w) => (
                  <div key={w.id} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-stone-900">{w.name}</strong>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {w.relationRole || 'Khách Quý'}
                      </span>
                    </div>
                    <p className="font-serif italic text-stone-700 leading-relaxed line-clamp-3">
                      "{w.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Page 5: Guest Moments */}
          {currentPage === 5 && (
            <div className="p-8 rounded-3xl bg-white border-2 border-[#DFB76C] shadow-lg space-y-5 animate-fadeIn">
              <div className="text-center space-y-1 border-b border-stone-200 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A2682A]">
                  TRANG 5 • KHOẢNH KHẮC TIỆC CƯỚI
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#8B1A32]">
                  Khoảnh Khắc Qua Ống Kính Quan Khách
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {guestPhotos.slice(0, 6).map((photo) => (
                  <div key={photo.id} className="aspect-square rounded-xl overflow-hidden border border-stone-200 relative group">
                    <img src={photo.url} alt="Guest moment" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[10px] text-white font-serif line-clamp-1">
                        {photo.uploaderName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-stone-700 shrink-0">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
            className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-30 cursor-pointer flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trang Trước</span>
          </button>

          <span className="font-serif text-sm text-[#8B1A32]">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="px-4 py-2 rounded-xl bg-[#8B1A32] hover:bg-[#722235] text-white disabled:opacity-30 cursor-pointer flex items-center space-x-1"
          >
            <span>Trang Sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
