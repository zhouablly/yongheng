'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Lenis 平滑滚动 + GSAP ScrollTrigger 集成
 * 提升整页滚动的惯性与丝滑感，让 ScrollFilm 章节切换更电影化
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // 移动端不启用 Lenis（原生滚动更跟手）
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Lenis 滚动事件 → 同步 ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 将 Lenis.raf 接入 gsap.ticker，保证两套动画系统同帧驱动
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 刷新 ScrollTrigger 以适配 Lenis
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
