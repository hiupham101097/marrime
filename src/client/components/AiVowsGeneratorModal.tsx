import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Crown,
  Copy,
  Check,
  X,
  Printer,
  Wand2,
  BookmarkPlus,
  RefreshCw,
  Users,
  Smile,
  BookOpen,
  Feather,
  Globe,
  Quote,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerHaptic } from '../utils/soundEffects';

interface AiVowsGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
  brideName: string;
  weddingDateFormatted?: string;
  venueName?: string;
  onApplyVowToStudio: (author: string, quote: string) => void;
}

export type VowCategory = 'groom_to_bride' | 'bride_to_groom' | 'speech_to_parents' | 'speech_to_guests';
export type VowTone = 'romantic' | 'humorous' | 'gratitude' | 'poetic' | 'bilingual';
export type VowLength = 'short' | 'standard' | 'deep';

export const AiVowsGeneratorModal: React.FC<AiVowsGeneratorModalProps> = ({
  isOpen,
  onClose,
  groomName,
  brideName,
  weddingDateFormatted = '20/11/2026',
  venueName = 'Riverside Palace',
  onApplyVowToStudio,
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<VowCategory>('groom_to_bride');
  const [tone, setTone] = useState<VowTone>('romantic');
  const [length, setLength] = useState<VowLength>('standard');

  // 3 Emotional Touchpoints inputs
  const [memory1, setMemory1] = useState('');
  const [memory2, setMemory2] = useState('');
  const [memory3, setMemory3] = useState('');

  // Generated Result
  const [generatedSpeech, setGeneratedSpeech] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const cleanGroom = groomName || 'Tuấn Anh';
  const cleanBride = brideName || 'Mai Phương';

  // AI Prompt Synthesis Engine
  const generateVowContent = () => {
    setIsGenerating(true);
    triggerHaptic([30, 40]);

    setTimeout(() => {
      let speech = '';

      if (category === 'groom_to_bride') {
        if (tone === 'humorous') {
          speech = `Em yêu,\n\n[Dừng lại 2 giây, mỉm cười nhìn em]\n` +
            `Người ta bảo lấy vợ là bước vào một "thử thách vĩ đại", nhưng đứng trước em hôm nay, anh biết đây là quyết định đúng đắn và sáng suốt nhất đời mình.\n\n` +
            `${memory1 ? `Nhớ lại ${memory1}, anh vẫn không ngờ cô gái đáng yêu ngày ấy hôm nay đã chính thức trở thành vợ của anh.\n` : `Anh vẫn nhớ như in ngày đầu tiên ta chạm mắt nhau, lúc ấy trái tim anh đã thì thầm rằng: "Chính là cô ấy rồi!".\n`}` +
            `${memory2 ? `Anh yêu cả những lúc ${memory2}, vì chính những điều giản dị ấy làm nên một người bạn đời duy nhất của anh.\n` : `Anh yêu cách em mỉm cười mỗi khi anh vụng về nấu ăn, yêu cả những giận hờn vu vơ mà chỉ cần một cốc trà sữa là em lại cười tít mắt.\n`}` +
            `[Nắm chặt hai bàn tay em, ánh mắt kiên định]\n` +
            `${memory3 ? `Hôm nay, trước mặt gia đình và toàn thể bạn bè, anh xin hứa: ${memory3}.\n` : `Anh hứa sẽ luôn là người rửa bát sạch nhất nhà, luôn nhường em miếng ngon nhất, và quan trọng hơn hết, sẽ luôn lắng nghe và chở che cho em suốt cuộc đời này.\n`}` +
            `Cảm ơn em đã đồng ý cùng anh xây dựng tổ ấm. Yêu em hơn tất cả mọi điều trên thế gian!`;
        } else if (tone === 'poetic') {
          speech = `Gửi em - Nàng thơ của cuộc đời anh,\n\n[Ánh nhìn dịu dàng, thở nhẹ một nhịp]\n` +
            `Giữa biển người mênh mông của vạn nẻo nhân gian, gặp được em là định mệnh, yêu được em là may mắn, và cưới được em là phúc phần lớn nhất đời anh.\n\n` +
            `${memory1 ? `Từ ngày ${memory1}, từng bước chân anh đi đã không còn đơn độc.\n` : `Từ khoảnh khắc đầu tiên ta chung lối, mùa thu trong anh bỗng trở nên dịu dàng hơn, và mỗi ngày trôi qua đều ngập tràn ý nghĩa.\n`}` +
            `${memory2 ? `Anh trân quý ${memory2}, nơi tâm hồn em luôn tỏa sáng vẻ đẹp thuần khiết và bao dung.\n` : `Anh yêu nét dịu dàng, tấm lòng nhân hậu và sự ân cần của em qua từng năm tháng đồng hành.\n`}` +
            `[Đặt tay lên ngực trái, trao lời thề thiêng liêng]\n` +
            `${memory3 ? `Trước lễ đường tôn nghiêm này, anh xin nguyện ước: ${memory3}.\n` : `Nguyện làm bóng cây râm mát che chở em qua ngày nắng hạ, làm ngọn lửa ấm ôm ấp em giữa mùa đông giá lạnh. Dù tóc có phai màu sương gió, bàn tay này vẫn mãi siết chặt tay em.\n`}` +
            `Trân trọng em, thương yêu em đến trọn kiếp trăm năm.`;
        } else if (tone === 'bilingual') {
          speech = `Em yêu,\n` +
            `Today, in front of our beloved families and friends, I take you to be my wife, my partner in life, and my one true love.\n\n` +
            `[Nhìn sâu vào mắt em]\n` +
            `${memory1 ? `Looking back at ${memory1}, I knew my heart had finally found its home.\n` : `From the moment you walked into my life, every ordinary day turned into an extraordinary adventure.\n`}` +
            `${memory2 ? `I cherish ${memory2}, and I fall in love with your beautiful soul more and more each day.\n` : `I love your kindness, your radiant smile, and the warmth you bring into my world.\n`}` +
            `[Hold her hands gently]\n` +
            `${memory3 ? `I promise you that ${memory3}.\n` : `I promise to stand by your side through every season of life, to celebrate your victories, comfort you in sorrows, and love you unconditionally forever.\n`}` +
            `Hôm nay và mãi mãi về sau, trái tim anh trọn vẹn thuộc về em.`;
        } else {
          // Romantic default
          speech = `${cleanBride} ơi,\n\n[Nhìn sâu vào mắt em, ngưng lại một chút]\n` +
            `Đứng tại lễ đường trang nghiêm này, nhìn em trong chiếc váy cưới lộng lẫy, anh biết mình là người đàn ông may mắn và hạnh phúc nhất thế gian.\n\n` +
            `${memory1 ? `Nhớ lại ${memory1}, anh nhận ra tình yêu đích thực không cần phải ồn ào, mà là cảm giác bình yên đến lạ kỳ khi ở bên cạnh em.\n` : `Hành trình tình yêu của chúng ta đã đi qua biết bao kỷ niệm, từ những buổi chiều đón đưa hò hẹn đến những lúc cùng nhau vượt qua bao khó khăn của cuộc sống.\n`}` +
            `${memory2 ? `Anh luôn biết ơn ${memory2}, bởi vì nhờ có em, anh đã trở thành một phiên bản tốt hơn của chính mình.\n` : `Anh yêu sự dịu dàng, ân cần và nụ cười rạng rỡ của em - nguồn động lực vô giá giúp anh vững bước mỗi ngày.\n`}` +
            `[Siết nhẹ bàn tay em]\n` +
            `${memory3 ? `Trước sự chứng giám của hai bên gia đình và bạn bè thân thương, anh hứa: ${memory3}.\n` : `Anh hứa sẽ luôn trân trọng từng phút giây bên em, sẽ là chỗ dựa vững chãi che chở em trước mọi giông bão, và tình yêu anh dành cho em sẽ mãi vẹn nguyên như ngày đầu tiên.\n`}` +
            `Cảm ơn em đã bước vào cuộc đời anh. Hãy cùng anh viết tiếp chương hạnh phúc nhất đời mình nhé!`;
        }
      } else if (category === 'bride_to_groom') {
        speech = `${cleanGroom} à,\n\n[Cười bẽn lẽn, nắm chặt tay chú rể]\n` +
          `Trước khi gặp anh, em từng nghĩ hạnh phúc là một điều gì đó xa xôi lắm. Nhưng từ ngày anh đến, hạnh phúc bỗng trở nên thật gần gũi và ấm áp.\n\n` +
          `${memory1 ? `Em sẽ không bao giờ quên ${memory1}, khoảnh khắc em biết rằng mình đã tìm thấy bến đỗ bình yên của đời mình.\n` : `Em nhớ những ngày mưa anh kiên nhẫn đứng đợi em dưới hiên nhà, nhớ từng cử chỉ quan tâm vụng về nhưng ngập tràn chân thành của anh.\n`}` +
          `${memory2 ? `Em trân quý vô cùng ${memory2}, sự nhẫn nại và thấu hiểu mà chỉ riêng anh mới có thể dành cho em.\n` : `Cảm ơn anh đã luôn kiên nhẫn với những tính khí thất thường của em, luôn ôm em vào lòng mỗi khi em yếu lòng và tiếp thêm cho em sức mạnh.\n`}` +
          `[Nâng nhẹ ánh mắt nhìn anh thật lâu]\n` +
          `${memory3 ? `Hôm nay, em xin hứa với anh: ${memory3}.\n` : `Em hứa sẽ luôn là hậu phương ấm áp, cùng anh chia sẻ từng bữa cơm ngon, cùng anh xây đắp một mái nhà ngập tràn tiếng cười và yêu anh bằng cả trái tim thuần khiết nhất.\n`}` +
          `Chào mừng anh chính thức bước vào cuộc đời em với tư cách là người chồng yêu dấu!`;
      } else if (category === 'speech_to_parents') {
        speech = `Kính thưa Ba Mẹ hai bên,\n\n[Cả hai cùng quay về phía cha mẹ, cúi đầu thành kính]\n` +
          `Trong giờ phút thiêng liêng và xúc động nhất của cuộc đời, điều đầu tiên chúng con muốn cất lên chính là lời tri ân sâu sắc nhất gửi đến Ba Mẹ.\n\n` +
          `Cảm ơn Ba Mẹ đã sinh thành, dưỡng dục, và hy sinh cả thanh xuân để chúng con có được ngày trưởng thành trọn vẹn như hôm nay. Tình yêu thương bao la và sự hy sinh thầm lặng của Ba Mẹ là món quà vô giá mà chúng con luôn khắc sâu trong tim.\n\n` +
          `${memory1 ? `Chúng con luôn nhớ ${memory1}, bài học quý báu về lòng hiếu thảo và sự gắn kết gia đình mà Ba Mẹ đã dạy bảo.\n` : `Từ tấm gương thủy chung và nhẫn nại của Ba Mẹ, chúng con đã học được cách yêu thương, nhường nhịn và trân trọng hạnh phúc gia đình.\n`}` +
          `[Cúi đầu tri ân một lần nữa]\n` +
          `Hôm nay, chúng con chính thức lập gia đình nhỏ của riêng mình. Chúng con xin hứa sẽ luôn yêu thương nhau, hiếu thuận với Ba Mẹ hai bên và sống xứng đáng với niềm tin yêu mà Ba Mẹ đã trao gửi!`;
      } else {
        // Speech to guests
        speech = `Kính thưa quý quan khách, quý họ hàng hai bên cùng toàn thể bạn bè thân thương,\n\n[Cúi chào quan khách một cách trang trọng và hân hoan]\n` +
          `Hôm nay là ngày hạnh phúc và trọn vẹn nhất trong cuộc đời của ${cleanGroom} & ${cleanBride}.\n\n` +
          `Chúng con/chúng mình xin được gửi lời cảm tạ chân thành và sâu sắc nhất đến toàn thể quý vị đã dành thời gian quý báu, vượt qua quãng đường xa xôi để đến chung vui và chứng kiến giây phút thiêng liêng này.\n\n` +
          `Sự hiện diện, những nụ cười rạng rỡ và những lời chúc phúc ấm áp của mọi người chính là món quà ý nghĩa nhất, tiếp thêm sức mạnh cho hành trình xây đắp tổ ấm mới của hai đứa mình.\n\n` +
          `Xin kính chúc toàn thể quý vị và gia đình luôn dồi dào sức khỏe, an khang thịnh vượng và ngập tràn niềm vui. Xin mời mọi người cùng nâng ly chúc mừng cho ngày vui hôm nay!`;
      }

      setGeneratedSpeech(speech);
      setIsGenerating(false);
      setIsApplied(false);
      void confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#DFB76C', '#8B1A32', '#FDE047'],
      });
    }, 600);
  };

  const handleCopy = () => {
    if (!generatedSpeech) return;
    navigator.clipboard.writeText(generatedSpeech);
    setIsCopied(true);
    triggerHaptic([30]);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApplyToStudio = () => {
    if (!generatedSpeech) return;
    const author = category === 'groom_to_bride'
      ? cleanGroom
      : category === 'bride_to_groom'
      ? cleanBride
      : 'Dâu & Rể';

    onApplyVowToStudio(author, generatedSpeech);
    setIsApplied(true);
    triggerHaptic([40, 80]);
    setTimeout(() => {
      setIsApplied(false);
      onClose();
    }, 1200);
  };

  const handlePrintCueCard = () => {
    if (!generatedSpeech) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Thẻ Lời Thề Nguyện Lễ Đường - ${cleanGroom} & ${cleanBride}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Montserrat:wght@400;600&display=swap');
          @page { size: A5 portrait; margin: 12mm; }
          body {
            margin: 0;
            padding: 24px;
            font-family: 'Playfair Display', serif;
            background: #FFFDF9;
            color: #2D0B14;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 90vh;
          }
          .card {
            border: 3px double #DFB76C;
            padding: 36px 32px;
            border-radius: 20px;
            max-width: 480px;
            width: 100%;
            background: #FAF8F5;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
            position: relative;
          }
          .monogram {
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            color: #8B1A32;
            letter-spacing: 4px;
            margin-bottom: 8px;
          }
          .title {
            text-align: center;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #A2682A;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            margin-bottom: 24px;
          }
          .content {
            font-size: 14.5px;
            line-height: 1.85;
            white-space: pre-line;
            color: #26050E;
          }
          .cue {
            color: #A2682A;
            font-style: italic;
            font-size: 13px;
            font-family: 'Montserrat', sans-serif;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #8C7862;
            border-top: 1px solid #DFB76C;
            padding-top: 14px;
            font-family: 'Montserrat', sans-serif;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="monogram">${cleanGroom.charAt(0)} & ${cleanBride.charAt(0)}</div>
          <div class="title">THẺ LỜI THỀ NGUYỆN LỄ ĐƯỜNG • WEDDING VOWS</div>
          <div class="content">${generatedSpeech.replace(/\[(.*?)\]/g, '<span class="cue">[$1]</span>')}</div>
          <div class="footer">${venueName} • ${weddingDateFormatted}</div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn select-none">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl border-2 border-[#DFB76C]/60 shadow-[0_20px_70px_rgba(0,0,0,0.5)] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#5C0E1F] via-[#8B1A32] to-[#5C0E1F] p-5 text-white flex items-center justify-between border-b border-[#DFB76C]/40 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DFB76C] to-[#9C7328] text-[#5C0E1F] flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-[#5C0E1F]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[10px] tracking-widest uppercase font-bold text-amber-200">
                  GEMINI AI WEDDING ATELIER • LỜI THỀ NGUYỆN HOÀNG GIA
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-50 leading-tight">
                Trợ Lý Soạn Lời Thề Nguyện & Bài Phát Biểu Sân Khấu
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Step 1: Select Category */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              1. Bạn muốn soạn bài phát biểu cho ai?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'groom_to_bride' as const, label: 'Chú Rể ➔ Cô Dâu', icon: Heart },
                { id: 'bride_to_groom' as const, label: 'Cô Dâu ➔ Chú Rể', icon: Sparkles },
                { id: 'speech_to_parents' as const, label: 'Tri Ân Cha Mẹ', icon: Users },
                { id: 'speech_to_guests' as const, label: 'Cảm Tạ Quan Khách', icon: Crown },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#8B1A32] text-white border-[#8B1A32] shadow-sm'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-[#8B1A32]'}`} />
                    <span className="text-center">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Tone & Length */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                2. Tông giọng & Phong cách cảm xúc
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'romantic' as const, label: 'Lãng Mạn Sâu Lắng', icon: Heart },
                  { id: 'humorous' as const, label: 'Hài Hước Dí Dỏm', icon: Smile },
                  { id: 'poetic' as const, label: 'Nàng Thơ Tinh Khôi', icon: Feather },
                  { id: 'bilingual' as const, label: 'Song Ngữ Anh - Việt', icon: Globe },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTone(item.id)}
                    className={`p-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer text-left ${
                      tone === item.id
                        ? 'bg-amber-100/70 border-amber-400 text-[#8B1A32] font-bold'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                3. Thời lượng phát biểu dự kiến
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'short' as const, label: 'Ngắn Gọn (1-2p)' },
                  { id: 'standard' as const, label: 'Tiêu Chuẩn (2-3p)' },
                  { id: 'deep' as const, label: 'Sâu Sắc (3-4p)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLength(item.id)}
                    className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all cursor-pointer text-center ${
                      length === item.id
                        ? 'bg-[#8B1A32] text-white border-[#8B1A32] font-bold'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Emotional Touchpoints (3 Điểm Chạm Kỷ Niệm) */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center space-x-2">
              <Quote className="w-4 h-4 text-[#A2682A]" />
              <span className="text-xs font-bold text-[#8B1A32] uppercase tracking-wider">
                Gợi ý 3 kỷ niệm riêng của hai bạn (Giúp bài phát biểu mang đậm dấu ấn cá nhân):
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <span className="text-[10px] font-bold text-stone-600 block mb-1">
                  1. Kỷ niệm đầu tiên / Nơi gặp gỡ:
                </span>
                <input
                  type="text"
                  value={memory1}
                  onChange={(e) => setMemory1(e.target.value)}
                  placeholder="VD: Chiều mưa hồ Tây, chuyến phượt Hà Giang..."
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-[#8B1A32]"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-600 block mb-1">
                  2. Điều bạn yêu nhất ở người ấy:
                </span>
                <input
                  type="text"
                  value={memory2}
                  onChange={(e) => setMemory2(e.target.value)}
                  placeholder="VD: Nấu ăn ngon, luôn lắng nghe và nhẫn nại..."
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-[#8B1A32]"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-600 block mb-1">
                  3. Lời hứa thiêng liêng từ đáy lòng:
                </span>
                <input
                  type="text"
                  value={memory3}
                  onChange={(e) => setMemory3(e.target.value)}
                  placeholder="VD: Luôn là chỗ dựa, luôn nắm chặt tay nhau..."
                  className="w-full px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-800 focus:outline-none focus:border-[#8B1A32]"
                />
              </div>
            </div>

            {/* Generate Trigger Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={generateVowContent}
                disabled={isGenerating}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8B1A32] via-[#722235] to-[#5C0E1F] text-amber-100 hover:text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer border border-[#DFB76C]/40"
              >
                <Wand2 className={`w-4 h-4 text-amber-300 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'AI Đang Soạn Bản Thảo Cảm Xúc...' : 'Bấm Soạn Thảo Bản Lời Thề Nguyện Ngay'}</span>
              </button>
            </div>
          </div>

          {/* Generated Speech Result Display */}
          {generatedSpeech && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#DFB76C]/60 shadow-md space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#8B1A32]" />
                  <span className="font-serif text-sm font-bold text-stone-900">
                    Bản Thảo Lời Thề Nguyện (Có ngắt nhịp thở & cử chỉ sân khấu)
                  </span>
                </div>
                <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  ✨ Gemini Atelier Model
                </span>
              </div>

              <blockquote className="font-serif text-sm sm:text-base leading-relaxed text-stone-800 whitespace-pre-line p-3 bg-stone-50/70 rounded-xl border border-stone-100">
                {generatedSpeech}
              </blockquote>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Đã Sao Chép!' : 'Sao Chép'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintCueCard}
                    className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#8B1A32] border border-amber-200 text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors"
                    title="In thẻ giấy khổ A6 viền vàng sang trọng để cầm đọc tại lễ đường"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#A2682A]" />
                    <span>In Thẻ Cầm Tay Lễ Đường</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleApplyToStudio}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white text-xs font-bold shadow-md hover:opacity-95 flex items-center space-x-1.5 cursor-pointer"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-emerald-200" />
                  <span>{isApplied ? 'Đã Lưu Vào Thiệp!' : 'Lưu Thẳng Vào Thiệp Cưới'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
