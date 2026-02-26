# 万能营销助手 Demo（保险销售 AI 聊天应用）

## 一、项目概览

本项目是一个面向寿险代理人/团队主管的 **AI 营销助手 Demo**，通过对话式界面与大屏手机 Mock UI，模拟了代理人从 **月初盘点 → 周经营 → 单次拜访前后 → 团队辅导 → 周末总结 → 月末复盘** 的完整经营闭环。

整体定位为「万能营销助手」的前端交互层 Demo，用于演示：

- **业务侧**：保险代理人的典型七大经营场景如何被 AI 驱动自动化、可视化和闭环管理  
- **产品侧**：以聊天为主轴，搭配各类 **卡片式可视化组件**（客户卡片、保障缺口分析、拜访总结、经营计划等）  
- **技术侧**：基于 **React + TypeScript + Vite** 与浏览器 **Web Speech API** 的语音输入/播报能力

> 注意：本项目为前端演示应用，不包含真实后端接口调用和大模型在线推理，所有数据与话术均为本地模拟。

---

## 二、主要功能与业务场景

### 1. 入口概览页 `OverviewPage`

首次进入时展示的概览页，用于给决策者/观众讲清楚「万能营销助手」的能力框架：

- **四大核心能力**（深度可视化 / 服务被动转主动 / 对话即交易 / 闭环式成交）
- **完整时间线**：从月初盘点 → 每周计划 → 单日拜访前后 → 当晚辅导 → 周末总结 → 月末复盘  
- 支持文字旁白 + 语音解说（通过 `useSpeech().narrate` 调用浏览器 TTS）
- 点击「开始演示」后进入主聊天演示界面

对应代码：`src/components/OverviewPage.tsx`

### 2. 聊天主界面 `App`

`App.tsx` 负责整体页面布局与场景切换：

- 左侧为 **业务场景导航栏**（7 个模块）  
  - 每个模块对应一个核心场景，如「每月初盘点客户」「拜访前」「拜访后」「团队辅导」等  
  - 点击模块会调用 `startModuleWithNarration`：先播报场景旁白，再重置并启动对应场景对话
- 中间为 **手机框 Chat Mock**：  
  - 顶部 `Header` 展示助手状态 + 语音开关  
  - 中部为消息气泡区 `MessageBubble` 列表  
  - 底部是输入区 `InputBar`，支持文本输入、语音录入按钮  
  - 下方可动态出现 `QuickReplies` 快捷选项
- 通过 `useChat` 管理对话状态，通过 `useSpeech` 管理语音识别/播报

对应代码：`src/App.tsx`

### 3. 对话与场景引擎 `useChat` + `scenarios.ts`

对话完全由前端驱动，不依赖真实后端：

- `src/hooks/useChat.ts`  
  - 管理 `ChatState`：消息列表、当前场景 ID、当前步骤索引、是否正在输入、当前快捷选项等  
  - `initChat()`：进入聊天主界面时生成首条欢迎语 + 今日待办，并给出场景快捷入口  
  - `startScenario/resetAndStartScenario`：根据场景 ID 启动或重置并启动整个场景流程  
  - `playScenarioStep`：按 **步骤** 展示一系列 AI 消息（支持 delay 动画）并在末尾展示 Quick Reply  
  - `handleQuickReply`：处理「返回菜单」「进入下一步」等快捷选项  
  - `handleUserMessage`：处理用户自由输入，根据文案中是否提到某个场景名字 / 描述来匹配并启动场景，或给出默认引导
- `src/data/scenarios.ts`  
  - 用数据驱动的方式定义了 7 大模块、每个模块内部的多步骤对话脚本  
  - 每条 `aiMessages` 可指定：
    - `type`: 消息类型（普通文本 / 各种卡片组件）  
    - `content`: 文本内容  
    - `speechText`: 可选的 TTS 播报文本  
    - `data`: 传给卡片组件的结构化数据（如客户信息、计划数据等）  
    - `delay`: 与上一条消息的时间间隔，用于模拟 AI 分段输出

通过这种设计，**所有业务脚本都集中在 `data/scenarios.ts`，前端渲染层则通过 `MessageContentType` + 卡片组件解耦展示逻辑**，便于后续按业务迭代场景内容。

### 4. 语音能力 `useSpeech`

`src/hooks/useSpeech.ts` 基于浏览器 `Web Speech API` 封装了中英文语音功能，主要包括：

- **语音识别（STT）**：  
  - 封装 `SpeechRecognition / webkitSpeechRecognition`  
  - 自动去掉中文标点、处理静默超时（1 秒无声自动停止并触发消息发送）
- **语音播报（TTS）**：  
  - 选取合适的中文女声/男声（优先 Azure Neural 等高质量声线）  
  - `speak`：适合对话内容，按句子切 chunk，队列播报  
  - `enqueueSpeak`：不打断当前播报，追加排队  
  - `narrate`：用于概览页/场景过场的旁白，采用男声、单条长句，带 Chrome 保活处理  
  - `stopSpeaking`：停止当前所有播报并清理状态

