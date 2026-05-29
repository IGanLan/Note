FROM node:18-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产镜像
FROM node:18-alpine

WORKDIR /app

# 复制 package 文件并安装生产依赖
COPY package*.json ./
RUN npm ci --only=production

# 从 builder 复制构建产物
COPY --from=builder /app/dist ./dist

# 创建上传目录
RUN mkdir -p /app/uploads

# 暴露端口
EXPOSE 3001

# 启动命令
CMD ["node", "dist/main"]
