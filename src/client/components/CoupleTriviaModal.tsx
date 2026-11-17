import React, { useState } from 'react';
import {
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
  RotateCcw,
  Heart,
  ChevronRight,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TriviaQuestion } from '../../shared/types';
import { playCelebrationFanfare, triggerHaptic } from '../utils/soundEffects';

interface CoupleTriviaModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomName: string;
  brideName: string;
  questions?: TriviaQuestion[];
}

export const CoupleTriviaModal: React.FC<CoupleTriviaModalProps> = ({
  isOpen,
  onClose,
  groomName,
  brideName,
  questions = [],
}) => {
  if (!isOpen || questions.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      triggerHaptic([30, 60]);
    } else {
      triggerHaptic([60]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      playCelebrationFanfare();
      void confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#DFB76C', '#8B1A32', '#FDE047', '#E11D48'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl border-2 border-[#DFB76C]/60 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden my-auto">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#5C0E1F] via-[#8B1A32] to-[#5C0E1F] p-5 text-white flex items-center justify-between border-b border-[#DFB76C]/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#DFB76C] text-[#5C0E1F] flex items-center justify-center shadow-md font-serif font-bold text-lg">
              <Trophy className="w-5 h-5 text-[#5C0E1F]" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-amber-200 block">
                MINIGAME ĐỐ VUI TÌNH YÊU • TRIVIA
              </span>
              <h3 className="font-serif text-lg font-bold text-amber-50 leading-tight">
                Bạn Hiểu {groomName} & {brideName} Đến Đâu?
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

        {/* Main Content */}
        {!isFinished ? (
          <div className="p-5 sm:p-6 space-y-5">
            {/* Progress Bar & Counter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500">
                <span className="text-[#8B1A32]">Câu hỏi {currentIndex + 1} / {questions.length}</span>
                <span className="text-amber-800">Điểm: {score} / {questions.length}</span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#DFB76C] to-[#8B1A32] transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
              <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                {currentQ.question}
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-white border-stone-200 text-stone-800 hover:border-[#8B1A32] hover:bg-rose-50/40';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                  } else {
                    btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center space-x-3 pr-2">
                      <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 font-bold text-[11px] flex items-center justify-center shrink-0 border border-stone-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Next Button */}
            {isAnswered && (
              <div className="space-y-3 pt-2 animate-fadeIn">
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-[#8B1A32] leading-relaxed">
                  <strong>✦ Bật mí từ Dâu & Rể: </strong>
                  {currentQ.explanation}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-100 font-serif text-sm font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer border border-[#DFB76C]/40"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Câu Hỏi Tiếp Theo' : 'Xem Điểm & Chứng Nhận'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished Result Screen */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#DFB76C] to-[#A2682A] text-[#5C0E1F] flex items-center justify-center mx-auto shadow-xl border-4 border-white animate-pulse">
                <Award className="w-12 h-12 text-[#5C0E1F]" />
              </div>
              <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#DFB76C]">
                KẾT QUẢ ĐỐ VUI HOÀNG GIA
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#8B1A32]">
                {score === questions.length
                  ? 'Chứng Nhận: Tri Kỷ Hoàn Hảo ✦ 100%'
                  : score >= 3
                  ? 'Chứng Nhận: Bạn Thân Tâm Giao'
                  : 'Chứng Nhận: Khách Quý Đáng Yêu'}
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Bạn đã trả lời đúng <strong>{score} / {questions.length}</strong> câu hỏi về chuyện tình yêu của {groomName} & {brideName}!
              </p>
            </div>

            {/* Soulmate Certificate Badge Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#5C0E1F] via-[#3D0814] to-[#2B050E] text-white border-2 border-[#DFB76C] shadow-lg space-y-3 relative overflow-hidden">
              <div className="absolute top-2 right-3 text-[#DFB76C]/20 text-3xl font-serif">❦</div>
              <span className="text-[10px] text-[#DFB76C] uppercase tracking-[0.2em] font-bold block">
                MARRIME SOULMATE VERIFIED
              </span>
              <p className="font-serif text-base italic text-amber-100">
                "{score === questions.length
                  ? 'Không gì có thể qua mắt được bạn! Tình bạn gắn kết của bạn chính là món quà vô giá của Dâu & Rể!'
                  : 'Cảm ơn bạn đã luôn dõi theo và sẻ chia niềm vui cùng đôi uyên ương trong ngày hạnh phúc nhất!'}"
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-amber-300">
                <Heart className="w-4 h-4 fill-amber-300" />
                <span>{groomName} & {brideName} Trân Quý</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Chơi Lại</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1A32] to-[#722235] text-amber-100 hover:text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
