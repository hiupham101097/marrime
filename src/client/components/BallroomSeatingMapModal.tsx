import React, { useState } from 'react';
import { X, Sparkles, MapPin, Users, Heart, Crown, Check, Navigation, Info } from 'lucide-react';
import { WeddingSide } from '../../shared/types';

interface BallroomSeatingMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  guestTable?: string;
  guestSide?: WeddingSide;
  venueName?: string;
  hallName?: string;
  groomName: string;
  brideName: string;
}

interface TableLayoutItem {
  id: string;
  number: string;
  name: string;
  side: 'groom' | 'bride' | 'common';
  isVip?: boolean;
  seats: number;
  description: string;
}

export const BallroomSeatingMapModal: React.FC<BallroomSeatingMapModalProps> = ({
  isOpen,
  onClose,
  guestName,
  guestTable,
  guestSide,
  venueName = 'Riverside Palace',
  hallName = 'Sảnh Grand Ballroom (Tầng 3)',
  groomName,
  brideName,
}) => {
  if (!isOpen) return null;

  // Standard 12-table royal wedding layout
  const tables: TableLayoutItem[] = [
    {
      id: 't-1',
      number: '01',
      name: 'Bàn VIP 1 (Họ Nhà Trai)',
      side: 'groom',
      isVip: true,
      seats: 10,
      description: 'Dành riêng cho Đấng sinh thành, Ông Bà và Đại diện gia tộc Họ Nhà Trai',
    },
    {
      id: 't-2',
      number: '02',
      name: 'Bàn VIP 2 (Họ Nhà Gái)',
      side: 'bride',
      isVip: true,
      seats: 10,
      description: 'Dành riêng cho Đấng sinh thành, Ông Bà và Đại diện gia tộc Họ Nhà Gái',
    },
    {
      id: 't-3',
      number: '03',
      name: 'Bàn Bác & Cô Chú Họ Trai',
      side: 'groom',
      seats: 10,
      description: 'Họ hàng thân tộc bên Nhà Trai',
    },
    {
      id: 't-4',
      number: '04',
      name: 'Bàn Bác & Cô Chú Họ Gái',
      side: 'bride',
      seats: 10,
      description: 'Họ hàng thân tộc bên Nhà Gái',
    },
    {
      id: 't-5',
      number: '05',
      name: 'Bàn Anh Chị Em Họ Trai',
      side: 'groom',
      seats: 10,
      description: 'Anh em họ và người thân trẻ tuổi Nhà Trai',
    },
    {
      id: 't-6',
      number: '06',
      name: 'Bàn Anh Chị Em Họ Gái',
      side: 'bride',
      seats: 10,
      description: 'Anh em họ và người thân trẻ tuổi Nhà Gái',
    },
    {
      id: 't-7',
      number: '07',
      name: 'Bàn Đồng Nghiệp Chú Rể',
      side: 'groom',
      seats: 10,
      description: 'Đồng nghiệp công ty và đối tác công việc',
    },
    {
      id: 't-8',
      number: '08',
      name: 'Bàn Đồng Nghiệp Cô Dâu',
      side: 'bride',
      seats: 10,
      description: 'Đồng nghiệp công ty và bạn bè cơ quan',
    },
    {
      id: 't-9',
      number: '09',
      name: 'Bàn Bạn Đại Học & Cấp 3 (Rể)',
      side: 'groom',
      seats: 10,
      description: 'Hội bạn chí cốt thời học sinh & sinh viên Chú Rể',
    },
    {
      id: 't-10',
      number: '10',
      name: 'Bàn Bạn Thân & Phù Dâu (Dâu)',
      side: 'bride',
      seats: 10,
      description: 'Hội bạn thân thiết & các nàng dâu phụ',
    },
    {
      id: 't-11',
      number: '11',
      name: 'Bàn Bạn Bè Chung & Đối Tác',
      side: 'common',
      seats: 10,
      description: 'Bạn bè chung của hai bạn trẻ & khách quý',
    },
    {
      id: 't-12',
      number: '12',
      name: 'Bàn Khách Mời Tự Do & Gia Đình',
      side: 'common',
      seats: 10,
      description: 'Bàn dự phòng đón tiếp quan khách thân tình',
    },
  ];

  // Clean guest table string (extract number like '6' from 'Bàn 6' or '06')
  const cleanGuestTableNum = guestTable ? guestTable.replace(/\D/g, '').padStart(2, '0') : null;
  const initialSelected = tables.find((t) => t.number === cleanGuestTableNum) || tables[0];
  const [selectedTable, setSelectedTable] = useState<TableLayoutItem>(initialSelected);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-stone-300 rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#DFB76C] to-[#9C7328] text-stone-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <Crown size={20} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  Sơ Đồ Bàn Tiệc Hoàng Gia · Seating Map
                </span>
                <span className="text-stone-500">·</span>
                <span className="text-[10px] text-stone-300">{hallName}</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                Vị Trí Chỗ Ngồi Của Quý Quan Khách
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Đóng sơ đồ bàn tiệc"
          >
            <X size={20} />
          </button>
        </div>

        {/* Guest Highlight Notification Banner */}
        {cleanGuestTableNum && (
          <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center space-x-2">
              <Sparkles size={14} className="text-amber-600 shrink-0" />
              <span>
                Kính gửi <strong>{guestName}</strong>: Bàn tiệc dành riêng cho bạn là{' '}
                <strong className="text-[#8B1A32] underline decoration-amber-400 decoration-2">
                  Bàn số {cleanGuestTableNum}
                </strong>
                . Bàn tiệc đang nhấp nháy phát sáng trên sơ đồ!
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const target = tables.find((t) => t.number === cleanGuestTableNum);
                if (target) setSelectedTable(target);
              }}
              className="text-[11px] font-bold text-[#8B1A32] hover:underline shrink-0 ml-2 cursor-pointer"
            >
              Xem ngay →
            </button>
          </div>
        )}

        {/* Interactive Floor Plan Canvas / Stage View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50/70 space-y-6">
          {/* Stage Front & Catwalk representation */}
          <div className="max-w-xl mx-auto space-y-3">
            {/* The Main Stage */}
            <div className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#5C0E1F] via-[#8B1A32] to-[#5C0E1F] text-white text-center shadow-lg border border-amber-300/40 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
              <span className="text-[10px] font-bold text-amber-300 tracking-[0.25em] uppercase block">
                MAIN WEDDING STAGE
              </span>
              <h4 className="font-serif text-sm sm:text-base font-bold text-amber-100 mt-0.5">
                SÂN KHẤU CHÍNH &amp; LỄ ĐƯỜNG THÀNH HÔN
              </h4>
              <p className="text-[11px] text-rose-200 font-light mt-0.5">
                {groomName} &amp; {brideName}
              </p>
            </div>

            {/* Catwalk Floral Aisle */}
            <div className="w-16 h-8 mx-auto bg-gradient-to-b from-[#DFB76C] to-[#C59A4E] rounded-md shadow-xs flex items-center justify-center">
              <span className="text-[8px] font-bold text-amber-950 uppercase tracking-tighter">
                ĐƯỜNG HOA
              </span>
            </div>
          </div>

          {/* Tables Grid Layout */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold uppercase tracking-wider mb-3 px-2">
              <span className="flex items-center space-x-1.5 text-[#8B1A32]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B1A32]" />
                <span>Khu Vực Họ Nhà Trai (Bên Trái)</span>
              </span>
              <span className="flex items-center space-x-1.5 text-amber-700">
                <span>Khu Vực Họ Nhà Gái (Bên Phải)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {tables.map((t) => {
                const isAssigned = cleanGuestTableNum === t.number;
                const isSelected = selectedTable.id === t.id;

                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTable(t)}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer relative group flex items-start space-x-3 ${
                      isSelected
                        ? 'border-[#8B1A32] bg-white ring-2 ring-[#8B1A32]/40 shadow-md'
                        : isAssigned
                        ? 'border-amber-400 bg-amber-50/70 shadow-sm'
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-2xs'
                    }`}
                  >
                    {/* Circular Table Icon representation */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0 flex flex-col items-center justify-center font-serif text-sm font-bold shadow-xs relative transition-transform group-hover:scale-105 ${
                        isAssigned
                          ? 'bg-gradient-to-br from-[#DFB76C] to-[#A2682A] text-white ring-4 ring-amber-300 animate-pulse'
                          : t.isVip
                          ? 'bg-[#8B1A32] text-amber-200'
                          : t.side === 'groom'
                          ? 'bg-rose-50 text-[#8B1A32] border border-rose-200'
                          : t.side === 'bride'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-tighter opacity-80 font-sans">
                        BÀN
                      </span>
                      <span className="leading-none">{t.number}</span>
                      {t.isVip && (
                        <Crown size={9} className="absolute -top-1 text-amber-300 fill-amber-300" />
                      )}
                    </div>

                    {/* Table Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-1.5">
                        <h5 className="font-serif text-xs font-bold text-stone-900 truncate">
                          {t.name}
                        </h5>
                      </div>
                      <span className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                        {t.description}
                      </span>
                      {isAssigned && (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-[#8B1A32] mt-1">
                          <Check size={11} strokeWidth={3} />
                          <span>Bàn tiệc của bạn</span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Table Drawer Card */}
          <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-lg bg-[#8B1A32] text-amber-200 font-serif font-bold text-xs flex items-center justify-center">
                  {selectedTable.number}
                </span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900">
                    {selectedTable.name}
                  </h4>
                  <span className="text-[10px] text-stone-500">
                    Sức chứa: 10 khách · Tiêu chuẩn mâm tiệc 5 sao
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold">
                {selectedTable.side === 'groom'
                  ? 'Họ Nhà Trai'
                  : selectedTable.side === 'bride'
                  ? 'Họ Nhà Gái'
                  : 'Khách Chung'}
              </span>
            </div>

            <p className="text-xs text-stone-600 font-light leading-relaxed">
              <strong className="text-stone-800 font-semibold">Gợi ý di chuyển:</strong> Bước vào từ
              cửa chính đại sảnh {hallName}, đi theo hành lang hoa hướng về sân khấu chính. Bàn số{' '}
              {selectedTable.number} nằm ở khu vực{' '}
              {selectedTable.side === 'groom'
                ? 'bên cánh trái'
                : selectedTable.side === 'bride'
                ? 'bên cánh phải'
                : 'trung tâm đại sảnh'}
              .
            </p>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 border-t border-stone-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-stone-500">
            <Info size={14} className="text-wedding-rose-600 shrink-0" />
            <span>Ban lễ tân tại sảnh tiệc sẽ hỗ trợ đón tiếp và dẫn quý khách vào đúng bàn.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Đã Hiểu &amp; Đóng Sơ Đồ
          </button>
        </div>
      </div>
    </div>
  );
};
