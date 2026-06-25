# YǑNG HÉNG 永恒 — Light Archive 实施计划

> **版本**: v1.0
> **创建时间**: 2026-06-24
> **项目目录**: `d:\project\yh`
> **视觉方向**: Light Archive / 光的档案馆
> **技术栈**: Next.js App Router + TypeScript + Tailwind + GSAP + Framer Motion + React Bits + Cult UI

---

## 一、Summary 摘要

基于用户提供的《YǑNG HÉNG 永恒 — Codex 项目执行总文档》（34 章节），从零搭建一个以"光的档案馆"为视觉概念的爱情纪念 SaaS Demo。项目核心是用滚动控制视频播放讲述从校园到海边跳舞的爱情故事，并让用户创建专属的"永恒空间"。

**核心交付物**：
1. Next.js + TypeScript + Tailwind 项目骨架
2. 11 份 `/docs` 文档
3. Light Archive 设计 Token + 全局样式
4. 首页 8 个 Sections（含 ScrollFilm 滚动视频灵魂组件）
5. `/new` 创建空间流程（localStorage 持久化）
6. `/space/demo` 示例情侣空间
7. `/space/[slug]` 动态空间
8. `/dashboard`、`/pricing`、`/login` 辅助页面
9. React Bits + Cult UI 组件库集成
10. Mock 数据层

**审美铁律**：
- 绝对不用黑金奢华风
- 绝对不用粉色恋爱风
- 绝对不用蓝紫 AI SaaS 风
- 必须呈现：过曝胶片、晨雾白、海面蓝、褪色纸张、微光桃色、留白、慢动画

---

## 二、Current State Analysis 当前状态分析

### 2.1 项目目录现状
- 目录 `d:\project\yh` 当前几乎为空
- 存在一个视频文件：`初始场景_-_2026-06-24_202606241709.mp4`
- 该视频将重命名为 `yongheng-scroll-film.mp4` 作为 ScrollFilm 素材
- 需要从零初始化 Next.js 项目

### 2.2 视觉方向转换
- 旧项目（`d:\project\yongheng1`）使用 dark gold 审美 — **完全弃用**
- 新项目采用 Light Archive 审美
- 配色从深色金光转为浅色胶片感

### 2.3 技术栈决策
- **保留**：Next.js + TypeScript + Tailwind + GSAP + Framer Motion
- **新增**：React Bits + Cult UI 组件库（替换所有自建 UI 组件）
- **移除**：Three.js / R3F / tsParticles / anime.js（不符合 Light Archive 轻量审美）
- **数据层**：localStorage mock（不接 Supabase）

---

## 三、Proposed Changes 拟议变更

### Phase P0-1: 项目初始化与基础设施

#### 3.1.1 初始化 Next.js 项目
**操作**：在 `d:\project\yh` 目录初始化项目
```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint --use-npm
```

**关键配置文件**：
- `package.json` — 依赖清单
- `tsconfig.json` — TypeScript 配置
- `tailwind.config.ts` — Tailwind 主题扩展
- `next.config.mjs` — Next.js 配置（图片优化、视频支持）
- `postcss.config.mjs` — PostCSS 配置

**依赖安装**：
```bash
npm install gsap framer-motion lucide-react
npm install -D @types/node
```

#### 3.2.1 全局样式与设计 Token
**文件**：`src/app/globals.css`

配置 CSS variables（来自文档第 6 节）：
```css
:root {
  --porcelain: #F7F3EA;
  --milk: #FFFBF3;
  --mist-blue: #D7E4EA;
  --sea-glass: #AFC8C6;
  --faded-peach: #E8B8A2;
  --sun-wash: #F2D6A2;
  --paper-brown: #B69B7D;
  --soft-ink: #202124;
  --ash-gray: #8E8A82;
  --line: rgba(32, 33, 36, 0.12);
}
```

**字体系统**（文档第 7 节）：
- 中文标题：Noto Serif SC
- 英文品牌：Cormorant Garamond
- 正文：Inter

通过 `next/font/google` 加载。

