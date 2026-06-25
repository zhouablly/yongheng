# YǑNG HÉNG 永恒 — 组件清单 (COMPONENTS)

> **版本**: v1.0  
> **组件库**: React Bits + Cult UI + 自定义

---

## 1. 组件架构

### 1.1 组件分类
```
src/components/
├── layout/          # 布局组件
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Section.tsx
│
├── effects/         # 视觉效果组件
│   ├── FilmGrain.tsx
│   └── CursorGlow.tsx
│
├── external/        # 第三方组件库 (React Bits + Cult UI)
│   ├── react-bits/
│   └── cult-ui/
│
├── home/            # 首页专属组件
│   ├── Hero.tsx
│   ├── ScrollFilm.tsx
│   ├── ProductReveal.tsx
│   ├── FeatureArchive.tsx
│   ├── DemoSpace.tsx
│   ├── CreateRitual.tsx
│   ├── PricingSection.tsx
│   └── ClosingSection.tsx
│
├── space/           # 空间页面组件
│   ├── SpaceCover.tsx
│   ├── DaysCounter.tsx
│   ├── PhotoWall.tsx
│   ├── Timeline.tsx
│   ├── LoveLetter.tsx
│   └── TimeCapsule.tsx
│
├── create/          # 创建流程组件
│   ├── CreateWizard.tsx
│   ├── StepNames.tsx
│   ├── StepDate.tsx
│   ├── StepPhoto.tsx
│   └── StepMessage.tsx
│
└── ui/              # 基础 UI 组件
    ├── Button.tsx
    ├── ArchiveCard.tsx
    ├── Input.tsx
    ├── DatePicker.tsx
    └── ProgressBar.tsx
```

---

## 2. 外部组件库集成

### 2.1 React Bits
- **来源**: reactbits.dev
- **数量**: 130+ 动画组件
- **集成方式**: copy-paste 到 `external/react-bits/`
- **使用的组件**:
  - 文字渐变/发光效果
  - 卡片悬停效果
  - 背景动画
  - 数字计数动画

### 2.2 Cult UI
- **来源**: cult-ui.com
- **数量**: 78+ 动画组件
- **集成方式**: copy-paste 到 `external/cult-ui/`
- **使用的组件**:
  - 平滑滚动效果
  - 图片展示组件
  - 时间线组件
  - 交互卡片

### 2.3 定制原则
- 所有外部组件必须适配 Light Archive 风格
- 移除不符合审美的炫技效果
- 统一使用项目的设计 Token
- 保持克制，不堆叠效果

---

## 3. 核心组件详解

### 3.1 ScrollFilm (灵魂组件)
- **用途**: 首页滚动控制视频播放
- **依赖**: GSAP + ScrollTrigger
- **Props**:
  - `src: string` - 视频地址
  - `chapters: Chapter[]` - 章节目录
  - `height?: string` - 滚动高度
- **状态**:
  - `progress: number` - 播放进度 0-1
  - `currentChapter: number` - 当前章节

### 3.2 PhotoWall
- **用途**: 空间照片墙展示
- **布局**: Masonry / 瀑布流
- **交互**: 点击放大查看
- **动效**: 滚动依次淡入

### 3.3 Timeline
- **用途**: 重要事件时间轴
- **样式**: 竖向时间线
- **动效**: 滚动到节点时点亮

### 3.4 LoveLetter
- **用途**: 情书展示
- **交互**: 点击展开，信纸展开效果
- **动效**: 展开动画 + 文字渐显

### 3.5 TimeCapsule
- **用途**: 时光胶囊
- **状态**: 未开启 / 倒计时 / 已开启
- **动效**: 呼吸光晕效果

---

## 4. 基础 UI 组件

### 4.1 Button
- **变体**: primary / secondary / ghost / outline
- **尺寸**: sm / md / lg
- **风格**: 微圆角，柔和边框
- **动效**: hover 底色微变

### 4.2 ArchiveCard
- **用途**: 功能介绍卡片
- **样式**: 奶白底 + 细边框 + 微阴影
- **悬停**: 轻微上浮 + 阴影柔化

### 4.3 Input
- **样式**: 底部边框风格
- **聚焦**: 柔和光晕
- **风格**: 极简，无多余装饰

---

## 5. 布局组件

### 5.1 Header
- 透明背景，滚动后微变白
- Logo 左，导航右
- 移动端汉堡菜单

### 5.2 Footer
- 简洁四列布局
- 版权信息
- 社交链接

### 5.3 Section
- 统一的上下内边距
- 最大宽度约束
- 可选的背景色

---

## 6. 效果组件

### 6.1 FilmGrain
- 全局胶片颗粒效果
- SVG noise 实现
- 低透明度叠加
- pointer-events: none

### 6.2 CursorGlow (可选)
- 跟随鼠标的柔光
- 非常柔和，不明显
- 移动端禁用

---

## 7. 组件开发原则

### 7.1 命名规范
- 组件名: PascalCase
- 组件文件: 与组件同名
- Props 类型: `ComponentNameProps`

### 7.2 样式规范
- 使用 Tailwind CSS
- 自定义样式用 CSS variables
- 尽量少用 !important

### 7.3 动效规范
- 遵循 ANIMATION_SPEC.md
- 优先使用 Framer Motion
- 滚动动效用 GSAP

### 7.4 可访问性
- 语义化 HTML
- 适当的 aria 属性
- 键盘可访问
- 尊重减少动效设置
