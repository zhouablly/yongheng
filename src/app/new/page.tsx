'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, ChevronLeft, Sparkles, Calendar, PenLine, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn, generateId } from '@/lib/utils';
import { createSpace, setRecentSpaceId } from '@/lib/storage';
import type { CreationStep, CreationFormData } from '@/types';

const steps: { id: CreationStep; title: string; subtitle: string; icon: React.ReactNode }[] = [
  {
    id: 'names',
    title: '你们的名字',
    subtitle: '让故事有了主角',
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 'anniversary',
    title: '那一天',
    subtitle: '一切开始的日子',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 'story',
    title: '你们的故事',
    subtitle: '关于爱的开场白',
    icon: <PenLine className="w-5 h-5" />,
  },
  {
    id: 'finish',
    title: '完成',
    subtitle: '属于你们的永恒空间',
    icon: <Sparkles className="w-5 h-5" />,
  },
];

export default function NewSpacePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CreationStep>('names');
  const [formData, setFormData] = useState<CreationFormData>({
    partner1Name: '',
    partner2Name: '',
    anniversary: '',
    story: '',
  });
  const [spaceId, setSpaceId] = useState<string | null>(null);

  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    if (currentStep === 'names') {
      if (!formData.partner1Name || !formData.partner2Name) return;
      setCurrentStep('anniversary');
    } else if (currentStep === 'anniversary') {
      if (!formData.anniversary) return;
      setCurrentStep('story');
    } else if (currentStep === 'story') {
      const newSpace = createSpace({
        partner1Name: formData.partner1Name,
        partner2Name: formData.partner2Name,
        anniversary: formData.anniversary,
        story: formData.story,
      });
      setSpaceId(newSpace.id);
      setRecentSpaceId(newSpace.id);
      setCurrentStep('finish');
    }
  };

  const handlePrev = () => {
    if (currentStep === 'anniversary') setCurrentStep('names');
    else if (currentStep === 'story') setCurrentStep('anniversary');
  };

  const canProceed = () => {
    if (currentStep === 'names') return formData.partner1Name && formData.partner2Name;
    if (currentStep === 'anniversary') return !!formData.anniversary;
    if (currentStep === 'story') return true;
    return false;
  };

  return (
    <main className="min-h-screen bg-milk flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-faded-peach/30 flex items-center justify-center"
            >
              <Heart className="w-8 h-8 text-faded-peach fill-faded-peach/30" />
            </motion.div>
            <h1 className="font-serif-sc text-3xl text-soft-ink font-medium mb-2">
              创建你们的永恒空间
            </h1>
            <p className="text-ash-gray font-serif-sc">
              第 {currentIndex + 1} 步 / 共 {steps.length} 步
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-10">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all duration-500',
                    i <= currentIndex ? 'bg-faded-peach w-8' : 'bg-line'
                  )}
                />
                {i < steps.length - 1 && (
                  <div className={cn(
                    'w-8 h-px transition-all duration-500',
                    i < currentIndex ? 'bg-faded-peach' : 'bg-line'
                  )} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentStep === 'names' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-porcelain flex items-center justify-center text-paper-brown">
                      <Users className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif-sc text-xl text-soft-ink font-medium mb-2">
                      你们的名字
                    </h2>
                    <p className="text-sm text-ash-gray">写下故事中两位主角的名字</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-paper-brown font-serif-sc mb-2">
                        TA 的名字
                      </label>
                      <Input
                        type="text"
                        placeholder="例如：林晚"
                        value={formData.partner1Name}
                        onChange={(e) =>
                          setFormData({ ...formData, partner1Name: e.target.value })
                        }
                        className="text-center py-6 text-lg"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Heart className="w-4 h-4 text-faded-peach" />
                    </div>
                    <div>
                      <label className="block text-sm text-paper-brown font-serif-sc mb-2">
                        你的名字
                      </label>
                      <Input
                        type="text"
                        placeholder="例如：陈屿"
                        value={formData.partner2Name}
                        onChange={(e) =>
                          setFormData({ ...formData, partner2Name: e.target.value })
                        }
                        className="text-center py-6 text-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'anniversary' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-porcelain flex items-center justify-center text-paper-brown">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif-sc text-xl text-soft-ink font-medium mb-2">
                      那一天
                    </h2>
                    <p className="text-sm text-ash-gray">一切开始的日子，值得被永远记住</p>
                  </div>

                  <div>
                    <label className="block text-sm text-paper-brown font-serif-sc mb-2 text-center">
                      在一起的日子
                    </label>
                    <Input
                      type="date"
                      value={formData.anniversary}
                      onChange={(e) =>
                        setFormData({ ...formData, anniversary: e.target.value })
                      }
                      className="text-center py-6 text-lg"
                    />
                  </div>
                </div>
              )}

              {currentStep === 'story' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-porcelain flex items-center justify-center text-paper-brown">
                      <PenLine className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif-sc text-xl text-soft-ink font-medium mb-2">
                      你们的故事
                    </h2>
                    <p className="text-sm text-ash-gray">写下你们的开场白（可选）</p>
                  </div>

                  <div>
                    <Textarea
                      placeholder="说说你们是怎么认识的，第一次心动的瞬间..."
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 'finish' && (
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-24 h-24 mx-auto rounded-full bg-sun-wash/20 flex items-center justify-center"
                  >
                    <Sparkles className="w-12 h-12 text-sun-wash" />
                  </motion.div>

                  <div>
                    <h2 className="font-serif-sc text-2xl text-soft-ink font-medium mb-2">
                      空间已创建！
                    </h2>
                    <p className="text-ash-gray font-serif-sc">
                      {formData.partner1Name} & {formData.partner2Name} 的永恒空间
                    </p>
                  </div>

                  <div className="bg-porcelain/50 rounded-2xl p-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-ash-gray">在一起</span>
                      <span className="text-soft-ink font-medium">{formData.anniversary}</span>
                    </div>
                    <div className="h-px bg-line" />
                    <div className="flex justify-between text-sm">
                      <span className="text-ash-gray">时光相册</span>
                      <span className="text-soft-ink font-medium">0 张照片</span>
                    </div>
                    <div className="h-px bg-line" />
                    <div className="flex justify-between text-sm">
                      <span className="text-ash-gray">情书</span>
                      <span className="text-soft-ink font-medium">0 封</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => router.push(`/space/${spaceId}`)}
                  >
                    进入空间
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {currentStep !== 'finish' && (
            <div className="flex gap-4 mt-10">
              {currentStep !== 'names' && (
                <Button variant="ghost" onClick={handlePrev}>
                  <ChevronLeft className="w-4 h-4" />
                  上一步
                </Button>
              )}
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === 'story' ? '创建空间' : '下一步'}
                {currentStep !== 'story' && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
