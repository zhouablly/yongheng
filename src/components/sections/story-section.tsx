'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/effects/fade-in';
import { Divider } from '@/components/ui/divider';
import { SmartImage } from '@/components/ui/smart-image';
import { img, FALLBACK_IMAGES } from '@/lib/utils';
import { Camera, Hourglass, Sparkles } from 'lucide-react';

const storyImage1 = img('vintage film photography old photo album open page polaroid memories warm light faded paper overexposed nostalgic aesthetic', 'landscape_4_3');
const storyImage2 = img('film photography hourglass sand timer soft morning light vintage aesthetic faded peach color dreamy minimalist', 'landscape_4_3');
const storyImage3 = img('eternal light candle flame soft glow warm atmosphere dark background cinematic film aesthetic romantic memory', 'landscape_4_3');

const features = [
  {
    title: '收藏',
    desc: '照片、情书、纪念日，你们的每一刻都值得被留住',
    icon: Camera,
    image: storyImage1,
    label: 'Archive',
  },
  {
    title: '时光',
    desc: '以时间为轴，记录你们走过的每一步',
    icon: Hourglass,
    image: storyImage2,
    label: 'Time',
  },
  {
    title: '永恒',
    desc: '在光的档案馆里，爱情永不褪色',
    icon: Sparkles,
    image: storyImage3,
    label: 'Eternal',
  },
];

export function StorySection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yDecor = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section id="story" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-milk to-transparent pointer-events-none" />

      {/* 背景装饰 */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-sun-wash/15 blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-20 -left-32 w-80 h-80 rounded-full bg-mist-blue/15 blur-[120px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm text-paper-brown font-display italic mb-3">Our Story</p>
            <h2 className="font-serif-sc text-3xl md:text-4xl text-soft-ink font-medium mb-4">
              关于永恒
            </h2>
            <Divider variant="dot" />
          </div>
        </FadeIn>

        <div className="space-y-10 md:space-y-16">
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-soft-ink/80 leading-relaxed font-serif-sc text-center max-w-3xl mx-auto">
              我们相信，每一段爱情都值得被珍藏。
              <br className="hidden md:block" />
              那些平凡日常里的微光，那些一起走过的路，
              <br className="hidden md:block" />
              应该在时间的长河里，拥有一个专属的角落。
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="relative py-12 px-8 md:px-16 rounded-3xl bg-gradient-to-br from-milk/80 via-porcelain/40 to-milk/80 border border-line/40 backdrop-blur-sm overflow-hidden">
              {/* 装饰角 */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-faded-peach/30 rounded-tl-2xl" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-faded-peach/30 rounded-tr-2xl" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-faded-peach/30 rounded-bl-2xl" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-faded-peach/30 rounded-br-2xl" />

              <div className="absolute top-6 left-8 text-7xl font-display text-faded-peach/20 select-none leading-none">
                &ldquo;
              </div>
              <p className="text-base md:text-lg text-ash-gray leading-loose font-serif-sc italic relative z-10 pt-4">
                永恒不是时间的无限延长，
                <br />
                而是当你想起某个人的时候，
                <br />
                心里那束不会熄灭的光。
              </p>
              <div className="mt-6 text-right relative z-10">
                <span className="text-sm text-paper-brown font-display">—— 写在开篇</span>
              </div>
            </div>
          </FadeIn>

          {/* 三栏精致卡片 - 替换 emoji */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {features.map((item, i) => (
              <FadeIn key={item.title} delay={0.2 + i * 0.15}>
                <div className="group relative overflow-hidden rounded-2xl bg-milk/60 border border-line/40 hover:border-faded-peach/40 hover:shadow-xl hover:shadow-soft-ink/5 transition-all duration-500 ease-out hover:-translate-y-1">
                  {/* 图片层 */}
                  <div className="relative h-44 overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={item.title}
                      fill
                      fallbackSrc={FALLBACK_IMAGES.landscape}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      wrapperClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-milk via-milk/40 to-transparent" />
                    {/* 图标 */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-milk/80 backdrop-blur-md flex items-center justify-center shadow-md">
                      <item.icon className="w-5 h-5 text-faded-peach" />
                    </div>
                    {/* 标签 */}
                    <span className="absolute top-4 right-4 text-xs text-paper-brown font-display italic bg-milk/70 backdrop-blur-sm px-2 py-1 rounded-full">
                      {item.label}
                    </span>
                  </div>
                  {/* 文字层 */}
                  <div className="p-6">
                    <h3 className="font-serif-sc text-lg text-soft-ink font-medium mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ash-gray leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
