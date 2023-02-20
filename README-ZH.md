# vue3-management-system
文档语言: [English](README.md) | 中文简体

该项目是一个使用 Vue 3 技术栈开发的练手项目，用于展示如何使用 Vue 3 进行前端开发。

## 项目功能

### 该项目实现了以下功能：

- 功能1：xxx
- 功能2：xxx
- 功能3：xxx
## 技术栈

该项目使用了以下技术栈：

- Vue 3：前端框架
- Vuex：状态管理
- Vue Router：路由管理
- Axios：网络请求
- Element Plus：UI 组件库
## 项目结构

该项目的主要目录结构如下：
```
.
├── public
│   └── favicon.ico
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── router
│   ├── stores
│   ├── views
│   ├── App.vue
│   └── main.ts
├── README-ZH.md
├── README.md
├── env.d.ts
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.config.json
├── tsconfig.json
└── vite.config.ts
```
## 安装
```
# 安装依赖
npm install

# 本地开发，启动服务
npm run dev

# 打包构建
npm run build

# ESLint修复
npm run lint
```
## 规范
### 代码规范
- 使用`eslint`进行代码规范检查

### commit规范
1. type：必选，用于制定commit类型
```
# 主要type
feat:     增加新功能
fix:      修复bug

# 特殊type
docs: 只改动了文档相关的内容
style: 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build: 构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert: 用于撤销之前的commit，详情里标注被撤销commit的hash
```
2. scope：改动影响的范围，使用模块名称/文件名表示。
3. describe：commit内容简要描述，控制在50个字以内。
4. body：描述修改详细信息，主要包括：修改内容，为什么修改，影响情况。

## 自定义配置

### IDE配置
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### 在TS中类型支持.vue导入
默认情况下，TypeScript 无法处理 .vue 导入的类型信息，因此我们将 tsc CLI 替换为 vue-tsc 以进行类型检查。 在编辑器中，我们需要 TypeScript Vue Plugin (Volar) 来让 TypeScript 语言服务识别 .vue 类型。

如果独立的TypeScript插件对您来说速度不够快，Volar还实现了性能更高的接管模式。您可以通过以下步骤启用它：

1. 禁用内置TypeScript扩展
    1) 在VSCode's 的指令面板 Run `Extensions: Show Built-in Extensions`

    2) 查找 `TypeScript and JavaScript Language Features`, 右键单击并选择 `Disable (Workspace)`
2. 通过从命令调色板运行Developer: Reload WindowVSCode窗口。

### vite配置
请参阅[Vite配置参考](https://vitejs.dev/config/)

## 参考资料
- [参考项目](https://preview.pro.ant.design/dashboard/analysis)
- [Vue3中文文档](https://cn.vuejs.org)
- [Vue Router中文文档](https://router.vuejs.org/zh/)
- [Pinia中文文档](https://pinia.vuejs.org/zh/)
- [Element Plus中文文档](https://element-plus.gitee.io/zh-CN/guide/quickstart.html)