'use client';

import * as React from 'react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, isMobile as checkIsMobile } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 530;
const FRAME_PATH = '/frames';

const chapters = [
  {
    id: 'classroom',
    title: '教室的那束光',
    subtitle: 'CLASSROOM LIGHT',
    description: '阳光斜斜地落在你桌角，那是我们故事的开始',
  },
  {
    id: 'note',
    title: '第一张纸条',
    subtitle: 'THE FIRST NOTE',
    description: '折叠的纸条里，藏着少年最青涩的心意',
  },
  {
    id: 'campus',
    title: '校园时光',
    subtitle: 'CAMPUS YEARS',
    description: '一起走过的林荫道，一起看过的晚霞',
  },
  {
    id: 'city',
    title: '城市的夜',
    subtitle: 'CITY NIGHT',
    description: '在陌生的城市，我们成为彼此的家',
  },
  {
    id: 'seaside',
    title: '海边',
    subtitle: 'SEASIDE',
    description: '听海浪的声音，像你说的永远',
  },
  {
    id: 'dance',
    title: '起舞',
    subtitle: 'DANCE',
    description: '在世界尽头的沙滩上，我们翩翩起舞',
  },
];

interface ScrollFilmProps {
  className?: string;
}

// Preload all WebP frames with progress tracking
function preloadFrames(
  onProgress: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  return new Promise((resolve) => {
    const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    const handleLoad = () => {
      loaded++;
      onProgress(loaded, TOTAL_FRAMES);
      if (loaded === TOTAL_FRAMES) {
        resolve(frames);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = i;
      img.onload = handleLoad;
      img.onerror = handleLoad;
      img.src = `${FRAME_PATH}/frame_${String(idx).padStart(3, '0')}.webp`;
      frames[idx] = img;
    }
  });
}

// Draw frame on canvas: 放大画面让右下角 veo 水印被裁出可视区
// 左上角对齐，右下角超出 canvas 被裁切
function drawFrameContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) {
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth: number;
  let drawHeight: number;

  // 先按 contain 计算基础尺寸（完整显示）
  if (imgRatio > canvasRatio) {
    drawWidth = canvasWidth;
    drawHeight = drawWidth / imgRatio;
  } else {
    drawHeight = canvasHeight;
    drawWidth = drawHeight * imgRatio;
  }

  // 放大裁切：确保两个维度都略超 canvas，左上角对齐让右下角 veo 水印被裁出可视区
  const scale = Math.max(
    canvasWidth / drawWidth,
    canvasHeight / drawHeight,
    1.08
  );
  drawWidth *= scale;
  drawHeight *= scale;

  // 填充黑色背景（防止极端情况下露白）
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  // 左上角对齐，右下角超出 canvas 被自然裁切
  ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
}

export function ScrollFilm({ className }: ScrollFilmProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    setIsMobile(checkIsMobile());
  }, []);

  // Preload frames on desktop
  useEffect(() => {
    if (isMobile) return;

    let cancelled = false;
    preloadFrames((loaded, total) => {
      if (!cancelled) {
        setLoadProgress(Math.round((loaded / total) * 100));
      }
    }).then((frames) => {
      if (!cancelled) {
        framesRef.current = frames;
        setFramesReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  // Draw a specific frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames = framesRef.current;
    if (!frames || frames.length === 0) return;

    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
    const img = frames[idx];
    if (img) {
      drawFrameContain(ctx, img, canvas.width, canvas.height);
    }
  }, []);

  // Setup canvas size
  useEffect(() => {
    if (isMobile || !framesReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      // 内部分辨率 = CSS 尺寸 × DPR，绘制函数直接使用 canvas.width/height
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      // 重绘当前帧（drawFrameContain 使用 canvas.width/height，无需 ctx.scale）
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [isMobile, framesReady, drawFrame]);

  // Setup ScrollTrigger after frames are ready
  useEffect(() => {
    if (isMobile || !framesReady) return;
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const totalChapters = chapters.length;

    // Draw initial frame
    drawFrame(0);

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const frameIndex = Math.min(
          Math.floor(progress * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );

        // Use rAF to throttle canvas draws
        if (rafRef.current === null) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            if (frameIndex !== currentFrameRef.current) {
              currentFrameRef.current = frameIndex;
              drawFrame(frameIndex);
            }
          });
        }

        const chapterIndex = Math.min(
          Math.floor(progress * totalChapters),
          totalChapters - 1
        );
        setActiveChapter(chapterIndex);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isMobile, framesReady, drawFrame]);

  if (isMobile) {
    return (
      <section className={cn('relative py-20 bg-porcelain', className)}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm text-paper-brown font-display italic mb-3">Our Story</p>
            <h2 className="font-serif-sc text-3xl text-soft-ink font-medium mb-4">
              我们的故事
            </h2>
          </div>
          <div className="space-y-12">
            {chapters.map((chapter, i) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-faded-peach/20 flex items-center justify-center">
                  <span className="text-3xl">{['☀️', '📝', '🎓', '🌃', '🌊', '💃'][i]}</span>
                </div>
                <p className="font-display text-xs text-paper-brown tracking-widest mb-2">
                  {chapter.subtitle}
                </p>
                <h3 className="font-serif-sc text-xl text-soft-ink font-medium mb-2">
                  {chapter.title}
                </h3>
                <p className="text-sm text-ash-gray">{chapter.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className={cn('relative', className)}
      style={{ height: `${chapters.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-soft-ink">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: framesReady ? 'block' : 'none' }}
        />

        {/* Loading state */}
        {!framesReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-soft-ink">
            <div className="w-48 h-px bg-milk/20 relative overflow-hidden mb-6">
              <motion.div
                className="absolute inset-y-0 left-0 bg-milk"
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-milk/60 text-sm font-display tracking-widest">
              LOADING FILM · {loadProgress}%
            </p>
          </div>
        )}

        <div className="absolute inset-0 film-grain opacity-10 pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p
                className="font-display text-sm md:text-base text-milk/90 tracking-[0.3em] mb-4"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 0 24px rgba(0,0,0,0.6)' }}
              >
                {chapters[activeChapter].subtitle}
              </p>
              <h2
                className="font-serif-sc text-4xl md:text-6xl text-milk font-medium mb-4"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.85), 0 0 32px rgba(0,0,0,0.7)' }}
              >
                {chapters[activeChapter].title}
              </h2>
              <p
                className="text-milk/95 text-base md:text-lg font-serif-sc"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.85), 0 0 24px rgba(0,0,0,0.65)' }}
              >
                {chapters[activeChapter].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {chapters.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-1.5 rounded-full transition-all duration-500',
                i === activeChapter
                  ? 'w-6 bg-milk h-2'
                  : 'w-1.5 bg-milk/30 h-1.5'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
