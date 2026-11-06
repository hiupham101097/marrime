import React, { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, Wand2 } from 'lucide-react';
import { AnimationEffect } from '../../shared/types';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  type: 'rose_petal' | 'white_petal' | 'gold_dust' | 'heart' | 'snowflake';
}

interface TrailSparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  speedY: number;
  speedX: number;
  life: number;
  isHeart: boolean;
}

interface FloatingEffectsProps {
  animationEffect?: AnimationEffect;
  enableMouseTrail?: boolean;
}

export const FloatingEffects: React.FC<FloatingEffectsProps> = ({
  animationEffect = 'mixed_romance',
  enableMouseTrail = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const mousePos = useRef<{ x: number; y: number } | null>(null);
  const sparklesTrail = useRef<TrailSparkle[]>([]);

  useEffect(() => {
    if (!isEnabled || animationEffect === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse movement for interactive golden spark & love trail
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseTrail) return;
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Spawn 2-3 romantic fairy sparkles at cursor
      if (Math.random() > 0.3) {
        sparklesTrail.current.push({
          x: e.clientX + (Math.random() - 0.5) * 15,
          y: e.clientY + (Math.random() - 0.5) * 15,
          size: Math.random() * 5 + 4,
          opacity: 0.9,
          color: Math.random() > 0.4 ? '#F3E5AB' : '#F472B6',
          speedY: -(Math.random() * 1.5 + 0.5),
          speedX: (Math.random() - 0.5) * 1,
          life: 1.0,
          isHeart: Math.random() > 0.5,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Ambient floating particles setup based on animationEffect
    const particleCount = Math.min(Math.floor(width / 35), 32);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      let type: Particle['type'] = 'rose_petal';

      if (animationEffect === 'rose_petals') {
        type = Math.random() > 0.4 ? 'rose_petal' : 'white_petal';
      } else if (animationEffect === 'golden_stardust') {
        type = 'gold_dust';
      } else if (animationEffect === 'glowing_hearts') {
        type = 'heart';
      } else if (animationEffect === 'winter_snow') {
        type = 'snowflake';
      } else {
        // mixed_romance
        const rand = Math.random();
        if (rand < 0.35) type = 'rose_petal';
        else if (rand < 0.6) type = 'gold_dust';
        else if (rand < 0.8) type = 'white_petal';
        else type = 'heart';
      }

      const isAscending = type === 'gold_dust';
      const isSnow = type === 'snowflake';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          type === 'gold_dust'
            ? Math.random() * 3 + 2
            : isSnow
            ? Math.random() * 5 + 4
            : Math.random() * 10 + 7,
        speedY: isAscending
          ? -(Math.random() * 0.6 + 0.2)
          : isSnow
          ? Math.random() * 0.8 + 0.4
          : Math.random() * 1.1 + 0.5,
        speedX: (Math.random() - 0.5) * (isSnow ? 0.9 : 0.7),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.35,
        color:
          type === 'heart'
            ? 'rgba(244, 114, 182, 0.75)'
            : type === 'gold_dust'
            ? 'rgba(218, 165, 32, 0.85)'
            : 'rgba(222, 91, 120, 0.65)',
        type,
      });
    }

    const drawHeart = (x: number, y: number, size: number, opacity: number, rot: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
      ctx.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${opacity})`);
      ctx.shadowColor = 'rgba(244, 114, 182, 0.4)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    };

    const drawPetal = (x: number, y: number, size: number, opacity: number, rot: number, isWhite: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.45, size, Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = isWhite
        ? `rgba(255, 245, 248, ${opacity * 0.9})`
        : `rgba(244, 114, 182, ${opacity * 0.8})`;
      ctx.shadowColor = 'rgba(255, 182, 193, 0.3)';
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.restore();
    };

    const drawGoldStar = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243, 229, 171, ${opacity})`;
      ctx.shadowColor = 'rgba(218, 165, 32, 0.8)';
      ctx.shadowBlur = 8;
      ctx.fill();

      // Tiny cross sparkle
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-size * 2, 0);
      ctx.lineTo(size * 2, 0);
      ctx.moveTo(0, -size * 2);
      ctx.lineTo(size * 2, 0);
      ctx.stroke();
      ctx.restore();
    };

    const drawSnowflake = (x: number, y: number, size: number, opacity: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
      ctx.shadowColor = 'rgba(210, 235, 255, 0.8)';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, size);
        ctx.moveTo(0, size * 0.5);
        ctx.lineTo(-size * 0.25, size * 0.7);
        ctx.moveTo(0, size * 0.5);
        ctx.lineTo(size * 0.25, size * 0.7);
        ctx.stroke();
        ctx.rotate(Math.PI / 3);
      }
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render ambient falling particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.6 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.type === 'gold_dust') {
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          drawGoldStar(p.x, p.y, p.size, p.opacity);
        } else if (p.type === 'snowflake') {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;
          drawSnowflake(p.x, p.y, p.size, p.opacity, p.rotation);
        } else {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          if (p.type === 'heart') {
            drawHeart(p.x, p.y, p.size, p.opacity, p.rotation, p.color);
          } else {
            drawPetal(p.x, p.y, p.size, p.opacity, p.rotation, p.type === 'white_petal');
          }
        }
      });

      // 2. Render interactive mouse sparkles trail
      if (enableMouseTrail) {
        for (let i = sparklesTrail.current.length - 1; i >= 0; i--) {
          const sp = sparklesTrail.current[i];
          sp.y += sp.speedY;
          sp.x += sp.speedX;
          sp.life -= 0.02;

          if (sp.life <= 0) {
            sparklesTrail.current.splice(i, 1);
            continue;
          }

          const currentOpacity = sp.opacity * sp.life;
          if (sp.isHeart) {
            drawHeart(sp.x, sp.y, sp.size * sp.life, currentOpacity, 0, '#EC4899');
          } else {
            drawGoldStar(sp.x, sp.y, sp.size * sp.life * 0.6, currentOpacity);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled, animationEffect, enableMouseTrail]);

  if (animationEffect === 'none') {
    return null;
  }

  return (
    <>
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30"
          aria-hidden="true"
        />
      )}

      {/* Floating Toggle Button for romantic effects */}
      <div className="fixed bottom-20 left-4 z-40 flex items-center group">
        <button
          type="button"
          onClick={() => setIsEnabled(!isEnabled)}
          title={isEnabled ? 'Tạm ẩn hiệu ứng bay' : 'Bật lại hiệu ứng bay'}
          className={`p-3 rounded-full shadow-luxury border backdrop-blur-md transition-all cursor-pointer ${
            isEnabled
              ? 'bg-gradient-to-r from-wedding-rose-50 to-amber-50 border-wedding-gold/50 text-wedding-rose-600 scale-100 hover:scale-110'
              : 'bg-white/90 border-stone-200 text-stone-400'
          }`}
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
        </button>
        <span className="hidden group-hover:block ml-2 px-2.5 py-1 bg-stone-900/90 text-white text-[10px] rounded-lg shadow-md whitespace-nowrap">
          {isEnabled ? 'Hiệu ứng hoạt ảnh: Đang Bật' : 'Tạm ẩn hiệu ứng'}
        </span>
      </div>
    </>
  );
};
