import React, { useState, useEffect } from 'react';
import { Heart, MessageSquarePlus, Send, Sparkles } from 'lucide-react';
import { WishMessage } from '../../shared/types';
import { INITIAL_WISHES } from '../../shared/defaultData';

export const WishingWallSection: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [relationRole, setRelationRole] = useState('Bạn bè');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setWishes(data.data);
        }
      }
    } catch {
      // In dev fallback
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleLike = async (id: string) => {
    if (likedIds[id]) return;

    setLikedIds((prev) => ({ ...prev, [id]: true }));
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, heartCount: (w.heartCount || 0) + 1 } : w))
    );

    try {
      await fetch(`/api/wishes/${id}/like`, { method: 'POST' });
    } catch {
      // Ignore
    }
  };

  const handlePostWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          relationRole,
          content: content.trim(),
          badge: relationRole,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setWishes((prev) => [json.data, ...prev]);
          setContent('');
        }
      } else {
        // Fallback local update
        const localWish: WishMessage = {
          id: 'local-' + Date.now(),
          name,
          relationRole,
          content,
          createdAt: 'Vừa xong',
          heartCount: 1,
          badge: relationRole,
        };
        setWishes((prev) => [localWish, ...prev]);
        setContent('');
      }
    } catch {
      // Local fallback
      const localWish: WishMessage = {
        id: 'local-' + Date.now(),
        name,
        relationRole,
        content,
        createdAt: 'Vừa xong',
        heartCount: 1,
        badge: relationRole,
      };
      setWishes((prev) => [localWish, ...prev]);
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="wishes" className="py-24 px-4 bg-white relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-wedding-gold-dark text-xs uppercase tracking-widest font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
            <span>Sổ Lưu Bút Trực Tuyến</span>
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-wedding-burgundy font-normal tracking-tight">
            Gửi Ngàn Lời Chúc Phúc
          </h2>
          <p className="text-stone-600 text-sm mt-3 font-light">
            Những dòng nhắn gửi yêu thương được dâu rể nâng niu và gìn giữ mãi mãi
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Input Form */}
        <div className="bg-wedding-cream rounded-3xl p-6 sm:p-8 border border-wedding-gold/30 shadow-envelope mb-12 max-w-2xl mx-auto">
          <form onSubmit={handlePostWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Tên Của Bạn *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Long..."
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Mối Quan Hệ
                </label>
                <select
                  value={relationRole}
                  onChange={(e) => setRelationRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none font-medium text-stone-700"
                >
                  <option value="Bạn bè">Bạn bè</option>
                  <option value="Bạn thân cô dâu">Bạn thân cô dâu</option>
                  <option value="Bạn thân chú rể">Bạn thân chú rể</option>
                  <option value="Đồng nghiệp">Đồng nghiệp</option>
                  <option value="Anh/Chị/Em">Anh/Chị/Em</option>
                  <option value="Họ hàng nội ngoại">Họ hàng nội ngoại</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Lời Chúc Mừng Hạnh Phúc *
              </label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết lời chúc ngọt ngào nhất gửi đến hai bạn..."
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-wedding-rose-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-wedding-burgundy hover:bg-wedding-rose-900 text-wedding-gold-light text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Đang gửi...' : 'Gửi Lời Chúc Mừng'}</span>
            </button>
          </form>
        </div>

        {/* Wishes Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-[#FFFDF9] rounded-2xl p-5 border border-wedding-gold/25 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif font-bold text-stone-900 text-sm">
                    {wish.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-wedding-rose-50 text-wedding-rose-700 text-[10px] font-semibold border border-wedding-rose-100">
                    {wish.badge || wish.relationRole}
                  </span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-light">
                  "{wish.content}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span>{wish.createdAt}</span>
                <button
                  type="button"
                  onClick={() => handleLike(wish.id)}
                  className={`flex items-center space-x-1 cursor-pointer transition-colors ${
                    likedIds[wish.id]
                      ? 'text-wedding-rose-600 font-semibold'
                      : 'hover:text-wedding-rose-600 text-stone-500'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likedIds[wish.id] ? 'fill-wedding-rose-600 text-wedding-rose-600' : ''
                    }`}
                  />
                  <span>{wish.heartCount || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

