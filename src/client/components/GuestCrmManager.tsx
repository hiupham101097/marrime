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
  QrCode,
  Download,
  ExternalLink,
  Table as TableIcon,
  X,
} from 'lucide-react';
import { GuestItem, GuestRole } from '../../shared/types';
import { ROLE_CONFIG } from '../hooks/useGuestInfo';

interface GuestCrmManagerProps {
  guests: GuestItem[];
  onUpdateGuests: (guests: GuestItem[]) => void;
  weddingSlug: string;
  groomName: string;
  brideName: string;
}

export const GuestCrmManager: React.FC<GuestCrmManagerProps> = ({
  guests,
  onUpdateGuests,
  weddingSlug,
  groomName,
  brideName,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<GuestRole>('ban');
  const [newTable, setNewTable] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedZaloId, setCopiedZaloId] = useState<string | null>(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkInput, setBulkInput] = useState('');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://marrime.pages.dev';

  const generateGuestUrl = (guest: GuestItem): string => {
    const params = new URLSearchParams();
    params.set('w', weddingSlug);
    params.set('guest', guest.name);
    params.set('role', guest.role);
    if (guest.tableNumber) params.set('table', guest.tableNumber);
    return `${baseUrl}/?${params.toString()}`;
  };

  const generateZaloMessage = (guest: GuestItem): string => {
    const rolePrefix = ROLE_CONFIG[guest.role]?.prefix || 'Bạn';
    const link = generateGuestUrl(guest);
    const tableInfo = guest.tableNumber ? `\n📍 Bàn tiệc dành riêng cho ${guest.name}: Bàn số ${guest.tableNumber}` : '';
    return `Trân trọng gửi ${rolePrefix} ${guest.name}!\n\n${groomName} & ${brideName} rất vui mừng được gửi tấm thiệp cưới online độc bản này đến ${rolePrefix}.\nSự hiện diện của ${rolePrefix} là niềm vinh hạnh to lớn của hai đứa mình trong ngày trọng đại!\n${tableInfo}\n\n👉 Mở thiệp cưới tại đây: ${link}`;
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newGuest: GuestItem = {
      id: 'g_' + Date.now() + Math.random().toString(36).substring(2, 6),
      name: newName.trim(),
      role: newRole,
      tableNumber: newTable.trim() || undefined,
      phone: newPhone.trim() || undefined,
    };

    onUpdateGuests([newGuest, ...guests]);
    setNewName('');
    setNewTable('');
    setNewPhone('');
  };

  const handleDeleteGuest = (id: string) => {
    onUpdateGuests(guests.filter((g) => g.id !== id));
  };

  const handleCopyLink = (guest: GuestItem) => {
    const url = generateGuestUrl(guest);
    navigator.clipboard.writeText(url);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyZalo = (guest: GuestItem) => {
    const msg = generateZaloMessage(guest);
    navigator.clipboard.writeText(msg);
    setCopiedZaloId(guest.id);
    setTimeout(() => setCopiedZaloId(null), 2500);
  };

  const handleLoadSampleGuests = () => {
    const samples: GuestItem[] = [
      { id: 's1', name: 'Nguyễn Văn Tuấn', role: 'ban', tableNumber: '01' },
      { id: 's2', name: 'Trần Thị Thu Thảo', role: 'ban', tableNumber: '02' },
      { id: 's3', name: 'Bác Ba & Gia Đình', role: 'bac', tableNumber: 'Họ Hàng 01' },
      { id: 's4', name: 'Anh Hoàng Nam', role: 'anh', tableNumber: 'VIP 02' },
      { id: 's5', name: 'Chị Mai Linh', role: 'chi', tableNumber: '03' },
      { id: 's6', name: 'Hội Bạn Cấp 3', role: 'dong_nghiep', tableNumber: '08' },
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

      // Format can be: Name | Role | Table or Name, Role, Table
      const parts = clean.split(/[,|\t-]/).map((p) => p.trim());
      const name = parts[0];
      const roleStr = (parts[1] || 'ban').toLowerCase() as GuestRole;
      const role: GuestRole = ROLE_CONFIG[roleStr] ? roleStr : 'ban';
      const table = parts[2] || undefined;

      if (name) {
        newItems.push({
          id: 'g_' + Date.now() + Math.random().toString(36).substring(2, 6),
          name,
          role,
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
    const headers = ['Họ Tên Khách', 'Vai Vế / Danh Xưng', 'Bàn Tiệc', 'Số Điện Thoại', 'Link Thiệp Cá Nhân Hóa'];
    const rows = guests.map((g) => [
      `"${g.name.replace(/"/g, '""')}"`,
      `"${ROLE_CONFIG[g.role]?.label || g.role}"`,
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

  const filteredGuests = guests.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (g.tableNumber && g.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#8B1A32]" />
            <span>Quản Lý Danh Sách Khách & Sinh Link Hàng Loạt</span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-[#8B1A32] text-xs font-bold">
              {guests.length} khách
            </span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Khách bấm vào link sẽ thấy thiệp và bao thư in đích danh tên & bàn tiệc của mình.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleLoadSampleGuests}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
            title="Nạp nhanh 6 khách mẫu để xem thử"
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

      {/* Add New Guest Form */}
      <form onSubmit={handleAddGuest} className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2.5">
        <span className="text-xs font-bold text-stone-700 block">Thêm Khách Mời Mới:</span>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Họ tên khách (VD: Anh Tuấn, Cô Lan)"
            className="sm:col-span-4 px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:border-[#8B1A32]"
            required
          />

          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value as GuestRole)}
            className="sm:col-span-3 px-2 py-2 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-900 cursor-pointer focus:outline-none focus:border-[#8B1A32]"
          >
            <option value="ban">Bạn Bè (Bạn...)</option>
            <option value="anh">Anh (Anh...)</option>
            <option value="chi">Chị (Chị...)</option>
            <option value="em">Em (Em...)</option>
            <option value="co">Cô / Dì (Cô...)</option>
            <option value="chu">Chú (Chú...)</option>
            <option value="bac">Bác (Bác...)</option>
            <option value="dong_nghiep">Đồng Nghiệp</option>
            <option value="gia_dinh">Gia Đình (Gia đình...)</option>
          </select>

          <input
            type="text"
            value={newTable}
            onChange={(e) => setNewTable(e.target.value)}
            placeholder="Bàn (VD: 08, VIP 1)"
            className="sm:col-span-3 px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-900 focus:outline-none focus:border-[#8B1A32]"
          />

          <button
            type="submit"
            className="sm:col-span-2 px-3 py-2 rounded-lg bg-[#8B1A32] hover:bg-[#722235] text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-sm cursor-pointer transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Thêm</span>
          </button>
        </div>
      </form>

      {/* Search & Counter */}
      <div className="flex items-center justify-between gap-3">
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
        <span className="text-xs text-stone-500 font-medium">
          Hiển thị: <strong>{filteredGuests.length}</strong> / {guests.length} khách
        </span>
      </div>

      {/* Guest Table */}
      {filteredGuests.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-stone-200 rounded-xl bg-stone-50/50 space-y-2">
          <Users className="w-8 h-8 text-stone-300 mx-auto" />
          <p className="text-xs text-stone-500 font-medium">Chưa có khách mời nào trong danh sách.</p>
          <button
            type="button"
            onClick={handleLoadSampleGuests}
            className="text-xs font-bold text-[#8B1A32] hover:underline cursor-pointer"
          >
            Bấm vào đây để nạp 6 khách mẫu xem thử ngay
          </button>
        </div>
      ) : (
        <div className="border border-stone-200 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200 sticky top-0 z-10">
              <tr>
                <th className="py-2.5 px-3">Tên Khách</th>
                <th className="py-2.5 px-3">Danh Xưng</th>
                <th className="py-2.5 px-3">Bàn Tiệc</th>
                <th className="py-2.5 px-3 text-right">Hành Động Gửi Thiệp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {filteredGuests.map((g) => (
                <tr key={g.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-2 px-3 font-bold text-stone-900">
                    <div className="flex items-center space-x-1.5">
                      <span>{g.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold text-[10px]">
                      {ROLE_CONFIG[g.role]?.label || g.role}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    {g.tableNumber ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#A2682A] font-bold text-[10px]">
                        Bàn {g.tableNumber}
                      </span>
                    ) : (
                      <span className="text-stone-300 text-[10px]">—</span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-right">
                    <div className="inline-flex items-center space-x-1.5">
                      {/* Copy Link */}
                      <button
                        type="button"
                        onClick={() => handleCopyLink(g)}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                        title="Sao chép link thiệp dành riêng cho khách này"
                      >
                        {copiedId === g.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-[#A2682A]" />
                        )}
                        <span>{copiedId === g.id ? 'Đã Chép' : 'Chép Link'}</span>
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
                        <span>{copiedZaloId === g.id ? 'Đã Chép Lời Mời' : 'Chép Zalo'}</span>
                      </button>

                      {/* Open Preview in new tab */}
                      <a
                        href={generateGuestUrl(g)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded-lg text-stone-400 hover:text-stone-800 transition-colors"
                        title="Mở xem thử thiệp của khách này"
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
              ))}
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
              Mỗi khách một dòng theo cú pháp: <strong>Tên | Vai vế | Bàn</strong> (dấu gạch đứng hoặc dấu phẩy):
            </p>

            <textarea
              rows={8}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder={`Nguyễn Văn An | ban | 01\nTrần Thị Bình | ban | 01\nBác Hoàng Văn Cường | bac | Họ Hàng 01\nChị Đặng Thu Hà | chi | VIP 02\nAnh Phạm Quốc Huy | dong_nghiep | 08`}
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
    </div>
  );
};
