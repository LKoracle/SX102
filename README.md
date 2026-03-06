# 万能营销助手 Demo（保险销售 AI 聊天应用）

## 一、项目概览

本项目是一个面向寿险代理人/团队主管/内勤管理人员的 **AI 营销助手 Demo**，通过对话式界面与大屏手机 Mock UI，模拟了两大核心使用场景：

- **外勤代理人场景**：从 **月初盘点 → 周经营 → 单次拜访前后 → 团队辅导 → 周末总结 → 月末复盘** 的完整经营闭环
- **内勤管理场景**：面向内勤管理人员（如郑晓），实现对代理人（如李平安）的 **进度追踪 → 问题诊断 → 面谈策略 → 面谈辅助** 全流程数字化管理

整体定位为「万能营销 PRO」的前端交互层 Demo，用于演示：

- **业务侧**：保险代理人的七大经营场景 + 内勤管理人员的四大管理场景如何被 AI 驱动自动化、可视化和闭环管理
- **产品侧**：以聊天为主轴，搭配各类 **卡片式可视化组件**（客户卡片、保障缺口分析、进度追踪、风险雷达、面谈脚本等）
- **技术侧**：基于 **React + TypeScript + Vite** 与浏览器 **Web Speech API** 的语音输入/播报能力

> 注意：本项目为前端演示应用，不包含真实后端接口调用和大模型在线推理，所有数据与话术均为本地模拟。

---

## 二、主要功能与业务场景

### 1. 入口概览页 `OverviewPage`

首次进入时展示的概览页，用于给决策者/观众讲清楚「万能营销助手」的能力框架：

- **四大核心能力**（深度可视化 / 服务被动转主动 / 对话即交易 / 闭环式成交）
- **完整时间线**：从月初盘点 → 每周计划 → 单日拜访前后 → 当晚辅导 → 周末总结 → 月末复盘
- 点击「开始演示」后进入主聊天演示界面

对应代码：`src/components/OverviewPage.tsx`

### 2. 聊天主界面 `App`

`App.tsx` 负责整体页面布局与场景切换：

- 左侧为 **内勤场景导航栏**（4 个模块）
  - 进度自动追踪、问题预警诊断、面谈策略指引、面谈全程辅助
  - 点击模块会调用 `startModuleWithNarration`：先播报场景旁白，再重置并启动对应场景对话
- 中间为 **手机框 Chat Mock**：
  - 顶部 `Header` 展示助手状态 + 语音开关
  - 中部为消息气泡区 `MessageBubble` 列表
  - 底部是输入区 `InputBar`，支持文本输入、语音录入按钮
  - 下方可动态出现 `QuickReplies` 快捷选项
- 通过 `useChat` 管理对话状态，通过 `useSpeech` 管理语音识别/播报

对应代码：`src/App.tsx`

### 3. 内勤管理四大场景

#### 场景一：进度自动追踪 `backoffice-progress-tracking`
- AI 自动更新代理人业绩追踪，展示进度列表卡片（李平安/张明辉/王丽华）
- 点击查看李平安详情，展示 6 个月 FYC 趋势报告（85%→38% 持续下滑）
- 支持 AI 主管外呼，模拟电话沟通界面

对应卡片：`ProgressListCard`、`AgentReportCard`、`AICallCard`

#### 场景二：问题预警诊断 `backoffice-problem-diagnosis`
- 从 CRM/通话/考勤/保单等多数据源自动抓取数据（动画展示）
- 异常雷达展示 5 项风险（2 高危/2 中危/1 低危）
- 推导根因链：技能不足 → 信心下降 → 行为退缩

对应卡片：`DataCaptureCard`、`RiskRadarCard`、`RootCauseCard`

#### 场景三：面谈策略指引 `backoffice-meeting-strategy`
- 生成 5 项面谈核心目标（带优先级和进度勾选）
- 提供 5 段可折叠面谈话术脚本（开场白/数据对齐/原因探讨/行动计划/收尾激励）
- 3 种人格类型应对策略（防御型/自责型/口头答应型），支持 Tab 切换

