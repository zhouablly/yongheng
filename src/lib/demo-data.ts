import type { LoveSpace, MemoryPhoto, LoveLetter, TimelineEvent, Anniversary } from '@/types';

// 图片生成辅助函数
const img = (prompt: string, size: 'landscape_4_3' | 'landscape_16_9' | 'portrait_4_3' | 'square' = 'landscape_4_3') =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

export const demoPhotos: MemoryPhoto[] = [
  {
    id: 'photo-1',
    url: img('sunset beach couple holding hands silhouette warm golden hour sea waves romantic soft focus film photography overexposed light leaked'),
    caption: '第一次看海的那个夏天',
    date: '2020-07-15',
    location: '青岛',
  },
  {
    id: 'photo-2',
    url: img('cozy cafe couple drinking coffee winter afternoon window light warm atmosphere film aesthetic soft colors vintage'),
    caption: '每个周末的午后咖啡',
    date: '2020-12-05',
    location: '成都',
  },
  {
    id: 'photo-3',
    url: img('cherry blossom spring couple walking pink petals falling romantic soft light dreamy film photography overexposed'),
    caption: '樱花树下的约定',
    date: '2021-03-28',
    location: '武汉',
  },
  {
    id: 'photo-4',
    url: img('mountain hiking couple sunrise peak adventure misty morning landscape epic view film style golden light'),
    caption: '一起爬过的第一座山',
    date: '2021-10-02',
    location: '黄山',
  },
  {
    id: 'photo-5',
    url: img('rainy day city umbrella couple walking street lights bokeh night cozy mood film noir romantic'),
    caption: '雨中漫步的城市夜晚',
    date: '2022-04-18',
    location: '上海',
  },
  {
    id: 'photo-6',
    url: img('home cooking kitchen couple making dinner together warm light cozy domestic happiness film grain vintage'),
    caption: '一起做的第100顿饭',
    date: '2022-09-10',
    location: '家',
  },
  {
    id: 'photo-7',
    url: img('autumn park couple walking fallen leaves golden warm sunlight film photography overexposed soft focus romantic'),
    caption: '秋天的第一片落叶',
    date: '2021-11-15',
    location: '北京',
  },
  {
    id: 'photo-8',
    url: img('snow winter couple embracing white breath cold morning cozy scarf film aesthetic soft light'),
    caption: '初雪里的拥抱',
    date: '2022-01-08',
    location: '哈尔滨',
  },
  {
    id: 'photo-9',
    url: img('summer night fireworks couple watching colorful sky reflection eyes romantic film photography bokeh'),
    caption: '夏夜烟火里的我们',
    date: '2022-08-15',
    location: '大连',
  },
  {
    id: 'photo-10',
    url: img('bookstore library couple reading together quiet afternoon warm light dust particles film aesthetic cozy'),
    caption: '书店里的安静午后',
    date: '2023-02-20',
    location: '南京',
  },
  {
    id: 'photo-11',
    url: img('road trip car window couple driving sunset highway adventure freedom film photography warm tones'),
    caption: '说走就走的公路旅行',
    date: '2023-05-01',
    location: '青海',
  },
  {
    id: 'photo-12',
    url: img('birthday cake candles couple celebrating warm glow intimate moment cozy room film grain romantic'),
    caption: '你的生日，我的全世界',
    date: '2023-07-20',
    location: '家',
  },
];

export const demoLetters: LoveLetter[] = [
  {
    id: 'letter-1',
    title: '遇见你的第一天',
    content:
      '你好呀，今天是我们在图书馆遇见的第一天。你坐在靠窗的位置，阳光洒在你身上的时候，我忽然觉得整个世界都安静了下来。\n\n我假装在找书，其实一直在偷偷看你。后来你问我借了一支笔，我紧张得连笔盖都掉了。\n\n不知道以后还能不能再见到你，但我会记住今天下午三点十七分的阳光。',
    date: '2019-09-12',
    from: '陈屿',
    to: '林深',
  },
  {
    id: 'letter-2',
    title: '第一个冬天',
    content:
      '亲爱的深：\n\n今天下雪了，这是我们在一起的第一个冬天。你说你怕冷，那我就做你的暖手宝好不好？\n\n刚才你在我怀里睡着的时候，我偷偷数了你的睫毛。一共一百二十七根，每一根我都喜欢。\n\n以后的每一个冬天，我都想和你一起过。',
    date: '2019-12-22',
    from: '陈屿',
    to: '林深',
  },
  {
    id: 'letter-3',
    title: '写给三年后的我们',
    content:
      '屿：\n\n提笔的时候刚好是凌晨两点，你在我旁边睡得很沉。\n\n三年了，我们从合租的小房间，到现在有了属于自己的小窝。你总说我太独立，其实我最依赖的人就是你。\n\n谢谢你在我加班到深夜的时候留一盏灯，谢谢你记得我不吃香菜，谢谢你在每一次我想放弃的时候告诉我"还有我"。\n\n余生很长，还要麻烦你多多指教啦。',
    date: '2022-09-12',
    from: '林深',
    to: '陈屿',
  },
  {
    id: 'letter-4',
    title: '一千天的早安',
    content:
      '深：\n\n今天是我们在一起的第一千天。我数过，每一天都有早安，每一天都有晚安。\n\n你总笑我太较真，可我觉得，能坚持一千天对同一个人说早安，本身就是一种浪漫吧。\n\n下一个一千天，下下一个一千天，我都想继续做那个最早叫醒你的人。\n\n早安，我的全世界。',
    date: '2022-08-01',
    from: '陈屿',
    to: '林深',
  },
  {
    id: 'letter-5',
    title: '致未来的你',
    content:
      '亲爱的未来的你：\n\n不知道写这封信的时候，我们变成了什么样子。也许头发白了，也许走路慢了，也许记性变差了。\n\n但我希望，当我们老到记不清昨天吃了什么的时候，还能记得 2019 年那个秋天的图书馆，记得那支借出去的笔，记得第一次牵手时手心的汗。\n\n如果有一天我什么都不记得了，请你把这封信读给我听。\n\n我爱你，从过去到未来。',
    date: '2023-09-12',
    from: '陈屿',
    to: '林深',
  },
];

