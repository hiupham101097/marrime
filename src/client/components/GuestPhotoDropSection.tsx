import React, { useState } from 'react';
import {
  Camera,
  UploadCloud,
  Heart,
  Sparkles,
  Download,
  X,
  CheckCircle2,
  Image as ImageIcon,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestDropPhotoItem } from '../../shared/types';
import { triggerHaptic } from '../utils/soundEffects';

interface GuestPhotoDropSectionProps {
  photos: GuestDropPhotoItem[];
  onUploadPhoto: (photo: GuestDropPhotoItem) => void;
  groomName: string;
  brideName: string;
  guestName?: string;
  tableNumber?: string;
}

export const GuestPhotoDropSection: React.FC<GuestPhotoDropSectionProps> = ({
  photos,
  onUploadPhoto,
  groomName,
  brideName,
  guestName = '',
  tableNumber = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploaderName, setUploaderName] = useState(guestName);
  const [uploaderTable, setUploaderTable] = useState(tableNumber);
  const [caption, setCaption] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    const newPhoto: GuestDropPhotoItem = {
      id: 'gdp_' + Date.now() + Math.random().toString(36).substring(2, 6),
      url: selectedImage,
      uploaderName: uploaderName.trim() || 'Khách Quý',
      tableNumber: uploaderTable.trim() || undefined,
      caption: caption.trim() || undefined,
      uploadedAt: 'Vừa xong',
      likesCount: 1,
    };

    onUploadPhoto(newPhoto);
    setIsModalOpen(false);
    setSelectedImage(null);
    setCaption('');
    triggerHaptic([40, 80]);

    void confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#DFB76C', '#8B1A32', '#FDE047'],
    });
  };

  const handleToggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    triggerHaptic([20]);
  };

  return (
    <section id="guest-photos" className="py-14 sm:py-18 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-[#8B1A32] text-xs font-bold shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
            <span className="uppercase tracking-widest text-[10px]">Góc Kỷ Niệm Tiệc Cưới • Guest Photo Drop</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Khoảnh Khắc Qua Ống Kính Của Bạn
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            Bạn có những bức ảnh chụp tự nhiên và vui vẻ cùng {groomName} & {brideName} tại bàn tiệc? Hãy tải lên để cùng gom lại thành album kỷ niệm nguyên bản không bị bóp méo chất lượng nhé!
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8B1A32] via-[#722235] to-[#5C0E1F] text-amber-100 hover:text-white font-serif text-sm font-bold shadow-md hover:shadow-xl transition-all flex items-center justify-center space-x-2 mx-auto cursor-pointer border border-[#DFB76C]/40"
            >
              <UploadCloud className="w-4 h-4 text-amber-300" />
              <span>Tải Ảnh Của Bạn Lên Album Chung</span>
            </button>
          </div>
        </div>

        {/* Photo Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.map((item) => {
            const isLiked = likedMap[item.id];
            const currentLikes = (item.likesCount || 0) + (isLiked ? 1 : 0);

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.caption || 'Ảnh tiệc cưới'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(item.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'bg-black/35 text-white/90 hover:bg-black/50'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                  {item.caption && (
                    <p className="font-serif text-xs text-stone-800 italic leading-relaxed line-clamp-2">
                      "{item.caption}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px]">
                    <div>
                      <strong className="text-stone-900 block truncate max-w-[130px]">
                        {item.uploaderName}
                      </strong>
                      <span className="text-[10px] text-stone-400">
                        {item.tableNumber ? `Bàn ${item.tableNumber} • ` : ''}{item.uploadedAt}
                      </span>
                    </div>

                    <span className="text-[10px] text-rose-500 font-bold flex items-center space-x-1 shrink-0 bg-rose-50 px-2 py-0.5 rounded-full">
                      <Heart className="w-2.5 h-2.5 fill-rose-500" />
                      <span>{currentLikes}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none">
          <div className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl border-2 border-[#DFB76C]/60 shadow-2xl overflow-hidden my-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5C0E1F] to-[#722235] p-5 text-white flex items-center justify-between border-b border-[#DFB76C]/40">
              <div className="flex items-center space-x-2.5">
                <Camera className="w-5 h-5 text-amber-300" />
                <h3 className="font-serif text-base font-bold text-amber-50">
                  Gửi Ảnh Tiệc Cưới Cho Dâu & Rể
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
              {/* File input / Preview */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Chọn Ảnh Từ Điện Thoại / Máy Tính *
                </label>
                {selectedImage ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-200">
                    <img src={selectedImage} alt="Xem trước" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-stone-300 hover:border-[#8B1A32] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-white">
                    <UploadCloud className="w-8 h-8 text-stone-400 mb-2" />
                    <span className="text-xs font-bold text-stone-700">Chạm để chọn bức ảnh đẹp nhất</span>
                    <span className="text-[10px] text-stone-400 mt-0.5">Hỗ trợ JPG, PNG, HEIC độ nét cao</span>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Uploader Name & Table */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Họ Tên Của Bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploaderName}
                    onChange={(e) => setUploaderName(e.target.value)}
                    placeholder="VD: Anh Tuấn, Cô Lan"
                    className="w-full px-3 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-white focus:outline-none focus:border-[#8B1A32]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Số Bàn Tiệc
                  </label>
                  <input
                    type="text"
                    value={uploaderTable}
                    onChange={(e) => setUploaderTable(e.target.value)}
                    placeholder="VD: 06, VIP 01"
                    className="w-full px-3 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-white focus:outline-none focus:border-[#8B1A32]"
                  />
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Lời Bình / Lời Chúc Kèm Theo (Tùy chọn)
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="VD: Bắt trọn nụ cười của cô dâu lúc bước vào lễ đường!"
                  className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 bg-white focus:outline-none focus:border-[#8B1A32]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!selectedImage}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-100 font-serif text-sm font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 border border-[#DFB76C]/40"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Hoàn Tất Tải Ảnh Lên Album</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