**Tailwind 主题扩展**：将 CSS variables 映射为 Tailwind 颜色 token。

#### 3.3.1 视频文件部署
**操作**：将现有视频重命名并移动
- 源：`d:\project\yh\初始场景_-_2026-06-24_202606241709.mp4`
- 目标：`d:\project\yh\public\videos\yongheng-scroll-film.mp4`

同时创建 poster 占位图：`public/images/yongheng-poster.jpg`（如无素材，使用纯色占位）

---

### Phase P0-2: 文档体系（11 份）

在 `d:\project\yh\docs\` 创建以下文档，内容基于用户总文档拆分：

| 文件 | 内容来源 | 用途 |
|------|---------|------|
| `PRD.md` | 第 1-2、28 节 | 产品需求文档 |
| `DESIGN.md` | 第 5-7、23-24 节 | 设计规范 |
| `MVP.md` | 第 2、29-30 节 | MVP 范围 |
| `IA.md` | 第 8-9 节 | 信息架构 |
| `USER_FLOW.md` | 第 18-21 节 | 用户流程 |
| `VIDEO_SPEC.md` | 第 1、11、25 节 | 视频规范 |
| `ANIMATION_SPEC.md` | 第 23-24 节 | 动效规范 |
| `COMPONENTS.md` | 第 22 节 | 组件清单 |
| `DATA_MODEL.md` | 第 26-27 节 | 数据模型 |
| `SUBMISSION_PLAN.md` | 第 28 节 | 参赛提交 |
| `CODEX_TASKS.md` | 第 30、34 节 | 任务清单 |

---

### Phase P0-3: Mock 数据层

**文件**：`src/lib/demo-data.ts`

按文档第 26 节定义：
```ts
export const demoCouple = {
  names: "周启航 & 徐孝彤",
  startDate: "2024-05-20",
  subtitle: "A PRIVATE LOVE ARCHIVE",
  locationCount: 5,
  memoryCount: 42,
  letterCount: 12,
};

export const demoPhotos = [...];      // 6-9 张
export const demoTimeline = [...];    // 文档第 19 节
export const demoLetters = [...];     // 文档第 19 节
export const demoCapsules = [...];    // 文档第 19 节
export const pricingPlans = [...];    // 文档第 16 节
export const features = [...];        // 文档第 13 节
```

**辅助文件**：
- `src/lib/storage.ts` — localStorage 封装（创建/读取/删除空间）
- `src/lib/utils.ts` — cn()、日期计算、slug 生成

---

### Phase P0-4: React Bits + Cult UI 组件集成

**集成策略**：采用 copy-paste 模式，将组件源码放入 `src/components/external/`

**React Bits 组件**（精选符合 Light Archive 审美）：
- `BlurText` — 文字模糊浮现（Hero 标题）
- `Counter` — 数字滚动（Days Counter）
- `SpotlightCard` — 聚光卡片（Feature Archive）
- `TiltedCard` — 倾斜卡片（Photo Wall）
- `ScrollReveal` — 滚动揭示（通用动效）
- `ShinyText` — 微光文字（品牌名）
- `Dock` — 坞式导航（可选）

**Cult UI 组件**：
- `TextAnimate` — 文字动画
- `AnimatedNumber` — 动画数字
- `Typewriter` — 打字机效果
- `GradientHeading` — 渐变标题（用 Light Archive 色系）
- `Timer` — 计时器（Days Counter 实时跳动）
- `Shift Card` — 悬停展开卡片（Demo Space Invitation）

**目录结构**：
```
src/components/external/
├── react-bits/
│   ├── blur-text.tsx
│   ├── counter.tsx
│   ├── spotlight-card.tsx
│   ├── tilted-card.tsx
│   ├── scroll-reveal.tsx
│   └── shiny-text.tsx
└── cult-ui/
    ├── text-animate.tsx
    ├── animated-number.tsx
    ├── typewriter.tsx
    ├── gradient-heading.tsx
    ├── timer.tsx
    └── shift-card.tsx
