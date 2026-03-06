# 万能营销 Pro — 内勤 & 外勤智能管理 Demo

## 一、项目概览

面向寿险管理人员的 **AI 智能助手 Demo**，以对话式界面 + 手机 Mock UI，演示两大业务场景：

- **内勤场景**：内勤管理人员（郑晓）如何借助 AI 完成代理人管理、报告制作、营销素材生成、典范案例挖掘等日常工作
- **外勤场景**：外勤代理人（小李）如何借助 AI 完成客户获取、智能回复、需求分析、产品匹配、方案生成等销售全流程

**八大内勤场景**覆盖完整管理闭环：

```
进度追踪 → 问题诊断 → 面谈策略 → 面谈辅助 → 报告制作 → 营销素材 → 案例挖掘 → 案例归纳
```

**八大外勤场景**覆盖完整销售闭环：

```
内容定制 → 智能回复 → 兴趣洞察 → 话术推荐 → 缺口诊断 → 产品匹配 → 收益测算 → 素材生成
```

通过侧边栏右侧隐藏的切换标签，可在内勤/外勤两种模式之间自由切换。

> 本项目为纯前端演示，不依赖后端接口或大模型在线推理，所有数据与对话脚本均为本地模拟。

---

## 二、内勤八大业务场景

### 场景一：进度自动追踪

AI 自动更新代理人业绩，展示进度列表（红/黄/绿状态），可下钻查看李平安 6 个月 FYC 趋势报告（85% → 38%），支持 AI 主管外呼提醒。

**卡片组件**：`ProgressListCard` · `AgentReportCard` · `AICallCard`

### 场景二：问题预警诊断

从 CRM/通话/考勤/保单四大数据源自动抓取（动画展示），生成异常雷达（5 项风险，2 高危/2 中危/1 低危），推导根因链：技能不足 → 信心下降 → 行为退缩。

**卡片组件**：`DataCaptureCard` · `RiskRadarCard` · `RootCauseCard`

### 场景三：面谈策略指引

生成 5 项面谈核心目标（带优先级），提供 5 段可折叠话术脚本（开场白/数据对齐/原因探讨/行动计划/收尾激励），以及 3 种人格类型应对策略（防御型/自责型/口头答应型）Tab 切换。

**卡片组件**：`MeetingTargetCard` · `MeetingScriptCard` · `ResponseStrategyCard`

### 场景四：面谈全程辅助

实时录音界面（波形动画 + 语音转文字），面谈结束自动生成结果摘要（关键发现 + 问题识别），生成 30 天改善计划（4 周详细安排），确认后下发给代理人。

**卡片组件**：`RecordingCard` · `MeetingResultCard` · `PlanDeliveryCard`

### 场景五：报告一键制作

上传图片/PPT/邮件或授权寿险业务系统数据，AI 自动挖掘关联分析，生成包含 **NBEV、增员率、3 转、13 留** 四项关键指标的报告。支持 **三种展示样式切换**（卡片/图表/表格），日期切换到下周时数据自动更新。

**卡片组件**：`ReportUploadCard` · `ReportPreviewCard`

### 场景六：营销素材生成

输入活动目标（深圳亲子自然研学）、人群画像（三口之家）、主推产品（平安「全家保」），一键生成全套素材：活动海报、客户邀请函、代理人宣导话术、完整课件、朋友圈文案，自动合规校验。支持跨平台分发：微信版偏私域信任表达，小红书版强化标题吸引力与话题标签，一键推送至代理人端。

**卡片组件**：`MaterialConfigCard` · `MaterialPreviewCard` · `MaterialDistributeCard`

### 场景七：典范案例挖掘

输入案例需求意图（"快速成长型 1 年期代理人"），选择六维标签（年龄/性别/年限/月增长/佣金/地区），系统自动匹配代理人案例。展示曲潇完整成长故事与里程碑轨迹，案例内容支持**折叠/展开/复制/转发**。

**卡片组件**：`CaseSearchCard` · `CaseResultCard`

### 场景八：案例智能归纳

