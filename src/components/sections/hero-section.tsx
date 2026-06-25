'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SmartImage } from '@/components/ui/smart-image';
import { FadeIn } from '@/components/effects/fade-in';
import { GlowText } from '@/components/effects/glow-text';
import { CountUp } from '@/components/effects/count-up';
import { img, FALLBACK_IMAGES } from '@/lib/utils';
import { ChevronDown, Heart, Sparkles, Feather } from 'lucide-react';

const heroBg = img('dreamy overexposed film photography morning mist white curtain soft sunlight sea blue sky light leaked faded paper aesthetic minimalist romantic', 'landscape_16_9');
const heroSideLeft = img('vintage polaroid photo couple hands holding warm light film grain faded peach color soft focus overexposed romantic memory', 'portrait_4_3');
const heroSideRight = img('film photography couple silhouette window light morning mist soft blue tone dreamy vintage light leaked memory aesthetic', 'portrait_4_3');

export function HeroSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景图层 */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0"
      >
        <SmartImage
          src={heroBg}
          alt="晨雾白窗帘与柔和阳光"
          fill
          fallbackSrc={FALLBACK_IMAGES.hero}
          className="w-full h-full object-cover"
          wrapperClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-milk/70 via-milk/60 to-milk" />
        <div className="absolute inset-0 bg-gradient-to-r from-milk/40 via-transparent to-milk/40" />
      </motion.div>

      {/* 装饰光球 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-faded-peach/30 blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-mist-blue/40 blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sun-wash/20 blur-[150px]"
        />
      </div>

      {/* 左右装饰图片 - 仅在大屏显示 */}
      <div className="absolute inset-0 z-[2] pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[5%] top-[18%] w-[200px] h-[260px]"
        >
          <div className="relative w-full h-full bg-milk p-3 pb-12 shadow-2xl shadow-soft-ink/20 rounded-sm">
            <SmartImage
              src={heroSideLeft}
              alt="那年夏天 青岛"
              fill
              fallbackSrc={FALLBACK_IMAGES.portrait}
              className="w-full h-full object-cover rounded-sm"
              wrapperClassName="w-full h-full rounded-sm overflow-hidden"
            />
            <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-paper-brown font-display italic">
              那年夏天 · 青岛
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 5 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[5%] top-[22%] w-[200px] h-[260px]"
        >
          <div className="relative w-full h-full bg-milk p-3 pb-12 shadow-2xl shadow-soft-ink/20 rounded-sm">
            <SmartImage
              src={heroSideRight}
              alt="清晨的光 家"
              fill
              fallbackSrc={FALLBACK_IMAGES.portrait}
              className="w-full h-full object-cover rounded-sm"
              wrapperClassName="w-full h-full rounded-sm overflow-hidden"
            />
            <p className="absolute bottom-3 left-0 right-0 text-center text-xs text-paper-brown font-display italic">
              清晨的光 · 家
            </p>
          </div>
        </motion.div>
      </div>

      {/* 主内容 */}
      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-milk/70 backdrop-blur-md border border-line/40 mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-faded-peach" />
          <span className="text-sm text-ash-gray font-serif-sc">
            为每一段爱情，打造永恒的光
          </span>
        </motion.div>

        <FadeIn delay={0.3}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-soft-ink mb-4 tracking-wider">
            <GlowText intensity="low">YǑNG HÉNG</GlowText>
          </h1>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12 bg-paper-brown/40" />
            <p className="font-serif-sc text-3xl md:text-4xl text-soft-ink/90 tracking-widest">
              永恒
            </p>
            <span className="h-px w-12 bg-paper-brown/40" />
          </div>
        </FadeIn>

        <FadeIn delay={0.7}>
          <p className="text-base md:text-lg text-soft-ink/80 max-w-2xl mx-auto leading-relaxed mb-4 font-serif-sc">
            光的档案馆 · 你们的爱情故事，值得被永远铭记
          </p>
        </FadeIn>

        <FadeIn delay={0.9}>
          <p className="text-sm text-ash-gray/80 font-display italic max-w-xl mx-auto mb-12">
            &quot;In the light of memory, every moment becomes eternal.&quot;
          </p>
        </FadeIn>

        <FadeIn delay={1.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/new">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-faded-peach/20">
                <Heart className="w-4 h-4 mr-2" />
                创建你们的空间
              </Button>
            </Link>
            <Link href="#story">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-milk/50 backdrop-blur-sm">
                <Feather className="w-4 h-4 mr-2" />
                了解更多
              </Button>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={1.4}>
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display text-soft-ink mb-1">
                <CountUp end={12800} suffix="+" duration={2} />
              </div>
              <p className="text-xs text-ash-gray font-serif-sc">爱情故事</p>
            </div>
            <div className="w-px h-10 bg-line/60" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display text-soft-ink mb-1">
                <CountUp end={98.7} suffix="%" decimals={1} duration={2} delay={0.3} />
              </div>
              <p className="text-xs text-ash-gray font-serif-sc">用户满意</p>
            </div>
            <div className="w-px h-10 bg-line/60" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display text-soft-ink mb-1">
                <CountUp end={365} suffix="+" duration={2} delay={0.6} />
              </div>
              <p className="text-xs text-ash-gray font-serif-sc">日夜陪伴</p>
            </div>
          </div>
        </FadeIn>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ash-gray/50 z-10"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
