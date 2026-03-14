# 平安DO — AI 保险经营管理平台 Demo

基于 React + TypeScript + Vite 构建的交互式演示项目，展示 AI 驱动的保险营业区经营管理全流程。包含 **PC 端（内勤）** 与 **移动端（外勤）** 双模式。

> 本项目为纯前端演示，不依赖后端接口或大模型在线推理，所有数据与对话脚本均为本地模拟。

---

## 一、PC 端 — 内勤作业平台

PC 端采用侧边栏导航 + 主内容区布局，包含 4 大 AI 场景：

| 场景 | 说明 |
|------|------|
| **📡 每日智能巡检雷达** | 登录自动触发，96 个数据点交叉比对，AI 推理分析异常，主动推送诊断报告（含因果链路、趋势研判、破局建议） |
| **💬 智能面谈、任务分发** | AI 生成面谈策略树，动态多轮对话引导，企业微信私聊对话式任务下发（张仟 + 李平安） |
| **🏆 案例挖掘、素材生成** | 语音驱动，AI 自动生成贺报海报、榜样案例海报，一键转发微信群 |
| **📊 进度追踪、落后跟进** | 语音驱动，AI 外呼追踪落后部经理（含录音对话回放），自动生成检视会 PPT |

### PC 端核心交互

- **语音识别弹窗**：浏览器原生 `webkitSpeechRecognition`，暗色浮层 + 麦克风动画 + 波形 + 实时语音转文字 + 预设提词提示
- **AI 外呼录音模拟**：双通电话顺序播放，AI/人对话脚本自动推进，语音合成同步朗读
- **企微私聊下发**：模拟企业微信私聊窗口，AI 助手逐条发送任务消息
- **PPT 自动生成**：检视会议 PPT 封面 + 4 页分页缩略图逐帧展示
- **诊断报告侧边抽屉**：AI 思考过程流式展示 → 折叠为完成标记 → 四层诊断卡片逐步呈现

---

## 二、移动端 — 外勤代理人助手

移动端以对话式界面 + 手机 Mock UI 演示外勤代理人场景。

### 内勤八大场景（移动端版本）

```
进度追踪 → 问题诊断 → 面谈策略 → 面谈辅助 → 报告制作 → 营销素材 → 案例挖掘 → 案例归纳
```

### 外勤八大场景

围绕代理人"小李"向潜在客户"王哥"展开销售的完整流程，采用**双手机布局**：左侧为产品 AI 界面，右侧为**微信模拟器**，两者实时同步。

```
内容定制 → 智能回复 → 兴趣洞察 → 话术推荐 → 缺口诊断 → 产品匹配 → 收益测算 → 素材生成
```

| 场景 | 说明 |
|------|------|
| 个性内容定制 | AI 定制个性化朋友圈，发布后微信模拟器同步显示 |
| 问题智能回复 | 微信消息 AI 分析 + 推荐回复，一键发送同步 |
| 好友兴趣洞察 | AI 扫描朋友圈动态，输出六维客户画像 |
| 精准话术推荐 | 设计自然切入话术，微信模拟器同步对话 |
| 保障缺口诊断 | 色彩编码风险等级（绿/黄/红）直观呈现 |
| 产品精准匹配 | 均衡版 + 尊享版两套方案，含产品明细与推荐 |
| 收益分析测算 | 代理人佣金收益对比，高亮关键数字 |
| 讲解素材生成 | 四份材料可展开查看，微信发送 + 跟进提醒弹窗 |

### 微信模拟器

- **聊天视图**：模拟微信聊天界面，绿色气泡（小李）/ 白色气泡（王哥）
- **朋友圈视图**：模拟微信朋友圈，显示头像、内容、图片、点赞和评论
- **输入法 AI 截图帮回**：浮层动画展示截图识别 → AI 分析 → 生成回复
- **同步事件**：`add-chat` / `add-moment` / `switch-view` / `show-screenshot-helper` / `show-followup-reminder` 等

---

## 三、技术栈

| 层面 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript 5.9 |
| 构建 | Vite 7 |
| 样式 | Tailwind CSS 4 |
| 语音识别 | Web Speech Recognition API |
| 语音合成 | Web Speech Synthesis API |
| 音效 | Web Audio API |
| 代码质量 | ESLint + typescript-eslint |

---

## 四、项目结构

```
src/
├── main.tsx                         # 应用入口
├── App.tsx                          # 主布局 + 内勤/外勤模式切换
├── index.css                        # 全局样式
├── types/index.ts                   # 类型定义
├── hooks/
│   ├── useChat.ts                   # 对话状态机
│   └── useSpeech.ts                 # 语音识别 + TTS
├── data/
│   ├── scenarios.ts                 # 内勤场景对话脚本
│   └── fieldScenarios.ts           # 外勤场景对话脚本
└── components/
    ├── pc/                          # PC 端内勤平台
    │   ├── PCDashboard.tsx          # 主面板（侧边栏 + 巡检雷达 + 诊断报告抽屉）
    │   ├── Narrator.tsx             # AI 旁白语音 + 字幕组件
    │   └── scenarios/
    │       ├── ScenarioInterview.tsx # 智能面谈、任务分发
    │       ├── ScenarioOperations.tsx# 案例挖掘、素材生成
    │       └── ScenarioTracking.tsx  # 进度追踪、落后跟进
    ├── cards/                       # 31 个卡片组件（内勤 + 外勤）
    ├── WeChatSimulator.tsx          # 微信模拟器
    ├── Header.tsx                   # 顶部状态栏
    ├── MessageBubble.tsx            # 消息路由
    ├── InputBar.tsx                 # 输入区
    ├── QuickReplies.tsx             # 快捷回复
    ├── TypingIndicator.tsx          # 输入中动画
    └── OverviewPage.tsx             # 首页能力概览
```

---

## 五、快速开始

### 环境要求
```bash
- Node.js >= 18
- npm
```

### 安装与运行

```bash
npm install
npm run dev
```

访问 `http://localhost:5173/myproject/`。PC 端为默认视图，点击右上角「切换到外勤」可进入移动端模式。

### 构建

```bash
npm run build
npm run preview
```

---

## 六、如何扩展

### 新增 PC 场景

1. 在 `src/components/pc/scenarios/` 新建场景组件
2. 在 `PCDashboard.tsx` 的 `ScenarioId` 类型和 `sidebarItems` 中注册
3. 在主渲染区添加条件渲染

### 新增移动端场景

1. 在 `scenarios.ts`（内勤）或 `fieldScenarios.ts`（外勤）新增 `Scenario` 对象
2. 在 `App.tsx` 的模块元数据中添加
3. 若需新卡片：`cards/` 新建组件 → `types/index.ts` 加类型 → `MessageBubble.tsx` 注册

### 接入真实后端

- 替换 `useChat` 中的场景步骤播放为后端 API 调用
- 保持消息协议不变，前端无需改动
- `data` 字段由后端/大模型生成，卡片组件直接消费
