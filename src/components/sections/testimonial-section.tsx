'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/effects/fade-in';
import { Divider } from '@/components/ui/divider';
import { Heart, MessageCircle, Star, Quote } from 'lucide-react';
import { demoTestimonials } from '@/lib/demo-data';
import { SmartImage } from '@/components/ui/smart-image';
import { img, FALLBACK_IMAGES } from '@/lib/utils';

const testimonialBg = img('polaroid photos scattered on wooden table warm light film aesthetic cozy memory wall overexposed dreamy', 'landscape_16_9');

export function TestimonialSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yDecor = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* 背景装饰图 */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
      >
        <SmartImage
          src={testimonialBg}
          alt=""
          fill
          fallbackSrc={FALLBACK_IMAGES.landscape}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 背景装饰光球 */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-20 right-0 w-[450px] h-[450px] bg-faded-peach/15 blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-mist-blue/15 blur-[120px] rounded-full pointer-events-none"
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-line" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-milk/60 backdrop-blur-sm border border-line/40 mb-4">
              <MessageCircle className="w-3.5 h-3.5 text-faded-peach" />
              <span className="text-xs text-paper-brown font-display italic tracking-wider">
                Love Stories
              </span>
            </div>
            <h2 className="font-serif-sc text-3xl md:text-4xl text-soft-ink font-medium mb-4">
              他们的故事
            </h2>
            <p className="text-ash-gray max-w-xl mx-auto">
              来自真实情侣的温柔见证
            </p>
            <Divider variant="dot" />
          </div>
        </FadeIn>

        {/* 引文装饰 */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-12">
            <p className="font-serif-sc text-lg md:text-xl text-soft-ink/70 italic max-w-2xl mx-auto leading-relaxed">
              "每一对恋人，都是世界上独一无二的诗。"
            </p>
          </div>
        </FadeIn>

        {/* 见证卡片 */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {demoTestimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full p-8 rounded-2xl bg-milk/70 backdrop-blur-sm border border-line/40 hover:border-faded-peach/40 hover:shadow-xl transition-all duration-500"
              >
                {/* 装饰引号 */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-faded-peach/20 fill-current" />

                {/* 评分 */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 text-faded-peach fill-current" />
                  ))}
                </div>

                {/* 内容 */}
                <p className="font-serif-sc text-base text-soft-ink/85 leading-relaxed mb-6 italic">
                  "{t.content}"
                </p>

                {/* 分隔线 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-px bg-line/60" />
                  <Heart className="w-3 h-3 text-faded-peach/40 fill-current" />
                  <div className="flex-1 h-px bg-line/60" />
                </div>

                {/* 用户信息 */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-faded-peach/30 flex-shrink-0">
                    <SmartImage
                      src={t.avatar}
                      alt={t.name}
                      fill
                      fallbackSrc={FALLBACK_IMAGES.portrait}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif-sc text-sm text-soft-ink font-medium truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-ash-gray/70 font-display italic">
                      在一起 {t.days} 天 · {t.location}
                    </p>
                  </div>
                </div>

                {/* hover 装饰角 */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-faded-peach/0 group-hover:border-faded-peach/40 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-faded-peach/0 group-hover:border-faded-peach/40 transition-colors duration-500" />
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* 底部统计 */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-6 px-8 py-4 rounded-full bg-milk/60 backdrop-blur-sm border border-line/40">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-faded-peach fill-current" />
                  ))}
                </div>
                <span className="font-display text-sm text-soft-ink font-medium">4.9</span>
              </div>
              <div className="w-px h-6 bg-line" />
              <span className="font-serif-sc text-sm text-ash-gray">
                <span className="text-soft-ink font-medium">12,847+</span> 对情侣的选择
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
