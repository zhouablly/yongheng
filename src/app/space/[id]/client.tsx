'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Camera, Mail, Calendar, Clock, Share2, Settings, ChevronLeft, MapPin, Quote, Star, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PhotoGallery } from '@/components/ui/photo-gallery';
import { LetterCard } from '@/components/ui/letter-card';
import { Timeline } from '@/components/ui/timeline';
import { AnniversaryBadge } from '@/components/ui/anniversary-badge';
import { SmartImage } from '@/components/ui/smart-image';
import { demoSpace } from '@/lib/demo-data';
import { getSpaceById } from '@/lib/storage';
import { cn, daysTogether, formatDate, img, FALLBACK_IMAGES } from '@/lib/utils';
import type { LoveSpace } from '@/types';

type TabType = 'home' | 'photos' | 'letters' | 'timeline' | 'anniversaries';

export default function SpaceClient({ id }: { id: string }) {
  const router = useRouter();
  const spaceId = id;
  const [space, setSpace] = useState<LoveSpace | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (spaceId === 'demo') {
      setSpace(demoSpace);
    } else {
      const saved = getSpaceById(spaceId);
      if (saved) {
        setSpace(saved);
      } else {
        setSpace(demoSpace);
      }
    }
    setLoading(false);
  }, [spaceId]);

  const tabs = [
    { id: 'home' as TabType, label: '首页', icon: <Heart className="w-4 h-4" /> },
    { id: 'photos' as TabType, label: '相册', icon: <Camera className="w-4 h-4" /> },
    { id: 'letters' as TabType, label: '情书', icon: <Mail className="w-4 h-4" /> },
    { id: 'timeline' as TabType, label: '时光轴', icon: <Clock className="w-4 h-4" /> },
    { id: 'anniversaries' as TabType, label: '纪念日', icon: <Calendar className="w-4 h-4" /> },
  ];

  if (loading || !space) {
    return (
      <div className="min-h-screen bg-milk flex items-center justify-center">
        <div className="text-ash-gray font-serif-sc">加载中...</div>
      </div>
    );
  }

  const daysTogetherCount = daysTogether(space.couple.anniversary);

  const stats = [
    { icon: Heart, value: daysTogetherCount, label: '在一起的天数', color: 'text-faded-peach' },
    { icon: Camera, value: space.photos.length, label: '收藏的照片', color: 'text-mist-blue' },
    { icon: Mail, value: space.letters.length, label: '写过的情书', color: 'text-paper-brown' },
    { icon: Clock, value: space.timeline.length, label: '时光节点', color: 'text-sun-wash' },
  ];

  return (
    <main className="min-h-screen bg-milk">
      {/* Hero 区 */}
      <div ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.div
          style={{ scale: scaleHero }}
          className="absolute inset-0"
        >
          <SmartImage
            src={space.couple.coverImage || FALLBACK_IMAGES.hero}
            alt={`${space.couple.partner1Name} & ${space.couple.partner2Name}`}
            fill
            fallbackSrc={FALLBACK_IMAGES.hero}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-soft-ink/40 via-soft-ink/10 to-milk" />

        <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-milk/20 backdrop-blur-sm flex items-center justify-center text-milk hover:bg-milk/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-milk/20 backdrop-blur-sm flex items-center justify-center text-milk hover:bg-milk/30 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-milk/20 backdrop-blur-sm flex items-center justify-center text-milk hover:bg-milk/30 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <motion.div
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* 装饰徽章 */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-milk/20 backdrop-blur-md border border-milk/30 mb-4">
              <Sparkles className="w-3 h-3 text-milk" />
              <span className="text-xs text-milk font-display italic tracking-wider">
                Our Love Space
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 mb-3">
              <h1 className="font-serif-sc text-4xl md:text-5xl text-milk font-medium drop-shadow-lg">
                {space.couple.partner1Name}
              </h1>
              <Heart className="w-6 h-6 text-faded-peach fill-faded-peach drop-shadow-lg" />
              <h1 className="font-serif-sc text-4xl md:text-5xl text-milk font-medium drop-shadow-lg">
                {space.couple.partner2Name}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2 text-milk/90 mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-display text-sm tracking-wide">
                在一起 {daysTogetherCount} 天
              </span>
            </div>
            <p className="text-milk/80 text-sm font-serif-sc italic">
              {formatDate(space.couple.anniversary)} 开始 · 永远未完待续
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Sticky Tab 导航 */}
      <div className="sticky top-0 z-30 bg-milk/90 backdrop-blur-md border-b border-line/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-around">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex flex-col items-center py-3 px-4 transition-all duration-300',
                  activeTab === tab.id
                    ? 'text-faded-peach'
                    : 'text-ash-gray hover:text-soft-ink'
                )}
              >
                {tab.icon}
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="w-1 h-1 rounded-full bg-faded-peach mt-1"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' && (
              <div className="space-y-12">
                {/* 数据统计卡片 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        className="group relative p-5 rounded-2xl bg-milk border border-line/40 hover:border-faded-peach/40 hover:shadow-md transition-all duration-500"
                      >
                        <Icon className={cn('w-5 h-5 mb-2 transition-transform group-hover:scale-110', stat.color)} />
                        <div className="font-display text-2xl text-soft-ink font-medium">
                          {stat.value}
                        </div>
                        <div className="text-xs text-ash-gray mt-1 font-serif-sc">
                          {stat.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* 故事区 */}
                {space.couple.story && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative text-center py-8"
                  >
                    <Quote className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 text-faded-peach/20 fill-current" />
                    <p className="font-serif-sc text-lg md:text-xl text-soft-ink leading-relaxed italic max-w-2xl mx-auto pt-6">
                      {space.couple.story}
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-6">
                      <div className="w-8 h-px bg-line" />
                      <Heart className="w-3 h-3 text-faded-peach/40 fill-current" />
                      <div className="w-8 h-px bg-line" />
                    </div>
                  </motion.div>
                )}

                {/* 照片预览 */}
                {space.photos.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-faded-peach" />
                        <h2 className="font-serif-sc text-xl text-soft-ink font-medium">
                          时光相册
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveTab('photos')}
                        className="text-sm text-paper-brown hover:text-faded-peach transition-colors flex items-center gap-1 group"
                      >
                        查看全部
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                    <PhotoGallery photos={space.photos.slice(0, 6)} />
                  </div>
                )}

                {/* 情书预览 */}
                {space.letters.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-faded-peach" />
                        <h2 className="font-serif-sc text-xl text-soft-ink font-medium">
                          手写情书
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveTab('letters')}
                        className="text-sm text-paper-brown hover:text-faded-peach transition-colors flex items-center gap-1 group"
                      >
                        查看全部
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {space.letters.slice(0, 2).map((letter, i) => (
                        <LetterCard key={letter.id} letter={letter} index={i} />
                      ))}
                    </div>
                  </div>
                )}

                {/* 时光轴预览 */}
                {space.timeline.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-faded-peach" />
                        <h2 className="font-serif-sc text-xl text-soft-ink font-medium">
                          时光节点
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveTab('timeline')}
                        className="text-sm text-paper-brown hover:text-faded-peach transition-colors flex items-center gap-1 group"
                      >
                        查看全部
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                    <Timeline events={space.timeline.slice(0, 3)} />
                  </div>
                )}

                {/* 纪念日预览 */}
                {space.anniversaries.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-faded-peach" />
                        <h2 className="font-serif-sc text-xl text-soft-ink font-medium">
                          即将到来
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveTab('anniversaries')}
                        className="text-sm text-paper-brown hover:text-faded-peach transition-colors flex items-center gap-1 group"
                      >
                        全部纪念日
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {space.anniversaries.slice(0, 3).map((anniv, i) => (
                        <AnniversaryBadge key={anniv.id} anniversary={anniv} index={i} />
                      ))}
                    </div>
                  </div>
                )}

                {/* 底部引文 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-center py-8"
                >
                  <p className="font-serif-sc text-sm text-ash-gray/70 italic">
                    "余生很长，请多指教。"
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="w-12 h-px bg-line" />
                    <Heart className="w-3 h-3 text-faded-peach/40 fill-current" />
                    <div className="w-12 h-px bg-line" />
                  </div>
                </motion.div>

                {space.photos.length === 0 && space.letters.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-porcelain flex items-center justify-center">
                      <Heart className="w-8 h-8 text-ash-gray/50" />
                    </div>
                    <h3 className="font-serif-sc text-lg text-soft-ink mb-2">空间刚刚创建</h3>
                    <p className="text-ash-gray text-sm">
                      开始记录你们的故事吧
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'photos' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-faded-peach" />
                    <h2 className="font-serif-sc text-xl text-soft-ink font-medium">
                      时光相册
                    </h2>
                  </div>
                  <span className="text-sm text-ash-gray">{space.photos.length} 张照片</span>
                </div>
                {space.photos.length > 0 ? (
                  <PhotoGallery photos={space.photos} />
                ) : (
                  <div className="text-center py-16">
                    <Camera className="w-12 h-12 mx-auto mb-4 text-ash-gray/30" />
                    <p className="text-ash-gray">还没有照片</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'letters' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-faded-peach" />
                    <h2 className="font-serif-sc text-xl text-soft-ink font-medium">
                      手写情书
                    </h2>
                  </div>
                  <span className="text-sm text-ash-gray">{space.letters.length} 封情书</span>
                </div>
                {space.letters.length > 0 ? (
                  <div className="space-y-4">
                    {space.letters.map((letter, i) => (
                      <LetterCard key={letter.id} letter={letter} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-ash-gray/30" />
                    <p className="text-ash-gray">还没有情书</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'timeline' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-faded-peach" />
                    <h2 className="font-serif-sc text-xl text-soft-ink font-medium">
                      时光轴
                    </h2>
                  </div>
                  <span className="text-sm text-ash-gray">{space.timeline.length} 个故事</span>
                </div>
                <Timeline events={space.timeline} />
              </div>
            )}

            {activeTab === 'anniversaries' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-faded-peach" />
                    <h2 className="font-serif-sc text-xl text-soft-ink font-medium">
                      纪念日
                    </h2>
                  </div>
                  <span className="text-sm text-ash-gray">{space.anniversaries.length} 个纪念日</span>
                </div>
                {space.anniversaries.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {space.anniversaries.map((anniv, i) => (
                      <AnniversaryBadge key={anniv.id} anniversary={anniv} index={i} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-ash-gray/30" />
                    <p className="text-ash-gray">还没有纪念日</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
