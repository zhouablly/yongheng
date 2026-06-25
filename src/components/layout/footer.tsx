'use client';

import * as React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Divider } from '@/components/ui/divider';

export function Footer() {
  return (
    <footer className="relative bg-milk/50 border-t border-line/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-faded-peach fill-faded-peach/30" />
              <span className="font-display text-lg tracking-wider text-soft-ink">
                YǑNG HÉNG 永恒
              </span>
            </Link>
            <p className="text-sm text-ash-gray leading-relaxed max-w-md mb-6">
              为每一段爱情打造永恒的数字纪念空间。
              <br />
              以光为笔，以时光为墨，书写属于你们的故事。
            </p>
            <p className="font-display italic text-paper-brown/70 text-sm">
              &quot;Love is the only thing that time cannot diminish.&quot;
            </p>
          </div>

          <div>
            <h4 className="font-serif-sc text-soft-ink font-medium mb-4 text-sm">产品</h4>
            <ul className="space-y-3 text-sm text-ash-gray">
              <li>
                <Link href="/#features" className="hover:text-soft-ink transition-colors">
                  功能特色
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-soft-ink transition-colors">
                  定价方案
                </Link>
              </li>
              <li>
                <Link href="/space/demo" className="hover:text-soft-ink transition-colors">
                  在线演示
                </Link>
              </li>
              <li>
                <Link href="/new" className="hover:text-soft-ink transition-colors">
                  免费开始
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif-sc text-soft-ink font-medium mb-4 text-sm">关于</h4>
            <ul className="space-y-3 text-sm text-ash-gray">
              <li>
                <Link href="/#story" className="hover:text-soft-ink transition-colors">
                  品牌故事
                </Link>
              </li>
              <li>
                <Link href="/#privacy" className="hover:text-soft-ink transition-colors">
                  隐私承诺
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-soft-ink transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Divider variant="fade" />

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs text-ash-gray/70 font-display">
            © {new Date().getFullYear()} YǑNG HÉNG. Made with love.
          </p>
          <div className="flex items-center gap-6 text-xs text-ash-gray/70">
            <Link href="#" className="hover:text-soft-ink transition-colors">
              用户协议
            </Link>
            <Link href="#" className="hover:text-soft-ink transition-colors">
              隐私政策
            </Link>
            <Link href="#" className="hover:text-soft-ink transition-colors">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
