'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/effects/fade-in';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, ArrowRight, Star } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { img, FALLBACK_IMAGES } from '@/lib/utils';

const ctaBg = img('dreamy sunset golden hour couple silhouette seaside horizon warm light overexposed film photography romantic ethereal misty', 'landscape_16_9');

const stats = [
  { value: '12,847', label: '对情侣', suffix: '' },
  { value: '186', label: '万张照片', suffix: '+' },
  { value: '4.9', label: '用户评分', suffix: '/5' },
  { value: '99.9', label: '安全守护', suffix: '%' },
];

export function CTASection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const yDecor = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* 背景图层 */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 pointer-events-none"
      >
        <SmartImage
          src={ctaBg}
          alt=""
          fill
          fallbackSrc={FALLBACK_IMAGES.hero}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-milk via-milk/85 to-milk" />
        <div className="absolute inset-0 bg-gradient-to-r from-milk/60 via-transparent to-milk/60" />
      </motion.div>

      {/* 背景装饰光球 */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-faded-peach/20 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-mist-blue/15 blur-[140px] rounded-full pointer-events-none"
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-line" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* 数据统计区 */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-24">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center group"
              >
                <div className="font-display text-3xl md:text-4xl text-soft-ink font-medium mb-1 transition-colors group-hover:text-faded-peach">
                  {stat.value}
                  <span className="text-lg text-ash-gray">{stat.suffix}</span>
                </div>
                <div className="text-xs text-ash-gray font-serif-sc tracking-wider">
                  {stat.label}
                </div>
                {/* 装饰点 */}
                <div className="w-1 h-1 rounded-full bg-faded-peach/40 mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* 主 CTA 区 */}
        <div className="text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-milk/80 backdrop-blur-sm border border-faded-peach/30 mb-8">
              <Sparkles className="w-4 h-4 text-faded-peach" />
              <span className="text-sm text-paper-brown font-serif-sc">
                现在开始，永远不晚
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-serif-sc text-4xl md:text-5xl lg:text-6xl text-soft-ink font-medium mb-6 leading-tight">
              你们的故事，
              <br />
              值得被<span className="text-faded-peach italic">永远</span>记住
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-ash-gray max-w-xl mx-auto mb-10 leading-relaxed text-lg">
              只需 3 分钟，创建一个专属于你们的爱情空间。
              <br className="hidden md:block" />
              让那些美好的瞬间，在时光里闪闪发光。
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/new">
                <Button size="lg" className="group">
                  <Heart className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  免费创建空间
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/space/demo">
                <Button variant="outline" size="lg">
                  先看看示例
                </Button>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 text-faded-peach fill-current" />
              ))}
            </div>
            <p className="text-xs text-ash-gray/70 font-display italic">
              No credit card required · Cancel anytime · 已有 12,847+ 对情侣选择永恒
            </p>
          </FadeIn>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <div className="w-12 h-px bg-faded-peach/30" />
            <Heart className="w-8 h-8 text-faded-peach/40 fill-current" />
            <div className="w-12 h-px bg-faded-peach/30" />
          </motion.div>

          <FadeIn delay={0.8}>
            <p className="mt-8 font-serif-sc text-sm text-soft-ink/50 italic">
              "在所有物是人非的风景里，我最喜欢你。"
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
