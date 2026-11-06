import React, { useState } from 'react';
import { Mail, Check, Copy, Share2, Users, Sparkles } from 'lucide-react';
import { GuestInfo, GuestRole } from '../../shared/types';
import { ROLE_CONFIG } from '../hooks/useGuestInfo';

interface GuestInvitationCardProps {
  guest: GuestInfo;
  onRoleChange: (name: string, role: GuestRole) => void;
  venueName: string;
  hallName: string;
  weddingDateFormatted: string;
}

export const GuestInvitationCard: React.FC<GuestInvitationCardProps> = ({
  guest,
  onRoleChange,
  venueName,
  hallName,
  weddingDateFormatted,
}) => {
  const [copied, setCopied] = useState(false);
  const [customName, setCustomName] = useState(guest.name);
  const [selectedRole, setSelectedRole] = useState<GuestRole>(guest.role);

  const roleData = ROLE_CONFIG[guest.role] || ROLE_CONFIG.ban;
  const salutation = guest.role === 'gia_dinh' ? guest.name : `${roleData.prefix} ${guest.name}`;

  const handleShareLink = () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('guest', guest.name);
    url.searchParams.set('role', guest.role);
    
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  const handleApplyCustomGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (customName.trim()) {
      onRoleChange(customName.trim(), selectedRole);
    }
  };

  return (
    <section className="py-16 px-4 bg-wedding-cream relative">
      <div className="max-w-4xl mx-auto">
        {/* Main Personalized Invitation Letter Card */}
        <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 shadow-luxury border-2 border-wedding-gold/40 relative overflow-hidden text-center">
          {/* Subtle gold ribbon watermark */}
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-wedding-rose-50 border border-wedding-rose-200 text-wedding-rose-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Thư Mời Trân Quý</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl text-wedding-burgundy font-normal tracking-wide mb-4">
            Kính Mời {salutation}
          </h2>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Sự hiện diện của <strong className="text-wedding-burgundy font-semibold">{salutation}</strong> cùng {roleData.companion} là niềm vinh hạnh và niềm vui to lớn nhất đối với gia đình chúng tôi trong ngày vui trọng đại này.
          </p>

          {/* Hall & Venue Highlight Box */}
          <div className="my-8 p-6 bg-gradient-to-r from-wedding-rose-50/80 via-wedding-cream to-wedding-rose-50/80 rounded-2xl border border-wedding-gold/30 max-w-xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
              Địa Điểm Đón Tiếp
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-wedding-burgundy">
              {hallName}
            </div>
            <div className="text-sm font-medium text-stone-700 mt-1">
              {venueName}
            </div>
            <div className="text-xs text-wedding-rose-700 font-semibold mt-2">
              Thời gian: {weddingDateFormatted}
            </div>
          </div>

          {/* Quick Copy Link to send personalized invitation */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleShareLink}
              className="px-5 py-2.5 bg-wedding-burgundy text-wedding-gold-light hover:bg-wedding-rose-900 rounded-full text-xs font-medium flex items-center space-x-2 shadow transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép liên kết thiệp!' : 'Sao chép link thiệp gửi ' + roleData.prefix}</span>
            </button>
          </div>
        </div>

        {/* Demo Switcher Pill: Lets user easily preview different roles (Bạn, Anh, Chị, Cô, Chú, Bác) */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-stone-200/80 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
            <Users className="w-4 h-4 text-wedding-rose-600" />
            <span>Thử Nghiệm Danh Xưng Thiệp Cưới (Bạn / Anh / Chị / Cô / Chú / Bác):</span>
          </div>

          <form onSubmit={handleApplyCustomGuest} className="flex flex-col sm:flex-row gap-3 items-center">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as GuestRole)}
              className="w-full sm:w-44 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-rose-400 font-medium text-stone-700"
            >
              <option value="ban">Bạn Bè</option>
              <option value="anh">Anh</option>
              <option value="chi">Chị</option>
              <option value="co">Cô</option>
              <option value="chu">Chú</option>
              <option value="bac">Bác</option>
              <option value="dong_nghiep">Đồng Nghiệp</option>
              <option value="gia_dinh">Gia Đình</option>
            </select>

            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Nhập tên khách mời..."
              className="w-full sm:flex-1 px-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-rose-400 text-stone-800"
            />

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 bg-wedding-rose-600 hover:bg-wedding-rose-700 text-white text-xs font-medium rounded-lg shadow cursor-pointer transition-colors"
            >
              Cập Nhật Thiệp
            </button>
          </form>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-stone-100">
            <span className="text-[11px] text-stone-500 self-center">Chọn nhanh:</span>
            {[
              { label: 'Anh Tuấn', role: 'anh' as GuestRole },
              { label: 'Chị Mai', role: 'chi' as GuestRole },
              { label: 'Cô Lan', role: 'co' as GuestRole },
              { label: 'Chú Hùng', role: 'chu' as GuestRole },
              { label: 'Bác Thành', role: 'bac' as GuestRole },
              { label: 'Bạn Thân', role: 'ban' as GuestRole },
            ].map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setCustomName(p.label);
                  setSelectedRole(p.role);
                  onRoleChange(p.label, p.role);
                }}
                className="px-2.5 py-1 bg-stone-100 hover:bg-wedding-rose-100 text-stone-700 hover:text-wedding-rose-800 text-[11px] rounded-md transition-colors cursor-pointer"
              >
                {p.label} ({ROLE_CONFIG[p.role].label})
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

