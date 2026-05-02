#!/bin/bash

# 养花助手 APP 构建脚本
# 使用方法: ./build-app.sh [debug|release]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}    养花助手 APP 构建脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查参数
BUILD_TYPE=${1:-debug}
if [[ "$BUILD_TYPE" != "debug" && "$BUILD_TYPE" != "release" ]]; then
    echo -e "${RED}错误: 构建类型必须是 'debug' 或 'release'${NC}"
    echo "用法: ./build-app.sh [debug|release]"
    exit 1
fi

# 检查Node.js
echo -e "${YELLOW}[1/6] 检查Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未找到Node.js，请先安装Node.js 18+${NC}"
    exit 1
fi
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}错误: Node.js版本过低，需要18+，当前版本: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js版本: $(node -v)${NC}"

# 检查Java
echo -e "${YELLOW}[2/6] 检查Java...${NC}"
if ! command -v java &> /dev/null; then
    echo -e "${RED}错误: 未找到Java，请先安装Java JDK 17${NC}"
    echo "macOS: brew install openjdk@17"
    echo "Ubuntu: sudo apt install openjdk-17-jdk"
    exit 1
fi
echo -e "${GREEN}✓ Java版本: $(java -version 2>&1 | head -n 1)${NC}"

# 安装依赖
echo -e "${YELLOW}[3/6] 安装依赖...${NC}"
npm install
echo -e "${GREEN}✓ 依赖安装完成${NC}"

# 构建Web资源
echo -e "${YELLOW}[4/6] 构建Web资源...${NC}"
npm run build
echo -e "${GREEN}✓ Web资源构建完成${NC}"

# 同步Capacitor
echo -e "${YELLOW}[5/6] 同步Capacitor...${NC}"
npx cap sync android
echo -e "${GREEN}✓ Capacitor同步完成${NC}"

# 构建APK
echo -e "${YELLOW}[6/6] 构建${BUILD_TYPE} APK...${NC}"
cd android

if [[ "$BUILD_TYPE" == "debug" ]]; then
    ./gradlew assembleDebug
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
else
    ./gradlew assembleRelease
    APK_PATH="app/build/outputs/apk/release/app-release-unsigned.apk"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}    构建成功!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "APK文件位置: ${YELLOW}android/${APK_PATH}${NC}"
echo ""
echo -e "安装到手机: ${YELLOW}adb install android/${APK_PATH}${NC}"
echo ""

# 显示文件信息
if [ -f "$APK_PATH" ]; then
    ls -lh "$APK_PATH"
fi
