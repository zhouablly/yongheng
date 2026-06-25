# YǑNG HÉNG 永恒 — 动效规范 (ANIMATION_SPEC)

> **版本**: v1.0  
> **核心原则**: 慢、轻、柔

---

## 1. 动效哲学

### 1.1 三个原则
- **慢**: 所有动画都要慢，像呼吸一样自然
- **轻**: 动效幅度要小，不喧宾夺主
- **柔**: 缓动曲线要柔和，不能有生硬的弹跳

### 1.2 审美底线
- ❌ 快速闪烁
- ❌ 大幅度弹跳
- ❌ 3D 翻转
- ❌ 粒子爆炸
- ❌ 炫光特效
- ✅ 淡入淡出
- ✅ 缓慢位移
- ✅ 柔和缩放
- ✅ 微妙变化

---

## 2. 动画参数

### 2.1 基础参数
- **基础时长**: 0.8s - 1.2s
- **快速动画**: 0.3s - 0.5s (微交互)
- **慢速动画**: 1.5s - 3s (氛围动画)
- **缓动函数**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **延迟策略**: 错落 100ms - 200ms

### 2.2 缓动曲线
```
ease-out: cubic-bezier(0.16, 1, 0.3, 1)  —— 主要出场
ease-in-out: cubic-bezier(0.65, 0, 0.35, 1) —— 循环动画
```

---

## 3. Framer Motion 参数

### 3.1 入场动画
```typescript
// 淡入上移
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

// 纯淡入
const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}
```

### 3.2 错落动画
```typescript
// 容器 - 子元素依次出现
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}
```

---

## 4. GSAP ScrollTrigger 规范

### 4.1 ScrollFilm 配置
```typescript
// 核心配置
ScrollTrigger.create({
  trigger: videoContainer,
  start: "top top",
  end: "+=500%",
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    video.currentTime = duration * self.progress
  }
})
```

### 4.2 滚动入场
- 触发位置：元素顶部 80% 进入视口
- 动画类型：淡入 + 轻微上移
- 时长：1s
- 只播放一次：once: true

---

## 5. 组件动效

### 5.1 按钮
- 默认：静态
- Hover：底色微变 + 轻微放大 (1.02)
- Active：轻微下沉
- 时长：0.3s

### 5.2 卡片
- 入场：淡入上移
- Hover：微妙上浮 + 阴影柔化
- 时长：0.4s

### 5.3 图片
- 加载：模糊到清晰
- 滚动视差：缓慢位移 (20-40px)
- Ken Burns：极慢缩放 (1 → 1.05, 20s 循环)

---

## 6. 页面过渡

### 6.1 页面入场
- 整体淡入：0.8s
- 内容错落：标题 → 正文 → 图片
- 延迟：每页开头 100ms 空白感

### 6.2 页面跳转
- 淡出当前页：0.4s
- 淡入新页面：0.6s
- 总过渡：约 1s

---

## 7. 性能优化

### 7.1 GPU 加速
- 只动画 `transform` 和 `opacity`
- 避免动画 `top/left/width/height`
- 使用 `will-change` 但不要滥用

### 7.2 移动端降级
- 减少同时动画的元素数量
- 降低动画复杂度
- 尊重 `prefers-reduced-motion`

### 7.3 滚动性能
- ScrollTrigger 不要太多
- 避免每一帧都做重计算
- 滚动停止时才更新重内容

---

## 8. 动效清单

### 8.1 首页动效
- [ ] Hero 文字淡入
- [ ] ScrollFilm 滚动控制
- [ ] 章节字幕淡入淡出
- [ ] 功能卡片错落入场
- [ ] 图片 Ken Burns 效果
- [ ] 按钮悬浮微动
- [ ] 收束结语淡入

### 8.2 空间动效
- [ ] 封面图缓慢缩放
- [ ] 天数数字柔和递增
- [ ] 照片依次浮现
- [ ] 时间轴节点点亮
- [ ] 情书展开效果
- [ ] 胶囊倒计时呼吸感

---

## 9. accessibility 考虑

### 9.1 减弱动效
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 9.2 闪烁安全
- 没有每秒闪烁超过 3 次的内容
- 没有高对比度闪烁
- 视频不含光敏性内容
