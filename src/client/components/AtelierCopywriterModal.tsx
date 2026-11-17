import React, { useState } from 'react';
import { Sparkles, Check, Copy, Wand2, X, Feather, Crown, Heart, BookOpen, Globe } from 'lucide-react';

interface AtelierCopywriterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (invitationText: string) => void;
  groomName: string;
  brideName: string;
  weddingDateFormatted: string;
  venueName: string;
}

export const COPY_TEMPLATES = [
  {
    id: 'royal',
    title: 'Hoàng Gia & Trang Trọng',
    subtitle: 'Mực thước, thành kính, tôn vinh truyền thống và sự có mặt của hai họ',
    icon: Crown,
    badge: 'Khuyên Dùng Cho Họ Hàng',
    text: (g: string, b: string, d: string, v: string) =>
      `Trong niềm hân hoan và sự chúc phúc của hai bên gia đình, ${g} & ${b} trân trọng kính mời quý khách đến chứng kiến giây phút chúng con trao nhau lời nguyện ước trăm năm và cùng chung vui trong tiệc cưới thân mật diễn ra vào ${d} tại ${v}.\n\nSự hiện diện và lời chúc phúc của quý khách là niềm vinh hạnh to lớn cho gia đình chúng tôi!`,
  },
  {
    id: 'poetic',
    title: 'Nàng Thơ & Lãng Mạn',
    subtitle: 'Thơ mộng, dịu dàng, gửi gắm lời hẹn ước tình yêu tinh khôi',
    icon: Heart,
    badge: 'Phong Cách Nàng Thơ',
    text: (g: string, b: string, d: string, v: string) =>
      `Người ta bảo, tình yêu đẹp nhất là khi hai tâm hồn tìm thấy chốn bình yên nơi nhau. Sau những năm tháng đồng hành, ${g} & ${b} đã sẵn sàng cùng nhau bước sang một chương mới của cuộc đời.\n\nChúng mình rất mong được đón tiếp bạn tại ${v} vào ngày ${d} để cùng sẻ chia khoảnh khắc thiêng liêng và ngọt ngào này!`,
  },
  {
    id: 'modern',
    title: 'Tạp Chí Cưới Tối Giản',
    subtitle: 'Súc tích, thanh lịch, chuẩn mực phong cách quốc tế hiện đại',
    icon: BookOpen,
    badge: 'Hiện Đại & Tinh Tế',
    text: (g: string, b: string, d: string, v: string) =>
      `Chúng tôi sắp làm đám cưới!\n\n${g} & ${b} trân trọng mời bạn đến chung vui trong ngày trọng đại của chúng mình.\n\nThời gian: ${d}\nĐịa điểm: ${v}\n\nSự hiện diện của bạn là mảnh ghép hoàn hảo nhất cho ngày vui của chúng mình.`,
  },
  {
    id: 'friends',
    title: 'Thân Mật & Tiệc Bạn Bè',
    subtitle: 'Gần gũi, ấm áp, hân hoan quẩy hết mình cùng hội bạn thân',
    icon: Feather,
    badge: 'Dành Cho Bạn Thân',
    text: (g: string, b: string, d: string, v: string) =>
      `Tụi mình chính thức "về chung một nhà" rồi đây!\n\nHành trình tình yêu của ${g} & ${b} không thể trọn vẹn nếu thiếu đi nụ cười và sự chúc phúc của bạn. Hãy đến nâng ly và "quẩy" hết mình cùng chúng mình vào ${d} tại ${v} nhé!`,
  },
  {
    id: 'bilingual',
    title: 'Song Ngữ Hoàng Gia (Bilingual EN/VI)',
    subtitle: 'Lịch thiệp, chuẩn mực cho đám cưới có bạn bè và đối tác quốc tế',
    icon: Globe,
    badge: 'Song Ngữ Anh - Việt',
    text: (g: string, b: string, d: string, v: string) =>
      `Trân trọng kính mời quý khách đến dự tiệc cưới thân mật của ${g} & ${b} vào ngày ${d} tại ${v}.\n\nTogether with their families, ${g} & ${b} request the pleasure of your company at the celebration of their wedding on ${d} at ${v}.\nYour presence will make our special day truly unforgettable!`,
  },
];

export const AtelierCopywriterModal: React.FC<AtelierCopywriterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  groomName,
  brideName,
  weddingDateFormatted,
  venueName,
}) => {
  const [selectedId, setSelectedId] = useState<string>('royal');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentTemplate = COPY_TEMPLATES.find((t) => t.id === selectedId) || COPY_TEMPLATES[0];
  const renderedText = currentTemplate.text(
    groomName || 'Chú Rể',
    brideName || 'Cô Dâu',
    weddingDateFormatted || 'ngày cưới',
    venueName || 'Trung tâm tiệc cưới'
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(renderedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onApply(renderedText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-[#FFFDF9] border border-stone-200 rounded-3xl max-w-2xl w-full p-5 sm:p-7 space-y-5 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3.5 flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B1A32] to-[#722235] text-amber-200 flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                Atelier Copywriter — Trợ Lý Soạn Lời Mời Cưới
              </h3>
              <p className="text-xs text-[#A2682A] font-medium">
                Văn phong tinh tuyển chuẩn mực từ các nhà thiết kế cưới cao cấp
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Style Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 flex-shrink-0">
          {COPY_TEMPLATES.map((tpl) => {
            const Icon = tpl.icon;
            const isSelected = selectedId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setSelectedId(tpl.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#8B1A32] bg-rose-50/60 ring-2 ring-[#8B1A32]/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#8B1A32]' : 'text-stone-500'}`} />
                  {tpl.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-[#A2682A]">
                      {tpl.badge}
                    </span>
                  )}
                </div>
                <div>
                  <span className={`block font-serif text-xs font-bold ${isSelected ? 'text-[#8B1A32]' : 'text-stone-800'}`}>
                    {tpl.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Rendered Preview Box */}
        <div className="flex-1 overflow-y-auto space-y-2 bg-stone-50/70 p-4 rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A2682A]">
              Lời Mời Đã Tự Động Điền Tên & Địa Điểm Của Bạn:
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center space-x-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã Chép' : 'Sao Chép'}</span>
            </button>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-xs font-serif text-sm leading-relaxed text-stone-800 whitespace-pre-line italic">
            "{renderedText}"
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-200 flex-shrink-0">
          <p className="text-xs text-stone-500">
            Bấm <strong>Áp Dụng</strong> để tự động thay thế vào ô Lời Mời Của Tiệc.
          </p>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1A32] via-[#722235] to-[#551020] text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center space-x-1.5 cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-200" />
              <span>Áp Dụng Lời Văn Này</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