AI 数字人对曲潇进行访谈（虚线人像框 + 波形动画 + 实时转写），访谈结束自动生成宣导视频。支持**切换三种封面风格**（专业商务/温暖励志/现代科技）和**三个标题选项**。

**卡片组件**：`CaseInterviewCard` · `CaseVideoCard`

---

## 三、外勤八大业务场景

外勤场景围绕代理人"小李"向潜在客户"王哥"展开销售的完整流程。在外勤模式下，界面采用**双手机布局**：左侧为产品 AI 界面，右侧为**微信模拟器**，两者实时同步。

### 场景一：个性内容定制

结合小李个人爱运动的人设、近期体育新闻，AI 定制个性化朋友圈内容（含真实配图），展示内容亮点分析。确认发布后，右侧微信模拟器自动切换到朋友圈视图，显示刚发布的动态（含点赞和评论）。

**卡片组件**：`FieldMomentsPostCard`（支持真实图片 + 文字占位符双模式）

### 场景二：问题智能回复

王哥通过微信咨询三高能否买保险。右侧微信模拟器显示王哥消息 + 输入法 AI 截图帮回浮层。左侧展示 AI 智能分析（问题类型/客户情绪/意向阶段/应对建议），生成推荐回复（含回复要点）。一键发送后，微信模拟器同步显示聊天记录。

**卡片组件**：`FieldAIAnalysisCard` · `FieldReplyPreviewCard`

### 场景三：好友兴趣洞察

AI 扫描王哥朋友圈动态，右侧微信模拟器切换到朋友圈视图展示王哥的真实动态（高尔夫、健康文章、养生等）。左侧输出客户画像（年龄/职业/爱好/家庭/消费偏好六维分析），并生成需求深度解析（核心需求/次要需求/紧迫程度星级评估）。

**卡片组件**：`FieldCustomerProfileCard` · `FieldNeedsAnalysisCard`

### 场景四：精准话术推荐

AI 设计自然切入的询问话术，帮助小李了解王哥家庭现有保障情况。展示话术设计要点（先给信心 → 说明目的 → 降低负担 → 具体引导）。一键发送后，微信模拟器同步显示对话过程及王哥的回复。

**卡片组件**：`FieldSalesScriptCard`

### 场景五：保障缺口诊断

AI 结合王哥年龄、三高状况、家庭结构及现有保障，输出诊断结果：意外险/医疗险（团险覆盖但依赖性强）、重疾险严重不足（20万→100万+，缺口80万+）、寿险未覆盖、养老未启动。以色彩编码（绿/黄/红）直观呈现风险等级。

**卡片组件**：`FieldGapDiagnosisCard`

### 场景六：产品精准匹配

根据画像和缺口自动输出两套方案：均衡版（AI主推，重疾+医疗+寿险三险联动）、尊享版（增加年金险实现保障与财富传承双轮驱动）。每套方案含产品明细、亮点说明和推荐徽章。

**卡片组件**：`FieldProductPlansCard`

### 场景七：收益分析测算

输出均衡版和尊享版的代理人收益测算：年缴保费、首年佣金比例、首年到手收入、续期三年合计佣金，高亮关键收益数字，提示尊享版佣金为均衡版的 1.7 倍。

**卡片组件**：`FieldCommissionCard`

### 场景八：讲解素材生成

自动生成四份材料（一页纸方案总览、三高核保说明、理赔流程动图、同类客户脱敏案例），每份材料**可点击展开**查看详细内容（含配图和完整文案）。一键发送给王哥后，微信模拟器显示文件发送过程和王哥的回复，同时**弹出跟进提醒弹窗**（3天/5天/7天阶梯式跟进计划）。

**卡片组件**：`FieldMaterialsCard`（支持展开/收起详细内容）

---

## 四、微信模拟器

外勤模式下右侧展示的微信模拟器（`WeChatSimulator`），与左侧产品 AI 界面实时同步：

### 功能特性

- **聊天视图**：模拟微信聊天界面，绿色气泡（小李）/ 白色气泡（王哥），支持文件消息样式
- **朋友圈视图**：模拟微信朋友圈，显示头像、内容、真实图片、点赞和评论
- **输入法 AI 截图帮回**：浮层动画展示截图识别 → AI 分析 → 生成回复的过程
- **Tab 切换**：聊天 / 朋友圈两个视图可手动或通过场景事件自动切换