在 `App.tsx` 中通过：

- `chat.registerSpeak(speech.speak, speech.enqueueSpeak)` 将文字消息与 TTS 建立联动  
- 手动点击 `MessageBubble` 时通过 `handleSpeak` 触发单条重播

---

## 三、UI 与组件体系

### 1. 消息与卡片类型定义

在 `src/types/index.ts` 中定义了统一的数据结构：

- `MessageContentType`：列举所有消息类型（`text` / `customer-card` / `visit-summary` / `work-summary` / `schedule-card` / `monthly-plan` 等）  
- `Message`：一条对话消息的统一结构（角色、类型、文本、可选语音文本、结构化数据、时间戳）  
- `Scenario` / `ScenarioStep`：业务场景及其多步骤的消息与快捷选项

### 2. 卡片组件示例

卡片组件位于 `src/components/cards/` 下，对应不同业务含义：

- `CustomerCard`：展示单个客户画像、标签和重点备注，数据来自 `data/customers.ts`  
- `MonthlyPlanCard`：展示本月触客/面访/邀约等目标与完成进度条  
- 其他如 `WorkSummaryCard`、`VisitSummaryCard`、`TeamDashboard`、`AbilityAnalysisCard` 等，分别对应周/月总结、拜访后总结、团队看板、能力雷达等

这些组件通过 `Message.data` 接收结构化数据，因此可以很方便地由后端/大模型生成数据后前端渲染。

---

## 四、项目结构（简要）

主要目录说明（仅列出与业务相关的核心部分）：

- `src/main.tsx`：应用入口，挂载 `App` 组件  
- `src/App.tsx`：主界面布局 + 场景导航 + Chat 容器  
- `src/components/`  
  - `Header.tsx`：顶部头像与状态栏  
  - `MessageBubble.tsx`：根据 `MessageContentType` 渲染普通文本或各类卡片  
  - `QuickReplies.tsx` / `TypingIndicator.tsx` / `InputBar.tsx`：对话交互基础组件  
  - `OverviewPage.tsx`：演示前的整体能力概览页  
  - `cards/`：各类业务卡片组件（客户、计划、拜访总结、团队看板等）
- `src/hooks/`  
  - `useChat.ts`：对话/场景状态机  
  - `useSpeech.ts`：语音识别与播报封装
- `src/data/`  
  - `scenarios.ts`：七大场景的完整对话脚本与卡片数据  
  - `customers.ts` / `products.ts` / `team.ts`：客户、产品、团队等静态模拟数据
- `src/index.css`：整体样式与手机 Mock、侧边栏等布局样式

---

## 五、本地开发与运行方式

### 1. 环境要求

- Node.js：**推荐 ≥ 18**（Vite 官方推荐版本）  
- 包管理工具：已提供 `package-lock.json`，建议使用 **npm**

### 2. 安装依赖

在项目根目录执行：

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

默认会在 `http://localhost:5173` 启动开发服务器。  
打开浏览器访问即可看到：

- 左侧业务场景导航  
- 中间手机对话界面  
- 支持语音播报与语音输入的 AI 助手 Demo

### 4. 构建与预览（编译运行）

执行构建（TypeScript 编译 + 生产构建）：

```bash
npm run build
```

本地预览生产构建结果：

```bash
npm run preview
```

---

## 六、如何扩展本项目

### 1. 新增一个业务场景

1. 在 `src/data/scenarios.ts` 中新增一个 `Scenario`：  
   - 设置 `id` / `name` / `icon` / `description`  
   - 以步骤数组的形式编排每个阶段的 `aiMessages` 和 `quickReplies`
2. 在 `App.tsx` 中的 `modulesMeta` 中增加对应的模块元数据（名称、时间点、图标、旁白文案）
3. 若需要新 UI 展示形式，可在 `components/cards/` 目录下新增卡片组件，并将其类型加到 `MessageContentType`

### 2. 替换为真实后端/大模型

当前 Demo 完全由前端模拟，若要接入真实服务可以：

- 将 `useChat` 中的 `playScenarioStep` 替换为调用后端编排/Agent 服务的结果  
- 在 `data/*` 中使用真实 API 返回的数据而不是本地静态数据  
- 保持 `Message` / `MessageContentType` 协议不变，以减少前端改动

---

## 七、技术栈说明

- **React 19 + TypeScript**：构建组件化单页应用  
- **Vite 7**：开发服务器与构建工具，脚本见 `package.json`  
- **Tailwind CSS 4（通过 @tailwindcss/vite）**：快速实现现代化 UI  
- **ESLint + typescript-eslint**：基础代码质量保障  
- **Web Speech API**：浏览器内建语音识别与中文语音合成

---

## 开发脚手架：React + TypeScript + Vite

以下为原始 Vite 模板关于 React + TS + Vite 与 ESLint 的说明（英文），保留供前端工程配置参考。

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
