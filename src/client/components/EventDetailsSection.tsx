import React from 'react';
import { Calendar, Clock, MapPin, Navigation, ExternalLink, CalendarPlus, Building2 } from 'lucide-react';
import { WeddingEventSchedule, WeddingTemplate } from '../../shared/types';

interface EventDetailsSectionProps {
  events: WeddingEventSchedule[];
  template?: WeddingTemplate;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({
  events,
  template = 'royal',
}) => {
  const handleAddToCalendar = (event: WeddingEventSchedule) => {
    // Generate Google Calendar Link
    // Date: 2026-11-20T11:00:00+07:00
    const startTime = '20261120T040000Z'; // UTC equivalent of 11:00 AM UTC+7
    const endTime = '20261120T080000Z';
    const title = encodeURIComponent(`Tiệc Cưới: Tuấn Anh & Mai Phương (${event.title})`);
    const details = encodeURIComponent(`Trân trọng kính mời quý khách tới tham dự ${event.title} tại ${event.hallName} - ${event.venueName}. Địa chỉ: ${event.address}`);
    const location = encodeURIComponent(`${event.hallName}, ${event.venueName}, ${event.address}`);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section id="event-details" className="py-24 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-wedding-gold-dark text-xs uppercase tracking-widest font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-wedding-gold" />
            <span>Thời Gian & Địa Điểm</span>
            <Building2 className="w-3.5 h-3.5 text-wedding-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal tracking-tight">
            Sảnh Cưới & Lễ Thành Hôn
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 font-light">
            Rất hân hạnh được đón tiếp quý khách đến chung vui cùng gia đình
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Events Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {events.map((evt) => (
            <div
              key={evt.id}
              className={`p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                template === 'modern'
                  ? 'bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md'
                  : template === 'fairytale'
                  ? 'bg-[#FFF8F9] rounded-3xl border-2 border-pink-200/80 shadow-md'
                  : template === 'vintage'
                  ? 'bg-[#FAF5E9] rounded-3xl border-2 border-[#855B14]/40 shadow-lg'
                  : 'bg-wedding-cream/60 rounded-3xl border-2 border-wedding-gold/30 shadow-envelope group hover:border-wedding-gold/60'
              }`}
            >
              {/* Event Badge */}
              <div className="flex items-center justify-between mb-6">
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
              <div className="bg-white rounded-2xl p-5 border border-wedding-gold/20 shadow-sm mb-6">
                <div className="text-xs uppercase tracking-wider text-wedding-rose-600 font-semibold mb-1">
                  Sảnh Cưới Đón Khách
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-wedding-burgundy">
                  {evt.hallName}
                </h3>
                <p className="text-stone-700 font-medium text-sm mt-1">
                  {evt.venueName}
                </p>
              </div>

              {/* Date & Time details */}
              <div className="space-y-3.5 text-stone-700 text-sm mb-8">
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-wedding-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-900">{evt.time}</span>
                    <span className="text-xs text-stone-500 ml-2">({evt.dayOfWeek}, {evt.date})</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-wedding-rose-600 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm font-light text-stone-700">
                    {evt.address}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Google Maps & Add to Calendar */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-200">
                <a
                  href={evt.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 bg-wedding-burgundy hover:bg-wedding-rose-900 text-wedding-gold-light text-xs font-semibold rounded-xl flex items-center justify-center space-x-2 shadow transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Xem Bản Đồ & Chỉ Đường</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleAddToCalendar(evt)}
                  className="px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl border border-stone-300 flex items-center justify-center space-x-2 shadow-sm transition-colors cursor-pointer"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-wedding-rose-600" />
                  <span>Lưu Lịch</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Visual Embed Area */}
        <div className="mt-14 rounded-3xl overflow-hidden shadow-envelope border border-wedding-gold/30">
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between text-xs">
            <span className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-wedding-gold-light" />
              <span className="font-medium">Vị trí trung tâm tiệc cưới Riverside Palace (360D Bến Vân Đồn, Q.4, TP.HCM)</span>
            </span>
            <a
              href="https://maps.google.com/?q=Riverside+Palace+360D+Ben+Van+Don+Quan+4+Ho+Chi+Minh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wedding-gold-light hover:underline flex items-center space-x-1"
            >
              <span>Mở Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 bg-stone-200 relative">
            <iframe
              title="Riverside Palace Wedding Venue Map"
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

