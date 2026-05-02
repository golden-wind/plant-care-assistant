import type { Plant, Category } from '@/types';

export const categories: Category[] = [
  { id: 'foliage', name: '观叶植物', icon: 'Leaf', description: '叶片美观，净化空气' },
  { id: 'flowering', name: '开花植物', icon: 'Flower2', description: '花色艳丽，芳香怡人' },
  { id: 'succulent', name: '多肉植物', icon: 'Cactus', description: '形态可爱，易于养护' },
  { id: 'herb', name: '香草植物', icon: 'Sprout', description: '可食用可观赏' },
  { id: 'hydroponic', name: '水培植物', icon: 'Droplets', description: '清洁美观，水养即可' },
  { id: 'air-purifying', name: '空气净化', icon: 'Wind', description: '吸收甲醛，净化空气' },
];

export const plants: Plant[] = [
  // 观叶植物
  {
    id: 'pothos',
    name: '绿萝',
    alias: '黄金葛、魔鬼藤',
    category: 'foliage',
    categoryName: '观叶植物',
    difficulty: 1,
    origin: '所罗门群岛',
    description: '绿萝是最受欢迎的室内观叶植物之一，叶片翠绿，生命力顽强，有"生命之花"的美称。',
    imageUrl: 'https://images.unsplash.com/photo-1596724857861-d277d5e25133?w=400',
    careGuide: {
      light: '散射光或半阴环境，避免强光直射',
      temperature: '15-30°C，冬季不低于10°C',
      humidity: '60-80%，喜湿润环境',
      wateringFrequency: 5,
      wateringAmount: '浇透，保持土壤微湿',
      fertilizingFrequency: 30,
      fertilizingType: '稀释的观叶植物营养液',
      soilType: '疏松透气的腐叶土',
      pruning: '定期修剪过长枝条，促进分枝'
    },
    commonIssues: [
      { symptom: '叶片发黄', cause: '浇水过多或光照不足', solution: '减少浇水，移至明亮处' },
      { symptom: '叶尖干枯', cause: '空气干燥或肥害', solution: '增加喷雾，稀释肥料' },
      { symptom: '叶片变小', cause: '光照不足或缺肥', solution: '增加光照，适量施肥' }
    ],
    tips: ['可水培也可土培', '新装修房间首选净化植物', '扦插极易成活']
  },
  {
    id: 'spider-plant',
    name: '吊兰',
    alias: '挂兰、蜘蛛草',
    category: 'foliage',
    categoryName: '观叶植物',
    difficulty: 1,
    origin: '南非',
    description: '吊兰叶片细长柔软，四季常青，悬垂生长，是极佳的室内垂吊植物。',
    imageUrl: 'https://images.unsplash.com/photo-1572688484279-a2e897067b2d?w=400',
    careGuide: {
      light: '明亮的散射光，耐半阴',
      temperature: '15-25°C，冬季不低于5°C',
      humidity: '60-70%',
      wateringFrequency: 4,
      wateringAmount: '见干见湿，避免积水',
      fertilizingFrequency: 20,
      fertilizingType: '复合肥或有机肥',
      soilType: '疏松肥沃的沙质壤土',
      pruning: '剪除枯叶，分株繁殖'
    },
    commonIssues: [
      { symptom: '叶尖焦枯', cause: '空气干燥或水质问题', solution: '增加湿度，使用软水' },
      { symptom: '叶片倒伏', cause: '光照不足或浇水过多', solution: '增加光照，控制浇水' }
    ],
    tips: ['净化空气能力强', '走茎繁殖简单', '适合悬挂养护']
  },
  {
    id: 'snake-plant',
    name: '虎皮兰',
    alias: '虎尾兰、千岁兰',
    category: 'foliage',
    categoryName: '观叶植物',
    difficulty: 1,
    origin: '西非',
    description: '虎皮兰叶片坚挺直立，有虎尾状斑纹，极耐旱，是懒人植物的代表。',
    imageUrl: 'https://images.unsplash.com/photo-1599598425947-530d38a69b24?w=400',
    careGuide: {
      light: '喜光也耐阴，适应性强',
      temperature: '18-27°C，冬季不低于10°C',
      humidity: '40-70%',
      wateringFrequency: 10,
      wateringAmount: '宁干勿湿，干透浇透',
      fertilizingFrequency: 60,
      fertilizingType: '缓释肥或稀薄液肥',
      soilType: '排水良好的沙质土',
      pruning: '基本不需修剪'
    },
    commonIssues: [
      { symptom: '叶片变软', cause: '浇水过多导致烂根', solution: '停止浇水，检查根系' },
      { symptom: '叶片徒长', cause: '光照不足', solution: '增加光照强度' }
    ],
    tips: ['夜间释放氧气', '极耐干旱', '卧室摆放首选']
  },
  {
    id: 'monstera',
    name: '龟背竹',
    alias: '蓬莱蕉、龟背芋',
    category: 'foliage',
    categoryName: '观叶植物',
    difficulty: 2,
    origin: '墨西哥热带雨林',
    description: '龟背竹叶片巨大，有天然孔洞，形似龟背，极具热带风情。',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
    careGuide: {
      light: '明亮的散射光，忌强光',
      temperature: '20-30°C，冬季不低于10°C',
      humidity: '70-85%，喜高湿',
      wateringFrequency: 4,
      wateringAmount: '保持土壤湿润但不积水',
      fertilizingFrequency: 20,
      fertilizingType: '观叶植物专用肥',
      soilType: '疏松透气的腐殖土',
      pruning: '修剪老叶，支撑茎干'
    },
    commonIssues: [
      { symptom: '叶片不开裂', cause: '植株年幼或光照不足', solution: '耐心等待，增加散射光' },
      { symptom: '叶片发黄', cause: '浇水过多或空气干燥', solution: '控制浇水，增加喷雾' }
    ],
    tips: ['气生根可吸收水分', '大型叶片需定期擦拭', '支撑杆辅助生长']
  },
  {
    id: 'rubber-plant',
    name: '橡皮树',
    alias: '印度榕、橡胶树',
    category: 'foliage',
    categoryName: '观叶植物',
    difficulty: 2,
    origin: '印度、马来西亚',
    description: '橡皮树叶片厚实光亮，呈深绿色，树形优美，是著名的盆栽观叶植物。',
    imageUrl: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?w=400',
    careGuide: {
      light: '充足的散射光',
      temperature: '20-30°C，冬季不低于8°C',
      humidity: '50-70%',
      wateringFrequency: 5,
      wateringAmount: '表土干了再浇透',
      fertilizingFrequency: 30,
      fertilizingType: '氮磷钾复合肥',
      soilType: '肥沃疏松的微酸性土壤',
      pruning: '春季打顶促分枝'
    },
    commonIssues: [
      { symptom: '叶片下垂', cause: '缺水或温度过低', solution: '适量补水，提高温度' },
      { symptom: '叶片脱落', cause: '环境突变或浇水不当', solution: '稳定环境，调整浇水' }
    ],
    tips: ['叶片有乳白色汁液', '定期擦拭叶片', '可修剪成各种造型']
  },
  {
    id: 'money-tree',
    name: '发财树',
    alias: '瓜栗、中美木棉',
    category: 'foliage',
    categoryName: '观叶植物',
    difficulty: 2,
    origin: '中美洲',
    description: '发财树茎干基部膨大，叶片翠绿，寓意吉祥，是常见的室内吉祥植物。',
    imageUrl: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400',
    careGuide: {
      light: '明亮的散射光，耐半阴',
      temperature: '20-30°C，冬季不低于15°C',
      humidity: '50-70%',
      wateringFrequency: 10,
      wateringAmount: '宁干勿湿，干透浇透',
      fertilizingFrequency: 45,
      fertilizingType: '均衡复合肥',
      soilType: '疏松透气的沙质壤土',
      pruning: '修剪过密枝条，保持株型'
    },
    commonIssues: [
      { symptom: '叶片发黄脱落', cause: '浇水过多', solution: '减少浇水，检查根系' },
      { symptom: '茎干腐烂', cause: '积水导致', solution: '控制浇水，改善通风' }
    ],
    tips: ['极怕积水', '茎干储水能力强', '商业场所常见']
  },

  // 开花植物
  {
    id: 'jasmine',
    name: '茉莉花',
    alias: '茉莉、香魂',
    category: 'flowering',
    categoryName: '开花植物',
    difficulty: 3,
    origin: '印度、阿拉伯',
    description: '茉莉花洁白芬芳，花期长，花香浓郁，是著名的花茶原料和观赏花卉。',
    imageUrl: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14d?w=400',
    careGuide: {
      light: '充足的阳光，每天至少6小时',
      temperature: '25-35°C，冬季不低于10°C',
      humidity: '60-80%',
      wateringFrequency: 3,
      wateringAmount: '保持土壤湿润',
      fertilizingFrequency: 15,
      fertilizingType: '磷钾肥为主',
      soilType: '微酸性疏松土壤',
      pruning: '花后修剪，促进新枝'
    },
    commonIssues: [
      { symptom: '不开花', cause: '光照不足或氮肥过多', solution: '增加光照，增施磷钾肥' },
      { symptom: '叶片发黄', cause: '土壤偏碱或缺铁', solution: '施用硫酸亚铁，调酸' }
    ],
    tips: ['喜酸性土壤', '花香可提取精油', '花后可泡茶']
  },
  {
    id: 'gardenia',
    name: '栀子花',
    alias: '黄栀子、玉荷花',
    category: 'flowering',
    categoryName: '开花植物',
    difficulty: 3,
    origin: '中国',
    description: '栀子花叶片翠绿有光泽，花朵洁白芳香，是典型的酸性土壤指示植物。',
    imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400',
    careGuide: {
      light: '充足的散射光，夏季遮阴',
      temperature: '18-28°C，冬季不低于5°C',
      humidity: '70%以上',
      wateringFrequency: 3,
      wateringAmount: '保持土壤湿润',
      fertilizingFrequency: 15,
      fertilizingType: '酸性肥料',
      soilType: '酸性腐叶土',
      pruning: '花后修剪整形'
    },
    commonIssues: [
      { symptom: '叶片黄化', cause: '土壤碱化缺铁', solution: '施用硫酸亚铁溶液' },
      { symptom: '落蕾', cause: '环境变化或浇水不当', solution: '稳定环境，均匀浇水' }
    ],
    tips: ['典型的喜酸植物', '喷雾增加湿度', '花后及时修剪']
  },
  {
    id: 'rose',
    name: '月季',
    alias: '月月红、长春花',
    category: 'flowering',
    categoryName: '开花植物',
    difficulty: 3,
    origin: '中国',
    description: '月季花色丰富，花型优美，四季开花，被称为"花中皇后"。',
    imageUrl: 'https://images.unsplash.com/photo-1496857239036-1fb137683000?w=400',
    careGuide: {
      light: '全日照，每天至少6小时',
      temperature: '15-26°C',
      humidity: '50-70%',
      wateringFrequency: 3,
      wateringAmount: '见干见湿，浇透',
      fertilizingFrequency: 15,
      fertilizingType: '月季专用肥或复合肥',
      soilType: '疏松肥沃的微酸性土',
      pruning: '定期修剪，花后剪除残花'
    },
    commonIssues: [
      { symptom: '黑斑病', cause: '真菌感染', solution: '喷杀菌剂，改善通风' },
      { symptom: '白粉病', cause: '通风不良', solution: '加强通风，喷药防治' }
    ],
    tips: ['需要充足阳光', '注意病虫害防治', '定期修剪促开花']
  },
  {
    id: 'kalanchoe',
    name: '长寿花',
    alias: '圣诞伽蓝菜',
    category: 'flowering',
    categoryName: '开花植物',
    difficulty: 2,
    origin: '马达加斯加',
    description: '长寿花叶片肥厚，花色丰富，花期长，寓意健康长寿，是节日馈赠佳品。',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
    careGuide: {
      light: '充足的阳光',
      temperature: '15-25°C，冬季不低于10°C',
      humidity: '40-60%',
      wateringFrequency: 7,
      wateringAmount: '干透浇透，忌积水',
      fertilizingFrequency: 20,
      fertilizingType: '磷钾肥促花',
      soilType: '疏松的沙质土',
      pruning: '花后修剪，促进分枝'
    },
    commonIssues: [
      { symptom: '徒长不开花', cause: '光照不足或氮肥过多', solution: '增加光照，控氮增磷钾' },
      { symptom: '根部腐烂', cause: '浇水过多', solution: '减少浇水，改善排水' }
    ],
    tips: ['短日照促花', '花期长', '扦插易成活']
  },
  {
    id: 'orchid',
    name: '蝴蝶兰',
    alias: '蝶兰',
    category: 'flowering',
    categoryName: '开花植物',
    difficulty: 4,
    origin: '亚热带雨林',
    description: '蝴蝶兰花姿优美，花色艳丽，花期长达数月，是高档的室内观赏花卉。',
    imageUrl: 'https://images.unsplash.com/photo-1566639856280-33eb41477157?w=400',
    careGuide: {
      light: '明亮的散射光',
      temperature: '18-28°C',
      humidity: '60-80%',
      wateringFrequency: 7,
      wateringAmount: '根部发白时浇水',
      fertilizingFrequency: 15,
      fertilizingType: '兰花专用肥',
      soilType: '水苔或树皮',
      pruning: '花后剪除花茎'
    },
    commonIssues: [
      { symptom: '烂根', cause: '浇水过多或通风差', solution: '减少浇水，改善通风' },
      { symptom: '不开花', cause: '温差不足或光照不够', solution: '增加昼夜温差和光照' }
    ],
    tips: ['气生根需透气', '忌积水', '花期长']
  },

  // 多肉植物
  {
    id: 'aloe',
    name: '芦荟',
    alias: '油葱、象胆',
    category: 'succulent',
    categoryName: '多肉植物',
    difficulty: 1,
    origin: '非洲',
    description: '芦荟叶片肥厚多汁，具有药用和美容价值，是多肉植物中的经典品种。',
    imageUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400',
    careGuide: {
      light: '充足的阳光',
      temperature: '15-35°C，冬季不低于5°C',
      humidity: '40-60%',
      wateringFrequency: 14,
      wateringAmount: '干透浇透，宁干勿湿',
      fertilizingFrequency: 60,
      fertilizingType: '多肉专用肥或缓释肥',
      soilType: '排水良好的沙质土',
      pruning: '去除老叶，分株繁殖'
    },
    commonIssues: [
      { symptom: '叶片发黄变软', cause: '浇水过多', solution: '停止浇水，晾干土壤' },
      { symptom: '叶片变褐', cause: '强光灼伤', solution: '适当遮阴' }
    ],
    tips: ['耐旱怕涝', '可食用可美容', '分株繁殖简单']
  },
  {
    id: 'cactus',
    name: '仙人掌',
    alias: '仙巴掌、霸王树',
    category: 'succulent',
    categoryName: '多肉植物',
    difficulty: 1,
    origin: '美洲',
    description: '仙人掌形态奇特，极耐干旱，是沙漠植物的代表，养护极其简单。',
    imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
    careGuide: {
      light: '充足的直射阳光',
      temperature: '20-35°C，冬季不低于10°C',
      humidity: '30-50%',
      wateringFrequency: 14,
      wateringAmount: '干透浇透，冬季控水',
      fertilizingFrequency: 60,
      fertilizingType: '仙人掌专用肥',
      soilType: '沙质土，排水极好',
      pruning: '基本不需修剪'
    },
    commonIssues: [
      { symptom: '徒长变形', cause: '光照不足', solution: '增加光照' },
      { symptom: '根部腐烂', cause: '浇水过多', solution: '控水，检查根系' }
    ],
    tips: ['极耐干旱', '阳光充足形态好', '注意刺扎']
  },
  {
    id: 'echeveria',
    name: '石莲花',
    alias: '拟石莲花',
    category: 'succulent',
    categoryName: '多肉植物',
    difficulty: 2,
    origin: '墨西哥、中美洲',
    description: '石莲花叶片排列成莲座状，叶色丰富，是多肉植物中最受欢迎的种类之一。',
    imageUrl: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400',
    careGuide: {
      light: '充足的阳光，夏季遮阴',
      temperature: '15-25°C，冬季不低于5°C',
      humidity: '40-60%',
      wateringFrequency: 10,
      wateringAmount: '干透浇透，避免叶心积水',
      fertilizingFrequency: 45,
      fertilizingType: '多肉专用稀释液肥',
      soilType: '颗粒土为主',
      pruning: '去除枯叶，繁殖侧芽'
    },
    commonIssues: [
      { symptom: '徒长摊大饼', cause: '光照不足', solution: '增加光照，控水' },
      { symptom: '黑腐病', cause: '高温高湿', solution: '控水通风，砍头繁殖' }
    ],
    tips: ['阳光充足出状态', '叶插繁殖容易', '夏季注意通风']
  },

  // 香草植物
  {
    id: 'mint',
    name: '薄荷',
    alias: '银丹草',
    category: 'herb',
    categoryName: '香草植物',
    difficulty: 1,
    origin: '欧洲',
    description: '薄荷叶片芳香，清凉提神，可食用可泡茶，生长迅速，极易养护。',
    imageUrl: 'https://images.unsplash.com/photo-1628556270448-4d4e6a4d57c1?w=400',
    careGuide: {
      light: '充足的阳光或半阴',
      temperature: '20-30°C',
      humidity: '60-80%',
      wateringFrequency: 3,
      wateringAmount: '保持土壤湿润',
      fertilizingFrequency: 20,
      fertilizingType: '氮肥为主',
      soilType: '疏松肥沃的土壤',
      pruning: '经常修剪促进分枝'
    },
    commonIssues: [
      { symptom: '叶片发黄', cause: '缺水或缺肥', solution: '增加浇水施肥' },
      { symptom: '白粉病', cause: '通风不良', solution: '改善通风，喷药' }
    ],
    tips: ['生长极快', '可水培', '可食用泡茶']
  },
  {
    id: 'basil',
    name: '罗勒',
    alias: '九层塔、金不换',
    category: 'herb',
    categoryName: '香草植物',
    difficulty: 2,
    origin: '印度',
    description: '罗勒叶片芳香，是意大利料理的重要香料，也可药用。',
    imageUrl: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400',
    careGuide: {
      light: '充足的阳光',
      temperature: '20-30°C，冬季不低于10°C',
      humidity: '50-70%',
      wateringFrequency: 3,
      wateringAmount: '保持土壤湿润',
      fertilizingFrequency: 20,
      fertilizingType: '均衡肥',
      soilType: '疏松肥沃的土壤',
      pruning: '摘心促分枝，花前采收'
    },
    commonIssues: [
      { symptom: '叶片发黑', cause: '霜冻或低温', solution: '保温，移至室内' },
      { symptom: '开花后枯萎', cause: '正常生命周期', solution: '及时采收播种' }
    ],
    tips: ['西餐常用香料', '一年生草本', '花序可食用']
  },
  {
    id: 'rosemary',
    name: '迷迭香',
    alias: '海洋之露',
    category: 'herb',
    categoryName: '香草植物',
    difficulty: 3,
    origin: '地中海',
    description: '迷迭香叶片针状，芳香持久，是西餐常用香料，也可提取精油。',
    imageUrl: 'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=400',
    careGuide: {
      light: '充足的阳光',
      temperature: '15-30°C',
      humidity: '40-60%',
      wateringFrequency: 7,
      wateringAmount: '见干见湿，忌积水',
      fertilizingFrequency: 30,
      fertilizingType: '磷钾肥',
      soilType: '疏松的沙质土',
      pruning: '修剪整形，促进分枝'
    },
    commonIssues: [
      { symptom: '叶片发黑脱落', cause: '浇水过多或通风差', solution: '控水，改善通风' },
      { symptom: '生长缓慢', cause: '光照不足', solution: '增加光照' }
    ],
    tips: ['喜干燥怕湿', '西餐烤肉常用', '可制作精油']
  },
  {
    id: 'lavender',
    name: '薰衣草',
    alias: '灵香草',
    category: 'herb',
    categoryName: '香草植物',
    difficulty: 3,
    origin: '地中海',
    description: '薰衣草花序紫色，芳香怡人，是著名的芳香植物和蜜源植物。',
    imageUrl: 'https://images.unsplash.com/photo-1498579687545-d5a4fffb0b2b?w=400',
    careGuide: {
      light: '全日照',
      temperature: '15-25°C',
      humidity: '40-60%，喜干燥',
      wateringFrequency: 7,
      wateringAmount: '干透浇透，忌积水',
      fertilizingFrequency: 45,
      fertilizingType: '磷钾肥',
      soilType: '碱性沙质土',
      pruning: '花后修剪，保持株型'
    },
    commonIssues: [
      { symptom: '叶片发黄', cause: '土壤过湿或偏酸', solution: '控水，调整土壤酸碱度' },
      { symptom: '不开花', cause: '光照不足或修剪不当', solution: '增加光照，正确修剪' }
    ],
    tips: ['喜凉爽干燥', '碱性土壤', '可制作干花']
  },

  // 水培植物
  {
    id: 'lucky-bamboo',
    name: '富贵竹',
    alias: '开运竹、万年竹',
    category: 'hydroponic',
    categoryName: '水培植物',
    difficulty: 1,
    origin: '非洲西部',
    description: '富贵竹茎节分明，可水培可土培，寓意吉祥，是常见的风水植物。',
    imageUrl: 'https://images.unsplash.com/photo-1599598425947-530d38a69b24?w=400',
    careGuide: {
      light: '明亮的散射光，忌强光',
      temperature: '18-24°C，冬季不低于10°C',
      humidity: '60-80%',
      wateringFrequency: 7,
      wateringAmount: '水培保持水位，每周换水',
      fertilizingFrequency: 30,
      fertilizingType: '水培营养液',
      soilType: '水培或疏松土壤',
      pruning: '修剪黄叶，整形'
    },
    commonIssues: [
      { symptom: '叶片发黄', cause: '光照过强或缺铁', solution: '遮阴，添加铁元素' },
      { symptom: '根系腐烂', cause: '水质变差或水位过高', solution: '换水，降低水位' }
    ],
    tips: ['水培土培皆可', '寓意吉祥', '注意水质清洁']
  },
  {
    id: 'hydroponic-pothos',
    name: '水培绿萝',
    alias: '水养黄金葛',
    category: 'hydroponic',
    categoryName: '水培植物',
    difficulty: 1,
    origin: '所罗门群岛',
    description: '绿萝水培清洁美观，根系洁白，是办公室常见的桌面绿植。',
    imageUrl: 'https://images.unsplash.com/photo-1596724857861-d277d5e25133?w=400',
    careGuide: {
      light: '明亮的散射光',
      temperature: '15-30°C',
      humidity: '60-80%',
      wateringFrequency: 7,
      wateringAmount: '保持水位，每周换水',
      fertilizingFrequency: 30,
      fertilizingType: '水培营养液',
      soilType: '水培',
      pruning: '修剪过长根系和枝条'
    },
    commonIssues: [
      { symptom: '叶片发黄', cause: '光照过强或缺肥', solution: '调整光照，添加营养' },
      { symptom: '根系腐烂', cause: '水质问题', solution: '及时换水，清洗根系' }
    ],
    tips: ['水培更清洁', '根系美观', '定期换水']
  },

  // 空气净化植物
  {
    id: 'peace-lily',
    name: '白掌',
    alias: '一帆风顺、白鹤芋',
    category: 'air-purifying',
    categoryName: '空气净化',
    difficulty: 2,
    origin: '哥伦比亚',
    description: '白掌叶片翠绿，佛焰苞白色，寓意一帆风顺，能吸收甲醛等有害气体。',
    imageUrl: 'https://images.unsplash.com/photo-1593691509543-c55ce32e0454?w=400',
    careGuide: {
      light: '半阴或散射光',
      temperature: '18-28°C',
      humidity: '60-80%',
      wateringFrequency: 4,
      wateringAmount: '保持土壤湿润',
      fertilizingFrequency: 20,
      fertilizingType: '稀释液肥',
      soilType: '疏松透气的土壤',
      pruning: '修剪黄叶，花后修剪'
    },
    commonIssues: [
      { symptom: '叶片下垂', cause: '缺水', solution: '及时浇水' },
      { symptom: '不开花', cause: '光照不足或氮肥过多', solution: '增加散射光，增施磷肥' }
    ],
    tips: ['缺水会倒伏', '吸收甲醛', '寓意吉祥']
  },
  {
    id: 'ivy',
    name: '常春藤',
    alias: '洋常春藤',
    category: 'air-purifying',
    categoryName: '空气净化',
    difficulty: 2,
    origin: '欧洲',
    description: '常春藤四季常青，攀援生长，能有效吸收尼古丁等有害物质。',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
    careGuide: {
      light: '明亮的散射光',
      temperature: '15-25°C',
      humidity: '60-80%',
      wateringFrequency: 4,
      wateringAmount: '见干见湿',
      fertilizingFrequency: 20,
      fertilizingType: '复合肥',
      soilType: '疏松肥沃的土壤',
      pruning: '修剪整形，促进分枝'
    },
    commonIssues: [
      { symptom: '叶片干枯', cause: '空气干燥或强光', solution: '增加喷雾，遮阴' },
      { symptom: '红蜘蛛', cause: '干燥闷热', solution: '增加湿度，喷药' }
    ],
    tips: ['净化空气能力强', '可垂吊', '吸收尼古丁']
  },
  {
    id: 'dracaena',
    name: '龙血树',
    alias: '龙须树',
    category: 'air-purifying',
    categoryName: '空气净化',
    difficulty: 2,
    origin: '非洲',
    description: '龙血树株形优美，叶片剑形，能吸收二甲苯、甲醛等有害气体。',
    imageUrl: 'https://images.unsplash.com/photo-1599598425947-530d38a69b24?w=400',
    careGuide: {
      light: '明亮的散射光',
      temperature: '20-30°C，冬季不低于10°C',
      humidity: '50-70%',
      wateringFrequency: 7,
      wateringAmount: '干透浇透',
      fertilizingFrequency: 30,
      fertilizingType: '复合肥',
      soilType: '疏松的沙质壤土',
      pruning: '修剪老叶，保持株型'
    },
    commonIssues: [
      { symptom: '叶尖干枯', cause: '空气干燥或水质问题', solution: '增加喷雾，使用软水' },
      { symptom: '叶片发黄', cause: '浇水过多', solution: '控水，检查根系' }
    ],
    tips: ['株形优美', '净化空气', '极耐阴']
  }
];

// 根据ID获取植物
export const getPlantById = (id: string): Plant | undefined => {
  return plants.find(plant => plant.id === id);
};

// 根据分类获取植物
export const getPlantsByCategory = (category: string): Plant[] => {
  return plants.filter(plant => plant.category === category);
};

// 搜索植物
export const searchPlants = (keyword: string): Plant[] => {
  return plants.filter(plant =>
    plant.name.includes(keyword) ||
    plant.alias.includes(keyword) ||
    plant.description.includes(keyword)
  );
};

// 获取推荐植物（新手友好）
export const getRecommendedPlants = (): Plant[] => {
  return plants.filter(plant => plant.difficulty <= 2).slice(0, 6);
};
