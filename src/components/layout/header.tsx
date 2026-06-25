'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#story', label: '故事' },
  { href: '/#timeline', label: '时光' },
  { href: '/#letters', label: '情书' },
  { href: '/#photos', label: '相册' },
  { href: '/demo', label: '体验' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
        isScrolled
          ? 'bg-milk/80 backdrop-blur-xl border-b border-line/30 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Heart className="w-6 h-6 text-faded-peach fill-faded-peach/30 transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-faded-peach/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="font-display text-xl tracking-wider text-soft-ink">
            YǑNG HÉNG
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-soft-ink/70 hover:text-soft-ink transition-colors duration-300 font-serif-sc"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-faded-peach transition-all duration-300 hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/space/demo">
            <Button variant="ghost" size="sm">
              查看示例
            </Button>
          </Link>
          <Link href="/new">
            <Button variant="primary" size="sm">
              创建空间
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-soft-ink"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-milk/95 backdrop-blur-xl border-b border-line/30 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-lg text-soft-ink/80 font-serif-sc py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link href="/space/demo" className="block">
                  <Button variant="outline" size="md" className="w-full">
                    查看示例
                  </Button>
                </Link>
                <Link href="/new" className="block">
                  <Button variant="primary" size="md" className="w-full">
                    创建空间
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
