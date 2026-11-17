import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Copy,
  Check,
  Send,
  Trash2,
  FileSpreadsheet,
  Search,
  Sparkles,
  Download,
  ExternalLink,
  Table as TableIcon,
  X,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Heart,
  ChevronDown,
  QrCode,
} from 'lucide-react';
import { GuestItem, GuestRole, WeddingSide, GuestInviteStatus } from '../../shared/types';
import { ROLE_CONFIG } from '../hooks/useGuestInfo';
import { downloadInviteCard } from '../utils/inviteCardCanvas';
import { ReceptionCheckInModal } from './ReceptionCheckInModal';

interface GuestCrmManagerProps {
  guests: GuestItem[];
  onUpdateGuests: (guests: GuestItem[]) => void;
  weddingSlug: string;
  groomName: string;
  brideName: string;
  weddingDateFormatted?: string;
  venueName?: string;
  hallName?: string;
}

export const STATUS_CONFIG: Record<GuestInviteStatus, { label: string; badgeClass: string }> = {
  pending: { label: 'Chưa Gửi', badgeClass: 'bg-stone-100 text-stone-600 border-stone-200' },
  sent: { label: 'Đã Gửi', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  viewed: { label: 'Đã Xem', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
  confirmed: { label: 'Sẽ Đi', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  checked_in: { label: 'Đã Đến Tiệc', badgeClass: 'bg-teal-600 text-white border-teal-700 font-bold shadow-2xs' },
  declined: { label: 'Báo Bận', badgeClass: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export const SIDE_CONFIG: Record<WeddingSide, { label: string; ceremony: 'LỄ THÀNH HÔN' | 'LỄ VU QUY' | 'LỄ BÁO HỶ'; badgeClass: string }> = {
  both: { label: 'Cả Hai Bên', ceremony: 'LỄ THÀNH HÔN', badgeClass: 'bg-stone-100 text-stone-700' },
  groom: { label: 'Nhà Trai', ceremony: 'LỄ THÀNH HÔN', badgeClass: 'bg-rose-50 text-[#8B1A32] border border-rose-200' },
  bride: { label: 'Nhà Gái (Vu Quy)', ceremony: 'LỄ VU QUY', badgeClass: 'bg-amber-50 text-[#A2682A] border border-amber-200' },
};

export const GuestCrmManager: React.FC<GuestCrmManagerProps> = ({
  guests,
  onUpdateGuests,
  weddingSlug,
  groomName,
  brideName,
  weddingDateFormatted = 'Chủ Nhật, 20/11/2026',
  venueName = 'Riverside Palace',
  hallName = 'Sảnh Grand Ballroom',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'groom' | 'bride' | 'pending' | 'confirmed' | 'checked_in'>('all');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<GuestRole>('ban');
  const [newSide, setNewSide] = useState<WeddingSide>('both');
  const [newTable, setNewTable] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedZaloId, setCopiedZaloId] = useState<string | null>(null);
  const [renderingImageId, setRenderingImageId] = useState<string | null>(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkInput, setBulkInput] = useState('');
  const [isReceptionModalOpen, setIsReceptionModalOpen] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://marrime.pages.dev';

  const generateGuestUrl = (guest: GuestItem): string => {
    const params = new URLSearchParams();
    params.set('w', weddingSlug);
    params.set('gid', guest.id);
    params.set('guest', guest.name);
    params.set('role', guest.role);
    if (guest.side && guest.side !== 'both') params.set('side', guest.side);
    if (guest.tableNumber) params.set('table', guest.tableNumber);
    return `${baseUrl}/?${params.toString()}`;
  };

  const generateZaloMessage = (guest: GuestItem): string => {
    const rolePrefix = ROLE_CONFIG[guest.role]?.prefix || 'Bạn';
    const link = generateGuestUrl(guest);
    const sideName = guest.side === 'bride' ? 'Lễ Vu Quy' : (guest.side === 'groom' ? 'Lễ Thành Hôn' : 'Lễ Cưới');
    const tableInfo = guest.tableNumber ? `\n📍 Bàn tiệc dành riêng cho ${rolePrefix}: Bàn số ${guest.tableNumber}` : '';
    return `Trân trọng gửi ${rolePrefix} ${guest.name}!\n\n${groomName} & ${brideName} rất vui mừng được gửi tấm thiệp cưới online độc bản cho ${sideName} đến ${rolePrefix}.\nSự hiện diện của ${rolePrefix} là niềm vinh hạnh to lớn của hai đứa mình trong ngày trọng đại!\n${tableInfo}\n\n👉 Bấm mở thiệp cưới 3D tại đây: ${link}`;
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newGuest: GuestItem = {
      id: 'g_' + Date.now() + Math.random().toString(36).substring(2, 6),
      name: newName.trim(),
      role: newRole,
      side: newSide,
      status: 'pending',
      tableNumber: newTable.trim() || undefined,
      phone: newPhone.trim() || undefined,
    };

    onUpdateGuests([newGuest, ...guests]);
    setNewName('');
    setNewTable('');
    setNewPhone('');
  };

  const handleToggleStatus = (guestId: string) => {
    const statusCycle: GuestInviteStatus[] = ['pending', 'sent', 'confirmed', 'checked_in', 'declined'];
    const updated = guests.map((g) => {
      if (g.id === guestId) {
        const curStatus = g.status || 'pending';
        const nextIdx = (statusCycle.indexOf(curStatus) + 1) % statusCycle.length;
        return { ...g, status: statusCycle[nextIdx] };
      }
      return g;
    });
    onUpdateGuests(updated);
  };

  const handleDeleteGuest = (id: string) => {
    onUpdateGuests(guests.filter((g) => g.id !== id));
  };

  const handleCopyLink = (guest: GuestItem) => {
    const url = generateGuestUrl(guest);
    navigator.clipboard.writeText(url);
    setCopiedId(guest.id);

    // Auto-advance status to 'sent' if it was pending
    if (!guest.status || guest.status === 'pending') {
      const updated = guests.map((g) => (g.id === guest.id ? { ...g, status: 'sent' as const } : g));
      onUpdateGuests(updated);
    }

    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyZalo = (guest: GuestItem) => {
    const msg = generateZaloMessage(guest);
    navigator.clipboard.writeText(msg);
    setCopiedZaloId(guest.id);

    if (!guest.status || guest.status === 'pending') {
      const updated = guests.map((g) => (g.id === guest.id ? { ...g, status: 'sent' as const } : g));
      onUpdateGuests(updated);
    }

    setTimeout(() => setCopiedZaloId(null), 2500);
  };

  const handleDownloadInviteImage = async (guest: GuestItem) => {
    setRenderingImageId(guest.id);
    try {
      const ceremony = SIDE_CONFIG[guest.side || 'both'].ceremony;
      await downloadInviteCard({
        guestName: guest.name,
        guestRoleLabel: ROLE_CONFIG[guest.role]?.label || '',
        groomName,
        brideName,
        ceremonyType: ceremony,
        weddingDateFormatted,
        venueName,
        hallName,
        tableNumber: guest.tableNumber,
        inviteUrl: generateGuestUrl(guest),
      });
    } catch (err) {
      console.error('Failed to download card:', err);
    } finally {
      setRenderingImageId(null);
    }
  };

  const handleLoadSampleGuests = () => {
    const samples: GuestItem[] = [
      { id: 's1', name: 'Nguyễn Văn Tuấn', role: 'ban', side: 'groom', status: 'confirmed', tableNumber: '01' },
      { id: 's2', name: 'Trần Thị Thu Thảo', role: 'ban', side: 'bride', status: 'sent', tableNumber: '02' },
      { id: 's3', name: 'Bác Ba & Gia Đình', role: 'bac', side: 'groom', status: 'confirmed', tableNumber: 'Họ Trai 01' },
      { id: 's4', name: 'Cô Sáu & Bác Trai', role: 'co', side: 'bride', status: 'sent', tableNumber: 'Họ Gái 01' },
      { id: 's5', name: 'Anh Hoàng Nam', role: 'anh', side: 'both', status: 'pending', tableNumber: 'VIP 02' },
      { id: 's6', name: 'Chị Mai Linh', role: 'chi', side: 'bride', status: 'confirmed', tableNumber: '03' },
      { id: 's7', name: 'Hội Bạn Cấp 3', role: 'dong_nghiep', side: 'groom', status: 'sent', tableNumber: '08' },
    ];
    onUpdateGuests([...samples, ...guests]);
  };

  const handleBulkImport = () => {
    if (!bulkInput.trim()) return;
    const lines = bulkInput.split('\n');
    const newItems: GuestItem[] = [];

    lines.forEach((line) => {
      const clean = line.trim();
      if (!clean) return;

      // Format can be: Name | Role | Side | Table (e.g. Anh Nam | anh | groom | 08)
      const parts = clean.split(/[,|\t]/).map((p) => p.trim());
      const name = parts[0];
      const roleStr = (parts[1] || 'ban').toLowerCase() as GuestRole;
      const role: GuestRole = ROLE_CONFIG[roleStr] ? roleStr : 'ban';
      const sideStr = (parts[2] || 'both').toLowerCase() as WeddingSide;
      const side: WeddingSide = SIDE_CONFIG[sideStr] ? sideStr : 'both';
      const table = parts[3] || undefined;

      if (name) {
        newItems.push({
          id: 'g_' + Date.now() + Math.random().toString(36).substring(2, 6),
          name,
          role,
          side,
          status: 'pending',
          tableNumber: table,
        });
      }
    });

    if (newItems.length > 0) {
      onUpdateGuests([...newItems, ...guests]);
    }
    setBulkInput('');
    setShowBulkModal(false);
  };

  const handleExportCSV = () => {
    if (guests.length === 0) return;
    const headers = ['Họ Tên Khách', 'Danh Xưng', 'Phân Luồng 2 Họ', 'Trạng Thái', 'Bàn Tiệc', 'Số Điện Thoại', 'Link Thiệp Cá Nhân Hóa'];
    const rows = guests.map((g) => [
      `"${g.name.replace(/"/g, '""')}"`,
      `"${ROLE_CONFIG[g.role]?.label || g.role}"`,
      `"${SIDE_CONFIG[g.side || 'both'].label}"`,
      `"${STATUS_CONFIG[g.status || 'pending'].label}"`,
      `"${g.tableNumber || ''}"`,
      `"${g.phone || ''}"`,
      `"${generateGuestUrl(g)}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `danh_sach_khach_marrime_${weddingSlug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalGuests = guests.length;
  const groomGuests = guests.filter((g) => g.side === 'groom').length;
  const brideGuests = guests.filter((g) => g.side === 'bride').length;
  const confirmedGuests = guests.filter((g) => g.status === 'confirmed').length;
  const checkedInGuests = guests.filter((g) => g.status === 'checked_in').length;
  const pendingGuests = guests.filter((g) => !g.status || g.status === 'pending').length;

  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.tableNumber && g.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (activeTab === 'groom') return g.side === 'groom';
    if (activeTab === 'bride') return g.side === 'bride';
    if (activeTab === 'pending') return !g.status || g.status === 'pending';
    if (activeTab === 'confirmed') return g.status === 'confirmed';
    if (activeTab === 'checked_in') return g.status === 'checked_in';
    return true;
  });

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#8B1A32]" />
            <span>Quản Lý Khách Mời & Phân Luồng Thiệp 2 Họ</span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-[#8B1A32] text-xs font-bold">
              {totalGuests} khách
            </span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Phân định rõ Nhà Trai (Lễ Thành Hôn) & Nhà Gái (Lễ Vu Quy), theo dõi trạng thái gửi thiệp và tải ảnh thiệp Zalo 1-chạm.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsReceptionModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs transition-all"
            title="Mở camera quét mã QR đón khách tại cổng sảnh tiệc"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-300" />
            <span>Bàn Lễ Tân Đón Khách (QR)</span>
          </button>

          <button
            type="button"
            onClick={handleLoadSampleGuests}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
            title="Nạp nhanh 7 khách mẫu phân luồng 2 họ để xem thử"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Nạp Khách Mẫu</span>
          </button>

          <button
            type="button"
            onClick={() => setShowBulkModal(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#A2682A] border border-amber-200 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
            title="Dán nhanh danh sách hàng chục khách"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Dán Hàng Loạt</span>
          </button>

          {guests.length > 0 && (
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
              title="Xuất danh sách sang file Excel CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Excel</span>
            </button>
          )}
        </div>
      </div>

      {/* Pipeline Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === 'all' ? 'bg-[#8B1A32] text-white border-[#8B1A32]' : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">Tổng Khách Mời</span>
          <span className="text-xl font-bold font-serif">{totalGuests}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('groom')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === 'groom' ? 'bg-[#8B1A32] text-white border-[#8B1A32]' : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">Nhà Trai (Thành Hôn)</span>
          <span className="text-xl font-bold font-serif">{groomGuests}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bride')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === 'bride' ? 'bg-[#8B1A32] text-white border-[#8B1A32]' : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">Nhà Gái (Vu Quy)</span>
          <span className="text-xl font-bold font-serif">{brideGuests}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('confirmed')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === 'confirmed' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-emerald-50/60 border-emerald-200 hover:bg-emerald-100 text-emerald-900'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">Đã Xác Nhận Đi</span>
          <span className="text-xl font-bold font-serif">{confirmedGuests}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('checked_in')}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeTab === 'checked_in' ? 'bg-teal-700 text-white border-teal-700' : 'bg-teal-50/60 border-teal-200 hover:bg-teal-100 text-teal-900'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">Đã Check-in</span>
          <span className="text-xl font-bold font-serif">{checkedInGuests}</span>
        </button>
      </div>

      {/* Add New Guest Form */}
      <form onSubmit={handleAddGuest} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
        <span className="text-xs font-bold text-stone-700 block">Thêm Khách Mời Mới (Đầy Đủ Phân Luồng):</span>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Họ tên khách (VD: Bác Ba, Anh Hùng)"
            className="sm:col-span-3 px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:border-[#8B1A32]"
            required
          />

          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as GuestRole)}
            className="sm:col-span-2 px-2 py-2 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-900 cursor-pointer focus:outline-none focus:border-[#8B1A32]"
          >
            <option value="ban">Bạn Bè</option>
            <option value="anh">Anh/Chị</option>
            <option value="em">Em</option>
            <option value="co">Cô/Dì</option>
            <option value="chu">Chú</option>
            <option value="bac">Bác</option>
            <option value="dong_nghiep">Đồng Nghiệp</option>
            <option value="gia_dinh">Gia Đình</option>
          </select>

          <select
            value={newSide}
            onChange={(e) => setNewSide(e.target.value as WeddingSide)}
            className="sm:col-span-3 px-2 py-2 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-900 cursor-pointer focus:outline-none focus:border-[#8B1A32]"
          >
            <option value="both">Hai Họ (Chung)</option>
            <option value="groom">Nhà Trai (Lễ Thành Hôn)</option>
            <option value="bride">Nhà Gái (Lễ Vu Quy)</option>
          </select>

          <input
            type="text"
            value={newTable}
            onChange={(e) => setNewTable(e.target.value)}
            placeholder="Bàn (VD: 08, VIP 1)"
            className="sm:col-span-2 px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:border-[#8B1A32]"
          />

          <button
            type="submit"
            className="sm:col-span-2 px-3 py-2 rounded-lg bg-[#8B1A32] hover:bg-[#722235] text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-sm cursor-pointer transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Thêm Khách</span>
          </button>
        </div>
      </form>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên hoặc số bàn tiệc..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs focus:outline-none focus:border-[#8B1A32]"
          />
        </div>

        <div className="flex items-center space-x-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'all' ? 'bg-stone-800 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Tất Cả ({totalGuests})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('groom')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'groom' ? 'bg-[#8B1A32] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Nhà Trai ({groomGuests})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bride')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === 'bride' ? 'bg-[#A2682A] text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Nhà Gái ({brideGuests})
          </button>
        </div>
      </div>

      {/* Guest Table */}
      {filteredGuests.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50 space-y-2">
          <Users className="w-8 h-8 text-stone-300 mx-auto" />
          <p className="text-xs text-stone-500 font-medium">Không tìm thấy khách mời nào phù hợp.</p>
          <button
            type="button"
            onClick={handleLoadSampleGuests}
            className="text-xs font-bold text-[#8B1A32] hover:underline cursor-pointer"
          >
            Bấm vào đây để nạp 7 khách mẫu xem thử ngay
          </button>
        </div>
      ) : (
        <div className="border border-stone-200 rounded-xl overflow-hidden max-h-[460px] overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 sticky top-0 z-10">
              <tr>
                <th className="py-2.5 px-3">Tên Khách</th>
                <th className="py-2.5 px-3">Phân Luồng Họ</th>
                <th className="py-2.5 px-3">Bàn Tiệc</th>
                <th className="py-2.5 px-3">Trạng Thái Gửi</th>
                <th className="py-2.5 px-3 text-right">Tải Ảnh & Gửi Zalo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {filteredGuests.map((g) => {
                const sideInfo = SIDE_CONFIG[g.side || 'both'];
                const statusInfo = STATUS_CONFIG[g.status || 'pending'];
                const isRendering = renderingImageId === g.id;

                return (
                  <tr key={g.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-stone-900">
                      <div>
                        <span>{g.name}</span>
                        <span className="block text-[10px] text-stone-400 font-normal">
                          {ROLE_CONFIG[g.role]?.label || g.role}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${sideInfo.badgeClass}`}>
                        {sideInfo.label}
                      </span>
                    </td>

                    <td className="py-2.5 px-3">
                      {g.tableNumber ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#A2682A] font-bold text-[10px]">
                          Bàn {g.tableNumber}
                        </span>
                      ) : (
                        <span className="text-stone-300 text-[10px]">—</span>
                      )}
                    </td>

                    <td className="py-2.5 px-3">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(g.id)}
                        className={`px-2 py-0.5 rounded-full border text-[10px] font-bold transition-all cursor-pointer ${statusInfo.badgeClass}`}
                        title="Bấm để chuyển trạng thái: Chưa gửi ➔ Đã gửi ➔ Sẽ đi ➔ Báo bận"
                      >
                        {statusInfo.label}
                      </button>
                    </td>

                    <td className="py-2.5 px-3 text-right">
                      <div className="inline-flex items-center space-x-1.5">
                        {/* Download Luxury Square Image */}
                        <button
                          type="button"
                          onClick={() => handleDownloadInviteImage(g)}
                          disabled={isRendering}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#8B1A32] border border-amber-200 text-[11px] font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                          title="Tải ảnh thiệp vuông 1080x1080 hoàng gia in tên khách này để gửi Zalo"
                        >
                          <ImageIcon className="w-3 h-3 text-[#DFB76C]" />
                          <span>{isRendering ? 'Đang Tạo...' : 'Tải Ảnh'}</span>
                        </button>

                        {/* Copy Zalo Message */}
                        <button
                          type="button"
                          onClick={() => handleCopyZalo(g)}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                          title="Sao chép toàn bộ tin nhắn Zalo kèm link để gửi ngay"
                        >
                          {copiedZaloId === g.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Send className="w-3 h-3 text-blue-600" />
                          )}
                          <span>{copiedZaloId === g.id ? 'Đã Chép' : 'Chép Zalo'}</span>
                        </button>

                        {/* Copy Link */}
                        <button
                          type="button"
                          onClick={() => handleCopyLink(g)}
                          className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                          title="Sao chép link thiệp"
                        >
                          {copiedId === g.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-[#A2682A]" />
                          )}
                        </button>

                        {/* Open Preview */}
                        <a
                          href={generateGuestUrl(g)}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded-lg text-stone-400 hover:text-stone-800 transition-colors"
                          title="Mở xem thử thiệp"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDeleteGuest(g.id)}
                          className="p-1 rounded-lg text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Xóa khách này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h4 className="font-serif text-base font-bold text-stone-900 flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-[#A2682A]" />
                <span>Dán Nhanh Danh Sách Khách Hàng Loạt</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Mỗi khách một dòng theo cú pháp: <strong>Tên | Vai vế | Phân luồng họ | Bàn</strong>
              <br />
              <span className="text-[11px] text-[#A2682A]">Phân luồng họ: `groom` (Nhà Trai), `bride` (Nhà Gái), `both` (Cả hai)</span>
            </p>

            <textarea
              rows={8}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder={`Nguyễn Văn An | ban | groom | 01\nTrần Thị Bình | ban | bride | 02\nBác Hoàng Văn Cường | bac | groom | Họ Trai 01\nCô Đặng Thu Hà | co | bride | Họ Gái 01\nAnh Phạm Quốc Huy | dong_nghiep | both | VIP 08`}
              className="w-full p-3 rounded-xl border border-stone-200 font-mono text-xs text-stone-900 focus:outline-none focus:border-[#8B1A32]"
            />

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-white text-xs font-bold shadow-md hover:opacity-95"
              >
                Nhập Danh Sách
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Smart Reception Check-in Desk Modal */}
      <ReceptionCheckInModal
        isOpen={isReceptionModalOpen}
        onClose={() => setIsReceptionModalOpen(false)}
        guests={guests}
        onUpdateGuests={onUpdateGuests}
        groomName={groomName}
        brideName={brideName}
        venueName={venueName}
        hallName={hallName}
      />
    </div>
  );
};
