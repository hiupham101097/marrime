import React from 'react';
import {
  Crown,
  Compass,
  Heart,
  Sparkles,
  Flower2,
  BookOpen,
  Gem,
  ShieldCheck,
  Leaf,
  Landmark,
} from 'lucide-react';
import type { WeddingTemplate } from '../../shared/types';

interface TemplateAtelierEmblemProps {
  templateId: WeddingTemplate | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withContainer?: boolean;
}

export const TemplateAtelierEmblem: React.FC<TemplateAtelierEmblemProps> = ({
  templateId,
  size = 'md',
  className = '',
  withContainer = false,
}) => {
  const sizeMap = {
    sm: { icon: 'w-3.5 h-3.5', box: 'w-6 h-6 text-[10px]' },
    md: { icon: 'w-5 h-5', box: 'w-9 h-9 text-xs' },
    lg: { icon: 'w-6 h-6', box: 'w-11 h-11 text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const renderIcon = () => {
    switch (templateId) {
      case 'traditional':
        // Song Hỷ (囍) in authentic high-end serif gold calligraphy
        return (
          <span className="font-serif font-black text-[#B51824] leading-none select-none tracking-tighter">
            囍
          </span>
        );
      case 'royal':
        return <Crown className={`${currentSize.icon} text-[#B8860B]`} />;
      case 'indochine':
        return <Landmark className={`${currentSize.icon} text-[#1B382B]`} />;
      case 'rustic':
        return <Leaf className={`${currentSize.icon} text-[#4A5D4E]`} />;
      case 'editorial':
        return <BookOpen className={`${currentSize.icon} text-stone-900`} />;
      case 'korean':
        return <Flower2 className={`${currentSize.icon} text-[#E11D48]`} />;
      case 'celestial':
        return <Sparkles className={`${currentSize.icon} text-[#4F46E5]`} />;
      case 'fairytale':
        return <Heart className={`${currentSize.icon} text-[#BE185D]`} />;
      case 'modern':
        return <Gem className={`${currentSize.icon} text-stone-700`} />;
      case 'vintage':
        return <Compass className={`${currentSize.icon} text-[#064E3B]`} />;
      default:
        return <Sparkles className={`${currentSize.icon} text-[#A2682A]`} />;
    }
  };

  if (!withContainer) {
    return <span className={`inline-flex items-center justify-center ${className}`}>{renderIcon()}</span>;
  }

  return (
    <div
      className={`rounded-xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EA] to-[#F2E5D0] border border-[#DFB76C]/70 shadow-xs flex items-center justify-center shrink-0 ${currentSize.box} ${className}`}
    >
      {renderIcon()}
    </div>
  );
};
