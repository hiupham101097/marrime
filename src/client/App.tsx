import React, { useState, useEffect } from 'react';
import { Mail, Gift, Heart, Menu, X, ArrowUp, Crown, Camera, Sparkles, Settings } from 'lucide-react';
import { DEFAULT_WEDDING_DATA } from '../shared/defaultData';
import { WeddingData, GuestRole } from '../shared/types';
import { useGuestInfo } from './hooks/useGuestInfo';
import { useWeddingAudio } from './hooks/useWeddingAudio';

// Components
import { EnvelopeModal } from './components/EnvelopeModal';
import { HeroSection } from './components/HeroSection';
import { GuestInvitationCard } from './components/GuestInvitationCard';
import { CoupleSection } from './components/CoupleSection';
import { RoyalGallerySection } from './components/RoyalGallerySection';
import { TimelineSection } from './components/TimelineSection';
import { LoveMessagesSection } from './components/LoveMessagesSection';
import { DresscodeEtiquetteSection } from './components/DresscodeEtiquetteSection';
import { ThankYouSection } from './components/ThankYouSection';
import { EventDetailsSection } from './components/EventDetailsSection';
import { RSVPSection } from './components/RSVPSection';
import { WishingWallSection } from './components/WishingWallSection';
import { GiftBoxModal } from './components/GiftBoxModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { FloatingEffects } from './components/FloatingEffects';
import { MusicPlayer } from './components/MusicPlayer';