```

---

### Phase P0-5: 全局组件与效果层

按文档第 22 节创建：

#### Layout 布局组件
- `src/components/layout/Header.tsx` — 顶部导航（透明、极简、品牌名居中）
- `src/components/layout/Footer.tsx` — 收束页脚

#### Effects 效果组件
- `src/components/effects/FilmGrain.tsx` — 胶片颗粒（轻量 CSS/Canvas）
- `src/components/effects/CursorGlow.tsx` — 鼠标光斑（径向渐变，pointer-events: none）
- `src/components/effects/SoftNoiseBackground.tsx` — 柔和噪点背景

**CursorGlow 实现**（文档第 24 节）：
```css
background: radial-gradient(
  circle,
  rgba(232, 184, 162, 0.22),
  rgba(242, 214, 162, 0.10) 28%,
  transparent 60%
);
```

#### UI 基础组件
- `src/components/ui/Button.tsx` — 主按钮（深色纸张）+ 次按钮（透明边框）
- `src/components/ui/ArchiveCard.tsx` — 档案卡片（奶白半透明、浅灰细边、旧照片纸阴影）
- `src/components/ui/SectionLabel.tsx` — 章节标签
- `src/components/ui/ProgressLine.tsx` — 进度线

---

### Phase P0-6: 首页 8 个 Sections

**文件**：`src/app/page.tsx` 组合所有 sections

#### Section 01: HeroOpening
**文件**：`src/components/home/HeroOpening.tsx`
- 全屏高度，浅色背景
- 中间品牌标题"永 恒 / YǑNG HÉNG"
- 使用 React Bits `BlurText` + `ShinyText`
- 叠加 FilmGrain + CursorGlow
- 两个按钮：创建永恒空间 / 看一段示例故事
- 文案来自文档第 10 节

#### Section 02: ScrollFilm（项目灵魂）
**文件**：`src/components/home/ScrollFilm.tsx`

**核心实现**（文档第 11、25 节）：
```tsx
// GSAP ScrollTrigger pin + scrub
video.muted = true;
video.playsInline = true;
video.preload = "auto";
video.pause();