### 同步机制

场景脚本中每条 `aiMessage` 可携带 `wechatEvents` 数组，支持以下事件类型：

| 事件类型 | 说明 |
|---------|------|
| `add-chat` | 添加一条聊天消息 |
| `add-moment` | 添加一条朋友圈动态 |
| `set-chat-messages` | 替换全部聊天消息 |
| `set-moments` | 替换全部朋友圈动态 |
| `switch-view` | 切换聊天/朋友圈视图 |
| `show-screenshot-helper` | 显示截图帮回浮层 |
| `hide-screenshot-helper` | 隐藏截图帮回浮层 |
| `show-followup-reminder` | 弹出跟进提醒弹窗 |

---

## 五、技术架构

### 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 7 |
| 样式 | Tailwind CSS 4（@tailwindcss/vite） |
| 语音 | Web Speech API（STT + TTS） |
| 代码质量 | ESLint + typescript-eslint |

### 视觉风格：Alice Blue Crystal

- 主色调：蓝色系（`#3B82F6` → `#1D4ED8`）
- 玻璃态效果：`backdrop-blur` + 半透明白 + 微噪点纹理
- 圆角卡片：`rounded-[24px]`、渐变色头部、`max-h` 可滚动
- 品牌字体：衬线体标题 + 无衬线正文
- 微信模拟器：WeChat 绿（`#07C160` / `#95EC69`）+ 灰色背景（`#EDEDED`）

### 核心设计模式

```
scenarios.ts / fieldScenarios.ts（对话脚本） → useChat（状态机） → MessageBubble（路由） → Card 组件（渲染）
                                                    ↓
                                             wechatEvents → App.tsx（事件处理） → WeChatSimulator（微信模拟）
```

- **数据驱动**：场景脚本集中在 `scenarios.ts`（内勤）和 `fieldScenarios.ts`（外勤），前端渲染层通过 `MessageContentType` + 卡片组件解耦
- **模式切换**：`App.tsx` 维护 `mode` 状态（`backoffice` / `field`），动态切换场景数据、侧边栏模块和布局（单手机 / 双手机）
- **消息协议**：每条 `aiMessage` 携带 `type`（路由到卡片）、`content`（文本）、`data`（结构化数据）、`speechText`（TTS）、`wechatEvents`（微信同步事件）
- **微信同步**：`wechatEvents` 通过 `registerWeChatEvent` 回调派发，App.tsx 的事件处理器更新 `wechatState`，驱动 `WeChatSimulator` 实时刷新
- **卡片接口统一**：`{ data: Record<string, unknown> }` props，组件内部强类型解析

---

## 六、项目结构

