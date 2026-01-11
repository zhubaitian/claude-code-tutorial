# 项目架构：claude-code-tutorial

## 概述
- **描述**: Vue.js Hello World教程，使用Vue单文件组件
- **技术栈**: Vue.js 3 + Vite + Vue Router
- **项目类型**: 单页面应用(SPA)使用Vue 3组合式API
- **中文界面**: 中文语言Todo应用，展示从CDN-based到SFC-based Vue开发的演变

## 目录结构

```
/
├── src/                    # 源代码（现代SFC应用）
│   ├── App.vue            # 根应用组件（包含路由视图）
│   ├── main.js            # 应用入口点（挂载Vue应用）
│   ├── assets/
│   │   └── global.css     # 全局CSS样式
│   ├── components/        # 可复用Vue组件
│   │   ├── Header.vue     # 导航头部组件
│   │   └── CreateButton.vue # 通用按钮组件（primary/danger/success变体）
│   ├── views/             # 页面组件（路由组件）
│   │   ├── Home.vue       # 首页Todo应用
│   │   └── About.vue      # 关于页面（展示技术栈信息）
│   └── router/            # Vue Router配置
│       └── index.js       # 路由定义（Home和About路由）
├── backup/                # 传统CDN-based Vue应用（备份）
│   ├── app.js            # 原始Vue 3组合式API代码（CDN版本）
│   ├── index.html        # 原始HTML入口
│   └── style.css         # 原始样式
├── dist/                  # 生产构建输出（生成）
├── index.html            # 主HTML入口点（现代应用）
├── vite.config.js        # Vite配置（端口8082，自动打开浏览器）
├── package.json          # 项目配置和依赖
├── CLAUDE.md            # Claude Code项目指导文档
└── README.md            # 项目说明文档
```

## 架构组件

### 入口点
- `src/main.js` - 应用入口点，初始化Vue应用，加载全局CSS和Font Awesome CDN，挂载到`#app`元素
- `index.html` - HTML模板，包含`#app`挂载点和Vite脚本注入

### 核心应用结构
- **根组件**: `src/App.vue` - 主应用布局，包含`<Header>`组件和`<router-view>`
- **路由系统**: `src/router/index.js` - Vue Router 4配置，定义`/`（Home）和`/about`（About）路由
- **页面组件**:
  - `src/views/Home.vue` - Todo应用主界面，完整CRUD操作（添加、编辑、删除、标记完成）
  - `src/views/About.vue` - 关于页面，展示项目技术栈和架构信息
- **可复用组件**:
  - `src/components/Header.vue` - 导航头部，包含Logo和路由链接
  - `src/components/CreateButton.vue` - 通用按钮组件，支持primary/danger/success三种变体

### 配置和资源
- `package.json` - 项目元数据、依赖项和脚本命令
- `vite.config.js` - Vite构建配置（Vue插件、开发服务器端口8082）
- `src/assets/global.css` - 全局CSS样式定义
- `CLAUDE.md` - 详细的Claude Code项目指导，包含架构说明和开发指南

## 开发工作流

### 可用脚本
```bash
npm run dev    # 启动开发服务器（端口8082，自动打开浏览器）
npm run build  # 生产环境构建（输出到dist/目录）
npm run preview # 本地预览生产构建
```

### 开发环境配置
- **端口**: 8082（在vite.config.js中配置）
- **热模块替换(HMR)**: 启用，`.vue`文件修改自动刷新
- **自动打开浏览器**: 开发服务器启动时自动打开
- **ES模块**: `"type": "module"`支持原生ES模块

### 构建过程
- **构建工具**: Vite 5.0.0
- **输出目录**: `dist/`
- **优化**: Vite内置的生产优化（代码分割、压缩等）
- **预览**: 使用`npm run preview`本地测试生产构建

## 技术架构详情

### Vue.js实现
- **Vue版本**: 3.4.0
- **API风格**: 组合式API(Composition API) with `<script setup>`语法
- **状态管理**: 本地响应式状态使用`ref()`和`computed()`，无外部状态管理库
- **组件通信**: Props/Events模式，组件间解耦

### 路由架构
- **路由库**: Vue Router 4.6.4
- **路由模式**: HTML5 History模式（createWebHistory）
- **路由守卫**: 当前未配置，可扩展添加
- **懒加载**: 当前未使用，但支持路由级别代码分割

### 样式架构
- **组件样式**: `<style scoped>`用于组件作用域样式
- **全局样式**: `src/assets/global.css`用于全局样式定义
- **CSS特性**: 现代CSS（Flexbox、CSS Grid、CSS变量、渐变）
- **图标库**: Font Awesome 6.4.0通过CDN加载

### 组件设计模式
- **单一职责**: 每个组件有明确职责（Header负责导航，CreateButton负责按钮UI）
- **可复用性**: CreateButton组件设计为通用按钮，支持多种变体
- **组合式API**: 使用`<script setup>`语法组织组件逻辑

## 依赖项

### 运行时依赖
- `vue` (^3.4.0) - Vue.js 3框架核心
- `vue-router` (^4.6.4) - 客户端路由管理

### 开发依赖
- `@vitejs/plugin-vue` (^5.0.0) - Vite的Vue插件，支持SFC
- `vite` (^5.0.0) - 现代化前端构建工具和开发服务器

### 外部依赖（CDN）
- **Font Awesome 6.4.0**: 图标库，通过CDN在`main.js`中动态加载

## 项目演变和对比

### 现代架构（当前）
- **构建工具**: Vite 5.0.0
- **组件格式**: 单文件组件(SFC) `.vue`文件
- **依赖管理**: npm包管理
- **开发体验**: 热模块替换(HMR)，快速刷新
- **代码组织**: 模块化，清晰的目录结构

### 传统架构（backup/目录）
- **构建工具**: 无（直接CDN引入）
- **组件格式**: 分离的HTML/JS/CSS文件
- **依赖管理**: CDN链接
- **开发体验**: 手动刷新
- **代码组织**: 扁平结构，逻辑混合

## 扩展和定制建议

### 添加新功能
1. **新页面**: 在`src/views/`创建新`.vue`文件，在`router/index.js`添加路由
2. **新组件**: 在`src/components/`创建可复用组件
3. **API集成**: 创建`src/services/`目录用于API调用
4. **状态管理**: 如需全局状态，可添加Pinia库

### 测试配置
当前项目未配置测试框架，建议添加：
- `npm install -D vitest @vue/test-utils` 用于单元测试
- 配置`vitest.config.js`进行Vue组件测试
- 创建`__tests__`目录存放测试文件

### 部署
- **静态托管**: 适合Netlify、Vercel、GitHub Pages
- **传统服务器**: 将`dist/`目录内容部署到Web服务器
- **Docker容器化**: 可添加Dockerfile进行容器部署

## 架构图总结

这是一个典型的现代Vue.js 3单页面应用架构：
1. **入口层**: `main.js` + `index.html`
2. **路由层**: Vue Router管理页面导航
3. **视图层**: 页面组件（Home/About）处理业务逻辑
4. **组件层**: 可复用UI组件（Header/CreateButton）
5. **样式层**: 作用域组件样式 + 全局样式
6. **构建层**: Vite处理开发和生产构建

项目展示了从传统CDN-based Vue到现代SFC-based Vue的完整迁移路径，是学习Vue.js 3组合式API和Vite构建工具的优质示例。

---

*架构文档由project-architecture-diagram skill生成，保存于2026-01-11*
*文件: ARCHITECTURE.md，位置: 项目根目录*