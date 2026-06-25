'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** 图片加载失败时的 fallback URL（可选） */
  fallbackSrc?: string;
  /** 是否显示加载骨架屏 */
  showSkeleton?: boolean;
  /** 容器类名（用于控制尺寸/定位） */
  wrapperClassName?: string;
  /** 图片类名 */
  className?: string;
  /** 是否填充父容器（absolute inset-0） */
  fill?: boolean;
}

/**
 * 带错误处理和加载状态的智能图片组件
 * - 加载中显示柔和的骨架屏渐变
 * - 加载失败显示优雅的占位渐变背景
 * - 支持 fallbackSrc 重试
 * - 使用 Image() 预加载可靠检测加载状态（解决浏览器缓存不触发 onLoad 的问题）
 */
export function SmartImage({
  src,
  alt,
  fallbackSrc,
  showSkeleton = true,
  wrapperClassName,
  className,
  fill = false,
  onLoad,
  onError,
  ...rest
}: SmartImageProps) {
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = React.useState(src);

  // src 变化时重置状态
  React.useEffect(() => {
    setStatus('loading');
    setCurrentSrc(src);
  }, [src]);

  // 使用 Image() 对象预加载图片，可靠检测加载状态
  // 这解决了浏览器缓存的图片不触发 onLoad 事件的问题
  React.useEffect(() => {
    if (!currentSrc) return;

    let cancelled = false;
    const preloadImg = new Image();

    preloadImg.onload = () => {
      if (!cancelled) {
        setStatus('loaded');
      }
    };

    preloadImg.onerror = () => {
      if (cancelled) return;
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setStatus('loading');
      } else {
        setStatus('error');
      }
    };

    preloadImg.src = currentSrc;

    return () => {
      cancelled = true;
      preloadImg.onload = null;
      preloadImg.onerror = null;
    };
  }, [currentSrc, fallbackSrc]);

  // 错误状态：优雅的渐变占位
  if (status === 'error') {
    return (
      <div
        className={cn(
          'relative overflow-hidden bg-gradient-to-br from-porcelain via-milk to-mist-blue/30',
          fill ? 'absolute inset-0' : '',
          wrapperClassName
        )}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 opacity-40 bg-gradient-to-tr from-faded-peach/10 via-transparent to-sun-wash/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 40%, rgba(244,236,224,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(212,224,232,0.3) 0%, transparent 50%)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        fill ? 'absolute inset-0' : '',
        wrapperClassName
      )}
    >
      {/* 骨架屏 */}
      {showSkeleton && status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-br from-porcelain/60 via-milk to-mist-blue/20 animate-pulse" />
      )}
      <img
        {...rest}
        src={currentSrc}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        className={cn(
          'transition-opacity duration-700',
          fill && 'absolute inset-0 w-full h-full',
          status === 'loaded' ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </div>
  );
}
