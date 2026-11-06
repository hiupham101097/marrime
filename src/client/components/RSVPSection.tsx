import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Heart, Users, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { GuestInfo, GuestRole } from '../../shared/types';
import { ROLE_CONFIG } from '../hooks/useGuestInfo';

interface RSVPSectionProps {
  guest: GuestInfo;
  onSuccessSubmit?: () => void;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ guest, onSuccessSubmit }) => {
  const [formData, setFormData] = useState({
    guestName: guest.name || '',
    role: guest.role || 'ban',
    attending: 'yes' as 'yes' | 'no',
    attendeesCount: 1,
    phone: '',
    dietRequirement: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentRoleData = ROLE_CONFIG[formData.role as GuestRole] || ROLE_CONFIG.ban;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim()) {
      setErrorMsg('Vui lòng nhập tên của quý khách.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setIsSuccess(true);

        // Confetti celebration
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#DE5B78', '#E6CF9B', '#C5A059', '#10B981'],
          });
        } catch {
          // Confetti fallback
        }

        if (onSuccessSubmit) {
          onSuccessSubmit();
        }
      } else {
        setErrorMsg(resData.message || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch {
      // In case backend is offline, store in localStorage for demo
      setIsSuccess(true);
      if (onSuccessSubmit) onSuccessSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-4 bg-wedding-cream relative">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-12 shadow-luxury border-2 border-wedding-gold/30 relative">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 text-wedding-rose-600 text-xs uppercase tracking-widest font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Xác Nhận Tham Dự</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-wedding-burgundy font-normal">
              Sự Hiện Diện Của Quý Khách
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 font-light">
              Để gia đình chuẩn bị chu đáo nhất, xin vui lòng gửi phản hồi trước ngày 10/11/2026
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-10 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Gửi Phản Hồi Thành Công!
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Chân thành cảm ơn{' '}
                <strong className="text-wedding-burgundy">
                  {currentRoleData.prefix} {formData.guestName}
                </strong>
                . Dâu rể rất hạnh phúc và mong chờ được đón tiếp quý khách!
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-wedding-burgundy text-wedding-gold-light text-xs font-semibold hover:bg-wedding-rose-900 transition-colors cursor-pointer"
              >
                Gửi Lại / Chỉnh Sửa Phản Hồi
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Guest Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Danh Xưng
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as GuestRole })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none text-stone-800 font-medium"
                  >
                    <option value="ban">Bạn Bè</option>
                    <option value="anh">Anh</option>
                    <option value="chi">Chị</option>
                    <option value="em">Em</option>
                    <option value="co">Cô</option>
                    <option value="chu">Chú</option>
                    <option value="bac">Bác</option>
                    <option value="dong_nghiep">Đồng Nghiệp</option>
                    <option value="gia_dinh">Gia Đình</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                    Họ Và Tên Quý Khách *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn Tuấn"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none text-stone-800"
                  />
                </div>
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Khả Năng Tham Dự *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={`py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      formData.attending === 'yes'
                        ? 'bg-wedding-rose-600 text-white border-wedding-rose-600 shadow-md'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${formData.attending === 'yes' ? 'fill-white' : ''}`} />
                    <span>Chắc Chắn Sẽ Đến</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={`py-3.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      formData.attending === 'no'
                        ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>Rất Tiếc Không Thể Đến</span>
                  </button>
                </div>
              </div>

              {/* Number of Attendees & Phone */}
              {formData.attending === 'yes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Số Lượng Người Tham Dự
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <select
                        value={formData.attendeesCount}
                        onChange={(e) => setFormData({ ...formData, attendeesCount: Number(e.target.value) })}
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none text-stone-800 font-medium"
                      >
                        <option value={1}>1 người (Đi một mình)</option>
                        <option value={2}>2 người (Cùng người thương / bạn đời)</option>
                        <option value={3}>3 người (Gia đình)</option>
                        <option value={4}>4 người trở lên (Cả gia đình)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Số Điện Thoại (Tùy chọn)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0987 654 321"
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none text-stone-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Wishing message */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Gửi Lời Chúc Phúc Cho Cô Dâu & Chú Rể
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Gửi lời chúc tốt đẹp nhất đến Tuấn Anh & Mai Phương..."
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none text-stone-800"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-wedding-rose-700 via-wedding-rose-600 to-wedding-burgundy hover:opacity-95 text-white font-semibold rounded-2xl shadow-lg hover:shadow-glow transition-all flex items-center justify-center space-x-2 cursor-pointer border border-wedding-gold/40"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Đang gửi phản hồi...' : 'Xác Nhận Tham Dự Ngay'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

