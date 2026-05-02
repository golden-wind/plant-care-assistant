# 养花助手 iOS APP 打包指南

## 概述

养花助手iOS版本使用 **Capacitor** 将React Web应用打包为原生iOS应用。

## 前置要求

### 必需
- **macOS** (iOS开发只能在Mac上进行)
- **Xcode** 14+ (从App Store安装)
- **Node.js** 18+
- **CocoaPods** (iOS依赖管理)

### 可选
- **Apple Developer账号** (如需在真机测试或发布到App Store)

## 安装Xcode

### 从App Store安装
1. 打开App Store
2. 搜索 "Xcode"
3. 点击安装（约10GB，需要耐心等待）

### 安装命令行工具
```bash
xcode-select --install
```

### 同意许可协议
```bash
sudo xcodebuild -license accept
```

## 安装CocoaPods

```bash
sudo gem install cocoapods
```

如果gem安装失败，可以尝试：
```bash
brew install cocoapods
```

## 快速开始

### 方法一：使用Xcode（推荐）

1. **进入项目目录**
   ```bash
   cd plant-care-assistant
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **构建Web资源**
   ```bash
   npm run build
   ```

4. **同步iOS项目**
   ```bash
   npx cap sync ios
   ```

5. **打开Xcode**
   ```bash
   npx cap open ios
   ```

6. **在Xcode中运行**
   - 选择目标设备（模拟器或真机）
   - 点击运行按钮（▶️）

### 方法二：使用命令行构建

```bash
# 使用一键构建脚本
./build-ios.sh debug

# 或手动构建
cd ios/App
xcodebuild -workspace App.xcworkspace \
  -scheme App \
  -destination 'platform=iOS Simulator,name=iPhone 15' \
  -configuration Debug \
  build
```

## 项目结构

```
ios/
├── App/
│   ├── App/
│   │   ├── AppDelegate.swift      # 应用代理
│   │   ├── Info.plist             # 应用配置
│   │   ├── public/                # Web资源
│   │   └── Assets.xcassets/       # 图标和启动图
│   ├── App.xcodeproj/             # Xcode项目
│   ├── App.xcworkspace/           # Xcode工作区
│   └── Podfile                    # CocoaPods配置
└── capacitor-cordova-ios-plugins/ # Cordova插件
```

## 配置应用

### 1. 应用图标

应用图标需要多种尺寸，存放在 `ios/App/App/Assets.xcassets/AppIcon.appiconset/`。

已自动生成默认图标，如需自定义：

1. 准备1024x1024像素的图标
2. 使用 [App Icon Generator](https://appicon.co/) 生成所有尺寸
3. 替换 `Assets.xcassets/AppIcon.appiconset/` 中的文件

### 2. 启动图

启动图配置在 `Assets.xcassets/Splash.imageset/`。

### 3. 应用信息

编辑 `ios/App/App/Info.plist`：

```xml
<key>CFBundleDisplayName</key>
<string>养花助手</string>
<key>CFBundleIdentifier</key>
<string>com.plantcare.app</string>
<key>CFBundleVersion</key>
<string>1.0.0</string>
```

或在Xcode中直接编辑：
- 选择项目 → Target → General → Identity

## 真机测试

### 步骤

1. **连接iPhone到Mac**

2. **在Xcode中选择设备**
   - 点击设备选择器
   - 选择连接的iPhone

3. **配置签名**
   - 选择项目 → Signing & Capabilities
   - 勾选 "Automatically manage signing"
   - 选择你的Apple ID
   - 点击 "Register Device"

4. **信任开发者**
   - 在iPhone上：设置 → 通用 → VPN与设备管理
   - 信任你的开发者账号

5. **运行应用**
   - 点击运行按钮

### 常见问题

**问题："Unable to install" 或 "Device locked"**
- 确保iPhone已解锁
- 信任开发者证书

**问题："Signing certificate expired"**
- 在Xcode中重新选择签名证书
- 或：偏好设置 → 账户 → 刷新

## 发布到App Store

### 1. 注册Apple Developer账号

- 访问 [Apple Developer](https://developer.apple.com/)
- 年费：$99/年

### 2. 配置发布签名

1. 在Xcode中选择项目
2. 选择 Target → Signing & Capabilities
3. 选择你的开发者团队
4. Bundle Identifier 必须唯一

### 3. 构建Release版本

```bash
# 在Xcode中
# Product → Archive