export const App: React.FC = () => {
  const [weddingData, setWeddingData] = useState<WeddingData>(DEFAULT_WEDDING_DATA);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(true);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { guest } = useGuestInfo();
  const { isPlaying, isMuted, toggleMute, startMusic, toggleMusic, playEnvelopeOpeningSound, currentTrackTitle } =
    useWeddingAudio(weddingData.music);

  // Fetch live wedding data from Backend API
  useEffect(() => {
    fetch('/api/wedding-info')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.data) {
          setWeddingData(data.data);
        }
      })
      .catch(() => {
        // Fallback to DEFAULT_WEDDING_DATA
      });
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When guest opens the envelope
  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(false);
    startMusic(); // Auto start sweet acoustic wedding music
    setTimeout(() => {
      const el = document.getElementById('invitation-card');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Theme Class mapping
  const getThemeWrapperClass = () => {
    switch (weddingData.theme) {
      case 'rose':
        return 'theme-rose';
      case 'gold':
        return 'theme-gold';
      case 'navy':
        return 'theme-navy';
      case 'emerald':
        return 'theme-emerald';
      default:
        return 'theme-burgundy';
    }
  };

  return (
    <div
      className={`min-h-screen bg-wedding-cream text-stone-800 font-sans relative selection:bg-wedding-rose-200 selection:text-wedding-rose-900 ${getThemeWrapperClass()}`}
    >
      {/* 1. Royal Envelope Opening Modal (Interactive First Experience) */}
      <EnvelopeModal
        isOpen={isEnvelopeOpen}
        onOpenEnvelope={handleOpenEnvelope}
        guest={guest}
        groomName={weddingData.groom.name}
        brideName={weddingData.bride.name}
        weddingDateFormatted={weddingData.weddingDateFormatted}
        playOpenSound={playEnvelopeOpeningSound}
        envelopeStyle={weddingData.envelopeStyle}
      />

      {/* Floating Rose Petals & Golden Stardust & Mouse Trail Canvas */}
      <FloatingEffects />

      {/* Floating Music Player */}
      <MusicPlayer
        isPlaying={isPlaying}
        isMuted={isMuted}
        onTogglePlay={toggleMusic}
        onToggleMute={toggleMute}
        trackTitle={weddingData.music?.title || currentTrackTitle}
      />

      {/* Floating Action Buttons (Top Right) */}
      <div className="fixed top-4 right-4 z-40 flex items-center space-x-2">
        {/* Re-open Envelope Button */}
        <button
          type="button"
          onClick={() => setIsEnvelopeOpen(true)}
          className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border-2 border-wedding-gold/50 text-xs font-bold text-wedding-burgundy shadow-lg hover:bg-wedding-rose-50 flex items-center space-x-1.5 transition-all cursor-pointer"
          title="Xem lại phong bì thiệp"
        >
          <Mail className="w-3.5 h-3.5 text-wedding-rose-600" />
          <span className="hidden sm:inline">Mở Lại Thiệp</span>
        </button>

        {/* Gift Box Button */}
        <button
          type="button"
          onClick={() => setIsGiftModalOpen(true)}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-wedding-rose-800 to-wedding-burgundy text-white text-xs font-bold shadow-lg hover:opacity-95 flex items-center space-x-1.5 transition-all cursor-pointer border-2 border-wedding-gold/60"
          title="Mừng cưới dâu rể"
        >
          <Gift className="w-3.5 h-3.5 text-amber-200" />
          <span className="hidden sm:inline">Hộp Mừng Cưới</span>
        </button>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-wedding-gold/30 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo / Monogram */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center space-x-2 font-serif text-lg font-bold text-wedding-burgundy cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-wedding-burgundy to-[#4A1020] text-wedding-gold-light flex items-center justify-center text-xs font-serif font-bold border border-wedding-gold/50 shadow-sm">
              A&P
            </span>
            <span className="tracking-wide">
              {weddingData.groom.shortName || weddingData.groom.name} &{' '}
              {weddingData.bride.shortName || weddingData.bride.name}
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-5 text-xs font-semibold text-stone-700">
            <button
              onClick={() => scrollToSection('invitation-card')}
              className="hover:text-wedding-rose-700 transition-colors cursor-pointer"
            >
              Thư Mời
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-wedding-rose-700 transition-colors cursor-pointer flex items-center space-x-1"
            >
              <Camera className="w-3.5 h-3.5 text-wedding-gold" />
              <span>Ảnh Cưới</span>
            </button>
            <button
              onClick={() => scrollToSection('timeline')}
              className="hover:text-wedding-rose-700 transition-colors cursor-pointer"
            >
              Chặng Đường
            </button>
            <button
              onClick={() => scrollToSection('event-details')}
              className="hover:text-wedding-rose-700 transition-colors cursor-pointer"
            >
              Sảnh Cưới & Bản Đồ
            </button>
            <button
              onClick={() => scrollToSection('rsvp')}
              className="hover:text-wedding-rose-700 transition-colors cursor-pointer"
            >
              Xác Nhận Tham Dự
            </button>
            <button
              onClick={() => setIsGiftModalOpen(true)}
              className="px-4 py-1.5 rounded-full bg-wedding-rose-50 text-wedding-rose-700 font-bold border border-wedding-rose-300 hover:bg-wedding-rose-100 transition-colors cursor-pointer flex items-center space-x-1 shadow-sm"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Mừng Cưới</span>
            </button>
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-4 space-y-3 text-sm font-semibold animate-fadeIn">
            <button
              onClick={() => scrollToSection('invitation-card')}
              className="block w-full text-left py-1.5 text-stone-700 hover:text-wedding-rose-600"
            >
              Thư Mời
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left py-1.5 text-stone-700 hover:text-wedding-rose-600"
            >
              Album Ảnh Cưới
            </button>
            <button
              onClick={() => scrollToSection('timeline')}
              className="block w-full text-left py-1.5 text-stone-700 hover:text-wedding-rose-600"
            >
              Chặng Đường Tình Yêu
            </button>
            <button
              onClick={() => scrollToSection('event-details')}
              className="block w-full text-left py-1.5 text-stone-700 hover:text-wedding-rose-600"
            >
              Sảnh Cưới & Bản Đồ
            </button>
            <button
              onClick={() => scrollToSection('rsvp')}
              className="block w-full text-left py-1.5 text-stone-700 hover:text-wedding-rose-600"
            >
              Xác Nhận Tham Dự (RSVP)
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsGiftModalOpen(true);
              }}
              className="block w-full text-left py-1.5 text-wedding-rose-700 font-bold"
            >
              Hộp Mừng Cưới (VietQR)
            </button>
          </div>
        )}
      </header>

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          groomName={weddingData.groom.name}
          brideName={weddingData.bride.name}
          weddingDateIso={weddingData.weddingDate}
          weddingDateFormatted={weddingData.weddingDateFormatted}
          onExploreClick={() => scrollToSection('timeline')}
          onRsvpClick={() => scrollToSection('rsvp')}
        />

        {/* 2. Personalized Guest Invitation Card (Chế độ chỉ đọc cho quan khách) */}
        <div id="invitation-card">
          <GuestInvitationCard
            guest={guest}
            venueName={weddingData.events[0]?.venueName || 'Riverside Palace'}
            hallName={weddingData.events[0]?.hallName || 'Sảnh Grand Ballroom (Tầng 3)'}
            weddingDateFormatted={weddingData.weddingDateFormatted}
          />
        </div>

        {/* 3. Couple Showcase (Đại diện hai họ thông gia) */}
        <CoupleSection groom={weddingData.groom} bride={weddingData.bride} />

        {/* 4. Royal Wedding Photo Gallery (Khoảnh khắc đẹp nhất) */}
        <RoyalGallerySection />

        {/* 5. Timeline Section (Từng chặng đường & hình ảnh kỷ niệm) */}
        <TimelineSection milestones={weddingData.timeline} />

        {/* 6. Love Messages (Những lời hẹn ước dâu rể) */}
        <LoveMessagesSection messages={weddingData.loveStoryMessages} />

        {/* 7. Dresscode & 5-Star Program (Trang phục gợi ý & lịch trình tiệc) */}
        <DresscodeEtiquetteSection />

        {/* 8. Thank You (Lời tri ân sâu sắc gửi đấng sinh thành & quan khách) */}
        <ThankYouSection
          title={weddingData.thankYouNote.title}
          message={weddingData.thankYouNote.message}
          signatures={weddingData.thankYouNote.signatures}
        />

        {/* 9. Event Details & Wedding Hall (Thời gian, địa điểm, sảnh cưới, Google Maps) */}
        <EventDetailsSection events={weddingData.events} />

        {/* 10. RSVP Section (Xác nhận tham dự connected to Node.js backend) */}
        <RSVPSection guest={guest} />

        {/* 11. Wishing Wall (Sổ lưu bút trực tuyến với thả tim & realtime) */}
        <WishingWallSection />
      </main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-40 p-3 rounded-full bg-white/95 backdrop-blur-md border-2 border-wedding-gold/50 text-wedding-burgundy shadow-xl hover:bg-wedding-rose-50 transition-all cursor-pointer animate-fadeIn"
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-300 py-16 px-4 border-t-2 border-wedding-gold/30 text-center relative">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-wedding-burgundy to-[#4A1020] border-2 border-wedding-gold/60 text-wedding-gold-light flex items-center justify-center font-serif text-base font-bold mx-auto shadow-luxury">
            A&P
          </div>
          <h4 className="font-serif text-2xl sm:text-3xl text-white font-medium tracking-tight">
            {weddingData.groom.name} & {weddingData.bride.name}
          </h4>
          <p className="text-xs sm:text-sm text-stone-400 font-light italic max-w-lg mx-auto leading-relaxed">
            "Hạnh phúc trọn đời bắt đầu từ hôm nay. Cảm ơn tình cảm thương quý vô bờ bến của gia đình, người thân và bè bạn đã luôn đồng hành cùng chúng mình!"
          </p>

          <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
            <span>© 2026 Lễ Thành Hôn • Trăm Năm Hạnh Phúc</span>

            {/* Secret Admin Panel Trigger Button for Bride & Groom */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-700 text-[11px] text-stone-400 hover:text-wedding-gold hover:border-wedding-gold/50 transition-all cursor-pointer"
              title="Quản trị tiệc cưới (Dành riêng cho dâu rể)"
            >
              <Settings className="w-3.5 h-3.5 text-wedding-gold" />
              <span>Quản Trị Tiệc Cưới (Admin)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Gift Box Modal */}
      <GiftBoxModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        groom={weddingData.groom}
        bride={weddingData.bride}
      />

      {/* Admin Management Dashboard Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentData={weddingData}
        onSaveSuccess={(updated) => setWeddingData(updated)}
      />
    </div>
  );
};
