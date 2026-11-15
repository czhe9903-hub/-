// ============================================================
//  💖 她的专属宇宙 · 配置说明 💖
//  改这里，就能把网站变成你们的故事
// ============================================================

var CONFIG = {
  herName: '盟盟宝贝',          // 她的昵称（宇宙中心、标题、情话里都会用到）
  yourName: '嘉宝',           // 你的称呼
  startDate: '2026-03-04',  // 你们在一起的日子（用于计算相爱天数）
  anniversary: '03-04',     // 纪念日（月-日），每年循环，自动倒计时

  heroTitle: '宇宙围着盟主转',
  heroSub: '点击任意一颗星球，去看我们的每一段时光',

  // 每一段时光 = 一颗围绕她转的星球 = 一面照片墙
  // 照片：把图片放进 photos/<id>/ 文件夹，再在 photos 里填文件名即可
  periods: [
    {
      id: 'meet',
      name: '初见',
      time: '2026 · 春',
      desc: '那天你突然出现，我的宇宙从此有了光。',
      color: '#ff9a9e',
      photos: [{ src: 'photos/meet/1.jpg', caption: '第一次见面的那天' },
        { src: 'photos/meet/2.jpg', caption: '古镇的风' }
      ]
    },
    {
      id: 'sweet',
      name: '热恋',
      time: '2026 · 夏',
      desc: '一起走过的日子，每天都甜得像糖。',
      color: '#a18cd1',
      photos: [{ src: 'photos/sweet/1.jpg', caption: '收拾收拾准备出发！' },
        { src: 'photos/sweet/2.jpg', caption: '我爱你' }
      ]
    },
    {
      id: 'travel',
      name: '旅行',
      time: '2026 · 秋',
      desc: '世界很大，但和你一起，去哪里都是风景。',
      color: '#5ee7df',
      photos: [{ src: 'photos/travel/1.jpg', caption: '我们的合影' },
        { src: 'photos/travel/2.jpg', caption: '挑衣服的烦恼' }
      ]
    },
    {
      id: 'daily',
      name: '日常',
      time: '每一天',
      desc: '平凡的小事，因为有你，都变得闪闪发光。',
      color: '#fbc2eb',
      photos: [{ src: 'photos/daily/1.jpg', caption: '送别宝宝' },
        { src: 'photos/daily/2.jpg', caption: '日常的通话' }
      ]
    },
    {
      id: 'future',
      name: '未来',
      time: '待续',
      desc: '还有好多好多故事，等我们一起写下去。',
      color: '#84fab0',
      photos: [
        { src: 'photos/future/1.jpg' },
        { src: 'photos/future/2.jpg' },
        { src: 'photos/future/3.jpg' },
        { src: 'photos/future/4.jpg' },
        { src: 'photos/future/5.jpg' },
        { src: 'photos/future/6.jpg' }
      ]
    }
  ],

  // 默契大考验（answer 是正确答案的下标，从 0 开始）
  quiz: [
    { q: '她最喜欢吃的食物是？', options: ['火锅', '甜品', '日料', '烤肉'], answer: 2 },
    { q: '你们第一次见面的地点是？', options: ['机场', '咖啡店', '学校', '酒店'], answer: 0 },
    { q: '她最常对你说的一句话是？', options: ['你在干嘛', '早点睡', '想你', '以上都是'], answer: 3 },
    { q: '她生气的时候，最有效的哄法是？', options: ['讲道理', '认错+抱抱', '送礼物', '装可怜'], answer: 1 },
    { q: '她最大的梦想是？', options: ['环游世界', '有个温暖的家', '开一家小店', '吃遍天下'], answer: 0 }
  ],

  // 情话盲盒
  sweetWords: [
    '宇宙很大，我却只想围着你转。',
    '遇见你之后，我连星星都不想要了，因为你就是最亮的那颗。',
    '我喜欢你，不是情话，是心里话。',
    '和你在一起的每一天，都是纪念日。',
    '世界很吵，但你一出现，我的心就安静了。',
    '我想把所有的好运都摘给你。',
    '你是我的今天，也是我的每一个明天。',
    '银河有迹可循，而你是我唯一的轨道。'
  ],

  // 情书（写给宇宙中心）
  letter: '亲爱的宝贝：\n谢谢你来到我的生命里。\n宇宙那么大，我们那么小，\n可我的整颗心，都只装得下一个你。\n往后的每一天，我都想牵着你的手，\n一起看日出，一起等流星，\n一起把平凡的日子过成故事。\n我爱你。'
};