# 或使用命令行
xcodebuild -workspace App.xcworkspace \
  -scheme App \
  -destination 'generic/platform=iOS' \
  -configuration Release \
  archive \
  -archivePath build/App.xcarchive
```

### 4. 上传到App Store Connect

1. **使用Xcode**
   - Window → Organizer
   - 选择Archive → Distribute App
   - 选择 App Store Connect

2. **或使用Transporter应用**
   - 导出IPA文件
   - 使用Transporter上传

### 5. 配置App Store信息

1. 访问 [App Store Connect](https://appstoreconnect.apple.com/)
2. 创建新应用
3. 填写应用信息：
   - 名称：养花助手
   - 副标题：智能植物养护助手
   - 类别：生活/工具
   - 描述：详细介绍应用功能
   - 截图：5.5英寸和6.5英寸iPhone截图
   - 关键词：植物,养花,园艺,浇水提醒,天气

4. 提交审核

## 自动化构建

### GitHub Actions

已配置GitHub Actions自动构建iOS：

```yaml
name: Build iOS
on: [push]
jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npx cap sync ios
      - run: |
          cd ios/App
          xcodebuild -workspace App.xcworkspace \
            -scheme App \
            -destination 'platform=iOS Simulator,name=iPhone 15' \
            build
```

**注意：** GitHub Actions只能构建模拟器版本，真机版本需要签名证书。

## 调试

### Safari开发者工具

1. **启用Web检查器**
   - iPhone：设置 → Safari → 高级 → Web检查器

2. **连接iPhone到Mac**

3. **在Safari中调试**
   - Mac Safari → 开发 → 选择你的iPhone → 选择应用
   - 可以查看控制台、网络请求、DOM等

### Xcode调试

- 断点调试
- 查看日志：Window → Devices and Simulators
- 性能分析：Product → Profile

## 常见问题

### Q: 构建失败 "No such module 'Capacitor'"

**解决：**
```bash
cd ios/App
pod install
# 然后重新打开Xcode工作区（不是项目）
open App.xcworkspace
```

### Q: 应用启动后白屏

**解决：**
1. 确保 `npm run build` 成功
2. 运行 `npx cap sync ios`
3. 在Xcode中 Product → Clean Build Folder
4. 重新构建

### Q: 如何更新应用？

1. 修改Web代码
2. `npm run build`
3. `npx cap sync ios`
4. 在Xcode中重新运行

### Q: 支持哪些iOS版本？

默认支持iOS 13+。

如需修改，编辑 `ios/App/Podfile`：
```ruby
platform :ios, '13.0'
```

### Q: 如何添加原生插件？

```bash
npm install @capacitor/camera
npx cap sync ios
```

然后在Xcode中重新构建。

## 性能优化

### 1. 启用WKWebView优化

已在Capacitor中默认启用。

### 2. 减少启动时间

- 优化首屏加载
- 使用代码分割
- 压缩资源文件

### 3. 内存优化

- 及时释放不用的资源
- 避免内存泄漏
- 使用 Instruments 检测

## 相关文档

- [Capacitor iOS文档](https://capacitorjs.com/docs/ios)
- [Xcode文档](https://developer.apple.com/documentation/xcode)
- [App Store审核指南](https://developer.apple.com/app-store/review/guidelines/)
- [iOS人机界面指南](https://developer.apple.com/design/human-interface-guidelines/ios/overview/themes/)

---

**注意：** iOS开发必须在macOS上进行，无法在Windows或Linux上构建iOS应用。

祝你开发顺利！🌱
