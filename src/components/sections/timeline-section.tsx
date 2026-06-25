'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/effects/fade-in';
import { Divider } from '@/components/ui/divider';
import { Timeline } from '@/components/ui/timeline';
import { Button } from '@/components/ui/button';
import { demoTimeline } from '@/lib/demo-data';
import { ArrowRight, Clock } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { img, FALLBACK_IMAGES } from '@/lib/utils';

const timelineBg = img('vintage scrapbook timeline old photographs string clips wooden table warm light film aesthetic overexposed dreamy soft focus', 'landscape_16_9');

export function TimelineSection() {
  const previewEvents = demoTimeline.slice(0, 6);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yDecor = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* 背景装饰图 */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
      >
        <SmartImage
          src={timelineBg}
          alt=""
          fill
          fallbackSrc={FALLBACK_IMAGES.landscape}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 背景装饰光球 */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-32 right-0 w-[450px] h-[450px] bg-mist-blue/15 blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-32 left-0 w-[400px] h-[400px] bg-sun-wash/15 blur-[120px] rounded-full pointer-events-none"
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-line" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-milk/60 backdrop-blur-sm border border-line/40 mb-4">
              <Clock className="w-3.5 h-3.5 text-faded-peach" />
              <span className="text-xs text-paper-brown font-display italic tracking-wider">
                Timeline
              </span>
            </div>
            <h2 className="font-serif-sc text-3xl md:text-4xl text-soft-ink font-medium mb-4">
              我们的时间轴
            </h2>
            <p className="text-ash-gray max-w-xl mx-auto">
              从初遇到现在，每一步都值得被记住
            </p>
            <Divider variant="dot" />
          </div>
        </FadeIn>

        {/* 引文装饰 */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-12">
            <p className="font-serif-sc text-lg md:text-xl text-soft-ink/70 italic max-w-2xl mx-auto leading-relaxed">
              "时间是最温柔的作者，把我们写成了一本书。"
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Timeline events={previewEvents} />
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="text-center mt-16">
            <Link href="/space/demo#timeline">
              <Button variant="outline" size="lg">
                查看完整时间线
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <p className="text-xs text-ash-gray/60 mt-4 font-display italic">
              共 {demoTimeline.length} 个值得记住的瞬间
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
