import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Check, X, Camera, Sparkles, FolderOpen, Trash2 } from 'lucide-react';
import { SAMPLE_PHOTO_LIBRARY } from '../../shared/defaultData';

export interface ImageSelectorProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  category?: 'hero' | 'groom' | 'bride' | 'moments';
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
  helperText?: string;
}

/**
 * Client-side lightweight image compressor
 * Ensures images uploaded from iPhones / smartphones (often 10-20MB)
 * are smoothly scaled to ~1200px and converted to clean WebP/JPEG data URLs
 * without crashing memory or slow network payloads.
 */
export const compressImageFile = (file: File, maxWidth = 1200, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  label,
  value,
  onChange,
  category = 'moments',
  aspectRatio = 'square',
  helperText,
}) => {
  const [showLibrary, setShowLibrary] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Retrieve curated photo presets for the category
  const getCategoryPresets = () => {
    switch (category) {
      case 'hero':
        return SAMPLE_PHOTO_LIBRARY.heroBackgrounds;
      case 'groom':
        return SAMPLE_PHOTO_LIBRARY.groomAvatars;
      case 'bride':
        return SAMPLE_PHOTO_LIBRARY.brideAvatars;
      default:
        return (SAMPLE_PHOTO_LIBRARY as any).galleryMoments || SAMPLE_PHOTO_LIBRARY.heroBackgrounds;
    }
  };

  const presets = getCategoryPresets();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploading(true);
    try {
      const dataUrl = await compressImageFile(file);
      onChange(dataUrl);
    } catch {
      // Fallback
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    setIsUploading(true);
    try {
      const dataUrl = await compressImageFile(file);
      onChange(dataUrl);
    } catch {
      // Fallback
    } finally {
      setIsUploading(false);
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-video';
      case 'wide':
        return 'aspect-[21/9]';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return 'aspect-square';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-stone-300">{label}</label>
          {helperText && <span className="text-[10px] text-stone-500">{helperText}</span>}
        </div>
      )}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`relative p-3 rounded-2xl border transition-all ${
          isDragOver
            ? 'border-wedding-gold bg-stone-800/90 ring-2 ring-wedding-gold/40'
            : 'border-stone-800 bg-stone-900/60 hover:border-stone-700'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          {/* Thumbnail preview */}
          <div
            className={`relative ${getAspectClass()} w-24 sm:w-28 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 flex items-center justify-center flex-shrink-0 group shadow-md`}
          >
            {value ? (
              <>
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Đổi ảnh khác từ máy"
                    className="p-1.5 rounded-full bg-white/90 text-stone-900 hover:bg-white cursor-pointer shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange('')}
                    title="Xóa ảnh này"
                    className="p-1.5 rounded-full bg-rose-600/90 text-white hover:bg-rose-600 cursor-pointer shadow-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full flex flex-col items-center justify-center p-2 text-stone-500 hover:text-wedding-gold cursor-pointer transition-colors"
              >
                <Camera className="w-6 h-6 mb-1 opacity-70" />
                <span className="text-[9px] font-semibold text-center leading-tight">Chưa có ảnh</span>
              </div>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-wedding-gold text-xs font-bold">
                <span className="animate-pulse">Đang nạp...</span>
              </div>
            )}
          </div>

          {/* Action buttons (No raw URL typing required!) */}
          <div className="flex-1 space-y-2 w-full text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {/* Button 1: Upload from device */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-wedding-rose-800 to-wedding-burgundy hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5 cursor-pointer border border-wedding-gold/40"
              >
                <Upload className="w-3.5 h-3.5 text-amber-300" />
                <span>{value ? 'Tải Ảnh Mới Từ Máy' : 'Tải Ảnh Từ Điện Thoại / Máy'}</span>
              </button>

              {/* Button 2: Choose from curated studio samples */}
              <button
                type="button"
                onClick={() => setShowLibrary(!showLibrary)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer border ${
                  showLibrary
                    ? 'bg-wedding-gold/20 text-wedding-gold border-wedding-gold'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5 text-wedding-gold" />
                <span>{showLibrary ? 'Đóng Thư Viện' : 'Chọn Từ Ảnh Mẫu 4K'}</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-400">
              Kéo thả file ảnh trực tiếp hoặc nhấn tải lên. Hệ thống tự động nén nét 4K mượt mà.
            </p>
          </div>
        </div>

        {/* Curated Studio Sample Gallery Picker Drawer */}
        {showLibrary && (
          <div className="mt-3.5 pt-3.5 border-t border-stone-800 animate-fadeIn space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-wedding-gold flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-wedding-gold" />
                <span>Kho Ảnh Mẫu Studio Cưới (Nhấp để chọn ngay)</span>
              </span>
              <button
                type="button"
                onClick={() => setShowLibrary(false)}
                className="text-[10px] text-stone-400 hover:text-white"
              >
                Đóng
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {presets.map((preset: any) => {
                const isSelected = value === preset.url;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      onChange(preset.url);
                      setShowLibrary(false);
                    }}
                    className={`p-1.5 rounded-xl border text-left cursor-pointer transition-all group ${
                      isSelected
                        ? 'border-wedding-gold bg-stone-800 ring-2 ring-wedding-gold/40 shadow-md'
                        : 'border-stone-800 hover:border-wedding-gold/50 bg-stone-950/60'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-1 relative bg-stone-900">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-wedding-burgundy/60 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-stone-300 block truncate">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

