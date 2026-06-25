'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/effects/fade-in';
import { Divider } from '@/components/ui/divider';
import { LetterCard } from '@/components/ui/letter-card';
import { Button } from '@/components/ui/button';
import { demoLetters } from '@/lib/demo-data';
import { ArrowRight, Mail, Feather } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { img, FALLBACK_IMAGES } from '@/lib/utils';

const letterBg = img('vintage handwritten letters scattered on wooden desk warm candlelight fountain pen ink bottle film aesthetic overexposed dreamy', 'landscape_16_9');

export function LettersSection() {
  const previewLetters = demoLetters.slice(0, 3);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yDecor = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="letters"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* 背景装饰图 */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
      >
        <SmartImage
          src={letterBg}
          alt=""
          fill
          fallbackSrc={FALLBACK_IMAGES.landscape}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 背景装饰光球 */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-sun-wash/15 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-faded-peach/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-line" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-milk/60 backdrop-blur-sm border border-line/40 mb-4">
              <Mail className="w-3.5 h-3.5 text-faded-peach" />
              <span className="text-xs text-paper-brown font-display italic tracking-wider">
                Love Letters
              </span>
            </div>
            <h2 className="font-serif-sc text-3xl md:text-4xl text-soft-ink font-medium mb-4">
              写给你的情书
            </h2>
            <p className="text-ash-gray max-w-xl mx-auto">
              那些说不出口的话，就写在信里吧
            </p>
            <Divider variant="dot" />
          </div>
        </FadeIn>

        {/* 引文装饰 */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-12">
            <Feather className="w-6 h-6 mx-auto text-faded-peach/50 mb-3" />
            <p className="font-serif-sc text-lg md:text-xl text-soft-ink/70 italic max-w-2xl mx-auto leading-relaxed">
              "见字如面。每一封信，都是一次心跳的远行。"
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {previewLetters.map((letter, index) => (
            <LetterCard
              key={letter.id}
              letter={letter}
              index={index}
              variant={index === 0 ? 'featured' : 'default'}
            />
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center">
            <Link href="/space/demo#letters">
              <Button variant="outline" size="lg">
                查看更多情书
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <p className="text-xs text-ash-gray/60 mt-4 font-display italic">
              共 {demoLetters.length} 封手写心意
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
