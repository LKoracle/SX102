import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
  // 内勤场景1: 进度自动追踪
  {
    id: 'backoffice-progress-tracking',
    name: '进度自动追踪',
    icon: '📊',
    description: '进度追踪',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '郑晓您好，本月代理人业绩追踪已自动更新。以下是您管辖的代理人本月进度概览，李平安的FYC达成率持续下滑，建议重点关注。',
            speechText: '郑晓您好，本月代理人业绩追踪已更新。李平安的达成率持续下滑，建议重点关注。',
          },
          {
            type: 'progress-list',
            content: '',
            data: {
              agents: [
                { name: '李平安', fycRate: 38, activity: 45, conversion: 12, status: 'danger' },
                { name: '张明辉', fycRate: 92, activity: 88, conversion: 35, status: 'good' },
                { name: '王丽华', fycRate: 65, activity: 60, conversion: 22, status: 'warning' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看李平安详情', value: 'view-lipingan' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '李平安近6个月FYC达成率呈持续下降趋势（85%→38%），已连续3个月未达标。以下是详细分析报告和优化建议。',
            speechText: '李平安近6个月达成率持续下降，已连续3个月未达标，以下是详细分析。',
          },
          {
            type: 'agent-report',
            content: '',
            data: {
              agentName: '李平安',
              role: '资深代理人',
              tenure: '5年',
              monthlyData: [85, 67, 58, 52, 45, 38],
              months: ['9月', '10月', '11月', '12月', '1月', '2月'],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: 'AI外呼提醒', value: 'ai-call' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '正在为您发起AI主管外呼，将以您的身份与李平安沟通，提醒关注业绩并约定面谈时间。',
            speechText: '正在发起AI外呼。',
          },
          {
            type: 'ai-call',
            content: '',
            data: { agentName: '李平安' },
            delay: 300,
          },
        ],
        quickReplies: [
          { label: '继续', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 内勤场景2: 问题预警诊断
  {
    id: 'backoffice-problem-diagnosis',
    name: '问题预警诊断',
    icon: '🔍',
    description: '问题预警',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '正在为您从多个数据源自动抓取李平安的经营数据，包括CRM系统、通话记录、考勤数据和保单系统。',
            speechText: '正在自动抓取李平安的多维度经营数据。',
          },
          {
            type: 'data-capture',
            content: '',
            data: {
              sources: [
                { name: 'CRM系统', icon: '💼', items: ['客户拜访记录', '商机跟进状态', '客户画像数据'] },
                { name: '通话记录', icon: '📞', items: ['外呼频次统计', '通话时长分析', '接通率数据'] },
                { name: '考勤数据', icon: '📅', items: ['出勤天数', '早会参与率', '培训签到记录'] },
                { name: '保单系统', icon: '📄', items: ['新单件数', 'FYC金额', '续保率'] },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看异常', value: 'view-anomalies' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '数据分析完成，共发现5项异常指标。其中2项高危、2项中危、1项低危，以下是详细异常雷达。',
            speechText: '发现5项异常，2项高危，2项中危，1项低危。',
          },
          {
            type: 'risk-radar',
            content: '',
            data: {
              risks: [
                { category: '日均外呼', icon: '📞', metric: '日均外呼量', current: '18通', benchmark: '团队均值45通', severity: 'high', detail: '外呼量严重不足，仅为团队平均水平的40%，直接影响商机来源' },
                { category: '客户转化率', icon: '🔄', metric: '客户转化率', current: '12%', benchmark: '团队均值25%', severity: 'high', detail: '转化率持续走低，近3个月呈下降趋势，需要加强面谈技巧' },
                { category: '出勤', icon: '📅', metric: '月出勤天数', current: '18天', benchmark: '标准22天', severity: 'medium', detail: '出勤率82%，低于标准要求，早会缺勤3次' },
                { category: '培训', icon: '📚', metric: '培训参与', current: '1次/月', benchmark: '标准3次/月', severity: 'medium', detail: '培训参与度低，近2月仅参加1次培训，技能提升停滞' },
                { category: '客户投诉', icon: '⚠️', metric: '客户投诉', current: '2次', benchmark: '团队均值0.5次', severity: 'low', detail: '近期收到2起客户反馈，主要为沟通态度问题' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '分析根因', value: 'analyze-root-cause' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '基于多维度数据的交叉分析，系统已推导出李平安业绩下滑的根因链条：',
            speechText: '已推导出根因链条：技能不足导致信心下降，进而导致行为退缩。',
          },
          {
            type: 'root-cause',
            content: '',
            data: {
              causes: [
                { id: 1, title: '技能不足', icon: '📉', evidence: '"近3个月培训参与仅1次，异议处理通过率低于60%，面谈转化率从25%降至12%"', color: '#DC2626', bg: '#FEF2F2' },
                { id: 2, title: '信心下降', icon: '😔', evidence: '"连续3个月未达标，客户拒绝率升高后主动外呼量从45通/日降至18通/日"', color: '#D97706', bg: '#FFFBEB' },
                { id: 3, title: '行为退缩', icon: '🔻', evidence: '"出勤天数减少至18天/月，早会缺勤3次，拜访计划完成率仅40%"', color: '#7C3AED', bg: '#F5F3FF' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '继续', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 内勤场景3: 面谈策略指引
  {
    id: 'backoffice-meeting-strategy',
    name: '面谈策略指引',
    icon: '💡',
    description: '面谈策略',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '根据李平安的问题诊断结果，系统已为您生成本次面谈的5项核心目标，请在面谈过程中逐一推进。',
            speechText: '已生成5项面谈目标，请在面谈中逐一推进。',
          },
          {
            type: 'meeting-target',
            content: '',
            data: {
              targets: [
                { text: '确认李平安对当前业绩下滑的自我认知', priority: 'high' },
                { text: '共同分析根本原因（技能/心态/行为）', priority: 'high' },
                { text: '制定未来30天具体改善计划', priority: 'high' },
                { text: '明确每周检查节点和达成标准', priority: 'medium' },
                { text: '激励信心，建立正向预期', priority: 'medium' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看话术', value: 'view-script' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '以下是为本次面谈精心准备的话术脚本，分为5个环节，您可以点击展开查看每个环节的参考话术。',
            speechText: '面谈话术脚本已准备好，分为5个环节。',
          },
          {
            type: 'meeting-script',
            content: '',
            data: {
              sections: [
                { title: '开场白', icon: '👋', content: '平安，谢谢你今天抽时间来。我们这次谈话的目的不是批评，而是一起想办法。你是团队的重要成员，我希望能帮你找到突破口。先说说你最近的感受？' },
                { title: '数据对齐', icon: '📊', content: '我们先看看数据：你的FYC达成率从半年前的85%降到了现在的38%，日均外呼从45通降到18通。这些数据你自己有感觉到吗？你觉得主要是哪些方面在影响？' },
                { title: '原因探讨', icon: '🔍', content: '我这边分析了几个可能的原因：一是异议处理的技巧可能需要加强，你最近遇到客户拒绝的情况多吗？二是出勤和培训参与度有些下降，是不是有什么困难？我们一个个来看。' },
                { title: '行动计划', icon: '📋', content: '好，那我们一起定个30天计划：第一周恢复日均外呼到30通以上；第二周参加异议处理培训并做3次演练；第三周开始重点客户面访；第四周复盘调整。每周五咱们碰一次，看看进展如何。' },
                { title: '收尾激励', icon: '💪', content: '平安，你之前的能力是被验证过的。上半年那几个大单都是你做的，说明你完全有这个实力。现在只是暂时遇到了瓶颈，只要方法对了，一定能恢复。我会全力支持你，有任何困难随时找我。' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看应对策略', value: 'view-strategy' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '面谈中可能遇到不同性格类型的反应，系统为您准备了3种常见人格类型的应对策略，帮您灵活应变。',
            speechText: '已准备3种人格类型的应对策略。',
          },
          {
            type: 'response-strategy',
            content: '',
            data: {
              strategies: [
                {
                  type: '防御型', icon: '🛡️', color: '#DC2626', bg: '#FEF2F2',
                  characteristics: ['倾向于找外部原因解释业绩下滑', '对数据分析持抵触或怀疑态度', '可能会反驳或转移话题'],
                  responses: ['先认可对方的感受："我理解你可能觉得有些因素不在你的控制范围内"', '用事实而非评价引导："我们来看看数据本身在说什么"', '给出选择权："你觉得我们可以先从哪个方面开始改善？"'],
                },
                {
                  type: '自责型', icon: '😞', color: '#7C3AED', bg: '#F5F3FF',
                  characteristics: ['过度自我否定，情绪低落', '可能表达"我不行"、"我做不到"', '缺乏行动的信心和动力'],
                  responses: ['先肯定过往成绩："你上半年拿下3个大单，说明能力是有的"', '聚焦具体行动而非结果："我们不看最终数字，先做好每天的30通电话"', '提供陪伴支持："第一周我陪你一起做客户分析，不用一个人扛"'],
                },
                {
                  type: '口头答应型', icon: '🤝', color: '#D97706', bg: '#FFFBEB',
                  characteristics: ['面谈时态度很好，充分认同', '口头承诺很爽快，但执行力差', '过往有"说到做不到"的记录'],
                  responses: ['要求具体承诺："好，那我们把这个写下来，第一周具体做什么？"', '设置检查节点："我们约好周三中午做个5分钟的进展确认，可以吗？"', '预设困难场景："如果遇到客户连续拒绝，你打算怎么调整？"'],
                },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '继续', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 内勤场景4: 面谈全程辅助
  {
    id: 'backoffice-meeting-assist',
    name: '面谈全程辅助',
    icon: '🎙️',
    description: '面谈辅助',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '面谈已开始，系统正在录音并进行实时语音转文字。您可以专注于面谈，系统会自动记录关键信息。',
            speechText: '面谈录音已开始，系统将自动记录关键信息。',
          },
          {
            type: 'recording',
            content: '',
            data: {},
            delay: 300,
          },
        ],
        quickReplies: [
          { label: '结束录音', value: 'stop-recording' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '面谈已结束，系统已自动生成面谈结果摘要，包括关键发现和识别的问题。',
            speechText: '面谈结果摘要已生成。',
          },
          {
            type: 'meeting-result',
            content: '',
            data: {
              duration: '35分钟',
              agentName: '李平安',
              insights: [
                '李平安对业绩下滑有自我认知，态度端正',
                '核心问题是异议处理技能薄弱导致信心下降',
                '对调整改善持开放态度，愿意配合培训计划',
              ],
              problems: [
                {
                  title: '异议处理能力不足',
                  quote: '"最近有些客户比较难沟通，被拒绝多了就有点不想打了"',
                  actions: ['安排异议处理专项培训', '配对老员工进行话术演练', '每周提交3个异议处理案例复盘'],
                },
                {
                  title: '行动力和信心下降',
                  quote: '"确实是的...最近业绩不太好"',
                  actions: ['设定每日最低30通外呼标准', '建立每日简报机制追踪执行', '每周1对1鼓励面谈'],
                },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '生成计划', value: 'generate-plan' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '基于面谈结果，系统已自动生成30天改善计划，包含4周详细行动安排。确认后将自动下发给李平安，并设置每周检查提醒。',
            speechText: '30天改善计划已生成，确认后将下发给李平安。',
          },
          {
            type: 'plan-delivery',
            content: '',
            data: {
              agentName: '李平安',
              planTitle: '30天业绩改善计划',
              weekPlans: [
                { week: '第1周', tasks: ['恢复日均外呼至30通以上', '参加异议处理基础培训', '每日提交外呼记录和心得'] },
                { week: '第2周', tasks: ['完成3次异议处理话术演练', '开始重点客户定向拜访（5户）', '与导师进行1次场景模拟'] },
                { week: '第3周', tasks: ['日均外呼提升至35通', '完成8次客户面访', '参加高级异议处理培训'] },
                { week: '第4周', tasks: ['客户转化率目标20%', '本月业绩目标FYC达成率60%', '提交月度复盘报告'] },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '确认下发', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 内勤场景5: 报告一键制作
  {
    id: 'backoffice-report-generation',
    name: '报告一键制作',
    icon: '📋',
    description: '智能报告',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '郑晓您好，我来帮您快速制作工作报告。请先上传素材（图片、PPT、邮件）或授权寿险业务系统数据权限，我将精准识别素材信息，根据汇报对象及风格偏好自动生成报告。',
            speechText: '郑晓您好，请上传素材或授权数据权限，我来帮您制作报告。',
          },
          {
            type: 'report-upload',
            content: '',
            data: {},
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '生成报告', value: 'generate-report' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '已完成数据采集与关联分析，报告已生成。包含NBEV、增员率、3转、13留四项关键指标及趋势分析。您可以切换指标展示样式，也可以切换到下周查看最新数据。',
            speechText: '报告已生成，包含四项关键指标及趋势分析，支持切换展示样式和日期。',
          },
          {
            type: 'report-preview',
            content: '',
            data: {},
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '继续', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 内勤场景6: 营销素材生成
  {
    id: 'backoffice-material-generation',
    name: '营销素材生成',
    icon: '🎨',
    description: '营销素材',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '郑晓您好，我来帮您生成全套营销素材。已预设活动信息：深圳亲子自然研学，目标人群三口之家，主推产品平安「全家保」。确认后点击一键生成，30秒内完成全套素材制作。',
            speechText: '已预设活动信息，确认后点击一键生成。',
          },
          {
            type: 'material-config',
            content: '',
            data: {},
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看生成结果', value: 'view-materials' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '全套素材已生成并通过合规校验！包括活动海报、客户邀请函、代理人宣导话术、完整课件及朋友圈文案。您可以展开查看各项素材内容。',
            speechText: '全套素材已生成并通过合规校验。',
          },
          {
            type: 'material-preview',
            content: '',
            data: {},
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '跨平台分发', value: 'distribute-materials' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: 'AI已自动识别微信、小红书等不同平台规则与用户偏好，对素材进行了智能二次创作：微信版本更偏私域信任表达，小红书版本强化标题吸引力与话题标签。确认后可一键推送至代理人端。',
            speechText: '已完成跨平台素材适配，可一键推送至代理人端。',
          },
          {
            type: 'material-distribute',
            content: '',
            data: {},
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '继续', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 内勤场景7: 典范案例挖掘
  {
    id: 'backoffice-case-mining',
    name: '典范案例挖掘',
    icon: '🏆',
    description: '案例挖掘',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '郑晓您好，我来帮您挖掘典范案例。请输入案例需求意图并选择筛选标签，系统将从数据库中自动匹配最佳案例。',
            speechText: '请输入案例需求意图并选择筛选标签。',
          },
          {
            type: 'case-search',
            content: '',
            data: {},
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看匹配结果', value: 'view-case-result' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '已为您找到高度匹配的案例！曲潇，36岁，入职仅1年，匹配度96%。她通过"诊断式面谈+可视化服务流程"形成稳定口碑，业绩增长本质是把每次服务做成复利。案例支持展开阅读、复制和转发。',
            speechText: '已匹配到曲潇的案例，匹配度96%，可展开查看详情。',
          },
          {
            type: 'case-result',
            content: '',
            data: {},
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '继续', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 内勤场景8: 案例智能归纳
  {
    id: 'backoffice-case-summary',
    name: '案例智能归纳',
    icon: '🎬',
    description: '案例归纳',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '现在开始对曲潇进行AI数字人访谈。数字人将引导曲潇讲述她的成长经历和典范事迹，系统实时记录并生成访谈文字稿。',
            speechText: 'AI数字人访谈已开始，正在记录曲潇的典范事迹。',
          },
          {
            type: 'case-interview',
            content: '',
            data: {},
            delay: 300,
          },
        ],
        quickReplies: [
          { label: '结束访谈', value: 'end-interview' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '访谈已结束，系统已根据访谈内容自动生成曲潇的宣导视频。您可以切换不同的封面风格和视频标题，选择最满意的方案。',
            speechText: '宣导视频已生成，支持切换封面和标题。',
          },
          {
            type: 'case-video',
            content: '',
            data: {},
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '继续', value: 'back-to-menu' },
        ],
      },
    ],
  },
];

// 导出内勤场景（与 scenarios 相同，保持向后兼容）
export const backofficeScenarios = scenarios;
