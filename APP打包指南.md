# 养花助手 APP 打包指南

## 项目说明

本项目已配置为使用 **Capacitor** 打包成原生Android APP。Capacitor将React Web应用封装为原生应用，可以：
- 生成Android APK文件
- 发布到Google Play商店
- 安装到手机使用

## 项目结构

```
plant-care-assistant/
├── android/              # Android原生项目
│   ├── app/              # 应用代码
│   ├── gradlew           # Gradle构建脚本
│   └── build.gradle      # 构建配置
├── dist/                 # Web构建输出
├── capacitor.config.ts   # Capacitor配置
└── ...
```

## 方法一：本地构建（需要Android开发环境）

### 前置要求

1. **Node.js 18+** (已安装)
2. **Java JDK 17** 
3. **Android Studio** 或 **Android SDK Command Line Tools**
4. **Gradle** (Android Studio自带)

### 安装步骤

#### 1. 安装Java JDK 17

**macOS:**
```bash
brew install openjdk@17
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

**Windows:**
- 下载 [Oracle JDK 17](https://www.oracle.com/java/technologies/downloads/#java17) 或 [OpenJDK](https://adoptium.net/)
- 安装并设置环境变量

#### 2. 安装Android Studio

下载地址：https://developer.android.com/studio

安装后打开Android Studio，安装：
- Android SDK
- Android SDK Build-Tools
- Android Emulator (可选)

#### 3. 设置环境变量

**macOS/Linux:**
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk  # 根据实际路径调整
export ANDROID_HOME=$HOME/Library/Android/sdk   # macOS
export ANDROID_HOME=$HOME/Android/Sdk           # Linux
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

**Windows:**
在系统设置中添加环境变量：
- `JAVA_HOME` = `C:\Program Files\Java\jdk-17`
- `ANDROID_HOME` = `C:\Users\你的用户名\AppData\Local\Android\Sdk`

#### 4. 构建APK

```bash
# 1. 进入项目目录
cd plant-care-assistant

# 2. 确保web资源已构建
npm run build

# 3. 同步资源到Android项目
npx cap sync android

# 4. 构建Debug APK
cd android
./gradlew assembleDebug

# 5. 构建Release APK
./gradlew assembleRelease
```

构建完成后，APK文件位于：
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### 安装到手机

```bash
# 连接手机，启用USB调试
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

或通过Android Studio打开`android`文件夹，点击运行按钮。

---

## 方法二：使用Android Studio（推荐）

### 步骤

1. **打开项目**
   ```bash
   npx cap open android
   ```

2. **在Android Studio中**
   - 等待Gradle同步完成
   - 连接手机或启动模拟器
   - 点击运行按钮（绿色三角形）

3. **生成签名APK**
   - Build → Generate Signed Bundle/APK
   - 选择APK
   - 创建或选择密钥库
   - 选择release构建

---

## 方法三：GitHub Actions自动构建（最简单）

我已配置了GitHub Actions工作流，可以自动构建APK。

### 使用步骤

1. **创建GitHub仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/plant-care-assistant.git
   git push -u origin main
   ```

2. **启用GitHub Actions**
   - 访问GitHub仓库
   - 点击Actions选项卡
   - 启用工作流

3. **触发构建**
   - 每次push代码会自动触发构建
   - 或手动触发：Actions → Build Android APK → Run workflow

4. **下载APK**
   - 构建完成后，在Actions页面下载Artifacts
   - 文件名为 `app-debug.apk`

---

## 方法四：Docker构建（无需安装Android Studio）

### 使用Docker构建APK

```bash
# 1. 进入项目目录
cd plant-care-assistant

# 2. 使用Docker构建
docker run --rm \
  -v "$PWD":/app \
  -w /app \
  -e JAVA_HOME=/usr/lib/jvm/java-17-openjdk \
  reactnativecommunity/react-native-android \
  bash -c "cd android && ./gradlew assembleDebug"
```

---

## 签名发布（Release版本）

发布到应用商店需要签名APK。

### 创建密钥库

```bash
keytool -genkey -v -keystore plantcare-release-key.keystore -alias plantcare -keyalg RSA -keysize 2048 -validity 10000
```

### 配置签名

编辑 `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file("plantcare-release-key.keystore")
            storePassword "你的密码"
            keyAlias "plantcare"
            keyPassword "你的密码"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 构建签名APK

```bash
cd android
./gradlew assembleRelease
```

APK位置：`android/app/build/outputs/apk/release/app-release.apk`

---

## 应用信息

| 属性 | 值 |
|-----|-----|
| 应用名称 | 养花助手 |
| 包名 | com.plantcare.app |
| 版本 | 1.0.0 |
| 最低Android版本 | Android 5.0 (API 21) |
| 目标Android版本 | Android 14 (API 34) |

---

## 常见问题

### 1. JAVA_HOME错误

**错误：** `JAVA_HOME is set to an invalid directory`

**解决：**
```bash
# 查找Java安装路径
/usr/libexec/java_home -V  # macOS
update-alternatives --config java  # Linux

# 设置环境变量
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
```

### 2. Gradle下载慢

**解决：** 配置国内镜像

编辑 `android/build.gradle`:
```gradle
buildscript {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        google()
        mavenCentral()
    }
}
```

### 3. 构建失败：内存不足

**解决：**
```bash
export GRADLE_OPTS="-Xmx4g -XX:MaxMetaspaceSize=512m"
```

### 4. 应用安装后白屏

**解决：**
- 确保 `npm run build` 成功执行
- 运行 `npx cap sync android` 同步资源
- 检查 `dist/index.html` 是否存在

---

## 发布到应用商店

### Google Play商店

1. 注册Google Play开发者账号（$25）
2. 创建新应用
3. 上传签名APK或AAB
4. 填写应用信息
5. 提交审核

### 国内应用商店

- 华为应用市场
- 小米应用商店
- 应用宝
- OPPO/vivo应用商店

每个商店需要注册开发者账号并提交审核。

---

## 下一步

1. ✅ 已完成：Web应用开发
2. ✅ 已完成：Capacitor配置
3. ⏳ 待完成：构建APK（选择上方任一方法）
4. ⏳ 待完成：测试安装
5. ⏳ 待完成：发布到应用商店

---

## 相关文档

- [Capacitor文档](https://capacitorjs.com/docs)
- [Android开发者指南](https://developer.android.com/guide)
- [React文档](https://react.dev/)

---

**需要帮助？** 请查看GitHub Issues或联系开发者。
