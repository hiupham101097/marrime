import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  ExternalLink,
  CalendarPlus,
  Building2,
  Car,
  Copy,
  Check,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { WeddingEventSchedule, WeddingTemplate } from '../../shared/types';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendarIcs';

interface EventDetailsSectionProps {
  events: WeddingEventSchedule[];
  template?: WeddingTemplate;
  weddingDateIso?: string;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  events,
  template = 'royal',
  weddingDateIso = '2026-11-20T11:00:00+07:00',
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCalendarMenu, setActiveCalendarMenu] = useState<string | null>(null);

  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const targetDate = new Date(weddingDateIso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isPast: false,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDateIso]);

  const handleCopyAddress = (evtId: string, address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedId(evtId);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleOpenGrab = (evt: WeddingEventSchedule) => {
    // Universal Grab deep link on mobile, fallback to Grab web
    const grabDeepLink = `https://grab.onelink.me/2695613898?pid=deeplink&c=wedding&is_retargeting=true&af_dp=${encodeURIComponent(
      `grab://open?dropoff_address=${evt.venueName}&dropoff_name=${evt.venueName}`
    )}`;
    window.open(grabDeepLink, '_blank');
  };

  const handleOpenAppleMaps = (evt: WeddingEventSchedule) => {
    const destination = encodeURIComponent(`${evt.venueName} ${evt.address}`);
    window.open(`https://maps.apple.com/?q=${destination}`, '_blank');
  };

  const handleGoogleCalendar = (evt: WeddingEventSchedule) => {
    const url = getGoogleCalendarUrl({
      title: `Tiệc Cưới: Tuấn Anh & Mai Phương (${evt.title})`,
      description: `Trân trọng kính mời quý khách tới tham dự ${evt.title} tại ${evt.hallName} - ${evt.venueName}. Địa chỉ: ${evt.address}`,
      location: `${evt.hallName}, ${evt.venueName}, ${evt.address}`,
      startIso: weddingDateIso,
      durationHours: 4,
    });
    window.open(url, '_blank');
    setActiveCalendarMenu(null);
  };

  const handleAppleIcalDownload = (evt: WeddingEventSchedule) => {
    downloadIcsFile(
      {
        title: `Tiệc Cưới: Tuấn Anh & Mai Phương (${evt.title})`,
        description: `Trân trọng kính mời quý khách tới tham dự ${evt.title} tại ${evt.hallName} - ${evt.venueName}.\nĐịa chỉ: ${evt.address}\n\nĐã cài sẵn thông báo nhắc hẹn trước 24h và 2h.`,
        location: `${evt.hallName}, ${evt.venueName}, ${evt.address}`,
        startIso: weddingDateIso,
        durationHours: 4,
        url: 'https://marrime.pages.dev',
      },
      `TiecCuoi_${evt.title.replace(/\s+/g, '_')}.ics`
    );
    setActiveCalendarMenu(null);
  };

  return (
    <section id="event-details" className="py-24 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-wedding-gold-dark text-xs uppercase tracking-widest font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-wedding-gold" />
            <span>Thời Gian &amp; Địa Điểm</span>
            <Building2 className="w-3.5 h-3.5 text-wedding-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal tracking-tight">
            Sảnh Cưới &amp; Lễ Thành Hôn
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
            Rất hân hạnh được đón tiếp quý khách đến chung vui cùng gia đình
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Live Modern Countdown Banner */}
        {!timeLeft.isPast && (
          <div className="max-w-2xl mx-auto mb-14 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#2B0811] via-[#4A0A19] to-[#2B0811] text-white shadow-xl border border-amber-300/30 text-center relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center space-x-1.5">
                <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
                <span>Đếm Ngược Khoảnh Khắc Lễ Cưới Bắt Đầu</span>
                <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
              </span>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto pt-1">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="font-serif text-2xl sm:text-4xl font-bold text-amber-200 block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-stone-300 uppercase font-semibold">Ngày</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="font-serif text-2xl sm:text-4xl font-bold text-amber-200 block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-stone-300 uppercase font-semibold">Giờ</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="font-serif text-2xl sm:text-4xl font-bold text-amber-200 block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-stone-300 uppercase font-semibold">Phút</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="font-serif text-2xl sm:text-4xl font-bold text-amber-200 block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-stone-300 uppercase font-semibold">Giây</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {events.map((evt) => (
            <div
              key={evt.id}
              className={`p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                template === 'modern'
                  ? 'bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md'
                  : template === 'fairytale'
                  ? 'bg-[#FFF8F9] rounded-3xl border-2 border-pink-200/80 shadow-md'
                  : template === 'vintage'
                  ? 'bg-[#FAF5E9] rounded-3xl border-2 border-[#855B14]/40 shadow-lg'
                  : 'bg-wedding-cream/60 rounded-3xl border-2 border-wedding-gold/30 shadow-envelope group hover:border-wedding-gold/60'
              }`}
            >
              <div>
                {/* Event Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                      template === 'modern'
                        ? 'bg-stone-900 text-white font-mono text-[11px]'
                        : template === 'fairytale'
                        ? 'bg-pink-600 text-white'
                        : template === 'vintage'
                        ? 'bg-[#064E3B] text-[#FFF7CC]'
                        : 'bg-wedding-burgundy text-wedding-gold-light'
                    }`}
                  >
                    {evt.title}
                  </span>
                  <span className="text-xs text-stone-500 font-medium font-mono">
                    {evt.lunarDate}
                  </span>
                </div>

                {/* Hall Name Highlight */}
                <div className="bg-white rounded-2xl p-5 border border-wedding-gold/20 shadow-xs mb-5">
                  <div className="text-[11px] uppercase tracking-wider text-wedding-rose-600 font-bold mb-1">
                    Sảnh Cưới Đón Tiếp
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-wedding-burgundy">
                    {evt.hallName}
                  </h3>
                  <p className="text-stone-700 font-medium text-sm mt-0.5">{evt.venueName}</p>
                </div>

                {/* Date & Time details */}
                <div className="space-y-3 text-stone-700 text-sm mb-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-wedding-rose-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-stone-900">{evt.time}</span>
                      <span className="text-xs text-stone-500 ml-2">
                        ({evt.dayOfWeek}, {evt.date})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-wedding-rose-600 mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm font-light text-stone-700">
                        {evt.address}
                      </span>
                    </div>
                    {/* Copy Address Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyAddress(evt.id, `${evt.venueName}, ${evt.address}`)}
                      className="px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-[11px] font-semibold text-stone-600 flex items-center space-x-1 shrink-0 transition-colors cursor-pointer shadow-2xs"
                      title="Sao chép địa chỉ"
                    >
                      {copiedId === evt.id ? (
                        <>
                          <Check size={12} className="text-emerald-600" />
                          <span className="text-emerald-600 font-bold">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Chép Đ/C</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Multi-platform navigation & Universal Calendar Sync */}
              <div className="space-y-2.5 pt-4 border-t border-stone-200/80">
                {/* Row 1: Google Maps & Apple Maps */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={evt.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 bg-wedding-burgundy hover:bg-wedding-rose-900 text-wedding-gold-light text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 shadow-xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 shrink-0" />
                    <span>Google Maps</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenAppleMaps(evt)}
                    className="px-3 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5 shrink-0" />
                    <span>Apple Maps</span>
                  </button>
                </div>

                {/* Row 2: 1-Click Grab Ride Hailing & Universal Calendar Sync */}
                <div className="grid grid-cols-2 gap-2 relative">
                  {/* Grab Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenGrab(evt)}
                    className="px-3 py-2.5 bg-[#00B14F] hover:bg-[#009643] text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
                    title="Mở ứng dụng Grab để đặt xe tới sảnh cưới"
                  >
                    <Car className="w-3.5 h-3.5 shrink-0" />
                    <span>Đặt Xe Grab</span>
                  </button>

                  {/* Calendar Sync Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCalendarMenu(activeCalendarMenu === evt.id ? null : evt.id)
                      }
                      className="w-full px-3 py-2.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold rounded-xl border border-stone-300 flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <CalendarPlus className="w-3.5 h-3.5 text-wedding-rose-600 shrink-0" />
                      <span>Thêm Vào Lịch ▾</span>
                    </button>

                    {/* Dropdown Menu */}
                    {activeCalendarMenu === evt.id && (
                      <div className="absolute bottom-full mb-1.5 right-0 w-56 rounded-2xl bg-white border border-stone-200 shadow-xl p-1.5 z-30 animate-fadeIn text-left">
                        <button
                          type="button"
                          onClick={() => handleAppleIcalDownload(evt)}
                          className="w-full px-3 py-2 text-left rounded-xl hover:bg-stone-50 text-xs font-bold text-stone-800 flex items-center space-x-2 cursor-pointer"
                        >
                          <Smartphone size={14} className="text-[#8B1A32]" />
                          <div>
                            <span className="block">Apple Calendar / Outlook</span>
                            <span className="text-[10px] text-stone-400 font-normal">
                              Tải file .ICS cài sẵn nhắc hẹn
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleGoogleCalendar(evt)}
                          className="w-full px-3 py-2 text-left rounded-xl hover:bg-stone-50 text-xs font-bold text-stone-800 flex items-center space-x-2 cursor-pointer border-t border-stone-100"
                        >
                          <Calendar size={14} className="text-amber-600" />
                          <div>
                            <span className="block">Google Calendar</span>
                            <span className="text-[10px] text-stone-400 font-normal">
                              Đồng bộ trực tiếp trên web
                            </span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Visual Embed Area */}
        <div className="mt-14 rounded-3xl overflow-hidden shadow-envelope border border-wedding-gold/30">
          <div className="p-4 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-wedding-gold-light" />
              <span className="font-medium">
                Vị trí sảnh tiệc: {events[0]?.venueName} ({events[0]?.address})
              </span>
            </span>
            <div className="flex items-center space-x-3">
              <a
                href={events[0]?.googleMapsUrl || 'https://maps.google.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-wedding-gold-light hover:underline flex items-center space-x-1"
              >
                <span>Mở Toàn Màn Hình</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="w-full h-80 sm:h-96 bg-stone-200 relative">
            <iframe
              title="Wedding Venue Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://maps.google.com/maps?q=Riverside+Palace+360D+Ben+Van+Don+Phuong+1+Quan+4+Ho+Chi+Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
