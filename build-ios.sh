#!/bin/bash

# 养花助手 iOS APP 构建脚本
# 使用方法: ./build-ios.sh [debug|release]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}    养花助手 iOS APP 构建脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查是否在macOS上运行
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}错误: iOS构建只能在macOS上运行${NC}"
    echo "请在Mac电脑上运行此脚本"
    exit 1
fi

# 检查参数
BUILD_TYPE=${1:-debug}
if [[ "$BUILD_TYPE" != "debug" && "$BUILD_TYPE" != "release" ]]; then
    echo -e "${RED}错误: 构建类型必须是 'debug' 或 'release'${NC}"
    echo "用法: ./build-ios.sh [debug|release]"
    exit 1
fi

# 检查Xcode
echo -e "${YELLOW}[1/6] 检查Xcode...${NC}"
if ! command -v xcodebuild &> /dev/null; then
    echo -e "${RED}错误: 未找到Xcode，请从App Store安装${NC}"
    exit 1
fi
XCODE_VERSION=$(xcodebuild -version | head -n 1)
echo -e "${GREEN}✓ Xcode版本: $XCODE_VERSION${NC}"

# 检查Node.js
echo -e "${YELLOW}[2/6] 检查Node.js...${NC}"
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
npx cap sync ios
echo -e "${GREEN}✓ Capacitor同步完成${NC}"

# 构建iOS App
echo -e "${YELLOW}[6/6] 构建iOS APP...${NC}"
cd ios/App

if [[ "$BUILD_TYPE" == "debug" ]]; then
    # 构建模拟器版本
    xcodebuild -workspace App.xcworkspace \
        -scheme App \
        -destination 'platform=iOS Simulator,name=iPhone 15' \
        -configuration Debug \
        build

    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}    构建成功!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "可以在Xcode中打开项目运行到模拟器或真机"
    echo -e "运行: ${YELLOW}npx cap open ios${NC}"
else
    # 构建Release版本（需要签名配置）
    xcodebuild -workspace App.xcworkspace \
        -scheme App \
        -destination 'generic/platform=iOS' \
        -configuration Release \
        build \
        CODE_SIGN_IDENTITY="" \
        CODE_SIGNING_REQUIRED=NO

    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}    构建成功!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "注意: Release版本需要配置签名才能在真机运行"
    echo -e "请在Xcode中配置开发者账号和签名证书"
fi
