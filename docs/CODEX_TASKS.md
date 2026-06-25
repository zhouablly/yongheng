# YǑNG HÉNG 永恒 — Codex 任务清单 (CODEX_TASKS)

> **版本**: v1.0  
> **执行阶段**: MVP 开发

---

## 1. 任务总览

### 1.1 P0 - 必须完成 (高优先级)
- [ ] P0-1: 项目初始化与基础设施
- [ ] P0-2: 文档体系 (11 份)
- [ ] P0-3: 设计 Token 与全局样式
- [ ] P0-4: Mock 数据层
- [ ] P0-5: 组件库集成 (React Bits + Cult UI)
- [ ] P0-6: 全局组件
- [ ] P0-7: 首页 8 个 Sections 静态结构
- [ ] P0-8: ScrollFilm 滚动视频灵魂组件
- [ ] P0-9: /new 创建空间流程
- [ ] P0-10: /space/demo 示例情侣空间
- [ ] P0-11: 构建验证与基础修复

### 1.2 P1 - 应该完成 (中优先级)
- [ ] P1-1: /space/[slug] 动态空间
- [ ] P1-2: /pricing 定价页
- [ ] P1-3: /login 登录页
- [ ] P1-4: /dashboard 仪表盘

### 1.3 P2 - 可以优化 (低优先级)
- [ ] P2-1: 响应式适配完善
- [ ] P2-2: 动效细节优化
- [ ] P2-3: 性能调优
- [ ] P2-4: 可访问性优化

---

## 2. P0 详细任务

### P0-1: 项目初始化
- [x] 创建 package.json
- [x] 创建 tsconfig.json
- [x] 创建 next.config.mjs
- [x] 创建 tailwind.config.ts
- [x] 创建 postcss.config.mjs
- [x] 创建 src/app 基础结构
- [x] 安装核心依赖
- [x] npm run build 验证通过

### P0-2: 文档体系
- [x] PRD.md - 产品需求文档
- [x] DESIGN.md - 设计规范
- [x] MVP.md - MVP 范围
- [x] IA.md - 信息架构
- [x] USER_FLOW.md - 用户流程
- [x] VIDEO_SPEC.md - 视频规范
- [x] ANIMATION_SPEC.md - 动效规范
- [x] COMPONENTS.md - 组件清单
- [x] DATA_MODEL.md - 数据模型
- [x] SUBMISSION_PLAN.md - 参赛提交
- [x] CODEX_TASKS.md - 任务清单 (本文档)

### P0-3: 设计 Token 与全局样式
- [ ] CSS variables 定义
- [ ] Tailwind 主题扩展
- [ ] 字体系统 (Google Fonts)
- [ ] 全局重置样式
- [ ] 胶片颗粒效果
- [ ] 滚动条美化
- [ ] 视频文件部署到 public/videos/

### P0-4: Mock 数据层
- [ ] src/lib/demo-data.ts - 示例数据
- [ ] src/lib/storage.ts - localStorage 封装
- [ ] src/lib/utils.ts - 工具函数 (日期、cn 等)
- [ ] src/types/index.ts - 类型定义

### P0-5: 组件库集成
- [ ] 调研并精选 React Bits 组件
- [ ] 调研并精选 Cult UI 组件
- [ ] Copy-paste 到 external/ 目录
- [ ] 适配 Light Archive 风格
- [ ] 统一导出入口

### P0-6: 全局组件
- [ ] layout/Header.tsx - 顶部导航
- [ ] layout/Footer.tsx - 底部导航
- [ ] layout/Section.tsx - 区块容器
- [ ] effects/FilmGrain.tsx - 胶片颗粒
- [ ] effects/CursorGlow.tsx - 鼠标柔光 (可选)
- [ ] ui/Button.tsx - 按钮
- [ ] ui/ArchiveCard.tsx - 档案卡片
- [ ] ui/Input.tsx - 输入框

### P0-7: 首页 Sections 静态结构
- [ ] home/Hero.tsx - 首屏
- [ ] home/ScrollFilm.tsx - 滚动电影 (壳子)
- [ ] home/ProductReveal.tsx - 产品揭橥
- [ ] home/FeatureArchive.tsx - 功能档案
- [ ] home/DemoSpace.tsx - Demo 预览
- [ ] home/CreateRitual.tsx - 创建仪式
- [ ] home/PricingSection.tsx - 定价方案
- [ ] home/ClosingSection.tsx - 收束结语
- [ ] 组装到 src/app/page.tsx

