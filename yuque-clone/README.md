# 语雀风格私有知识库 (Yuque-Clone)

一个私有部署的、UI 高度还原语雀的现代知识库系统，专为小团队设计。

## 🚀 技术栈

- **前端**: React 18 + Vite + TailwindCSS + TipTap (富文本编辑器)
- **后端**: NestJS (Node.js) + TypeScript
- **数据库**: PostgreSQL
- **部署**: Docker Compose

## 📦 快速开始

### 1. 环境要求
- Docker & Docker Compose
- Node.js 18+ (仅用于本地开发，生产环境使用 Docker)

### 2. 一键启动 (Docker)

```bash
# 克隆项目后进入目录
cd yuque-clone

# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

服务启动后：
- **前端**: http://localhost:3000
- **后端 API**: http://localhost:3001/api
- **数据库**: localhost:5432

### 3. 初始管理员账号

首次启动时，系统会自动创建一个默认管理员账号：
- **邮箱**: `admin@yuque-clone.local`
- **密码**: `admin123`

> ⚠️ 请在首次登录后立即修改密码！

## 🏗️ 项目结构

```
yuque-clone/
├── backend/                 # NestJS 后端
│   ├── src/
│   │   ├── auth/           # 认证模块
│   │   ├── users/          # 用户模块
│   │   ├── spaces/         # 团队空间模块
│   │   ├── docs/           # 文档模块
│   │   ├── attachments/    # 附件模块
│   │   └── main.ts         # 入口文件
│   ├── package.json
│   └── Dockerfile
├── frontend/               # React 前端
│   ├── src/
│   │   ├── components/     # UI 组件 (目录树、编辑器等)
│   │   ├── pages/          # 页面 (登录、文档页等)
│   │   ├── hooks/          # 自定义 Hooks
│   │   └── App.tsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml      # Docker 编排文件
└── README.md
```

## 🔧 本地开发

### 后端开发
```bash
cd backend
npm install
npm run start:dev
```

### 前端开发
```bash
cd frontend
npm install
npm run dev
```

## 📝 核心功能

- ✅ 用户注册/登录 (JWT 认证)
- ✅ 团队空间管理 (邀请成员)
- ✅ 多级目录树 (无限嵌套)
- ✅ 富文本编辑器 (TipTap, 支持 Markdown)
- ✅ 文档版本历史
- ✅ 全文搜索
- ✅ 文档导出 (PDF/Markdown)
- ✅ 访问统计

## 🎨 UI 设计说明

本系统 100% 还原语雀的视觉风格：
- 顶部导航栏：空间名称、全局搜索、用户头像
- 左侧边栏：可折叠目录树，支持拖拽排序
- 中间区域：文档标题、所见即所得编辑器
- 右侧大纲：基于标题自动生成
- 配色：白色背景 + 精致阴影 + Inter/Noto Sans 字体

## 📄 License

MIT License
