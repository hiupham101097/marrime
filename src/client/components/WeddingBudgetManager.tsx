import React, { useState } from 'react';
import {
  Wallet,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Phone,
  FileSpreadsheet,
  Download,
  AlertCircle,
  TrendingUp,
  Sparkles,
  PieChart,
} from 'lucide-react';
import { BudgetItem, BudgetCategoryKey } from '../../shared/types';
import { triggerHaptic } from '../utils/soundEffects';

interface WeddingBudgetManagerProps {
  budgetItems: BudgetItem[];
  onUpdateBudget: (items: BudgetItem[]) => void;
  currencySymbol?: string;
}

const CATEGORY_CONFIG: Record<BudgetCategoryKey, { label: string; icon: string; color: string }> = {
  banquet: { label: 'Tiệc Cưới & Nhà Hàng', icon: '🍽️', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  attire: { label: 'Trang Phục & Make-up', icon: '👗', color: 'bg-pink-50 text-pink-800 border-pink-200' },
  photo: { label: 'Phóng Sự & Album Cưới', icon: '📸', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  decor: { label: 'Trang Trí & Hoa Tươi', icon: '💐', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  jewelry: { label: 'Nhẫn Cưới & Trang Sức', icon: '💍', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  music: { label: 'Ban Nhạc & MC Sảnh', icon: '🎵', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  stationery: { label: 'Thiệp & Quà Cảm Ơn', icon: '💌', color: 'bg-red-50 text-[#8B1A32] border-red-200' },
  other: { label: 'Chi Phí Phát Sinh', icon: '✨', color: 'bg-stone-100 text-stone-800 border-stone-200' },
};

export const WeddingBudgetManager: React.FC<WeddingBudgetManagerProps> = ({
  budgetItems,
  onUpdateBudget,
  currencySymbol = '₫',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<BudgetCategoryKey>('banquet');
  const [newEstimated, setNewEstimated] = useState('');
  const [newActual, setNewActual] = useState('');
  const [newVendor, setNewVendor] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // Calculations
  const totalEstimated = budgetItems.reduce((sum, item) => sum + (item.estimatedCost || 0), 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + (item.actualCost || 0), 0);
  const totalPaid = budgetItems.reduce((sum, item) => sum + (item.paidAmount || 0), 0);
  const remaining = Math.max(0, totalActual - totalPaid);
  const isOverBudget = totalActual > totalEstimated && totalEstimated > 0;
  const budgetDiff = totalActual - totalEstimated;

  const formatVnd = (num: number) => {
    return num.toLocaleString('vi-VN') + ' ' + currencySymbol;
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const est = parseFloat(newEstimated.replace(/\D/g, '')) || 0;
    const act = parseFloat(newActual.replace(/\D/g, '')) || est;

    const newItem: BudgetItem = {
      id: 'b_' + Date.now() + Math.random().toString(36).substring(2, 6),
      category: newCategory,
      title: newTitle.trim(),
      estimatedCost: est,
      actualCost: act,
      paidAmount: 0,
      vendorName: newVendor.trim() || undefined,
      vendorPhone: newPhone.trim() || undefined,
      isCompleted: false,
    };

    onUpdateBudget([newItem, ...budgetItems]);
    setNewTitle('');
    setNewEstimated('');
    setNewActual('');
    setNewVendor('');
    setNewPhone('');
    triggerHaptic([30]);
  };

  const handleToggleComplete = (id: string) => {
    const updated = budgetItems.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    onUpdateBudget(updated);
    triggerHaptic([20]);
  };

  const handleDeleteItem = (id: string) => {
    onUpdateBudget(budgetItems.filter((item) => item.id !== id));
  };

  const handleExportCSV = () => {
    if (budgetItems.length === 0) return;
    const headers = ['Hạng Mục', 'Tên Chi Phí', 'Dự Kiến (VNĐ)', 'Thực Tế (VNĐ)', 'Đã Trả (VNĐ)', 'Còn Lại (VNĐ)', 'Nhà Cung Cấp', 'SĐT', 'Trạng Thái'];
    const rows = budgetItems.map((b) => [
      `"${CATEGORY_CONFIG[b.category]?.label || b.category}"`,
      `"${b.title.replace(/"/g, '""')}"`,
      b.estimatedCost,
      b.actualCost,
      b.paidAmount,
      Math.max(0, b.actualCost - b.paidAmount),
      `"${b.vendorName || ''}"`,
      `"${b.vendorPhone || ''}"`,
      b.isCompleted ? '"Đã Hoàn Tất"' : '"Chưa Xong"',
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ngan_sach_cuoi_marrime.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredItems = budgetItems.filter((b) => {
    if (activeCategory === 'all') return true;
    return b.category === activeCategory;
  });

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center space-x-2">
            <Wallet className="w-5 h-5 text-[#8B1A32]" />
            <span>Trợ Lý Quản Trị Ngân Sách Cưới & Vendors</span>
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Theo dõi chi tiêu thực tế so với dự kiến, quản lý tiến độ đặt cọc nhà hàng và danh bạ nhà cung cấp dịch vụ cưới.
          </p>
        </div>

        {budgetItems.length > 0 && (
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center space-x-1.5 cursor-pointer shrink-0 self-start sm:self-auto transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất Bảng Excel</span>
          </button>
        )}
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
          <span className="text-[10px] uppercase font-bold text-stone-500 block">Dự Kiến Ban Đầu</span>
          <div className="font-serif text-base sm:text-lg font-bold text-stone-900">
            {formatVnd(totalEstimated)}
          </div>
        </div>

        <div className={`p-3.5 rounded-2xl border space-y-1 ${
          isOverBudget ? 'bg-rose-50/80 border-rose-300 text-rose-900' : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold opacity-80 block">Chi Phí Thực Tế</span>
            {isOverBudget && <AlertCircle className="w-3.5 h-3.5 text-rose-600" />}
          </div>
          <div className="font-serif text-base sm:text-lg font-bold">
            {formatVnd(totalActual)}
          </div>
          {isOverBudget && (
            <span className="text-[10px] font-bold text-rose-600 block">
              + {formatVnd(budgetDiff)} (Vượt dự toán)
            </span>
          )}
        </div>

        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-1">
          <span className="text-[10px] uppercase font-bold opacity-80 block">Đã Thanh Toán / Cọc</span>
          <div className="font-serif text-base sm:text-lg font-bold">
            {formatVnd(totalPaid)}
          </div>
          <span className="text-[10px] text-blue-700 block">
            {totalActual > 0 ? Math.round((totalPaid / totalActual) * 100) : 0}% tổng chi phí
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1">
          <span className="text-[10px] uppercase font-bold opacity-80 block">Còn Phải Trả</span>
          <div className="font-serif text-base sm:text-lg font-bold text-[#8B1A32]">
            {formatVnd(remaining)}
          </div>
          <span className="text-[10px] text-[#A2682A] block">
            Thanh toán sau tiệc
          </span>
        </div>
      </div>

      {/* Add New Expense Form */}
      <form onSubmit={handleAddItem} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
        <span className="text-xs font-bold text-stone-700 block">Thêm Khoản Chi Phí Mới:</span>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Tên khoản chi (VD: Bàn tiệc, Váy cưới...)"
            className="sm:col-span-3 px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 focus:outline-none focus:border-[#8B1A32]"
          />

          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as BudgetCategoryKey)}
            className="sm:col-span-2 px-2 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-800 cursor-pointer focus:outline-none"
          >
            {Object.entries(CATEGORY_CONFIG).map(([k, cfg]) => (
              <option key={k} value={k}>
                {cfg.icon} {cfg.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newEstimated}
            onChange={(e) => setNewEstimated(e.target.value)}
            placeholder="Dự kiến (VNĐ)"
            className="sm:col-span-2 px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 focus:outline-none focus:border-[#8B1A32]"
          />

          <input
            type="text"
            value={newActual}
            onChange={(e) => setNewActual(e.target.value)}
            placeholder="Thực tế (VNĐ)"
            className="sm:col-span-2 px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 focus:outline-none focus:border-[#8B1A32]"
          />

          <input
            type="text"
            value={newVendor}
            onChange={(e) => setNewVendor(e.target.value)}
            placeholder="Tên Vendor / Nhà hàng"
            className="sm:col-span-2 px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 focus:outline-none focus:border-[#8B1A32]"
          />

          <button
            type="submit"
            className="sm:col-span-1 py-2 rounded-xl bg-[#8B1A32] hover:bg-[#722235] text-white text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
            title="Thêm khoản chi"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#8B1A32] text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Tất Cả ({budgetItems.length})
        </button>
        {Object.entries(CATEGORY_CONFIG).map(([k, cfg]) => (
          <button
            key={k}
            type="button"
            onClick={() => setActiveCategory(k)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === k
                ? 'bg-[#8B1A32] text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cfg.icon} {cfg.label}
          </button>
        ))}
      </div>

      {/* Expenses Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200">
        <table className="w-full text-left text-xs text-stone-700">
          <thead className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase font-bold text-stone-500">
            <tr>
              <th className="p-3 w-10 text-center">Xong</th>
              <th className="p-3">Khoản Chi & Vendor</th>
              <th className="p-3 text-right">Dự Kiến</th>
              <th className="p-3 text-right">Thực Tế</th>
              <th className="p-3 text-right">Đã Trả</th>
              <th className="p-3 text-right">Còn Lại</th>
              <th className="p-3 text-center w-12">Xóa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 bg-white font-medium">
            {filteredItems.map((b) => {
              const rem = Math.max(0, b.actualCost - b.paidAmount);
              return (
                <tr key={b.id} className={`hover:bg-stone-50/60 transition-colors ${b.isCompleted ? 'opacity-65' : ''}`}>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleComplete(b.id)}
                      className="cursor-pointer text-stone-400 hover:text-emerald-600"
                    >
                      {b.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-stone-900">{b.title}</div>
                    <div className="text-[11px] text-stone-400 flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] border font-bold ${CATEGORY_CONFIG[b.category]?.color || ''}`}>
                        {CATEGORY_CONFIG[b.category]?.label}
                      </span>
                      {b.vendorName && <span>Vendor: {b.vendorName}</span>}
                    </div>
                  </td>
                  <td className="p-3 text-right text-stone-500">{formatVnd(b.estimatedCost)}</td>
                  <td className="p-3 text-right font-bold text-stone-900">{formatVnd(b.actualCost)}</td>
                  <td className="p-3 text-right text-blue-700 font-semibold">{formatVnd(b.paidAmount)}</td>
                  <td className="p-3 text-right font-bold text-[#8B1A32]">{formatVnd(rem)}</td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(b.id)}
                      className="p-1 rounded-lg text-stone-300 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
