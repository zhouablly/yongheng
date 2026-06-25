'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/effects/fade-in';
import { Divider } from '@/components/ui/divider';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Heart, Gift, Crown } from 'lucide-react';
import { SmartImage } from '@/components/ui/smart-image';
import { img, FALLBACK_IMAGES } from '@/lib/utils';

const pricingBg = img('soft pastel sky clouds dreamy overexposed film photography minimal aesthetic warm light morning mist', 'landscape_16_9');

const plans = [
  {
    name: '初见',
    icon: Heart,
    price: '免费',
    period: '永久',
    description: '刚开始的小情侣，够用就好',
    image: img('two paper coffee cups on wooden table morning light cozy cafe aesthetic film photography overexposed soft', 'landscape_4_3'),
    features: [
      '最多 50 张照片',
      '最多 10 封情书',
      '基础时间轴',
      '纪念日提醒',
      '标准主题',
    ],
    cta: '免费开始',
    popular: false,
    accent: 'mist-blue',
  },
  {
    name: '热恋',
    icon: Sparkles,
    price: '¥19',
    period: '/月',
    description: '认真在一起的你们，值得更好的',
    image: img('romantic candlelight dinner roses warm glow intimate atmosphere film aesthetic overexposed dreamy', 'landscape_4_3'),
    features: [
      '无限照片存储',
      '无限情书数量',
      '完整时间轴',
      '纪念日提醒 + 推送',
      '全部主题解锁',
      '自定义背景音乐',
      '高清原图备份',
    ],
    cta: '立即升级',
    popular: true,
    accent: 'faded-peach',
  },
  {
    name: '永恒',
    icon: Crown,
    price: '¥199',
    period: '/年',
    description: '一生一世的承诺，一次到位',
    image: img('elegant vintage wedding rings on silk fabric soft golden light film photography overexposed romantic', 'landscape_4_3'),
    features: [
      '热恋版全部功能',
      '专属域名',
      '实体相册打印 9 折',
      '优先客服支持',
      '年度回忆视频',
      '新功能优先体验',
    ],
    cta: '选择永恒',
    popular: false,
    accent: 'sun-wash',
  },
];

export function PricingSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yDecor = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="relative py-24 md:py-32 bg-porcelain/30 overflow-hidden"
    >
      {/* 背景装饰图 */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
      >
        <SmartImage
          src={pricingBg}
          alt=""
          fill
          fallbackSrc={FALLBACK_IMAGES.landscape}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 背景装饰光球 */}
      <motion.div
        style={{ y: yDecor }}
        className="absolute top-20 left-0 w-[450px] h-[450px] bg-faded-peach/10 blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: yDecor }}
        className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-mist-blue/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-line" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-milk/60 backdrop-blur-sm border border-line/40 mb-4">
              <Gift className="w-3.5 h-3.5 text-faded-peach" />
              <span className="text-xs text-paper-brown font-display italic tracking-wider">
                Pricing
              </span>
            </div>
            <h2 className="font-serif-sc text-3xl md:text-4xl text-soft-ink font-medium mb-4">
              选择你们的方式
            </h2>
            <p className="text-ash-gray max-w-xl mx-auto">
              爱情无价，但我们想让它更美好
            </p>
            <Divider variant="dot" />
          </div>
        </FadeIn>

        {/* 引文装饰 */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-12">
            <p className="font-serif-sc text-lg md:text-xl text-soft-ink/70 italic max-w-2xl mx-auto leading-relaxed">
              "最好的东西，从来都不是最贵的。"
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <FadeIn key={plan.name} delay={index * 0.15}>
                <div
                  className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 ${
                    plan.popular
                      ? 'bg-milk border-2 border-faded-peach/40 shadow-xl shadow-faded-peach/10'
                      : 'bg-milk/60 border border-line/40 hover:shadow-lg hover:border-line/80'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1 bg-faded-peach text-soft-ink text-xs font-medium rounded-full flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      最受欢迎
                    </div>
                  )}

                  {/* 图片层 */}
                  <div className="relative h-32 overflow-hidden">
                    <SmartImage
                      src={plan.image}
                      alt={plan.name}
                      fill
                      fallbackSrc={FALLBACK_IMAGES.landscape}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-milk via-milk/40 to-transparent" />
                    {/* 图标徽章 */}
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-500 group-hover:scale-110 ${
                      plan.popular
                        ? 'bg-faded-peach/30 border-faded-peach/50 text-faded-peach'
                        : 'bg-milk/40 border-milk/60 text-soft-ink'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {/* 编号装饰 */}
                    <div className="absolute top-4 right-4 font-display text-xs text-soft-ink/40 italic">
                      0{index + 1}
                    </div>
                  </div>

                  <div className="p-8 pt-4">
                    <h3 className="font-serif-sc text-xl text-soft-ink font-medium mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-ash-gray mb-6">{plan.description}</p>

                    <div className="mb-8 flex items-baseline gap-1">
                      <span className="text-4xl font-display text-soft-ink">{plan.price}</span>
                      <span className="text-ash-gray text-sm">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-soft-ink/80">
                          <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors ${
                            plan.popular ? 'text-faded-peach' : 'text-mist-blue'
                          }`} style={{ transitionDelay: `${i * 50}ms` }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/new" className="block">
                      <Button
                        variant={plan.popular ? 'primary' : 'outline'}
                        size="lg"
                        className="w-full"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>

                  {/* hover 装饰角 */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-faded-peach/0 group-hover:border-faded-peach/40 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-faded-peach/0 group-hover:border-faded-peach/40 transition-colors duration-500" />
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.6}>
          <div className="text-center mt-12">
            <p className="text-sm text-ash-gray/70">
              所有方案均支持 7 天无理由退款 · 随时可以降级或取消
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-8 h-px bg-line" />
              <Heart className="w-3 h-3 text-faded-peach/40 fill-current" />
              <div className="w-8 h-px bg-line" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
