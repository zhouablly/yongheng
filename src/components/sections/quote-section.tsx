'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/effects/fade-in';
import { Quote } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { img, FALLBACK_IMAGES } from '@/lib/utils';

const quoteBg = img('empty vintage paper texture aged parchment soft warm light minimal overexposed film aesthetic dreamy', 'landscape_16_9');

const quotes = [
  {
    text: '我喜欢你，不是因为你是什么样的人，而是因为喜欢和你在一起时的自己。',
    author: '陈屿 → 林深',
    date: '2020.05.20',
  },
  {
    text: '如果有一天我们都老了，我希望先走的是我。不是因为我不愿留下来陪你，而是因为我舍不得看你独自承受失去。',
    author: '林深 → 陈屿',
    date: '2021.11.05',
  },
  {
    text: '所有的相遇都是久别重逢。我们在人海里走散过无数次，终于在这一生，找到了彼此。',
    author: '陈屿 → 林深',
    date: '2022.09.12',
  },
];

export function QuoteSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yDecor = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yQuote = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);

  return (
    <section
      id="quote"
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* 背景装饰图 */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
      >
        <SmartImage
          src={quoteBg}
          alt=""
          fill
          fallbackSrc={FALLBACK_IMAGES.landscape}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 背景装饰光球 */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-sun-wash/20 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-1/3 right-0 w-[450px] h-[450px] bg-faded-peach/15 blur-[140px] rounded-full pointer-events-none"
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-line" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* 标题区 */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-milk/60 backdrop-blur-sm border border-line/40 mb-4">
              <Quote className="w-3.5 h-3.5 text-faded-peach" />
              <span className="text-xs text-paper-brown font-display italic tracking-wider">
                Words of Love
              </span>
            </div>
            <h2 className="font-serif-sc text-3xl md:text-4xl text-soft-ink font-medium mb-4">
              那些被时光收藏的话
            </h2>
            <p className="text-ash-gray max-w-xl mx-auto">
              每一句，都是写给彼此的情诗
            </p>
          </div>
        </FadeIn>

        {/* 主引文 */}
        <motion.div
          style={{ y: yQuote }}
          className="text-center mb-20"
        >
          <FadeIn delay={0.2}>
            <div className="relative">
              <Quote className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 text-faded-peach/20 fill-current" />
              <p className="font-serif-sc text-2xl md:text-3xl lg:text-4xl text-soft-ink font-medium leading-relaxed italic max-w-3xl mx-auto pt-8">
                "在所有物是人非的风景里，
                <br />
                <span className="text-faded-peach">我最喜欢你。</span>"
              </p>
              <p className="mt-6 text-sm text-ash-gray font-display italic">
                —— 写于 2023 年的某个深夜
              </p>
            </div>
          </FadeIn>
        </motion.div>

        {/* 引文卡片网格 */}
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full p-8 rounded-2xl bg-milk/70 backdrop-blur-sm border border-line/40 hover:border-faded-peach/40 hover:shadow-lg transition-all duration-500"
              >
                {/* 装饰引号 */}
                <div className="absolute top-4 right-4 font-serif-sc text-5xl text-faded-peach/15 leading-none">
                  "
                </div>

                {/* 编号 */}
                <div className="font-display text-xs text-ash-gray/50 italic mb-4">
                  No. 0{i + 1}
                </div>

                <p className="font-serif-sc text-base text-soft-ink/85 leading-relaxed mb-6 italic">
                  {q.text}
                </p>

                <div className="pt-4 border-t border-line/40">
                  <p className="text-sm text-paper-brown font-serif-sc">
                    {q.author}
                  </p>
                  <p className="text-xs text-ash-gray/60 mt-1 font-display italic">
                    {q.date}
                  </p>
                </div>

                {/* hover 装饰角 */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-faded-peach/0 group-hover:border-faded-peach/40 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-faded-peach/0 group-hover:border-faded-peach/40 transition-colors duration-500" />
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* 底部装饰 */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-px bg-line" />
              <span className="font-display text-xs text-ash-gray/60 italic tracking-wider">
                Forever Yours
              </span>
              <div className="w-12 h-px bg-line" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
