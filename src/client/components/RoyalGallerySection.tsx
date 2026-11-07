import React, { useState } from 'react';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, Heart, Sparkles, Pin } from 'lucide-react';
import { GalleryPhotoItem, WeddingTemplate } from '../../shared/types';
import { DEFAULT_GALLERY_PHOTOS } from '../../shared/defaultData';

interface RoyalGallerySectionProps {
  photos?: GalleryPhotoItem[];
  template?: WeddingTemplate;
}

export const RoyalGallerySection: React.FC<RoyalGallerySectionProps> = ({
  photos = DEFAULT_GALLERY_PHOTOS,
  template = 'royal',
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
        {/* Header - Adapts to template */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-bold mb-3">
            {template === 'fairytale' ? (
              <>
                <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
                <span className="text-pink-600">ALBUM KỶ NIỆM NGỌT NGÀO</span>
                <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
              </>
            ) : template === 'modern' ? (
              <>
                <span className="text-stone-400 font-mono tracking-[0.3em]">02 / PHOTO LOOKBOOK</span>
              </>
            ) : template === 'vintage' ? (
              <>
                <Sparkles className="w-4 h-4 text-[#855B14]" />
                <span className="text-[#855B14] font-serif">CUỐN ALBUM KỶ YẾU XƯA</span>
                <Sparkles className="w-4 h-4 text-[#855B14]" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-wedding-gold" />
                <span className="text-wedding-gold-dark">ALBUM ẢNH CƯỚI HOÀNG GIA</span>
                <Sparkles className="w-4 h-4 text-wedding-gold" />
              </>
            )}
          </div>

          <h2
            className={`font-serif text-3xl sm:text-5xl font-normal tracking-tight ${
              template === 'vintage'
                ? 'text-[#064E3B]'
                : template === 'modern'
                ? 'text-stone-900'
                : 'text-wedding-burgundy'
            }`}
          >
            {template === 'modern'
              ? 'Visual Chronicles'
              : template === 'fairytale'
              ? 'Từng Khung Hình Mộng Mơ'
              : template === 'vintage'
              ? 'Kỷ Vật Thời Gian'
              : 'Khoảnh Khắc Đẹp Nhất'}
          </h2>

          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
            {template === 'modern'
              ? 'High-fashion editorial moments captured in timeless monochrome & light'
              : template === 'fairytale'
              ? 'Những nụ cười trong veo ghi dấu câu chuyện tình yêu dịu dàng'
              : template === 'vintage'
              ? 'Lưu dấu hoài niệm sắc nét qua từng thước phim kỷ niệm'
              : 'Ghi dấu khoảnh khắc lộng lẫy và kiêu hãnh của một đời người'}
          </p>

          <div
            className={`w-28 h-1 mx-auto mt-4 ${
              template === 'modern'
                ? 'bg-stone-300'
                : template === 'fairytale'
                ? 'bg-pink-300'
                : template === 'vintage'
                ? 'bg-[#855B14]/60'
                : 'bg-gradient-to-r from-transparent via-wedding-gold to-transparent'
            }`}
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Tất Cả Khoảnh Khắc' },
            { id: 'royal', label: template === 'modern' ? 'Editorial' : 'Áo Cưới Lộng Lẫy' },
            { id: 'vows', label: 'Lời Hẹn Ước' },
            { id: 'moments', label: 'Nụ Cười Ngọt Ngào' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? template === 'modern'
                    ? 'bg-stone-900 text-white shadow'
                    : template === 'fairytale'
                    ? 'bg-pink-600 text-white shadow'
                    : template === 'vintage'
                    ? 'bg-[#064E3B] text-[#FFF7CC] shadow'
                    : 'bg-wedding-burgundy text-wedding-gold-light shadow-md border border-wedding-gold/60'
                  : 'bg-wedding-cream text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================= */}
        {/* 1. FAIRYTALE GALLERY: POLAROID SCRAPBOOK WITH WASHI TAPE */}
        {/* ============================================================= */}
        {template === 'fairytale' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredPhotos.map((photo, index) => {
              const rotationClass = index % 3 === 0 ? '-rotate-2' : index % 3 === 1 ? 'rotate-2' : 'rotate-0';
              return (
                <div
                  key={photo.id}
                  onClick={() => setLightboxIndex(index)}
                  className={`bg-white p-4 pb-6 rounded-2xl shadow-md border border-pink-100 cursor-pointer transform hover:rotate-0 hover:scale-105 transition-all duration-300 relative ${rotationClass}`}
                >
                  {/* Washi tape sticker */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-200/80 rounded -rotate-2 border-t border-b border-pink-300/60 shadow-xs" />
                  <div className="h-72 sm:h-80 rounded-xl overflow-hidden mb-3 bg-stone-100">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center px-2">
                    <h4 className="font-serif text-sm font-bold text-stone-800">{photo.title}</h4>
                    <p className="text-[11px] text-pink-600 italic mt-0.5 font-light">"{photo.caption}"</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================= */}
        {/* 2. MODERN MINIMAL GALLERY: EDITORIAL LOOKBOOK GRID */}
        {/* ============================================================= */}
        {template === 'modern' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative overflow-hidden rounded-xl bg-stone-100 border border-stone-200 cursor-pointer"
              >
                <div className="h-84 sm:h-96 overflow-hidden relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-900 font-mono text-[10px] px-2.5 py-1 rounded">
                    0{index + 1}
                  </div>
                  <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <h4 className="font-serif text-base font-normal">{photo.title}</h4>
                    <p className="text-[11px] text-stone-300 font-mono mt-1">{photo.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================= */}
        {/* 3. VINTAGE GALLERY: LEATHER ALBUM WITH BRASS CORNERS */}
        {/* ============================================================= */}
        {template === 'vintage' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="bg-[#FAF5E9] p-4 rounded-2xl border-2 border-[#855B14]/40 shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300 relative group"
              >
                {/* 4 Vintage Brass Corner Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#855B14]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#855B14]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#855B14]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#855B14]" />

                <div className="h-72 sm:h-84 rounded-lg overflow-hidden relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover sepia-[0.12] group-hover:sepia-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 text-center">
                  <h4 className="font-serif text-sm font-bold text-[#064E3B]">{photo.title}</h4>
                  <p className="text-[11px] text-[#855B14] font-serif italic mt-0.5">"{photo.caption}"</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================= */}
        {/* 4. ROYAL GALLERY: CATHEDRAL ARCH FRAMES & GILDED BORDERS */}
        {/* ============================================================= */}
        {template === 'royal' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative overflow-hidden rounded-t-[80px] rounded-b-3xl bg-white shadow-luxury border-2 border-wedding-gold/40 hover:border-wedding-gold transition-all duration-500 cursor-pointer transform hover:-translate-y-1.5"
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
        )}
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
