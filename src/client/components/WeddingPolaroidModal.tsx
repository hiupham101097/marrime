import React, { useState, useEffect } from 'react';
import {
  Camera,
  Download,
  Printer,
  Sparkles,
  X,
  Check,
  Heart,
  Share2,
  RefreshCw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generatePolaroidDataUrl, downloadPolaroidImage } from '../utils/polaroidFrameCanvas';
import { triggerHaptic } from '../utils/soundEffects';

interface WeddingPolaroidModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  groomName: string;
  brideName: string;
  weddingDateFormatted?: string;
  venueName?: string;
  defaultUploader?: string;
  defaultTable?: string;
  defaultCaption?: string;
}

export const WeddingPolaroidModal: React.FC<WeddingPolaroidModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  groomName,
  brideName,
  weddingDateFormatted = '20.11.2026',
  venueName = 'Riverside Palace',
  defaultUploader = '',
  defaultTable = '',
  defaultCaption = '',
}) => {
  if (!isOpen) return null;

  const [caption, setCaption] = useState(defaultCaption);
  const [uploader, setUploader] = useState(defaultUploader);
  const [table, setTable] = useState(defaultTable);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    let active = true;
    setIsRendering(true);

    generatePolaroidDataUrl({
      imageUrl,
      groomName,
      brideName,
      weddingDateFormatted,
      venueName,
      uploaderName: uploader,
      tableNumber: table,
      caption,
    })
      .then((dataUrl) => {
        if (active) {
          setPreviewDataUrl(dataUrl);
          setIsRendering(false);
        }
      })
      .catch((err) => {
        console.error('Failed to generate polaroid:', err);
        if (active) setIsRendering(false);
      });

    return () => {
      active = false;
    };
  }, [imageUrl, groomName, brideName, weddingDateFormatted, venueName, uploader, table, caption]);

  const handleDownload = async () => {
    setIsDownloading(true);
    triggerHaptic([40, 80]);
    try {
      await downloadPolaroidImage({
        imageUrl,
        groomName,
        brideName,
        weddingDateFormatted,
        venueName,
        uploaderName: uploader,
        tableNumber: table,
        caption,
      });

      void confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#DFB76C', '#8B1A32', '#FDE047'],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    if (!previewDataUrl) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>In Ảnh Polaroid Cưới - ${groomName} & ${brideName}</title>
        <style>
          @page { size: auto; margin: 10mm; }
          body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 90vh; background: #fff; }
          img { max-width: 480px; width: 100%; height: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border-radius: 8px; }
        </style>
      </head>
      <body>
        <img src="${previewDataUrl}" />
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border-2 border-[#DFB76C]/60 shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5C0E1F] via-[#8B1A32] to-[#5C0E1F] p-5 text-white flex items-center justify-between border-b border-[#DFB76C]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#DFB76C] text-[#5C0E1F] flex items-center justify-center shadow-md">
              <Camera className="w-5 h-5 text-[#5C0E1F]" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-amber-200 block">
                ATELIER POLAROID FRAME • KHUNG ẢNH KỶ NIỆM
              </span>
              <h3 className="font-serif text-lg font-bold text-amber-50 leading-tight">
                Tạo Ảnh Polaroid Mạ Vàng 1-Chạm
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
          {/* Polaroid Preview */}
          <div className="flex items-center justify-center p-2 bg-stone-900/40 rounded-2xl border border-stone-200/50">
            {isRendering ? (
              <div className="h-72 flex flex-col items-center justify-center space-y-2 text-stone-300">
                <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
                <span className="text-xs font-serif">Đang dát viền vàng Polaroid...</span>
              </div>
            ) : previewDataUrl ? (
              <img
                src={previewDataUrl}
                alt="Khung ảnh Polaroid"
                className="max-h-80 w-auto rounded-lg shadow-xl border border-white/20"
              />
            ) : null}
          </div>

          {/* Quick Customization Inputs */}
          <div className="space-y-2">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Lời Chú Thích Trên Ảnh Polaroid:
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="VD: Bắt trọn nụ cười rạng rỡ của cô dâu lúc bước vào lễ đường!"
                className="w-full px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-[#8B1A32]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-1">
                  Người Chụp:
                </label>
                <input
                  type="text"
                  value={uploader}
                  onChange={(e) => setUploader(e.target.value)}
                  placeholder="Tên của bạn"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-1">
                  Bàn Số:
                </label>
                <input
                  type="text"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  placeholder="VD: 06, VIP 01"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-800"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              disabled={isRendering || isDownloading}
              onClick={handleDownload}
              className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-100 hover:text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md cursor-pointer border border-[#DFB76C]/40 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>{isDownloading ? 'Đang Tải...' : 'Tải Ảnh Về Máy (HD)'}</span>
            </button>

            <button
              type="button"
              disabled={isRendering}
              onClick={handlePrint}
              className="py-3 px-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer transition-all disabled:opacity-50"
            >
              <Printer className="w-4 h-4 text-[#A2682A]" />
              <span>In Ảnh Trực Tiếp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
