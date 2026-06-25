# YǑNG HÉNG 永恒 — 数据模型 (DATA_MODEL)

> **版本**: v1.0  
> **存储方式**: localStorage (MVP)

---

## 1. 数据架构

### 1.1 MVP 存储方案
- **存储介质**: localStorage
- **原因**: 无需后端，纯前端 Demo
- **限制**: 单浏览器、单设备、容量有限

### 1.2 数据结构
```typescript
// 空间数据
interface EternalSpace {
  id: string;                    // 唯一标识
  slug: string;                  // URL 友好标识
  partner1Name: string;          // 他的名字
  partner2Name: string;          // 她的名字
  startDate: string;             // 开始日期 (ISO)
  coverImage?: string;           // 封面图 (base64 或 URL)
  firstMessage?: string;         // 第一句悄悄话
  createdAt: string;             // 创建时间
  updatedAt: string;             // 更新时间
  
  // 内容模块
  photos?: Photo[];              // 照片墙
  timeline?: TimelineEvent[];    // 时间轴
  letters?: LoveLetter[];        // 情书
  capsules?: TimeCapsule[];      // 时光胶囊
}
```

---

## 2. 核心数据类型

### 2.1 Photo 照片
```typescript
interface Photo {
  id: string;
  url: string;                   // 图片地址
  caption?: string;              // 图说
  date?: string;                 // 拍摄日期
  location?: string;             // 拍摄地点
  createdAt: string;
}
```

### 2.2 TimelineEvent 时间轴事件
```typescript
interface TimelineEvent {
  id: string;
  title: string;                 // 事件标题
  description?: string;          // 事件描述
  date: string;                  // 发生日期
  icon?: string;                 // 图标名
  photoUrl?: string;             // 配图
  createdAt: string;
}
```

### 2.3 LoveLetter 情书
```typescript
interface LoveLetter {
  id: string;
  title: string;                 // 信件标题
  content: string;               // 信件内容
  from: string;                  // 寄信人
  to: string;                    // 收信人
  date: string;                  // 写信日期
  isRead: boolean;               // 是否已读
  createdAt: string;
}
```

### 2.4 TimeCapsule 时光胶囊
```typescript
interface TimeCapsule {
  id: string;
  title: string;                 // 胶囊标题
  content: string;               // 胶囊内容
  photoUrl?: string;             // 配图
  unlockDate: string;            // 开启日期
  isUnlocked: boolean;           // 是否已开启
  createdAt: string;
}
```

---

## 3. Demo 示例数据

### 3.1 示例情侣
```typescript
export const demoCouple = {
  id: "demo",
  slug: "demo",
  partner1Name: "周启航",
  partner2Name: "徐孝彤",
  startDate: "2024-05-20",
  subtitle: "A PRIVATE LOVE ARCHIVE",
  coverImage: null,  // 使用默认封面
  firstMessage: "遇见你，是我最温柔的意外。",
  locationCount: 5,
  memoryCount: 42,
  letterCount: 12,
};
```

### 3.2 示例照片
- 数量：约 12-16 张
- 类型：日常、旅行、节日、纪念日
- 配图说明：简短温暖

### 3.3 示例时间轴事件
1. 初遇那天 - 2024.03.15
2. 第一次约会 - 2024.04.02
3. 正式在一起 - 2024.05.20
4. 第一次旅行 - 2024.08.10
5. 一周年 - 2025.05.20
6. 海边起舞 - 2025.07.16

---

## 4. localStorage 封装

### 4.1 Key 命名空间
```
YONGHENG_SPACES        // 所有空间列表
YONGHENG_CURRENT       // 当前空间 ID
YONGHENG_DEMO_INITED   // Demo 是否已初始化
```

### 4.2 工具函数
```typescript
// 空间操作
createSpace(data: CreateSpaceInput): EternalSpace
getSpace(slug: string): EternalSpace | null
updateSpace(id: string, data: Partial<EternalSpace>): void
deleteSpace(id: string): void
listSpaces(): EternalSpace[]

// 内容操作
addPhoto(spaceId: string, photo: Omit<Photo, 'id' | 'createdAt'>): Photo
addTimelineEvent(spaceId: string, event: Omit<TimelineEvent, 'id' | 'createdAt'>): TimelineEvent
addLetter(spaceId: string, letter: Omit<LoveLetter, 'id' | 'createdAt'>): LoveLetter
addCapsule(spaceId: string, capsule: Omit<TimeCapsule, 'id' | 'createdAt'>): TimeCapsule
```

---

## 5. 日期计算

### 5.1 在一起天数
```typescript
function getDaysTogether(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}
```

### 5.2 纪念日判断
```typescript
function isAnniversary(startDate: string): boolean {
  // 检查今天是否是月纪念日或年纪念日
}
```

---

## 6. 未来扩展 (Post-MVP)

### 6.1 Supabase 数据库表
- `spaces` - 空间表
- `users` - 用户表
- `space_members` - 空间成员
- `photos` - 照片表
- `timeline_events` - 时间轴事件
- `love_letters` - 情书表
- `time_capsules` - 时光胶囊表

### 6.2 认证
- 邮箱密码登录
- 魔法链接
- OAuth (Google/Apple)

### 6.3 文件存储
- Supabase Storage
- 图片压缩
- CDN 加速

---

## 7. 数据迁移

### 7.1 localStorage → 云端
MVP 阶段数据存在本地，未来可：
1. 用户注册账号
2. 上传本地数据到云端
3. 多设备同步
4. 备份与恢复

### 7.2 数据导出
- 支持导出 JSON
- 支持导出 PDF/照片书
- 数据始终属于用户
