# 养花助手 APP

一款智能植物养护应用，帮助您轻松管理家庭绿植，结合天气数据提供个性化养护建议。

## 功能特性

### 🌿 植物管理
- 添加和管理您的植物收藏
- 记录浇水、施肥历史
- 追踪植物健康状态
- 支持50+种常见家庭植物

### 🌤️ 智能天气集成
- 实时天气数据显示
- 基于天气的养护建议
- 极端天气预警提醒
  - 大风预警：提醒将花盆移至避风处
  - 暴雨预警：提醒防止积水烂根
  - 高温预警：提醒增加浇水频率
  - 寒潮预警：提醒将畏寒植物移至室内

### 🔔 智能提醒
- 浇水提醒（根据植物种类和天气智能调整）
- 施肥提醒
- 天气灾害预警
- 养护日历

### 📚 植物知识库
- 50+种常见家庭植物详细信息
- 养护指南（光照、温度、湿度、浇水、施肥）
- 常见问题诊断
- 养护小贴士

### 📱 PWA支持
- 可安装到手机主屏幕
- 离线访问
- 响应式设计，适配各种设备

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI组件**: Lucide React Icons
- **状态管理**: LocalStorage
- **PWA**: Web App Manifest + Service Worker
- **移动打包**: Capacitor (Android APK / iOS APP)

## 项目结构

```
plant-care-assistant/
├── src/
│   ├── components/     # 可复用组件
│   │   ├── PlantCard.tsx      # 植物卡片
│   │   ├── WeatherCard.tsx    # 天气卡片
│   │   ├── ReminderList.tsx   # 提醒列表
│   │   └── BottomNav.tsx      # 底部导航
│   ├── pages/          # 页面组件
│   │   ├── HomePage.tsx       # 首页
│   │   ├── GardenPage.tsx     # 我的花园
│   │   ├── KnowledgePage.tsx  # 知识库
│   │   └── ProfilePage.tsx    # 个人中心
│   ├── data/           # 数据文件
│   │   ├── plants.ts          # 植物数据库
│   │   └── weather.ts         # 天气数据
│   ├── utils/          # 工具函数
│   │   └── storage.ts         # 本地存储
│   ├── types/          # TypeScript类型
│   │   └── index.ts
│   ├── styles/         # 样式文件
│   │   └── index.css
│   ├── App.tsx         # 主应用组件
│   └── main.tsx        # 应用入口
├── public/             # 静态资源
│   ├── manifest.json   # PWA配置
│   └── leaf.svg        # 应用图标
├── dist/               # 构建输出
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 快速开始

### 方式一：Web应用（浏览器使用）

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build
```

### 方式二：Android APP（安装到手机）

#### 方法1：GitHub Actions自动构建（最简单）

1. 将代码推送到GitHub仓库
2. 访问Actions页面，等待自动构建
3. 下载构建好的APK文件
4. 安装到手机

详细步骤见 [`获取移动应用指南.md`](./获取移动应用指南.md)

#### 方法2：本地构建

```bash
# 1. 安装依赖
npm install

# 2. 构建Web资源
npm run build

# 3. 同步到Android项目
npx cap sync android

# 4. 构建APK（需要Java和Android SDK）
cd android
./gradlew assembleDebug

# 5. 安装到手机
adb install app/build/outputs/apk/debug/app-debug.apk
```

详细步骤见 [`APP打包指南.md`](./APP打包指南.md)

### 方式三：iOS APP（安装到iPhone）

**注意：** iOS开发需要Mac电脑

#### 方法1：使用Xcode（推荐）

```bash
# 1. 安装依赖
npm install

# 2. 构建Web资源
npm run build

# 3. 同步到iOS项目
npx cap sync ios

# 4. 打开Xcode
npx cap open ios

# 5. 在Xcode中选择设备并运行
```

#### 方法2：本地命令行构建

```bash
./build-ios.sh debug
```

详细步骤见 [`iOS打包指南.md`](./iOS打包指南.md)

## 部署

构建完成后，`dist`文件夹包含所有静态文件，可以部署到任何静态网站托管服务：

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- 阿里云OSS/腾讯云COS

## 植物数据库

目前收录的植物类别：

| 类别 | 代表植物 |
|------|----------|
| 观叶植物 | 绿萝、吊兰、虎皮兰、龟背竹、橡皮树、发财树 |
| 开花植物 | 茉莉花、栀子花、月季、长寿花、蝴蝶兰 |
| 多肉植物 | 芦荟、仙人掌、石莲花 |
| 香草植物 | 薄荷、罗勒、迷迭香、薰衣草 |
| 水培植物 | 富贵竹、水培绿萝 |
| 空气净化 | 白掌、常春藤、龙血树 |

## 天气数据

应用使用模拟天气数据，展示以下功能：

- 实时温度、湿度、天气状况
- 7天天气预报
- 天气预警（大风、暴雨、高温、寒潮）
- 基于天气的养护建议

## 浏览器支持

- Chrome/Edge (推荐)
- Safari
- Firefox
- 移动端浏览器

## 使用说明

1. **首次使用**: 打开应用后，欢迎页面会引导您开始使用
2. **添加植物**: 点击"花园"页面右上角的"+"按钮
3. **查看天气**: 首页显示当前城市天气和养护建议
4. **浇水提醒**: 应用会根据植物种类和天气自动提醒浇水
5. **学习知识**: 在"知识库"页面浏览各种植物的养护知识

## 未来规划

- [ ] 接入真实天气API
- [ ] 添加植物识别功能（拍照识别）
- [ ] 支持用户上传植物照片
- [ ] 添加社区功能（分享养护经验）
- [ ] 推送通知支持
- [ ] 数据云同步
- [ ] 更多植物种类

## 许可证

MIT License

## 致谢

- 植物数据来源：公开园艺资料整理
- 图标：Lucide Icons
- 图片：Unsplash

---

祝您养花愉快！🌱
