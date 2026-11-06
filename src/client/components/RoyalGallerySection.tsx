import React, { useState } from 'react';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { GalleryPhotoItem } from '../../shared/types';
import { DEFAULT_GALLERY_PHOTOS } from '../../shared/defaultData';

interface RoyalGallerySectionProps {
  photos?: GalleryPhotoItem[];
}

export const RoyalGallerySection: React.FC<RoyalGallerySectionProps> = ({
  photos = DEFAULT_GALLERY_PHOTOS,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'royal' | 'moments' | 'vows'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayList = photos && photos.length > 0 ? photos : DEFAULT_GALLERY_PHOTOS;

  const filteredPhotos =
    activeTab === 'all'
      ? displayList
      : displayList.filter((p) => p.category === activeTab);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <section id="gallery" className="py-24 px-4 bg-[#FFFDF9] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-wedding-gold-dark text-xs uppercase tracking-[0.25em] font-bold mb-3">
            <Sparkles className="w-4 h-4 text-wedding-gold" />
            <span>ALBUM ẢNH CƯỚI HOÀNG GIA</span>
            <Sparkles className="w-4 h-4 text-wedding-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal tracking-tight">
            Khoảnh Khắc Đẹp Nhất
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
            Ghi dấu khoảnh khắc lộng lẫy và kiêu hãnh của một đời người
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Tất Cả Khoảnh Khắc' },
            { id: 'royal', label: 'Áo Cưới Hoàng Gia' },
            { id: 'vows', label: 'Lời Hẹn Ước' },
            { id: 'moments', label: 'Nụ Cười Ngọt Ngào' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-wedding-burgundy text-wedding-gold-light shadow-md border border-wedding-gold/60'
                  : 'bg-wedding-cream text-stone-600 hover:text-wedding-burgundy border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-luxury border-2 border-wedding-gold/30 hover:border-wedding-gold transition-all duration-500 cursor-pointer transform hover:-translate-y-1.5"
            >
              <div className="h-80 sm:h-96 overflow-hidden relative">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Romantic Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center space-x-1.5 text-wedding-gold-light text-xs font-semibold mb-1">
                    <Heart className="w-3.5 h-3.5 fill-wedding-rose-500 text-wedding-rose-500" />
                    <span>Xem phóng to ảnh</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white drop-shadow">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-stone-200 mt-1 italic font-light line-clamp-2">
                    "{photo.caption}"
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
                  <ZoomIn className="w-4 h-4 text-wedding-gold-light" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Cinema Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:text-wedding-gold hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-wedding-rose-600 transition-all cursor-pointer"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-wedding-rose-600 transition-all cursor-pointer"
            aria-label="Ảnh tiếp"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Display */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[lightboxIndex].url}
              alt={filteredPhotos[lightboxIndex].title}
              className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl border-2 border-wedding-gold/40"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-wedding-gold-light">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-sm text-stone-300 mt-1 italic max-w-md mx-auto">
                "{filteredPhotos[lightboxIndex].caption}"
              </p>
              <span className="text-xs text-stone-400 mt-2 block">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

