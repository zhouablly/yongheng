'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/effects/fade-in';
import { Divider } from '@/components/ui/divider';
import { Heart, Image, FileText, Calendar, Clock, Sparkles, Shield, Palette } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { img, FALLBACK_IMAGES } from '@/lib/utils';

const features = [
  {
    icon: Image,
    title: '时光相册',
    desc: '上传你们的每一张照片，按时间轴排列，让回忆有迹可循。支持批量上传、地点标记、故事描述。',
    image: img('vintage photo album open pages polaroids scattered warm light film aesthetic overexposed soft focus', 'landscape_4_3'),
    label: 'Photos',
  },
  {
    icon: FileText,
    title: '手写情书',
    desc: '在这个快节奏的时代，写下一封慢情书。复古信纸质感，保存最真挚的心意。',
    image: img('handwritten love letter on vintage paper fountain pen warm candlelight film photography romantic', 'landscape_4_3'),
    label: 'Letters',
  },
  {
    icon: Clock,
    title: '时间轴',
    desc: '以时间为线，串联起你们的每一个重要时刻。从初遇到白头，每一步都算数。',
    image: img('vintage timeline scrapbook old photographs string clips warm light film aesthetic overexposed', 'landscape_4_3'),
    label: 'Timeline',
  },
  {
    icon: Calendar,
    title: '纪念日提醒',
    desc: '再也不会忘记重要的日子。在一起的第 100 天、第 1000 天，每个纪念日都被温柔提醒。',
    image: img('vintage calendar with marked dates flowers soft morning light film photography romantic overexposed', 'landscape_4_3'),
    label: 'Anniversaries',
  },
  {
    icon: Palette,
    title: '专属主题',
    desc: '选择你们喜欢的色调和字体风格，打造独一无二的爱情空间。',
    image: img('watercolor palette brushes soft pastel colors warm light film aesthetic artistic overexposed', 'landscape_4_3'),
    label: 'Themes',
  },
  {
    icon: Shield,
    title: '私密安全',
    desc: '你们的故事只属于你们。端到端加密，仅彼此可见，守护最珍贵的回忆。',
    image: img('vintage lock key secret box warm light film photography romantic soft focus overexposed dreamy', 'landscape_4_3'),
    label: 'Privacy',
  },
];

export function FeaturesSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yDecor = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-porcelain/30 overflow-hidden"
    >
      {/* 背景装饰光球 */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-20 -left-20 w-[400px] h-[400px] bg-sun-wash/15 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-20 -right-20 w-[400px] h-[400px] bg-mist-blue/15 blur-[120px] rounded-full pointer-events-none"
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-line" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm text-paper-brown font-display italic mb-3">Features</p>
            <h2 className="font-serif-sc text-3xl md:text-4xl text-soft-ink font-medium mb-4">
              为你们的爱情而生
            </h2>
            <p className="text-ash-gray max-w-xl mx-auto">
              每一个功能，都在温柔地守护你们的故事
            </p>
            <Divider variant="dot" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl bg-milk/80 backdrop-blur-sm border border-line/40 hover:border-faded-peach/40 hover:shadow-xl hover:shadow-soft-ink/5 hover:-translate-y-1.5 transition-all duration-500 ease-out">
                {/* 图片层 */}
                <div className="relative h-44 overflow-hidden">
                  <SmartImage
                    src={feature.image}
                    alt={feature.title}
                    fill
                    fallbackSrc={FALLBACK_IMAGES.landscape}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-milk via-milk/40 to-transparent" />
                  {/* 图标徽章 */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-milk/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-soft-ink/5 group-hover:bg-faded-peach group-hover:scale-110 transition-all duration-500">
                    <feature.icon className="w-6 h-6 text-faded-peach group-hover:text-milk transition-colors duration-500" />
                  </div>
                  {/* 标签 */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-milk/70 backdrop-blur-sm">
                    <span className="text-xs font-display italic text-paper-brown">
                      {feature.label}
                    </span>
                  </div>
                </div>

                {/* 文字层 */}
                <div className="relative p-6 md:p-7">
                  <h3 className="font-serif-sc text-lg text-soft-ink font-medium mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ash-gray leading-relaxed">{feature.desc}</p>

                  {/* 底部装饰 */}
                  <div className="mt-5 flex items-center gap-2 text-xs text-paper-brown/60 font-display italic">
                    <span className="w-8 h-px bg-paper-brown/30" />
                    <span>0{index + 1}</span>
                  </div>
                </div>

                {/* hover 装饰角 */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-faded-peach/0 group-hover:border-faded-peach/40 rounded-tr-xl transition-all duration-500 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-faded-peach/0 group-hover:border-faded-peach/40 rounded-bl-xl transition-all duration-500 pointer-events-none" />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 底部装饰 */}
        <FadeIn delay={0.4}>
          <div className="mt-16 flex items-center justify-center gap-4 text-paper-brown/40">
            <span className="w-12 h-px bg-paper-brown/20" />
            <Heart className="w-4 h-4 fill-current" />
            <span className="w-12 h-px bg-paper-brown/20" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