### P0-8: ScrollFilm 灵魂组件
- [ ] GSAP ScrollTrigger 集成
- [ ] 视频 pin + scrub 控制
- [ ] 6 章节目幕叠加
- [ ] 视觉叠加层 (颗粒、暗角、过曝)
- [ ] 移动端降级 (自动播放)
- [ ] 性能优化

### P0-9: /new 创建空间流程
- [ ] new/page.tsx - 向导容器
- [ ] new/StepNames.tsx - 第一步：名字
- [ ] new/StepDate.tsx - 第二步：日期
- [ ] new/StepPhoto.tsx - 第三步：照片
- [ ] new/StepMessage.tsx - 第四步：悄悄话
- [ ] localStorage 持久化
- [ ] 完成动画与跳转

### P0-10: /space/demo 示例空间
- [ ] space/demo/page.tsx - 空间首页
- [ ] space/SpaceCover.tsx - 封面
- [ ] space/DaysCounter.tsx - 天数计数
- [ ] space/PhotoWall.tsx - 照片墙
- [ ] space/Timeline.tsx - 时间轴
- [ ] space/LoveLetter.tsx - 情书
- [ ] space/TimeCapsule.tsx - 时光胶囊

### P0-11: 构建验证
- [ ] npm run build 通过
- [ ] 类型检查无错误
- [ ] 主要路由可访问
- [ ] 控制台无报错
- [ ] 基础功能可用

---

## 3. P1 详细任务

### P1-1: 动态空间
- [ ] space/[slug]/page.tsx
- [ ] 从 localStorage 读取数据
- [ ] 404 降级处理
- [ ] 空间设置入口

### P1-2: 定价页
- [ ] pricing/page.tsx
- [ ] 三档定价卡片
- [ ] FAQ 折叠面板
- [ ] CTA 区域

### P1-3: 登录页
- [ ] login/page.tsx
- [ ] 登录表单 (静态)
- [ ] 注册入口
- [ ] 忘记密码

### P1-4: 仪表盘
- [ ] dashboard/page.tsx
- [ ] 我的空间列表
- [ ] 数据概览
- [ ] 账户设置入口

---

## 4. P2 详细任务

### P2-1: 响应式适配
- [ ] 移动端 (< 768px) 优化
- [ ] 平板端适配
- [ ] 超大屏适配
- [ ] 触摸交互优化

### P2-2: 动效细节
- [ ] 滚动入场动画完善
- [ ] 微交互打磨
- [ ] 页面过渡动画
- [ ] 减少动效模式支持

### P2-3: 性能调优
- [ ] 图片懒加载
- [ ] 视频预加载策略
- [ ] 代码分割
- [ ] 滚动性能优化

### P2-4: 可访问性
- [ ] 语义化 HTML
- [ ] 键盘导航
- [ ] 对比度检查
- [ ] ARIA 标签

---

## 5. 验收标准

### 5.1 功能验收
- [ ] 首页可完整滚动浏览
- [ ] ScrollFilm 视频随滚动播放
- [ ] 创建空间四步可走完
- [ ] 数据保存到 localStorage
- [ ] 示例空间可浏览
- [ ] 主要链接可跳转

### 5.2 视觉验收
- [ ] 符合 Light Archive 审美
- [ ] 色彩使用正确
- [ ] 字体层级清晰
- [ ] 留白充足
- [ ] 动效舒缓不突兀

### 5.3 技术验收
- [ ] TypeScript 无错误
- [ ] 构建成功
- [ ] 无控制台报错
- [ ] 基础性能达标

---

## 6. 执行顺序建议

```
Phase 1: 基础设置
  P0-1 → P0-2 → P0-3 → P0-4

Phase 2: 组件与页面
  P0-5 → P0-6 → P0-7 → P0-10

Phase 3: 核心亮点
  P0-8 → P0-9

Phase 4: 验证与修复
  P0-11

Phase 5: 锦上添花 (如有时间)
  P1 → P2
```