对应卡片：`MeetingTargetCard`、`MeetingScriptCard`、`ResponseStrategyCard`

#### 场景四：面谈全程辅助 `backoffice-meeting-assist`
- 实时录音界面，含波形动画和实时语音转文字
- 面谈结束后自动生成结果摘要（关键发现 + 识别问题 + 改善行动）
- 生成 30 天改善计划（4 周详细行动安排），确认后下发给代理人

对应卡片：`RecordingCard`、`MeetingResultCard`、`PlanDeliveryCard`

### 4. 外勤代理人七大场景

外勤代理人场景数据仍保留在 `scenarios.ts` 中，包含：

| 场景 | ID | 说明 |
|------|----|------|
| 每月初盘点客户 | `monthly-review` | AI 主动播报客户盘点与经营计划 |
| 每周初经营计划 | `weekly-plan` | 推送本周行事历与拜访计划 |
| 客户拜访前 | `pre-visit` | 自动分析需求、检视保障、推荐方案 |
| 客户拜访后 | `post-visit` | 语音记录拜访、生成总结、推荐附近客户 |
| 辅导下属 | `team-coaching` | 团队看板、成员分析、辅助面谈 |
| 每周末工作总结 | `weekly-summary` | 周报生成、薄弱环节分析、学习推荐 |
| 每月末工作复盘 | `monthly-retrospective` | 月度复盘、技能评估、下月计划 |

### 5. 对话与场景引擎 `useChat` + `scenarios.ts`

对话完全由前端驱动，不依赖真实后端：

- `src/hooks/useChat.ts`
  - 管理 `ChatState`：消息列表、当前场景 ID、当前步骤索引、是否正在输入、当前快捷选项等
  - `initChat()`：进入聊天主界面时生成首条欢迎语（内勤角色郑晓），并给出场景快捷入口
  - `startScenario/resetAndStartScenario`：根据场景 ID 启动或重置并启动整个场景流程
  - `playScenarioStep`：按 **步骤** 展示一系列 AI 消息（支持 delay 动画）并在末尾展示 Quick Reply
  - `handleQuickReply`：处理「返回菜单」「进入下一步」等快捷选项
  - `handleUserMessage`：处理用户自由输入，根据文案中是否提到某个场景名字/描述来匹配并启动场景
- `src/data/scenarios.ts`
  - 用数据驱动的方式定义了 7 个代理人场景 + 4 个内勤场景的完整对话脚本
  - 导出 `backofficeScenarios`（侧边栏使用的 4 个内勤场景）
  - 每条 `aiMessages` 可指定：
    - `type`: 消息类型（普通文本 / 各种卡片组件）
    - `content`: 文本内容
    - `speechText`: 可选的 TTS 播报文本
    - `data`: 传给卡片组件的结构化数据
    - `delay`: 与上一条消息的时间间隔，用于模拟 AI 分段输出

通过这种设计，**所有业务脚本都集中在 `data/scenarios.ts`，前端渲染层则通过 `MessageContentType` + 卡片组件解耦展示逻辑**，便于后续按业务迭代场景内容。

### 6. 语音能力 `useSpeech`

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

---

## 三、UI 与组件体系

### 1. 视觉风格

采用 **Alice Blue Crystal** 设计主题：

- 主色调：蓝色系（`#3B82F6` / `#1D4ED8`），搭配金色品牌色（`#D4AF37`）
- 玻璃态（Glassmorphism）效果：`backdrop-blur`、半透明白色背景、微噪点纹理
- 品牌字体：衬线体（Georgia/Times）用于标题，无衬线体用于正文
- 圆角卡片：`rounded-[24px]`，渐变色头部，最大高度 `450px` 可滚动

### 2. 消息与卡片类型定义

在 `src/types/index.ts` 中定义了统一的数据结构：

