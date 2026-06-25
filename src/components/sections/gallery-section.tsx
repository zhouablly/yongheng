'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/effects/fade-in';
import { Divider } from '@/components/ui/divider';
import { Button } from '@/components/ui/button';
import { demoPhotos } from '@/lib/demo-data';
import { ArrowRight, Camera } from 'lucide-react';
import { cn, formatDate, FALLBACK_IMAGES } from '@/lib/utils';
import { SmartImage } from '@/components/ui/smart-image';

export function GallerySection() {
  const previewPhotos = demoPhotos.slice(0, 9);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yDecor = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // masonry 高度变化
  const heights = ['h-64', 'h-80', 'h-56', 'h-72', 'h-64', 'h-80', 'h-56', 'h-72', 'h-64'];

  return (
    <section
      id="photos"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-porcelain/30 overflow-hidden"
    >
      {/* 背景装饰 */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-40 right-0 w-[500px] h-[500px] bg-faded-peach/10 blur-[140px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-sea-glass/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-line" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-milk/60 backdrop-blur-sm border border-line/40 mb-4">
              <Camera className="w-3.5 h-3.5 text-faded-peach" />
              <span className="text-xs text-paper-brown font-display italic tracking-wider">
                Photo Gallery
              </span>
            </div>
            <h2 className="font-serif-sc text-3xl md:text-4xl text-soft-ink font-medium mb-4">
              时光相册
            </h2>
            <p className="text-ash-gray max-w-xl mx-auto">
              每一张照片，都是时光的标本
            </p>
            <Divider variant="dot" />
          </div>
        </FadeIn>

        {/* masonry 风格布局 */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {previewPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: (index % 3) * 0.1,
              }}
              className={cn(
                'group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid card-hover',
                heights[index % heights.length]
              )}
            >
              <SmartImage
                src={photo.url}
                alt={photo.caption || '照片'}
                fill
                fallbackSrc={FALLBACK_IMAGES.portrait}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soft-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-milk opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                {photo.caption && (
                  <p className="text-sm font-medium mb-1 font-serif-sc">{photo.caption}</p>
                )}
                {(photo.date || photo.location) && (
                  <p className="text-xs text-milk/80 font-display italic">
                    {photo.date && formatDate(photo.date, 'short')}
                    {photo.date && photo.location && ' · '}
                    {photo.location}
                  </p>
                )}
              </div>
              {/* 边框装饰 */}
              <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
              {/* 角标 */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-milk/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-xs font-display italic text-paper-brown">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center mt-14">
            <Link href="/space/demo#photos">
              <Button variant="outline" size="lg">
                浏览完整相册
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <p className="text-xs text-ash-gray/60 mt-4 font-display italic">
              共 {demoPhotos.length} 张时光标本
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
