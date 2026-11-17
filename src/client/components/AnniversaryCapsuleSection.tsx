import React, { useState, useEffect } from 'react';
import {
  Clock,
  Heart,
  Lock,
  Unlock,
  Sparkles,
  Gift,
  Calendar,
  Hourglass,
  Crown,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerHaptic } from '../utils/soundEffects';

interface AnniversaryCapsuleSectionProps {
  weddingDateIso: string;
  weddingDateFormatted: string;
  groomName: string;
  brideName: string;
}

interface CapsuleItem {
  id: string;
  years: number;
  title: string;
  sub: string;
  traditionalName: string;
  message: string;
  isUnlockedDefault?: boolean;
}

export const AnniversaryCapsuleSection: React.FC<AnniversaryCapsuleSectionProps> = ({
  weddingDateIso,
  weddingDateFormatted,
  groomName,
  brideName,
}) => {
  const [daysTogether, setDaysTogether] = useState<number>(0);
  const [hoursTogether, setHoursTogether] = useState<number>(0);
  const [minutesTogether, setMinutesTogether] = useState<number>(0);
  const [selectedCapsule, setSelectedCapsule] = useState<CapsuleItem | null>(null);

  const cleanGroom = groomName || 'Tuấn Anh';
  const cleanBride = brideName || 'Mai Phương';

  // Calculate elapsed time since wedding
  useEffect(() => {
    const updateTime = () => {
      const weddingTime = new Date(weddingDateIso || '2026-11-20T11:00:00').getTime();
      const now = Date.now();
      const diffMs = Math.max(0, now - weddingTime);

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

      setDaysTogether(days);
      setHoursTogether(hours);
      setMinutesTogether(minutes);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [weddingDateIso]);

  const CAPSULES: CapsuleItem[] = [
    {
      id: 'cap-1',
      years: 1,
      title: 'Kỷ Niệm 1 Năm',
      traditionalName: 'Đám Cưới Giấy (Paper Anniversary)',
      sub: 'Mở khóa sau 365 ngày chung đôi',
      message:
        `Gửi ${cleanGroom} & ${cleanBride} của 1 năm sau,\n\n` +
        `Một năm đầu tiên của hôn nhân chắc hẳn đã có biết bao bỡ ngỡ nhưng cũng ngập tràn những tiếng cười hạnh phúc trong căn bếp nhỏ. Hai bạn đã cùng nhau vượt qua những thử thách đầu tiên của cuộc sống gia đình.\n\n` +
        `Hãy mở lại chiếc thiệp cưới này, xem lại những bức ảnh ngày chung đôi và những lời chúc của cha mẹ, bạn bè để tiếp tục thắp sáng ngọn lửa yêu thương nhé! 💍`,
    },
    {
      id: 'cap-2',
      years: 5,
      title: 'Kỷ Niệm 5 Năm',
      traditionalName: 'Đám Cưới Gỗ (Wood Anniversary)',
      sub: 'Mở khóa sau 1.825 ngày gắn kết',
      message:
        `Gửi đôi uyên ương của 5 năm sau,\n\n` +
        `Năm năm qua, tình yêu của hai bạn đã bén rễ sâu như cây cổ thụ vững chãi, trải qua nắng mưa vẫn xanh tươi bóng mát. Có thể mái ấm nhỏ lúc này đã rộn rã thêm tiếng cười của những thiên thần nhỏ.\n\n` +
        `Chúc hai bạn luôn giữ trọn lời hẹn ước thiêng liêng ngày nào, cùng nắm tay nhau đi qua thêm nhiều thập kỷ bình yên và viên mãn! 🌳`,
    },
    {
      id: 'cap-3',
      years: 10,
      title: 'Kỷ Niệm 10 Năm',
      traditionalName: 'Đám Cưới Thiếc (Tin Anniversary)',
      sub: 'Mở khóa sau 3.650 ngày đồng hành',
      message:
        `Gửi hai vợ chồng của 10 năm sau,\n\n` +
        `Một thập kỷ trọn vẹn của tình nghĩa vợ chồng son sắt! Mười năm không chỉ là tình yêu đôi lứa mà là tình tri kỷ, sự thấu hiểu và lòng bao dung vô bờ bến.\n\n` +
        `Hôm nay, hãy cùng nâng ly chúc mừng cho hành trình kỳ diệu mà hai bạn đã cùng nhau kiến tạo. Bách niên giai lão, trăm năm hạnh phúc! ✦`,
    },
  ];

  const handleOpenCapsule = (cap: CapsuleItem) => {
    setSelectedCapsule(cap);
    triggerHaptic([30, 50]);
    void confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#DFB76C', '#8B1A32', '#FDE047'],
    });
  };

  return (
    <section id="anniversary-capsule" className="py-14 sm:py-20 bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5] border-t border-[#DFB76C]/30 relative overflow-hidden select-none">
      {/* Background Filigree Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(223,183,108,0.15)_0%,transparent_70%)]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-[#8B1A32] text-xs font-bold shadow-2xs">
            <Hourglass className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="uppercase tracking-widest text-[10px]">Hộp Ký Ức Trăm Năm • Memory Capsule</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Kỷ Vật Tình Yêu Vĩnh Cửu
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            Thiệp cưới Marrime không chỉ dành cho một ngày hôn lễ, mà là không gian số lưu giữ vĩnh hằng từng lời chúc, album ảnh và những lá thư gửi tới tương lai của {cleanGroom} & {cleanBride}.
          </p>
        </div>

        {/* Days of Eternal Love Counter Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#2D0B14] via-[#4A1020] to-[#24060E] border-2 border-[#DFB76C] text-white shadow-xl max-w-3xl mx-auto text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-2 right-4 text-[#DFB76C]/20 text-3xl font-serif">❧ ✦ ☙</div>

          <span className="text-[11px] uppercase tracking-widest font-bold text-amber-300/90 block">
            HÀNH TRÌNH CHUNG ĐÔI • DAYS OF ETERNAL LOVE
          </span>

          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-5xl font-bold text-amber-100">
                {daysTogether}
              </span>
              <span className="text-[10px] sm:text-xs text-[#DFB76C] uppercase font-bold block">Ngày</span>
            </div>

            <span className="text-2xl sm:text-4xl font-serif text-[#DFB76C]/60">:</span>

            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-5xl font-bold text-amber-100">
                {hoursTogether}
              </span>
              <span className="text-[10px] sm:text-xs text-[#DFB76C] uppercase font-bold block">Giờ</span>
            </div>

            <span className="text-2xl sm:text-4xl font-serif text-[#DFB76C]/60">:</span>

            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-5xl font-bold text-amber-100">
                {minutesTogether}
              </span>
              <span className="text-[10px] sm:text-xs text-[#DFB76C] uppercase font-bold block">Phút</span>
            </div>
          </div>

          <p className="text-xs text-amber-200/90 italic font-serif">
            "Từ ngày {weddingDateFormatted}, hai trái tim đã chính thức hòa chung một nhịp đập."
          </p>
        </div>

        {/* 3 Time Lock Capsules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CAPSULES.map((cap) => (
            <div
              key={cap.id}
              className="p-6 rounded-3xl bg-white border-2 border-stone-200 hover:border-[#DFB76C] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#8B1A32] text-[10px] font-bold">
                    {cap.title}
                  </span>
                  <Lock className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {cap.traditionalName}
                </h3>

                <p className="text-xs text-stone-500 font-light">
                  {cap.sub}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenCapsule(cap)}
                className="w-full py-2.5 rounded-xl border border-stone-300 hover:border-[#8B1A32] text-xs font-bold text-[#8B1A32] group-hover:bg-[#8B1A32] group-hover:text-white transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Mở Khóa Kỷ Vật</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Capsule Content Modal */}
      {selectedCapsule && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none">
          <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border-2 border-[#DFB76C] shadow-2xl overflow-hidden my-auto p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DFB76C] to-[#A2682A] text-[#4A1020] flex items-center justify-center mx-auto shadow-md">
                <Unlock className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#A2682A] block">
                {selectedCapsule.traditionalName}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#8B1A32]">
                Lá Thư Gửi Tương Lai ({selectedCapsule.title})
              </h3>
            </div>

            <blockquote className="font-serif text-sm leading-relaxed text-stone-800 italic whitespace-pre-line p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
              {selectedCapsule.message}
            </blockquote>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setSelectedCapsule(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-100 font-serif text-xs font-bold shadow-md cursor-pointer hover:opacity-95"
              >
                Đóng Kỷ Vật
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
