import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { GuestInfo } from '../../shared/types';
import { ROLE_CONFIG } from '../hooks/useGuestInfo';

interface GuestInvitationCardProps {
  guest: GuestInfo;
  venueName: string;
  hallName: string;
  weddingDateFormatted: string;
}

export const GuestInvitationCard: React.FC<GuestInvitationCardProps> = ({
  guest,
  venueName,
  hallName,
  weddingDateFormatted,
}) => {
  const [copied, setCopied] = useState(false);

  const roleData = ROLE_CONFIG[guest.role] || ROLE_CONFIG.ban;
  const salutation = guest.role === 'gia_dinh' ? guest.name : `${roleData.prefix} ${guest.name}`;

  const handleShareLink = () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('guest', guest.name);
    url.searchParams.set('role', guest.role);

    navigator.clipboard
      .writeText(url.toString())
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
  };

  return (
    <section className="py-20 px-4 bg-wedding-cream relative">
      <div className="max-w-4xl mx-auto">
        {/* Main Personalized Invitation Letter Card - Read Only */}
        <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-14 shadow-luxury border-2 border-wedding-gold/40 relative overflow-hidden text-center ornate-box">
          {/* Subtle gold ribbon watermark */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-wedding-rose-50 border border-wedding-rose-200 text-wedding-rose-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5 text-wedding-gold" />
            <span>THƯ MỜI TRÂN QUÝ</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal tracking-wide mb-4">
            Kính Mời {salutation}
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Sự hiện diện của{' '}
            <strong className="text-wedding-burgundy font-semibold">{salutation}</strong> cùng{' '}
            {roleData.companion} là niềm vinh hạnh và niềm vui to lớn nhất đối với gia đình chúng
            tôi trong ngày trọng đại này.
          </p>

          {/* Hall & Venue Highlight Box */}
          <div className="my-8 p-6 bg-gradient-to-r from-wedding-rose-50/80 via-wedding-cream to-wedding-rose-50/80 rounded-2xl border border-wedding-gold/30 max-w-xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
              Địa Điểm Đón Tiếp
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-wedding-burgundy">
              {hallName}
            </div>
            <div className="text-sm font-medium text-stone-700 mt-1">{venueName}</div>
            <div className="text-xs text-wedding-rose-700 font-semibold mt-2">
              Thời gian: {weddingDateFormatted}
            </div>
          </div>

          {/* Quick Copy Link to send personalized invitation */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleShareLink}
              className="px-6 py-2.5 bg-gradient-to-r from-wedding-burgundy to-[#4A1020] text-wedding-gold-light hover:opacity-95 rounded-full text-xs font-semibold flex items-center space-x-2 shadow-md transition-all cursor-pointer border border-wedding-gold/50"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-wedding-gold" />
              )}
              <span>
                {copied ? 'Đã sao chép liên kết thiệp!' : 'Sao chép link thiệp của ' + roleData.prefix}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