- `MessageContentType`：列举所有消息类型，包括：
  - 基础类型：`text`、`customer-card`、`visit-summary`、`schedule-card` 等
  - 内勤卡片：`progress-list`、`agent-report`、`ai-call`、`data-capture`、`risk-radar`、`root-cause`、`meeting-target`、`meeting-script`、`response-strategy`、`recording`、`meeting-result`、`plan-delivery`
- `Message`：一条对话消息的统一结构（角色、类型、文本、可选语音文本、结构化数据、时间戳）
- `Scenario` / `ScenarioStep`：业务场景及其多步骤的消息与快捷选项

### 3. 卡片组件

卡片组件位于 `src/components/cards/` 下，按业务含义分类：

**外勤代理人卡片：**
- `CustomerCard`：客户画像与标签
- `MonthlyPlanCard`：月度经营计划进度
- `WorkSummaryCard`、`VisitSummaryCard`：周/月工作总结、拜访总结
- `TeamDashboard`、`AbilityAnalysisCard`：团队看板、能力分析

**内勤管理卡片（新增 12 个）：**
- `ProgressListCard`：代理人进度列表（红/黄/绿状态）
- `AgentReportCard`：代理人详细报告（6 月趋势图 + 建议）
- `AICallCard`：AI 主管外呼界面（拨号/通话/结束状态）
- `DataCaptureCard`：多数据源抓取动画（4 源进度条）
- `RiskRadarCard`：异常雷达（5 项风险，高/中/低危）
- `RootCauseCard`：根因链分析（3 因子链式展示）
- `MeetingTargetCard`：面谈目标清单（5 项可勾选）
- `MeetingScriptCard`：面谈话术脚本（5 段可折叠）
- `ResponseStrategyCard`：应对策略（3 种人格 Tab 切换）
- `RecordingCard`：录音界面（计时器 + 波形 + 实时转写）
- `MeetingResultCard`：面谈结果摘要（关键发现 + 问题识别）
- `PlanDeliveryCard`：计划下发确认（4 周行动表 + 确认按钮）

所有卡片通过 `Message.data` 接收结构化数据，可以方便地由后端/大模型生成数据后前端渲染。

---

## 四、项目结构（简要）

主要目录说明：

- `src/main.tsx`：应用入口，挂载 `App` 组件
- `src/App.tsx`：主界面布局 + 内勤场景导航 + Chat 容器
- `src/components/`
  - `Header.tsx`：顶部头像与状态栏
  - `MessageBubble.tsx`：根据 `MessageContentType` 渲染普通文本或各类卡片
  - `QuickReplies.tsx` / `TypingIndicator.tsx` / `InputBar.tsx`：对话交互基础组件
  - `OverviewPage.tsx`：演示前的整体能力概览页
  - `cards/`：各类业务卡片组件（外勤 + 内勤共 30+ 个组件）
- `src/hooks/`
  - `useChat.ts`：对话/场景状态机
  - `useSpeech.ts`：语音识别与播报封装
- `src/data/`
  - `scenarios.ts`：外勤 7 场景 + 内勤 4 场景的完整对话脚本与卡片数据
  - `customers.ts` / `products.ts` / `team.ts`：客户、产品、团队等静态模拟数据
- `src/index.css`：整体样式（glassmorphism、动画、侧边栏、手机 Mock 布局）

---

## 五、本地开发与运行方式

### 1. 环境要求

- Node.js：**推荐 >= 18**（Vite 官方推荐版本）
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

默认会在 `http://localhost:5173/myproject/` 启动开发服务器。
打开浏览器访问即可看到：

- 左侧内勤场景导航（4 个场景）
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
2. 如需展示在侧边栏，更新 `backofficeScenarios` 过滤条件或在 `App.tsx` 的 `backofficeModules` 中增加模块元数据
3. 若需要新 UI 展示形式，可在 `components/cards/` 目录下新增卡片组件，并将其类型加到 `MessageContentType`，然后在 `MessageBubble.tsx` 注册渲染

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