export const demoTimeline: TimelineEvent[] = [
  {
    id: 'event-1',
    title: '初次相遇',
    description: '在学校图书馆的书架间，目光第一次交汇',
    date: '2019-09-12',
    category: 'milestone',
  },
  {
    id: 'event-2',
    title: '告白那天',
    description: '梧桐树下，他紧张得连告白的话都说不清楚',
    date: '2019-11-05',
    category: 'milestone',
  },
  {
    id: 'event-3',
    title: '第一次旅行',
    description: '去了海边，那是我们第一次一起看日出',
    date: '2020-07-15',
    location: '青岛',
    category: 'trip',
  },
  {
    id: 'event-4',
    title: '一周年纪念日',
    description: '他亲手做了一个蛋糕，虽然丑但是很甜',
    date: '2020-11-05',
    category: 'milestone',
  },
  {
    id: 'event-5',
    title: '一起毕业',
    description: '穿着学士服在校园里拍了好多照片',
    date: '2021-06-20',
    category: 'milestone',
  },
  {
    id: 'event-6',
    title: '搬到一起住',
    description: '终于有了属于我们的小窝',
    date: '2021-08-01',
    category: 'milestone',
  },
  {
    id: 'event-7',
    title: '她的生日惊喜',
    description: '偷偷准备了她想要很久的相机',
    date: '2022-03-15',
    category: 'gift',
  },
  {
    id: 'event-8',
    title: '三周年',
    description: '时间过得好快，但每天都像初恋',
    date: '2022-11-05',
    category: 'milestone',
  },
  {
    id: 'event-9',
    title: '第一次养猫',
    description: '收养了一只橘猫，取名叫"日光"',
    date: '2023-04-10',
    category: 'everyday',
  },
  {
    id: 'event-10',
    title: '四周年·新的开始',
    description: '我们开始计划下一个十年了',
    date: '2023-11-05',
    category: 'milestone',
  },
];

export const demoAnniversaries: Anniversary[] = [
  {
    id: 'anniv-1',
    title: '在一起纪念日',
    date: '2019-11-05',
    type: 'yearly',
    emoji: '💕',
  },
  {
    id: 'anniv-2',
    title: '初遇纪念日',
    date: '2019-09-12',
    type: 'yearly',
    emoji: '📚',
  },
  {
    id: 'anniv-3',
    title: '她的生日',
    date: '2022-03-15',
    type: 'yearly',
    emoji: '🎂',
  },
  {
    id: 'anniv-4',
    title: '他的生日',
    date: '2022-07-20',
    type: 'yearly',
    emoji: '🎈',
  },
  {
    id: 'anniv-5',
    title: '100天',
    date: '2020-02-12',
    type: 'custom',
    emoji: '💯',
  },
  {
    id: 'anniv-6',
    title: '1000天',
    date: '2022-08-01',
    type: 'custom',
    emoji: '🌟',
  },
];

export const demoSpace: LoveSpace = {
  id: 'demo',
  couple: {
    id: 'couple-demo',
    partner1Name: '陈屿',
    partner2Name: '林深',
    anniversary: '2019-11-05',
    story:
      '2019年的秋天，我们在图书馆相遇。他借了我一支笔，我偷偷记住了他的名字。\n\n后来的故事很长，从校服到婚纱，从两个人的小家到一屋两人三餐四季。\n\n这里收藏着我们的每一个瞬间，有光，有爱，有永恒。',
    createdAt: '2019-11-05',
    coverImage: img('romantic golden hour couple silhouette seaside warm light film photography overexposed dreamy soft focus', 'landscape_16_9'),
  },
  photos: demoPhotos,
  letters: demoLetters,
  timeline: demoTimeline,
  anniversaries: demoAnniversaries,
  theme: {
    fontStyle: 'classic',
  },
};

// 用户见证数据
export const demoTestimonials = [
  {
    id: 't1',
    name: '小满 & 阿洲',
    avatar: img('young asian woman smiling soft light portrait film photography', 'square'),
    content: '在一起 1825 天了。每天打开永恒，都像打开一本只属于我们的相册。那些差点忘记的小事，都被它温柔地记住了。',
    days: 1825,
    location: '杭州',
  },
  {
    id: 't2',
    name: '林夕 & 远舟',
    avatar: img('young asian man smiling warm light portrait film photography vintage', 'square'),
    content: '异地恋的第三年，永恒成了我们的秘密基地。他在北京，我在广州，但我们的故事住在同一个地方。',
    days: 1095,
    location: '北京 · 广州',
  },
  {
    id: 't3',
    name: '知夏 & 言溪',
    avatar: img('young woman gentle smile portrait soft warm light film aesthetic', 'square'),
    content: '结婚五周年那天，他把这五年写过的情书都打印了出来。是永恒帮我们留住了那些差点丢失的文字。',
    days: 1825,
    location: '成都',
  },
];