// loadedmetadata 后获取 duration
// ScrollTrigger onUpdate: video.currentTime = duration * progress
```

**章节数据**（文档第 25 节完整定义）：
- 01 CLASSROOM LIGHT (0-16%) — left-bottom
- 02 THE FIRST NOTE (16-32%) — right-bottom
- 03 CAMPUS YEARS (32-48%) — left-center
- 04 CITY NIGHT (48-66%) — right-center
- 05 SEASIDE (66-84%) — left-bottom
- 06 DANCE (84-100%) — center-bottom

**滚动区高度**：`end: +=5200`

**字幕排版**：电影字幕式，左下/右下/中下交替，留白大

**叠加层**：
- 轻微暗/亮渐变
- 胶片颗粒
- 章节进度线
- 小型档案卡片（"第一次见面 2024.05.20 已保存到时间线"等）

**Fallback**：视频缺失时显示 poster + 提示文案

**移动端降级**（<768px）：普通 video autoplay muted loop，章节改纵向卡片

#### Section 03: ProductReveal
**文件**：`src/components/home/ProductReveal.tsx`
- 视频结束后产品浮现
- 奶白/瓷白背景 + 海面色柔和渐变
- 左侧文案 + 右侧档案卡（周启航 & 徐孝彤，768 days saved 等）
- 文案来自文档第 12 节

#### Section 04: FeatureArchive
**文件**：`src/components/home/FeatureArchive.tsx`
- 左侧 sticky 大标题 + 右侧滚动档案卡
- 6 张档案卡（PHOTO WALL / TIMELINE / LETTERS / ANNIVERSARIES / TIME CAPSULE / PRIVATE LINK）
- 使用 React Bits `SpotlightCard` + `ScrollReveal`
- 动效：blur 12px→0, opacity 0→1, hover 轻微旋转 1deg
- 文案来自文档第 13 节

#### Section 05: DemoSpaceInvitation
**文件**：`src/components/home/DemoSpaceInvitation.tsx`
- 大邀请函卡片
- 使用 Cult UI `Shift Card`
- 链接到 `/space/demo`
- 文案来自文档第 14 节

#### Section 06: CreateRitualPreview
**文件**：`src/components/home/CreateRitualPreview.tsx`
- 四步纸片式展示
- CTA 链接到 `/new`
- 文案来自文档第 15 节

#### Section 07: PricingGiftCards
**文件**：`src/components/home/PricingGiftCards.tsx`
- 三档礼品卡：STARTER ¥0 / GIFT ¥59 / ETERNAL ¥199
- 主推 GIFT
- 文案来自文档第 16 节

#### Section 08: ClosingSection
**文件**：`src/components/home/ClosingSection.tsx`
- 收束文案 + Footer
- 文案来自文档第 17 节

---

### Phase P0-7: /new 创建空间流程

**文件**：`src/app/new/page.tsx` + `src/components/create/CreateSpaceWizard.tsx`

**4 步流程**（文档第 18 节）：
1. 你们是谁？（yourName, partnerName）
2. 故事从哪天开始？（startDate）
3. 选择空间风格（校园初恋 / 旅行恋人 / 日常陪伴）
4. 生成空间（slug, preview）

**行为**：
- 表单提交 → 存入 localStorage → 生成 slug → 跳转 `/space/[slug]`
- 无照片时使用内置 demo images
- 成功页文案 + 按钮（打开空间 / 复制链接 / 返回首页）

**localStorage 数据结构**：
```ts
{
  slug: string;
  yourName: string;
  partnerName: string;
  startDate: string;
  template: "campus" | "travel" | "daily";
  createdAt: string;
}
```

---

### Phase P0-8: /space/demo 示例空间

**文件**：`src/app/space/demo/page.tsx`

**结构**（文档第 19 节）：
1. Cover — 周启航 & 徐孝彤，From 2024.05.20 to forever
2. DaysCounter — 实时跳动（使用 Cult UI `Timer`）
3. PhotoWall — 6-9 张照片，相纸旋转，hover 回正，点击 lightbox
4. MemoryTimeline — 时间线节点
5. LetterPanel — 情书展示
6. MemoryMapPlaceholder
7. TimeCapsulePlaceholder

**组件**：
- `src/components/space/SpaceCover.tsx`
- `src/components/space/DaysCounter.tsx`
- `src/components/space/PhotoWall.tsx`（使用 React Bits `TiltedCard`）
- `src/components/space/MemoryTimeline.tsx`
- `src/components/space/LetterPanel.tsx`
- `src/components/space/TimeCapsuleCard.tsx`

---

### Phase P1-1: /space/[slug] 动态空间

**文件**：`src/app/space/[slug]/page.tsx`

**逻辑**：
- 读取 localStorage 中对应 slug 的数据
- 找不到 → 显示 404 式柔和页面 + "创建新的永恒空间"按钮
- 找到 → 用用户名字、日期、模板生成空间（照片用默认 demo photos）

---

### Phase P1-2: 辅助页面

#### /pricing
**文件**：`src/app/pricing/page.tsx`
- 复用 PricingGiftCards 组件的完整版

#### /dashboard
**文件**：`src/app/dashboard/page.tsx`
- 简化版管理后台
- 导航：概览 / 照片 / 时间线 / 情书 / 设置
- 概览卡片：空间链接、照片数量、时间线节点、下一个纪念日
- 使用 mock 数据

#### /login
**文件**：`src/app/login/page.tsx`
- 静态登录页（MVP 不做真实认证）

---

### Phase P2: 响应式与动效优化

**响应式**（文档第 31 节）：
- 桌面端：完整 scrub、多列排版、大留白
- 移动端：ScrollFilm 降级为 autoplay、章节改纵向卡片、创建流程必须可用

**性能**（文档第 32 节）：
- 视频使用 poster + preload="metadata"
- FilmGrain 使用轻量 CSS
- 图片使用 next/image + 合理 sizes
- 动效避免大量实时 canvas

---

## 四、目录结构总览

```
d:\project\yh\
├── docs/                                    # 11 份文档
│   ├── PRD.md
│   ├── DESIGN.md
│   ├── MVP.md
│   ├── IA.md
│   ├── USER_FLOW.md
│   ├── VIDEO_SPEC.md
│   ├── ANIMATION_SPEC.md
│   ├── COMPONENTS.md
│   ├── DATA_MODEL.md
│   ├── SUBMISSION_PLAN.md
│   └── CODEX_TASKS.md
├── public/
│   ├── videos/
│   │   └── yongheng-scroll-film.mp4        # 重命名自现有视频
│   └── images/
│       └── yongheng-poster.jpg             # 视频封面
├── src/
│   ├── app/
│   │   ├── layout.tsx                       # 根布局（字体、全局效果）
│   │   ├── page.tsx                         # 首页（8 sections）
│   │   ├── globals.css                      # 设计 Token + 全局样式
│   │   ├── new/
│   │   │   └── page.tsx                     # 创建空间
│   │   ├── space/
│   │   │   ├── demo/
│   │   │   │   └── page.tsx                 # 示例空间
│   │   │   └── [slug]/
│   │   │       └── page.tsx                 # 动态空间
│   │   ├── dashboard/
│   │   │   └── page.tsx                     # 管理后台
│   │   ├── pricing/
│   │   │   └── page.tsx                     # 价格页
│   │   └── login/
│   │       └── page.tsx                     # 登录页
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── effects/
│   │   │   ├── FilmGrain.tsx
│   │   │   ├── CursorGlow.tsx
│   │   │   └── SoftNoiseBackground.tsx
│   │   ├── home/
│   │   │   ├── HeroOpening.tsx
│   │   │   ├── ScrollFilm.tsx
│   │   │   ├── ProductReveal.tsx
│   │   │   ├── FeatureArchive.tsx
│   │   │   ├── DemoSpaceInvitation.tsx
│   │   │   ├── CreateRitualPreview.tsx
│   │   │   ├── PricingGiftCards.tsx
│   │   │   └── ClosingSection.tsx
│   │   ├── space/
│   │   │   ├── SpaceCover.tsx
│   │   │   ├── DaysCounter.tsx
│   │   │   ├── PhotoWall.tsx
│   │   │   ├── MemoryTimeline.tsx
│   │   │   ├── LetterPanel.tsx
│   │   │   └── TimeCapsuleCard.tsx
│   │   ├── create/
│   │   │   └── CreateSpaceWizard.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── ArchiveCard.tsx
│   │   │   ├── SectionLabel.tsx
│   │   │   └── ProgressLine.tsx
│   │   └── external/                        # React Bits + Cult UI
│   │       ├── react-bits/
│   │       │   ├── blur-text.tsx
│   │       │   ├── counter.tsx
│   │       │   ├── spotlight-card.tsx
│   │       │   ├── tilted-card.tsx
│   │       │   ├── scroll-reveal.tsx
│   │       │   └── shiny-text.tsx
│   │       └── cult-ui/
│   │           ├── text-animate.tsx
│   │           ├── animated-number.tsx
│   │           ├── typewriter.tsx
│   │           ├── gradient-heading.tsx
│   │           ├── timer.tsx
│   │           └── shift-card.tsx
│   └── lib/
│       ├── demo-data.ts                     # Mock 数据
│       ├── storage.ts                       # localStorage 封装
│       └── utils.ts                         # 工具函数
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── postcss.config.mjs
```

---

## 五、Assumptions & Decisions 假设与决策

### 5.1 关键决策
1. **组件库集成方式**：采用 copy-paste 模式（非 shadcn CLI），将源码放入 `src/components/external/`，便于自定义调整符合 Light Archive 审美
2. **视频文件处理**：将现有 `初始场景_-_2026-06-24_202606241709.mp4` 重命名为 `yongheng-scroll-film.mp4`，假设其内容符合"从校园到海边跳舞"叙事
3. **字体加载**：使用 `next/font/google` 加载 Noto Serif SC、Cormorant Garamond、Inter
4. **不使用 Three.js**：Light Archive 审美要求轻量，移除所有 3D 粒子效果
5. **ScrollFilm 移动端降级**：<768px 改为普通 autoplay video，保证体验流畅
6. **localStorage 作为唯一数据层**：MVP 不接任何后端

### 5.2 审美执行准则
- **禁止**：弹跳动画、强烈缩放、粒子爆炸、霓虹发光、蓝紫流体、过度 glassmorphism、廉价爱心
- **允许**：opacity fade、blur reveal、slow translateY、small rotate、soft parallax、paper hover lift、video scrub、cursor glow、film grain
- **Framer Motion 参数**：duration 0.8-1.2, ease [0.16, 1, 0.3, 1]
- **卡片阴影**：`box-shadow: 0 40px 120px rgba(60, 50, 40, 0.12)`

### 5.3 假设
- 现有视频文件内容符合 ScrollFilm 叙事要求（如不符，后续替换）
- React Bits 和 Cult UI 组件源码可正常 copy-paste 到项目中
- 用户环境已安装 Node.js 18+

---

## 六、Verification Steps 验证步骤

### 6.1 阶段性验证
每个 Phase 完成后执行：
```bash
npm run build   # 必须退出码 0
npm run dev     # 本地启动验证
```

### 6.2 最终验收标准（文档第 33 节）
- [ ] `npm run dev` 可以正常启动
- [ ] 首页可以完整访问
- [ ] 滚动电影区域不会报错
- [ ] 没有视频文件时有 fallback
- [ ] `/new` 可以创建空间
- [ ] 创建后跳转 `/space/[slug]`
- [ ] `/space/demo` 有完整示例内容
- [ ] 整体视觉是 Light Archive（不是黑金、不是粉色、不是蓝紫 AI）
- [ ] 页面有胶片感、留白、纸张感、海风感
- [ ] 所有 11 份文档都在 `/docs` 下
- [ ] React Bits + Cult UI 组件已集成
- [ ] 响应式：移动端可用
- [ ] `npm run build` 退出码 0

### 6.3 视觉验收
- 首屏 Hero 有电影感和品牌高级感
- ScrollFilm 滚动时视频推进、停止时停住、上滚倒退
- 字幕左下/右下/中下交替
- 产品浮现过渡自然
- 档案卡片有旧照片纸感
- 鼠标光斑柔和跟随
- 胶片颗粒轻微叠加

---

## 七、执行顺序（按文档第 30、34 节）

1. **P0 基础**：项目初始化 + 设计 Token + 全局样式 + 视频部署
2. **P0 文档**：创建 11 份 `/docs` 文档
3. **P0 数据**：Mock 数据 + localStorage 封装
4. **P0 组件库**：集成 React Bits + Cult UI 组件
5. **P0 全局组件**：Layout + Effects + UI 基础组件
6. **P0 首页**：8 个 Sections 静态结构
7. **P0 ScrollFilm**：滚动视频灵魂组件
8. **P0 创建流程**：`/new` + localStorage
9. **P0 示例空间**：`/space/demo`
10. **P1 动态空间**：`/space/[slug]`
11. **P1 辅助页面**：`/pricing`、`/dashboard`、`/login`
12. **P2 优化**：响应式 + 动效细节 + 性能
13. **最终验证**：lint/build + 验收清单

---

## 八、风险与应对

| 风险 | 应对 |
|------|------|
| 视频文件内容不符叙事 | 先用现有视频跑通流程，后续替换 |
| React Bits/Cult UI 组件类型不兼容 | copy-paste 时调整类型定义 |
| ScrollFilm 移动端卡顿 | 降级为 autoplay + 纵向卡片 |
| GSAP ScrollTrigger 与 Next.js SSR 冲突 | 使用 `useEffect` + `typeof window` 检查 |
| localStorage 隐私模式失效 | try-catch 包裹，失败时提示用户 |

---

**计划完成。待用户确认后立即进入执行阶段。**