```
src/
├── main.tsx                    # 应用入口
├── App.tsx                     # 主布局 + 侧边栏 + 内勤/外勤模式切换 + 微信事件处理
├── index.css                   # 全局样式（glassmorphism/动画/布局/微信模拟器样式）
├── types/index.ts              # MessageContentType + 消息/场景/微信类型定义
├── hooks/
│   ├── useChat.ts              # 对话状态机（场景切换/步骤播放/快捷回复/微信事件派发）
│   └── useSpeech.ts            # 语音识别 + TTS 播报
├── data/
│   ├── scenarios.ts            # 8 个内勤场景的完整对话脚本
│   └── fieldScenarios.ts       # 8 个外勤场景的完整对话脚本（含微信事件和结构化数据）
└── components/
    ├── Header.tsx              # 顶部状态栏
    ├── MessageBubble.tsx       # 消息路由（type → Card 组件，31 种类型）
    ├── InputBar.tsx            # 输入区（文本 + 语音）
    ├── QuickReplies.tsx        # 快捷回复按钮
    ├── TypingIndicator.tsx     # AI 输入中动画
    ├── OverviewPage.tsx        # 首页能力概览
    ├── WeChatSimulator.tsx     # 微信模拟器（聊天/朋友圈/截图帮回）
    └── cards/                  # 31 个卡片组件
        ├── ProgressListCard.tsx       # 内勤 - 进度列表
        ├── AgentReportCard.tsx        # 内勤 - 代理人报告
        ├── AICallCard.tsx             # 内勤 - AI 外呼
        ├── DataCaptureCard.tsx        # 内勤 - 数据采集
        ├── RiskRadarCard.tsx          # 内勤 - 风险雷达
        ├── RootCauseCard.tsx          # 内勤 - 根因分析
        ├── MeetingTargetCard.tsx       # 内勤 - 面谈目标
        ├── MeetingScriptCard.tsx       # 内勤 - 面谈话术
        ├── ResponseStrategyCard.tsx    # 内勤 - 应对策略
        ├── RecordingCard.tsx          # 内勤 - 录音界面
        ├── MeetingResultCard.tsx       # 内勤 - 面谈结果
        ├── PlanDeliveryCard.tsx        # 内勤 - 计划下发
        ├── ReportUploadCard.tsx        # 内勤 - 报告上传
        ├── ReportPreviewCard.tsx       # 内勤 - 报告预览
        ├── MaterialConfigCard.tsx      # 内勤 - 素材配置
        ├── MaterialPreviewCard.tsx     # 内勤 - 素材预览
        ├── MaterialDistributeCard.tsx  # 内勤 - 素材分发
        ├── CaseSearchCard.tsx         # 内勤 - 案例搜索
        ├── CaseResultCard.tsx         # 内勤 - 案例结果
        ├── CaseInterviewCard.tsx      # 内勤 - 数字人访谈
        ├── CaseVideoCard.tsx          # 内勤 - 视频生成
        ├── FieldMomentsPostCard.tsx    # 外勤 - 朋友圈定制
        ├── FieldAIAnalysisCard.tsx     # 外勤 - AI 智能分析
        ├── FieldReplyPreviewCard.tsx   # 外勤 - 推荐回复
        ├── FieldCustomerProfileCard.tsx # 外勤 - 客户画像
        ├── FieldNeedsAnalysisCard.tsx  # 外勤 - 需求解析
        ├── FieldSalesScriptCard.tsx    # 外勤 - 话术推荐
        ├── FieldGapDiagnosisCard.tsx   # 外勤 - 缺口诊断
        ├── FieldProductPlansCard.tsx   # 外勤 - 产品匹配
        ├── FieldCommissionCard.tsx     # 外勤 - 收益测算
        └── FieldMaterialsCard.tsx     # 外勤 - 素材生成（可展开）
```

---

## 七、本地开发

### 环境要求

- Node.js >= 18
- npm（已提供 `package-lock.json`）

### 安装与运行

```bash
npm install
npm run dev
```

访问 `http://localhost:5173/myproject/`，左侧场景导航（默认内勤），中间手机对话界面。侧边栏右侧有隐藏的切换标签，可在内勤/外勤之间切换。外勤模式下右侧会出现微信模拟器。

### 构建

```bash
npm run build
npm run preview
```

---

## 八、如何扩展

### 新增场景

1. 内勤场景：在 `scenarios.ts` 新增 `Scenario` 对象，在 `App.tsx` 的 `backofficeModules` 中添加模块元数据
2. 外勤场景：在 `fieldScenarios.ts` 新增 `Scenario` 对象（可携带 `wechatEvents`），在 `App.tsx` 的 `fieldModules` 中添加模块元数据
3. 若需新卡片：在 `cards/` 新建组件 → `types/index.ts` 加类型 → `MessageBubble.tsx` 注册

### 新增微信事件类型

1. 在 `types/index.ts` 的 `WeChatEvent.type` 联合类型中添加新事件名
2. 在 `App.tsx` 的 `handleWeChatEvents` 中添加对应处理逻辑
3. 在场景脚本的 `wechatEvents` 中使用

### 接入真实后端

- 替换 `useChat` 中的 `playScenarioStep` 为后端 API 调用
- 保持 `Message` / `MessageContentType` 协议不变，前端无需改动
- `data` 字段由后端/大模型生成，卡片组件直接消费
- `wechatEvents` 可由后端动态返回，微信模拟器自动响应
